
import React from 'react';
import Header from '@/components/Header';
import BMICalculator from '@/components/BMICalculator';
import { Card, CardContent } from '@/components/ui/card';

const BMICalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">Body Mass Index (BMI) Calculator</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <BMICalculator />
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">About BMI</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Body Mass Index (BMI) is a measurement of a person's weight with respect to their height. It's a screening tool that can indicate whether you have an appropriate weight for your height.
                  </p>
                  
                  <h4 className="font-medium mb-1">BMI Categories:</h4>
                  <ul className="text-sm space-y-1 mb-4">
                    <li><span className="font-medium text-blue-500">Below 18.5:</span> Underweight</li>
                    <li><span className="font-medium text-green-500">18.5 - 24.9:</span> Normal weight</li>
                    <li><span className="font-medium text-orange-500">25.0 - 29.9:</span> Overweight</li>
                    <li><span className="font-medium text-red-500">30.0 and above:</span> Obesity</li>
                  </ul>
                  
                  <p className="text-xs text-muted-foreground">
                    Note: BMI is a useful measurement for most people over 18, but it has limitations. It may overestimate body fat in athletes and underestimate it in older adults. Always consult with healthcare professionals for a complete assessment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BMICalculatorPage;
