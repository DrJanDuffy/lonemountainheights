import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

type FilterOptions = {
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
};

export default function PropertiesSection() {
  const [filters, setFilters] = useState<FilterOptions>({
    propertyType: "all",
    priceRange: "500000-600000",
    bedrooms: "any",
    bathrooms: "any"
  });
  
  useEffect(() => {
    // Load RealScout widget script
    const script = document.createElement("script");
    script.id = "realscout-widget-script";
    script.async = true;
    script.src = "https://widgets.realscout.com/realscout-search-widget.js";
    document.body.appendChild(script);
    
    return () => {
      // Clean up script on unmount
      const existingScript = document.getElementById("realscout-widget-script");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
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
    // In a real implementation, we would use these filters with the RealScout API
    console.log("Applying filters:", filters);
    
    // Reset and reload RealScout widget with new filters
    const existingWidget = document.getElementById("rs-search-widget");
    if (existingWidget) {
      existingWidget.innerHTML = "";
      
      // Re-initialize widget with new filters
      const widget = document.createElement("div");
      widget.className = "rs-search";
      widget.dataset.agentEncodedId = "QWdlbnQtMjI1MDUw";
      widget.dataset.priceMin = "500000";
      
      if (filters.propertyType !== "all") {
        widget.dataset.propertyTypes = filters.propertyType;
      }
      
      existingWidget.appendChild(widget);
      
      // Reload RealScout script
      const existingScript = document.getElementById("realscout-widget-script");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      
      const script = document.createElement("script");
      script.id = "realscout-widget-script";
      script.async = true;
      script.src = "https://widgets.realscout.com/realscout-search-widget.js";
      document.body.appendChild(script);
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
          
          {/* RealScout Widget Integration */}
          <div id="rs-search-widget" className="min-h-[400px]">
            <div className="rs-search" 
              data-agent-encoded-id="QWdlbnQtMjI1MDUw" 
              data-price-min="500000">
            </div>
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
