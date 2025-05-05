
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Recipe } from '@/data/foodData';

interface RecipeSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredRecipes: Recipe[];
  activeTab: string;
  addRecipeToMealPlan: (recipeId: string, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({
  searchQuery,
  setSearchQuery,
  filteredRecipes,
  activeTab,
  addRecipeToMealPlan
}) => {
  return (
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
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="gap-1"
                    onClick={() => addRecipeToMealPlan(recipe.id, activeTab as 'breakfast' | 'lunch' | 'dinner')}
                  >
                    Add <ChevronRight className="h-4 w-4" />
                  </Button>
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
  );
};

export default RecipeSearch;
