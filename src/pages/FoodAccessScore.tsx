import { useState, useEffect } from 'react';
import { useApp, getZipData } from '../context/AppContext';

function ScoreRing({ score }: { score: number }) {
  const [animated, setAnimated] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + 2, score);
        setAnimated(current);
        if (current >= score) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const color = score >= 80 ? '#22C55E' : score >= 60 ? '#FF6B00' : score >= 40 ? '#FF8A65' : '#EF4444';
  const label = score >= 80 ? 'Strong Access' : score >= 60 ? 'Moderate Access' : score >= 40 ? 'Limited Access' : 'Food Desert Risk';
  const emoji = score >= 80 ? '✅' : score >= 60 ? '⚠️' : score >= 40 ? '🟠' : '🚨';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52">
        <svg className="transform -rotate-90 w-52 h-52">
          <circle cx="104" cy="104" r={radius} stroke="#E5E7EB" strokeWidth="14" fill="none" />
          <circle
            cx="104" cy="104" r={radius}
            stroke={color} strokeWidth="14" fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.05s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-black animate-score" style={{ color }}>{animated}</div>
          <div className="text-gray-400 text-sm font-medium">/100</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-2xl">{emoji}</div>
        <div className="text-xl font-black mt-1" style={{ color }}>{label}</div>
      </div>
    </div>
  );
}

function FactorBar({ label, value, max, color, icon }: { label: string; value: number; max: number; color: string; icon: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 400);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 font-medium">{icon} {label}</span>
        <span className="font-bold" style={{ color }}>{value}/{max}</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function FoodAccessScore() {
  const { userProfile, setCurrentPage, foodAccessScore } = useApp();

  if (!userProfile.isSetupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Set Up Your Profile First</h2>
          <p className="text-gray-500 mb-6">We need your info to calculate your personal Food Access Score.</p>
          <button
            onClick={() => setCurrentPage('setup')}
            className="px-6 py-3 rounded-2xl text-white font-bold shadow-orange"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' }}>
            Complete Profile →
          </button>
        </div>
      </div>
    );
  }

  const zipInfo = getZipData(userProfile.zipCode);
  const perPerson = userProfile.weeklyBudget / Math.max(userProfile.familySize, 1);

  const transportScore = { car: 25, rideshare: 20, bus: 15, walking: 8, '': 12 }[userProfile.transportation] || 12;
  const kitchenScore = { full: 20, microwave: 14, none: 8, '': 15 }[userProfile.kitchenAccess] || 15;
  const budgetScore = perPerson >= 35 ? 20 : perPerson >= 20 ? 15 : perPerson >= 10 ? 10 : 5;
  const locationScore = Math.round((1 - zipInfo.foodDesertRisk) * 25);
  const snapScore = userProfile.snapStatus ? 10 : 0;

  const score = foodAccessScore;
  const scoreColor = score >= 80 ? '#22C55E' : score >= 60 ? '#FF6B00' : score >= 40 ? '#FF8A65' : '#EF4444';

  const improvements = [];
  if (!userProfile.snapStatus) improvements.push({ text: 'Apply for SNAP benefits — adds up to +10 points', link: 'https://www.fns.usda.gov/snap/apply' });
  if (userProfile.transportation === 'walking') improvements.push({ text: 'Check for free bus passes or community shuttles', link: '#resources' });
  if (perPerson < 20) improvements.push({ text: 'Use food pantries to stretch your budget', link: '#resources' });
  if (zipInfo.foodDesertRisk > 0.6) improvements.push({ text: 'Community fridges and pantries are nearby — check Resources', link: '#resources' });

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'linear-gradient(135deg, #FFF9F2 0%, #F3EEFF 100%)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
            Your Food Access Report
          </div>
          <h1 className="text-3xl font-black text-gray-900">Food Access Score</h1>
          {userProfile.zipCode && (
            <p className="text-gray-500 text-sm mt-1">
              Based on ZIP {userProfile.zipCode} · {zipInfo.city}, {zipInfo.state}
            </p>
          )}
        </div>

        {/* Score ring */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center mb-6">
          <ScoreRing score={score} />
          <p className="text-gray-500 text-sm mt-4 max-w-xs mx-auto">
            {score >= 80
              ? 'You have good food access. Let\'s optimize your nutrition and savings.'
              : score >= 60
              ? 'Some barriers exist. Everbite will help you navigate them.'
              : score >= 40
              ? 'Significant barriers detected. Use our tools to find support.'
              : 'You\'re in a food desert risk zone. Urgent resources are available for you.'}
          </p>
        </div>

        {/* Score breakdown */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-black text-gray-900 mb-5">Score Breakdown</h3>
          <div className="space-y-4">
            <FactorBar label="Location & Food Access" value={locationScore} max={25} color="#7C3AED" icon="📍" />
            <FactorBar label="Transportation" value={transportScore} max={25} color="#FF6B00" icon="🚗" />
            <FactorBar label="Kitchen Access" value={kitchenScore} max={20} color="#22C55E" icon="🏠" />
            <FactorBar label="Budget Adequacy" value={budgetScore} max={20} color="#06B6D4" icon="💰" />
            <FactorBar label="SNAP/EBT Benefits" value={snapScore} max={10} color="#F59E0B" icon="🎫" />
          </div>
        </div>

        {/* Area intel */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Food Pantries Nearby', value: zipInfo.pantryCount, icon: '🏛️', color: '#7C3AED' },
            { label: 'Grocery Stores', value: zipInfo.storeCount, icon: '🛒', color: '#22C55E' },
            { label: 'Desert Risk', value: `${Math.round(zipInfo.foodDesertRisk * 100)}%`, icon: '🏜️', color: '#EF4444' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xl font-black" style={{ color: item.color }}>{item.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Improvement tips */}
        {improvements.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="font-black text-gray-900 mb-4">🎯 Ways to Improve Your Score</h3>
            <div className="space-y-3">
              {improvements.map((imp, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl"
                  style={{ background: 'rgba(255,107,0,0.05)' }}>
                  <span className="text-orange-500 mt-0.5">→</span>
                  <span className="text-sm text-gray-700">{imp.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentPage('mealplanner')}
            className="py-4 rounded-2xl text-white font-bold shadow-orange transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' }}>
            🍳 Plan My Meals
          </button>
          <button
            onClick={() => setCurrentPage('resources')}
            className="py-4 rounded-2xl text-white font-bold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
            📍 Find Resources
          </button>
        </div>

        <button
          onClick={() => setCurrentPage('setup')}
          className="w-full mt-3 py-3 rounded-2xl text-gray-500 text-sm hover:bg-gray-100 transition-all">
          ← Update My Profile
        </button>
      </div>
    </div>
  );
}
