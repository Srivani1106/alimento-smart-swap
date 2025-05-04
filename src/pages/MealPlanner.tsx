
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { recipes } from '@/data/foodData';
import RecipeCard from '@/components/RecipeCard';
import MealPlanCard from '@/components/MealPlanCard';
import { useToast } from '@/components/ui/use-toast';

// Define interface for meal plan entry
interface MealPlanEntry {
  date: Date;
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
}

const MealPlanner = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [daysToGenerate, setDaysToGenerate] = useState<number>(7);
  const [dietaryPreferences, setDietaryPreferences] = useState<string>('');
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
  const [activeTab, setActiveTab] = useState<string>('breakfast');
  const { toast } = useToast();
  
  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Find the recipe object for a given ID
  const getRecipeById = (id: string | null) => {
    if (!id) return null;
    return recipes.find(recipe => recipe.id === id) || null;
  };

  // Get the meal plan for the selected date
  const getMealPlanForDate = () => {
    return mealPlan.find(entry => 
      entry.date.toDateString() === date.toDateString()
    ) || { 
      date: new Date(date), 
      breakfast: null, 
      lunch: null, 
      dinner: null 
    };
  };
  
  const currentMealPlan = getMealPlanForDate();

  // Add a recipe to the meal plan
  const addRecipeToMealPlan = (recipeId: string, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const updatedMealPlan = [...mealPlan];
    const entryIndex = updatedMealPlan.findIndex(
      entry => entry.date.toDateString() === date.toDateString()
    );

    if (entryIndex >= 0) {
      // Update existing entry
      updatedMealPlan[entryIndex] = {
        ...updatedMealPlan[entryIndex],
        [mealType]: recipeId
      };
    } else {
      // Add new entry
      updatedMealPlan.push({
        date: new Date(date),
        breakfast: mealType === 'breakfast' ? recipeId : null,
        lunch: mealType === 'lunch' ? recipeId : null,
        dinner: mealType === 'dinner' ? recipeId : null
      });
    }

    setMealPlan(updatedMealPlan);
    
    const recipe = getRecipeById(recipeId);
    toast({
      title: "Recipe added to meal plan",
      description: recipe ? `Added ${recipe.name} to ${mealType} on ${format(date, 'PPP')}` : "Recipe added to meal plan",
    });
  };

  // Remove a recipe from the meal plan
  const removeRecipeFromMealPlan = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const updatedMealPlan = [...mealPlan];
    const entryIndex = updatedMealPlan.findIndex(
      entry => entry.date.toDateString() === date.toDateString()
    );

    if (entryIndex >= 0) {
      updatedMealPlan[entryIndex] = {
        ...updatedMealPlan[entryIndex],
        [mealType]: null
      };
      setMealPlan(updatedMealPlan);
      
      toast({
        title: "Recipe removed",
        description: `Removed ${mealType} from ${format(date, 'PPP')}`,
      });
    }
  };

  // Generate a meal plan
  const generateMealPlan = () => {
    const preferences = dietaryPreferences.toLowerCase().split(',').map(p => p.trim());
    
    // Filter recipes based on preferences if any are provided
    let eligibleRecipes = recipes;
    if (preferences.length > 0 && preferences[0] !== '') {
      eligibleRecipes = recipes.filter(recipe =>
        preferences.some(pref => 
          recipe.tags.some(tag => tag.toLowerCase().includes(pref))
        )
      );
      
      // If no recipes match the preferences, use all recipes
      if (eligibleRecipes.length === 0) {
        eligibleRecipes = recipes;
      }
    }

    // Generate meal plan
    const newMealPlan: MealPlanEntry[] = [];
    const startDate = new Date(date);
    
    for (let i = 0; i < daysToGenerate; i++) {
      const currentDate = addDays(startDate, i);
      
      // Randomly select recipes for each meal
      const breakfast = eligibleRecipes[Math.floor(Math.random() * eligibleRecipes.length)].id;
      const lunch = eligibleRecipes[Math.floor(Math.random() * eligibleRecipes.length)].id;
      const dinner = eligibleRecipes[Math.floor(Math.random() * eligibleRecipes.length)].id;
      
      newMealPlan.push({
        date: currentDate,
        breakfast,
        lunch,
        dinner
      });
    }
    
    setMealPlan(newMealPlan);
    
    toast({
      title: "Meal plan generated",
      description: `Generated a ${daysToGenerate}-day meal plan starting from ${format(date, 'PPP')}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-4 md:px-0 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left column - Calendar and Meals */}
          <div className="w-full md:w-3/5 space-y-6">
            <h1 className="text-3xl font-display font-bold">Meal Planner</h1>
            
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Date Picker */}
              <Card className="w-full md:w-auto">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <div className="text-sm text-muted-foreground">
                      Select a date to view or plan your meals
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Meals for selected date */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-lg">Meals for {format(date, 'PPP')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full">
                      <TabsTrigger value="breakfast" className="flex-1">Breakfast</TabsTrigger>
                      <TabsTrigger value="lunch" className="flex-1">Lunch</TabsTrigger>
                      <TabsTrigger value="dinner" className="flex-1">Dinner</TabsTrigger>
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
                          <Button className="bg-avocado hover:bg-avocado/90 gap-2">
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
                          <Button className="bg-avocado hover:bg-avocado/90 gap-2">
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
                          <Button className="bg-avocado hover:bg-avocado/90 gap-2">
                            <Plus className="h-4 w-4" /> Add Dinner
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Generated Meal Plan */}
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
          </div>
          
          {/* Right Column - Recipe Search */}
          <div className="w-full md:w-2/5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Recipes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search recipes..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-4 mt-4">
                  {filteredRecipes.length > 0 ? (
                    filteredRecipes.slice(0, 4).map(recipe => (
                      <div key={recipe.id} className="border rounded-md p-3 hover:border-primary transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{recipe.name}</h3>
                            <p className="text-sm text-muted-foreground">{recipe.tags.join(', ')}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="gap-1"
                            onClick={() => addRecipeToMealPlan(recipe.id, activeTab as 'breakfast' | 'lunch' | 'dinner')}
                          >
                            Add <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No recipes found</p>
                  )}
                </div>
                
                {filteredRecipes.length > 0 && (
                  <div className="text-center mt-4">
                    <Link to="/">
                      <Button variant="outline" size="sm">View all recipes</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Weekly Nutrition Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Nutrition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Calories</span>
                      <span className="font-medium">1,750 / 2,000 kcal</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Protein</span>
                      <span className="font-medium">90 / 120 g</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Carbs</span>
                      <span className="font-medium">210 / 250 g</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Fat</span>
                      <span className="font-medium">60 / 70 g</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: '85.7%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealPlanner;
