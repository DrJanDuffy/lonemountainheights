import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertiesSection from "@/components/PropertiesSection";
import AreaInfo from "@/components/AreaInfo";
import AboutRealtor from "@/components/AboutRealtor";
import WidgetsSection from "@/components/WidgetsSection";
import ContactSchedule from "@/components/ContactSchedule";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Mountains Edge | Las Vegas Homes | Dr. Jan Duffy";
    
    // Load FontAwesome
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/3f4c893109.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PropertiesSection />
        <AreaInfo />
        <AboutRealtor />
        <WidgetsSection />
        <ContactSchedule />
      </main>
      <Footer />
    </div>
  );
}
