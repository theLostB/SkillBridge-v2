
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import MultiStepForm from "@/components/MultiStepForm";
import RoadmapDisplay from "@/components/RoadmapDisplay";
import { generateRoadmap } from "@/services/openRouterService";
import { FormData } from "@/components/MultiStepForm";
import { toast } from "@/hooks/use-toast";

type AppState = 'hero' | 'form' | 'roadmap';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [roadmap, setRoadmap] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Load saved roadmap from localStorage on component mount
  useEffect(() => {
    console.log("Checking localStorage for saved data...");
    const savedRoadmap = localStorage.getItem('skillbridge-roadmap');
    const savedFormData = localStorage.getItem('skillbridge-formdata');
    
    if (savedRoadmap && savedFormData) {
      console.log("Found saved data, loading...");
      setRoadmap(savedRoadmap);
      setFormData(JSON.parse(savedFormData));
      setCurrentState('roadmap');
    }
  }, []);

  const handleGetStarted = () => {
    console.log("Starting form...");
    setCurrentState('form');
  };

  const handleFormSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data);
    setFormData(data);
    setIsLoading(true);
    
    try {
      console.log("Generating roadmap...");
      const generatedRoadmap = await generateRoadmap(data);
      console.log("Roadmap generated successfully");
      
      setRoadmap(generatedRoadmap);
      setCurrentState('roadmap');
      
      // Save to localStorage
      localStorage.setItem('skillbridge-roadmap', generatedRoadmap);
      localStorage.setItem('skillbridge-formdata', JSON.stringify(data));
      console.log("Data saved to localStorage");
      
      toast({
        title: "Success!",
        description: "Your personalized roadmap has been generated.",
      });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate roadmap. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!formData) {
      console.error("No form data available for regeneration");
      return;
    }
    
    console.log("Regenerating roadmap...");
    setIsLoading(true);
    
    try {
      const generatedRoadmap = await generateRoadmap(formData);
      setRoadmap(generatedRoadmap);
      
      // Update localStorage
      localStorage.setItem('skillbridge-roadmap', generatedRoadmap);
      console.log("Roadmap regenerated and saved");
      
      toast({
        title: "Success!",
        description: "Your roadmap has been regenerated with fresh insights.",
      });
    } catch (error) {
      console.error("Error regenerating roadmap:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to regenerate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    console.log("Starting over...");
    setCurrentState('hero');
    setFormData(null);
    setRoadmap('');
    
    // Clear localStorage
    localStorage.removeItem('skillbridge-roadmap');
    localStorage.removeItem('skillbridge-formdata');
    console.log("Data cleared from localStorage");
  };

  if (currentState === 'hero') {
    return <Hero onGetStarted={handleGetStarted} />;
  }

  if (currentState === 'form') {
    return <MultiStepForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
  }

  if (currentState === 'roadmap' && formData) {
    return (
      <RoadmapDisplay
        roadmap={roadmap}
        formData={formData}
        onRegenerate={handleRegenerate}
        onStartOver={handleStartOver}
        isLoading={isLoading}
      />
    );
  }

  return null;
};

export default Index;
