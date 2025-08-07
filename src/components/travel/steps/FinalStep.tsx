import { useState } from "react";
import { MapPin, FileText, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StepCard } from "../StepCard";

interface FinalStepProps {
  data: { must_visit_spots: string[]; special_notes: string };
  onUpdate: (data: { must_visit_spots: string[]; special_notes: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FinalStep = ({ data, onUpdate, onNext, onBack }: FinalStepProps) => {
  const [mustVisitSpots, setMustVisitSpots] = useState(data.must_visit_spots);
  const [specialNotes, setSpecialNotes] = useState(data.special_notes);
  const [newSpot, setNewSpot] = useState("");

  const addMustVisitSpot = () => {
    if (newSpot.trim() && !mustVisitSpots.includes(newSpot.trim())) {
      const updatedSpots = [...mustVisitSpots, newSpot.trim()];
      setMustVisitSpots(updatedSpots);
      onUpdate({ must_visit_spots: updatedSpots, special_notes: specialNotes });
      setNewSpot("");
    }
  };

  const removeMustVisitSpot = (spotToRemove: string) => {
    const updatedSpots = mustVisitSpots.filter(spot => spot !== spotToRemove);
    setMustVisitSpots(updatedSpots);
    onUpdate({ must_visit_spots: updatedSpots, special_notes: specialNotes });
  };

  const handleNotesChange = (notes: string) => {
    setSpecialNotes(notes);
    onUpdate({ must_visit_spots: mustVisitSpots, special_notes: notes });
  };

  const handleSubmit = () => {
    onNext();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addMustVisitSpot();
    }
  };

  return (
    <StepCard className="max-w-3xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Final details
        </h1>
        <p className="text-muted-foreground text-lg">
          Any specific places you must visit or special requirements?
        </p>
      </div>

      <div className="space-y-8">
        {/* Must Visit Spots */}
        <div>
          <Label htmlFor="must-visit" className="text-base font-semibold mb-4 block flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Must-visit places (optional)
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            Add specific attractions, landmarks, or places you absolutely want to visit
          </p>
          
          <div className="flex gap-2 mb-4">
            <Input
              id="must-visit"
              placeholder="e.g., Eiffel Tower, Central Park, Local market..."
              value={newSpot}
              onChange={(e) => setNewSpot(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 text-base"
            />
            <Button onClick={addMustVisitSpot} variant="hero" size="lg" className="px-6">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {mustVisitSpots.length > 0 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Must-visit spots ({mustVisitSpots.length})
              </Label>
              <div className="flex flex-wrap gap-2">
                {mustVisitSpots.map((spot, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-primary text-white px-3 py-2 text-sm flex items-center gap-2"
                  >
                    {spot}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-white/20"
                      onClick={() => removeMustVisitSpot(spot)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Special Notes */}
        <div>
          <Label htmlFor="special-notes" className="text-base font-semibold mb-4 block flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Special notes or requirements (optional)
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            Any other information that would help us create the perfect itinerary for you
          </p>
          
          <Textarea
            id="special-notes"
            placeholder="e.g., Celebrating anniversary, need child-friendly activities, prefer morning activities, avoid crowds, etc."
            value={specialNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="min-h-[120px] text-base resize-none"
          />
        </div>

        {/* Summary */}
        <div className="bg-gradient-primary/10 border border-primary/20 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            ✨ Ready to create your itinerary!
          </h3>
          <p className="text-muted-foreground mb-4">
            We have all the information we need to create your personalized travel itinerary. 
            Click "Generate My Itinerary" to get started!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Must-visit spots:</span>
              <span className="ml-2 font-medium">
                {mustVisitSpots.length > 0 ? `${mustVisitSpots.length} spots` : 'None specified'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Special notes:</span>
              <span className="ml-2 font-medium">
                {specialNotes.trim() ? 'Added' : 'None'}
              </span>
            </div>
          </div>
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
            Generate My Itinerary ✨
          </Button>
        </div>
      </div>
    </StepCard>
  );
};