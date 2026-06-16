import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateMealPlan, type MealPlan, cuisineOptions } from '../utils/mealEngine';

export default function MealPlanner() {
  const { userProfile } = useApp();
  const [ingredientInput, setIngredientInput] = useState(userProfile.ingredients.join(', '));
  const [budget, setBudget] = useState(userProfile.weeklyBudget);
  const [familySize, setFamilySize] = useState(userProfile.familySize);
  const [dietary, setDietary] = useState<string[]>(userProfile.dietaryNeeds);
  const [kitchen, setKitchen] = useState<'full' | 'microwave' | 'none'>(
    (userProfile.kitchenAccess as 'full' | 'microwave' | 'none') || 'full'
  );
  const [selectedCuisine, setSelectedCuisine] = useState('default');
  const [customCuisine, setCustomCuisine] = useState('');
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'meals' | 'weekly' | 'grocery' | 'nutrition'>('meals');

  const dietOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Dairy-Free'];

  const generate = () => {
    const ingredients = ingredientInput
      .split(/[,\n]+/)
      .map(s => s.trim())
      .filter(Boolean);

    if (ingredients.length === 0) {
      alert('Please enter at least one ingredient you have.');
      return;
    }

    // Validate custom cuisine if "Other" is selected
    if (selectedCuisine === 'other') {
      if (!customCuisine.trim()) {
        alert('Please enter a cuisine name for "Other" option.');
        return;
      }
      if (customCuisine.trim().length < 3) {
        alert('Please enter a valid cuisine name (at least 3 characters).');
        return;
      }
    }

    setLoading(true);
    // Simulate a slight delay for feel
    setTimeout(() => {
      // Use custom cuisine if "Other" is selected, otherwise use selectedCuisine
      const cuisineToUse = selectedCuisine === 'other' ? customCuisine.trim().toLowerCase() : selectedCuisine;
      const result = generateMealPlan(ingredients, budget, familySize, dietary, kitchen, cuisineToUse, userProfile.zipCode);
      setPlan(result);
      setLoading(false);
      setActiveTab('meals');
    }, 800);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'linear-gradient(135deg, #FFF9F2 0%, #FFF3E0 100%)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
            🧠 AI-Powered
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Meal Planner</h1>
          <p className="text-gray-500 mt-2">Enter what you have — get real meals you can make today</p>
        </div>

        {/* Input form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                🥫 What ingredients do you have?
                <span className="text-orange-500 ml-1">*</span>
              </label>
              <textarea
                rows={3}
                value={ingredientInput}
                onChange={e => setIngredientInput(e.target.value)}
                placeholder="e.g. rice, beans, eggs, bread, peanut butter, oats, tuna..."
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                💡 Tip: The more specific, the better. e.g. "canned black beans, brown rice, large eggs"
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                🌍 Choose Cuisine Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {cuisineOptions.map(cuisine => (
                  <button
                    key={cuisine.value}
                    onClick={() => {
                      setSelectedCuisine(cuisine.value);
                      if (cuisine.value !== 'other') {
                        setCustomCuisine('');
                      }
                    }}
                    className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      selectedCuisine === cuisine.value
                        ? 'border-purple-400 bg-purple-50 text-purple-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-base mb-1">{cuisine.label.split(' ')[0]}</div>
                    <div className="text-xs opacity-70">{cuisine.label.split(' ').slice(1).join(' ')}</div>
                  </button>
                ))}
                {/* Other Cuisine Option */}
                <button
                  key="other"
                  onClick={() => setSelectedCuisine('other')}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    selectedCuisine === 'other'
                      ? 'border-purple-400 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-base mb-1">🌐</div>
                  <div className="text-xs opacity-70">Other</div>
                </button>
              </div>
              
              {/* Custom Cuisine Input for "Other" */}
              {selectedCuisine === 'other' && (
                <div className="mt-3">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    Enter Custom Cuisine
                    <span className="text-orange-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={customCuisine}
                    onChange={e => setCustomCuisine(e.target.value)}
                    placeholder="e.g. Nigerian, Ghanaian, Ethiopian, Jamaican, Lebanese, Pakistani..."
                    className="w-full px-4 py-3 rounded-2xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Type any cuisine you'd like. We'll generate authentic recipes for it.
                  </p>
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-1">
                Select your preferred cuisine style for authentic recipes
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  💰 Weekly Budget: <span className="text-orange-500">${budget}</span>
                </label>
                <input type="range" min={10} max={300} step={5} value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full accent-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  👨‍👩‍👧 People: <span className="text-orange-500">{familySize}</span>
                </label>
                <input type="range" min={1} max={10} value={familySize}
                  onChange={e => setFamilySize(Number(e.target.value))}
                  className="w-full accent-orange-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">🍳 Kitchen Access</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { v: 'full' as const, l: '🏠 Full Kitchen' },
                  { v: 'microwave' as const, l: '📦 Microwave Only' },
                  { v: 'none' as const, l: '🏕️ No Kitchen' },
                ].map(opt => (
                  <button key={opt.v} onClick={() => setKitchen(opt.v)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium border transition-all ${
                      kitchen === opt.v ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'
                    }`}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">🥗 Dietary Needs</label>
              <div className="flex gap-2 flex-wrap">
                {dietOptions.map(d => (
                  <button key={d}
                    onClick={() => setDietary(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      dietary.includes(d) ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600'
                    }`}>
                    {dietary.includes(d) ? '✓ ' : ''}{d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="w-full mt-5 py-4 rounded-2xl text-white font-black text-lg transition-all hover:scale-105 shadow-orange disabled:opacity-70 disabled:cursor-wait"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' }}
          >
            {loading ? '🧠 Analyzing your ingredients...' : '🍳 Generate My Meal Plan'}
          </button>
        </div>

        {/* Results */}
        {plan && (
          <div className="animate-slide-up">
            {/* Cuisine and Budget note */}
            <div className="mb-4 p-4 rounded-2xl text-sm flex items-center justify-between"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', color: '#7C3AED' }}>
              <div>
                <span className="font-bold">{plan.cuisine}</span> meals generated
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                {plan.meals.length} recipes
              </div>
            </div>
            
            {/* Budget note */}
            <div className="mb-4 p-4 rounded-2xl text-sm"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#15803D' }}>
              {plan.budgetNote}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
              {(['meals', 'weekly', 'grocery', 'nutrition'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab ? 'text-white shadow-orange' : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                  style={activeTab === tab ? { background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' } : {}}>
                  {tab === 'meals' ? '🍽️ Meals' : tab === 'weekly' ? '📅 Weekly Plan' : tab === 'grocery' ? '🛒 Grocery List' : '🥗 Nutrition'}
                </button>
              ))}
            </div>

            {/* Meals tab */}
            {activeTab === 'meals' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plan.meals.map((meal, i) => (
                  <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-black text-gray-900 text-base leading-tight">{meal.name}</h3>
                        <span className="text-xs text-gray-500">{meal.cuisine} cuisine</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full ml-2 flex-shrink-0"
                        style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
                        ~${(meal.cost * familySize / meal.servings).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {meal.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                      <div className="p-2 rounded-xl" style={{ background: 'rgba(255,107,0,0.06)' }}>
                        <div className="text-xs text-gray-400">Time</div>
                        <div className="text-xs font-bold text-orange-600">{meal.prepTime}</div>
                      </div>
                      <div className="p-2 rounded-xl" style={{ background: 'rgba(34,197,94,0.06)' }}>
                        <div className="text-xs text-gray-400">Calories</div>
                        <div className="text-xs font-bold text-green-600">{meal.calories}</div>
                      </div>
                      <div className="p-2 rounded-xl" style={{ background: 'rgba(124,58,237,0.06)' }}>
                        <div className="text-xs text-gray-400">Protein</div>
                        <div className="text-xs font-bold text-purple-600">{meal.protein}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mb-2 font-semibold">Ingredients needed:</div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {meal.ingredients.map((ing, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-600">{ing}</span>
                      ))}
                    </div>
                    <details className="cursor-pointer">
                      <summary className="text-xs font-semibold text-orange-500">View Instructions ▾</summary>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed whitespace-pre-line">{meal.instructions}</p>
                    </details>
                  </div>
                ))}
              </div>
            )}

            {/* Weekly plan tab */}
            {activeTab === 'weekly' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-black text-gray-900">7-Day Meal Plan</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Rotate meals to maximize nutrition and variety</p>
                </div>
                {plan.weeklyPlan.map((day, i) => (
                  <div key={i} className={`p-4 ${i < plan.weeklyPlan.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <div className="font-bold text-gray-800 text-sm mb-2">{day.day}</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-xl" style={{ background: 'rgba(255,107,0,0.06)' }}>
                        <div className="text-gray-400 mb-0.5">Breakfast</div>
                        <div className="font-medium text-gray-700">{day.breakfast.name}</div>
                      </div>
                      <div className="p-2 rounded-xl" style={{ background: 'rgba(34,197,94,0.06)' }}>
                        <div className="text-gray-400 mb-0.5">Lunch</div>
                        <div className="font-medium text-gray-700">{day.lunch.name}</div>
                      </div>
                      <div className="p-2 rounded-xl" style={{ background: 'rgba(124,58,237,0.06)' }}>
                        <div className="text-gray-400 mb-0.5">Dinner</div>
                        <div className="font-medium text-gray-700">{day.dinner.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Grocery list tab */}
            {activeTab === 'grocery' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-black text-gray-900 mb-4">🛒 Suggested Grocery List</h3>
                <p className="text-sm text-gray-500 mb-4">Items you may want to pick up to complete these meals:</p>
                
                {/* Store recommendations header */}
                {userProfile.zipCode && plan.groceryList.length > 0 && plan.groceryList[0]?.stores && (
                  <div className="mb-4 p-3 rounded-2xl text-sm"
                    style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#1D4ED8' }}>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>
                        <strong>Where to buy in {userProfile.zipCode}:</strong> {plan.groceryList[0].stores.slice(0, 3).join(', ')}
                        {plan.groceryList[0].stores.length > 3 ? ', and others' : ''}
                      </span>
                    </div>
                  </div>
                )}
                
                {plan.groceryList.length === 0 ? (
                  <p className="text-green-600 font-semibold">✅ You seem to have everything you need!</p>
                ) : (
                  <div className="space-y-2">
                    {plan.groceryList.map((item, i) => (
                      <div key={i} className="p-3 rounded-2xl"
                        style={{ background: item.priority === 'essential' ? 'rgba(255,107,0,0.06)' : 'rgba(0,0,0,0.03)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${item.priority === 'essential' ? 'bg-orange-500' : 'bg-gray-300'}`} />
                            <span className="text-sm font-medium text-gray-700">{item.item}</span>
                            {item.priority === 'essential' && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">essential</span>
                            )}
                          </div>
                          <span className="text-sm font-bold text-gray-600">~${item.estimatedCost.toFixed(2)}</span>
                        </div>
                        
                        {/* Store recommendations for this item */}
                        {item.stores && item.stores.length > 0 && (
                          <div className="mt-2 pl-4">
                            <div className="text-xs text-gray-500 mb-1">Available at:</div>
                            <div className="flex flex-wrap gap-1">
                              {item.stores.slice(0, 3).map((store, j) => (
                                <span key={j} className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-600">
                                  {store}
                                </span>
                              ))}
                              {item.stores.length > 3 && (
                                <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-400">
                                  +{item.stores.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                      <span className="font-bold text-gray-900">Estimated total</span>
                      <span className="font-black text-orange-600">~${plan.totalEstimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Nutrition tab */}
            {activeTab === 'nutrition' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-black text-gray-900 mb-4">🥗 Daily Nutrition Summary</h3>
                <p className="text-sm text-gray-500 mb-5">Estimated daily averages based on your meal plan:</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Daily Calories', value: plan.nutritionSummary.calories, unit: 'kcal', color: '#FF6B00', icon: '🔥' },
                    { label: 'Protein', value: plan.nutritionSummary.protein, unit: '/day', color: '#7C3AED', icon: '💪' },
                    { label: 'Carbohydrates', value: plan.nutritionSummary.carbs, unit: '/day', color: '#22C55E', icon: '⚡' },
                    { label: 'Fat', value: plan.nutritionSummary.fat, unit: '/day', color: '#F59E0B', icon: '🫙' },
                    { label: 'Fiber', value: plan.nutritionSummary.fiber, unit: '/day', color: '#06B6D4', icon: '🌾' },
                  ].map((n, i) => (
                    <div key={i} className="p-4 rounded-2xl text-center"
                      style={{ background: n.color + '10', border: `1px solid ${n.color}20` }}>
                      <div className="text-2xl mb-1">{n.icon}</div>
                      <div className="text-lg font-black" style={{ color: n.color }}>{n.value}{n.unit}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{n.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-2xl text-sm"
                  style={{ background: 'rgba(34,197,94,0.08)', color: '#15803D' }}>
                  ✅ These estimates are based on general values. Actual nutrition may vary by portion size and preparation.
                </div>
              </div>
            )}
          </div>
        )}

        {!plan && (
          <div className="text-center py-8 text-gray-400">
            <div className="text-6xl mb-3">🍳</div>
            <p className="font-medium">Enter your ingredients above and hit Generate</p>
          </div>
        )}
      </div>
    </div>
  );
}