import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

export default function HeroSection() {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
  // Hero images for rotation
  const heroImages = [
    "https://images.unsplash.com/photo-1617143207648-ec3e13bde92b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Listen for scroll to fade out scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrollOpacity(0);
      } else {
        setScrollOpacity(1);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Smooth scroll function for the scroll down button
  const scrollToProperties = () => {
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative h-screen max-h-[700px] overflow-hidden" id="home">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
      
      {/* Hero Background Image with Transition */}
      {heroImages.map((img, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 object-cover w-full h-full bg-center bg-cover"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentImageIndex === index ? 1 : 0,
            transition: { duration: 1.5 }
          }}
          style={{
            backgroundImage: `url('${img}')`,
            backgroundPosition: "center",
          }}
          aria-label="Mountains Edge Las Vegas aerial view"
        ></motion.div>
      ))}
      
      {/* Content with animation */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-5xl px-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <motion.h1 
          className="text-white font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Discover Mountains Edge
        </motion.h1>
        
        <motion.p 
          className="text-white text-xl md:text-2xl mb-8 text-shadow max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Las Vegas' Premier Master Planned Community with World-Class Amenities and Breathtaking Views
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a 
            href="#properties" 
            className="bg-accent hover:bg-red-600 text-white font-montserrat font-semibold px-8 py-3 rounded-lg transition duration-300 text-lg shadow-lg"
          >
            View Properties
          </a>
          <a 
            href="#contact" 
            className="bg-white hover:bg-gray-100 text-bhhs-navy font-montserrat font-semibold px-8 py-3 rounded-lg transition duration-300 text-lg shadow-lg border border-gray-200"
          >
            Schedule a Tour
          </a>
        </motion.div>
        
        {/* BHHS Badge */}
        <motion.div 
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div className="bg-white/90 text-bhhs-navy py-2 px-6 rounded-full shadow-md">
            <p className="text-sm font-bold">Berkshire Hathaway HomeServices Nevada Properties</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        animate={{ opacity: scrollOpacity, y: [0, 10, 0] }}
        transition={{ opacity: { duration: 0.3 }, y: { repeat: Infinity, duration: 1.5 } }}
        onClick={scrollToProperties}
      >
        <ChevronDownIcon className="h-10 w-10 text-white" />
      </motion.div>
    </section>
  );
}
