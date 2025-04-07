import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon, Phone, Mail, MapPin } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Add scroll listener to change header appearance when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine active section for nav highlighting
      const sections = ['home', 'properties', 'area', 'about', 'widgets', 'contact'];
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Get nav link classes based on active state
  const getNavLinkClasses = (sectionId: string) => {
    return `font-montserrat text-sm font-medium transition-colors duration-200 relative ${
      activeSection === sectionId
        ? 'text-bhhs-navy font-semibold'
        : 'text-bhhs-dark hover:text-bhhs-navy'
    }`;
  };

  // BHHS Logo SVG for better quality
  const BHHSLogo = () => (
    <svg 
      width="44" 
      height="44" 
      viewBox="0 0 44 44" 
      className="mr-3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="44" height="44" rx="2" fill="#00008B" />
      <path d="M7 11h6.5c1.5 0 2.75.5 3.5 1.5.75 1 1 2 1 3 0 2-1 3.25-3 3.75 2.25.5 3.5 2 3.5 4.25 0 1.5-.5 2.75-1.5 3.75S15 29 13.5 29H7V11zm3 7h3c.75 0 1.25-.25 1.75-.75s.75-1 .75-1.75-.25-1.25-.75-1.75S13.75 14 13 14h-3v4zm0 8h3.5c.75 0 1.5-.25 2-.75s.75-1.25.75-2-.25-1.5-.75-2-1.25-.75-2-.75H10v5.5z" fill="white"/>
      <path d="M22 11h3v7h7v-7h3v18h-3v-8h-7v8h-3V11z" fill="white"/>
      <path d="M36 11h-3v18h3V11z" fill="white"/>
      <rect x="7" y="32" width="30" height="5" fill="#B3995D"/>
    </svg>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-md py-2' 
        : 'bg-white/80 backdrop-blur-sm py-4'
    }`}>
      {/* Top contact bar */}
      <div className="hidden lg:block bg-bhhs-navy text-white py-1">
        <div className="container mx-auto px-4 flex justify-end gap-6 text-xs">
          <a href="tel:+17025551234" className="flex items-center gap-1 hover:text-bhhs-gold transition">
            <Phone size={12} />
            <span>(702) 555-1234</span>
          </a>
          <a href="mailto:jan.duffy@bhhsnv.com" className="flex items-center gap-1 hover:text-bhhs-gold transition">
            <Mail size={12} />
            <span>jan.duffy@bhhsnv.com</span>
          </a>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>Mountains Edge, Las Vegas, NV</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#home" onClick={() => scrollToSection('home')} className="flex items-center">
            <BHHSLogo />
            
            <div>
              <h1 className="font-montserrat font-bold text-bhhs-navy text-xl tracking-wide leading-tight">Dr. Jan Duffy</h1>
              <p className="text-xs text-bhhs-gold font-medium">Berkshire Hathaway HomeServices</p>
            </div>
          </a>
        </motion.div>
        
        <motion.nav 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className={getNavLinkClasses('home')}
          >
            Home
            {activeSection === 'home' && (
              <motion.div 
                className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-bhhs-navy" 
                layoutId="activeNavIndicator"
              />
            )}
          </a>
          <a 
            href="#properties" 
            onClick={(e) => { e.preventDefault(); scrollToSection('properties'); }}
            className={getNavLinkClasses('properties')}
          >
            Properties
            {activeSection === 'properties' && (
              <motion.div 
                className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-bhhs-navy" 
                layoutId="activeNavIndicator"
              />
            )}
          </a>
          <a 
            href="#area" 
            onClick={(e) => { e.preventDefault(); scrollToSection('area'); }}
            className={getNavLinkClasses('area')}
          >
            Mountains Edge
            {activeSection === 'area' && (
              <motion.div 
                className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-bhhs-navy" 
                layoutId="activeNavIndicator"
              />
            )}
          </a>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className={getNavLinkClasses('about')}
          >
            About Me
            {activeSection === 'about' && (
              <motion.div 
                className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-bhhs-navy" 
                layoutId="activeNavIndicator"
              />
            )}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="bg-accent hover:bg-red-600 text-white font-montserrat font-semibold px-5 py-2 rounded-lg transition duration-300 text-sm shadow-sm"
          >
            Contact
          </a>
        </motion.nav>
        
        <motion.button 
          className="md:hidden text-bhhs-navy flex items-center justify-center w-10 h-10" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </motion.button>
      </div>
      
      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 pt-20 pb-6 px-6 flex flex-col md:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-6 mt-6">
              <a 
                href="#home" 
                className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition text-lg font-medium"
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              >
                Home
              </a>
              <a 
                href="#properties" 
                className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition text-lg font-medium"
                onClick={(e) => { e.preventDefault(); scrollToSection('properties'); }}
              >
                Properties
              </a>
              <a 
                href="#area" 
                className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition text-lg font-medium"
                onClick={(e) => { e.preventDefault(); scrollToSection('area'); }}
              >
                Mountains Edge
              </a>
              <a 
                href="#about" 
                className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition text-lg font-medium"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                About Me
              </a>
              <a 
                href="#contact" 
                className="bg-accent text-white font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition text-center text-lg shadow-sm mt-4"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                Contact
              </a>
            </nav>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                <a href="tel:+17025551234" className="flex items-center gap-2 text-bhhs-dark hover:text-bhhs-navy transition">
                  <Phone size={16} />
                  <span>(702) 555-1234</span>
                </a>
                <a href="mailto:jan.duffy@bhhsnv.com" className="flex items-center gap-2 text-bhhs-dark hover:text-bhhs-navy transition">
                  <Mail size={16} />
                  <span>jan.duffy@bhhsnv.com</span>
                </a>
                <div className="flex items-center gap-2 text-bhhs-dark">
                  <MapPin size={16} />
                  <span>Mountains Edge, Las Vegas, NV</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
