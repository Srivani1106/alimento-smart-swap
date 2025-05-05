
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const NutritionOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Nutrition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Average Calories</span>
              <span className="font-medium">1,750 / 2,000 kcal</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Average Protein</span>
              <span className="font-medium">90 / 120 g</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Average Carbs</span>
              <span className="font-medium">210 / 250 g</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Average Fat</span>
              <span className="font-medium">60 / 70 g</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-rose-500 h-2 rounded-full" style={{ width: '85.7%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionOverview;
