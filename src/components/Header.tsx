
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, User, Egg } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative rounded-full bg-secondary px-3 py-2 w-64">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Search recipes..." 
              className="bg-transparent border-none outline-none pl-7 w-full text-sm"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
