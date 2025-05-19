
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NutritionBadge from './NutritionBadge';
import { FoodItem } from '@/data/foodData';
import { ArrowDown, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FoodSwapCardProps {
  originalFood: FoodItem;
  alternativeFood: FoodItem;
  isFavorite?: boolean;
  onToggleFavorite?: (original: string, alternative: string) => void;
  id: string; // Add an id prop to identify this swap
}

const FoodSwapCard: React.FC<FoodSwapCardProps> = ({ 
  originalFood, 
  alternativeFood, 
  isFavorite = false, 
  onToggleFavorite,
  id
}) => {
  const handleUseAlternative = () => {
    toast({
      title: "Alternative Added",
      description: `${alternativeFood.name} has been added to your shopping list.`,
      duration: 3000,
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any other handlers from firing
    
    if (onToggleFavorite) {
      onToggleFavorite(originalFood.id, alternativeFood.id);
    }
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${originalFood.name} to ${alternativeFood.name} swap has been ${isFavorite ? 'removed from' : 'added to'} your favorites`,
    });
  };
  
  return (
    <Card className="animate-fade-in food-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">Smart Swap Suggestion</h3>
            <p className="text-sm text-muted-foreground">
              Allergy-friendly alternative based on your profile
            </p>
          </div>
          <button 
            onClick={toggleFavorite}
            className="bg-white/80 rounded-full p-1.5 transition-colors hover:bg-white"
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-500'}`}
            />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div className="p-4 rounded-lg bg-secondary">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{originalFood.name}</h4>
                      <p className="text-xs text-muted-foreground">{originalFood.category}</p>
                    </div>
                    {originalFood.allergens.length > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        Contains Allergen
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <NutritionBadge type="calories" value={originalFood.nutrition.calories} />
                    <NutritionBadge type="protein" value={originalFood.nutrition.protein} />
                    <NutritionBadge type="carbs" value={originalFood.nutrition.carbs} />
                    <NutritionBadge type="fat" value={originalFood.nutrition.fat} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md">
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-primary/10 mt-8">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{alternativeFood.name}</h4>
                    <p className="text-xs text-muted-foreground">{alternativeFood.category}</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary ml-auto">
                    Safe Alternative
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <NutritionBadge type="calories" value={alternativeFood.nutrition.calories} />
                  <NutritionBadge type="protein" value={alternativeFood.nutrition.protein} />
                  <NutritionBadge type="carbs" value={alternativeFood.nutrition.carbs} />
                  <NutritionBadge type="fat" value={alternativeFood.nutrition.fat} />
                </div>
              </div>
            </div>
          </div>
          
          <Button className="w-full" onClick={handleUseAlternative}>Use This Alternative</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodSwapCard;
