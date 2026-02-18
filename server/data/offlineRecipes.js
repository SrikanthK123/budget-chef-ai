const offlineRecipes = {
    "lemon rice": {
        emoji: "🍋",
        ingredients: [
            { name: "Rice", quantity: "2 cups", price: 0.15, emoji: "🍚" }, // Price multipliers of budget
            { name: "Lemon", quantity: "2", price: 0.05, emoji: "🍋" },
            { name: "Peanuts", quantity: "50g", price: 0.10, emoji: "🥜" },
            { name: "Oil", quantity: "2 tbsp", price: 0.05, emoji: "🛢️" },
            { name: "Mustard Seeds", quantity: "1 tsp", price: 0.02, emoji: "🌿" },
            { name: "Turmeric", quantity: "1 tsp", price: 0.03, emoji: "🟡" },
            { name: "Green Chilies", quantity: "3", price: 0.05, emoji: "🌶️" },
            { name: "Curry Leaves", quantity: "1 sprig", price: 0.05, emoji: "🍃" }
        ],
        prepTime: "20 mins",
        difficulty: "Easy",
        steps: [
            "Cook rice and let it cool.",
            "Heat oil, add mustard seeds, peanuts, and chilies.",
            "Add turmeric and curry leaves.",
            "Mix lemon juice with the tempering.",
            "Toss rice gently with the mixture and serve."
        ]
    },
    "sandwich": {
        emoji: "🥪",
        ingredients: [
            { name: "Bread", quantity: "1 loaf", price: 0.20, emoji: "🍞" },
            { name: "Butter", quantity: "50g", price: 0.15, emoji: "🧈" },
            { name: "Cucumber", quantity: "1", price: 0.10, emoji: "🥒" },
            { name: "Tomato", quantity: "2", price: 0.10, emoji: "🍅" },
            { name: "Cheese Slices", quantity: "4", price: 0.30, emoji: "🧀" },
            { name: "Ketchup/Chutney", quantity: "2 tbsp", price: 0.10, emoji: "🥣" }
        ],
        prepTime: "10 mins",
        difficulty: "Easy",
        steps: [
            "Butter the bread slices.",
            "Place sliced cucumber and tomato.",
            "Add cheese slice and chutney.",
            "Cover with another slice and grill if desired.",
            "Cut diagonally and serve."
        ]
    },
    "biryani": {
        emoji: "🍛",
        ingredients: [
            { name: "Basmati Rice", quantity: "500g", price: 0.25, emoji: "🍚" },
            { name: "Vegetables/Chicken", quantity: "500g", price: 0.35, emoji: "🍗" },
            { name: "Yogurt", quantity: "200g", price: 0.10, emoji: "🥣" },
            { name: "Onions", quantity: "4", price: 0.10, emoji: "🧅" },
            { name: "Biryani Masala", quantity: "2 tbsp", price: 0.10, emoji: "🌶️" },
            { name: "Ghee", quantity: "3 tbsp", price: 0.10, emoji: "🧈" }
        ],
        prepTime: "60 mins",
        difficulty: "Hard",
        steps: [
            "Marinate veggies/chicken with yogurt and spices.",
            "Fry onions until crispy (Barista).",
            "Cook rice until 70% done.",
            "Layer meat/veggies and rice in a pot.",
            "Add ghee and fried onions. Dum cook for 20 mins."
        ]
    },
    "paneer butter masala": {
        emoji: "🥘",
        ingredients: [
            { name: "Paneer", quantity: "250g", price: 0.35, emoji: "🧀" },
            { name: "Butter", quantity: "50g", price: 0.15, emoji: "🧈" },
            { name: "Tomatoes", quantity: "4", price: 0.15, emoji: "🍅" },
            { name: "Cashews", quantity: "10", price: 0.15, emoji: "🥜" },
            { name: "Cream", quantity: "2 tbsp", price: 0.10, emoji: "🥛" },
            { name: "Spices (Garlic, Chili)", quantity: "Mix", price: 0.10, emoji: "🌶️" }
        ],
        prepTime: "40 mins",
        difficulty: "Medium",
        steps: [
            "Fry paneer cubes lightly (optional).",
            "Make a paste of boiled onions, tomatoes, and cashews.",
            "Cook paste in butter with spices.",
            "Add water and simmer.",
            "Add paneer and finish with fresh cream."
        ]
    },
    "ice cream": {
        emoji: "🍨",
        ingredients: [
            { name: "Heavy Cream", quantity: "2 Cups", price: 0.40, emoji: "🥛" },
            { name: "Condensed Milk", quantity: "1 Cup", price: 0.30, emoji: "🥫" },
            { name: "Vanilla Essence", quantity: "1 tsp", price: 0.10, emoji: "🌼" },
            { name: "Choco Chips", quantity: "50g", price: 0.15, emoji: "🍫" }
        ],
        prepTime: "15 mins (+Freezing)",
        difficulty: "Easy",
        steps: [
            "Whip the heavy cream until stiff peaks form.",
            "Gently fold in condensed milk and vanilla.",
            "Add choco chips or other mix-ins.",
            "Pour into container and freeze for 6-8 hours.",
            "Scoop and serve."
        ]
    },
    "maggie": {
        emoji: "🍜",
        ingredients: [
            { name: "Maggie Packets", quantity: "2", price: 0.40, emoji: "🍜" },
            { name: "Water", quantity: "2 cups", price: 0.00, emoji: "💧" },
            { name: "Peas/Carrots", quantity: "50g", price: 0.30, emoji: "🥕" },
            { name: "Butter", quantity: "1 tsp", price: 0.20, emoji: "🧈" }
        ],
        prepTime: "5 mins",
        difficulty: "Easy",
        steps: [
            "Boil water in a pan.",
            "Add tastemaker and dried veggies.",
            "Add noodles and cook for 2 minutes.",
            "Top with butter and serve hot."
        ]
    }
};

module.exports = offlineRecipes;
