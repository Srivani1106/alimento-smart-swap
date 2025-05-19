
import React, { useState } from 'react';
import Header from '@/components/Header';
import { recipes } from '@/data/foodData';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, isSameDay } from 'date-fns';

// Import refactored components
import DateSelector from '@/components/meal-planner/DateSelector';
import MealDisplay from '@/components/meal-planner/MealDisplay';
import MealPlanForm from '@/components/meal-planner/MealPlanForm';
import RecipeSearch from '@/components/meal-planner/RecipeSearch';
import NutritionOverview from '@/components/meal-planner/NutritionOverview';
import WeeklyMealPlan from '@/components/meal-planner/WeeklyMealPlan';

// Import types
import { MealPlanEntry } from '@/components/meal-planner/MealPlanTypes';

const MealPlanner = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [daysToGenerate, setDaysToGenerate] = useState<number>(7);
  const [dietaryPreferences, setDietaryPreferences] = useState<string>('');
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
  const [activeTab, setActiveTab] = useState<string>('breakfast');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
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
  const removeRecipeFromMealPlan = (targetDate: Date, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const updatedMealPlan = [...mealPlan];
    const entryIndex = updatedMealPlan.findIndex(
      entry => isSameDay(entry.date, targetDate)
    );

    if (entryIndex >= 0) {
      updatedMealPlan[entryIndex] = {
        ...updatedMealPlan[entryIndex],
        [mealType]: null
      };
      setMealPlan(updatedMealPlan);
      
      toast({
        title: "Recipe removed",
        description: `Removed ${mealType} from ${format(targetDate, 'PPP')}`,
      });
    }
  };
  
  // Handler for adding meals via the MealDisplay component
  const handleAddMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    // Set the active tab to the selected meal type
    setActiveTab(mealType);
    // Focus on the search input (handled by UI)
    toast({
      title: "Select a recipe",
      description: `Select a recipe for ${mealType} on ${format(date, 'PPP')}`,
    });
  };

  // Generate a meal plan with improved feedback
  const generateMealPlan = async () => {
    setIsGenerating(true);
    
    try {
      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
          toast({
            title: "No recipes match your preferences",
            description: "Using all available recipes instead",
          });
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
    } catch (error) {
      toast({
        title: "Error generating meal plan",
        description: "Something went wrong, please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-4 md:px-0 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left column - Calendar and Meals */}
          <div className="w-full md:w-3/5 space-y-6">
            <h1 className="text-3xl font-display font-bold">Meal Planner</h1>
            
            {/* Display weekly meal plan if available */}
            {mealPlan.length > 0 && (
              <WeeklyMealPlan 
                mealPlan={mealPlan}
                selectedDate={date}
                setDate={setDate}
                getRecipeById={getRecipeById}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            )}
            
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Date Picker Component */}
              <DateSelector date={date} setDate={setDate} />
              
              {/* Meals Display Component */}
              <MealDisplay 
                date={date}
                currentMealPlan={currentMealPlan}
                getRecipeById={getRecipeById}
                removeRecipeFromMealPlan={(mealType) => removeRecipeFromMealPlan(date, mealType)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onAddMeal={handleAddMeal}
              />
            </div>
            
            {/* Meal Plan Generator Component */}
            <MealPlanForm 
              daysToGenerate={daysToGenerate}
              setDaysToGenerate={setDaysToGenerate}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              generateMealPlan={generateMealPlan}
              isGenerating={isGenerating}
            />
          </div>
          
          {/* Right Column */}
          <div className="w-full md:w-2/5 space-y-6">
            {/* Recipe Search Component */}
            <RecipeSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredRecipes={filteredRecipes}
              activeTab={activeTab}
              addRecipeToMealPlan={addRecipeToMealPlan}
            />
            
            {/* Nutrition Overview Component */}
            <NutritionOverview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealPlanner;
