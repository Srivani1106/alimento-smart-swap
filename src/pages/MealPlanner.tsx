import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { recipes, foodItems } from '@/data/foodData';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, isSameDay } from 'date-fns';
import FoodSwapCard from '@/components/FoodSwapCard';

// Import refactored components
import DateSelector from '@/components/meal-planner/DateSelector';
import MealDisplay from '@/components/meal-planner/MealDisplay';
import MealPlanForm from '@/components/meal-planner/MealPlanForm';
import RecipeSearch from '@/components/meal-planner/RecipeSearch';
import NutritionOverview from '@/components/meal-planner/NutritionOverview';
import WeeklyMealPlan from '@/components/meal-planner/WeeklyMealPlan';
import UsedAlternatives, { UsedAlternative } from '@/components/meal-planner/UsedAlternatives';

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
  const [usedAlternatives, setUsedAlternatives] = useState<UsedAlternative[]>([]);
  const { toast } = useToast();
  
  // Retrieve used alternatives from local storage on component mount
  useEffect(() => {
    const storedAlternatives = localStorage.getItem('usedAlternatives');
    if (storedAlternatives) {
      try {
        const parsedAlternatives = JSON.parse(storedAlternatives);
        // Convert string dates back to Date objects
        const alternativesWithDateObjects = parsedAlternatives.map((alt: any) => ({
          ...alt,
          date: new Date(alt.date)
        }));
        setUsedAlternatives(alternativesWithDateObjects);
      } catch (error) {
        console.error('Failed to parse stored alternatives', error);
      }
    }
  }, []);

  // Save used alternatives to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('usedAlternatives', JSON.stringify(usedAlternatives));
  }, [usedAlternatives]);
  
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
    setActiveTab(mealType);
    toast({
      title: "Select a recipe",
      description: `Select a recipe for ${mealType} on ${format(date, 'PPP')}`,
    });
  };

  // Handler for using a food alternative
  const handleUseAlternative = (originalId: string, alternativeId: string) => {
    const newAlternative: UsedAlternative = {
      originalFoodId: originalId,
      alternativeFoodId: alternativeId,
      date: new Date()
    };
    
    setUsedAlternatives(prev => [...prev, newAlternative]);
  };

  // Handler for removing a used alternative
  const handleRemoveAlternative = (indexToRemove: number) => {
    setUsedAlternatives(prev => prev.filter((_, index) => index !== indexToRemove));
    
    toast({
      title: "Alternative removed",
      description: "The alternative has been removed from your list",
    });
  };

  // Generate a meal plan with improved feedback
  const generateMealPlan = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const preferences = dietaryPreferences.toLowerCase().split(',').map(p => p.trim());
      
      let eligibleRecipes = recipes;
      if (preferences.length > 0 && preferences[0] !== '') {
        eligibleRecipes = recipes.filter(recipe =>
          preferences.some(pref => 
            recipe.tags.some(tag => tag.toLowerCase().includes(pref))
          )
        );
        
        if (eligibleRecipes.length === 0) {
          eligibleRecipes = recipes;
          toast({
            title: "No recipes match your preferences",
            description: "Using all available recipes instead",
          });
        }
      }

      const newMealPlan: MealPlanEntry[] = [];
      const startDate = new Date(date);
      
      for (let i = 0; i < daysToGenerate; i++) {
        const currentDate = addDays(startDate, i);
        
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
  
  // Create sample food swap data using real food items
  const createSampleFoodSwaps = () => {
    if (foodItems.length < 6) return [];
    
    return [
      { original: foodItems[1], alternative: foodItems[8] }, // Eggs -> Yogurt
      { original: foodItems[3], alternative: foodItems[6] }, // Cow's Milk -> Shrimp (odd but just for example)
    ];
  };
  
  const sampleFoodSwaps = createSampleFoodSwaps();
  
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

            {/* Used Alternatives Component */}
            {usedAlternatives.length > 0 && (
              <UsedAlternatives 
                usedAlternatives={usedAlternatives}
                foodItems={foodItems}
                onRemoveAlternative={handleRemoveAlternative}
              />
            )}
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
            
            {/* Food Alternatives Section */}
            {sampleFoodSwaps.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Suggested Alternatives</h2>
                {sampleFoodSwaps.map((swap, index) => (
                  <div key={index} className="mb-6">
                    <FoodSwapCard
                      id={`swap-${index}`}
                      originalFood={swap.original}
                      alternativeFood={swap.alternative}
                      onUseAlternative={handleUseAlternative}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Nutrition Overview Component */}
            <NutritionOverview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealPlanner;
