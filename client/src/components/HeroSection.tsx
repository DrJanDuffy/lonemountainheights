export default function HeroSection() {
  return (
    <section className="relative h-screen max-h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      
      {/* Hero Background Image */}
      <div
        className="object-cover w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1617143207648-ec3e13bde92b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')",
          backgroundPosition: "center",
        }}
        aria-label="Mountains Edge Las Vegas aerial view"
      ></div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4">
        <h1 className="text-white font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-shadow">Discover Mountains Edge</h1>
        <p className="text-white text-xl md:text-2xl mb-8 text-shadow">Las Vegas' Premier Master Planned Community</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#properties" 
            className="bg-accent text-white font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition text-lg"
          >
            View Properties
          </a>
          <a 
            href="#contact" 
            className="bg-white text-bhhs-navy font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition text-lg"
          >
            Schedule a Tour
          </a>
        </div>
      </div>
    </section>
  );
}
