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
  {
    id: "3",
    name: "Mediterranean Chickpea Salad",
    image: "https://images.unsplash.com/photo-1511909525232-61113c912358?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    ingredients: [
      {
        name: "Chickpeas",
        amount: "2 cans (15 oz each)",
        optional: false,
        substitutes: ["white beans", "fava beans"],
      },
      {
        name: "Cucumber",
        amount: "1 medium",
        optional: false,
      },
      {
        name: "Cherry tomatoes",
        amount: "1 cup",
        optional: false,
        substitutes: ["grape tomatoes", "diced roma tomatoes"],
      },
      {
        name: "Red onion",
        amount: "1/4 cup",
        optional: true,
        substitutes: ["green onion", "shallots"],
      },
      {
        name: "Kalamata olives",
        amount: "1/2 cup",
        optional: true,
        substitutes: ["black olives"],
      },
      {
        name: "Feta cheese",
        amount: "1/2 cup",
        optional: true,
        substitutes: ["goat cheese", "vegan feta"],
      },
      {
        name: "Fresh parsley",
        amount: "1/4 cup",
        optional: false,
      },
      {
        name: "Olive oil",
        amount: "3 tbsp",
        optional: false,
        substitutes: ["avocado oil"],
      },
      {
        name: "Lemon juice",
        amount: "2 tbsp",
        optional: false,
        substitutes: ["white wine vinegar"],
      },
      {
        name: "Garlic",
        amount: "2 cloves",
        optional: true,
      },
    ],
    instructions: [
      "Drain and rinse chickpeas and place in a large bowl.",
      "Dice cucumber, halve cherry tomatoes, and finely chop red onion. Add to the bowl.",
      "Slice olives and add to the bowl, along with crumbled feta cheese.",
      "Chop parsley and add to the mixture.",
      "In a small bowl, whisk together olive oil, lemon juice, minced garlic, salt, and pepper.",
      "Pour dressing over the salad and toss to combine.",
      "Refrigerate for at least 30 minutes before serving to allow flavors to meld.",
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 30,
      fat: 18,
    },
    tags: ["lunch", "vegetarian", "gluten-free", "mediterranean"],
  },
  {
    id: "4",
    name: "Teriyaki Salmon Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      {
        name: "Salmon fillets",
        amount: "2 (6 oz each)",
        optional: false,
        substitutes: ["tofu steaks", "chicken breast"],
      },
      {
        name: "Brown rice",
        amount: "1 cup uncooked",
        optional: false,
        substitutes: ["quinoa", "cauliflower rice"],
      },
      {
        name: "Broccoli",
        amount: "2 cups",
        optional: false,
        substitutes: ["green beans", "asparagus"],
      },
      {
        name: "Carrot",
        amount: "1 large",
        optional: false,
      },
      {
        name: "Avocado",
        amount: "1",
        optional: true,
      },
      {
        name: "Teriyaki sauce",
        amount: "1/4 cup",
        optional: false,
        substitutes: ["soy sauce with honey"],
      },
      {
        name: "Sesame seeds",
        amount: "1 tbsp",
        optional: true,
      },
      {
        name: "Green onion",
        amount: "2 stalks",
        optional: true,
      },
    ],
    instructions: [
      "Cook brown rice according to package instructions.",
      "Preheat oven to 400°F (200°C). Place salmon on a baking sheet and brush with half of the teriyaki sauce.",
      "Bake salmon for 12-15 minutes or until it flakes easily with a fork.",
      "Meanwhile, steam broccoli and julienne or grate the carrot.",
      "Slice avocado when ready to serve.",
      "Assemble bowls with rice as the base, add vegetables and salmon.",
      "Drizzle with remaining teriyaki sauce and sprinkle with sesame seeds and chopped green onion.",
    ],
    nutrition: {
      calories: 520,
      protein: 32,
      carbs: 45,
      fat: 22,
    },
    tags: ["dinner", "high-protein", "pescatarian"],
  },
  {
    id: "5",
    name: "Blueberry Oatmeal Breakfast Bars",
    image: "https://images.unsplash.com/photo-1464297162577-f5295c892194?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    cookTime: 25,
    servings: 9,
    ingredients: [
      {
        name: "Rolled oats",
        amount: "2 cups",
        optional: false,
        substitutes: ["quick oats", "gluten-free oats"],
      },
      {
        name: "Almond flour",
        amount: "1 cup",
        optional: false,
        substitutes: ["oat flour", "all-purpose flour"],
      },
      {
        name: "Cinnamon",
        amount: "1 tsp",
        optional: false,
      },
      {
        name: "Baking powder",
        amount: "1 tsp",
        optional: false,
      },
      {
        name: "Salt",
        amount: "1/4 tsp",
        optional: false,
      },
      {
        name: "Maple syrup",
        amount: "1/3 cup",
        optional: false,
        substitutes: ["honey", "agave nectar"],
      },
      {
        name: "Coconut oil",
        amount: "1/3 cup",
        optional: false,
        substitutes: ["butter", "applesauce"],
      },
      {
        name: "Almond milk",
        amount: "1/2 cup",
        optional: false,
        substitutes: ["any plant or dairy milk"],
      },
      {
        name: "Vanilla extract",
        amount: "1 tsp",
        optional: true,
      },
      {
        name: "Fresh blueberries",
        amount: "1 1/2 cups",
        optional: false,
        substitutes: ["raspberries", "chopped strawberries"],
      },
    ],
    instructions: [
      "Preheat oven to 350°F (175°C) and line an 8x8 inch baking pan with parchment paper.",
      "In a large bowl, mix oats, almond flour, cinnamon, baking powder, and salt.",
      "In a separate bowl, whisk together maple syrup, melted coconut oil, almond milk, and vanilla.",
      "Pour wet ingredients into dry ingredients and stir until combined.",
      "Gently fold in 1 cup of blueberries.",
      "Press 2/3 of the mixture into the prepared pan. Scatter remaining 1/2 cup blueberries on top.",
      "Crumble the remaining oat mixture over the blueberries.",
      "Bake for 25-30 minutes until golden brown. Allow to cool completely before cutting into bars.",
      "Store in an airtight container for up to 5 days or freeze for longer storage."
    ],
    nutrition: {
      calories: 220,
      protein: 5,
      carbs: 25,
      fat: 12,
    },
    tags: ["breakfast", "snack", "vegetarian", "meal-prep"],
  },
  {
    id: "6",
    name: "Lentil Vegetable Soup",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    cookTime: 30,
    servings: 6,
    ingredients: [
      {
        name: "Green or brown lentils",
        amount: "1 cup",
        optional: false,
        substitutes: ["red lentils", "split peas"],
      },
      {
        name: "Olive oil",
        amount: "2 tbsp",
        optional: false,
      },
      {
        name: "Onion",
        amount: "1 medium",
        optional: false,
      },
      {
        name: "Carrots",
        amount: "2 large",
        optional: false,
      },
      {
        name: "Celery",
        amount: "2 stalks",
        optional: false,
      },
      {
        name: "Garlic",
        amount: "3 cloves",
        optional: false,
        substitutes: ["1 tsp garlic powder"],
      },
      {
        name: "Vegetable broth",
        amount: "6 cups",
        optional: false,
        substitutes: ["chicken broth"],
      },
      {
        name: "Diced tomatoes",
        amount: "1 can (14 oz)",
        optional: false,
      },
      {
        name: "Cumin",
        amount: "1 tsp",
        optional: false,
      },
      {
        name: "Thyme",
        amount: "1/2 tsp",
        optional: true,
      },
      {
        name: "Bay leaf",
        amount: "1",
        optional: true,
      },
      {
        name: "Spinach",
        amount: "2 cups",
        optional: true,
        substitutes: ["kale", "swiss chard"],
      },
      {
        name: "Lemon juice",
        amount: "1 tbsp",
        optional: true,
      },
    ],
    instructions: [
      "Rinse lentils under cold water and check for any stones or debris.",
      "Heat olive oil in a large pot over medium heat. Add diced onion, carrots, and celery, and sauté for 5-7 minutes until softened.",
      "Add minced garlic and sauté for 30 seconds until fragrant.",
      "Stir in lentils, vegetable broth, diced tomatoes with their juice, cumin, thyme, bay leaf, salt, and pepper.",
      "Bring to a boil, then reduce heat to low and simmer, partially covered, for 25-30 minutes or until lentils are tender.",
      "Remove bay leaf. Stir in spinach and cook until wilted, about 2 minutes.",
      "Stir in lemon juice and adjust seasonings to taste.",
      "Serve hot, optionally with a sprinkle of fresh herbs or a dollop of yogurt.",
    ],
    nutrition: {
      calories: 240,
      protein: 12,
      carbs: 36,
      fat: 6,
    },
    tags: ["dinner", "soup", "vegan", "gluten-free"],
  },
];
