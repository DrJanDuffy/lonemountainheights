import { useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function WidgetsSection() {
  useEffect(() => {
    // Load CloudCMA Widget
    const cloudCmaScript = document.createElement("script");
    cloudCmaScript.id = "cloudcma-widget-script";
    cloudCmaScript.async = true;
    cloudCmaScript.src = "https://www.cloudcma.com/api/cloudcma.widget.js";
    document.body.appendChild(cloudCmaScript);
    
    // Load Homebot Widget
    const homebotScript = document.createElement("script");
    homebotScript.id = "homebot-widget-script";
    homebotScript.async = true;
    homebotScript.src = "https://widgets.homebot.ai/widget.js";
    document.body.appendChild(homebotScript);
    
    return () => {
      // Clean up scripts on unmount
      const existingCloudCmaScript = document.getElementById("cloudcma-widget-script");
      if (existingCloudCmaScript) {
        document.body.removeChild(existingCloudCmaScript);
      }
      
      const existingHomebotScript = document.getElementById("homebot-widget-script");
      if (existingHomebotScript) {
        document.body.removeChild(existingHomebotScript);
      }
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-bhhs-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-bhhs-navy mb-3">Helpful Resources</h2>
          <p className="text-bhhs-dark max-w-2xl mx-auto">Tools to help you make informed real estate decisions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Homebot Widget */}
          <Card>
            <CardHeader className="bg-bhhs-navy text-white p-4">
              <h3 className="font-montserrat font-semibold text-xl">Track Your Home's Value</h3>
              <p className="text-sm opacity-80">Get monthly updates on your property's value</p>
            </CardHeader>
            <CardContent className="p-6">
              <div id="homebot-widget" className="min-h-[300px]">
                <div 
                  className="homebot-embed"
                  data-id="35de8cf0a487cf0fec06278f2023805ea02eba0b58960a43"
                ></div>
              </div>
            </CardContent>
          </Card>
          
          {/* CloudCMA Widget */}
          <Card>
            <CardHeader className="bg-bhhs-navy text-white p-4">
              <h3 className="font-montserrat font-semibold text-xl">What's Your Home Worth?</h3>
              <p className="text-sm opacity-80">Get a detailed comparative market analysis</p>
            </CardHeader>
            <CardContent className="p-6">
              <div id="cloudcma-widget" className="min-h-[300px]">
                <div 
                  className="cloudcma-popup"
                  data-id="0a2124dd852cffd63e48e79e9b283398"
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
