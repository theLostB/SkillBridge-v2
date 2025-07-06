
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }}></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Skill<span className="text-yellow-300">Bridge</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            Your AI-Powered Career Roadmap Generator
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Discover personalized learning paths and career guidance tailored to your unique goals, interests, and availability.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Get Started
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
