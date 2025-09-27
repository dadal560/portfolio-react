import { useState, useEffect, useRef, type FormEvent } from 'react';
import { ChevronDown, Mail, ExternalLink, Code, Cpu, Star, Zap, Target, Server, Github, Linkedin} from 'lucide-react';

// Service pour appeler l'API Flask
const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    const res = await fetch('http://127.0.0.1:5000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, subject, message }),
    });
    return await res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { status: 'error', message: err.message };
    }
    return { status: 'error', message: 'Erreur inconnue' };
  }
};

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>('default');
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const heroRef = useRef(null);

  // Animation toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const toggleAnimations = () => setAnimationsEnabled(!animationsEnabled);

  // Contact form state
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e : MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    setTimeout(() => setIsLoaded(true), 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await sendEmail(email, subject, message);
    setStatus(response.message);
    if (response.status === 'success') {
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  const projects = [
    {
      id: 1,
      title: "Application web ScoopDub",
      description: "Application web de gestion d'événements de musique dub",
      tech: ["Vue.js", "Symfony", "Postgresql", "API RESTful", "Php", "Node.js"],
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
      link: "https://github.com/dadal560/scoop-dub-symfony-vue",
      details: "Application complète avec système d'authentification, gestion des utilisateurs, interface d'administration, et API REST pour la synchronisation des données. Architecture MVC avec Symfony et interface réactive avec Vue.js.",
      features: ["Authentification JWT", "Interface d'admin", "API RESTful", "Base de données relationnelle"]
    },
    {
      id: 2,
      title: "Omni-Chat",
      description: "Projet collaboratif de messagerie multi-plateforme intégrant plusieurs services dans une interface unique.",
      tech: ["Vue.js", "Node.js", "Symfony", "API", "Lua", "Java"],
      image: "https://images.unsplash.com/photo-1581091215361-8c1c4dc9fa6d?w=600&h=400&fit=crop",
      link: "https://github.com/KyozuFR/Omni-Chat",
      details: "Plateforme de messagerie unifiée permettant la communication via différents protocoles et services. Architecture microservices avec intégration d'APIs externes et système de notifications en temps réel.",
      features: ["Messagerie temps réel", "Multi-protocoles", "Interface unifiée", "Notifications push"]
    },
    {
      id: 3,
      title: "Educational keylogger",
      description: "Projet éducatif open-source illustrant le fonctionnement d'un keylogger basique en Python.",
      tech: ["Python"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      link: "https://github.com/dadal560/educational-keylogger",
      details: "Outil éducatif développé dans un contexte pédagogique pour comprendre les mécanismes de capture d'événements système. Inclut des explications détaillées et des mesures de protection.",
      features: ["Capture d'événements", "Code documenté", "Objectif pédagogique", "Bonnes pratiques"]
    },
    {
      id: 4,
      title: "Mailer Flask",
      description: "Une application web Flask simple permettant d'envoyer des emails via un formulaire de contact sécurisé.",
      tech: ["Python", "Flask", "Flask-Mail", "Flask-WTF"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      link: "https://github.com/dadal560/flask-mailer",
      details: "Service de mail sécurisé avec validation des formulaires, protection CSRF, logging des actions et gestion des erreurs. Interface simple et API claire pour intégration facile.",
      features: ["Validation sécurisée", "Protection CSRF", "Logging avancé", "API simple"]
    }
  ];

  const skills = [
    { 
      name: "Frontend", 
      icon: Code, 
      tech: ["Vue.js", "React", "JavaScript", "CSS"], 
      color: "from-amber-500 to-orange-600",
      description: "Interfaces modernes et interactives"
    },
    { 
      name: "Backend", 
      icon: Cpu, 
      tech: ["Node.js", "Python", "Symfony", "PostgreSQL"], 
      color: "from-orange-600 to-red-600",
      description: "APIs robustes et architectures scalables"
    },
    { 
      name: "Cybersécurité", 
      icon: Server, 
      tech: ["Kali Linux", "Wireshark", "OWASP", "Cryptographie"], 
      color: "from-red-600 to-rose-600",
      description: "Tests de pénétration et sécurisation d'applications"
    }
  ];

  const handleCardFlip = (cardId: number) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black text-white overflow-x-hidden relative" style={{ cursor: cursorVariant === 'hover' ? 'pointer' : 'default' }}>
      <button
        onClick={toggleAnimations}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-slate-900/80 backdrop-blur-sm text-white rounded-xl border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300"
      >
        {animationsEnabled ? 'Désactiver les animations' : 'Activer les animations'}
      </button>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/d/d1/Destruction_of_Pompeii_and_Herculaneum.jpg')`,
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
            filter: 'brightness(0.25) contrast(1.3) saturate(1.2)'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-gray-950/20 to-black/90" />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x/window.innerWidth*100}% ${mousePosition.y/window.innerHeight*100}%, rgba(245, 158, 11, 0.4) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 60%)`,
            filter: 'blur(120px)'
          }}
        />

        {/* Particules flottantes */}
        {animationsEnabled && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 8 + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.6 + 0.2;
            const colors = ['bg-amber-400', 'bg-orange-400', 'bg-red-400', 'bg-rose-400'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            return (
              <div
                key={i}
                className={`absolute ${color} rounded-full animate-float shadow-lg`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: opacity,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  animation: `float ${duration}s ${delay}s infinite linear`,
                }}
              />
            );
          })}
        </div>
        )}

        {/* Contenu principal */}
        <div className={`relative z-10 text-center px-8 transform transition-all duration-2000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent relative">
              Gwendal Henry
              {animationsEnabled && (
                <>
                  <span className="absolute top-3 left-0 text-7xl md:text-9xl font-bold opacity-22 animate-glitch-1" style={{color: 'rgb(255, 107, 107)'}}>
                    Gwendal Henry</span>
                  <span className="absolute top-5 left-0 text-7xl md:text-9xl font-bold opacity-20 animate-glitch-2" style={{color: 'rgb(78, 205, 196)'}}>
                    Gwendal Henry</span>
                </>
              )}
            </h1>
          </div>
              
          <h2 className="text-2xl md:text-4xl font-light mb-8 text-amber-100/80 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            Développeur Full-Stack & Cybersecurity
          </h2>
          
          {animationsEnabled &&
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mx-auto mb-8 animate-pulse" />
          }
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-amber-50/70 leading-relaxed animate-fadeInUp" style={{ animationDelay: '1s' }}>
            Tout acte de création est d'abord un acte de destruction.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12 animate-fadeInUp" style={{ animationDelay: '1.5s' }}>
          {[
            { icon: Star, number: '10+', label: 'Projets', color: 'text-yellow-400' },
            { icon: Zap, number: '3+', label: 'Années', color: 'text-blue-400' },
            { icon: Target, number: '100%', label: 'Passion', color: 'text-green-400' }
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <stat.icon
                className={`w-8 h-8 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-amber-100/60">{stat.label}</div>
            </div>
          ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{ animationDelay: '2s' }}>
            <button 
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 overflow-hidden"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Découvrir mes créations
              <ExternalLink className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              className="group px-8 py-4 border-2 border-amber-500/40 rounded-full font-semibold text-lg transition-all duration-300 hover:border-amber-400 hover:text-amber-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 relative overflow-hidden backdrop-blur-sm"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10" />
              Me contacter
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        {animationsEnabled &&
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-amber-400/70 rounded-full relative mb-2 backdrop-blur-sm">
              <div className="w-1 h-3 bg-amber-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-pulse" />
            </div>
            <ChevronDown className="w-6 h-6 text-amber-400/70 animate-pulse" />
          </div>
        </div>
        }
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 2s infinite linear alternate-reverse;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 1.5s infinite linear alternate-reverse;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        /* Scrollbar personnalisée */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(245, 158, 11, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5);
        }

        /* Animation pour les cartes modernes */
        .animate-float-in {
          animation: floatIn 0.8s ease-out forwards;
        }
        
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Section de transition */}
      <div className="h-40 bg-gradient-to-b from-black via-slate-950/50 to-slate-950 relative overflow-hidden">
        {animationsEnabled && (
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        )}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </div>

      {/* About Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-slate-950 via-gray-900 to-gray-800 relative">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                À propos
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Actuellement en Licence 3 Informatique à l'Université de La Rochelle, 
                je conçois des applications web robustes tout en intégrant les meilleures pratiques de cybersécurité.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Inspiré par l'innovation technologique et sécurité, 
                j'allie backend, interfaces modernes et bonnes pratiques 
                cybersécurité pour donner vie à des projets créatifs et accessibles.
              </p>
              
              {/* Skills améliorés */}
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="bg-gradient-to-r from-slate-800/60 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          <skill.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                          <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {skill.tech.map((tech) => (
                              <span 
                                key={tech}
                                className="px-3 py-1 bg-slate-700/50 text-amber-300 rounded-full text-sm border border-amber-500/20 hover:border-amber-400/40 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-spin backdrop-blur-sm" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border-2 border-orange-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-red-500/10 backdrop-blur-sm flex items-center justify-center border border-amber-500/20">
                  <div className="text-center">
                    <Code className="w-16 h-16 mx-auto mb-4 text-amber-400" />
                    <p className="text-2xl font-bold text-orange-400">2+ ans</p>
                    <p className="text-gray-400">d'expérience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none" />
      </section>

      {/* Section de transition vers Projects */}
      <div className="h-56 bg-gradient-to-b from-gray-800 via-slate-850 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="grid grid-cols-12 gap-8 h-full items-center justify-items-center px-8">
            {[...Array(36)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                style={{
                  animationDelay: `${(i * 0.1)}s`,
                  animationDuration: `${2 + Math.random()}s`,
                  transform: `scale(${0.5 + Math.random() * 0.8})`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3">
          <div className="flex space-x-2 opacity-40">
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="absolute inset-0 w-12 h-12 border-2 border-amber-400/30 rounded-full animate-ping" />
          </div>
        </div>
        
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <p className="text-amber-100/50 text-xs font-light tracking-widest">DÉCOUVREZ MES RÉALISATIONS</p>
        </div>
      </div>

      {/* Projects Section avec design ultra moderne */}
      <section id="projects" className="py-20 px-8 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full border border-amber-500/20 mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 font-medium text-sm tracking-wider uppercase">Portfolio</span>
            </div>
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Mes Créations
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une sélection de projets qui reflètent ma passion pour le développement moderne
            </p>
          </div>
          
          {/* Grid layout moderne */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Carte principale avec glassmorphism */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">
                  
                  {/* Badge de statut */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-xs font-medium">Disponible</span>
                    </div>
                  </div>

                  {/* Image avec overlay moderne */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay avec gradient moderne */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Boutons d'action flottants */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={() => handleCardFlip(project.id)}
                        className="p-3 bg-black/50 backdrop-blur-md rounded-xl border border-white/20 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-110"
                      >
                        <Code className="w-4 h-4 text-white" />
                      </button>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-black/50 backdrop-blur-md rounded-xl border border-white/20 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    </div>

                    {/* Indicateur de scroll en bas de l'image */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                        <ChevronDown className="w-3 h-3 text-white animate-bounce" />
                        <span className="text-white text-xs">Détails</span>
                      </div>
                    </div>
                  </div>

                  {/* Contenu avec design moderne */}
                  <div className="p-6 relative">
                    {/* En-tête du projet */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {project.title}
                        </h3>
                        <div className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-lg">
                          #{String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 leading-relaxed text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies avec design moderne */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 bg-amber-400 rounded-full" />
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-300 rounded-xl text-sm font-medium border border-gray-700/50 hover:border-amber-500/30 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 rounded-xl text-sm font-medium border border-amber-500/30">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions avec design futuriste */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                      <button
                        onClick={() => handleCardFlip(project.id)}
                        className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-amber-500/20 hover:to-orange-500/20 rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm"
                      >
                        <span className="text-gray-300 group-hover/btn:text-amber-300 text-sm font-medium transition-colors">Détails</span>
                        <div className="w-1 h-1 bg-gray-400 group-hover/btn:bg-amber-400 rounded-full animate-pulse transition-colors" />
                      </button>

                      {/* Status indicator */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                          <span className="text-xs text-gray-500">Active</span>
                        </div>
                        <div className="w-px h-4 bg-gray-700" />
                        <span className="text-xs text-gray-500">2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-500/5 group-hover:via-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none" />
                </div>

                {/* Modal de détails moderne */}
                {flippedCard === project.id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                      
                      {/* Header du modal */}
                      <div className="relative p-6 border-b border-gray-800/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-400">Projet full-stack moderne</p>
                          </div>
                          <button
                            onClick={() => handleCardFlip(project.id)}
                            className="p-3 bg-gray-800/50 hover:bg-red-500/20 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:rotate-90"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-400 hover:text-red-400 transition-colors transform rotate-45" />
                          </button>
                        </div>
                      </div>

                      {/* Contenu du modal avec scroll */}
                      <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <div className="grid md:grid-cols-2 gap-8">
                          
                          {/* Description détaillée */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                                Aperçu du projet
                              </h4>
                              <p className="text-gray-300 leading-relaxed">
                                {project.details}
                              </p>
                            </div>

                            {/* Fonctionnalités avec design moderne */}
                            <div>
                              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full" />
                                Fonctionnalités clés
                              </h4>
                              <div className="grid gap-3">
                                {project.features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-xl border border-gray-700/30">
                                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Technologies et actions */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-red-400 to-rose-500 rounded-full" />
                                Stack technique
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {project.tech.map((tech) => (
                                  <div 
                                    key={tech}
                                    className="p-3 bg-gradient-to-r from-slate-800/60 to-gray-800/60 text-amber-300 rounded-xl text-sm border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 text-center backdrop-blur-sm"
                                  >
                                    {tech}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Actions du modal */}
                            <div className="space-y-4">
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
                              >
                                <Github className="w-5 h-5" />
                                Voir le code source
                              </a>
                              
                              <div className="grid grid-cols-2 gap-3 text-center text-sm text-gray-400">
                                <div className="p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                                  <div className="font-semibold text-emerald-400">Open Source</div>
                                  <div>MIT License</div>
                                </div>
                                <div className="p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                                  <div className="font-semibold text-blue-400">Status</div>
                                  <div>Active</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to action moderne */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-gray-700 bg-gradient-to-r ${
                    i === 0 ? 'from-amber-400 to-orange-500' : 
                    i === 1 ? 'from-orange-500 to-red-500' : 
                    'from-red-500 to-rose-500'
                  }`} />
                ))}
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Plus de projets à venir</p>
                <p className="text-gray-400 text-sm">Restez connecté pour les prochaines créations</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* Section de transition vers Contact */}
      <div className="h-48 bg-gradient-to-b from-slate-950 via-gray-950/80 to-gray-950 relative overflow-hidden">
        {animationsEnabled && (
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none">
            <path
              d="M0,100 C300,150 600,50 900,100 C1050,125 1150,75 1200,100 L1200,200 L0,200 Z"
              fill="url(#waveGradient)"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.3)" />
                <stop offset="50%" stopColor="rgba(251, 146, 60, 0.2)" />
                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        )}

        {animationsEnabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
        )}
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />
            <p className="text-amber-100/40 text-sm font-light tracking-wider">Une idée ? Un projet ?</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8 bg-gradient-to-b from-gray-950 via-slate-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl" />
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-950/80 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-orange-400 font-semibold text-lg tracking-wider uppercase">Contact</span>
            <h2 className="text-5xl lg:text-7xl font-bold mt-4 mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
              Collaborons
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Prêt à créer quelque chose d'extraordinaire ensemble ? 
              Contactez-moi pour donner vie à vos idées les plus ambitieuses.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Formulaire */}
            <div className="bg-gradient-to-br from-slate-900/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/20">
              <form onSubmit={handleSendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input 
                      type="email" 
                      placeholder="votre@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      className="w-full px-4 py-4 rounded-2xl bg-slate-800/60 text-amber-100 border border-slate-600/50 focus:outline-none focus:border-amber-500/60 focus:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm placeholder-amber-100/40"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-amber-100/80 mb-2">Sujet</label>
                    <input 
                      type="text" 
                      placeholder="Sujet de votre message" 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                      className="w-full px-4 py-4 rounded-2xl bg-slate-800/60 text-amber-100 border border-slate-600/50 focus:outline-none focus:border-amber-500/60 focus:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm placeholder-amber-100/40"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-amber-100/80 mb-2">Message *</label>
                  <textarea 
                    placeholder="Décrivez votre projet ou votre idée..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                    rows={6}
                    className="w-full px-4 py-4 rounded-2xl bg-slate-800/60 text-amber-100 border border-slate-600/50 focus:outline-none focus:border-amber-500/60 focus:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm resize-none placeholder-amber-100/40"
                  />
                </div>
                <button 
                  type="submit" 
                  className="group w-full px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 relative overflow-hidden"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative flex items-center justify-center">
                    <Mail className="mr-3 w-5 h-5" />
                    Envoyer le message
                    <div className="ml-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </button>
              </form>
              {status && (
                <div className={`mt-6 p-4 rounded-2xl border backdrop-blur-sm ${
                  status.includes('succès') 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  <p className="font-medium">{status}</p>
                </div>
              )}
            </div>
            
            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-amber-100 mb-6">Restons connectés</h3>
                <p className="text-amber-100/60 leading-relaxed font-light mb-8">
                  N'hésitez pas à me contacter pour discuter de vos projets, 
                  collaborations ou simplement pour échanger sur les nouvelles technologies.
                </p>
              </div>
              
              {/* Social */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-amber-400 mb-4">Suivez-moi</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/dadal560" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group p-4 bg-gradient-to-br from-slate-800/60 to-gray-900/60 rounded-2xl hover:from-amber-500/20 hover:to-orange-600/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-amber-500/30 border border-slate-700/50 hover:border-amber-500/50 backdrop-blur-sm"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <Github className="w-8 h-8 text-amber-100/70 group-hover:text-amber-300 transition-colors" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group p-4 bg-gradient-to-br from-slate-800/60 to-gray-900/60 rounded-2xl hover:from-blue-600/20 hover:to-blue-700/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 border border-slate-700/50 hover:border-blue-500/50 backdrop-blur-sm"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <Linkedin className="w-8 h-8 text-amber-100/70 group-hover:text-blue-300 transition-colors" />
                  </a>
                </div>
              </div>
              
              {/* Stats de contact */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    &lt; 24h
                  </div>
                  <div className="text-sm text-amber-100/60 mt-1">Temps de réponse</div>
                </div>
                <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-amber-100/60 mt-1">Disponible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-black border-t border-amber-500/20 relative">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-950 to-black pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-amber-100/50">
            © 2025 Mon Portfolio. Créé avec passion et inspiré par l'art intemporel.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;