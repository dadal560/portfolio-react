/**
 * Service API pour la communication avec le backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
const TIMEOUT = 10000; // 10 secondes

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
}

class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetch avec timeout
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(408, 'La requête a expiré. Veuillez réessayer.');
    }
    throw error;
  }
};

/**
 * Fetch avec retry automatique (exponential backoff)
 */
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  maxRetries = 2
): Promise<Response> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchWithTimeout(url, options);
    } catch (error) {
      lastError = error as Error;
      
      // Ne pas retry sur les erreurs client (4xx)
      if (error instanceof ApiError && error.statusCode >= 400 && error.statusCode < 500) {
        throw error;
      }
      
      // Attendre avant de réessayer (exponential backoff)
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Échec après plusieurs tentatives');
};

/**
 * Validation côté client de l'email
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 120;
};

/**
 * Envoie un email via le formulaire de contact
 */
export const sendEmail = async (
  email: string,
  subject: string,
  message: string
): Promise<ApiResponse> => {
  try {
    // Validation côté client
    if (!email || !validateEmail(email)) {
      return {
        status: 'error',
        message: 'Adresse email invalide',
      };
    }

    if (!message || message.trim().length < 10) {
      return {
        status: 'error',
        message: 'Le message doit contenir au moins 10 caractères',
      };
    }

    if (message.length > 2000) {
      return {
        status: 'error',
        message: 'Le message ne peut pas dépasser 2000 caractères',
      };
    }

    if (subject && subject.length > 150) {
      return {
        status: 'error',
        message: 'Le sujet ne peut pas dépasser 150 caractères',
      };
    }

    // Envoyer la requête
    const res = await fetchWithRetry(
      `${API_URL}/api/send-email`,
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email: email.trim(), 
          subject: subject.trim(), 
          message: message.trim() 
        }),
      },
      2 // Max 2 retries
    );

    // Gérer les erreurs HTTP
    if (!res.ok) {
      if (res.status === 429) {
        throw new ApiError(
          429, 
          'Trop de requêtes. Veuillez réessayer dans quelques minutes.'
        );
      }
      
      if (res.status >= 500) {
        throw new ApiError(
          res.status, 
          'Erreur serveur. Veuillez réessayer plus tard.'
        );
      }
      
      // Essayer de parser le message d'erreur du serveur
      try {
        const errorData = await res.json();
        throw new ApiError(res.status, errorData.message || 'Erreur lors de l\'envoi');
      } catch {
        throw new ApiError(res.status, 'Erreur lors de l\'envoi du message');
      }
    }

    return await res.json();
    
  } catch (err: unknown) {
    // Log pour le debug (uniquement en dev)
    if (import.meta.env.DEV) {
      console.error('Email send error:', err);
    }

    // Erreurs API custom
    if (err instanceof ApiError) {
      return { 
        status: 'error', 
        message: err.message 
      };
    }

    // Erreurs réseau
    if (err instanceof TypeError) {
      return {
        status: 'error',
        message: 'Erreur de connexion. Vérifiez votre connexion internet.',
      };
    }

    // Erreur générique
    return {
      status: 'error',
      message: 'Une erreur inattendue est survenue. Veuillez réessayer.',
    };
  }
};

/**
 * Health check de l'API
 */
export const healthCheck = async (): Promise<boolean> => {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/health`,
      { method: 'GET' },
      5000
    );
    return res.ok;
  } catch {
    return false;
  }
};