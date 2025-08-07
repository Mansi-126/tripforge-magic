import { useState } from "react";
import { Camera, Waves, Mountain, Music, ShoppingBag, TreePine, Building, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StepCard } from "../StepCard";
import { SelectionCard } from "../SelectionCard";

interface ActivitiesStepProps {
  data: { activity_interests: string[]; landscapes: string[] };
  onUpdate: (data: { activity_interests: string[]; landscapes: string[] }) => void;
  onNext: () => void;
  onBack: () => void;
}

const activityTypes = [
  {
    id: "adventure",
    title: "Adventure Sports",
    description: "Hiking, climbing, extreme sports",
    icon: <Mountain className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "cultural",
    title: "Cultural Sites",
    description: "Museums, historical landmarks",
    icon: <Building className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "nature",
    title: "Nature & Wildlife",
    description: "Parks, safaris, botanical gardens",
    icon: <TreePine className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "beaches",
    title: "Beaches & Water",
    description: "Swimming, surfing, water sports",
    icon: <Waves className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "nightlife",
    title: "Nightlife & Entertainment",
    description: "Bars, clubs, live music",
    icon: <Music className="w-8 h-8" />,
    color: "violet" as const
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Markets, malls, local crafts",
    icon: <ShoppingBag className="w-8 h-8" />,
    color: "pink" as const
  },
  {
    id: "photography",
    title: "Photography",
    description: "Scenic spots, street photography",
    icon: <Camera className="w-8 h-8" />,
    color: "indigo" as const
  },
  {
    id: "relaxation",
    title: "Relaxation & Wellness",
    description: "Spas, meditation, yoga",
    icon: <TreePine className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "food_tours",
    title: "Food Tours",
    description: "Local cuisine, cooking classes",
    icon: <Building className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "festivals",
    title: "Festivals & Events",
    description: "Local celebrations, concerts",
    icon: <Music className="w-8 h-8" />,
    color: "violet" as const
  }
];

const landscapeTypes = [
  {
    id: "mountains",
    title: "Mountains",
    description: "Peaks, valleys, alpine scenery",
    icon: <Mountain className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "beaches",
    title: "Beaches & Coastlines",
    description: "Ocean views, sandy shores",
    icon: <Waves className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "forests",
    title: "Forests & Jungles",
    description: "Dense woods, wildlife habitats",
    icon: <TreePine className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "cities",
    title: "Urban Landscapes",
    description: "Skylines, architecture, city life",
    icon: <Building className="w-8 h-8" />,
    color: "purple" as const
  },
  {
    id: "countryside",
    title: "Countryside",
    description: "Rural areas, farms, villages",
    icon: <TreePine className="w-8 h-8" />,
    color: "cyan" as const
  },
  {
    id: "deserts",
    title: "Deserts",
    description: "Sand dunes, arid landscapes",
    icon: <Mountain className="w-8 h-8" />,
    color: "pink" as const
  },
  {
    id: "lakes",
    title: "Lakes & Rivers",
    description: "Freshwater bodies, waterways",
    icon: <Waves className="w-8 h-8" />,
    color: "blue" as const
  },
  {
    id: "islands",
    title: "Islands",
    description: "Tropical or remote islands",
    icon: <Waves className="w-8 h-8" />,
    color: "violet" as const
  }
];

export const ActivitiesStep = ({ data, onUpdate, onNext, onBack }: ActivitiesStepProps) => {
  const [selectedActivities, setSelectedActivities] = useState(data.activity_interests);
  const [selectedLandscapes, setSelectedLandscapes] = useState(data.landscapes);

  const toggleActivity = (activityId: string) => {
    const newActivities = selectedActivities.includes(activityId)
      ? selectedActivities.filter(id => id !== activityId)
      : [...selectedActivities, activityId];
    
    setSelectedActivities(newActivities);
    onUpdate({ activity_interests: newActivities, landscapes: selectedLandscapes });
  };

  const toggleLandscape = (landscapeId: string) => {
    const newLandscapes = selectedLandscapes.includes(landscapeId)
      ? selectedLandscapes.filter(id => id !== landscapeId)
      : [...selectedLandscapes, landscapeId];
    
    setSelectedLandscapes(newLandscapes);
    onUpdate({ activity_interests: selectedActivities, landscapes: newLandscapes });
  };

  const handleSubmit = () => {
    onNext();
  };

  return (
    <StepCard className="max-w-5xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Camera className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Activities & landscapes
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose your favorite activities and preferred landscapes
        </p>
      </div>

      <div className="space-y-10">
        {/* Activity Interests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Gamepad2 className="w-6 h-6" />
              What activities interest you?
            </h3>
            {selectedActivities.length > 0 && (
              <Badge variant="secondary" className="bg-gradient-primary text-white">
                {selectedActivities.length} selected
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activityTypes.map((activity) => (
              <SelectionCard
                key={activity.id}
                icon={activity.icon}
                title={activity.title}
                description={activity.description}
                isSelected={selectedActivities.includes(activity.id)}
                onClick={() => toggleActivity(activity.id)}
                color={activity.color}
              />
            ))}
          </div>

          {selectedActivities.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Selected activities:</p>
              <div className="flex flex-wrap gap-2">
                {selectedActivities.map((activityId) => {
                  const activity = activityTypes.find(a => a.id === activityId);
                  return activity ? (
                    <Badge key={activityId} variant="secondary" className="bg-gradient-primary text-white">
                      {activity.title}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Landscape Preferences */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Mountain className="w-6 h-6" />
              Preferred landscapes?
            </h3>
            {selectedLandscapes.length > 0 && (
              <Badge variant="secondary" className="bg-gradient-secondary text-white">
                {selectedLandscapes.length} selected
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {landscapeTypes.map((landscape) => (
              <SelectionCard
                key={landscape.id}
                icon={landscape.icon}
                title={landscape.title}
                description={landscape.description}
                isSelected={selectedLandscapes.includes(landscape.id)}
                onClick={() => toggleLandscape(landscape.id)}
                color={landscape.color}
              />
            ))}
          </div>

          {selectedLandscapes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Selected landscapes:</p>
              <div className="flex flex-wrap gap-2">
                {selectedLandscapes.map((landscapeId) => {
                  const landscape = landscapeTypes.find(l => l.id === landscapeId);
                  return landscape ? (
                    <Badge key={landscapeId} variant="secondary" className="bg-gradient-secondary text-white">
                      {landscape.title}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            Continue to Food Preferences
          </Button>
        </div>
      </div>
    </StepCard>
  );
};