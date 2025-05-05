
import React from 'react';
import { format } from 'date-fns';
import { Plus, List } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MealPlanCard from '@/components/MealPlanCard';
import { Recipe } from '@/data/foodData';

interface MealDisplayProps {
  date: Date;
  currentMealPlan: {
    date: Date;
    breakfast: string | null;
    lunch: string | null;
    dinner: string | null;
  };
  getRecipeById: (id: string | null) => Recipe | null;
  removeRecipeFromMealPlan: (mealType: 'breakfast' | 'lunch' | 'dinner') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddMeal: (mealType: 'breakfast' | 'lunch' | 'dinner') => void;
}

const MealDisplay: React.FC<MealDisplayProps> = ({
  date,
  currentMealPlan,
  getRecipeById,
  removeRecipeFromMealPlan,
  activeTab,
  setActiveTab,
  onAddMeal
}) => {
  // Check if the current meal plan has any meals assigned
  const hasMeals = currentMealPlan.breakfast || currentMealPlan.lunch || currentMealPlan.dinner;
  
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Meals for {format(date, 'PPP')}</CardTitle>
        {hasMeals && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1"
          >
            <List className="h-4 w-4" /> View Full Plan
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="breakfast" className="flex-1">
              Breakfast
              {currentMealPlan.breakfast && <span className="ml-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>}
            </TabsTrigger>
            <TabsTrigger value="lunch" className="flex-1">
              Lunch
              {currentMealPlan.lunch && <span className="ml-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>}
            </TabsTrigger>
            <TabsTrigger value="dinner" className="flex-1">
              Dinner
              {currentMealPlan.dinner && <span className="ml-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakfast" className="pt-4 min-h-[200px]">
            {currentMealPlan.breakfast ? (
              <MealPlanCard 
                date={date}
                mealType="breakfast"
                recipe={getRecipeById(currentMealPlan.breakfast)}
                onRemove={() => removeRecipeFromMealPlan('breakfast')}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No meals planned for breakfast</p>
                <Button 
                  className="bg-avocado hover:bg-avocado/90 gap-2"
                  onClick={() => onAddMeal('breakfast')}
                >
                  <Plus className="h-4 w-4" /> Add Breakfast
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="lunch" className="pt-4 min-h-[200px]">
            {currentMealPlan.lunch ? (
              <MealPlanCard 
                date={date}
                mealType="lunch"
                recipe={getRecipeById(currentMealPlan.lunch)}
                onRemove={() => removeRecipeFromMealPlan('lunch')}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No meals planned for lunch</p>
                <Button 
                  className="bg-avocado hover:bg-avocado/90 gap-2"
                  onClick={() => onAddMeal('lunch')}
                >
                  <Plus className="h-4 w-4" /> Add Lunch
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="dinner" className="pt-4 min-h-[200px]">
            {currentMealPlan.dinner ? (
              <MealPlanCard 
                date={date}
                mealType="dinner"
                recipe={getRecipeById(currentMealPlan.dinner)}
                onRemove={() => removeRecipeFromMealPlan('dinner')}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No meals planned for dinner</p>
                <Button 
                  className="bg-avocado hover:bg-avocado/90 gap-2"
                  onClick={() => onAddMeal('dinner')}
                >
                  <Plus className="h-4 w-4" /> Add Dinner
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MealDisplay;
