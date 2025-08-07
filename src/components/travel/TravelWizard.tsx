import { useState } from "react";
import { TravelFormData } from "@/types/travel";
import { StepIndicator } from "./StepIndicator";
import { CountryStep } from "./steps/CountryStep";
import { CitiesStep } from "./steps/CitiesStep";
import { TripTypeStep } from "./steps/TripTypeStep";
import { TripPurposeStep } from "./steps/TripPurposeStep";

interface TravelWizardProps {
  onComplete: (data: TravelFormData) => void;
}

const initialData: TravelFormData = {
  country: "",
  state: "",
  cities: [],
  trip_type: "",
  trip_purpose: "",
  preferred_pace: "Balanced",
  immersion_level: "",
  num_days: 7,
  start_date: new Date().toISOString().split('T')[0],
  group_type: "",
  budget: "Mid-range",
  accommodation: "",
  transport_mode: "",
  landscapes: [],
  activity_interests: [],
  food_preferences: [],
  accessibility: "None",
  climate_preference: "No Preference",
  must_visit_spots: [],
  special_notes: ""
};

const stepTitles = [
  "Destination",
  "Cities",
  "Trip Type", 
  "Purpose",
  "Duration & Dates",
  "Group & Budget",
  "Preferences",
  "Activities",
  "Food & Diet",
  "Final Details"
];

export const TravelWizard = ({ onComplete }: TravelWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TravelFormData>(initialData);

  const updateFormData = (newData: Partial<TravelFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < stepTitles.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CountryStep
            data={{ country: formData.country, state: formData.state }}
            onUpdate={(data) => updateFormData(data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <CitiesStep
            data={{ cities: formData.cities }}
            onUpdate={(data) => updateFormData(data)}
            onNext={nextStep}
            onBack={previousStep}
          />
        );
      case 3:
        return (
          <TripTypeStep
            data={{ trip_type: formData.trip_type }}
            onUpdate={(data) => updateFormData(data)}
            onNext={nextStep}
            onBack={previousStep}
          />
        );
      case 4:
        return (
          <TripPurposeStep
            data={{ trip_purpose: formData.trip_purpose }}
            onUpdate={(data) => updateFormData(data)}
            onNext={nextStep}
            onBack={previousStep}
          />
        );
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Step {currentStep}</h2>
            <p>More steps coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={stepTitles.length}
          stepTitle={stepTitles[currentStep - 1]}
        />
        {renderStep()}
      </div>
    </div>
  );
};