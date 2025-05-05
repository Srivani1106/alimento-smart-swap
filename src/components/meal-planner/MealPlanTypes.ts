
import { Recipe } from '@/data/foodData';

// Define interface for meal plan entry
export interface MealPlanEntry {
  date: Date;
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
}

// Define interface for meal plan generation options
export interface MealPlanGenerationOptions {
  startDate: Date;
  days: number;
  preferences: string[];
}
