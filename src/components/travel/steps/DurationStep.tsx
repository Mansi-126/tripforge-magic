import { useState } from "react";
import { Calendar, Clock, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StepCard } from "../StepCard";

interface DurationStepProps {
  data: { num_days: number; start_date: string };
  onUpdate: (data: { num_days: number; start_date: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DurationStep = ({ data, onUpdate, onNext, onBack }: DurationStepProps) => {
  const [numDays, setNumDays] = useState(data.num_days);
  const [startDate, setStartDate] = useState(data.start_date);

  const handleDaysChange = (days: number) => {
    if (days >= 1 && days <= 30) {
      setNumDays(days);
      onUpdate({ num_days: days, start_date: startDate });
    }
  };

  const handleDateChange = (date: string) => {
    setStartDate(date);
    onUpdate({ num_days: numDays, start_date: date });
  };

  const handleSubmit = () => {
    if (numDays >= 1 && startDate) {
      onNext();
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <StepCard>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          How long is your trip?
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose your trip duration and start date
        </p>
      </div>

      <div className="space-y-8">
        {/* Duration Selection */}
        <div>
          <Label className="text-base font-semibold mb-4 block flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Trip Duration
          </Label>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDaysChange(numDays - 1)}
              disabled={numDays <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient-primary">{numDays}</div>
              <div className="text-sm text-muted-foreground">
                {numDays === 1 ? 'Day' : 'Days'}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDaysChange(numDays + 1)}
              disabled={numDays >= 30}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Duration Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[3, 5, 7, 10, 14, 21].map((days) => (
              <Button
                key={days}
                variant={numDays === days ? "hero" : "outline"}
                size="sm"
                onClick={() => handleDaysChange(days)}
                className="h-12"
              >
                {days} Days
              </Button>
            ))}
          </div>
        </div>

        {/* Start Date */}
        <div>
          <Label htmlFor="start-date" className="text-base font-semibold mb-3 block">
            Start Date *
          </Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e.target.value)}
            min={today}
            className="h-12 text-base"
          />
        </div>

        {/* Summary */}
        {numDays > 0 && startDate && (
          <div className="bg-gradient-primary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">Trip Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-medium">{numDays} {numDays === 1 ? 'Day' : 'Days'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Start Date:</span>
                <span className="ml-2 font-medium">{new Date(startDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">End Date:</span>
                <span className="ml-2 font-medium">
                  {new Date(new Date(startDate).getTime() + (numDays - 1) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!numDays || !startDate}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            Continue to Group & Budget
          </Button>
        </div>
      </div>
    </StepCard>
  );
};