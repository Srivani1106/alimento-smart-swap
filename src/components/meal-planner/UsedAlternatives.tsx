
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FoodItem } from '@/data/foodData';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import NutritionBadge from '@/components/NutritionBadge';

export interface UsedAlternative {
  originalFoodId: string;
  alternativeFoodId: string;
  date: Date;
}

interface UsedAlternativesProps {
  usedAlternatives: UsedAlternative[];
  foodItems: FoodItem[];
  onRemoveAlternative: (index: number) => void;
}

const UsedAlternatives: React.FC<UsedAlternativesProps> = ({
  usedAlternatives,
  foodItems,
  onRemoveAlternative
}) => {
  // Find food item by ID
  const getFoodItemById = (id: string): FoodItem | undefined => {
    return foodItems.find(item => item.id === id);
  };

  if (usedAlternatives.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Used Alternatives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {usedAlternatives.map((alternative, index) => {
            const originalFood = getFoodItemById(alternative.originalFoodId);
            const alternativeFood = getFoodItemById(alternative.alternativeFoodId);

            if (!originalFood || !alternativeFood) return null;

            return (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden">
                    <img 
                      src={alternativeFood.image} 
                      alt={alternativeFood.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{alternativeFood.name}</span>
                      <span className="text-xs text-muted-foreground">
                        for {originalFood.name}
                      </span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <NutritionBadge 
                        type="calories" 
                        value={alternativeFood.nutrition.calories}
                        className="text-[10px] py-0.5 px-1.5"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => onRemoveAlternative(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsedAlternatives;
