export default function AboutRealtor() {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-bhhs-navy mb-3">Dr. Jan Duffy</h2>
            <p className="text-bhhs-gold font-montserrat font-semibold mb-4">Realtor® with Berkshire Hathaway HomeServices</p>
            <p className="mb-6 text-bhhs-dark">
              With extensive knowledge of the Mountains Edge area and a dedication to exceptional client service, 
              I help buyers and sellers navigate the Las Vegas real estate market with confidence.
            </p>
            
            <div className="mb-6">
              <h3 className="font-montserrat font-semibold text-bhhs-navy mb-2">Credentials:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-bhhs-gold mt-1 mr-3"></i>
                  <span>Licensed Nevada Real Estate Professional</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-bhhs-gold mt-1 mr-3"></i>
                  <span>Mountains Edge Community Specialist</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-bhhs-gold mt-1 mr-3"></i>
                  <span>Doctorate in Real Estate Economics</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-bhhs-gold mt-1 mr-3"></i>
                  <span>Berkshire Hathaway President's Circle</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href="tel:7021234567" 
                className="flex items-center bg-bhhs-light hover:bg-bhhs-navy hover:text-white text-bhhs-navy font-montserrat px-4 py-2 rounded transition"
              >
                <i className="fas fa-phone-alt mr-2"></i> (702) 123-4567
              </a>
              <a 
                href="mailto:jan.duffy@bhhs.com" 
                className="flex items-center bg-bhhs-light hover:bg-bhhs-navy hover:text-white text-bhhs-navy font-montserrat px-4 py-2 rounded transition"
              >
                <i className="fas fa-envelope mr-2"></i> jan.duffy@bhhs.com
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 text-center">
            <div 
              className="rounded-full w-64 h-64 mx-auto border-4 border-bhhs-gold shadow-lg bg-center bg-cover"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80')",
              }}
              aria-label="Dr. Jan Duffy, Realtor"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
