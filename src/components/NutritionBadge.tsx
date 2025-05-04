
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
  const getStyles = () => {
    switch (type) {
      case 'calories':
        return 'bg-purple-100 text-purple-700';
      case 'protein':
        return 'bg-blue-100 text-blue-700';
      case 'carbs':
        return 'bg-amber-100 text-amber-700';
      case 'fat':
        return 'bg-rose-100 text-rose-700';
    }
  };
  
  const labels = {
    calories: 'Cal',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
  };

  return (
    <span className={cn(
      'inline-block text-xs px-2 py-1 rounded-full',
      getStyles(),
      className
    )}>
      {labels[type]}: {value}{unit}
    </span>
  );
};

export default NutritionBadge;
