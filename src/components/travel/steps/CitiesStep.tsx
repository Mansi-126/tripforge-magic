import { useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StepCard } from "../StepCard";

interface CitiesStepProps {
  data: { cities: string[] };
  onUpdate: (data: { cities: string[] }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CitiesStep = ({ data, onUpdate, onNext, onBack }: CitiesStepProps) => {
  const [cities, setCities] = useState(data.cities);
  const [newCity, setNewCity] = useState("");

  const addCity = () => {
    if (newCity.trim() && !cities.includes(newCity.trim())) {
      const updatedCities = [...cities, newCity.trim()];
      setCities(updatedCities);
      onUpdate({ cities: updatedCities });
      setNewCity("");
    }
  };

  const removeCity = (cityToRemove: string) => {
    const updatedCities = cities.filter(city => city !== cityToRemove);
    setCities(updatedCities);
    onUpdate({ cities: updatedCities });
  };

  const handleSubmit = () => {
    if (cities.length > 0) {
      onNext();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCity();
    }
  };

  return (
    <StepCard>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Which cities would you like to visit?
        </h1>
        <p className="text-muted-foreground text-lg">
          Add the cities you want to explore during your trip
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="city" className="text-base font-semibold mb-3 block">
            Add Cities *
          </Label>
          <div className="flex gap-2">
            <Input
              id="city"
              placeholder="Enter city name..."
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 text-base"
              autoFocus
            />
            <Button onClick={addCity} variant="hero" size="lg" className="px-6">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {cities.length > 0 && (
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Selected Cities ({cities.length})
            </Label>
            <div className="flex flex-wrap gap-2">
              {cities.map((city, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gradient-primary text-white px-3 py-2 text-sm flex items-center gap-2"
                >
                  {city}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-white/20"
                    onClick={() => removeCity(city)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={cities.length === 0}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            Continue to Trip Type
          </Button>
        </div>
      </div>
    </StepCard>
  );
};