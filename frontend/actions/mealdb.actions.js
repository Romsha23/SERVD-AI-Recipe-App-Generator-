"use server";

import { DISH_REGISTRY, getDishesByCuisine } from "@/lib/dishRegistry";

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

const FALLBACK_CUISINE_MEALS = {
  korean: [
    {
      strMeal: "Bibimbap",
      strMealThumb:
        "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Kimchi Stew (Kimchi Jjigae)",
      strMealThumb:
        "https://images.unsplash.com/photo-1583032015879-e5022ab87c3b?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Korean Fried Chicken",
      strMealThumb:
        "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Bulgogi (Korean Beef)",
      strMealThumb:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Tteokbokki (Spicy Rice Cakes)",
      strMealThumb:
        "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Japchae (Glass Noodle Stir-Fry)",
      strMealThumb:
        "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80",
    },
  ],
  mediterranean: [
    {
      strMeal: "Authentic Greek Salad",
      strMealThumb:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Falafel Wrap with Tahini",
      strMealThumb:
        "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Creamy Hummus & Pita Plate",
      strMealThumb:
        "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Seafood Paella",
      strMealThumb:
        "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Shakshuka Poached Eggs",
      strMealThumb:
        "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Traditional Gyros Platter",
      strMealThumb:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    },
  ],
  caribbean: [
    {
      strMeal: "Jamaican Jerk Chicken",
      strMealThumb:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Caribbean Curry Goat",
      strMealThumb:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Rice and Peas",
      strMealThumb:
        "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Fried Sweet Plantains",
      strMealThumb:
        "https://images.unsplash.com/photo-1621996346565-e3d5d6281318?auto=format&fit=crop&w=800&q=80",
    },
  ],
  "middle-eastern": [
    {
      strMeal: "Chicken Shawarma Plate",
      strMealThumb:
        "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Dolma Japrak Stuffed Vine Leaves",
      strMealThumb:
        "https://images.unsplash.com/photo-1541518763669-27fef04b14e8?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Traditional Shish Taouk",
      strMealThumb:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Baklava Sweet Pastry",
      strMealThumb:
        "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80",
    },
  ],
  brazilian: [
    {
      strMeal: "Feijoada Black Bean Stew",
      strMealThumb:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Pão de Queijo (Cheese Bread)",
      strMealThumb:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Coxinha Chicken Croquettes",
      strMealThumb:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Brigadeiro Chocolate Truffles",
      strMealThumb:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    },
  ],
  german: [
    {
      strMeal: "German Sauerbraten",
      strMealThumb:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Crispy Pork Schnitzel",
      strMealThumb:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Bavarian Soft Pretzel",
      strMealThumb:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "German Apple Strudel",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/c0gmo31585564009.jpg",
    },
  ],
  other: [
    {
      strMeal: "Chef's Fusion Bowl",
      strMealThumb:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Global Gourmet Platter",
      strMealThumb:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    },
    {
      strMeal: "Artisanal Market Salad",
      strMealThumb:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

// Get recipe of the day using DISH_REGISTRY single source of truth
export async function getRecipeOfTheDay() {
  try {
    const indianDishes = DISH_REGISTRY["indian"] || [];
    const featured = indianDishes.find((d) => d.name === "Butter Chicken") || indianDishes[0];

    if (featured) {
      return {
        success: true,
        recipe: {
          idMeal: "52772",
          strMeal: featured.name,
          strMealThumb: featured.image,
          strCategory: featured.category || "Main Course",
          strArea: "Indian",
          strInstructions: featured.desc || "Slow-cooked authentic butter chicken simmered in a rich tomato and butter gravy.",
          strTags: "Indian,Curry,Special",
        },
      };
    }

    const response = await fetch(`${MEALDB_BASE}/random.php`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipe of the day");
    }

    const data = await response.json();
    return {
      success: true,
      recipe: data.meals[0],
    };
  } catch (error) {
    console.error("Error fetching recipe of the day:", error);
    throw new Error(error.message || "Failed to load recipe");
  }
}

// Get all categories
export async function getCategories() {
  try {
    const response = await fetch(`${MEALDB_BASE}/list.php?c=list`, {
      next: { revalidate: 604800 }, // Cache for 1 week
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return {
      success: true,
      categories: data.meals || [],
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error.message || "Failed to load categories");
  }
}

// Get all areas/cuisines
export async function getAreas() {
  try {
    const response = await fetch(`${MEALDB_BASE}/list.php?a=list`, {
      next: { revalidate: 604800 }, // Cache for 1 week
    });

    if (!response.ok) {
      throw new Error("Failed to fetch areas");
    }

    const data = await response.json();
    return {
      success: true,
      areas: data.meals || [],
    };
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw new Error(error.message || "Failed to load areas");
  }
}

// Get meals by category
export async function getMealsByCategory(category) {
  try {
    const response = await fetch(`${MEALDB_BASE}/filter.php?c=${category}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }

    const data = await response.json();
    return {
      success: true,
      meals: data.meals || [],
      category,
    };
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    throw new Error(error.message || "Failed to load meals");
  }
}

// Get meals by area
export async function getMealsByArea(area) {
  try {
    const rawArea = (area || "").trim().toLowerCase();

    // Get registry dishes from comprehensive dataset with 100% exact dish-to-image mapping
    const registryMeals = getDishesByCuisine(rawArea);

    return {
      success: true,
      meals: registryMeals,
      area: area,
    };
  } catch (error) {
    console.error("Error fetching meals by area:", error);
    return {
      success: true,
      meals: getDishesByCuisine(area),
      area,
    };
  }
}
