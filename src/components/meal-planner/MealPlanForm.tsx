
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MealPlanFormProps {
  daysToGenerate: number;
  setDaysToGenerate: (days: number) => void;
  dietaryPreferences: string;
  setDietaryPreferences: (prefs: string) => void;
  generateMealPlan: () => void;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({
  daysToGenerate,
  setDaysToGenerate,
  dietaryPreferences,
  setDietaryPreferences,
  generateMealPlan
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Meal Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="days">Number of days</Label>
            <Input 
              id="days" 
              type="number" 
              value={daysToGenerate}
              onChange={(e) => setDaysToGenerate(Math.max(1, Math.min(14, parseInt(e.target.value) || 1)))}
              min="1" 
              max="14" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferences">Dietary preferences</Label>
            <Input 
              id="preferences" 
              placeholder="e.g., vegetarian, low-carb, etc." 
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
            />
          </div>
          
          <Button 
            className="w-full bg-avocado hover:bg-avocado/90"
            onClick={generateMealPlan}
          >
            Generate Meal Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealPlanForm;
