import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading state for initial page render
  useEffect(() => {
    // Add a delay to ensure all components are properly loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Loading screen while the app initializes
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-bhhs-navy/30 border-t-bhhs-navy rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-montserrat font-bold text-bhhs-navy mb-2">Mountains Edge Properties</h1>
        <p className="text-gray-600">Loading your real estate experience...</p>
      </div>
    );
  }

  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
