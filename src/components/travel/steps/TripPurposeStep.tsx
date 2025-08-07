import { useState } from "react";
import { Target, Heart, Camera, Briefcase, GraduationCap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepCard } from "../StepCard";
import { SelectionCard } from "../SelectionCard";

interface TripPurposeStepProps {
  data: { trip_purpose: string };
  onUpdate: (data: { trip_purpose: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const tripPurposes = [
  {
    id: "vacation",
    title: "Vacation",
    description: "Leisure and relaxation time",
    icon: <Heart className="w-8 h-8" />,
    color: "pink" as const
  },
  {
    id: "business",
    title: "Business",
    description: "Work meetings and conferences",
    icon: <Briefcase className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "education",
    title: "Education",
    description: "Learning and skill development",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "photography",
    title: "Photography",
    description: "Capture amazing moments and places",
    icon: <Camera className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "celebration",
    title: "Celebration",
    description: "Special occasions and events",
    icon: <Gift className="w-8 h-8" />,
    color: "violet" as const
  },
  {
    id: "spiritual",
    title: "Spiritual",
    description: "Religious or spiritual journey",
    icon: <Target className="w-8 h-8" />,
    color: "cyan" as const
  }
];

export const TripPurposeStep = ({ data, onUpdate, onNext, onBack }: TripPurposeStepProps) => {
  const [selectedPurpose, setSelectedPurpose] = useState(data.trip_purpose);

  const handleSelect = (purpose: string) => {
    setSelectedPurpose(purpose);
    onUpdate({ trip_purpose: purpose });
  };

  const handleSubmit = () => {
    if (selectedPurpose) {
      onNext();
    }
  };

  return (
    <StepCard>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Target className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          What's the purpose of your trip?
        </h1>
        <p className="text-muted-foreground text-lg">
          This helps us create the perfect itinerary for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tripPurposes.map((purpose) => (
          <SelectionCard
            key={purpose.id}
            icon={purpose.icon}
            title={purpose.title}
            description={purpose.description}
            isSelected={selectedPurpose === purpose.id}
            onClick={() => handleSelect(purpose.id)}
            color={purpose.color}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedPurpose}
          variant="hero"
          size="lg"
          className="flex-1"
        >
          Continue to Details
        </Button>
      </div>
    </StepCard>
  );
};