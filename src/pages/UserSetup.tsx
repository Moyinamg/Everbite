import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { validateUserSetupForm, hasFormErrors, validateZipCode } from '../utils/zipValidation';

const steps = ['Location & Budget', 'Household', 'Access & Kitchen', 'Food Preferences'];

const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Diabetic-Friendly', 'Low-Sodium', 'Dairy-Free'];

export default function UserSetup() {
  const { userProfile, setUserProfile, setCurrentPage } = useApp();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ...userProfile });
  const [ingredientInput, setIngredientInput] = useState(userProfile.ingredients.join(', '));
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});

  const update = (field: string, value: unknown) => {
    setForm(f => ({ ...f, [field]: value }));
    setFieldTouched(t => ({ ...t, [field]: true }));
  };

  const toggleDiet = (d: string) => {
    const updated = form.dietaryNeeds.includes(d)
      ? form.dietaryNeeds.filter(x => x !== d)
      : [...form.dietaryNeeds, d];
    update('dietaryNeeds', updated);
  };

  // Validate current step
  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 0) {
      // ZIP validation
      const zipValidation = validateZipCode(form.zipCode);
      if (!zipValidation.isValid && zipValidation.error) {
        errors.zipCode = zipValidation.error;
      }
      
      // Budget validation
      if (form.weeklyBudget < 10) {
        errors.weeklyBudget = 'Weekly budget must be at least $10';
      } else if (form.weeklyBudget > 1000) {
        errors.weeklyBudget = 'Weekly budget cannot exceed $1000';
      }
      
      // SNAP status validation
      if (form.snapStatus === undefined) {
        errors.snapStatus = 'Please select SNAP/EBT status';
      }
    }
    
    if (step === 1) {
      // Family size validation
      if (form.familySize < 1) {
        errors.familySize = 'Family size must be at least 1';
      } else if (form.familySize > 20) {
        errors.familySize = 'Family size cannot exceed 20';
      }
      
      // Budget per person validation
      const perPerson = form.weeklyBudget / form.familySize;
      if (perPerson < 5) {
        errors.budgetPerPerson = `Budget per person ($${perPerson.toFixed(2)}) is very low. Consider increasing your budget for adequate nutrition.`;
      }
    }
    
    if (step === 2) {
      // Transportation validation
      if (!form.transportation) {
        errors.transportation = 'Please select your transportation method';
      }
      
      // Kitchen access validation
      if (!form.kitchenAccess) {
        errors.kitchenAccess = 'Please select your kitchen access level';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep()) {
      return;
    }
    
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    const ingredients = ingredientInput
      .split(/[,\n]+/)
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);
    const final = { ...form, ingredients, isSetupComplete: true };
    setUserProfile(final);
    setCurrentPage('score');
  };

  const progress = ((step + 1) / steps.length) * 100;

  // Show error only if field has been touched
  const showError = (field: string) => {
    return validationErrors[field] && fieldTouched[field];
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: 'linear-gradient(135deg, #FFF9F2 0%, #F3EEFF 100%)' }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
            Step {step + 1} of {steps.length}
          </div>
          <h1 className="text-3xl font-black text-gray-900">{steps[step]}</h1>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF6B00, #7C3AED)' }} />
          </div>
        </div>

        {/* Step cards */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">

          {step === 0 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder="e.g. 60619"
                  value={form.zipCode}
                  onChange={e => update('zipCode', e.target.value)}
                  onBlur={() => setFieldTouched(t => ({ ...t, zipCode: true }))}
                  className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 text-gray-900 font-medium ${
                    showError('zipCode') 
                      ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                      : 'border-gray-200 focus:ring-orange-400'
                  }`}
                />
                {showError('zipCode') && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.zipCode}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Used to assess food access in your area</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Weekly Food Budget: <span className="text-orange-500">${form.weeklyBudget}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={300}
                  step={5}
                  value={form.weeklyBudget}
                  onChange={e => update('weeklyBudget', Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$10</span><span>$300/week</span>
                </div>
                {showError('weeklyBudget') && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.weeklyBudget}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  SNAP / EBT Benefits <span className="text-red-500">*</span>
                </label>
                {showError('snapStatus') && (
                  <p className="text-xs text-red-600 mb-2">{validationErrors.snapStatus}</p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {[{ v: true, l: '✅ Yes, I use SNAP' }, { v: false, l: '❌ No SNAP Benefits' }].map(opt => (
                    <button key={String(opt.v)}
                      onClick={() => update('snapStatus', opt.v)}
                      className={`p-3 rounded-2xl border text-sm font-medium transition-all ${
                        form.snapStatus === opt.v
                          ? 'border-green-400 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Family / Household Size: <span className="text-orange-500">{form.familySize} {form.familySize === 1 ? 'person' : 'people'}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form.familySize}
                  onChange={e => update('familySize', Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Just Me</span><span>10 People</span>
                </div>
                {showError('familySize') && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.familySize}</p>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1.5">
                  Budget per person: <span className="text-green-600 font-bold">
                    ${(form.weeklyBudget / form.familySize).toFixed(0)}/week
                  </span>
                </p>
                <div className="p-3 rounded-2xl text-sm"
                  style={{ background: 'rgba(34,197,94,0.08)', color: '#16A34A' }}>
                  {form.weeklyBudget / form.familySize >= 35
                    ? '✅ Good budget per person for healthy eating'
                    : form.weeklyBudget / form.familySize >= 20
                    ? '⚠️ Tight but manageable with smart planning'
                    : '🚨 Very tight — Everbite will find you every resource available'}
                </div>
                {showError('budgetPerPerson') && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.budgetPerPerson}</p>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Transportation <span className="text-red-500">*</span>
                </label>
                {showError('transportation') && (
                  <p className="text-xs text-red-600 mb-2">{validationErrors.transportation}</p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: 'walking', l: '🚶 Walking', sub: 'Within 0.5 miles' },
                    { v: 'bus', l: '🚌 Public Bus', sub: 'Bus/transit access' },
                    { v: 'car', l: '🚗 Own Car', sub: 'Full mobility' },
                    { v: 'rideshare', l: '🚕 Rideshare', sub: 'Uber/Lyft/etc.' },
                  ].map(opt => (
                    <button key={opt.v}
                      onClick={() => update('transportation', opt.v)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        form.transportation === opt.v
                          ? 'border-orange-400 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div className="font-medium text-sm text-gray-800">{opt.l}</div>
                      <div className="text-xs text-gray-400">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kitchen Access <span className="text-red-500">*</span>
                </label>
                {showError('kitchenAccess') && (
                  <p className="text-xs text-red-600 mb-2">{validationErrors.kitchenAccess}</p>
                )}
                <div className="space-y-2">
                  {[
                    { v: 'full', l: '🏠 Full Kitchen', sub: 'Stove, oven, fridge' },
                    { v: 'microwave', l: '📦 Microwave Only', sub: 'Limited cooking ability' },
                    { v: 'none', l: '🏕️ No Kitchen', sub: 'Shelter / outdoors / car' },
                  ].map(opt => (
                    <button key={opt.v}
                      onClick={() => update('kitchenAccess', opt.v)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                        form.kitchenAccess === opt.v
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div>
                        <div className="font-medium text-sm text-gray-800">{opt.l}</div>
                        <div className="text-xs text-gray-400">{opt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Needs (select all that apply)</label>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map(d => (
                    <button key={d}
                      onClick={() => toggleDiet(d)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        form.dietaryNeeds.includes(d)
                          ? 'border-green-400 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                      {form.dietaryNeeds.includes(d) ? '✓ ' : ''}{d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  What ingredients do you have? <span className="text-gray-400 font-normal">(comma separated)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. rice, beans, eggs, bread, peanut butter, onions..."
                  value={ingredientInput}
                  onChange={e => setIngredientInput(e.target.value)}
                  onBlur={() => {
                    const ingredients = ingredientInput
                      .split(/[,\n]+/)
                      .map(s => s.trim().toLowerCase())
                      .filter(Boolean);
                    update('ingredients', ingredients);
                  }}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900 text-sm resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  The more you enter, the better your personalized meal plan will be
                </p>
              </div>
            </>
          )}
        </div>

        {/* Error summary */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-sm mb-1">
              <span>⚠️</span>
              <span>Please fix the following errors:</span>
            </div>
            <ul className="text-xs text-red-600 list-disc pl-4 space-y-0.5">
              {Object.values(validationErrors).map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleContinue}
            className="flex-1 py-3.5 rounded-2xl text-white font-bold text-base transition-all hover:scale-105 shadow-orange"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' }}
          >
            {step < steps.length - 1 ? 'Continue →' : '🎯 See My Food Access Score'}
          </button>
        </div>
      </div>
    </div>
  );
}