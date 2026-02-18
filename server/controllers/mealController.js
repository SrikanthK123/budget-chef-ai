const { GoogleGenerativeAI } = require("@google/generative-ai");
const { generatePrompt } = require("../utils/aiPrompt");

// Initialize Gemini API
// Note: Ensure GEMINI_API_KEY is set in .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "API_KEY_MISSING");

const generateMeal = async (req, res) => {
    let foodName, budget, type;
    try {
        ({ foodName, budget, type } = req.body);

        if (!foodName || !budget) {
            return res.status(400).json({ error: "Food name and budget are required" });
        }

        // Use a model capable of JSON generation
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = generatePrompt(foodName, budget, type);

        let retries = 3;
        let delay = 2000;
        let result;

        while (retries > 0) {
            try {
                result = await model.generateContent(prompt);
                break;
            } catch (err) {
                if (err.status === 429 || err.message.includes("429")) {
                    console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                    retries--;
                } else {
                    throw err;
                }
            }
        }

        if (!result) {
            throw new Error("Failed to generate content after retries due to rate limit.");
        }

        const response = await result.response;
        let text = response.text();

        // Clean markdown code blocks if present
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const jsonResponse = JSON.parse(text);
            res.json(jsonResponse);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            res.status(500).json({ error: "Failed to parse AI response", raw: text });
        }

    } catch (error) {
        console.error("AI Generation Error:", error);

        const safeBudget = parseInt(budget) || 500;
        const lowerFood = foodName.toLowerCase().trim();

        // 1. Try Exact/Partial Match from Offline Database
        const offlineRecipes = require('../data/offlineRecipes');
        let matchedRecipe = null;

        // check for exact keys or if key is inside the food name
        for (const [key, data] of Object.entries(offlineRecipes)) {
            if (lowerFood.includes(key)) {
                matchedRecipe = data;
                break;
            }
        }

        if (matchedRecipe) {
            console.log(`Using Offline DB match for: ${lowerFood}`);
            const fallbackData = {
                ...matchedRecipe,
                ingredients: matchedRecipe.ingredients.map(ing => ({
                    ...ing,
                    // Calculate dynamic price based on budget allocation
                    price: Math.ceil(safeBudget * ing.price)
                })),
                // Sum up calculated prices
                totalCost: 0,
                remainingBudget: 0
            };

            // Recalculate total logic
            fallbackData.totalCost = fallbackData.ingredients.reduce((acc, curr) => acc + curr.price, 0);
            fallbackData.remainingBudget = safeBudget - fallbackData.totalCost;

            return res.json(fallbackData);
        }

        // 2. If no match, use Generic Category Fallback
        let fallbackData;

        if (lowerFood.includes("ice cream") || lowerFood.includes("cake") || lowerFood.includes("kheer") || lowerFood.includes("sweet") || lowerFood.includes("seviyan") || lowerFood.includes("halwa") || lowerFood.includes("dessert")) {
            // DESSERT FALLBACK
            fallbackData = {
                emoji: "🍨",
                ingredients: [
                    { name: "Milk/Base", quantity: "1 Liter", price: Math.floor(safeBudget * 0.30), emoji: "🥛" },
                    { name: "Sugar/Jaggery", quantity: "200g", price: Math.floor(safeBudget * 0.10), emoji: "🍚" },
                    { name: "Ghee/Butter", quantity: "50g", price: Math.floor(safeBudget * 0.15), emoji: "🧈" },
                    { name: "Dry Fruits", quantity: "50g", price: Math.floor(safeBudget * 0.25), emoji: "🥜" },
                    { name: "Flavoring (Cardamom)", quantity: "1 tsp", price: Math.floor(safeBudget * 0.05), emoji: "🌿" }
                ],
                totalCost: Math.floor(safeBudget * 0.85),
                remainingBudget: Math.floor(safeBudget * 0.15),
                steps: [
                    "Prepare the base (boil milk or roast flour in ghee).",
                    "Add sweetener and stir continuously.",
                    "Cook until desired consistency is reached.",
                    "Garnish with chopped dry fruits.",
                    "Serve warm or chilled."
                ],
                prepTime: "30 mins",
                difficulty: "Easy"
            };
        } else if (lowerFood.includes("chicken") || lowerFood.includes("mutton") || lowerFood.includes("egg") || lowerFood.includes("non-veg") || lowerFood.includes("fish")) {
            fallbackData = {
                emoji: "🍗",
                ingredients: [
                    { name: "Meat/Eggs", quantity: "500g/6pcs", price: Math.floor(safeBudget * 0.45), emoji: "🍗" },
                    { name: "Onion", quantity: "3 medium", price: Math.floor(safeBudget * 0.10), emoji: "🧅" },
                    { name: "Tomato", quantity: "2 medium", price: Math.floor(safeBudget * 0.10), emoji: "🍅" },
                    { name: "Ginger-Garlic", quantity: "2 tbsp", price: Math.floor(safeBudget * 0.05), emoji: "🧄" },
                    { name: "Oil/Butter", quantity: "3 tbsp", price: Math.floor(safeBudget * 0.10), emoji: "🛢️" },
                    { name: "Spices (Masala)", quantity: "1 packet", price: Math.floor(safeBudget * 0.10), emoji: "🌶️" },
                    { name: "Coriander", quantity: "1 bunch", price: Math.floor(safeBudget * 0.05), emoji: "🌿" },
                    { name: "Side (Rice/Roti)", quantity: "Portion", price: Math.floor(safeBudget * 0.05), emoji: "🍛" }
                ],
                totalCost: Math.floor(safeBudget * 0.95),
                remainingBudget: Math.floor(safeBudget * 0.05),
                steps: [
                    "Marinate the main ingredient with spices.",
                    "Heat oil/butter and sauté onions and ginger-garlic.",
                    "Add tomatoes and cook until soft.",
                    "Add main ingredient and simmer until cooked.",
                    "Serve hot with Rice or Roti."
                ],
                prepTime: "40 mins",
                difficulty: "Medium"
            };
        } else {
            // Default Generic Veg
            fallbackData = {
                emoji: "🥗",
                ingredients: [
                    { name: "Main Vegetable", quantity: "500g", price: Math.floor(safeBudget * 0.30), emoji: "🥦" },
                    { name: "Onion", quantity: "2 medium", price: Math.floor(safeBudget * 0.10), emoji: "🧅" },
                    { name: "Tomato", quantity: "2 medium", price: Math.floor(safeBudget * 0.10), emoji: "🍅" },
                    { name: "Spices (Turmeric, Chili)", quantity: "Mix", price: Math.floor(safeBudget * 0.05), emoji: "🌶️" },
                    { name: "Oil", quantity: "2 tbsp", price: Math.floor(safeBudget * 0.10), emoji: "🛢️" },
                    { name: "Salt", quantity: "to taste", price: Math.floor(safeBudget * 0.02), emoji: "🧂" },
                    { name: "Garam Masala", quantity: "1 tsp", price: Math.floor(safeBudget * 0.05), emoji: "🍂" },
                    { name: "Coriander", quantity: "Garnish", price: Math.floor(safeBudget * 0.05), emoji: "🌿" }
                ],
                totalCost: Math.floor(safeBudget * 0.77),
                remainingBudget: Math.floor(safeBudget * 0.23),
                steps: [
                    "Heat oil in a pan and add cumin seeds.",
                    "Sauté chopped onions and tomatoes.",
                    "Add vegetables and spices.",
                    "Cover and cook until tender.",
                    "Garnish with coriander leaves."
                ],
                prepTime: "25 mins",
                difficulty: "Easy"
            };
        }

        console.warn(`Using Fallback Data for '${foodName}' due to API failure.`);
        res.json(fallbackData);
    }
};

module.exports = { generateMeal };
