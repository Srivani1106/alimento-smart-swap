
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface Allergy {
  id: string;
  name: string;
  active: boolean;
}

const UserProfile = () => {
  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: '1', name: 'Nuts', active: true },
    { id: '2', name: 'Dairy', active: false },
    { id: '3', name: 'Eggs', active: false },
    { id: '4', name: 'Gluten', active: true },
    { id: '5', name: 'Shellfish', active: false },
  ]);

  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    lowCarb: true,
    highProtein: true,
  });

  const toggleAllergy = (id: string) => {
    setAllergies(allergies.map(allergy => 
      allergy.id === id ? { ...allergy, active: !allergy.active } : allergy
    ));
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          Manage your dietary preferences and allergies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Allergies & Restrictions</h3>
            <div className="flex flex-wrap gap-2">
              {allergies.map(allergy => (
                <Badge 
                  key={allergy.id}
                  variant={allergy.active ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleAllergy(allergy.id)}
                >
                  {allergy.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-2">Dietary Preferences</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="vegetarian" 
                  checked={preferences.vegetarian}
                  onCheckedChange={() => togglePreference('vegetarian')}
                />
                <Label htmlFor="vegetarian">Vegetarian</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="vegan" 
                  checked={preferences.vegan}
                  onCheckedChange={() => togglePreference('vegan')}
                />
                <Label htmlFor="vegan">Vegan</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="lowCarb" 
                  checked={preferences.lowCarb}
                  onCheckedChange={() => togglePreference('lowCarb')}
                />
                <Label htmlFor="lowCarb">Low Carb</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="highProtein" 
                  checked={preferences.highProtein}
                  onCheckedChange={() => togglePreference('highProtein')}
                />
                <Label htmlFor="highProtein">High Protein</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
