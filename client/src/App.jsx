
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import LoadingSpinner from './components/LoadingSpinner';
import { ChefHat, AlertCircle, Clock, Trash2, X } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('mealHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Error parsing history from local storage", error);
      return [];
    }
  });
  const [showClearModal, setShowClearModal] = useState(false);

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('mealHistory', JSON.stringify(history));
  }, [history]);

  const handleGenerateMeal = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/generate-meal`, formData);
      const newMeal = { ...response.data, id: Date.now(), ...formData }; // Add ID and request details
      setResult(newMeal);
      setHistory(prev => [newMeal, ...prev]); // Add to history
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.error || "Failed to generate meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (meal) => {
    setResult(meal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmClearHistory = () => {
    setHistory([]);
    setShowClearModal(false);
  };

  const deleteRecipe = (e, id) => {
    e.stopPropagation(); // Prevent triggering the loadFromHistory
    setHistory(prev => prev.filter(item => item.id !== id));
    if (result && result.id === id) {
      setResult(null); // Clear view if we deleted the active item
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 relative">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BudgetChef AI
              </span>
            </div>
            <div className="text-sm text-gray-500 hidden sm:block">Smart Cooking Assistant</div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - History (Visible on Desktop) */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700 flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> Recent Meals
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center transition-colors"
                  >
                    <Trash2 className="w-3 h-3 mr-1" /> Clear All
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
                {history.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No recent recipes.</p>
                ) : (
                  history.map((meal) =>
                    <div
                      key={meal.id}
                      onClick={() => loadFromHistory(meal)}
                      className={`group relative p-3 rounded-lg cursor-pointer transition-all border text-sm
                                        ${result?.id === meal.id ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-gray-50 border-transparent hover:bg-white hover:shadow-sm hover:border-gray-200'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-gray-800 line-clamp-1 pr-6 flex items-center">
                          <span className="mr-2 text-lg">{meal.emoji || '🥘'}</span>
                          {meal.foodName}
                        </div>
                        <button
                          onClick={(e) => deleteRecipe(e, meal.id)}
                          className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-1"
                          title="Delete Recipe"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500 pl-7">
                        <span>₹{meal.budget}</span>
                        <span>{new Date(meal.id).toLocaleDateString()}</span>
                      </div>
                    </div>))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Cook Smarter, <span className="text-orange-600">Save Better</span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get AI-generated recipes tailored to your budget with precise ingredient costs and instructions.
              </p>
            </div>

            <div className="flex justify-center">
              <InputForm onSubmit={handleGenerateMeal} isLoading={loading} />
            </div>

            <div className="mt-8 transition-all duration-500 ease-in-out">
              {loading && (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              )}

              {error && (
                <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 text-red-700 animate-fade-in">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {!loading && !result && history.length > 0 && (
                <div className="text-center text-gray-400 py-12">
                  <p>Select a recipe from history or generate a new one!</p>
                </div>
              )}

              {!loading && result && (
                <ResultCard data={result} />
              )}
            </div>

            {/* Mobile History (Visible only on mobile/tablet) */}
            <div className="lg:hidden mt-12 border-t pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700 flex items-center">
                  <Clock className="w-5 h-5 mr-2" /> Recent Recipes
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {history.map((meal) => (
                  <div
                    key={meal.id}
                    onClick={() => loadFromHistory(meal)}
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center relative group"
                  >
                    <div>
                      <div className="font-medium text-gray-800 flex items-center">
                        <span className="mr-2 text-lg">{meal.emoji || '🥘'}</span>
                        {meal.foodName}
                      </div>
                      <div className="text-xs text-gray-500 pl-7">₹{meal.budget} • {meal.type}</div>
                    </div>
                    <button
                      onClick={(e) => deleteRecipe(e, meal.id)}
                      className="text-gray-400 hover:text-red-500 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-gray-100 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} BudgetChef AI. Made with 🧡 & Gemini.</p>
        </div>
      </footer>

      {/* Professional Clear History Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Cooking History?</h3>
              <p className="text-gray-500 mb-6 text-sm">
                This will permanently delete all your saved recipes. This action cannot be undone.
              </p>
              <div className="flex space-x-3 w-full">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearHistory}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-lg shadow-red-200"
                >
                  Yes, Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

