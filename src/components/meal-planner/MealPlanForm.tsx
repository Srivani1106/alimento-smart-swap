
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChefHat } from 'lucide-react';

interface MealPlanFormProps {
  daysToGenerate: number;
  setDaysToGenerate: (days: number) => void;
  dietaryPreferences: string;
  setDietaryPreferences: (prefs: string) => void;
  generateMealPlan: () => void;
  isGenerating?: boolean;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({
  daysToGenerate,
  setDaysToGenerate,
  dietaryPreferences,
  setDietaryPreferences,
  generateMealPlan,
  isGenerating = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          Generate Meal Plan
        </CardTitle>
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
            <p className="text-xs text-muted-foreground">Choose between 1-14 days</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferences">Dietary preferences</Label>
            <Input 
              id="preferences" 
              placeholder="e.g., vegetarian, low-carb, etc." 
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Separate multiple preferences with commas</p>
          </div>
          
          <Button 
            className="w-full bg-avocado hover:bg-avocado/90 flex items-center gap-2"
            onClick={generateMealPlan}
            disabled={isGenerating}
          >
            <ChefHat className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Meal Plan'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealPlanForm;
