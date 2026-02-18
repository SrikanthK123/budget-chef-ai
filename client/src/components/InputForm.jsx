import React, { useState } from 'react';
import { ChefHat, IndianRupee, Search } from 'lucide-react';

const InputForm = ({ onSubmit, isLoading }) => {
    const [foodName, setFoodName] = useState('');
    const [budget, setBudget] = useState('');
    const [type, setType] = useState('Any');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!foodName || !budget) return;
        onSubmit({ foodName, budget, type });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="mb-6 text-center">
                <div className="bg-orange-100 p-3 rounded-full inline-block mb-2">
                    <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">BudgetChef AI</h2>
                <p className="text-sm text-gray-500">Smart cooking within your budget</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What do you want to cook?</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            placeholder="e.g. Butter Chicken"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            required
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Budget (INR)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="e.g. 500"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            required
                            min="1"
                        />
                        <IndianRupee className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Preference</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    >
                        <option value="Any">Any Preference</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 mt-2
            ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg'}`}
                >
                    {isLoading ? 'Generating Plan...' : 'Generate Plan'}
                </button>
            </div>
        </form>
    );
};

export default InputForm;
