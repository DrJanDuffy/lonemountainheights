export default function Footer() {
  return (
    <footer className="bg-bhhs-navy text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-montserrat font-semibold text-xl mb-4">Dr. Jan Duffy</h3>
            <p className="text-sm opacity-80 mb-4">Berkshire Hathaway HomeServices Nevada Properties</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-bhhs-gold transition" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-bhhs-gold transition" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-bhhs-gold transition" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-bhhs-gold transition" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-xl mb-4">Contact</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span>8850 W Sunset Rd Suite 200, Las Vegas, NV 89148</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3"></i>
                <span>(702) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3"></i>
                <span>jan.duffy@bhhs.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-xl mb-4">Areas Served</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Mountains Edge</li>
              <li>Summerlin</li>
              <li>Henderson</li>
              <li>Southern Highlands</li>
              <li>Green Valley</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-xl mb-4">Resources</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:text-bhhs-gold transition">Home Buyer's Guide</a></li>
              <li><a href="#" className="hover:text-bhhs-gold transition">Seller Resources</a></li>
              <li><a href="#" className="hover:text-bhhs-gold transition">Moving to Las Vegas</a></li>
              <li><a href="#" className="hover:text-bhhs-gold transition">Mortgage Calculator</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>©{new Date().getFullYear()} Berkshire Hathaway HomeServices Nevada Properties. Equal Housing Opportunity. All information deemed reliable but not guaranteed.</p>
          
          <div className="flex justify-center space-x-4 mt-4">
            {/* Equal Housing Opportunity Logo - SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
              <rect width="40" height="40" fill="white"/>
              <path d="M20 8L5 18H10V32H30V18H35L20 8Z" fill="white" stroke="white"/>
              <path d="M20 8L5 18H10V32H30V18H35L20 8Z" stroke="white"/>
              <text x="20" y="25" fontFamily="Arial" fontSize="6" fill="white" textAnchor="middle">EQUAL HOUSING</text>
              <text x="20" y="30" fontFamily="Arial" fontSize="6" fill="white" textAnchor="middle">OPPORTUNITY</text>
            </svg>
            
            {/* REALTOR Logo - SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
              <rect width="40" height="40" fill="white"/>
              <path d="M8 10H32V30H8V10Z" fill="white" stroke="white"/>
              <text x="20" y="24" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">REALTOR®</text>
            </svg>
            
            {/* BHHS Logo - SVG */}
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
              <rect width="80" height="40" fill="#00008B"/>
              <text x="40" y="20" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle">Berkshire Hathaway</text>
              <text x="40" y="28" fontFamily="Arial" fontSize="6" fill="white" textAnchor="middle" dominantBaseline="middle">HomeServices</text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
