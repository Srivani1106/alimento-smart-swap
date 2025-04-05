
import React from 'react';
import { cn } from '@/lib/utils';

interface NutritionBadgeProps {
  type: 'calories' | 'protein' | 'carbs' | 'fat';
  value: number;
  unit?: string;
  className?: string;
}

const NutritionBadge: React.FC<NutritionBadgeProps> = ({ 
  type, 
  value, 
  unit = type === 'calories' ? 'kcal' : 'g',
  className 
}) => {
  const badgeClass = cn(
    'nutrition-badge', 
    {
      'nutrition-badge-calories': type === 'calories',
      'nutrition-badge-protein': type === 'protein',
      'nutrition-badge-carbs': type === 'carbs',
      'nutrition-badge-fat': type === 'fat',
    },
    className
  );
  
  const labels = {
    calories: 'Cal',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
  };

  return (
    <span className={badgeClass}>
      {labels[type]}: {value}{unit}
    </span>
  );
};

export default NutritionBadge;
