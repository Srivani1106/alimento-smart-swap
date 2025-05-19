import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import Header from '@/components/Header';
import NutritionBadge from '@/components/NutritionBadge';
import { recipes } from '@/data/foodData';
import { ArrowLeft, Clock, Users, Calendar as CalendarIcon, Heart } from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('dinner');
  const [isFavorite, setIsFavorite] = useState(false);
  
  const recipe = recipes.find(recipe => recipe.id === id);
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites && id) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8 px-4 md:px-0">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Recipe not found</h2>
            <Link to="/">
              <Button className="bg-avocado hover:bg-avocado/90">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const handleAddToMealPlan = () => {
    // In a real app, this would update a meal plan store/API
    toast({
      title: "Recipe added",
      description: `${recipe.name} has been added to your ${mealType} plan on ${format(date, 'MMM d, yyyy')}`,
    });
  };

  const toggleFavorite = () => {
    // Get current favorites
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    let favorites: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    // Toggle favorite status
    if (isFavorite) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id as string);
    }
    
    // Update localStorage and state
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${recipe.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4 md:px-0">
        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to recipes
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe main info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-lg overflow-hidden h-[300px]">
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                {recipe.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-black/70 text-white border-none">
                    {tag}
                  </Badge>
                ))}
              </div>
              <button 
                onClick={toggleFavorite}
                className="absolute top-4 right-4 bg-white/80 rounded-full p-2 transition-colors hover:bg-white"
              >
                <Heart 
                  className={`h-6 w-6 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-500'}`}
                />
              </button>
            </div>
            
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">{recipe.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Prep: {recipe.prepTime} min
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Cook: {recipe.cookTime} min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Serves: {recipe.servings}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <NutritionBadge type="calories" value={recipe.nutrition.calories} />
              <NutritionBadge type="protein" value={recipe.nutrition.protein} />
              <NutritionBadge type="carbs" value={recipe.nutrition.carbs} />
              <NutritionBadge type="fat" value={recipe.nutrition.fat} />
            </div>
            
            {/* Instructions */}
            <div>
              <h2 className="text-xl font-medium mb-4">Instructions</h2>
              <ol className="space-y-3 list-decimal pl-5">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="pl-1">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between items-start pb-2 border-b last:border-0">
                      <div>
                        <span className="block">{ingredient.name}</span>
                        <span className="text-sm text-muted-foreground">{ingredient.amount}</span>
                        {ingredient.substitutes && ingredient.substitutes.length > 0 && (
                          <span className="block text-xs text-primary mt-1">
                            Alternatives: {ingredient.substitutes.join(', ')}
                          </span>
                        )}
                      </div>
                      {ingredient.optional && (
                        <Badge variant="outline" className="text-xs">Optional</Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Add to Meal Plan</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={mealType === 'breakfast' ? 'default' : 'outline'} 
                      className={mealType === 'breakfast' ? 'bg-avocado hover:bg-avocado/90' : ''} 
                      onClick={() => setMealType('breakfast')}
                    >
                      Breakfast
                    </Button>
                    <Button 
                      variant={mealType === 'lunch' ? 'default' : 'outline'} 
                      className={mealType === 'lunch' ? 'bg-avocado hover:bg-avocado/90' : ''} 
                      onClick={() => setMealType('lunch')}
                    >
                      Lunch
                    </Button>
                    <Button 
                      variant={mealType === 'dinner' ? 'default' : 'outline'} 
                      className={mealType === 'dinner' ? 'bg-avocado hover:bg-avocado/90' : ''} 
                      onClick={() => setMealType('dinner')}
                    >
                      Dinner
                    </Button>
                  </div>
                  
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Button
                    className="w-full bg-avocado hover:bg-avocado/90" 
                    onClick={handleAddToMealPlan}
                  >
                    Add to Meal Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
