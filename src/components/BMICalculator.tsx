
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Weight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BMICalculator = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const { toast } = useToast();

  const calculateBMI = () => {
    if (!height || !weight) {
      toast({
        title: "Missing information",
        description: "Please enter both height and weight to calculate BMI.",
        variant: "destructive"
      });
      return;
    }

    const heightInM = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (isNaN(heightInM) || isNaN(weightInKg) || heightInM <= 0 || weightInKg <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter valid height and weight values.",
        variant: "destructive"
      });
      return;
    }

    const bmiValue = weightInKg / (heightInM * heightInM);
    setBmi(parseFloat(bmiValue.toFixed(1)));
    
    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
    
    toast({
      title: "BMI Calculated",
      description: "Your BMI has been calculated successfully."
    });
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">BMI Calculator</CardTitle>
            <CardDescription>Calculate your Body Mass Index</CardDescription>
          </div>
          <Calculator className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {bmi !== null && (
          <div className="rounded-md bg-primary/10 p-4 mt-6">
            <div className="flex items-center gap-3">
              <Weight className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Your BMI: {bmi}</h3>
                <p className="text-muted-foreground">Category: {category}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="h-3 w-full bg-secondary rounded-full">
                <div 
                  className={`h-3 rounded-full ${
                    category === 'Underweight' ? 'bg-blue-500 w-[15%]' :
                    category === 'Normal weight' ? 'bg-green-500 w-[40%]' :
                    category === 'Overweight' ? 'bg-orange-500 w-[65%]' :
                    'bg-red-500 w-[90%]'
                  }`}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
        <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>
        <Button onClick={handleReset} variant="outline" className="w-full">Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default BMICalculator;
