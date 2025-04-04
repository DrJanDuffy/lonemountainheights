import { useEffect } from "react";
import LeadForm from "./LeadForm";

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
          utm: {}
        });
      }
    };
    
    return () => {
      // Clean up script on unmount
      document.body.removeChild(script);
      
      // Remove any Calendly-related elements that might have been added
      const calendlyElements = document.querySelectorAll('[data-calendly]');
      calendlyElements.forEach(el => el.remove());
    };
  }, []);

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
            <h3 className="font-montserrat font-semibold text-2xl text-bhhs-navy mb-4">Schedule an Appointment</h3>
            <div id="calendly-embed" style={{ minWidth: "320px", height: "600px" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
