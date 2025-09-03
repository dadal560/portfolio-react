import React, { useState, useEffect, useRef, type FormEvent } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Cpu, Star, Zap, Target } from 'lucide-react';

// Service pour appeler l'API Flask
const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    const res = await fetch('http://127.0.0.1:5000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, subject, message }),
    });
    return await res.json();
  } catch (err: any) {
    return { status: 'error', message: err.message };
  }
};

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ setCursorVariant] = useState('default');
  const heroRef = useRef(null);

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
    
    // Animation d'entrée
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
      title: "E-Commerce Platform",
      description: "Application moderne de commerce électronique avec React et Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Dashboard Analytics",
      description: "Interface d'analyse de données avec visualisations interactives",
      tech: ["React", "D3.js", "Python"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Mobile App Design",
      description: "Application mobile avec interface utilisateur moderne",
      tech: ["React Native", "Firebase", "Figma"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    }
  ];

  const skills = [
    { name: "Frontend", icon: Code, percentage: 90, color: "from-blue-500 to-purple-600" },
    { name: "Design", icon: Palette, percentage: 85, color: "from-pink-500 to-red-500" },
    { name: "Backend", icon: Cpu, percentage: 75, color: "from-green-500 to-teal-500" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      
      {/* Effet de grille animée */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,165,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,165,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Orbs flottants */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-radial from-orange-500/20 to-transparent animate-pulse"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,    
              animationDuration: `${Math.random() * 10 + 10}s`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>
      {/* Hero Section avec parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background avec effet parallax et distorsion */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/d/d1/Destruction_of_Pompeii_and_Herculaneum.jpg')`,
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
            filter: 'brightness(0.3) contrast(1.2) hue-rotate(10deg)'
          }}
        />
        
        {/* Overlay gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Effet de vague de chaleur */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x/window.innerWidth*100}% ${mousePosition.y/window.innerHeight*100}%, rgba(255,165,0,0.3) 0%, transparent 50%)`,
            filter: 'blur(100px)'
          }}
        />

        {/* Particules flottantes animées */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 8 + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.7 + 0.3;
            const colors = ['bg-orange-400', 'bg-red-400', 'bg-yellow-400', 'bg-pink-400'];
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
                  boxShadow: `0 0 ${size*2}px ${color.replace('bg-', 'rgba(').replace('400', '400, 0.5)')}`
                }}
              />
            );
          })}
        </div>

        {/* Lignes électriques animées */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <g key={i}>
              <line
                x1={`${Math.random() * 100}%`}
                y1="0%"
                x2={`${Math.random() * 100}%`}
                y2="100%"
                stroke="url(#gradient)"
                strokeWidth="1"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,165,0,0)" />
              <stop offset="50%" stopColor="rgba(255,165,0,0.8)" />
              <stop offset="100%" stopColor="rgba(255,165,0,0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Contenu principal avec effet glitch */}
        <div className={`relative z-10 text-center px-8 transform transition-all duration-2000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="relative">
            {/* Effet de glitch sur le titre */}
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent relative">
              Gwendal Henry
              {/* Clones pour effet glitch */}
              <span className="absolute top-3 left-0 text-7xl md:text-9xl font-bold opacity-20 animate-glitch-1" style={{ color: '#ff6b6b' }}>
                Gwendal Henry
              </span>
              <span className="absolute top-5 left-0 text-7xl md:text-9xl font-bold opacity-20 animate-glitch-2" style={{ color: '#4ecdc4' }}>
                Gwendal Henry
              </span>
            </h1>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-light mb-8 text-gray-300 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            Développeur Full-Stack & Designer
          </h2>
          
          {/* Ligne décorative animée */}
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-8 animate-pulse" />
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-400 leading-relaxed animate-fadeInUp" style={{ animationDelay: '1s' }}>
            De la destruction naît la création. Comme Pompéi renaît de ses cendres, 
            je transforme vos idées en expériences numériques extraordinaires.
          </p>
          
          {/* Stats animés */}
          <div className="flex justify-center gap-8 mb-12 animate-fadeInUp" style={{ animationDelay: '1.5s' }}>
            {[
              { icon: Star, number: '15+', label: 'Projets' },
              { icon: Zap, number: '2+', label: 'Années' },
              { icon: Target, number: '100%', label: 'Passion' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-orange-400 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons avec effet magnétique */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{ animationDelay: '2s' }}>
            <button 
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 overflow-hidden"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Découvrir mes créations
              <ExternalLink className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              className="group px-8 py-4 border-2 border-gray-600 rounded-full font-semibold text-lg transition-all duration-300 hover:border-orange-500 hover:text-orange-400 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 relative overflow-hidden"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {/* Effet de remplissage */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10" />
              Me contacter
            </button>
          </div>
        </div>

        {/* Scroll indicator animé */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full relative mb-2">
              <div className="w-1 h-3 bg-orange-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-pulse" />
            </div>
            <ChevronDown className="w-6 h-6 text-orange-400 animate-pulse" />
          </div>
        </div>
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
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
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
      `}</style>

      {/* About Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                À propos
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Étudiant en deuxième année de licence informatique, passionné par l'art de créer 
                des expériences numériques qui marquent les esprits.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Inspiré par la grandeur tragique de l'art classique, je mélange technique moderne 
                et esthétique intemporelle pour donner vie à vos projets les plus ambitieux.
              </p>
              
              {/* Skills */}
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center mb-2">
                      <skill.icon className="w-6 h-6 mr-3 text-orange-400" />
                      <span className="text-lg font-semibold">{skill.name}</span>
                      <span className="ml-auto text-orange-400 font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:scale-105`}
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Cercles décoratifs */}
                <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border-2 border-red-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Code className="w-16 h-16 mx-auto mb-4 text-orange-400" />
                    <p className="text-2xl font-bold text-orange-400">2+ ans</p>
                    <p className="text-gray-400">d'expérience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Mes Créations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-red-500/20 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-orange-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center text-orange-400 hover:text-orange-300 transition-colors group-hover:translate-x-2 transition-transform duration-300">
                    Voir le projet
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
        <section id="contact" className="py-20 px-8 bg-gradient-to-t from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Collaborons</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Prêt à créer quelque chose d'extraordinaire ensemble ? Contactez-moi pour donner vie à vos idées les plus ambitieuses.
            </p>
            <form onSubmit={handleSendEmail} className="flex flex-col gap-6 max-w-xl mx-auto">
              <input type="email" placeholder="Votre email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-orange-500"/>
              <input type="text" placeholder="Sujet (optionnel)" value={subject} onChange={(e)=>setSubject(e.target.value)} className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-orange-500"/>
              <textarea placeholder="Votre message" value={message} onChange={(e)=>setMessage(e.target.value)} required className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-orange-500 resize-none"/>
              <button type="submit" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
                <Mail className="inline-block w-5 h-5 mr-2"/> Envoyer
              </button>
            </form>
            {status && <p className={`mt-4 text-lg font-semibold ${status.includes('succès') ? 'text-green-400' : 'text-red-500'}`}>{status}</p>}
          </div>
        </section>
            
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="https://github.com" className="p-4 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors duration-300 hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="p-4 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors duration-300 hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:contact@monportfolio.com" className="p-4 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors duration-300 hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Mon Portfolio. Créé avec passion et inspiré par l'art intemporel.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;