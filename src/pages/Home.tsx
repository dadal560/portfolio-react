import React, { useState, useEffect } from 'react';
import SectionHero from '../components/SectionHero';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simuler un chargement, puis déclencher l'animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <SectionHero isLoaded={isLoaded} />

      {/* Le reste de votre code (About, Projects, Contact, Footer, etc.) */}
    </div>
  );
};

export default Home;
