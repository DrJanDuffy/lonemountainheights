export default function AreaInfo() {
  return (
    <section id="area" className="py-16 px-4 bg-bhhs-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-bhhs-navy mb-3">Mountains Edge Community</h2>
          <p className="text-bhhs-dark max-w-2xl mx-auto">Discover why Mountains Edge is one of the most desirable communities in Las Vegas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div
              className="rounded-lg shadow-md w-full h-80 bg-center bg-cover"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1561041146-e1de8e1c366c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
              }}
              aria-label="Mountains Edge Community Park"
            ></div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-2xl text-bhhs-navy mb-4">Modern Master-Planned Community</h3>
            <p className="mb-4 text-bhhs-dark">
              Mountains Edge is a premier master-planned community located in the southwestern part of Las Vegas. 
              Known for its beautiful desert landscaping, family-friendly parks, and modern amenities, 
              Mountains Edge offers an exceptional living experience.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <i className="fas fa-tree text-bhhs-gold mt-1 mr-3 text-xl"></i>
                <div>
                  <h4 className="font-montserrat font-semibold text-bhhs-navy">500+ Acres of Parks</h4>
                  <p className="text-sm text-bhhs-dark">Community and neighborhood parks throughout</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-graduation-cap text-bhhs-gold mt-1 mr-3 text-xl"></i>
                <div>
                  <h4 className="font-montserrat font-semibold text-bhhs-navy">Top Schools</h4>
                  <p className="text-sm text-bhhs-dark">Access to highly-rated Clark County schools</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-hiking text-bhhs-gold mt-1 mr-3 text-xl"></i>
                <div>
                  <h4 className="font-montserrat font-semibold text-bhhs-navy">Hiking Trails</h4>
                  <p className="text-sm text-bhhs-dark">Miles of walking and biking trails</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-shopping-cart text-bhhs-gold mt-1 mr-3 text-xl"></i>
                <div>
                  <h4 className="font-montserrat font-semibold text-bhhs-navy">Shopping & Dining</h4>
                  <p className="text-sm text-bhhs-dark">Minutes from shopping centers and restaurants</p>
                </div>
              </div>
            </div>
            
            <a 
              href="#contact" 
              className="bg-bhhs-navy text-white font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition inline-block"
            >
              Learn More About Mountains Edge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
