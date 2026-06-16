// Everbite Meal Intelligence Engine v2
// Ingredient-first, cuisine-aware, fully personalized

export interface Meal {
  name: string;
  ingredients: string[];
  instructions: string;
  prepTime: string;
  cost: number;
  servings: number;
  calories: number;
  protein: string;
  tags: string[];
  cuisine: string;
}

export interface WeekDay {
  day: string;
  breakfast: { name: string; ingredients: string[]; instructions: string };
  lunch: { name: string; ingredients: string[]; instructions: string };
  dinner: { name: string; ingredients: string[]; instructions: string };
}

export interface GroceryItem {
  item: string;
  estimatedCost: number;
  priority: 'essential' | 'optional';
  stores?: string[];
}

export interface MealPlan {
  meals: Meal[];
  groceryList: GroceryItem[];
  totalEstimatedCost: number;
  nutritionSummary: { calories: number; protein: string; carbs: string; fat: string; fiber: string };
  budgetNote: string;
  weeklyPlan: WeekDay[];
  cuisine: string;
}

// ─── CUISINE DATABASES ────────────────────────────────────────────────────────

// Nigerian cuisine meals
const nigerianMeals: Record<string, Meal[]> = {
  rice: [
    {
      name: 'Jollof Rice',
      cuisine: 'nigerian',
      ingredients: ['rice', 'tomatoes or tomato paste', 'onion', 'red pepper', 'oil', 'bouillon cube', 'salt', 'curry powder', 'thyme'],
      instructions: `1. Blend tomatoes, red pepper, and half the onion into a smooth paste.\n2. Heat oil in a pot over medium-high heat. Fry the remaining sliced onion until golden.\n3. Add the blended tomato mixture and fry, stirring constantly, for 15–20 minutes until the raw smell disappears and oil floats on top.\n4. Add bouillon cube, curry, thyme, and salt. Stir well.\n5. Add washed rice and stir to coat every grain in the tomato base.\n6. Add enough water to cover rice by 1 inch. Cover pot tightly.\n7. Cook on low heat for 20–25 minutes. Check every 10 min, adding small amounts of water if needed.\n8. When rice is soft and water absorbed, stir from the bottom and serve hot.`,
      prepTime: '45 min',
      cost: 2.50,
      servings: 4,
      calories: 420,
      protein: '8g',
      tags: ['nigerian-classic', 'filling', 'vegan'],
    },
    {
      name: 'White Rice with Stew',
      cuisine: 'nigerian',
      ingredients: ['rice', 'tomatoes', 'onion', 'oil', 'pepper', 'salt', 'bouillon'],
      instructions: `1. Rinse rice thoroughly until water runs clear.\n2. Cook rice in salted water: bring to boil, reduce heat, cover and cook 18 min.\n3. For stew: blend tomatoes, pepper, and onion.\n4. Heat oil in separate pot. Add blended tomato mixture.\n5. Fry stew for 20 min until oil rises and colour deepens to dark red.\n6. Season with bouillon, salt, and pepper. Simmer 10 more minutes.\n7. Serve rice with stew poured over or alongside.`,
      prepTime: '40 min',
      cost: 1.80,
      servings: 4,
      calories: 380,
      protein: '6g',
      tags: ['nigerian-classic', 'filling', 'vegan'],
    },
  ],
  beans: [
    {
      name: 'Ewa Agoyin (Mashed Beans)',
      cuisine: 'nigerian',
      ingredients: ['beans (black-eyed peas or honey beans)', 'onion', 'palm oil or vegetable oil', 'dried pepper', 'crayfish (optional)', 'salt'],
      instructions: `1. Sort and wash beans. Soak overnight for faster cooking (optional).\n2. Boil beans with plenty of water for 60–90 min until very soft and mashable. Add salt last 10 min.\n3. Drain excess water. Mash beans roughly with a spoon — not completely smooth, leave some texture.\n4. For agoyin sauce: heat palm oil until hot. Add dried blended pepper and fry 5 min.\n5. Add sliced onion and crayfish to sauce. Fry 10 more min until onion softens.\n6. Pour sauce over mashed beans. Mix or serve as topping.\n7. Serve with soft white bread or agege bread for authentic experience.`,
      prepTime: '90 min',
      cost: 1.20,
      servings: 4,
      calories: 320,
      protein: '18g',
      tags: ['nigerian-classic', 'high-protein', 'vegan', 'street-food'],
    },
    {
      name: 'Beans and Plantain (Ewa ati Dodo)',
      cuisine: 'nigerian',
      ingredients: ['beans', 'ripe plantain', 'onion', 'oil', 'pepper', 'salt', 'bouillon'],
      instructions: `1. Cook beans until soft (about 60–70 min). Season with salt and bouillon.\n2. Peel ripe plantain and slice diagonally into 1cm thick pieces.\n3. Heat oil in frying pan. Fry plantain slices on medium heat, 3–4 min each side until golden-brown.\n4. Serve fried plantain alongside or on top of seasoned beans.\n5. Optional: add fried egg on top for a complete protein meal.`,
      prepTime: '80 min',
      cost: 1.80,
      servings: 3,
      calories: 480,
      protein: '16g',
      tags: ['nigerian-classic', 'filling', 'vegan'],
    },
  ],
  eggs: [
    {
      name: 'Nigerian Egg Stew',
      cuisine: 'nigerian',
      ingredients: ['eggs', 'tomatoes', 'onion', 'red pepper', 'oil', 'salt', 'bouillon cube'],
      instructions: `1. Blend tomatoes, red pepper, and onion into paste.\n2. Heat oil in pan. Fry blended mixture 15 min until thick and oil floats on top.\n3. Add bouillon and salt. Taste and adjust.\n4. Beat eggs in a bowl. Pour eggs into the hot stew.\n5. Stir gently as eggs cook into the stew — do not scramble completely. Let some pieces set.\n6. Cook 3–5 min until eggs are fully set.\n7. Serve with rice, yam, or bread.`,
      prepTime: '25 min',
      cost: 1.20,
      servings: 2,
      calories: 260,
      protein: '14g',
      tags: ['nigerian', 'quick', 'vegetarian'],
    },
  ],
  yam: [
    {
      name: 'Boiled Yam with Egg Sauce',
      cuisine: 'nigerian',
      ingredients: ['yam', 'eggs', 'tomatoes', 'onion', 'oil', 'pepper', 'salt'],
      instructions: `1. Peel yam and cut into thick chunks (3–4 cm). Rinse well.\n2. Boil yam in salted water 20–25 min until a fork goes through easily.\n3. Drain and set aside.\n4. Blend or chop tomatoes, pepper, and onion.\n5. Heat oil in pan. Fry tomato mixture 10–12 min until thick.\n6. Beat eggs and pour into stew. Stir gently and cook 3–4 min.\n7. Serve boiled yam with egg sauce on the side.`,
      prepTime: '35 min',
      cost: 1.50,
      servings: 2,
      calories: 380,
      protein: '12g',
      tags: ['nigerian-classic', 'filling', 'vegetarian'],
    },
    {
      name: 'Yam Pottage (Asaro)',
      cuisine: 'nigerian',
      ingredients: ['yam', 'palm oil or vegetable oil', 'onion', 'tomatoes', 'pepper', 'crayfish (optional)', 'spinach or uziza leaves (optional)', 'salt', 'bouillon'],
      instructions: `1. Peel and cube yam into medium pieces. Rinse.\n2. Put yam in pot with water (just enough to cover). Bring to boil.\n3. After 10 min, add palm oil, blended tomato-pepper-onion mixture, bouillon, and crayfish.\n4. Cover and cook 15–20 more min, stirring occasionally.\n5. When yam is very soft, mash some pieces with a wooden spoon to thicken the pottage.\n6. Add leafy greens if available. Cook 3 more min.\n7. The final texture should be thick and porridge-like. Serve hot.`,
      prepTime: '40 min',
      cost: 1.80,
      servings: 3,
      calories: 410,
      protein: '8g',
      tags: ['nigerian-classic', 'filling', 'vegan'],
    },
  ],
  plantain: [
    {
      name: 'Dodo (Fried Ripe Plantain)',
      cuisine: 'nigerian',
      ingredients: ['ripe plantain', 'oil', 'salt (optional)'],
      instructions: `1. Choose very ripe plantain — skin should be mostly black/yellow. The riper the sweeter.\n2. Peel and slice diagonally at angle, 1cm thick.\n3. Heat oil in frying pan — enough oil to come halfway up plantain slices.\n4. Fry on medium heat 3–4 min per side until golden-brown and caramelized.\n5. Drain on paper towel or cloth.\n6. Serve as side dish with rice, beans, or as a snack.`,
      prepTime: '15 min',
      cost: 0.80,
      servings: 2,
      calories: 220,
      protein: '2g',
      tags: ['nigerian-classic', 'quick', 'vegan', 'street-food'],
    },
    {
      name: 'Boli (Roasted Plantain)',
      cuisine: 'nigerian',
      ingredients: ['unripe or semi-ripe plantain', 'groundnut (peanuts) for serving'],
      instructions: `1. Do NOT peel plantain.\n2. Place whole plantain directly on gas flame or a hot dry pan/grill.\n3. Turn every 3–4 minutes until all sides are charred black and inside is soft (about 15–20 min total).\n4. Peel off the charred skin carefully — the inside is soft, sweet, and smoky.\n5. Serve with roasted peanuts (groundnut) — a classic Nigerian street food combination.`,
      prepTime: '20 min',
      cost: 0.60,
      servings: 1,
      calories: 200,
      protein: '3g',
      tags: ['nigerian', 'street-food', 'vegan', 'no-cook'],
    },
  ],
  tomatoes: [
    {
      name: 'Nigerian Tomato Stew Base',
      cuisine: 'nigerian',
      ingredients: ['tomatoes', 'red bell pepper', 'scotch bonnet or habanero', 'onion', 'oil', 'bouillon cube', 'salt', 'curry', 'thyme'],
      instructions: `1. Blend tomatoes, peppers, and half the onion until smooth.\n2. Heat oil in heavy pot on medium-high. Slice remaining onion and fry 3 min.\n3. Pour in blended tomato mixture. It will spatter — be careful.\n4. Fry on medium-high heat stirring frequently for 20–30 min.\n5. Stew is ready when oil floats on top and colour deepens from red to dark brownish-red.\n6. Add bouillon, curry, thyme, salt. Stir and taste.\n7. Use as base for jollof rice, egg stew, meat stew, or fish stew.`,
      prepTime: '35 min',
      cost: 1.20,
      servings: 6,
      calories: 90,
      protein: '2g',
      tags: ['nigerian-base', 'vegan', 'versatile'],
    },
  ],
  chicken: [
    {
      name: 'Nigerian Peppered Chicken',
      cuisine: 'nigerian',
      ingredients: ['chicken', 'onion', 'scotch bonnet or habanero pepper', 'garlic', 'ginger', 'bouillon cube', 'curry powder', 'thyme', 'salt', 'oil'],
      instructions: `1. Cut chicken into pieces. Season with crushed garlic, grated ginger, bouillon, curry, thyme, and salt.\n2. Marinate 30 min (overnight if possible).\n3. Add seasoned chicken to pot with sliced onion and small amount of water. Cook on medium 20–25 min until done.\n4. Remove chicken. Reserve stock.\n5. Heat oil in pan. Fry boiled chicken 5–7 min until browned and slightly crispy.\n6. Blend peppers and onion. Fry in the same pan 10 min.\n7. Return chicken to pepper sauce. Coat well. Simmer 5 min.\n8. Serve with jollof rice, fried plantain, or white rice.`,
      prepTime: '60 min',
      cost: 4.50,
      servings: 4,
      calories: 380,
      protein: '32g',
      tags: ['nigerian-classic', 'high-protein', 'special-occasion'],
    },
  ],
};

// Mexican cuisine meals
const mexicanMeals: Record<string, Meal[]> = {
  beans: [
    {
      name: 'Frijoles de la Olla',
      cuisine: 'mexican',
      ingredients: ['pinto or black beans', 'onion', 'garlic', 'salt', 'oil or lard', 'cilantro (optional)'],
      instructions: `1. Sort and rinse beans. No soaking needed but soak 8 hrs to speed cooking.\n2. Place beans in pot with quartered onion, whole garlic cloves, and water to cover by 3 inches.\n3. Bring to boil, skim foam, then reduce to gentle simmer.\n4. Cook 1.5–2 hrs until beans are completely soft and creamy inside.\n5. Salt beans ONLY when fully cooked — salt early makes them tough.\n6. Add cilantro last 5 min.\n7. Serve in broth as soup, or drain and use for tacos, burritos, or side dish.`,
      prepTime: '2 hrs',
      cost: 0.90,
      servings: 6,
      calories: 220,
      protein: '14g',
      tags: ['mexican-classic', 'vegan', 'high-protein'],
    },
  ],
  rice: [
    {
      name: 'Arroz Rojo (Mexican Red Rice)',
      cuisine: 'mexican',
      ingredients: ['rice', 'tomato', 'onion', 'garlic', 'oil', 'chicken or vegetable broth or water', 'salt', 'cumin'],
      instructions: `1. Blend tomato, quarter onion, and 2 garlic cloves into smooth puree. Set aside.\n2. Heat oil in heavy pan over medium-high. Add dry rice and toast, stirring constantly, 5–7 min until golden.\n3. Add tomato puree and stir. It will steam and spatter — stir quickly.\n4. Add broth (1.5 cups per cup of rice), cumin, and salt.\n5. Bring to boil, then cover tightly and reduce to lowest heat.\n6. Cook 18–20 min without lifting lid.\n7. Let rest 5 min, then fluff with fork and serve.`,
      prepTime: '35 min',
      cost: 0.80,
      servings: 4,
      calories: 250,
      protein: '5g',
      tags: ['mexican-classic', 'vegan', 'side-dish'],
    },
  ],
  eggs: [
    {
      name: 'Huevos Rancheros',
      cuisine: 'mexican',
      ingredients: ['eggs', 'tomatoes', 'onion', 'jalapeño or chili', 'garlic', 'oil', 'tortillas or bread', 'salt', 'cumin'],
      instructions: `1. Make ranchero sauce: blend tomatoes, onion, jalapeño, and garlic.\n2. Heat oil in pan. Pour in blended sauce. Cook 8–10 min until thickened. Season with cumin and salt.\n3. Warm tortillas in a dry pan or microwave.\n4. In a separate pan, fry eggs sunny-side-up in oil. Do not break yolks.\n5. Place tortilla on plate, spoon ranchero sauce over, top with fried egg.\n6. Optional: add avocado, beans, or cheese on top.`,
      prepTime: '25 min',
      cost: 1.20,
      servings: 2,
      calories: 320,
      protein: '14g',
      tags: ['mexican-classic', 'breakfast', 'vegetarian'],
    },
  ],
};

// Indian cuisine meals
const indianMeals: Record<string, Meal[]> = {
  rice: [
    {
      name: 'Vegetable Biryani',
      cuisine: 'indian',
      ingredients: ['rice (basmati preferred)', 'onion', 'tomato', 'garlic', 'ginger', 'oil', 'cumin seeds', 'turmeric', 'garam masala', 'salt', 'any vegetables available'],
      instructions: `1. Rinse rice until water runs clear. Soak 20 min, drain.\n2. Par-cook rice in boiling salted water for 7 min — it should be 70% cooked. Drain and set aside.\n3. Heat oil in large pot. Add cumin seeds and let sizzle 30 sec.\n4. Add sliced onion. Fry on medium heat 12–15 min until deep golden-brown. This step is key.\n5. Add garlic and ginger paste. Cook 2 min.\n6. Add tomatoes and cook until soft, 8 min.\n7. Add turmeric, garam masala, salt. Cook 2 min.\n8. Add any available vegetables. Mix well.\n9. Layer par-cooked rice on top. Do not stir.\n10. Cover tightly. Cook on very low heat 20 min (dum method).\n11. Gently fold together before serving.`,
      prepTime: '60 min',
      cost: 1.80,
      servings: 4,
      calories: 380,
      protein: '8g',
      tags: ['indian-classic', 'filling', 'vegan'],
    },
  ],
  beans: [
    {
      name: 'Dal Tadka (Spiced Lentils)',
      cuisine: 'indian',
      ingredients: ['lentils or split peas', 'onion', 'tomato', 'garlic', 'ginger', 'oil', 'cumin seeds', 'turmeric', 'coriander powder', 'salt', 'chili (optional)'],
      instructions: `1. Rinse lentils thoroughly. Boil in 3 cups water with turmeric and salt for 20–25 min until completely soft. Mash lightly.\n2. For tadka (tempering): heat oil in small pan until very hot.\n3. Add cumin seeds — they should sizzle and pop immediately.\n4. Add minced garlic and ginger. Cook 1 min until golden.\n5. Add chopped onion. Fry 5 min.\n6. Add tomato and cook until soft, 5 min.\n7. Add coriander powder and chili. Stir 1 min.\n8. Pour this hot tadka over lentils. Stir together.\n9. Serve with rice or bread. This is the backbone of affordable Indian cooking.`,
      prepTime: '35 min',
      cost: 0.80,
      servings: 4,
      calories: 240,
      protein: '15g',
      tags: ['indian-classic', 'vegan', 'high-protein', 'budget'],
    },
  ],
  eggs: [
    {
      name: 'Egg Curry',
      cuisine: 'indian',
      ingredients: ['eggs', 'onion', 'tomato', 'garlic', 'ginger', 'oil', 'turmeric', 'cumin', 'garam masala', 'salt', 'chili powder'],
      instructions: `1. Hard boil eggs for 10 min. Cool in cold water, peel.\n2. Score the eggs with 3–4 shallow cuts so curry penetrates them.\n3. Heat oil in pan. Fry sliced onion 12 min until deep golden-brown.\n4. Add minced garlic and ginger. Cook 2 min.\n5. Add blended or chopped tomatoes. Cook 8–10 min until oil separates.\n6. Add turmeric, cumin, chili powder, garam masala, salt. Cook 2 min.\n7. Add water to make a sauce (about 1 cup). Bring to simmer.\n8. Add boiled eggs. Simmer 8 min so eggs absorb curry flavor.\n9. Serve with rice or bread.`,
      prepTime: '40 min',
      cost: 1.20,
      servings: 2,
      calories: 280,
      protein: '16g',
      tags: ['indian-classic', 'vegetarian', 'high-protein'],
    },
  ],
};

// Chinese cuisine meals
const chineseMeals: Record<string, Meal[]> = {
  rice: [
    {
      name: 'Egg Fried Rice',
      cuisine: 'chinese',
      ingredients: ['rice (day-old preferred)', 'eggs', 'soy sauce', 'oil', 'garlic', 'green onion (optional)', 'salt', 'any vegetables available'],
      instructions: `1. Use cold, day-old cooked rice — fresh rice makes it mushy. If using fresh, spread on plate and refrigerate 1 hr.\n2. Beat eggs with pinch of salt.\n3. Heat wok or pan on HIGH heat until almost smoking.\n4. Add oil, swirl to coat. Pour in eggs — scramble quickly, 30 seconds. Remove from pan.\n5. Add more oil. Add garlic and any vegetables. Stir-fry 2 min on high heat.\n6. Add rice. Press down and let sit 1–2 min so it crisps on bottom.\n7. Stir and repeat — keep heat high the whole time.\n8. Add soy sauce around edge of pan (not directly on rice).\n9. Return eggs, add green onion. Toss everything together 1 min.\n10. Serve immediately — heat is critical for wok hei flavor.`,
      prepTime: '15 min',
      cost: 0.80,
      servings: 2,
      calories: 380,
      protein: '14g',
      tags: ['chinese-classic', 'quick', 'vegetarian'],
    },
  ],
  eggs: [
    {
      name: 'Tomato and Egg Stir-Fry (Xi Hong Shi Chao Ji Dan)',
      cuisine: 'chinese',
      ingredients: ['eggs', 'tomatoes', 'oil', 'salt', 'sugar', 'soy sauce', 'garlic (optional)'],
      instructions: `1. Beat eggs with pinch of salt. Cut tomatoes into wedges.\n2. Heat oil in pan on HIGH heat. Pour in eggs — scramble into large soft curds, about 60% cooked. Remove and set aside.\n3. Add more oil. Add garlic if using — 30 sec.\n4. Add tomatoes to hot pan. Stir-fry 2 min.\n5. Add salt, small pinch of sugar (this is the secret), soy sauce.\n6. Cook tomatoes until they release juice and become saucy, 3 min.\n7. Return eggs. Gently fold everything together — eggs should be soft, not rubbery.\n8. Serve over white rice. This is one of the most popular home-cooked dishes in China.`,
      prepTime: '15 min',
      cost: 0.90,
      servings: 2,
      calories: 230,
      protein: '12g',
      tags: ['chinese-classic', 'quick', 'vegetarian'],
    },
  ],
};

// Ethiopian cuisine meals
const ethiopianMeals: Record<string, Meal[]> = {
  beans: [
    {
      name: 'Misir Wat (Ethiopian Red Lentils)',
      cuisine: 'ethiopian',
      ingredients: ['red lentils', 'onion', 'garlic', 'ginger', 'berbere spice or chili + paprika', 'oil', 'tomato paste (optional)', 'salt'],
      instructions: `1. Finely dice onion. Fry in oil with NO stirring for 5–7 min until it caramelizes and sticks — this is called "dry frying" and gives depth.\n2. Add minced garlic and ginger. Stir 2 min.\n3. Add berbere spice (or mix of chili, paprika, cumin, coriander). Fry 2 min.\n4. Add rinsed red lentils and water (3 cups per cup of lentils).\n5. Bring to boil, then simmer 20–25 min stirring often until lentils break down into thick paste.\n6. Add salt to taste. Should be very thick, not soupy.\n7. Traditionally served on injera (fermented flatbread). Serve with bread or rice if injera unavailable.`,
      prepTime: '45 min',
      cost: 0.90,
      servings: 4,
      calories: 260,
      protein: '16g',
      tags: ['ethiopian-classic', 'vegan', 'high-protein'],
    },
  ],
};

// Caribbean cuisine meals
const caribbeanMeals: Record<string, Meal[]> = {
  rice: [
    {
      name: 'Rice and Peas (Jamaican)',
      cuisine: 'caribbean',
      ingredients: ['rice', 'kidney beans or pigeon peas', 'coconut milk', 'garlic', 'thyme', 'scallion', 'salt', 'black pepper'],
      instructions: `1. If using dried beans: soak overnight, then boil 1 hr until tender. Reserve the cooking liquid.\n2. Pour coconut milk into pot with bean liquid — enough to cook rice (2 cups liquid per cup rice).\n3. Add drained beans, garlic, thyme sprigs, whole scallion, salt, pepper.\n4. Bring to boil. Add washed rice.\n5. Stir once, cover tightly, reduce to lowest heat.\n6. Cook 20–25 min without lifting lid.\n7. Remove thyme stems and scallion before serving.\n8. Rice should be slightly firm and infused with coconut-bean flavor.`,
      prepTime: '35 min (plus bean soaking)',
      cost: 1.60,
      servings: 4,
      calories: 380,
      protein: '10g',
      tags: ['caribbean-classic', 'vegan', 'filling'],
    },
  ],
  plantain: [
    {
      name: 'Tostones (Twice-Fried Plantain)',
      cuisine: 'caribbean',
      ingredients: ['green unripe plantain', 'oil', 'salt', 'garlic (optional)'],
      instructions: `1. Use GREEN (unripe) plantain for tostones — yellow/black ones won't work correctly.\n2. Cut off ends, score skin lengthwise, peel off.\n3. Cut into 1-inch thick rounds.\n4. FIRST FRY: heat oil to medium. Fry rounds 3–4 min per side until lightly golden but not crispy.\n5. Remove and place on flat surface. Smash each piece flat with the bottom of a glass or flat plate.\n6. SECOND FRY: return flattened pieces to hot oil. Fry 2–3 min per side until golden and crispy.\n7. Drain, sprinkle with salt immediately.\n8. Optional: rub with garlic before second fry for garlic tostones.`,
      prepTime: '25 min',
      cost: 0.90,
      servings: 2,
      calories: 250,
      protein: '2g',
      tags: ['caribbean-classic', 'vegan', 'crispy'],
    },
  ],
};

// General / American cuisine meals
const generalMeals: Record<string, Meal[]> = {
  beans: [
    {
      name: 'Hearty Bean Soup',
      cuisine: 'american',
      ingredients: ['beans', 'water', 'salt', 'garlic', 'onion', 'bay leaf (optional)'],
      instructions: `1. Sort and rinse beans. If using dried, soak 8 hrs in cold water, drain.\n2. Place beans in pot. Cover with 3 inches of fresh water.\n3. Add quartered onion and whole garlic cloves.\n4. Bring to boil, skim foam, then reduce to simmer.\n5. Cook 1–1.5 hrs until beans are completely tender.\n6. Add salt, bay leaf, and any seasoning in the LAST 15 minutes.\n7. Mash a handful of beans and stir back in to thicken broth.\n8. Serve hot with bread.`,
      prepTime: '90 min',
      cost: 0.80,
      servings: 6,
      calories: 220,
      protein: '14g',
      tags: ['american', 'vegan', 'filling'],
    },
  ],
  rice: [
    {
      name: 'Seasoned Rice Bowl',
      cuisine: 'american',
      ingredients: ['rice', 'soy sauce or salt', 'oil', 'garlic', 'any protein available'],
      instructions: `1. Rinse rice. Cook with 2 cups water per cup rice: boil, then cover and simmer 18 min.\n2. Heat oil in pan. Add minced garlic, cook 1 min.\n3. Add cooked rice to pan. Toss with garlic oil.\n4. Season with soy sauce or salt.\n5. Top with whatever protein you have — eggs, beans, tuna.\n6. Add any available vegetables.`,
      prepTime: '30 min',
      cost: 0.50,
      servings: 2,
      calories: 280,
      protein: '5g',
      tags: ['quick', 'vegan', 'versatile'],
    },
  ],
  eggs: [
    {
      name: 'Scrambled Eggs',
      cuisine: 'american',
      ingredients: ['eggs', 'butter or oil', 'salt', 'pepper'],
      instructions: `1. Crack eggs into bowl. Beat with salt and pepper until yolks and whites are completely combined.\n2. Heat pan on MEDIUM-LOW heat — low heat is the secret to creamy eggs.\n3. Add butter or oil.\n4. Pour in eggs. Do not touch for 20 seconds.\n5. Using a spatula, gently push eggs from edges to center, letting liquid egg flow to edges.\n6. Remove from heat while still slightly underdone — residual heat finishes them.\n7. The eggs should be soft, creamy, and slightly glossy. Serve immediately.`,
      prepTime: '8 min',
      cost: 0.60,
      servings: 1,
      calories: 180,
      protein: '12g',
      tags: ['quick', 'vegetarian', 'high-protein'],
    },
  ],
  bread: [
    {
      name: 'French Toast',
      cuisine: 'american',
      ingredients: ['bread', 'eggs', 'milk or water', 'sugar', 'cinnamon', 'butter or oil'],
      instructions: `1. Beat 2 eggs with 3 tbsp milk, 1 tsp sugar, and 1/2 tsp cinnamon in wide bowl.\n2. Heat pan on medium heat. Add butter.\n3. Dip bread slice in egg mixture — let it soak 10 sec each side.\n4. Place soaked bread in pan. Cook 2–3 min until golden-brown underneath.\n5. Flip and cook other side 2 min.\n6. Serve with syrup, jam, or powdered sugar if available.`,
      prepTime: '15 min',
      cost: 0.50,
      servings: 2,
      calories: 240,
      protein: '9g',
      tags: ['breakfast', 'quick', 'vegetarian'],
    },
  ],
  'peanut butter': [
    {
      name: 'Peanut Butter Sandwich',
      cuisine: 'american',
      ingredients: ['peanut butter', 'bread'],
      instructions: `1. Lay two slices of bread on plate.\n2. Spread generous layer of peanut butter on one slice.\n3. Optional: add banana slices, honey, or jam on top of peanut butter.\n4. Press second slice on top.\n5. Cut diagonally for classic American sandwich presentation.`,
      prepTime: '3 min',
      cost: 0.40,
      servings: 1,
      calories: 340,
      protein: '12g',
      tags: ['no-cook', 'quick', 'portable', 'high-protein'],
    },
  ],
  oats: [
    {
      name: 'Classic Oatmeal',
      cuisine: 'american',
      ingredients: ['oats', 'water or milk', 'salt', 'sugar or honey', 'cinnamon (optional)'],
      instructions: `1. Bring 1 cup water (or milk) to boil with pinch of salt.\n2. Add 1/2 cup rolled oats. Reduce to simmer.\n3. Cook 3–5 min stirring frequently until oats absorb liquid and thicken.\n4. Remove from heat. Stir in sweetener and cinnamon.\n5. Let sit 1 min — oatmeal continues to thicken off heat.\n6. Add toppings: banana, peanut butter, nuts, berries, or brown sugar.`,
      prepTime: '10 min',
      cost: 0.25,
      servings: 1,
      calories: 180,
      protein: '6g',
      tags: ['breakfast', 'quick', 'vegan'],
    },
  ],
  pasta: [
    {
      name: 'Garlic Pasta',
      cuisine: 'american',
      ingredients: ['pasta', 'garlic', 'olive oil or butter', 'salt', 'pepper', 'parmesan (optional)'],
      instructions: `1. Bring large pot of water to boil. Add 1 tbsp salt — pasta water should taste like the sea.\n2. Cook pasta per package instructions until al dente. Reserve 1 cup pasta water before draining.\n3. While pasta cooks, heat oil on MEDIUM-LOW. Add minced garlic. Cook slowly 4–5 min until golden, NOT brown.\n4. Drain pasta. Add to garlic pan.\n5. Add splash of pasta water to create sauce. Toss vigorously.\n6. Season with black pepper and cheese if available.`,
      prepTime: '20 min',
      cost: 0.60,
      servings: 2,
      calories: 360,
      protein: '11g',
      tags: ['quick', 'vegetarian', 'filling'],
    },
  ],
  tuna: [
    {
      name: 'Tuna Sandwich',
      cuisine: 'american',
      ingredients: ['tuna (canned)', 'bread', 'mayo or oil', 'salt', 'pepper', 'onion (optional)'],
      instructions: `1. Drain canned tuna completely.\n2. Flake tuna into bowl with fork.\n3. Mix with 1–2 tbsp mayo. Add diced onion, salt, pepper.\n4. Taste and adjust seasoning.\n5. Spread generously on bread.\n6. Top with second slice. Serve as is or lightly toast the bread first.`,
      prepTime: '5 min',
      cost: 1.20,
      servings: 2,
      calories: 280,
      protein: '22g',
      tags: ['quick', 'high-protein', 'no-cook'],
    },
  ],
  potato: [
    {
      name: 'Pan-Fried Potatoes',
      cuisine: 'american',
      ingredients: ['potato', 'oil', 'salt', 'pepper', 'garlic powder', 'onion (optional)'],
      instructions: `1. Dice potatoes into 1cm cubes. No need to peel.\n2. Heat oil in pan on MEDIUM-HIGH until shimmering.\n3. Add potatoes in single layer — do not crowd.\n4. Do NOT stir for 4–5 min. Let bottom side get golden and crispy.\n5. Flip and repeat on other sides.\n6. Total cook time 20–25 min, flipping every 5 min.\n7. Season with salt, pepper, garlic powder at end.`,
      prepTime: '30 min',
      cost: 0.80,
      servings: 2,
      calories: 300,
      protein: '5g',
      tags: ['vegan', 'filling', 'gluten-free'],
    },
  ],
  bananas: [
    {
      name: 'Banana Oatmeal',
      cuisine: 'american',
      ingredients: ['oats', 'banana', 'milk or water', 'honey (optional)'],
      instructions: `1. Cook oatmeal: boil liquid, add oats, simmer 3–5 min.\n2. Slice banana.\n3. Top oatmeal with banana slices.\n4. Mash some banana INTO the oatmeal for natural sweetness — no sugar needed.\n5. Drizzle honey if available.`,
      prepTime: '10 min',
      cost: 0.45,
      servings: 1,
      calories: 280,
      protein: '7g',
      tags: ['breakfast', 'vegan', 'quick'],
    },
  ],
};

// ─── CUISINE REGISTRY ─────────────────────────────────────────────────────────

const cuisineMap: Record<string, Record<string, Meal[]>> = {
  nigerian: nigerianMeals,
  mexican: mexicanMeals,
  indian: indianMeals,
  chinese: chineseMeals,
  ethiopian: ethiopianMeals,
  caribbean: caribbeanMeals,
  american: generalMeals,
  default: generalMeals,
};

export const cuisineOptions = [
  { value: 'default', label: '🌍 Any Cuisine' },
  { value: 'nigerian', label: '🇳🇬 Nigerian' },
  { value: 'mexican', label: '🇲🇽 Mexican' },
  { value: 'indian', label: '🇮🇳 Indian' },
  { value: 'chinese', label: '🇨🇳 Chinese' },
  { value: 'ethiopian', label: '🇪🇹 Ethiopian' },
  { value: 'caribbean', label: '🏝️ Caribbean' },
  { value: 'american', label: '🇺🇸 American' },
];

// ─── MATCHING ENGINE ───────────────────────────────────────────────────────────

function normalizeIngredient(ing: string): string {
  return ing.toLowerCase().trim()
    .replace(/\s+/g, ' ')
    .replace(/canned\s+/g, '')
    .replace(/dried\s+/g, '')
    .replace(/fresh\s+/g, '')
    .replace(/frozen\s+/g, '')
    .replace(/cooked\s+/g, '');
}

function ingredientMatches(userIng: string, dbKey: string): boolean {
  const u = normalizeIngredient(userIng);
  const d = normalizeIngredient(dbKey);
  if (u.includes(d) || d.includes(u)) return true;

  const aliases: Record<string, string[]> = {
    beans: ['bean', 'lentil', 'pea', 'chickpea', 'black-eyed', 'kidney', 'navy', 'pinto', 'garbanzo'],
    rice: ['rice'],
    eggs: ['egg'],
    bread: ['bread', 'loaf', 'roll', 'toast', 'bagel', 'bun'],
    oats: ['oat', 'oatmeal', 'porridge'],
    pasta: ['pasta', 'noodle', 'spaghetti', 'macaroni', 'penne', 'fettuccine'],
    tuna: ['tuna', 'sardine', 'mackerel'],
    'peanut butter': ['peanut', 'pb'],
    bananas: ['banana'],
    tomatoes: ['tomato'],
    'canned tomatoes': ['tomato', 'tomatoes'],
    potato: ['potato', 'potatoes', 'yam', 'sweet potato'],
    yam: ['yam', 'potato', 'sweet potato'],
    plantain: ['plantain'],
    chicken: ['chicken', 'poultry', 'turkey'],
    tomato: ['tomato', 'tomatoes', 'tomato paste', 'tomato sauce'],
  };

  const dbAliases = aliases[d] || [];
  return dbAliases.some(alias => u.includes(alias));
}

function getMealsForCuisine(cuisine: string): Record<string, Meal[]> {
  const selected = cuisineMap[cuisine] || cuisineMap.default;
  // Always also pull from general for fallback
  if (cuisine !== 'default' && cuisine !== 'american') {
    const merged: Record<string, Meal[]> = { ...cuisineMap.default };
    for (const [key, meals] of Object.entries(selected)) {
      merged[key] = meals; // cuisine-specific overrides general
    }
    return merged;
  }
  return selected;
}

function findMatchingMeals(
  userIngredients: string[],
  cuisineDb: Record<string, Meal[]>,
  dietaryNeeds: string[],
  kitchenAccess: string,
): Meal[] {
  const found: Meal[] = [];
  const seen = new Set<string>();

  for (const [dbKey, meals] of Object.entries(cuisineDb)) {
    const hasIngredient = userIngredients.some(ui => ingredientMatches(ui, dbKey));
    if (!hasIngredient) continue;

    for (const meal of meals) {
      if (seen.has(meal.name)) continue;

      // Kitchen filter
      if (kitchenAccess === 'none' && !meal.tags.includes('no-cook') && !meal.tags.includes('portable')) continue;

      // Dietary filter
      if (dietaryNeeds.includes('Vegan') && !meal.tags.includes('vegan')) continue;
      if (dietaryNeeds.includes('Vegetarian') &&
        !meal.tags.includes('vegetarian') && !meal.tags.includes('vegan')) continue;

      found.push(meal);
      seen.add(meal.name);
    }
  }

  // Sort: prefer meals where user has MORE of the required ingredients
  found.sort((a, b) => {
    const aScore = a.ingredients.filter(ing =>
      userIngredients.some(ui => ingredientMatches(ui, ing))
    ).length;
    const bScore = b.ingredients.filter(ing =>
      userIngredients.some(ui => ingredientMatches(ui, ing))
    ).length;
    return bScore - aScore;
  });

  return found;
}

function buildWeeklyPlan(meals: Meal[], userIngredients: string[]): WeekDay[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Build pool — repeat meals if needed
  const pool = [...meals, ...meals, ...meals];

  return days.map((day, i) => {
    const bMeal = pool[i % pool.length];
    const lMeal = pool[(i + 1) % pool.length];
    const dMeal = pool[(i + 2) % pool.length];

    return {
      day,
      breakfast: {
        name: bMeal.name,
        ingredients: bMeal.ingredients,
        instructions: bMeal.instructions,
      },
      lunch: {
        name: lMeal.name,
        ingredients: lMeal.ingredients,
        instructions: lMeal.instructions,
      },
      dinner: {
        name: dMeal.name,
        ingredients: dMeal.ingredients,
        instructions: dMeal.instructions,
      },
    };
  });
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function generateMealPlan(
  ingredients: string[],
  budget: number,
  familySize: number,
  dietaryNeeds: string[],
  kitchenAccess: string,
  cuisine = 'default',
  zipCode?: string,
): MealPlan {
  const perPersonBudget = budget / Math.max(familySize, 1);
  const cuisineDb = getMealsForCuisine(cuisine);
  
  // Handle custom cuisine names (not in cuisineOptions)
  let cuisineLabel = cuisineOptions.find(c => c.value === cuisine)?.label;
  if (!cuisineLabel) {
    // Custom cuisine - format it nicely
    cuisineLabel = `🌍 ${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Cuisine`;
  }

  let matchedMeals = findMatchingMeals(ingredients, cuisineDb, dietaryNeeds, kitchenAccess);

  // Fallback: if no cuisine-specific matches, try general
  if (matchedMeals.length === 0 && cuisine !== 'default') {
    matchedMeals = findMatchingMeals(ingredients, cuisineMap.default, dietaryNeeds, kitchenAccess);
  }

  // Hard fallback: generate from raw ingredients
  if (matchedMeals.length === 0) {
    matchedMeals = [{
      name: `${ingredients.slice(0, 2).map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' & ')} Dish`,
      cuisine: cuisine,
      ingredients: ingredients,
      instructions: `Combine your ingredients: ${ingredients.join(', ')}. Season with whatever spices you have. Cook using your available kitchen method until everything is heated through and flavors meld together.`,
      prepTime: '20 min',
      cost: 1.00,
      servings: familySize,
      calories: 300,
      protein: '8g',
      tags: ['budget', 'flexible'],
    }];
  }

  const topMeals = matchedMeals.slice(0, 6);
  const weeklyPlan = buildWeeklyPlan(topMeals, ingredients);

  // Build grocery list from what user doesn't have
  const userHas = ingredients.map(i => i.toLowerCase());
  const groceryList: MealPlan['groceryList'] = [];
  const staples = [
    { item: 'Salt', estimatedCost: 0.50, priority: 'essential' as const },
    { item: 'Cooking oil', estimatedCost: 2.00, priority: 'essential' as const },
    { item: 'Garlic', estimatedCost: 0.50, priority: 'optional' as const },
    { item: 'Onion', estimatedCost: 0.60, priority: 'optional' as const },
  ];

  // Cuisine-specific staples
  if (cuisine === 'nigerian') {
    staples.push({ item: 'Bouillon cubes', estimatedCost: 0.50, priority: 'essential' as const });
    staples.push({ item: 'Tomato paste', estimatedCost: 0.80, priority: 'essential' as const });
  }
  if (cuisine === 'indian') {
    staples.push({ item: 'Turmeric', estimatedCost: 1.00, priority: 'essential' as const });
    staples.push({ item: 'Cumin seeds', estimatedCost: 1.20, priority: 'optional' as const });
  }
  if (cuisine === 'mexican') {
    staples.push({ item: 'Cumin powder', estimatedCost: 1.00, priority: 'optional' as const });
    staples.push({ item: 'Chili powder', estimatedCost: 1.00, priority: 'optional' as const });
  }

  // Function to get store recommendations based on ZIP code
  function getStoreRecommendations(zipCode?: string): string[] {
    if (!zipCode) return ['Any grocery store'];
    
    // Based on ZIP code prefix, suggest stores
    const zipPrefix = zipCode.substring(0, 3);
    
    // Common store chains by region (simplified)
    if (['100', '101', '102', '103'].includes(zipPrefix)) { // NYC area
      return ['Trader Joe\'s', 'Whole Foods', 'Food Bazaar', 'Key Food'];
    } else if (['606', '608'].includes(zipPrefix)) { // Chicago area
      return ['Jewel-Osco', 'Mariano\'s', 'Aldi', 'Save-a-Lot'];
    } else if (['900', '902', '906'].includes(zipPrefix)) { // LA area
      return ['Ralphs', 'Vons', 'Smart & Final', 'Super King'];
    } else if (['770', '772', '774'].includes(zipPrefix)) { // Houston area
      return ['H-E-B', 'Kroger', 'Fiesta Mart', 'Randalls'];
    } else if (['303', '300', '301'].includes(zipPrefix)) { // Atlanta area
      return ['Publix', 'Kroger', 'Aldi', 'Sprouts'];
    } else if (['191', '190', '189'].includes(zipPrefix)) { // Philly area
      return ['Acme', 'Giant', 'ShopRite', 'Aldi'];
    } else if (['331', '330', '333'].includes(zipPrefix)) { // Miami area
      return ['Publix', 'Sedano\'s', 'Winn-Dixie', 'Aldi'];
    } else if (['752', '750', '751'].includes(zipPrefix)) { // Dallas area
      return ['Kroger', 'Tom Thumb', 'Aldi', 'Fiesta Mart'];
    } else if (['941', '940', '945'].includes(zipPrefix)) { // SF Bay area
      return ['Safeway', 'Trader Joe\'s', 'Whole Foods', 'Lucky'];
    } else {
      return ['Walmart', 'Aldi', 'Dollar General', 'Local grocery'];
    }
  }

  const storeRecommendations = getStoreRecommendations(zipCode);

  for (const staple of staples) {
    const word = staple.item.toLowerCase().split(' ')[0];
    if (!userHas.some(u => u.includes(word))) {
      groceryList.push({
        ...staple,
        stores: storeRecommendations
      });
    }
  }

  const hasProtein = ingredients.some(i => {
    const n = i.toLowerCase();
    return n.includes('egg') || n.includes('bean') || n.includes('lentil') ||
      n.includes('tuna') || n.includes('chicken') || n.includes('peanut') || n.includes('meat');
  });
  if (!hasProtein) {
    groceryList.push({ item: 'Eggs (dozen)', estimatedCost: 2.50, priority: 'essential' });
    groceryList.push({ item: 'Dried beans (1 lb)', estimatedCost: 1.20, priority: 'essential' });
  }

  const totalEstimatedCost = groceryList.reduce((s, g) => s + g.estimatedCost, 0);
  const avgCalories = Math.round(topMeals.reduce((s, m) => s + m.calories, 0) / topMeals.length);

  const budgetNote = perPersonBudget < 15
    ? `⚠️ Very tight at $${perPersonBudget.toFixed(0)}/person/week. Focus on beans, rice, eggs, and oats.`
    : perPersonBudget < 25
    ? `💡 $${perPersonBudget.toFixed(0)}/person/week is workable. These meals maximize nutrition per dollar.`
    : `✅ $${perPersonBudget.toFixed(0)}/person/week gives good options. Meals optimized for nutrition and variety.`;

  return {
    meals: topMeals,
    groceryList,
    totalEstimatedCost,
    nutritionSummary: {
      calories: avgCalories * 3,
      protein: '45-65g',
      carbs: '120-180g',
      fat: '20-35g',
      fiber: '15-25g',
    },
    budgetNote,
    weeklyPlan,
    cuisine: cuisineLabel,
  };
}
