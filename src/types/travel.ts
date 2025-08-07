export interface TravelFormData {
  country: string;
  state: string;
  cities: string[];
  trip_type: string;
  trip_purpose: string;
  preferred_pace: "Relaxed" | "Balanced" | "Fast-paced";
  immersion_level: string;
  num_days: number;
  start_date: string;
  group_type: string;
  budget: "Budget" | "Mid-range" | "Luxury";
  accommodation: string;
  transport_mode: string;
  landscapes: string[];
  activity_interests: string[];
  food_preferences: string[];
  accessibility: string;
  climate_preference: string;
  must_visit_spots: string[];
  special_notes: string;
}

export interface TravelItinerary {
  id: string;
  destination: string;
  duration: number;
  days: DayItinerary[];
  budget_info: BudgetInfo;
  travel_tips: string[];
  created_at: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
  meals: Meal[];
  accommodation?: string;
  transport?: string;
  budget_estimate: number;
}

export interface Activity {
  time: string;
  name: string;
  description: string;
  location: string;
  duration: string;
  cost?: number;
  tips?: string[];
}

export interface Meal {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  location: string;
  cost?: number;
  description?: string;
}

export interface BudgetInfo {
  total_estimated: number;
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  miscellaneous: number;
}