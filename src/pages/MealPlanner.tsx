
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { recipes } from '@/data/foodData';
import RecipeCard from '@/components/RecipeCard';

const MealPlanner = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-4 md:px-0 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left column - Calendar and Meals */}
          <div className="w-full md:w-3/5 space-y-6">
            <h1 className="text-3xl font-display font-bold">Meal Planner</h1>
            
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Date Picker */}
              <Card className="w-full md:w-auto">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <div className="text-sm text-muted-foreground">
                      Select a date to view or plan your meals
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Meals for selected date */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-lg">Meals for {format(date, 'PPP')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="breakfast">
                    <TabsList className="w-full">
                      <TabsTrigger value="breakfast" className="flex-1">Breakfast</TabsTrigger>
                      <TabsTrigger value="lunch" className="flex-1">Lunch</TabsTrigger>
                      <TabsTrigger value="dinner" className="flex-1">Dinner</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="breakfast" className="pt-4 min-h-[200px]">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No meals planned for breakfast</p>
                        <Button className="bg-avocado hover:bg-avocado/90 gap-2">
                          <Plus className="h-4 w-4" /> Add Breakfast
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="lunch" className="pt-4 min-h-[200px]">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No meals planned for lunch</p>
                        <Button className="bg-avocado hover:bg-avocado/90 gap-2">
                          <Plus className="h-4 w-4" /> Add Lunch
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="dinner" className="pt-4 min-h-[200px]">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No meals planned for dinner</p>
                        <Button className="bg-avocado hover:bg-avocado/90 gap-2">
                          <Plus className="h-4 w-4" /> Add Dinner
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Generated Meal Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Meal Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="days">Number of days</Label>
                    <Input id="days" type="number" defaultValue="7" min="1" max="14" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferences">Dietary preferences</Label>
                    <Input id="preferences" placeholder="e.g., vegetarian, low-carb, etc." />
                  </div>
                  
                  <Button className="w-full bg-avocado hover:bg-avocado/90">
                    Generate Meal Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Recipe Search */}
          <div className="w-full md:w-2/5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Recipes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search recipes..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-4 mt-4">
                  {filteredRecipes.length > 0 ? (
                    filteredRecipes.slice(0, 4).map(recipe => (
                      <div key={recipe.id} className="border rounded-md p-3 hover:border-primary transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{recipe.name}</h3>
                            <p className="text-sm text-muted-foreground">{recipe.tags.join(', ')}</p>
                          </div>
                          <Link to={`/recipe/${recipe.id}`}>
                            <Button size="sm" variant="ghost" className="gap-1">
                              Add <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No recipes found</p>
                  )}
                </div>
                
                {filteredRecipes.length > 0 && (
                  <div className="text-center mt-4">
                    <Link to="/">
                      <Button variant="outline" size="sm">View all recipes</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Weekly Nutrition Overview */}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealPlanner;
