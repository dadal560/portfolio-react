import { ArrowUp } from 'lucide-react';

const FooterPro = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-amber-500/20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-950 to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 py-8">
        {/* Citation signature */}
        <div className="mb-8 text-center space-y-2">
          <p className="text-xs text-gray-600 italic">
            "Tout acte de création est d'abord un acte de destruction" - Pablo Picasso
          </p>
          <p className="text-xs text-gray-600 italic">
            "La Destruction de Pompéi et d'Herculanum" - John Martin
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {currentYear} Gwendal Henry - Tous droits réservés
          </div>

          <div className="flex items-center gap-6">
            
            {/* Bouton scroll to top */}
            <button
              onClick={scrollToTop}
              className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 group"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4 text-white group-hover:translate-y-[-2px] transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPro;