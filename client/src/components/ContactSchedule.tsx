import { useEffect } from "react";
import LeadForm from "./LeadForm";

declare global {
  interface Window {
    Calendly?: any;
  }
}

export default function ContactSchedule() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Initialize Calendly widget once script is loaded
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/janduffy/property-consultation',
          parentElement: document.getElementById('calendly-embed'),
          prefill: {},
          utm: {},
          resize: true, // Enable automatic resizing
          hideEventTypeDetails: true, // Hide redundant information
          hideGdprBanner: true // Hide cookie banner since we're managing it site-wide
        });
      }
    };
    
    // Set up event listener for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (isCalendlyEvent(e)) {
        console.log("Calendly event detected:", e.data.event);
        
        // Track successful scheduling events
        if (e.data.event === 'calendly.event_scheduled') {
          console.log("Appointment scheduled successfully!");
          // You could add analytics tracking here
        }
      }
    };
    
    window.addEventListener("message", handleCalendlyEvent);
    
    return () => {
      // Remove event listener on unmount
      window.removeEventListener("message", handleCalendlyEvent);
      
      // Clean up script if it exists
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
      
      // Remove any Calendly-related elements that might have been added
      const calendlyElements = document.querySelectorAll('[data-calendly]');
      calendlyElements.forEach(el => el.remove());
    };
  }, []);
  
  // Helper function to check if an event is from Calendly
  const isCalendlyEvent = (e: MessageEvent) => {
    return e.origin === "https://calendly.com" && 
           e.data.event && 
           e.data.event.indexOf("calendly.") === 0;
  };

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-bhhs-navy mb-3">Contact Dr. Jan Duffy</h2>
          <p className="text-bhhs-dark max-w-2xl mx-auto">Get in touch to discuss your real estate needs or schedule a viewing</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lead Collection Form */}
          <div className="bg-bhhs-light rounded-lg shadow-md p-6">
            <h3 className="font-montserrat font-semibold text-2xl text-bhhs-navy mb-4">Send Me a Message</h3>
            <LeadForm />
          </div>
          
          {/* Calendly Widget */}
          <div className="bg-bhhs-light rounded-lg shadow-md p-6">
            <h3 className="font-montserrat font-semibold text-2xl text-bhhs-navy mb-4">Schedule a Property Consultation</h3>
            <div 
              id="calendly-embed" 
              style={{ minWidth: "320px", height: "630px" }}
              className="rounded overflow-hidden"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
