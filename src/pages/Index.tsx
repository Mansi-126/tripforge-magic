import { useState } from "react";
import { TravelFormData, TravelItinerary } from "@/types/travel";
import { HeroSection } from "@/components/landing/HeroSection";
import { TravelWizard } from "@/components/travel/TravelWizard";
import { ItineraryDisplay } from "@/components/itinerary/ItineraryDisplay";
import { useToast } from "@/hooks/use-toast";

type AppState = "landing" | "planning" | "itinerary";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [itinerary, setItinerary] = useState<TravelItinerary | null>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setAppState("planning");
  };

  const handlePlanningComplete = async (formData: TravelFormData) => {
    try {
      toast({
        title: "Generating Your Itinerary",
        description: "Please wait while we create your perfect travel plan...",
      });

      const response = await fetch("https://travel-itinerary-vfst.onrender.com/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const data = await response.json();
      setItinerary(data);
      setAppState("itinerary");
      
      toast({
        title: "Itinerary Ready!",
        description: "Your personalized travel plan has been created successfully.",
      });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewTrip = () => {
    setAppState("landing");
    setItinerary(null);
  };

  return (
    <div className="min-h-screen">
      {appState === "landing" && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {appState === "planning" && (
        <TravelWizard onComplete={handlePlanningComplete} />
      )}
      
      {appState === "itinerary" && itinerary && (
        <ItineraryDisplay 
          itinerary={itinerary} 
          onNewTrip={handleNewTrip}
        />
      )}
    </div>
  );
};

export default Index;
