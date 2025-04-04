import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WIDGET_IDS } from "@/lib/constants";

type FilterOptions = {
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
};

// Mock property data for demonstration
const mockProperties = [
  {
    id: 1,
    address: "123 Mountain View Drive",
    price: 575000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2750,
    type: "single",
    image: "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    address: "456 Canyon Ridge Lane",
    price: 625000,
    bedrooms: 5,
    bathrooms: 3.5,
    sqft: 3200,
    type: "single",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    address: "789 Desert View Terrace",
    price: 525000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    type: "townhouse",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    address: "321 Sunset Peak Court",
    price: 725000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3600,
    type: "single",
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    address: "555 Valley Vista Avenue",
    price: 675000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3000,
    type: "single",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    address: "888 Sierra Circle",
    price: 550000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2400,
    type: "townhouse",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export default function PropertiesSection() {
  const [filters, setFilters] = useState<FilterOptions>({
    propertyType: "all",
    priceRange: "500000-600000",
    bedrooms: "any",
    bathrooms: "any"
  });
  
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  
  // Load RealScout script on component mount
  useEffect(() => {
    // Add RealScout script to a hidden container just to load it
    // This keeps their tracking/analytics while we show our own UI
    const script = document.createElement("script");
    script.id = "realscout-script";
    script.src = "https://js.realscout.com/target/target.js";
    script.async = true;
    script.dataset.agent = WIDGET_IDS.realScout.agentId;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      const scriptEl = document.getElementById("realscout-script");
      if (scriptEl) {
        document.body.removeChild(scriptEl);
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
    console.log("Applying filters:", filters);
    
    // Filter properties based on criteria
    let filtered = [...mockProperties];
    
    // Filter by property type
    if (filters.propertyType !== "all") {
      filtered = filtered.filter(p => p.type === filters.propertyType);
    }
    
    // Filter by price range
    const [minPrice, maxPrice] = filters.priceRange.split('-');
    filtered = filtered.filter(p => {
      if (maxPrice && !maxPrice.includes('+')) {
        return p.price >= parseInt(minPrice) && p.price <= parseInt(maxPrice);
      } else {
        return p.price >= parseInt(minPrice);
      }
    });
    
    // Filter by bedrooms
    if (filters.bedrooms !== "any") {
      const minBedrooms = parseInt(filters.bedrooms);
      filtered = filtered.filter(p => p.bedrooms >= minBedrooms);
    }
    
    // Filter by bathrooms
    if (filters.bathrooms !== "any") {
      const minBathrooms = parseInt(filters.bathrooms);
      filtered = filtered.filter(p => p.bathrooms >= minBathrooms);
    }
    
    setFilteredProperties(filtered);
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
        
        {/* Property Listings Section */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h3 className="font-montserrat font-semibold text-xl mb-2 text-center">Featured Properties</h3>
          <p className="text-sm text-bhhs-dark mb-4 text-center">Browse luxury properties in Mountains Edge</p>
          
          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.address} 
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <span className="text-white font-semibold text-xl">${property.price.toLocaleString()}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-montserrat font-semibold text-lg mb-2 text-bhhs-navy">{property.address}</h4>
                  <div className="flex justify-between text-bhhs-dark mb-2">
                    <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                    <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs uppercase">
                      {property.type === 'single' ? 'Single Family' : 
                       property.type === 'townhouse' ? 'Townhouse' : 'Multi-Family'}
                    </span>
                    <button className="text-bhhs-navy font-medium hover:underline">
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* No results message */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-10">
              <p className="text-bhhs-dark">No properties match your search criteria. Please try different filters.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="#contact" 
            className="bg-accent text-white font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition inline-block"
          >
            Contact Agent for More Properties
          </a>
        </div>
      </div>
    </section>
  );
}
