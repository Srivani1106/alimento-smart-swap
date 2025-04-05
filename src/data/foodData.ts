
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  image: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens: string[];
  alternatives: string[];
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: {
    name: string;
    amount: string;
    optional: boolean;
    substitutes?: string[];
  }[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
}

// Sample food items data
export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Almonds",
    category: "Nuts",
    image: "https://images.unsplash.com/photo-1574883052806-413e0a1f71ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutrition: {
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
    },
    allergens: ["nuts"],
    alternatives: ["sunflower seeds", "pumpkin seeds"],
  },
  {
    id: "2",
    name: "Eggs",
    category: "Dairy & Alternatives",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutrition: {
      calories: 72,
      protein: 6,
      carbs: 0.6,
      fat: 5,
    },
    allergens: ["eggs"],
    alternatives: ["flax egg", "chia egg", "silken tofu"],
  },
  {
    id: "3",
    name: "White Rice",
    category: "Grains",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutrition: {
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
    },
    allergens: [],
    alternatives: ["brown rice", "quinoa", "cauliflower rice"],
  },
  {
    id: "4",
    name: "Cow's Milk",
    category: "Dairy & Alternatives",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutrition: {
      calories: 103,
      protein: 8,
      carbs: 12,
      fat: 2.4,
    },
    allergens: ["dairy", "lactose"],
    alternatives: ["almond milk", "oat milk", "soy milk"],
  },
];

// Sample recipe data
export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Avocado Toast with Poached Eggs",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    ingredients: [
      {
        name: "Bread",
        amount: "2 slices",
        optional: false,
        substitutes: ["gluten-free bread", "sweet potato slices"],
      },
      {
        name: "Avocado",
        amount: "1 medium",
        optional: false,
      },
      {
        name: "Eggs",
        amount: "2 large",
        optional: false,
        substitutes: ["tofu scramble"],
      },
      {
        name: "Cherry tomatoes",
        amount: "1/2 cup",
        optional: true,
      },
      {
        name: "Red pepper flakes",
        amount: "1/4 tsp",
        optional: true,
        substitutes: ["black pepper"],
      },
      {
        name: "Salt",
        amount: "to taste",
        optional: false,
      },
      {
        name: "Olive oil",
        amount: "1 tsp",
        optional: true,
        substitutes: ["avocado oil"],
      },
    ],
    instructions: [
      "Toast bread slices until golden and crisp.",
      "While bread is toasting, bring a pot of water to a gentle simmer. Add a splash of vinegar.",
      "Crack an egg into a small bowl, then gently slide it into the simmering water. Repeat with the second egg. Cook for 3-4 minutes for a runny yolk.",
      "Mash avocado in a bowl with salt and a drizzle of olive oil.",
      "Spread mashed avocado onto toast. Top with poached eggs, halved cherry tomatoes, and red pepper flakes.",
      "Serve immediately."
    ],
    nutrition: {
      calories: 350,
      protein: 14,
      carbs: 30,
      fat: 20,
    },
    tags: ["breakfast", "vegetarian", "high-protein"],
  },
  {
    id: "2",
    name: "Quinoa Buddha Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    ingredients: [
      {
        name: "Quinoa",
        amount: "1 cup",
        optional: false,
        substitutes: ["brown rice", "cauliflower rice"],
      },
      {
        name: "Sweet potato",
        amount: "1 medium",
        optional: false,
        substitutes: ["butternut squash"],
      },
      {
        name: "Chickpeas",
        amount: "1 can (15 oz)",
        optional: false,
        substitutes: ["black beans", "tofu cubes"],
      },
      {
        name: "Kale",
        amount: "2 cups",
        optional: false,
        substitutes: ["spinach", "mixed greens"],
      },
      {
        name: "Avocado",
        amount: "1",
        optional: true,
      },
      {
        name: "Tahini",
        amount: "2 tbsp",
        optional: true,
        substitutes: ["hummus", "yogurt"],
      },
      {
        name: "Lemon juice",
        amount: "1 tbsp",
        optional: true,
      },
    ],
    instructions: [
      "Rinse quinoa and cook according to package instructions.",
      "Preheat oven to 400°F (200°C). Cube sweet potato, toss with olive oil and salt, and roast for 20 minutes or until tender.",
      "Drain and rinse chickpeas. Toss with spices of choice and roast alongside sweet potatoes for the last 10 minutes.",
      "Massage kale with a little olive oil and salt until softened.",
      "Make dressing by whisking together tahini, lemon juice, water, salt, and pepper.",
      "Assemble bowls with quinoa, roasted veggies, chickpeas, and kale. Top with sliced avocado and drizzle with tahini dressing.",
    ],
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 65,
      fat: 15,
    },
    tags: ["lunch", "dinner", "vegan", "gluten-free"],
  },
];
