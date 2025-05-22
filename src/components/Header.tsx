
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, User, Egg, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { recipes } from '@/data/foodData';

const Header: React.FC = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const handleSearch = (recipeId: string) => {
    setOpen(false);
    navigate(`/recipe/${recipeId}`);
  };

  // Handle keyboard shortcut to open search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prevOpen => !prevOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <Egg className="h-8 w-8 text-carrot" />
              <h1 className="text-xl md:text-2xl font-display font-bold text-avocado">
                Alimento<span className="text-carrot">Smart Swap</span>
              </h1>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/meal-planner" className="text-sm font-medium hover:text-primary transition-colors">Meal Planner</Link>
          <Link to="/bmi-calculator" className="text-sm font-medium hover:text-primary transition-colors">BMI Calculator</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => setOpen(true)}
            className="hidden md:flex relative rounded-full bg-secondary px-3 py-2 w-64 cursor-pointer"
          >
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Search recipes... (⌘+K)" 
              className="bg-transparent border-none outline-none pl-7 w-full text-sm cursor-pointer"
              readOnly
              onClick={() => setOpen(true)}
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search recipes..." />
            <CommandList>
              <CommandEmpty>No recipes found.</CommandEmpty>
              <CommandGroup heading="Recipes">
                {recipes.map((recipe) => (
                  <CommandItem 
                    key={recipe.id} 
                    onSelect={() => handleSearch(recipe.id)}
                  >
                    <div className="flex flex-col">
                      <span>{recipe.name}</span>
                      <span className="text-xs text-muted-foreground">{recipe.tags.join(', ')}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="hidden md:inline text-sm">Hi, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/signin')} className="hidden md:flex">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => navigate('/signin')}>
                <User className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
