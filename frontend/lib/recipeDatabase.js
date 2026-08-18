// Comprehensive recipe database for fallback when AI is unavailable
export const RECIPE_DATABASE = {
  "Butter Chicken": {
    ingredients: [
      { item: "Chicken breast, cubed", amount: "500g", category: "Protein" },
      { item: "Butter", amount: "3 tbsp", category: "Dairy" },
      { item: "Heavy cream", amount: "1 cup", category: "Dairy" },
      { item: "Tomato puree", amount: "2 cups", category: "Vegetable" },
      { item: "Garam masala", amount: "2 tsp", category: "Spice" },
      { item: "Ginger-garlic paste", amount: "2 tbsp", category: "Spice" },
      { item: "Kasuri methi", amount: "1 tsp", category: "Spice" },
      { item: "Red chili powder", amount: "1 tsp", category: "Spice" },
      { item: "Salt", amount: "to taste", category: "Other" }
    ],
    instructions: [
      { step: 1, title: "Marinate Chicken", instruction: "Marinate chicken with yogurt, ginger-garlic paste, red chili powder, and salt for 30 minutes.", tip: "Longer marination gives better flavor." },
      { step: 2, title: "Cook Chicken", instruction: "Grill or pan-fry the marinated chicken until cooked through and slightly charred.", tip: "Don't overcook to keep it tender." },
      { step: 3, title: "Prepare Gravy", instruction: "In a pan, melt butter and add tomato puree. Cook for 5 minutes, then add garam masala and kasuri methi.", tip: "Slow cooking develops deeper flavors." },
      { step: 4, title: "Combine & Finish", instruction: "Add cooked chicken and heavy cream to the gravy. Simmer for 10 minutes until thick and creamy.", tip: "Garnish with fresh cream before serving." }
    ]
  },
  "Chole Bhature": {
    ingredients: [
      { item: "Chickpeas, soaked overnight", amount: "2 cups", category: "Protein" },
      { item: "All-purpose flour", amount: "2 cups", category: "Grain" },
      { item: "Yogurt", amount: "1/4 cup", category: "Dairy" },
      { item: "Onions, chopped", amount: "2 medium", category: "Vegetable" },
      { item: "Tomatoes, pureed", amount: "3 medium", category: "Vegetable" },
      { item: "Chole masala", amount: "2 tbsp", category: "Spice" },
      { item: "Ginger-garlic paste", amount: "1 tbsp", category: "Spice" },
      { item: "Tea bags", amount: "2", category: "Other" },
      { item: "Baking powder", amount: "1/2 tsp", category: "Other" }
    ],
    instructions: [
      { step: 1, title: "Cook Chickpeas", instruction: "Pressure cook soaked chickpeas with tea bags, salt, and water for 4-5 whistles until tender.", tip: "Tea bags give authentic dark color." },
      { step: 2, title: "Prepare Chole Masala", instruction: "Sauté onions until golden, add ginger-garlic paste, tomatoes, and chole masala. Cook until oil separates.", tip: "Well-cooked masala is key to flavor." },
      { step: 3, title: "Combine", instruction: "Add cooked chickpeas to masala and simmer for 15 minutes. Mash some chickpeas for thickness.", tip: "Add chickpea water for desired consistency." },
      { step: 4, title: "Make Bhature", instruction: "Knead flour with yogurt, baking powder, and water. Rest 2 hours, then deep fry small rolled portions until puffed and golden.", tip: "Fry on medium-high heat for best puffing." }
    ]
  },
  "Paneer Butter Masala": {
    ingredients: [
      { item: "Paneer cubes", amount: "300g", category: "Protein" },
      { item: "Butter", amount: "4 tbsp", category: "Dairy" },
      { item: "Heavy cream", amount: "1/2 cup", category: "Dairy" },
      { item: "Tomatoes, pureed", amount: "4 large", category: "Vegetable" },
      { item: "Cashew paste", amount: "2 tbsp", category: "Other" },
      { item: "Kasuri methi", amount: "1 tsp", category: "Spice" },
      { item: "Garam masala", amount: "1 tsp", category: "Spice" },
      { item: "Red chili powder", amount: "1/2 tsp", category: "Spice" }
    ],
    instructions: [
      { step: 1, title: "Prepare Base", instruction: "Heat butter and add tomato puree. Cook until oil separates, about 10 minutes.", tip: "Slow cooking removes raw tomato taste." },
      { step: 2, title: "Add Spices", instruction: "Add red chili powder, garam masala, and cashew paste. Mix well and cook for 2 minutes.", tip: "Cashews add richness." },
      { step: 3, title: "Add Paneer", instruction: "Gently add paneer cubes and coat with gravy. Simmer for 5 minutes.", tip: "Don't overcook paneer or it becomes hard." },
      { step: 4, title: "Finish", instruction: "Add cream and crushed kasuri methi. Mix gently and serve hot.", tip: "Garnish with butter on top." }
    ]
  },
  "Biryani": {
    ingredients: [
      { item: "Basmati rice", amount: "2 cups", category: "Grain" },
      { item: "Chicken/Mutton pieces", amount: "500g", category: "Protein" },
      { item: "Yogurt", amount: "1 cup", category: "Dairy" },
      { item: "Onions, sliced", amount: "3 large", category: "Vegetable" },
      { item: "Biryani masala", amount: "2 tbsp", category: "Spice" },
      { item: "Saffron strands", amount: "1 pinch", category: "Spice" },
      { item: "Mint leaves", amount: "1/2 cup", category: "Vegetable" },
      { item: "Ghee", amount: "3 tbsp", category: "Dairy" }
    ],
    instructions: [
      { step: 1, title: "Marinate Meat", instruction: "Marinate meat with yogurt, biryani masala, mint, and salt for 2 hours.", tip: "Overnight marination works best." },
      { step: 2, title: "Fry Onions", instruction: "Deep fry sliced onions until golden brown and crispy. Set aside.", tip: "Crispy onions add amazing flavor." },
      { step: 3, title: "Layer Biryani", instruction: "Par-cook rice. Layer rice and marinated meat alternately. Top with fried onions and saffron milk.", tip: "Don't fully cook rice before layering." },
      { step: 4, title: "Dum Cook", instruction: "Cover tightly and cook on low heat for 30 minutes (dum). Let it rest 5 minutes before opening.", tip: "Seal lid with dough for authentic dum." }
    ]
  },
  "Chocolate Brownies": {
    ingredients: [
      { item: "Dark chocolate", amount: "200g", category: "Other" },
      { item: "Butter", amount: "150g", category: "Dairy" },
      { item: "Sugar", amount: "1 cup", category: "Other" },
      { item: "Eggs", amount: "3 large", category: "Protein" },
      { item: "All-purpose flour", amount: "3/4 cup", category: "Grain" },
      { item: "Cocoa powder", amount: "1/4 cup", category: "Other" },
      { item: "Vanilla extract", amount: "1 tsp", category: "Other" },
      { item: "Chocolate chips", amount: "1/2 cup", category: "Other" }
    ],
    instructions: [
      { step: 1, title: "Melt Chocolate", instruction: "Melt dark chocolate and butter together in a double boiler until smooth.", tip: "Don't overheat or chocolate will seize." },
      { step: 2, title: "Mix Wet Ingredients", instruction: "Beat eggs and sugar until fluffy. Add melted chocolate mixture and vanilla extract.", tip: "Room temperature eggs mix better." },
      { step: 3, title: "Add Dry Ingredients", instruction: "Sift flour and cocoa powder. Fold gently into wet mixture. Don't overmix.", tip: "Overmixing makes brownies cakey." },
      { step: 4, title: "Bake", instruction: "Pour into greased pan, add chocolate chips on top. Bake at 180°C for 25-30 minutes. Center should be slightly gooey.", tip: "Test with toothpick - it should have moist crumbs." }
    ]
  },
  "Pasta Carbonara": {
    ingredients: [
      { item: "Spaghetti", amount: "400g", category: "Grain" },
      { item: "Pancetta or bacon", amount: "200g", category: "Protein" },
      { item: "Egg yolks", amount: "4", category: "Protein" },
      { item: "Parmesan cheese, grated", amount: "1 cup", category: "Dairy" },
      { item: "Black pepper", amount: "2 tsp", category: "Spice" },
      { item: "Salt", amount: "to taste", category: "Other" }
    ],
    instructions: [
      { step: 1, title: "Cook Pasta", instruction: "Boil spaghetti in salted water until al dente. Reserve 1 cup pasta water.", tip: "Don't overcook - should have bite." },
      { step: 2, title: "Crisp Pancetta", instruction: "Fry pancetta until crispy. Remove from heat.", tip: "Don't drain fat - it's essential." },
      { step: 3, title: "Prepare Egg Mixture", instruction: "Whisk egg yolks with parmesan and black pepper.", tip: "Add slowly to prevent scrambling." },
      { step: 4, title: "Combine", instruction: "Toss hot pasta with pancetta, then remove from heat. Add egg mixture and pasta water, tossing constantly until creamy.", tip: "Work quickly off heat to avoid scrambling." }
    ]
  }
};

// Function to get recipe from database with fuzzy matching
export function getRecipeFromDatabase(recipeName) {
  const normalized = recipeName.toLowerCase().trim();
  
  // Direct match
  for (const [key, value] of Object.entries(RECIPE_DATABASE)) {
    if (key.toLowerCase() === normalized) {
      return { ...value, title: key };
    }
  }
  
  // Partial match
  for (const [key, value] of Object.entries(RECIPE_DATABASE)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return { ...value, title: key };
    }
  }
  
  return null;
}
