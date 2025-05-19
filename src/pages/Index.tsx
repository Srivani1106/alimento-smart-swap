
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import FoodSwapCard from '@/components/FoodSwapCard';
import RecipeCard from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { foodItems, recipes } from '@/data/foodData';
import { Utensils, Cookie, Heart } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  const [favoriteSwaps, setFavoriteSwaps] = useState<{id: string, original: string, alternative: string}[]>([]);
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (storedFavoriteRecipes) {
      setFavoriteRecipes(JSON.parse(storedFavoriteRecipes));
    }
    
    const storedFavoriteSwaps = localStorage.getItem('favoriteSwaps');
    if (storedFavoriteSwaps) {
      setFavoriteSwaps(JSON.parse(storedFavoriteSwaps));
    }
  }, []);

  // Define pairs for food swaps
  const foodSwapPairs = [
    { id: "swap-1", original: foodItems[1], alternative: foodItems[0] },  // Eggs -> Almonds
    { id: "swap-2", original: foodItems[3], alternative: foodItems[2] },  // Cow's Milk -> White Rice
    { id: "swap-3", original: foodItems[4], alternative: foodItems[2] },  // Wheat Bread -> White Rice
    { id: "swap-4", original: foodItems[5], alternative: foodItems[0] },  // Peanut Butter -> Almonds
    { id: "swap-5", original: foodItems[6], alternative: foodItems[2] },  // Shrimp -> White Rice
    { id: "swap-6", original: foodItems[7], alternative: foodItems[0] },  // Soy Sauce -> Almonds
    { id: "swap-7", original: foodItems[8], alternative: foodItems[2] }   // Yogurt -> White Rice
  ];

  // Filter recipes to get only favorites
  const filteredFavoriteRecipes = recipes.filter(recipe => 
    favoriteRecipes.includes(recipe.id)
  );
  
  // Filter swaps to get only favorites
  const filteredFavoriteSwaps = foodSwapPairs.filter(swap => 
    favoriteSwaps.some(fs => fs.id === swap.id)
  );
  
  const handleToggleFavoriteSwap = (swapId: string, originalId: string, alternativeId: string) => {
    const newFavoriteSwaps = favoriteSwaps.some(fs => fs.id === swapId)
      ? favoriteSwaps.filter(fs => fs.id !== swapId)
      : [...favoriteSwaps, { id: swapId, original: originalId, alternative: alternativeId }];
    
    setFavoriteSwaps(newFavoriteSwaps);
    localStorage.setItem('favoriteSwaps', JSON.stringify(newFavoriteSwaps));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-4 md:px-0 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-display font-bold mb-2">Welcome to Alimento</h2>
              <p className="text-muted-foreground">
                Personalized meal planning with smart ingredient swaps based on your profile
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-avocado/10 to-carrot/10 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Smart Meal Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recipes that adapt to your dietary needs and available ingredients
                  </p>
                </div>
                <Link to="/meal-planner">
                  <Button className="bg-avocado hover:bg-avocado/90">
                    Start Meal Planning
                  </Button>
                </Link>
              </div>
            </div>
            
            <Tabs defaultValue="recipes" className="mb-6" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="recipes" className="flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    <span>Recipes</span>
                  </TabsTrigger>
                  <TabsTrigger value="swaps" className="flex items-center gap-2">
                    <Cookie className="h-4 w-4" />
                    <span>Smart Swaps</span>
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="recipes" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe}
                      isFavorite={favoriteRecipes.includes(recipe.id)}
                      onToggleFavorite={(id) => {
                        const newFavorites = favoriteRecipes.includes(id)
                          ? favoriteRecipes.filter(recipeId => recipeId !== id)
                          : [...favoriteRecipes, id];
                        setFavoriteRecipes(newFavorites);
                        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
                      }}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="swaps" className="space-y-6 mt-0">
                {foodSwapPairs.map((pair) => (
                  <FoodSwapCard 
                    key={pair.id} 
                    id={pair.id}
                    originalFood={pair.original} 
                    alternativeFood={pair.alternative}
                    isFavorite={favoriteSwaps.some(fs => fs.id === pair.id)}
                    onToggleFavorite={(originalId, alternativeId) => 
                      handleToggleFavoriteSwap(pair.id, originalId, alternativeId)
                    }
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                {(filteredFavoriteRecipes.length > 0 || filteredFavoriteSwaps.length > 0) ? (
                  <div className="space-y-6">
                    {filteredFavoriteRecipes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Favorite Recipes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {filteredFavoriteRecipes.map((recipe) => (
                            <RecipeCard 
                              key={recipe.id} 
                              recipe={recipe}
                              isFavorite={true}
                              onToggleFavorite={(id) => {
                                const newFavorites = favoriteRecipes.filter(recipeId => recipeId !== id);
                                setFavoriteRecipes(newFavorites);
                                localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {filteredFavoriteSwaps.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Favorite Smart Swaps</h3>
                        <div className="space-y-6">
                          {filteredFavoriteSwaps.map((pair) => (
                            <FoodSwapCard 
                              key={pair.id}
                              id={pair.id}
                              originalFood={pair.original} 
                              alternativeFood={pair.alternative}
                              isFavorite={true}
                              onToggleFavorite={(originalId, alternativeId) => 
                                handleToggleFavoriteSwap(pair.id, originalId, alternativeId)
                              } 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Save your favorite recipes and swaps for quick access
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab("recipes")}>
                      Browse Recipes
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <UserProfile />
            
            <div className="mt-6 p-4 rounded-lg border bg-card">
              <h3 className="font-medium mb-2">Nutritional Overview</h3>
              <p className="text-sm text-muted-foreground mb-4">Based on your selected meal plan</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories</span>
                    <span className="font-medium">1,850 / 2,000 kcal</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92.5%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span className="font-medium">95 / 120 g</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carbs</span>
                    <span className="font-medium">200 / 250 g</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fat</span>
                    <span className="font-medium">65 / 70 g</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
