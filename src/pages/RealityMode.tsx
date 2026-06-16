import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const personas = [
  {
    id: 'maria',
    name: 'Maria',
    emoji: '👩‍👧',
    role: 'Single Parent',
    location: 'South Side Chicago, IL',
    budget: '$25/week',
    family: '3 (2 kids)',
    transportation: 'Walking only',
    snap: true,
    kitchen: 'Full kitchen',
    score: 31,
    color: '#FF6B00',
    story: 'Maria works two part-time jobs and has two kids aged 6 and 9. She doesn\'t have a car and the nearest grocery store is 1.8 miles away. She uses SNAP but it runs out before the month ends.',
    challenges: [
      { icon: '🚶', label: 'Transportation Burden', severity: 'high', detail: '1.8 miles to nearest grocery — 36+ min walk with kids and bags' },
      { icon: '💰', label: 'Budget Burden', severity: 'high', detail: '$8.33/person/week — far below the $25 minimum nutritionists recommend' },
      { icon: '🏜️', label: 'Food Desert Risk', severity: 'critical', detail: 'ZIP 60619 has 3 food pantries and only 2 affordable grocery stores' },
      { icon: '🕐', label: 'Time Poverty', severity: 'medium', detail: 'Working two jobs leaves minimal time for meal prep' },
    ],
    resources: ['Greater Chicago Food Depository', 'SNAP at Aldi on 79th St', 'St. Sabina Church Food Pantry'],
    survival: 'Maria relies on the food pantry on Tuesdays and stretches beans and rice all week. Her kids get free lunch at school.',
  },
  {
    id: 'james',
    name: 'James',
    emoji: '👨‍🎓',
    role: 'College Student',
    location: 'Detroit, MI',
    budget: '$30/week',
    family: '1',
    transportation: 'Bus',
    snap: false,
    kitchen: 'Microwave only',
    score: 44,
    color: '#7C3AED',
    story: 'James is a 19-year-old college freshman in Detroit. He lives in a dorm with only a microwave. His financial aid covers tuition but not food. He doesn\'t qualify for SNAP as a full-time student.',
    challenges: [
      { icon: '📦', label: 'Kitchen Limitation', severity: 'high', detail: 'Microwave-only kitchen severely limits cooking options and nutrition' },
      { icon: '💰', label: 'SNAP Ineligibility', severity: 'high', detail: 'Most full-time students don\'t qualify for SNAP — a systemic gap' },
      { icon: '🚌', label: 'Transit Dependency', severity: 'medium', detail: 'Bus takes 25 min to nearest grocery store — time and money cost' },
      { icon: '📚', label: 'Study Burden', severity: 'medium', detail: 'No time for complex meal prep between classes and work-study' },
    ],
    resources: ['University Food Pantry (free for students)', 'Campus dining SNAP-Ed program', 'Local church meal programs'],
    survival: 'James uses the campus food pantry and lives on ramen, microwave pasta, and eggs. He found the campus food pantry last month.',
  },
  {
    id: 'dorothy',
    name: 'Dorothy',
    emoji: '👵',
    role: 'Retired Elderly',
    location: 'Atlanta, GA',
    budget: '$45/week',
    family: '1',
    transportation: 'Walking (limited)',
    snap: true,
    kitchen: 'Full kitchen',
    score: 52,
    color: '#22C55E',
    story: 'Dorothy is 72 years old, retired, and lives alone in Atlanta. She has a fixed income from Social Security. Her mobility is limited due to arthritis. She can\'t carry heavy bags or walk far.',
    challenges: [
      { icon: '🦽', label: 'Mobility Barrier', severity: 'high', detail: 'Arthritis limits walking distance to 0.3 miles — isolates food access' },
      { icon: '🌡️', label: 'Health-Based Dietary Needs', severity: 'medium', detail: 'Diabetic diet requires specific low-sugar, low-sodium foods — harder to find cheap' },
      { icon: '📦', label: 'Carrying Capacity', severity: 'high', detail: 'Cannot carry more than 5 lbs — limits bulk buying savings' },
      { icon: '💻', label: 'Digital Divide', severity: 'medium', detail: 'Limited tech access makes finding resources harder' },
    ],
    resources: ['Senior Meals on Wheels', 'AARP Foundation Food Assistance', 'Community Center Senior Lunch Program'],
    survival: 'Dorothy gets Meals on Wheels 3x a week. A neighbor drives her to Aldi once a month for bulk staples.',
  },
  {
    id: 'johnson',
    name: 'Johnson Family',
    emoji: '👨‍👩‍👧‍👦',
    role: 'Family of 5',
    location: 'Phoenix, AZ',
    budget: '$120/week',
    family: '5',
    transportation: 'Car',
    snap: true,
    kitchen: 'Full kitchen',
    score: 58,
    color: '#FF8A65',
    story: 'The Johnson family has 2 parents and 3 kids (ages 5, 9, 12). Both parents work but lost one income last year. Their Phoenix neighborhood has high heat making walking dangerous and a single discount store.',
    challenges: [
      { icon: '🌡️', label: 'Extreme Heat', severity: 'high', detail: 'Phoenix heat (115°F summers) makes food shopping dangerous without AC' },
      { icon: '🏪', label: 'Limited Retail', severity: 'high', detail: 'Only one discount food store in the neighborhood — no competition = high prices' },
      { icon: '👶', label: 'Child Nutrition Gap', severity: 'medium', detail: '3 growing children with different needs on $24/person/week' },
      { icon: '💸', label: 'Income Instability', severity: 'high', detail: 'Lost income creates month-to-month food uncertainty' },
    ],
    resources: ['St. Mary\'s Food Bank (Phoenix)', 'SNAP at Fry\'s Grocery', 'School breakfast/lunch programs'],
    survival: 'Kids get free school breakfast and lunch. Parents eat smaller portions to ensure kids eat well. SNAP helps with bulk rice and beans.',
  },
  {
    id: 'alex',
    name: 'Alex',
    emoji: '👷',
    role: 'Shift Worker',
    location: 'Houston, TX',
    budget: '$55/week',
    family: '2',
    transportation: 'Car (night shift)',
    snap: false,
    kitchen: 'Full kitchen',
    score: 61,
    color: '#06B6D4',
    story: 'Alex works 12-hour night shifts at a warehouse. By the time they\'re off work, most food stores are closed. They sleep during the day when stores are open. Their income is above the SNAP threshold despite high expenses.',
    challenges: [
      { icon: '🌙', label: 'Schedule Mismatch', severity: 'high', detail: 'Works 11pm-11am — most grocery stores closed when off work' },
      { icon: '😴', label: 'Exhaustion', severity: 'medium', detail: 'Too tired after shift to cook — leads to expensive fast food dependency' },
      { icon: '🚫', label: 'SNAP Gap', severity: 'medium', detail: 'Earns slightly above SNAP threshold but can\'t afford consistent groceries' },
      { icon: '🏪', label: 'Late Night Access', severity: 'high', detail: 'Only 24hr options are convenience stores with junk food at 3x grocery prices' },
    ],
    resources: ['24hr Walmart grocery section', 'Meal prepping on days off', 'Community fridge programs'],
    survival: 'Alex batch cooks on weekends — large pots of rice, beans, and pasta. Uses slow cooker so food is ready when they wake up.',
  },
];

const severityColors: Record<string, string> = {
  critical: '#EF4444',
  high: '#FF6B00',
  medium: '#F59E0B',
  low: '#22C55E',
};

export default function RealityMode() {
  const { setCurrentPage } = useApp();
  const [selected, setSelected] = useState<string | null>(null);

  const persona = personas.find(p => p.id === selected);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
            🎭 Real Stories
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Reality Mode</h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            See food access through the eyes of real Americans. Choose a person to explore their daily food reality.
          </p>
        </div>

        {/* Persona selector */}
        {!selected && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 text-left card-hover group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: p.color + '15' }}>
                    {p.emoji}
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.role}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-3">{p.location}</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-xs font-medium text-gray-600">Food Access Score:</div>
                  <div className="text-sm font-black" style={{
                    color: p.score >= 60 ? '#22C55E' : p.score >= 40 ? '#FF6B00' : '#EF4444'
                  }}>
                    {p.score}/100
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{p.budget}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{p.transportation}</span>
                </div>
                <div className="mt-3 text-xs font-semibold transition-transform group-hover:translate-x-1"
                  style={{ color: p.color }}>
                  View Reality →
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Persona detail view */}
        {persona && (
          <div className="animate-slide-up">
            <button onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-gray-500 text-sm mb-4 hover:text-gray-700">
              ← Back to Personas
            </button>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: persona.color + '15' }}>
                  {persona.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{persona.name}</h2>
                  <div className="text-gray-500">{persona.role} · {persona.location}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold" style={{
                      color: persona.score >= 60 ? '#22C55E' : persona.score >= 40 ? '#FF6B00' : '#EF4444'
                    }}>
                      Food Access Score: {persona.score}/100
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{persona.story}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Budget', value: persona.budget, icon: '💰' },
                { label: 'Household', value: `${persona.family} person(s)`, icon: '👥' },
                { label: 'Transport', value: persona.transportation, icon: '🚗' },
                { label: 'SNAP', value: persona.snap ? 'Yes' : 'No', icon: '🎫' },
                { label: 'Kitchen', value: persona.kitchen, icon: '🏠' },
                { label: 'Per Person', value: `$${(parseInt(persona.budget.replace(/\D/g, '')) / parseInt(persona.family.split(' ')[0])).toFixed(0)}/wk`, icon: '📊' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
                  <div className="text-lg mb-1">{s.icon}</div>
                  <div className="text-sm font-black text-gray-800">{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Challenges */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mb-5">
              <h3 className="font-black text-gray-900 mb-4">🚧 Food Access Challenges</h3>
              <div className="space-y-3">
                {persona.challenges.map((c, i) => (
                  <div key={i} className="p-3 rounded-2xl border"
                    style={{ borderColor: severityColors[c.severity] + '40', background: severityColors[c.severity] + '08' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{c.icon}</span>
                      <span className="font-bold text-sm text-gray-800">{c.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full ml-auto font-semibold"
                        style={{ background: severityColors[c.severity] + '20', color: severityColors[c.severity] }}>
                        {c.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Survival reality */}
            <div className="p-4 rounded-2xl mb-5 text-sm"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: '#991B1B' }}>
              <div className="font-bold mb-1">🔴 How {persona.name} Actually Survives</div>
              {persona.survival}
            </div>

            {/* Local resources */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mb-5">
              <h3 className="font-black text-gray-900 mb-3">📍 Resources {persona.name} Uses</h3>
              <div className="space-y-2">
                {persona.resources.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl"
                    style={{ background: 'rgba(34,197,94,0.06)' }}>
                    <span className="text-green-500">✓</span>
                    <span className="text-sm text-gray-700">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setCurrentPage('mealplanner')}
                className="py-3.5 rounded-2xl text-white font-bold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' }}>
                Plan Their Meals
              </button>
              <button onClick={() => setCurrentPage('resources')}
                className="py-3.5 rounded-2xl text-white font-bold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
                Find Resources
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
