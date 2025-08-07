import { useState } from "react";
import { Globe, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StepCard } from "../StepCard";

interface CountryStepProps {
  data: { country: string; state: string };
  onUpdate: (data: { country: string; state: string }) => void;
  onNext: () => void;
}

const popularCountries = [
  "Japan", "Italy", "Thailand", "France", "USA", "Australia", 
  "India", "Spain", "Greece", "Mexico", "Brazil", "Egypt"
];

export const CountryStep = ({ data, onUpdate, onNext }: CountryStepProps) => {
  const [country, setCountry] = useState(data.country);
  const [state, setState] = useState(data.state);

  const handleSubmit = () => {
    if (country.trim()) {
      onUpdate({ country: country.trim(), state: state.trim() });
      onNext();
    }
  };

  const selectCountry = (selectedCountry: string) => {
    setCountry(selectedCountry);
    onUpdate({ country: selectedCountry, state: state.trim() });
  };

  return (
    <StepCard>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Globe className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Where do you want to go?
        </h1>
        <p className="text-muted-foreground text-lg">
          Let's start your amazing journey by choosing your destination
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="country" className="text-base font-semibold mb-3 block">
            Destination Country *
          </Label>
          <Input
            id="country"
            placeholder="Enter country name..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-12 text-base"
            autoFocus
          />
        </div>

        <div>
          <Label htmlFor="state" className="text-base font-semibold mb-3 block">
            State/Region (Optional)
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <Input
              id="state"
              placeholder="Enter state or region..."
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3">Popular destinations:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {popularCountries.map((countryName) => (
              <Button
                key={countryName}
                variant="outline"
                size="sm"
                onClick={() => selectCountry(countryName)}
                className="justify-start hover:bg-gradient-primary hover:text-white transition-all duration-300"
              >
                {countryName}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!country.trim()}
          className="w-full"
          variant="hero"
          size="lg"
        >
          Continue to Cities
        </Button>
      </div>
    </StepCard>
  );
};