
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NutritionBadge from './NutritionBadge';
import { Recipe } from '@/data/foodData';
import { Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card className="food-card h-full flex flex-col animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-black/70 text-white border-none">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-medium mb-1">{recipe.name}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="w-4 h-4" />
          <span>{recipe.prepTime + recipe.cookTime} min</span>
          <span>•</span>
          <span>{recipe.servings} servings</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {recipe.ingredients.length} ingredients, {recipe.ingredients.filter(i => i.substitutes?.length).length} with alternatives
        </p>
        <div className="flex flex-wrap gap-1">
          <NutritionBadge type="calories" value={recipe.nutrition.calories} />
          <NutritionBadge type="protein" value={recipe.nutrition.protein} />
          <NutritionBadge type="carbs" value={recipe.nutrition.carbs} />
          <NutritionBadge type="fat" value={recipe.nutrition.fat} />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-primary hover:text-primary/80"
        >
          View Recipe
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
