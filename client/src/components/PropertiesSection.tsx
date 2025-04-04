import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WIDGET_IDS } from "@/lib/constants";

declare global {
  interface Window {
    RealScout?: any;
  }
}

type FilterOptions = {
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
};

export default function PropertiesSection() {
  const realScoutInitialized = useRef(false);
  const [filters, setFilters] = useState<FilterOptions>({
    propertyType: "all",
    priceRange: "500000-600000",
    bedrooms: "any",
    bathrooms: "any"
  });
  
  useEffect(() => {
    // Only initialize RealScout if not already done
    if (!realScoutInitialized.current) {
      // Create RealScout container element
      const container = document.getElementById('realscout-container');
      if (container) {
        // Create the iframe element
        const iframe = document.createElement('iframe');
        iframe.id = 'realscout-iframe';
        iframe.width = '100%';
        iframe.height = '600px';
        iframe.style.border = 'none';
        
        // Construct the URL with agent ID and price parameters
        const agentId = WIDGET_IDS.realScout.agentId;
        const priceMin = WIDGET_IDS.realScout.priceMin;
        iframe.src = `https://www.realscout.com/embed-search?agent_encoded_id=${agentId}&price_min=${priceMin}`;
        
        // Append the iframe to the container
        container.appendChild(iframe);
        
        realScoutInitialized.current = true;
      }
    }
    
    return () => {
      // Clean up
      const iframe = document.getElementById('realscout-iframe');
      if (iframe) {
        iframe.remove();
      }
      realScoutInitialized.current = false;
    };
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    
    // Get the iframe
    const iframe = document.getElementById('realscout-iframe') as HTMLIFrameElement;
    if (iframe) {
      // Get the current URL
      let currentSrc = new URL(iframe.src);
      
      // Update search parameters based on filters
      if (filters.propertyType !== "all") {
        currentSrc.searchParams.set('property_types', filters.propertyType);
      } else {
        currentSrc.searchParams.delete('property_types');
      }
      
      // Handle price range
      const [min, max] = filters.priceRange.split('-');
      currentSrc.searchParams.set('price_min', min);
      if (max && !max.includes('+')) {
        currentSrc.searchParams.set('price_max', max);
      } else {
        currentSrc.searchParams.delete('price_max');
      }
      
      // Handle bedrooms
      if (filters.bedrooms !== "any") {
        const bedroomCount = filters.bedrooms.replace('+', '');
        currentSrc.searchParams.set('beds_min', bedroomCount);
      } else {
        currentSrc.searchParams.delete('beds_min');
      }
      
      // Handle bathrooms
      if (filters.bathrooms !== "any") {
        const bathroomCount = filters.bathrooms.replace('+', '');
        currentSrc.searchParams.set('baths_min', bathroomCount);
      } else {
        currentSrc.searchParams.delete('baths_min');
      }
      
      // Update the iframe src
      iframe.src = currentSrc.toString();
    }
  };

  return (
    <section id="properties" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-bhhs-navy mb-3">Featured Properties</h2>
          <p className="text-bhhs-dark max-w-2xl mx-auto">Discover luxury homes in Mountains Edge starting at $500,000</p>
        </div>
        
        {/* Filter Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h3 className="font-montserrat font-semibold text-xl mb-4">Filter Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-bhhs-dark mb-1">Property Type</label>
                <select 
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bhhs-navy"
                >
                  <option value="all">All Types</option>
                  <option value="single">Single Family Homes</option>
                  <option value="townhouse">Townhouses</option>
                  <option value="multi">Multi-Family</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-bhhs-dark mb-1">Price Range</label>
                <select 
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bhhs-navy"
                >
                  <option value="500000-600000">$500,000 - $600,000</option>
                  <option value="600000-700000">$600,000 - $700,000</option>
                  <option value="700000-800000">$700,000 - $800,000</option>
                  <option value="800000+">$800,000+</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-bhhs-dark mb-1">Bedrooms</label>
                <select 
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bhhs-navy"
                >
                  <option value="any">Any</option>
                  <option value="2+">2+</option>
                  <option value="3+">3+</option>
                  <option value="4+">4+</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-bhhs-dark mb-1">Bathrooms</label>
                <select 
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bhhs-navy"
                >
                  <option value="any">Any</option>
                  <option value="2+">2+</option>
                  <option value="3+">3+</option>
                  <option value="4+">4+</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center mt-2">
              <button 
                onClick={applyFilters}
                className="bg-bhhs-navy text-white font-montserrat px-6 py-2 rounded hover:bg-opacity-90 transition"
              >
                Apply Filters
              </button>
            </div>
          </CardContent>
        </Card>
        
        {/* RealScout Widget */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h3 className="font-montserrat font-semibold text-xl mb-2 text-center">RealScout Property Listings</h3>
          <p className="text-sm text-bhhs-dark mb-4 text-center">Browse luxury properties in Mountains Edge</p>
          
          {/* RealScout Widget Integration using iframe */}
          <div id="realscout-container" className="w-full min-h-[600px]">
            {/* iframe will be inserted here dynamically */}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="#contact" 
            className="bg-accent text-white font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition inline-block"
          >
            See All Available Properties
          </a>
        </div>
      </div>
    </section>
  );
}
