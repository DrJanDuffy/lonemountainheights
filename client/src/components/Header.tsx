import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {/* BHHS Logo - would be replaced with actual logo */}
          <svg 
            className="h-12 mr-4" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" fill="#00008B" />
            <text x="50" y="50" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle" dominantBaseline="middle">BHHS</text>
          </svg>
          
          <div className="hidden md:block">
            <h1 className="font-montserrat font-bold text-bhhs-navy text-xl tracking-wide">Dr. Jan Duffy</h1>
            <p className="text-sm text-bhhs-gold">Berkshire Hathaway HomeServices</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#properties" className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition">Properties</a>
          <a href="#area" className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition">Mountains Edge</a>
          <a href="#about" className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition">About Me</a>
          <a href="#contact" className="bg-accent text-white font-montserrat font-semibold px-4 py-2 rounded hover:bg-opacity-90 transition">Contact</a>
        </nav>
        
        <button 
          className="md:hidden text-bhhs-navy" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white p-4`}>
        <div className="flex flex-col space-y-3">
          <a 
            href="#properties" 
            className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Properties
          </a>
          <a 
            href="#area" 
            className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Mountains Edge
          </a>
          <a 
            href="#about" 
            className="font-montserrat text-bhhs-dark hover:text-bhhs-navy transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Me
          </a>
          <a 
            href="#contact" 
            className="bg-accent text-white font-montserrat font-semibold px-4 py-2 rounded hover:bg-opacity-90 transition text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
