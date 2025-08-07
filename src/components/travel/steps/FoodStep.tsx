import { useState } from "react";
import { UtensilsCrossed, Leaf, Fish, Wheat, Apple, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepCard } from "../StepCard";
import { SelectionCard } from "../SelectionCard";

interface FoodStepProps {
  data: { food_preferences: string[]; accessibility: string };
  onUpdate: (data: { food_preferences: string[]; accessibility: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const foodPreferences = [
  {
    id: "local_cuisine",
    title: "Local Cuisine",
    description: "Traditional regional dishes",
    icon: <UtensilsCrossed className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "street_food",
    title: "Street Food",
    description: "Local street vendors and markets",
    icon: <UtensilsCrossed className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "fine_dining",
    title: "Fine Dining",
    description: "High-end restaurants",
    icon: <UtensilsCrossed className="w-8 h-8" />,
    color: "violet" as const
  },
  {
    id: "vegetarian",
    title: "Vegetarian",
    description: "Plant-based meals",
    icon: <Leaf className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "vegan",
    title: "Vegan",
    description: "No animal products",
    icon: <Leaf className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "seafood",
    title: "Seafood",
    description: "Fresh fish and ocean cuisine",
    icon: <Fish className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "organic",
    title: "Organic",
    description: "Organic and sustainable food",
    icon: <Apple className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "gluten_free",
    title: "Gluten-Free",
    description: "No wheat or gluten",
    icon: <Wheat className="w-8 h-8" />,
    color: "pink" as const
  },
  {
    id: "halal",
    title: "Halal",
    description: "Islamic dietary requirements",
    icon: <UtensilsCrossed className="w-8 h-8" />,
    color: "indigo" as const
  },
  {
    id: "kosher",
    title: "Kosher",
    description: "Jewish dietary laws",
    icon: <UtensilsCrossed className="w-8 h-8" />,
    color: "indigo" as const
  }
];

const accessibilityOptions = [
  {
    id: "None",
    title: "No Special Needs",
    description: "Standard accessibility is fine",
    color: "blue" as const
  },
  {
    id: "Wheelchair",
    title: "Wheelchair Accessible",
    description: "Need wheelchair accessibility",
    color: "purple" as const
  },
  {
    id: "Mobility",
    title: "Mobility Assistance",
    description: "Limited mobility, need assistance",
    color: "violet" as const
  },
  {
    id: "Visual",
    title: "Visual Impairment",
    description: "Need visual accessibility features",
    color: "cyan" as const
  },
  {
    id: "Hearing",
    title: "Hearing Impairment",
    description: "Need hearing accessibility features",
    color: "pink" as const
  },
  {
    id: "Other",
    title: "Other Requirements",
    description: "Will specify in special notes",
    color: "indigo" as const
  }
];

export const FoodStep = ({ data, onUpdate, onNext, onBack }: FoodStepProps) => {
  const [selectedFoodPrefs, setSelectedFoodPrefs] = useState(data.food_preferences);
  const [selectedAccessibility, setSelectedAccessibility] = useState(data.accessibility);

  const toggleFoodPreference = (prefId: string) => {
    const newPrefs = selectedFoodPrefs.includes(prefId)
      ? selectedFoodPrefs.filter(id => id !== prefId)
      : [...selectedFoodPrefs, prefId];
    
    setSelectedFoodPrefs(newPrefs);
    onUpdate({ food_preferences: newPrefs, accessibility: selectedAccessibility });
  };

  const handleAccessibilityChange = (accessibilityId: string) => {
    setSelectedAccessibility(accessibilityId);
    onUpdate({ food_preferences: selectedFoodPrefs, accessibility: accessibilityId });
  };

  const handleSubmit = () => {
    if (selectedAccessibility) {
      onNext();
    }
  };

  return (
    <StepCard className="max-w-5xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <UtensilsCrossed className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Food & accessibility
        </h1>
        <p className="text-muted-foreground text-lg">
          Tell us about your dietary preferences and accessibility needs
        </p>
      </div>

      <div className="space-y-10">
        {/* Food Preferences */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6" />
              Food preferences (optional)
            </h3>
            {selectedFoodPrefs.length > 0 && (
              <Badge variant="secondary" className="bg-gradient-primary text-white">
                {selectedFoodPrefs.length} selected
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodPreferences.map((pref) => (
              <SelectionCard
                key={pref.id}
                icon={pref.icon}
                title={pref.title}
                description={pref.description}
                isSelected={selectedFoodPrefs.includes(pref.id)}
                onClick={() => toggleFoodPreference(pref.id)}
                color={pref.color}
              />
            ))}
          </div>

          {selectedFoodPrefs.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Selected preferences:</p>
              <div className="flex flex-wrap gap-2">
                {selectedFoodPrefs.map((prefId) => {
                  const pref = foodPreferences.find(p => p.id === prefId);
                  return pref ? (
                    <Badge key={prefId} variant="secondary" className="bg-gradient-primary text-white">
                      {pref.title}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Accessibility Requirements */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Accessibility requirements *
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessibilityOptions.map((option) => (
              <SelectionCard
                key={option.id}
                icon={<AlertTriangle className="w-8 h-8" />}
                title={option.title}
                description={option.description}
                isSelected={selectedAccessibility === option.id}
                onClick={() => handleAccessibilityChange(option.id)}
                color={option.color}
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
            disabled={!selectedAccessibility}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            Continue to Final Details
          </Button>
        </div>
      </div>
    </StepCard>
  );
};