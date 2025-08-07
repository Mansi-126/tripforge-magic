import { useState } from "react";
import { Plane, Car, Train, Ship, Camera, Heart, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepCard } from "../StepCard";
import { SelectionCard } from "../SelectionCard";

interface TripTypeStepProps {
  data: { trip_type: string };
  onUpdate: (data: { trip_type: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const tripTypes = [
  {
    id: "adventure",
    title: "Adventure",
    description: "Thrilling activities and outdoor experiences",
    icon: <Camera className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "leisure",
    title: "Leisure",
    description: "Relaxing and peaceful vacation",
    icon: <Heart className="w-8 h-8" />,
    color: "pink" as const
  },
  {
    id: "business",
    title: "Business",
    description: "Work-related travel with some free time",
    icon: <Briefcase className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "cultural",
    title: "Cultural",
    description: "Explore history, art, and local traditions",
    icon: <Users className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "family",
    title: "Family",
    description: "Fun activities for all family members",
    icon: <Users className="w-8 h-8" />,
    color: "violet" as const
  },
  {
    id: "romantic",
    title: "Romantic",
    description: "Perfect for couples and special moments",
    icon: <Heart className="w-8 h-8" />,
    color: "pink" as const
  }
];

export const TripTypeStep = ({ data, onUpdate, onNext, onBack }: TripTypeStepProps) => {
  const [selectedType, setSelectedType] = useState(data.trip_type);

  const handleSelect = (type: string) => {
    setSelectedType(type);
    onUpdate({ trip_type: type });
  };

  const handleSubmit = () => {
    if (selectedType) {
      onNext();
    }
  };

  return (
    <StepCard>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-tertiary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Plane className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          What type of trip is this?
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose the style that best describes your travel plans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tripTypes.map((type) => (
          <SelectionCard
            key={type.id}
            icon={type.icon}
            title={type.title}
            description={type.description}
            isSelected={selectedType === type.id}
            onClick={() => handleSelect(type.id)}
            color={type.color}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedType}
          variant="hero"
          size="lg"
          className="flex-1"
        >
          Continue to Purpose
        </Button>
      </div>
    </StepCard>
  );
};