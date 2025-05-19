
import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, List, Pencil, X } from 'lucide-react';
import MealPlanCard from '@/components/MealPlanCard';
import type { MealPlanEntry } from '@/components/meal-planner/MealPlanTypes';
import { Recipe } from '@/data/foodData';

interface WeeklyMealPlanProps {
  mealPlan: MealPlanEntry[];
  selectedDate: Date;
  setDate: (date: Date) => void;
  getRecipeById: (id: string | null) => Recipe | null;
  removeRecipeFromMealPlan: (date: Date, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
}

const WeeklyMealPlan: React.FC<WeeklyMealPlanProps> = ({
  mealPlan,
  selectedDate,
  setDate,
  getRecipeById,
  removeRecipeFromMealPlan,
}) => {
  // Only show the plan if we have entries
  if (!mealPlan.length) {
    return null;
  }

  // Sort the meal plan by date
  const sortedMealPlan = [...mealPlan].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Get the start date (earliest date in the plan)
  const startDate = sortedMealPlan[0].date;
  
  // Determine if we should show the compact view or table view based on window width
  const [isCompact, setIsCompact] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handler for day selection
  const handleDaySelect = (date: Date) => {
    setDate(date);
  };

  // Calculate which days to display based on the meal plan
  const days = sortedMealPlan.map(entry => entry.date);
  
  if (isCompact) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Your Meal Plan
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1" 
              onClick={() => setIsCompact(false)}
            >
              <List className="h-4 w-4" /> Switch to Table
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {days.map((day, index) => {
              const dayPlan = mealPlan.find(entry => isSameDay(entry.date, day));
              
              if (!dayPlan) return null;
              
              return (
                <div key={index} className="space-y-2">
                  <Button 
                    variant={isSameDay(selectedDate, day) ? "default" : "outline"} 
                    className="w-full justify-start" 
                    onClick={() => handleDaySelect(day)}
                  >
                    {format(day, 'EEEE, MMM d')}
                  </Button>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {(["breakfast", "lunch", "dinner"] as const).map(mealType => (
                      <MealPlanCard 
                        key={mealType} 
                        date={day}
                        mealType={mealType}
                        recipe={getRecipeById(dayPlan[mealType])}
                        onRemove={() => removeRecipeFromMealPlan(day, mealType)}
                        onEdit={() => {
                          handleDaySelect(day);
                        }}
                        compact={true}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Your Meal Plan
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1" 
            onClick={() => setIsCompact(true)}
          >
            <List className="h-4 w-4" /> Switch to Compact
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Meal</TableHead>
                {days.map((day, index) => (
                  <TableHead key={index} className="min-w-[110px]">
                    <Button 
                      variant={isSameDay(selectedDate, day) ? "default" : "ghost"} 
                      size="sm"
                      className="text-xs w-full"
                      onClick={() => handleDaySelect(day)}
                    >
                      {format(day, 'EEE, MMM d')}
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(["breakfast", "lunch", "dinner"] as const).map(mealType => (
                <TableRow key={mealType}>
                  <TableCell className="font-medium capitalize">{mealType}</TableCell>
                  {days.map((day, dayIndex) => {
                    const dayPlan = mealPlan.find(entry => isSameDay(entry.date, day));
                    const recipe = dayPlan ? getRecipeById(dayPlan[mealType]) : null;
                    
                    return (
                      <TableCell key={dayIndex} className="p-1">
                        {recipe ? (
                          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary group">
                            <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0">
                              <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-medium truncate">{recipe.name}</p>
                              <p className="text-[10px] text-muted-foreground">{recipe.nutrition.calories} kcal</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 ml-auto"
                              onClick={() => removeRecipeFromMealPlan(day, mealType)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-center p-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => {
                                handleDaySelect(day);
                              }}
                            >
                              <Pencil className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyMealPlan;
