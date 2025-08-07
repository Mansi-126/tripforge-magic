import { useState } from "react";
import { Users, DollarSign, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepCard } from "../StepCard";
import { SelectionCard } from "../SelectionCard";

interface GroupBudgetStepProps {
  data: { group_type: string; budget: string; accommodation: string };
  onUpdate: (data: { group_type: string; budget: string; accommodation: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const groupTypes = [
  {
    id: "solo",
    title: "Solo Traveler",
    description: "Traveling alone",
    icon: <Users className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "couple",
    title: "Couple",
    description: "Two people traveling together",
    icon: <Users className="w-8 h-8" />,
    color: "pink" as const
  },
  {
    id: "family",
    title: "Family",
    description: "Family with children",
    icon: <Users className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "friends",
    title: "Friends",
    description: "Group of friends",
    icon: <Users className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "business",
    title: "Business Group",
    description: "Corporate or business travel",
    icon: <Users className="w-8 h-8" />,
    color: "indigo" as const
  },
  {
    id: "large_group",
    title: "Large Group",
    description: "More than 6 people",
    icon: <Users className="w-8 h-8" />,
    color: "violet" as const
  }
];

const budgetTypes = [
  {
    id: "Budget",
    title: "Budget",
    description: "Affordable options",
    range: "Under $100/day",
    color: "blue" as const
  },
  {
    id: "Mid-range",
    title: "Mid-range",
    description: "Balanced comfort & cost",
    range: "$100-300/day",
    color: "purple" as const
  },
  {
    id: "Luxury",
    title: "Luxury",
    description: "Premium experiences",
    range: "$300+/day",
    color: "violet" as const
  }
];

const accommodationTypes = [
  {
    id: "Hostel",
    title: "Hostel",
    description: "Budget-friendly shared accommodation",
    color: "blue" as const
  },
  {
    id: "Budget Hotel",
    title: "Budget Hotel",
    description: "Basic hotels with essential amenities",
    color: "cyan" as const
  },
  {
    id: "Mid-range Hotel",
    title: "Mid-range Hotel",
    description: "Comfortable hotels with good facilities",
    color: "purple" as const
  },
  {
    id: "Luxury Hotel",
    title: "Luxury Hotel",
    description: "High-end hotels with premium services",
    color: "violet" as const
  },
  {
    id: "Vacation Rental",
    title: "Vacation Rental",
    description: "Apartments, villas, or houses",
    color: "pink" as const
  },
  {
    id: "Boutique",
    title: "Boutique",
    description: "Unique, stylish properties",
    color: "indigo" as const
  }
];

export const GroupBudgetStep = ({ data, onUpdate, onNext, onBack }: GroupBudgetStepProps) => {
  const [selectedGroup, setSelectedGroup] = useState(data.group_type);
  const [selectedBudget, setSelectedBudget] = useState(data.budget);
  const [selectedAccommodation, setSelectedAccommodation] = useState(data.accommodation);

  const handleUpdate = (updates: Partial<{ group_type: string; budget: string; accommodation: string }>) => {
    const newData = {
      group_type: updates.group_type !== undefined ? updates.group_type : selectedGroup,
      budget: updates.budget !== undefined ? updates.budget : selectedBudget,
      accommodation: updates.accommodation !== undefined ? updates.accommodation : selectedAccommodation
    };
    
    if (updates.group_type !== undefined) setSelectedGroup(updates.group_type);
    if (updates.budget !== undefined) setSelectedBudget(updates.budget);
    if (updates.accommodation !== undefined) setSelectedAccommodation(updates.accommodation);
    
    onUpdate(newData);
  };

  const handleSubmit = () => {
    if (selectedGroup && selectedBudget && selectedAccommodation) {
      onNext();
    }
  };

  return (
    <StepCard className="max-w-4xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Group size and budget
        </h1>
        <p className="text-muted-foreground text-lg">
          Tell us about your travel group and budget preferences
        </p>
      </div>

      <div className="space-y-10">
        {/* Group Type */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Who's traveling?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupTypes.map((group) => (
              <SelectionCard
                key={group.id}
                icon={group.icon}
                title={group.title}
                description={group.description}
                isSelected={selectedGroup === group.id}
                onClick={() => handleUpdate({ group_type: group.id })}
                color={group.color}
              />
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            What's your budget range?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetTypes.map((budget) => (
              <SelectionCard
                key={budget.id}
                icon={<DollarSign className="w-8 h-8" />}
                title={budget.title}
                description={`${budget.description} • ${budget.range}`}
                isSelected={selectedBudget === budget.id}
                onClick={() => handleUpdate({ budget: budget.id })}
                color={budget.color}
              />
            ))}
          </div>
        </div>

        {/* Accommodation */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Home className="w-6 h-6" />
            Preferred accommodation type?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accommodationTypes.map((accommodation) => (
              <SelectionCard
                key={accommodation.id}
                icon={<Home className="w-8 h-8" />}
                title={accommodation.title}
                description={accommodation.description}
                isSelected={selectedAccommodation === accommodation.id}
                onClick={() => handleUpdate({ accommodation: accommodation.id })}
                color={accommodation.color}
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
            disabled={!selectedGroup || !selectedBudget || !selectedAccommodation}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            Continue to Preferences
          </Button>
        </div>
      </div>
    </StepCard>
  );
};