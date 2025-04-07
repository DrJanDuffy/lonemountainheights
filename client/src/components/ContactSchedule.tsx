import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Phone, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import LeadForm from "./LeadForm";

declare global {
  interface Window {
    Calendly?: any;
  }
}

export default function ContactSchedule() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [appointmentScheduled, setAppointmentScheduled] = useState(false);
  const [appointmentError, setAppointmentError] = useState(false);

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
          url: 'https://calendly.com/janduffy/property-consultation?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=00008B',
          parentElement: document.getElementById('calendly-embed'),
          prefill: {},
          utm: {},
          resize: true, // Enable automatic resizing
        });
        setIsCalendlyLoaded(true);
      }
    };
    
    // Set up event listener for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (isCalendlyEvent(e)) {
        console.log("Calendly event detected:", e.data.event);
        
        // Track successful scheduling events
        if (e.data.event === 'calendly.event_scheduled') {
          console.log("Appointment scheduled successfully!");
          setAppointmentScheduled(true);
          
          // Reset appointment scheduled message after 5 seconds
          setTimeout(() => {
            setAppointmentScheduled(false);
          }, 5000);
          
          // You could add analytics tracking here
        }
        
        // Track errors
        if (e.data.event === 'calendly.error') {
          console.error("Calendly error:", e.data.payload);
          setAppointmentError(true);
          
          // Reset error message after 5 seconds
          setTimeout(() => {
            setAppointmentError(false);
          }, 5000);
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
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-montserrat font-bold text-bhhs-navy mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contact Dr. Jan Duffy
          </motion.h2>
          <motion.p 
            className="text-bhhs-dark text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready to find your dream home in Mountains Edge? Get in touch today to discuss your real estate needs or schedule a viewing.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Lead Collection Form */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-montserrat font-semibold text-2xl text-bhhs-navy">Send Me a Message</h3>
            </div>
            <p className="text-gray-600 mb-6">Fill out the form below and I'll get back to you as soon as possible.</p>
            <LeadForm />
          </motion.div>
          
          {/* Calendly Widget */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-bhhs-navy/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-bhhs-navy" />
              </div>
              <h3 className="font-montserrat font-semibold text-2xl text-bhhs-navy">Schedule a Consultation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Choose a convenient time for us to discuss your property needs or schedule a viewing.
            </p>
            
            {/* Calendar Features List */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">30-minute consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Phone or video call</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Instant confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Calendar integration</span>
              </div>
            </div>
            
            {/* Loading Indicator */}
            {!isCalendlyLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl z-10">
                <div className="w-12 h-12 border-4 border-bhhs-navy/30 border-t-bhhs-navy rounded-full animate-spin mb-4"></div>
                <p className="text-bhhs-navy font-medium">Loading calendar...</p>
              </div>
            )}
            
            {/* Success Message */}
            {appointmentScheduled && (
              <motion.div 
                className="absolute inset-x-8 top-20 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-20 flex items-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Success!</h4>
                  <p className="text-green-700 text-sm">Your appointment has been scheduled. Check your email for confirmation.</p>
                </div>
              </motion.div>
            )}
            
            {/* Error Message */}
            {appointmentError && (
              <motion.div 
                className="absolute inset-x-8 top-20 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-20 flex items-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-red-800">Error</h4>
                  <p className="text-red-700 text-sm">There was a problem scheduling your appointment. Please try again.</p>
                </div>
              </motion.div>
            )}
            
            <div 
              id="calendly-embed" 
              style={{ minWidth: "320px", height: "630px" }}
              className="rounded-lg overflow-hidden border border-gray-200"
            ></div>
          </motion.div>
        </div>
        
        {/* Contact Information Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h4 className="font-montserrat font-semibold text-lg text-bhhs-navy mb-2">Phone</h4>
              <p className="text-gray-600">(702) 555-1234</p>
              <p className="text-gray-500 text-sm mt-1">Available Monday-Friday, 9am-5pm PT</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h4 className="font-montserrat font-semibold text-lg text-bhhs-navy mb-2">Email</h4>
              <p className="text-gray-600">jan.duffy@bhhsnv.com</p>
              <p className="text-gray-500 text-sm mt-1">I'll respond within 24 hours</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h4 className="font-montserrat font-semibold text-lg text-bhhs-navy mb-2">Office</h4>
              <p className="text-gray-600">Berkshire Hathaway HomeServices</p>
              <p className="text-gray-500 text-sm mt-1">8850 W Sunset Rd #200, Las Vegas, NV 89148</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
