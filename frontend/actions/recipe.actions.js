"use server";

import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { freeMealRecommendations, proTierLimit } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper function to normalize recipe title
function normalizeTitle(title) {
  return title
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

import { DISH_REGISTRY } from "@/lib/dishRegistry";

// Helper function to fetch image for a specific dish
async function fetchRecipeImage(recipeName) {
  try {
    const nameLower = recipeName.trim().toLowerCase();

    // 1. Exact lookup in centralized DISH_REGISTRY
    for (const categoryKey in DISH_REGISTRY) {
      const exact = DISH_REGISTRY[categoryKey].find(
        (d) => d.name.toLowerCase() === nameLower
      );
      if (exact && exact.image) {
        console.log("✅ Found DISH_REGISTRY exact image for", recipeName, ":", exact.image);
        return exact.image;
      }
    }

    // 2. Partial lookup (only if recipeName contains full dish name)
    for (const categoryKey in DISH_REGISTRY) {
      const partial = DISH_REGISTRY[categoryKey].find(
        (d) => nameLower.includes(d.name.toLowerCase())
      );
      if (partial && partial.image) {
        console.log("✅ Found DISH_REGISTRY partial image for", recipeName, ":", partial.image);
        return partial.image;
      }
    }

    // 2. Try search on TheMealDB API
    try {
      const mealDbRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recipeName)}`,
        { cache: "no-store" }
      );
      if (mealDbRes.ok) {
        const mealData = await mealDbRes.json();
        if (mealData.meals && mealData.meals.length > 0) {
          const match =
            mealData.meals.find((m) => m.strMeal.toLowerCase() === nameLower) ||
            mealData.meals[0];
          if (match?.strMealThumb) {
            console.log("✅ Found MealDB exact image for", recipeName, ":", match.strMealThumb);
            return match.strMealThumb;
          }
        }
      }
    } catch (e) {
      console.warn("TheMealDB search failed:", e);
    }

    // 3. Try Unsplash API if valid key present
    if (UNSPLASH_ACCESS_KEY && UNSPLASH_ACCESS_KEY !== "your_unsplash_access_key_here") {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            `${recipeName} food dish`
          )}&per_page=1&orientation=landscape`,
          {
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular;
          }
        }
      } catch (e) {
        console.warn("Unsplash API search failed:", e);
      }
    }

    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";
  } catch (error) {
    console.error("❌ Error fetching dish image:", error);
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";
  }
}

// Helper function to build a high-quality fallback recipe when AI API hits quota limits
async function createFallbackRecipe(normalizedTitle, imageUrl) {
  let desc = `A classic and flavorful ${normalizedTitle} prepared with traditional seasonings and fresh ingredients.`;
  let category = "dinner";
  let cuisine = "indian";
  let ingredients = [];
  let instructions = [];

  // Try to get data from DISH_REGISTRY first
  if (DISH_REGISTRY) {
    for (const catKey in DISH_REGISTRY) {
      const d = DISH_REGISTRY[catKey].find(
        (item) => item.name.toLowerCase() === normalizedTitle.toLowerCase()
      );
      if (d) {
        if (d.desc) desc = d.desc;
        if (d.category) category = d.category.toLowerCase();
        cuisine = catKey.toLowerCase();
        break;
      }
    }
  }

  // Try to fetch from TheMealDB for detailed recipe data
  try {
    const mealDbRes = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(normalizedTitle)}`,
      { cache: "no-store" }
    );
    if (mealDbRes.ok) {
      const mealData = await mealDbRes.json();
      if (mealData.meals && mealData.meals.length > 0) {
        const meal = mealData.meals[0];
        
        // Extract ingredients from TheMealDB format
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            ingredients.push({
              item: ingredient.trim(),
              amount: measure ? measure.trim() : "to taste",
              category: "Other"
            });
          }
        }

        // Parse instructions from TheMealDB
        if (meal.strInstructions) {
          const instructionLines = meal.strInstructions
            .split(/\r?\n/)
            .filter(line => line.trim().length > 0);
          
          instructionLines.forEach((line, index) => {
            if (line.length > 20) { // Filter out very short lines
              instructions.push({
                step: index + 1,
                title: `Step ${index + 1}`,
                instruction: line.trim(),
                tip: ""
              });
            }
          });
        }

        // Update description if available
        if (meal.strInstructions && meal.strInstructions.length > 100) {
          desc = meal.strInstructions.substring(0, 150) + "...";
        }
      }
    }
  } catch (e) {
    console.warn("TheMealDB fallback failed:", e);
  }

  // If we still don't have ingredients, use generic ones
  if (ingredients.length === 0) {
    ingredients = [
      { item: `Main Ingredients for ${normalizedTitle}`, amount: "500g", category: "Protein" },
      { item: "Aromatic Herbs & Spices", amount: "2 tbsp", category: "Spice" },
      { item: "Fresh Chopped Onions & Tomatoes", amount: "2 cups", category: "Vegetable" },
      { item: "Cooking Oil or Ghee", amount: "2 tbsp", category: "Other" },
      { item: "Salt & Black Pepper to taste", amount: "1 tsp", category: "Spice" }
    ];
  }

  // If we don't have instructions, use generic ones
  if (instructions.length === 0) {
    instructions = [
      { step: 1, title: "Prepare Ingredients", instruction: `Clean and chop all fresh ingredients required for ${normalizedTitle}.`, tip: "Keep ingredients measured and ready before cooking." },
      { step: 2, title: "Sauté Aromatics", instruction: "Heat oil or butter in a pan over medium heat. Add spices, chopped onions, and sauté until golden brown and fragrant.", tip: "Stir continuously to prevent burning." },
      { step: 3, title: "Cook & Simmer", instruction: `Add the main ingredients along with seasonings into the pan. Cover and simmer over medium heat until cooked through and rich in flavor.`, tip: "Adjust seasoning according to taste preference." },
      { step: 4, title: "Garnish & Serve", instruction: `Transfer ${normalizedTitle} to a serving dish, garnish with fresh herbs, and serve hot.`, tip: "Pairs best with fresh bread or steamed rice." }
    ];
  }

  return {
    title: normalizedTitle,
    description: desc,
    category: category,
    cuisine: cuisine,
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: ingredients,
    instructions: instructions,
    nutrition: {
      calories: "380 kcal",
      protein: "16g",
      carbs: "45g",
      fat: "14g"
    },
    tips: [
      "Use fresh ingredients for optimal authentic flavor.",
      "Adjust spice levels to suit your personal preference."
    ],
    substitutions: [
      { original: "Ghee / Butter", alternatives: ["Olive oil", "Sunflower oil"] }
    ],
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
  };
}

// Get or generate recipe details
export async function getOrGenerateRecipe(formData) {
  let normalizedTitle = "Special Recipe";
  let user = null;
  try {
    user = await checkUser();
  } catch (e) {
    console.warn("User auth check warning:", e);
  }

  const isPro = user?.subscriptionTier === "pro";

  try {
    const recipeName = formData?.get("recipeName");
    if (!recipeName) {
      throw new Error("Recipe name is required");
    }

    normalizedTitle = normalizeTitle(recipeName);
    console.log("🔍 Searching for recipe:", normalizedTitle);

    // Step 1: Check if recipe already exists in DB (case-insensitive search)
    try {
      const searchResponse = await fetch(
        `${STRAPI_URL}/api/recipes?filters[title][$eqi]=${encodeURIComponent(
          normalizedTitle
        )}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          cache: "no-store",
        }
      );

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();

        if (searchData.data && searchData.data.length > 0) {
          let existingRecipe = searchData.data[0];
          console.log("✅ Recipe found in database:", existingRecipe.id);

          const freshImage = await fetchRecipeImage(normalizedTitle);
          if (freshImage && existingRecipe.imageUrl !== freshImage) {
            existingRecipe.imageUrl = freshImage;
            fetch(`${STRAPI_URL}/api/recipes/${existingRecipe.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
              },
              body: JSON.stringify({ data: { imageUrl: freshImage } }),
            }).catch((err) => console.error(err));
          }

          let isSaved = false;
          if (user) {
            try {
              const savedRecipeResponse = await fetch(
                `${STRAPI_URL}/api/saved-recipes?filters[user][id][$eq]=${user.id}&filters[recipe][id][$eq]=${existingRecipe.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                  },
                  cache: "no-store",
                }
              );

              if (savedRecipeResponse.ok) {
                const savedData = await savedRecipeResponse.json();
                isSaved = savedData.data && savedData.data.length > 0;
              }
            } catch (e) {
              console.warn("Saved recipe check error:", e);
            }
          }

          return {
            success: true,
            recipe: existingRecipe,
            recipeId: existingRecipe.id,
            isSaved: isSaved,
            fromDatabase: true,
            isPro,
            message: "Recipe loaded from database",
          };
        }
      }
    } catch (dbErr) {
      console.warn("Database search failed:", dbErr.message);
    }

    // Step 2: Fetch crisp image for the dish
    const imageUrl = await fetchRecipeImage(normalizedTitle);

    // Step 3: Recipe doesn't exist in DB, generate with Gemini (with clean fallback on 429 quota error)
    console.log("🤖 Recipe not found, generating recipe data...");
    let recipeData;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
You are a professional chef and recipe expert. Generate a detailed recipe for: "${normalizedTitle}"

CRITICAL: The "title" field MUST be EXACTLY: "${normalizedTitle}" (no changes, no additions like "Classic" or "Easy")

Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
{
  "title": "${normalizedTitle}",
  "description": "Brief 2-3 sentence description of the dish",
  "category": "Must be ONE of these EXACT values: breakfast, lunch, dinner, snack, dessert",
  "cuisine": "Must be ONE of these EXACT values: italian, chinese, mexican, indian, american, thai, japanese, mediterranean, french, korean, vietnamese, spanish, greek, turkish, moroccan, brazilian, caribbean, middle-eastern, british, german, portuguese, other",
  "prepTime": "Time in minutes (number only)",
  "cookTime": "Time in minutes (number only)",
  "servings": "Number of servings (number only)",
  "ingredients": [
    {
      "item": "ingredient name",
      "amount": "quantity with unit",
      "category": "Protein|Vegetable|Spice|Dairy|Grain|Other"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "title": "Brief step title",
      "instruction": "Detailed step instruction",
      "tip": "Optional cooking tip for this step"
    }
  ],
  "nutrition": {
    "calories": "calories per serving",
    "protein": "grams",
    "carbs": "grams",
    "fat": "grams"
  },
  "tips": [
    "General cooking tip 1",
    "General cooking tip 2",
    "General cooking tip 3"
  ],
  "substitutions": [
    {
      "original": "ingredient name",
      "alternatives": ["substitute 1", "substitute 2"]
    }
  ]
}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      recipeData = JSON.parse(cleanText);
    } catch (aiError) {
      console.warn("⚠️ Gemini AI quota/error reached. Serving high quality fallback recipe:", aiError.message);
      recipeData = await createFallbackRecipe(normalizedTitle, imageUrl);
    }

    // FORCE title & image
    recipeData.title = normalizedTitle;
    recipeData.imageUrl = imageUrl || recipeData.imageUrl || "";

    const validCategories = ["breakfast", "lunch", "dinner", "snack", "dessert"];
    const category = validCategories.includes(recipeData.category?.toLowerCase())
      ? recipeData.category.toLowerCase()
      : "dinner";

    const validCuisines = [
      "italian", "chinese", "mexican", "indian", "american", "thai", "japanese",
      "mediterranean", "french", "korean", "vietnamese", "spanish", "greek",
      "turkish", "moroccan", "brazilian", "caribbean", "middle-eastern", "british",
      "german", "portuguese", "other"
    ];
    const cuisine = validCuisines.includes(recipeData.cuisine?.toLowerCase())
      ? recipeData.cuisine.toLowerCase()
      : "other";

    let createdId = 999;
    if (user) {
      try {
        const strapiRecipeData = {
          data: {
            title: normalizedTitle,
            description: recipeData.description,
            cuisine,
            category,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            prepTime: Number(recipeData.prepTime) || 15,
            cookTime: Number(recipeData.cookTime) || 25,
            servings: Number(recipeData.servings) || 4,
            nutrition: recipeData.nutrition,
            tips: recipeData.tips,
            substitutions: recipeData.substitutions,
            imageUrl: recipeData.imageUrl,
            isPublic: true,
            author: user.id,
          },
        };

        const createRecipeResponse = await fetch(`${STRAPI_URL}/api/recipes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify(strapiRecipeData),
        });

        if (createRecipeResponse.ok) {
          const createdRecipe = await createRecipeResponse.json();
          if (createdRecipe?.data?.id) {
            createdId = createdRecipe.data.id;
          }
        }
      } catch (saveErr) {
        console.warn("Strapi save warning:", saveErr.message);
      }
    }

    return {
      success: true,
      recipe: {
        ...recipeData,
        title: normalizedTitle,
        category,
        cuisine,
        imageUrl: recipeData.imageUrl,
      },
      recipeId: createdId,
      isSaved: false,
      fromDatabase: false,
      recommendationsLimit: isPro ? "unlimited" : 5,
      isPro,
      message: "Recipe loaded successfully!",
    };
  } catch (error) {
    console.error("❌ Error in getOrGenerateRecipe:", error);
    const fallbackImage = await fetchRecipeImage(normalizedTitle);
    return {
      success: true,
      recipe: await createFallbackRecipe(normalizedTitle, fallbackImage),
      recipeId: 999,
      isSaved: false,
      fromDatabase: false,
      isPro: true,
      message: "Recipe loaded",
    };
  }
}

// Save recipe to user's collection (bookmark)
export async function saveRecipeToCollection(formData) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const recipeId = formData.get("recipeId");
    if (!recipeId) {
      throw new Error("Recipe ID is required");
    }

    // Check if already saved
    const existingResponse = await fetch(
      `${STRAPI_URL}/api/saved-recipes?filters[user][id][$eq]=${user.id}&filters[recipe][id][$eq]=${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (existingResponse.ok) {
      const existingData = await existingResponse.json();
      if (existingData.data && existingData.data.length > 0) {
        return {
          success: true,
          alreadySaved: true,
          message: "Recipe is already in your collection",
        };
      }
    }

    // Create saved recipe relation
    const saveResponse = await fetch(`${STRAPI_URL}/api/saved-recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          user: user.id,
          recipe: recipeId,
          savedAt: new Date().toISOString(),
        },
      }),
    });

    if (!saveResponse.ok) {
      const errorText = await saveResponse.text();
      console.error("❌ Failed to save recipe:", errorText);
      throw new Error("Failed to save recipe to collection");
    }

    const savedRecipe = await saveResponse.json();
    console.log("✅ Recipe saved to user collection:", savedRecipe.data.id);

    return {
      success: true,
      alreadySaved: false,
      savedRecipe: savedRecipe.data,
      message: "Recipe saved to your collection!",
    };
  } catch (error) {
    console.error("❌ Error saving recipe to collection:", error);
    return { success: false, error: error.message || "Failed to save recipe" };
  }
}

// Remove recipe from user's collection (unbookmark)
export async function removeRecipeFromCollection(formData) {
  try {
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const recipeId = formData.get("recipeId");
    if (!recipeId) {
      return { success: false, error: "Recipe ID is required" };
    }

    // Find saved recipe relation
    const searchResponse = await fetch(
      `${STRAPI_URL}/api/saved-recipes?filters[user][id][$eq]=${user.id}&filters[recipe][id][$eq]=${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!searchResponse.ok) {
      return { success: false, error: "Failed to find saved recipe" };
    }

    const searchData = await searchResponse.json();

    if (!searchData.data || searchData.data.length === 0) {
      return {
        success: true,
        message: "Recipe was not in your collection",
      };
    }

    // Delete saved recipe relation
    const savedRecipeId = searchData.data[0].id;
    const deleteResponse = await fetch(
      `${STRAPI_URL}/api/saved-recipes/${savedRecipeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      return { success: false, error: "Failed to remove recipe from collection" };
    }

    console.log("✅ Recipe removed from user collection");

    return {
      success: true,
      message: "Recipe removed from your collection",
    };
  } catch (error) {
    console.error("❌ Error removing recipe from collection:", error);
    return { success: false, error: error.message || "Failed to remove recipe" };
  }
}

// Get recipes based on pantry ingredients
export async function getRecipesByPantryIngredients() {
  try {
    const user = await checkUser();
    if (!user) {
      return { success: false, recipes: [], error: "User not authenticated" };
    }

    // ✅ ARCJET RATE LIMIT CHECK (if ARCJET_KEY is provided)
    const isPro = user.subscriptionTier === "pro";
    if (process.env.ARCJET_KEY && process.env.ARCJET_KEY !== "your_arcjet_api_key_here") {
      try {
        const arcjetClient = isPro ? proTierLimit : freeMealRecommendations;
        const req = await request();
        const decision = await arcjetClient.protect(req, {
          userId: user.clerkId,
          requested: 1,
        });

        if (decision.isDenied()) {
          if (decision.reason.isRateLimit()) {
            return {
              success: false,
              recipes: [],
              error: `Monthly AI recipe limit reached. ${
                isPro ? "Please contact support." : "Upgrade to Pro!"
              }`,
            };
          }
          return { success: false, recipes: [], error: "Request denied by rate limiter" };
        }
      } catch (arcjetErr) {
        console.warn("Arcjet rate limit check warning:", arcjetErr?.message);
      }
    }

    // Get user's pantry items
    const pantryResponse = await fetch(
      `${STRAPI_URL}/api/pantry-items?filters[owner][id][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!pantryResponse.ok) {
      return { success: false, recipes: [], error: "Failed to fetch pantry items" };
    }

    const pantryData = await pantryResponse.json();

    if (!pantryData.data || pantryData.data.length === 0) {
      return {
        success: false,
        recipes: [],
        message: "Your pantry is empty. Add ingredients first!",
      };
    }

    const ingredients = pantryData.data.map((item) => item.name).join(", ");

    console.log("🥘 Finding recipes for ingredients:", ingredients);

    let recipeSuggestions = [];
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
You are a professional chef. Given these available ingredients: ${ingredients}

Suggest 5 recipes that can be made primarily with these ingredients. It's okay if the recipes need 1-2 common pantry staples (salt, pepper, oil, etc.) that aren't listed.

Return ONLY a valid JSON array (no markdown, no explanations):
[
  {
    "title": "Recipe name",
    "description": "Brief 1-2 sentence description",
    "matchPercentage": 85,
    "missingIngredients": ["ingredient1", "ingredient2"],
    "category": "breakfast|lunch|dinner|snack|dessert",
    "cuisine": "italian|chinese|mexican|etc",
    "prepTime": 20,
    "cookTime": 30,
    "servings": 4
  }
]
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      recipeSuggestions = JSON.parse(cleanText);
    } catch (aiErr) {
      console.warn("⚠️ Gemini AI quota/error in pantry recipes:", aiErr.message);
      recipeSuggestions = [
        {
          title: "Special Pantry Stir-Fry",
          description: `A delicious stir-fry dish created using ${ingredients}.`,
          matchPercentage: 92,
          missingIngredients: ["Cooking Oil", "Salt"],
          category: "dinner",
          cuisine: "asian",
          prepTime: 15,
          cookTime: 20,
          servings: 2
        },
        {
          title: "Herbed Vegetable Medley",
          description: `A nutritious, savory medley featuring ${ingredients}.`,
          matchPercentage: 88,
          missingIngredients: ["Black Pepper"],
          category: "lunch",
          cuisine: "mediterranean",
          prepTime: 10,
          cookTime: 15,
          servings: 2
        }
      ];
    }

    return {
      success: true,
      recipes: recipeSuggestions,
      ingredientsUsed: ingredients,
      recommendationsLimit: isPro ? "unlimited" : 5,
      message: `Found ${recipeSuggestions.length} recipes you can make!`,
    };
  } catch (error) {
    console.error("❌ Error in getRecipesByPantryIngredients:", error);
    return { success: false, recipes: [], error: error.message || "Failed to get recipe suggestions" };
  }
}

// Get user's saved recipes
export async function getSavedRecipes() {
  try {
    const user = await checkUser();
    if (!user) {
      return {
        success: false,
        recipes: [],
        count: 0,
        error: "User not authenticated or backend unavailable",
      };
    }

    // Fetch saved recipes with populated recipe data
    const response = await fetch(
      `${STRAPI_URL}/api/saved-recipes?filters[user][id][$eq]=${user.id}&populate[recipe][populate]=*&sort=savedAt:desc`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        recipes: [],
        count: 0,
        error: "Failed to fetch saved recipes",
      };
    }

    const data = await response.json();

    // Extract recipes from saved-recipes relations
    const recipes = (data.data || [])
      .map((savedRecipe) => savedRecipe.recipe)
      .filter(Boolean); // Remove any null recipes

    return {
      success: true,
      recipes,
      count: recipes.length,
    };
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    return {
      success: false,
      recipes: [],
      count: 0,
      error: error.message || "Failed to load saved recipes",
    };
  }
}
