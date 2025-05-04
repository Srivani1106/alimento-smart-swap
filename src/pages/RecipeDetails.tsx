
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import NutritionBadge from '@/components/NutritionBadge';
import { recipes } from '@/data/foodData';
import { ArrowLeft, Clock, Users } from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const recipe = recipes.find(recipe => recipe.id === id);
  
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
    toast({
      title: "Recipe added",
      description: `${recipe.name} has been added to your meal plan`,
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
            
            <Button
              className="w-full bg-avocado hover:bg-avocado/90" 
              onClick={handleAddToMealPlan}
            >
              Add to Meal Plan
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
