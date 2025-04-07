import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WIDGET_IDS } from "@/lib/constants";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Search, 
  Calendar, 
  MapPin, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  ChevronDown,
  X 
} from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Beautiful single-family home in the desirable Mountains Edge community. This stunning property features 4 bedrooms, 3 bathrooms, and an open floor plan. Enjoy breathtaking mountain views, a spacious backyard with covered patio, and luxury finishes throughout. The chef's kitchen includes stainless steel appliances, granite countertops, and a large island.",
    features: ["Gourmet Kitchen", "Mountain Views", "Two-car Garage", "Swimming Pool", "Smart Home System", "Energy Efficient"]
  },
  {
    id: 2,
    address: "456 Canyon Ridge Lane",
    price: 625000,
    bedrooms: 5,
    bathrooms: 3.5,
    sqft: 3200,
    type: "single",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Stunning 5-bedroom contemporary home in Mountains Edge with panoramic canyon views. This elegant residence offers a spacious open floor plan, gourmet kitchen with premium appliances, and a luxurious primary suite with spa-like bathroom. The expansive outdoor living area features a covered patio, built-in BBQ, and fire pit.",
    features: ["Home Office", "Walk-in Closets", "Media Room", "Outdoor Kitchen", "Landscaped Garden", "Water Softener System"]
  },
  {
    id: 3,
    address: "789 Desert View Terrace",
    price: 525000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    type: "townhouse",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Charming townhome in the heart of Mountains Edge with desert and mountain views. This well-maintained property features an updated kitchen, spacious living areas, and a private patio. Community amenities include a pool, spa, and walking trails. Perfect for first-time buyers or downsizers looking for a low-maintenance lifestyle.",
    features: ["Community Pool", "Updated Kitchen", "Private Patio", "Walking Trails", "Low HOA Fees", "Attached Garage"]
  },
  {
    id: 4,
    address: "321 Sunset Peak Court",
    price: 725000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3600,
    type: "single",
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Luxurious estate home in Mountains Edge with breathtaking sunset and mountain views. This impressive residence features soaring ceilings, designer finishes, and premium appliances. The backyard oasis includes a resort-style pool with waterfall, outdoor kitchen, and covered patio. Perfect for entertaining and luxury living.",
    features: ["Resort-style Pool", "Wine Cellar", "Home Theater", "Designer Finishes", "3-car Garage", "Guest Suite"]
  },
  {
    id: 5,
    address: "555 Valley Vista Avenue",
    price: 675000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3000,
    type: "single",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Beautifully updated home in Mountains Edge with modern finishes and mountain views. This spacious property features a remodeled kitchen with quartz countertops, renovated bathrooms, and new flooring throughout. The private backyard includes a covered patio, built-in BBQ, and tranquil garden areas perfect for relaxation and entertaining.",
    features: ["Quartz Countertops", "Renovated Bathrooms", "New Flooring", "Covered Patio", "Built-in BBQ", "Garden Areas"]
  },
  {
    id: 6,
    address: "888 Sierra Circle",
    price: 550000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2400,
    type: "townhouse",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Stunning townhome in the prestigious Sierra Estates community of Mountains Edge. This move-in ready property features an open floor plan, upgraded kitchen with stainless steel appliances, and a spacious primary suite. Enjoy the community amenities including pool, spa, and fitness center, all within walking distance to parks and trails.",
    features: ["Fitness Center Access", "Community Clubhouse", "Upgraded Kitchen", "Open Floor Plan", "Walk to Parks", "Gated Community"]
  }
];

// Interface for Property type
interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  image: string;
  description?: string;
  features?: string[];
}

export default function PropertiesSection() {
  const [filters, setFilters] = useState<FilterOptions>({
    propertyType: "all",
    priceRange: "500000-600000",
    bedrooms: "any",
    bathrooms: "any"
  });
  
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
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
  
  // Handle opening property details modal
  const openPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setDetailsOpen(true);
  };
  
  // Handle closing property details modal
  const closePropertyDetails = () => {
    setDetailsOpen(false);
  };

  // Add animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Track current visible property for mobile view
  const [activeMobileProperty, setActiveMobileProperty] = useState(0);
  const propertiesContainerRef = useRef<HTMLDivElement>(null);

  const nextProperty = () => {
    if (filteredProperties.length > 0) {
      setActiveMobileProperty(prev => 
        prev === filteredProperties.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevProperty = () => {
    if (filteredProperties.length > 0) {
      setActiveMobileProperty(prev => 
        prev === 0 ? filteredProperties.length - 1 : prev - 1
      );
    }
  };

  // Handle filter animation
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  return (
    <section id="properties" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-bhhs-navy mb-4">Featured Properties</h2>
          <p className="text-bhhs-dark text-lg max-w-2xl mx-auto">Discover luxury homes in Mountains Edge with exceptional features and prime locations</p>
        </motion.div>
        
        {/* Filter Section - Enhanced with animation */}
        <motion.div 
          className={`bg-white rounded-xl shadow-md mb-12 overflow-hidden transition-all duration-300 border border-gray-100`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="p-6 pb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-bhhs-navy/10 rounded-full flex items-center justify-center">
                  <Search className="h-5 w-5 text-bhhs-navy" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-bhhs-navy">Find Your Dream Home</h3>
              </div>
              <button 
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="text-bhhs-navy flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors"
              >
                {isFilterExpanded ? "Hide Filters" : "Show All Filters"}
                {isFilterExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {isFilterExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-bhhs-navy" />
                        <label className="block text-sm font-medium text-bhhs-navy">Property Type</label>
                      </div>
                      <select 
                        name="propertyType"
                        value={filters.propertyType}
                        onChange={handleFilterChange}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bhhs-navy text-sm"
                      >
                        <option value="all">All Types</option>
                        <option value="single">Single Family Homes</option>
                        <option value="townhouse">Townhouses</option>
                        <option value="multi">Multi-Family</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-bhhs-navy" />
                        <label className="block text-sm font-medium text-bhhs-navy">Price Range</label>
                      </div>
                      <select 
                        name="priceRange"
                        value={filters.priceRange}
                        onChange={handleFilterChange}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bhhs-navy text-sm"
                      >
                        <option value="500000-600000">$500,000 - $600,000</option>
                        <option value="600000-700000">$600,000 - $700,000</option>
                        <option value="700000-800000">$700,000 - $800,000</option>
                        <option value="800000+">$800,000+</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-bhhs-navy" />
                        <label className="block text-sm font-medium text-bhhs-navy">Bedrooms</label>
                      </div>
                      <select 
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleFilterChange}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bhhs-navy text-sm"
                      >
                        <option value="any">Any</option>
                        <option value="2+">2+</option>
                        <option value="3+">3+</option>
                        <option value="4+">4+</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-bhhs-navy" />
                        <label className="block text-sm font-medium text-bhhs-navy">Bathrooms</label>
                      </div>
                      <select 
                        name="bathrooms"
                        value={filters.bathrooms}
                        onChange={handleFilterChange}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bhhs-navy text-sm"
                      >
                        <option value="any">Any</option>
                        <option value="2+">2+</option>
                        <option value="3+">3+</option>
                        <option value="4+">4+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{filteredProperties.length}</span> properties found
              </div>
              
              <Button 
                onClick={applyFilters}
                className="bg-bhhs-navy hover:bg-bhhs-navy/90 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Property Listings Section */}
        <div>
          {/* Mobile Property Carousel (visible on small screens) */}
          <div className="lg:hidden mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={prevProperty}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition"
                aria-label="Previous property"
                disabled={filteredProperties.length === 0}
              >
                <ChevronLeft className="h-5 w-5 text-bhhs-navy" />
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={nextProperty}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition"
                aria-label="Next property"
                disabled={filteredProperties.length === 0}
              >
                <ChevronRight className="h-5 w-5 text-bhhs-navy" />
              </button>
            </div>
            
            <div className="overflow-hidden px-10">
              <AnimatePresence mode="wait">
                {filteredProperties.length > 0 ? (
                  <motion.div
                    key={`mobile-property-${activeMobileProperty}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden shadow-lg border border-gray-100">
                      <div className="relative">
                        <img 
                          src={filteredProperties[activeMobileProperty].image} 
                          alt={filteredProperties[activeMobileProperty].address} 
                          className="h-60 w-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-3">
                          <div className="bg-bhhs-navy text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                            ${filteredProperties[activeMobileProperty].price.toLocaleString()}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h4 className="font-montserrat font-semibold text-lg text-white">{filteredProperties[activeMobileProperty].address}</h4>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-bhhs-navy" />
                            <span className="text-bhhs-dark">{filteredProperties[activeMobileProperty].bedrooms} {filteredProperties[activeMobileProperty].bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="h-4 w-4 text-bhhs-navy" />
                            <span className="text-bhhs-dark">{filteredProperties[activeMobileProperty].bathrooms} {filteredProperties[activeMobileProperty].bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4 text-bhhs-navy" />
                            <span className="text-bhhs-dark">{filteredProperties[activeMobileProperty].sqft.toLocaleString()} sqft</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="bg-gray-100 text-bhhs-navy px-3 py-1 rounded-full text-xs font-medium">
                            {filteredProperties[activeMobileProperty].type === 'single' ? 'Single Family' : 
                             filteredProperties[activeMobileProperty].type === 'townhouse' ? 'Townhouse' : 'Multi-Family'}
                          </span>
                          <Button 
                            onClick={() => openPropertyDetails(filteredProperties[activeMobileProperty])}
                            className="bg-accent hover:bg-accent/90 text-white text-sm px-4 py-2 rounded-lg"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-bhhs-dark">No properties match your search criteria. Please try different filters.</p>
                  </div>
                )}
              </AnimatePresence>
              
              {/* Pagination dots */}
              {filteredProperties.length > 1 && (
                <div className="flex justify-center gap-1 mt-4">
                  {filteredProperties.map((_, index) => (
                    <button 
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === activeMobileProperty 
                          ? 'w-6 bg-bhhs-navy' 
                          : 'w-2 bg-gray-300'
                      }`}
                      onClick={() => setActiveMobileProperty(index)}
                      aria-label={`Go to property ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop Property Grid (visible on large screens) */}
          <motion.div 
            className="hidden lg:block"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            ref={propertiesContainerRef}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div 
                  key={property.id} 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="relative">
                      <img 
                        src={property.image} 
                        alt={property.address} 
                        className="h-56 w-full object-cover"
                      />
                      <div className="absolute top-0 right-0 m-3">
                        <div className="bg-bhhs-navy text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          ${property.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h4 className="font-montserrat font-semibold text-lg text-white leading-tight">{property.address}</h4>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-bhhs-navy" />
                          <span className="text-bhhs-dark text-sm">{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="h-4 w-4 text-bhhs-navy" />
                          <span className="text-bhhs-dark text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Square className="h-4 w-4 text-bhhs-navy" />
                          <span className="text-bhhs-dark text-sm">{property.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="bg-gray-100 text-bhhs-navy px-3 py-1 rounded-full text-xs font-medium">
                          {property.type === 'single' ? 'Single Family' : 
                           property.type === 'townhouse' ? 'Townhouse' : 'Multi-Family'}
                        </span>
                        <Button 
                          onClick={() => openPropertyDetails(property)}
                          className="bg-accent hover:bg-accent/90 text-white text-sm px-4 py-2 rounded-lg"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* No results message */}
            {filteredProperties.length === 0 && (
              <motion.div 
                className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-bhhs-navy mb-2">No Results Found</h3>
                <p className="text-bhhs-dark">We couldn't find any properties matching your criteria.</p>
                <p className="text-bhhs-dark mt-1">Try adjusting your filters for more results.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a 
            href="#contact" 
            className="bg-bhhs-navy text-white font-montserrat font-semibold px-8 py-3 rounded-lg hover:bg-bhhs-navy/90 shadow-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            Schedule a Property Tour
          </a>
          
          <p className="text-gray-500 mt-4 text-sm">
            Don't see what you're looking for? Contact Dr. Jan Duffy for access to additional properties.
          </p>
        </motion.div>
      </motion.div>
      
      {/* Property Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedProperty && (
          <DialogContent className="sm:max-w-[800px] overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-montserrat text-bhhs-navy">
                {selectedProperty.address}
              </DialogTitle>
              <DialogDescription className="text-xl font-semibold text-bhhs-gold">
                ${selectedProperty.price.toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.address} 
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <div className="flex justify-between text-bhhs-dark text-sm mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{selectedProperty.bedrooms}</span>
                    <span>Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{selectedProperty.bathrooms}</span>
                    <span>Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{selectedProperty.sqft.toLocaleString()}</span>
                    <span>Square Feet</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-montserrat font-semibold text-lg mb-2 text-bhhs-navy">Property Description</h4>
                <p className="text-bhhs-dark mb-4">{selectedProperty.description}</p>
                
                <h4 className="font-montserrat font-semibold text-lg mb-2 text-bhhs-navy">Features</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {selectedProperty.features?.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-bhhs-gold rounded-full mr-2"></span>
                      <span className="text-bhhs-dark">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <Button variant="outline" onClick={closePropertyDetails}>
                Close
              </Button>
              <Button 
                className="bg-bhhs-navy hover:bg-opacity-90 text-white"
                onClick={() => {
                  closePropertyDetails();
                  // Scroll to contact form
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule a Viewing
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
