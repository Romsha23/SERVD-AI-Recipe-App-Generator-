import json
import os

# Complete Dataset definition matching the user's reference image for Indian Cuisine
CUISINE_DATASETS = {
  "indian": [
    {"name": "Chole Bhature", "region": "North Indian", "category": "Street Food", "desc": "Spicy chickpea curry paired with fluffy deep-fried bhatura bread.", "image": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80"},
    {"name": "Butter Chicken", "region": "North Indian", "category": "Main Course", "desc": "Tender chicken cooked in a rich, velvety tomato and butter gravy.", "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"},
    {"name": "Chicken Tikka", "region": "North Indian", "category": "Appetizer", "desc": "Marinated chicken chunks grilled to smoky perfection in a tandoor.", "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"},
    {"name": "Chicken Tikka Masala", "region": "North Indian", "category": "Main Course", "desc": "Roasted chicken chunks in a spicy, creamy tomato sauce.", "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"},
    {"name": "Tandoori Chicken", "region": "North Indian", "category": "Main Course", "desc": "Whole roasted chicken marinated in yogurt and aromatic tandoori spices.", "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80"},
    {"name": "Dal Makhani", "region": "North Indian", "category": "Main Course", "desc": "Slow-cooked black lentils and kidney beans simmered with cream and butter.", "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"},
    {"name": "Rajma Chawal", "region": "North Indian", "category": "Main Course", "desc": "Hearty red kidney bean curry served alongside steamed basmati rice.", "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"},
    {"name": "Aloo Gobi", "region": "North Indian", "category": "Main Course", "desc": "Spiced dry curry made with potatoes and cauliflower florets.", "image": "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=800&q=80"},
    {"name": "Palak Paneer", "region": "North Indian", "category": "Main Course", "desc": "Fresh cottage cheese cubes in a smooth, spiced spinach gravy.", "image": "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=800&q=80"},
    {"name": "Paneer Butter Masala", "region": "North Indian", "category": "Main Course", "desc": "Soft paneer cubes in a mildly sweet, rich tomato butter gravy.", "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"},
    {"name": "Masala Dosa", "region": "South Indian", "category": "Main Course", "desc": "Crispy fermented crepe filled with spiced potato masala, served with chutneys.", "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"},
    {"name": "Idli Sambar", "region": "South Indian", "category": "Breakfast", "desc": "Steamed rice-lentil cakes served with hot lentil vegetable stew.", "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"},
    {"name": "Vada Sambar", "region": "South Indian", "category": "Breakfast", "desc": "Crispy lentil donut fritters served with coconut chutney and sambar.", "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"},
    {"name": "Hyderabadi Biryani", "region": "Hyderabadi", "category": "Main Course", "desc": "Layers of marinated meat and saffron rice dum-cooked to perfection.", "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"},
    {"name": "Pav Bhaji", "region": "Maharashtrian", "category": "Street Food", "desc": "Thick vegetable curry cooked on a tawa and served with buttered pav buns.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Misal Pav", "region": "Maharashtrian", "category": "Street Food", "desc": "Spicy sprouted moth bean curry topped with farsan and onions, served with pav.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Sarson da Saag", "region": "Punjabi", "category": "Main Course", "desc": "Traditional mustard greens dish cooked slow with garlic and white butter.", "image": "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=800&q=80"},
    {"name": "Makki di Roti", "region": "Punjabi", "category": "Bread", "desc": "Cornmeal flatbread baked on a tawa, traditionally served with saag.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Dhokla", "region": "Gujarati", "category": "Snack", "desc": "Steamed fermented rice and chickpea batter cake tempered with mustard seeds.", "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"},
    {"name": "Thepla", "region": "Gujarati", "category": "Bread", "desc": "Spiced flatbread made from whole wheat flour and fresh fenugreek leaves.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Gulab Jamun", "region": "Dessert", "category": "Dessert", "desc": "Fried milk solid dumplings soaked in rose-cardamom sugar syrup.", "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"},
    {"name": "Rasmalai", "region": "Dessert", "category": "Dessert", "desc": "Soft paneer discs soaked in chilled saffron and pistachio milk.", "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"},
    {"name": "Jalebi", "region": "Dessert", "category": "Dessert", "desc": "Deep-fried spiral batter soaked in saffron sugar syrup.", "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"},
    {"name": "Kheer", "region": "Dessert", "category": "Dessert", "desc": "Traditional creamy rice pudding cooked with cardamom and nuts.", "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"},
    {"name": "Pani Puri", "region": "Street Food", "category": "Street Food", "desc": "Hollow crispy puri filled with potato, chickpeas, and spiced mint water.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Samosa", "region": "Street Food", "category": "Street Food", "desc": "Fried pastry filled with spiced potato and pea mixture.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Bhel Puri", "region": "Street Food", "category": "Street Food", "desc": "Savory snack made of puffed rice, vegetables and a tangy tamarind sauce.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Dabeli", "region": "Street Food", "category": "Street Food", "desc": "Spiced potato mixture inside a burger bun topped with pomegranate seeds.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Chana Masala", "region": "North Indian", "category": "Main Course", "desc": "Tangy and pungent chickpea curry cooked with powdered spices.", "image": "https://images.unsplash.com/photo-1588877681476-368ee76af615?auto=format&fit=crop&w=800&q=80"},
    {"name": "Naan", "region": "North Indian", "category": "Bread", "desc": "Pillowy tandoor-baked flatbread brushed with melted butter.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"}
  ],

  "american": [
    {"name": "Classic Cheeseburger", "region": "Classic American", "category": "Main Course", "desc": "Juicy beef patty topped with melted cheddar, lettuce, tomato, and pickles on a brioche bun.", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"},
    {"name": "Hot Dog", "region": "Classic American", "category": "Street Food", "desc": "Grilled frankfurter in a sliced bun topped with mustard and relish.", "image": "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80"},
    {"name": "Macaroni and Cheese", "region": "Classic American", "category": "Main Course", "desc": "Elbow macaroni baked in a rich and creamy cheddar cheese sauce.", "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80"},
    {"name": "Southern Fried Chicken", "region": "Southern", "category": "Main Course", "desc": "Crispy, buttermilk-marinated fried chicken seasoned with Southern herbs.", "image": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80"},
    {"name": "Buffalo Chicken Wings", "region": "Classic American", "category": "Appetizer", "desc": "Crispy wings tossed in spicy cayenne pepper sauce, served with blue cheese dip.", "image": "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80"},
    {"name": "Texas Smoked Brisket", "region": "Texas BBQ", "category": "Main Course", "desc": "Slow-smoked beef brisket with a crunchy peppered bark and smoky flavor.", "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"},
    {"name": "American Apple Pie", "region": "American Desserts", "category": "Dessert", "desc": "Classic double-crust pie baked with cinnamon-spiced fresh apples.", "image": "https://www.themealdb.com/images/media/meals/stnxzp1784835840.jpg"},
    {"name": "New York Cheesecake", "region": "American Desserts", "category": "Dessert", "desc": "Dense, rich and ultra-creamy cheesecake on a graham cracker crust.", "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"},
    {"name": "Fudge Brownies", "region": "American Desserts", "category": "Dessert", "desc": "Rich, chocolatey baked square dessert with a fudgy center.", "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"}
  ],

  "german": [
    {"name": "Bratwurst", "region": "German", "category": "Street Food", "desc": "Grilled German pork sausage served in a crusty roll with mustard.", "image": "https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=800&q=80"},
    {"name": "Crispy Pork Schnitzel", "region": "German", "category": "Main Course", "desc": "Tenderized pork cutlet pounded thin, breaded, and pan-fried golden.", "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"},
    {"name": "Bavarian Soft Pretzel", "region": "Bavarian", "category": "Snack", "desc": "Freshly baked twisted knot pretzel sprinkled with coarse sea salt.", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"},
    {"name": "German Apple Strudel", "region": "German", "category": "Dessert", "desc": "Warm flaky pastry filled with spiced apples, raisins, and cinnamon.", "image": "https://www.themealdb.com/images/media/meals/c0gmo31585564009.jpg"}
  ],

  "mediterranean": [
    {"name": "Greek Moussaka", "region": "Greek", "category": "Main Course", "desc": "Layered casserole of eggplant, spiced minced meat, and creamy béchamel.", "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"},
    {"name": "Traditional Gyros", "region": "Greek", "category": "Street Food", "desc": "Pita wrap stuffed with seasoned sliced meat, tzatziki, tomatoes, and fries.", "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80"},
    {"name": "Greek Salad", "region": "Greek", "category": "Salad", "desc": "Crisp cucumbers, ripe tomatoes, red onions, kalamata olives, and block feta cheese.", "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"},
    {"name": "Pizza Margherita", "region": "Italian", "category": "Main Course", "desc": "Neapolitan pizza topped with San Marzano tomatoes, fresh mozzarella, and basil.", "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"},
    {"name": "Spaghetti Carbonara", "region": "Italian", "category": "Main Course", "desc": "Classic Roman pasta tossed with guanciale, egg yolks, Pecorino Romano, and black pepper.", "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281318?auto=format&fit=crop&w=800&q=80"},
    {"name": "Seafood Paella", "region": "Spanish", "category": "Main Course", "desc": "Saffron-infused rice cooked in a wide pan with shrimp, mussels, and squid.", "image": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80"}
  ],

  "french": [
    {"name": "French Baguette", "region": "French", "category": "Bread", "desc": "Crusty long loaf of French bread with a soft airy interior.", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"},
    {"name": "Croissant", "region": "French", "category": "Breakfast", "desc": "Buttery, flaky, laminated viennoiserie pastry baked golden.", "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"},
    {"name": "Ratatouille", "region": "French", "category": "Main Course", "desc": "Provençal stewed vegetable dish featuring zucchini, eggplant, bell peppers, and tomatoes.", "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"},
    {"name": "Crème Brûlée", "region": "French", "category": "Dessert", "desc": "Rich vanilla custard base topped with a layer of hardened caramelized sugar.", "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"},
    {"name": "Macarons", "region": "French", "category": "Dessert", "desc": "Delicate almond meringue cookies sandwiched with buttercream or ganache.", "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80"}
  ],

  "korean": [
    {"name": "Bibimbap", "region": "Korean", "category": "Main Course", "desc": "Warm rice topped with sautéed vegetables, gochujang, sliced beef, and a fried egg.", "image": "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80"},
    {"name": "Korean Fried Chicken", "region": "Korean", "category": "Main Course", "desc": "Ultra-crispy double-fried chicken coated in sweet and spicy garlic glaze.", "image": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80"},
    {"name": "Tteokbokki", "region": "Korean", "category": "Street Food", "desc": "Chewy rice cakes simmered in a sweet and spicy gochujang sauce.", "image": "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80"}
  ],

  "brazilian": [
    {"name": "Feijoada", "region": "Brazilian", "category": "Main Course", "desc": "Black bean stew cooked with pork cuts, served with rice, farofa, and orange slices.", "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"},
    {"name": "Pão de Queijo", "region": "Brazilian", "category": "Snack", "desc": "Chewy, golden cheese bread rolls made with tapioca flour.", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"}
  ],

  "caribbean": [
    {"name": "Jamaican Jerk Chicken", "region": "Jamaican", "category": "Main Course", "desc": "Smoky grilled chicken marinated in scotch bonnet peppers and pimento spices.", "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80"}
  ],

  "middle-eastern": [
    {"name": "Hummus & Pita", "region": "Lebanese", "category": "Appetizer", "desc": "Smooth chickpea dip blended with tahini, lemon juice, garlic, and olive oil.", "image": "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80"},
    {"name": "Chicken Shawarma", "region": "Lebanese", "category": "Street Food", "desc": "Spiced sliced chicken wrapped in flatbread with garlic toum sauce.", "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80"}
  ],

  "other": [
    {"name": "Sushi Platter", "region": "Japanese", "category": "Main Course", "desc": "Assorted nigiri and maki rolls made with vinegared rice and fresh raw fish.", "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"},
    {"name": "Tonkotsu Ramen", "region": "Japanese", "category": "Main Course", "desc": "Rich pork bone broth served with ramen noodles, chashu pork, and soft-boiled egg.", "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"},
    {"name": "Pad Thai", "region": "Thai", "category": "Main Course", "desc": "Stir-fried rice noodles with eggs, tofu, shrimp, peanuts, and tamarind sauce.", "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80"},
    {"name": "Vietnamese Pho", "region": "Vietnamese", "category": "Main Course", "desc": "Fragrant beef bone broth soup served with rice noodles and fresh herbs.", "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80"},
    {"name": "Street Tacos", "region": "Mexican", "category": "Street Food", "desc": "Corn tortillas filled with grilled carne asada, onions, cilantro, and fresh salsa.", "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80"}
  ]
}

js_content = """// Centralized Dish Registry for all 22 cuisines
export const DISH_REGISTRY = """ + json.dumps(CUISINE_DATASETS, indent=2) + """;

export function getDishesByCuisine(cuisineSlug) {
  const slug = (cuisineSlug || "").trim().toLowerCase();
  const list = DISH_REGISTRY[slug] || DISH_REGISTRY["other"] || [];
  return list.map((dish, index) => ({
    id: `${slug}-${index}-${dish.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    strMeal: dish.name,
    strMealThumb: dish.image,
    category: dish.category,
    region: dish.region,
    description: dish.desc,
  }));
}
"""

with open("d:/SERVD/frontend/lib/dishRegistry.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("OK")
