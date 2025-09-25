import { useState, useEffect, useRef, type FormEvent } from 'react';
import { ChevronDown, Mail, ExternalLink, Code, Cpu, Star, Zap, Target, Server} from 'lucide-react';
import {FaGithub as Github, FaLinkedin as Linkedin} from 'react-icons/fa';


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
    title: "Application web ScoopDub",
    description: "Application web de gestion d'événements de musique dub",
    tech: ["Vue.js", "Symfony", "Postgresql", "API RESTful", "Php", "Node.js"],
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
    link: "https://github.com/dadal560/scoop-dub-symfony-vue"
  },
  {
    title: "Omni-Chat",
    description: "Projet collaboratif de messagerie multi-plateforme intégrant plusieurs services dans une interface unique.Intégration API.",
    tech: ["Vue.js", "Node.js", "Symfony", "API", "Lua", "Java"],
    image: "https://images.unsplash.com/photo-1581091215361-8c1c4dc9fa6d?w=600&h=400&fit=crop",
    link: "https://github.com/KyozuFR/Omni-Chat"
  },
  {
    title: "Educational keylogger",
    description: "Projet éducatif open-source illustrant le fonctionnement d'un keylogger basique en Python. Objectif pédagogique et apprentissage des notions de capture d'événements clavier.",
    tech: ["Python"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    link: "https://github.com/dadal560/educational-keylogger"
  },
  {
    title: "Mailer Flask",
    description: "Une application web Flask simple permettant d'envoyer des emails via un formulaire de contact sécurisé avec validation et logging.",
    tech: ["Python", "Flask", "Flask-Mail", "Flask-WTF"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    link: "https://github.com/dadal560/flask-mailer"
  }
  ];

  const skills = [
    { name: "Frontend", icon: Code, percentage: 85, color: "from-amber-500 to-orange-600" },
    { name: "Backend", icon: Cpu, percentage: 80, color: "from-orange-600 to-red-600" },
    { name: "Cybersécurité & Outils", icon: Server, percentage: 60, color: "from-red-600 to-rose-600" }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black text-white overflow-x-hidden relative" style={{ cursor: cursorVariant === 'hover' ? 'pointer' : 'default' }}>
      <button
      onClick={toggleAnimations}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-slate-900/80 backdrop-blur-sm text-white rounded-xl border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300"
    >
      {animationsEnabled ? 'Désactiver les animations' : 'Activer les animations'}
    </button>
      {/* Hero Section avec parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background avec effet parallax et distorsion */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/d/d1/Destruction_of_Pompeii_and_Herculaneum.jpg')`,
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
            filter: 'brightness(0.25) contrast(1.3) saturate(1.2)'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-gray-950/20 to-black/90" />
        
        {/* Effet de vague de chaleur */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x/window.innerWidth*100}% ${mousePosition.y/window.innerHeight*100}%, rgba(245, 158, 11, 0.4) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 60%)`,
            filter: 'blur(120px)'
          }}
        />

        {/* Particules flottantes animées */}
        {animationsEnabled && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_) => {
            const size = Math.random() * 8 + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.6 + 0.2;
            const colors = ['bg-amber-400', 'bg-orange-400', 'bg-red-400', 'bg-rose-400'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            return (
              <div
                key={_}
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
                  boxShadow: `0 0 ${size*3}px ${color.replace('bg-amber-400', 'rgba(245, 158, 11, 0.6)').replace('bg-orange-400', 'rgba(251, 146, 60, 0.6)').replace('bg-red-400', 'rgba(239, 68, 68, 0.6)').replace('bg-rose-400', 'rgba(244, 63, 94, 0.6)')}`
                }}
              />
            );
          })}
        </div>
        )}

        {/* Lignes électriques */}
        {animationsEnabled && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
          {[...Array(6)].map((_, i) => (
            <g key={_}>
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
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0)" />
              <stop offset="50%" stopColor="rgba(251, 146, 60, 0.8)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </linearGradient>
          </defs>
        </svg>
        )}

        {/* Contenu principal */}
        <div className={`relative z-10 text-center px-8 transform transition-all duration-2000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="relative">
            {/* Titre */}
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent relative">
              Gwendal Henry
              {/* Clones pour effet glitch */}
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
          
          {/* Ligne décorative */}
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

       {/* Scroll indicator harmonieux */}
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

      {/* Section de transition fluide */}
      <div className="h-40 bg-gradient-to-b from-black via-slate-950/50 to-slate-950 relative overflow-hidden">
        {/* Particules de transition */}
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
        
        {/* Ligne de séparation élégante */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </div>

      {/* About Section avec transition naturelle */}
      <section className="py-20 px-8 bg-gradient-to-b from-slate-950 via-gray-900 to-gray-800 relative">
        {/* Effet de superposition douce */}
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
              
              {/* Skills avec couleurs harmonieuses */}
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center mb-2">
                      <skill.icon className="w-6 h-6 mr-3 text-amber-400" />
                      <span className="text-lg font-semibold text-white">{skill.name}</span>
                      <span className="ml-auto text-orange-400 font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:scale-105 shadow-lg`}
                        style={{ 
                          width: `${skill.percentage}%`,
                          boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Cercles décoratifs avec couleurs harmonieuses */}
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
        
        {/* Élément de transition vers la section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none" />
      </section>

      {/* Section de transition créative vers Projects */}
      <div className="h-56 bg-gradient-to-b from-gray-800 via-slate-850 to-slate-900 relative overflow-hidden">
        {/* Grille de points en perspective */}
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
        
        {/* Lignes de code flottantes */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3">
          <div className="flex space-x-2 opacity-40">
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
          <div className="flex space-x-2 opacity-30">
            <div className="w-10 h-0.5 bg-gradient-to-r from-red-400 to-rose-500 rounded animate-pulse" style={{ animationDelay: '0.9s' }} />
            <div className="w-14 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded animate-pulse" style={{ animationDelay: '1.2s' }} />
            <div className="w-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
        
        {/* Icône centrale de transition */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="absolute inset-0 w-12 h-12 border-2 border-amber-400/30 rounded-full animate-ping" />
          </div>
        </div>
        
        {/* Message de transition */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <p className="text-amber-100/50 text-xs font-light tracking-widest">DÉCOUVREZ MES RÉALISATIONS</p>
        </div>
      </div>

      {/* Projects Section avec transition harmonieuse */}
      <section id="projects" className="py-20 px-8 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Mes Créations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.title}
                className="group relative bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 border border-slate-700/50 hover:border-amber-500/30"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-orange-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-400 hover:text-orange-300 transition-all duration-300 group-hover:translate-x-2 font-medium"
                  >
                    Voir le projet
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Élément de transition vers Contact */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* Section de transition fluide vers Contact */}
      <div className="h-48 bg-gradient-to-b from-slate-950 via-gray-950/80 to-gray-950 relative overflow-hidden">
        {/* Effet de vagues subtiles */}
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

        
        {/* Particules de connexion */}
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
        {/* Texte de transition subtil */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />
            <p className="text-amber-100/40 text-sm font-light tracking-wider">Une idée ? Un projet ?</p>
          </div>
        </div>
      </div>

{/* Contact Section avec transition naturelle */}
      <section id="contact" className="py-24 px-8 bg-gradient-to-b from-gray-950 via-slate-950 to-black relative overflow-hidden">
        {/* Fond avec effets harmonieux */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl" />
        </div>
        
        {/* Élément de transition douce depuis la section précédente */}
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
            
            {/* Informations de contact*/}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-amber-100 mb-6">Restons connectés</h3>
                <p className="text-amber-100/60 leading-relaxed font-light mb-8">
                  N'hésitez pas à me contacter pour discuter de vos projets, 
                  collaborations ou simplement pour échanger sur les nouvelles technologies.
                </p>
              </div>
              
              {/* Social*/}
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
              
              {/* Stats de contact harmonieuses */}
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

      {/* Footer avec transition naturelle */}
      <footer className="py-8 px-8 bg-black border-t border-amber-500/20 relative">
        {/* Élément de transition douce */}
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