import { useState } from "react";
import { Gauge, Globe, Car, Mountain, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepCard } from "../StepCard";
import { SelectionCard } from "../SelectionCard";

interface PreferencesStepProps {
  data: { 
    preferred_pace: string; 
    immersion_level: string; 
    transport_mode: string;
    climate_preference: string;
  };
  onUpdate: (data: { 
    preferred_pace: string; 
    immersion_level: string; 
    transport_mode: string;
    climate_preference: string;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const paceTypes = [
  {
    id: "Relaxed",
    title: "Relaxed",
    description: "Take your time and enjoy",
    icon: <Gauge className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "Balanced",
    title: "Balanced",
    description: "Mix of activities and rest",
    icon: <Gauge className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "Fast-paced",
    title: "Fast-paced",
    description: "Pack in as much as possible",
    icon: <Gauge className="w-8 h-8" />,
    color: "violet" as const
  }
];

const immersionLevels = [
  {
    id: "Tourist",
    title: "Tourist",
    description: "Popular attractions and experiences",
    icon: <Globe className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "Explorer",
    title: "Explorer",
    description: "Mix of popular and hidden gems",
    icon: <Globe className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "Local",
    title: "Local",
    description: "Authentic local experiences",
    icon: <Globe className="w-8 h-8" />,
    color: "violet" as const
  },
  {
    id: "Deep Dive",
    title: "Deep Dive",
    description: "Immersive cultural experiences",
    icon: <Globe className="w-8 h-8" />,
    color: "pink" as const
  }
];

const transportModes = [
  {
    id: "Public Transport",
    title: "Public Transport",
    description: "Buses, trains, metro systems",
    icon: <Car className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "Rental Car",
    title: "Rental Car",
    description: "Self-drive flexibility",
    icon: <Car className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "Private Driver",
    title: "Private Driver",
    description: "Chauffeur services",
    icon: <Car className="w-8 h-8" />,
    color: "violet" as const
  },
  {
    id: "Walking/Cycling",
    title: "Walking/Cycling",
    description: "Eco-friendly local transport",
    icon: <Car className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "Combination",
    title: "Combination",
    description: "Mix of different transport modes",
    icon: <Car className="w-8 h-8" />,
    color: "indigo" as const
  }
];

const climatePreferences = [
  {
    id: "No Preference",
    title: "No Preference",
    description: "Any weather is fine",
    icon: <Thermometer className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "Warm",
    title: "Warm Weather",
    description: "Prefer sunny and warm climates",
    icon: <Thermometer className="w-8 h-8" />,
    color: "pink" as const
  },
  {
    id: "Cool",
    title: "Cool Weather",
    description: "Prefer mild to cool temperatures",
    icon: <Thermometer className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "Tropical",
    title: "Tropical",
    description: "Love hot and humid weather",
    icon: <Thermometer className="w-8 h-8" />,
    color: "violet" as const
  }
];

export const PreferencesStep = ({ data, onUpdate, onNext, onBack }: PreferencesStepProps) => {
  const [selectedPace, setSelectedPace] = useState(data.preferred_pace);
  const [selectedImmersion, setSelectedImmersion] = useState(data.immersion_level);
  const [selectedTransport, setSelectedTransport] = useState(data.transport_mode);
  const [selectedClimate, setSelectedClimate] = useState(data.climate_preference);

  const handleUpdate = (updates: Partial<{ 
    preferred_pace: string; 
    immersion_level: string; 
    transport_mode: string;
    climate_preference: string;
  }>) => {
    const newData = {
      preferred_pace: updates.preferred_pace !== undefined ? updates.preferred_pace : selectedPace,
      immersion_level: updates.immersion_level !== undefined ? updates.immersion_level : selectedImmersion,
      transport_mode: updates.transport_mode !== undefined ? updates.transport_mode : selectedTransport,
      climate_preference: updates.climate_preference !== undefined ? updates.climate_preference : selectedClimate
    };
    
    if (updates.preferred_pace !== undefined) setSelectedPace(updates.preferred_pace);
    if (updates.immersion_level !== undefined) setSelectedImmersion(updates.immersion_level);
    if (updates.transport_mode !== undefined) setSelectedTransport(updates.transport_mode);
    if (updates.climate_preference !== undefined) setSelectedClimate(updates.climate_preference);
    
    onUpdate(newData);
  };

  const handleSubmit = () => {
    if (selectedPace && selectedImmersion && selectedTransport && selectedClimate) {
      onNext();
    }
  };

  return (
    <StepCard className="max-w-4xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-tertiary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Gauge className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Travel preferences
        </h1>
        <p className="text-muted-foreground text-lg">
          Help us understand your travel style and preferences
        </p>
      </div>

      <div className="space-y-10">
        {/* Pace */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Gauge className="w-6 h-6" />
            What's your preferred pace?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paceTypes.map((pace) => (
              <SelectionCard
                key={pace.id}
                icon={pace.icon}
                title={pace.title}
                description={pace.description}
                isSelected={selectedPace === pace.id}
                onClick={() => handleUpdate({ preferred_pace: pace.id })}
                color={pace.color}
              />
            ))}
          </div>
        </div>

        {/* Immersion Level */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            How do you like to explore?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {immersionLevels.map((level) => (
              <SelectionCard
                key={level.id}
                icon={level.icon}
                title={level.title}
                description={level.description}
                isSelected={selectedImmersion === level.id}
                onClick={() => handleUpdate({ immersion_level: level.id })}
                color={level.color}
              />
            ))}
          </div>
        </div>

        {/* Transport Mode */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Car className="w-6 h-6" />
            Preferred transportation?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transportModes.map((transport) => (
              <SelectionCard
                key={transport.id}
                icon={transport.icon}
                title={transport.title}
                description={transport.description}
                isSelected={selectedTransport === transport.id}
                onClick={() => handleUpdate({ transport_mode: transport.id })}
                color={transport.color}
              />
            ))}
          </div>
        </div>

        {/* Climate Preference */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Thermometer className="w-6 h-6" />
            Climate preference?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {climatePreferences.map((climate) => (
              <SelectionCard
                key={climate.id}
                icon={climate.icon}
                title={climate.title}
                description={climate.description}
                isSelected={selectedClimate === climate.id}
                onClick={() => handleUpdate({ climate_preference: climate.id })}
                color={climate.color}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedPace || !selectedImmersion || !selectedTransport || !selectedClimate}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            Continue to Activities
          </Button>
        </div>
      </div>
    </StepCard>
  );
};