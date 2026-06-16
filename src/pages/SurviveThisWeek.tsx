import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface SurvivalPlan {
  emergencyMeals: { name: string; ingredients: string; instructions: string; cost: string }[];
  groceryPriorities: { item: string; reason: string; cost: string; priority: number }[];
  pantryTips: string[];
  communityResources: string[];
  strategy: string;
  dailyBudget: number;
  verdict: 'critical' | 'tight' | 'manageable';
}

function generateSurvivalPlan(
  moneyLeft: number,
  daysRemaining: number,
  foodAvailable: string[],
  transportation: string
): SurvivalPlan {
  const dailyBudget = moneyLeft / Math.max(daysRemaining, 1);
  const verdict: SurvivalPlan['verdict'] = dailyBudget < 2 ? 'critical' : dailyBudget < 5 ? 'tight' : 'manageable';

  const hasCar = transportation === 'car';
  const hasTransit = transportation !== 'walking' && transportation !== '';

  const emergencyMeals = [];

  // Build meals from available food
  const food = foodAvailable.map(f => f.toLowerCase());
  const hasRice = food.some(f => f.includes('rice'));
  const hasBeans = food.some(f => f.includes('bean') || f.includes('lentil'));
  const hasEggs = food.some(f => f.includes('egg'));
  const hasBread = food.some(f => f.includes('bread'));
  const hasPasta = food.some(f => f.includes('pasta') || f.includes('noodle'));
  const hasPB = food.some(f => f.includes('peanut'));
  const hasOats = food.some(f => f.includes('oat'));

  if (hasRice && hasBeans) {
    emergencyMeals.push({
      name: '🍚 Rice & Beans (3-Day Staple)',
      ingredients: 'Rice, beans, salt, water',
      instructions: 'Cook large batch of rice and beans. This is a complete protein. Eat for multiple meals. Costs pennies per serving.',
      cost: '~$0.60/serving',
    });
  }
  if (hasEggs) {
    emergencyMeals.push({
      name: '🥚 Boiled Egg Meal',
      ingredients: 'Eggs, salt, water',
      instructions: 'Hard boil 2-3 eggs. Cheap, high-protein, filling. Eat with rice or bread if available.',
      cost: '~$0.40/serving',
    });
  }
  if (hasBread && hasPB) {
    emergencyMeals.push({
      name: '🥜 Peanut Butter Bread',
      ingredients: 'Bread, peanut butter',
      instructions: 'Spread peanut butter on bread. 12g protein. No cooking needed. Can be carried anywhere.',
      cost: '~$0.35/serving',
    });
  }
  if (hasOats) {
    emergencyMeals.push({
      name: '🌾 Emergency Oatmeal',
      ingredients: 'Oats, water, salt, sugar (optional)',
      instructions: 'Cook oats with water. Filling and cheap. Add whatever sweetener you have.',
      cost: '~$0.25/serving',
    });
  }
  if (hasPasta) {
    emergencyMeals.push({
      name: '🍝 Plain Pasta',
      ingredients: 'Pasta, water, salt, oil',
      instructions: 'Boil pasta in salted water. Drain. Toss with a little oil and salt. Add egg or beans on top if available.',
      cost: '~$0.45/serving',
    });
  }

  // Always add a generic fallback
  if (emergencyMeals.length === 0) {
    emergencyMeals.push({
      name: '🍵 Survival Broth',
      ingredients: 'Water, salt, any vegetable scraps',
      instructions: 'Boil water with any vegetables, scraps, or seasoning. Fills stomach. Visit a food pantry TODAY.',
      cost: '~$0.10',
    });
  }

  const groceryPriorities = [];

  if (dailyBudget >= 1) {
    groceryPriorities.push({ item: 'Dried beans or lentils (1 lb)', reason: 'Most protein per dollar. Feeds 6-8 meals.', cost: '$1.00-1.50', priority: 1 });
  }
  if (dailyBudget >= 0.5) {
    groceryPriorities.push({ item: 'Rice (2 lb bag)', reason: 'Calorie density. Pairs with beans for complete nutrition.', cost: '$1.50-2.00', priority: 2 });
  }
  if (dailyBudget >= 1.5) {
    groceryPriorities.push({ item: 'Eggs (dozen)', reason: '12 meals of protein for $2-3. Most versatile emergency food.', cost: '$2.00-3.00', priority: 3 });
  }
  if (dailyBudget >= 1) {
    groceryPriorities.push({ item: 'Oats (store brand)', reason: 'Breakfast for a week. High fiber and filling.', cost: '$1.50-2.00', priority: 4 });
  }
  if (dailyBudget >= 0.5) {
    groceryPriorities.push({ item: 'Peanut butter (store brand)', reason: 'High calorie, protein, no refrigeration needed.', cost: '$2.00-3.00', priority: 5 });
  }

  const pantryTips = [
    'Food pantries give free groceries — no income requirement in most states',
    'Call 2-1-1 (free) for emergency food hotline in your area',
    'Most churches have weekly food distributions — walk in, no appointment needed',
    'Community fridges are free, public, and available 24/7 in many cities',
    'WIC provides free food for women, infants, and children — apply immediately',
    'School districts provide free meals to any child under 18 in summer',
    hasCar ? 'Farther food banks often have more stock and less wait times' : 'Ask a neighbor or call a community center for a ride to the food bank',
  ];

  const communityResources = [
    '📞 Call 211 (free, 24/7) — emergency food hotline',
    '🏛️ Local food bank — search feedingamerica.org/find-your-local-foodbank',
    '❄️ Community Fridge — search findafridge.com for nearest one',
    '⛪ Church food pantry — most open Tuesday/Thursday',
    '🏫 School district summer meals — free for kids under 18',
    hasTransit ? '🚌 Transit to larger food bank with more selection' : '🏘️ Neighborhood food pantry or mutual aid network',
  ];

  const strategies: Record<string, string> = {
    critical: `🚨 CRITICAL: With $${dailyBudget.toFixed(2)}/day, you need community resources NOW. Call 211 immediately for emergency food assistance. Visit a food pantry this week — it's free and you don't need to prove income in most locations. Focus spending only on beans, rice, and eggs. Every dollar counts.`,
    tight: `⚠️ TIGHT: $${dailyBudget.toFixed(2)}/day requires strategic shopping. Prioritize beans, rice, eggs, and oats — maximum nutrition per dollar. Find at least 1 food pantry visit this week to supplement. Avoid anything packaged or processed. Cook in bulk.`,
    manageable: `💡 MANAGEABLE: $${dailyBudget.toFixed(2)}/day is workable with smart choices. Shop store brands only. Buy in bulk where possible. Cook large batches and eat the same meals multiple days. Beans, rice, eggs, and oats stretch furthest.`,
  };

  return {
    emergencyMeals,
    groceryPriorities,
    pantryTips: pantryTips.slice(0, 5),
    communityResources,
    strategy: strategies[verdict],
    dailyBudget,
    verdict,
  };
}

export default function SurviveThisWeek() {
  const { userProfile } = useApp();
  const [moneyLeft, setMoneyLeft] = useState(15);
  const [daysRemaining, setDaysRemaining] = useState(7);
  const [foodInput, setFoodInput] = useState(userProfile.ingredients.join(', '));
  const [transport, setTransport] = useState<'walking' | 'bus' | 'car' | 'rideshare'>(
    (userProfile.transportation as 'walking' | 'bus' | 'car' | 'rideshare') || 'walking'
  );
  const [plan, setPlan] = useState<SurvivalPlan | null>(null);

  const generate = () => {
    const food = foodInput.split(/[,\n]+/).map(s => s.trim()).filter(Boolean);
    setPlan(generateSurvivalPlan(moneyLeft, daysRemaining, food, transport));
  };

  const verdictStyles = {
    critical: { bg: '#EF4444', text: 'CRITICAL SITUATION', emoji: '🚨' },
    tight: { bg: '#FF6B00', text: 'TIGHT SITUATION', emoji: '⚠️' },
    manageable: { bg: '#22C55E', text: 'MANAGEABLE SITUATION', emoji: '💪' },
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'linear-gradient(135deg, #FFF9F2 0%, #FFF0F0 100%)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
            🚨 Emergency Planning
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Survive This Week</h1>
          <p className="text-gray-500 mt-2">
            Tell us what you have left. We'll build your emergency survival plan.
          </p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                💵 Money Left: <span className="text-red-500">${moneyLeft}</span>
              </label>
              <input type="range" min={0} max={100} step={1} value={moneyLeft}
                onChange={e => setMoneyLeft(Number(e.target.value))}
                className="w-full accent-red-500" />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>$0</span><span>$100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                📅 Days Until Next Money: <span className="text-red-500">{daysRemaining} days</span>
              </label>
              <input type="range" min={1} max={31} step={1} value={daysRemaining}
                onChange={e => setDaysRemaining(Number(e.target.value))}
                className="w-full accent-red-500" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                🥫 Food You Currently Have
              </label>
              <textarea rows={2} value={foodInput}
                onChange={e => setFoodInput(e.target.value)}
                placeholder="e.g. rice, eggs, beans, bread, peanut butter..."
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm resize-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">🚗 Transportation</label>
              <div className="flex gap-2 flex-wrap">
                {(['walking', 'bus', 'car', 'rideshare'] as const).map(t => (
                  <button key={t} onClick={() => setTransport(t)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium capitalize transition-all ${
                      transport === t ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600'
                    }`}>
                    {t === 'walking' ? '🚶' : t === 'bus' ? '🚌' : t === 'car' ? '🚗' : '🚕'} {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={generate}
            className="w-full mt-5 py-4 rounded-2xl text-white font-black text-lg transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #EF4444, #FF6B00)' }}>
            🚨 Generate Survival Plan
          </button>
        </div>

        {/* Results */}
        {plan && (
          <div className="space-y-4 animate-slide-up">
            {/* Verdict */}
            <div className="p-5 rounded-3xl text-white text-center"
              style={{ background: verdictStyles[plan.verdict].bg }}>
              <div className="text-3xl mb-1">{verdictStyles[plan.verdict].emoji}</div>
              <div className="text-xl font-black">{verdictStyles[plan.verdict].text}</div>
              <div className="text-white/80 text-sm mt-1">
                ${plan.dailyBudget.toFixed(2)}/day · {daysRemaining} days remaining
              </div>
            </div>

            {/* Strategy */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-black text-gray-900 mb-3">📋 Your Survival Strategy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{plan.strategy}</p>
            </div>

            {/* Emergency meals */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-black text-gray-900 mb-4">🍽️ Emergency Meal Plan</h3>
              <div className="space-y-3">
                {plan.emergencyMeals.map((meal, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-red-100"
                    style={{ background: 'rgba(239,68,68,0.04)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-gray-900 text-sm">{meal.name}</div>
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{meal.cost}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1.5">
                      <span className="font-semibold">Needs:</span> {meal.ingredients}
                    </div>
                    <div className="text-xs text-gray-500">{meal.instructions}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grocery priorities */}
            {plan.groceryPriorities.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-black text-gray-900 mb-4">🛒 Grocery Priority List</h3>
                <p className="text-xs text-gray-400 mb-3">Buy in this order if you have money to spend:</p>
                <div className="space-y-2">
                  {plan.groceryPriorities.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-2xl"
                      style={{ background: 'rgba(255,107,0,0.05)' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ background: '#FF6B00' }}>
                        {item.priority}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">{item.item}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.reason}</div>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Community resources */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-black text-gray-900 mb-4">🏛️ Free Community Resources</h3>
              <div className="space-y-2">
                {plan.communityResources.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl text-sm text-gray-700"
                    style={{ background: 'rgba(34,197,94,0.06)' }}>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Pantry tips */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-black text-gray-900 mb-4">💡 Survival Tips</h3>
              <ul className="space-y-2">
                {plan.pantryTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-orange-500 mt-0.5">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
