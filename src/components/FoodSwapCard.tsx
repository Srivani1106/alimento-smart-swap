
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NutritionBadge from './NutritionBadge';
import { FoodItem } from '@/data/foodData';
import { ArrowDown, Heart, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FoodSwapCardProps {
  originalFood: FoodItem;
  alternativeFood: FoodItem;
  isFavorite?: boolean;
  onToggleFavorite?: (original: string, alternative: string) => void;
  onUseAlternative?: (originalId: string, alternativeId: string) => void;
  id: string;
}

const FoodSwapCard: React.FC<FoodSwapCardProps> = ({ 
  originalFood, 
  alternativeFood, 
  isFavorite = false, 
  onToggleFavorite,
  onUseAlternative,
  id
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleUseAlternative = () => {
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    setIsConfirmed(true);
    
    // Show a success toast
    toast({
      title: "Alternative Added",
      description: `${alternativeFood.name} has been added as an alternative for ${originalFood.name}.`,
      duration: 3000,
    });
    
    if (onUseAlternative) {
      onUseAlternative(originalFood.id, alternativeFood.id);
    }
    
    // Reset the confirmed state after a delay
    setTimeout(() => {
      setIsConfirmed(false);
    }, 2000);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
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
          {/* Original Food */}
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
          
          {/* Alternative Food */}
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
          
          {/* Use Alternative Button */}
          <Button 
            className="w-full" 
            onClick={handleUseAlternative}
            disabled={isConfirmed}
          >
            {isConfirmed ? (
              <>
                <Check className="mr-1" size={16} />
                Added to Alternatives
              </>
            ) : (
              "Use This Alternative"
            )}
          </Button>
        </div>
      </CardContent>

      {/* Confirmation Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Alternative</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to use {alternativeFood.name} as an alternative for {originalFood.name}?
              This will be added to your alternatives list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Add to Alternatives
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default FoodSwapCard;
