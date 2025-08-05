import React from 'react';

interface SectionHeroProps {
  isLoaded: boolean;
}

const SectionHero: React.FC<SectionHeroProps> = ({ 
  isLoaded, 
}) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Contenu principal */}
      <main className={`relative z-10 text-center px-8 transform transition-all duration-2000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        
        <h2 className="text-2xl md:text-4xl font-light mb-8 text-gray-300 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          Développeur Full-Stack & Designer
        </h2>
        
        {/* Ligne décorative animée */}
        <section className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-8 animate-pulse" />
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-400 leading-relaxed animate-fadeInUp" style={{ animationDelay: '1s' }}>
          De la destruction naît la création. Comme Pompéi renaît de ses cendres, 
          je transforme vos idées en expériences numériques extraordinaires.
        </p>
      </main>
      
      {/* Styles d'animation globaux */}
      <style>{`
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
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default SectionHero;