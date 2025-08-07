import { Button } from "@/components/ui/button";
import { Plane, Sparkles, MapPin, Calendar } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10" />
      
      {/* Floating icons */}
      <div className="absolute top-20 left-10 animate-float">
        <Plane className="w-8 h-8 text-app-blue opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <MapPin className="w-6 h-6 text-app-pink opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Calendar className="w-7 h-7 text-app-green opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-5 h-5 text-app-yellow opacity-60" />
      </div>
      
      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Logo/Icon */}
        <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow shadow-glow">
          <Plane className="w-12 h-12 text-white" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Virtual Travel</span>
          <br />
          <span className="text-foreground">Assistant</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Create personalized, day-by-day travel itineraries in seconds with AI. 
          Just tell us your destination, duration, and preferences – we'll handle the rest.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Smart recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
            <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Personalized</h3>
              <p className="text-sm text-muted-foreground">Tailored to your style</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
            <div className="w-10 h-10 bg-gradient-tertiary rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Instant</h3>
              <p className="text-sm text-muted-foreground">Ready in seconds</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onGetStarted}
          variant="hero"
          size="xl"
          className="px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-glow transform hover:scale-105 transition-all duration-300"
        >
          Start Planning Your Trip
          <Plane className="w-6 h-6 ml-2" />
        </Button>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-app-success rounded-full"></div>
            <span>Free to use</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-app-info rounded-full"></div>
            <span>No signup required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-app-warning rounded-full"></div>
            <span>Export to PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};