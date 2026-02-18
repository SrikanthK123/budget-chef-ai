import React, { useState, useEffect } from 'react';
import { ShoppingCart, List, Clock, Gauge, HandCoins, Check, X } from 'lucide-react';

const ResultCard = ({ data }) => {
    if (!data) return null;

    const { ingredients, totalCost, remainingBudget, steps, prepTime, difficulty } = data;

    // Initialize all ingredients as checked (true)
    const [checkedItems, setCheckedItems] = useState(
        new Array(ingredients.length).fill(true)
    );

    const [currentCost, setCurrentCost] = useState(totalCost);
    const [currentRemaining, setCurrentRemaining] = useState(remainingBudget);

    // Recalculate cost when checked items change
    useEffect(() => {
        let newCost = 0;
        ingredients.forEach((item, index) => {
            if (checkedItems[index]) {
                newCost += item.price;
            }
        });

        // Adjust remaining budget based on the original total budget (which is Cost + Remaining)
        const initialTotalBudget = totalCost + remainingBudget;
        setCurrentCost(newCost);
        setCurrentRemaining(initialTotalBudget - newCost);

    }, [checkedItems, ingredients, totalCost, remainingBudget]);


    const toggleItem = (index) => {
        const newChecked = [...checkedItems];
        newChecked[index] = !newChecked[index];
        setCheckedItems(newChecked);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center space-x-4 transition-all duration-300">
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                        <HandCoins className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Cost</p>
                        <p className="text-xl font-bold text-gray-900 transition-all duration-300">₹{currentCost}</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center space-x-4 transition-all duration-300">
                    <div className={`p-3 rounded-full ${currentRemaining >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'} transition-colors duration-300`}>
                        <HandCoins className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Remaining Budget</p>
                        <p className={`text-xl font-bold ${currentRemaining >= 0 ? 'text-gray-900' : 'text-red-600'} transition-all duration-300`}>
                            ₹{currentRemaining}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Prep Time</p>
                        <p className="text-xl font-bold text-gray-900">{prepTime || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ingredients Section */}
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                    <div className="flex items-center space-x-2 mb-4">
                        <ShoppingCart className="w-5 h-5 text-orange-600" />
                        <h3 className="text-lg font-bold text-gray-800">Ingredients Shopping List</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2 border-b">
                            <div className="col-span-1"></div>
                            <div className="col-span-6">Item</div>
                            <div className="col-span-2 text-right">Qty</div>
                            <div className="col-span-3 text-right">Price</div>
                        </div>
                        {ingredients.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => toggleItem(index)}
                                className={`grid grid-cols-12 text-sm py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-all duration-200 items-center group
                    ${!checkedItems[index] ? 'opacity-50' : ''}`}
                            >
                                <div className="col-span-1 flex justify-center">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                        ${checkedItems[index] ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 bg-white'}`}>
                                        {checkedItems[index] && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                </div>
                                <div className={`col-span-6 font-medium text-gray-800 flex items-center space-x-2 ${!checkedItems[index] ? 'line-through decoration-gray-400' : ''}`}>
                                    <span className="text-lg">{item.emoji || '🥘'}</span>
                                    <span>{item.name}</span>
                                </div>
                                <div className={`col-span-2 text-right text-gray-600 ${!checkedItems[index] ? 'line-through' : ''}`}>
                                    {item.quantity}
                                </div>
                                <div className={`col-span-3 text-right font-semibold ${!checkedItems[index] ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                    ₹{item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions Section */}
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <List className="w-5 h-5 text-orange-600" />
                            <h3 className="text-lg font-bold text-gray-800">Cooking Steps</h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                ${difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {difficulty || 'Easy'}
                        </span>
                    </div>
                    <ol className="space-y-4">
                        {steps.map((step, index) => (
                            <li key={index} className="flex space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mt-0.5">
                                    {index + 1}
                                </span>
                                <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
