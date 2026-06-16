import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const TOPIC_KEYWORDS = [
  'food', 'meal', 'eat', 'hunger', 'snap', 'ebt', 'grocery', 'budget', 'nutrition',
  'pantry', 'desert', 'access', 'ingredient', 'cook', 'recipe', 'calorie', 'protein',
  'vitamin', 'diet', 'wic', 'benefit', 'assistance', 'free', 'resource', 'help', 'hungry',
  'cheap', 'affordable', 'price', 'cost', 'store', 'market', 'organic', 'healthy', 'vegetable',
  'fruit', 'bean', 'rice', 'eggs', 'bread', 'pasta', 'chicken', 'fish', 'meat', 'dairy',
  'milk', 'cheese', 'survive', 'emergency', 'crisis', 'week', 'month', 'family', 'children',
  'kids', 'elderly', 'senior', 'student', 'everbite', 'founder', 'cmo', 'who',
  'nutrition', 'poverty', 'assistance', 'program', 'help', 'hunger', 'security',
  'cook', 'kitchen', 'oven', 'microwave', 'stove', 'fridge', 'freeze', 'storage',
  'healthy', 'weight', 'diet', 'exercise', 'health', 'medical', 'doctor', 'clinic',
  'pregnant', 'baby', 'infant', 'toddler', 'child', 'school', 'lunch', 'breakfast',
  'dinner', 'lunch', 'supper', 'snack', 'beverage', 'drink', 'water', 'juice',
  'allergy', 'gluten', 'vegan', 'vegetarian', 'halal', 'kosher', 'dietary',
  'income', 'money', 'finance', 'poor', 'broke', 'struggling', 'help', 'need',
  'transport', 'bus', 'walk', 'car', 'drive', 'distance', 'mile', 'location',
  'zoo', 'movie', 'math', 'homework', 'game', 'sports', 'weather', 'news', 'politics'
];

function isOnTopic(message: string): boolean {
  const lower = message.toLowerCase();
  const offTopicKeywords = ['math', 'homework', 'solve', 'calculate', 'weather', 'news', 'politics', 'sports', 'game', 'movie', 'zoo', 'entertainment', 'joke', 'funny'];
  
  // First check for explicit off-topic keywords
  if (offTopicKeywords.some(kw => lower.includes(kw))) {
    return false;
  }
  
  // Then check for topic keywords
  return TOPIC_KEYWORDS.some(kw => lower.includes(kw));
}

function generateResponse(message: string, profile: { weeklyBudget: number; familySize: number; transportation: string; snapStatus: boolean; zipCode: string; ingredients: string[]; kitchenAccess: string; dietaryNeeds: string[] }): string {
  const lower = message.toLowerCase();
  const perPerson = profile.weeklyBudget / Math.max(profile.familySize, 1);
  const hasProfile = profile.zipCode !== '';
  
  // Detect response length preference
  const wantsBrief = lower.includes('brief') || lower.includes('short') || lower.includes('concise') || lower.includes('summarize');
  const wantsDetailed = lower.includes('detail') || lower.includes('elaborate') || lower.includes('explain') || lower.includes('long') || lower.includes('comprehensive');
  
  const formatResponse = (response: string, isBrief: boolean, isDetailed: boolean) => {
    if (isBrief) {
      // For brief responses, take first 2-3 sentences
      const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
      return sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '...' : '.');
    } else if (isDetailed) {
      // For detailed responses, add more information if available
      if (response.includes('SNAP')) {
        return response + "\n\n**Additional detailed information about SNAP:**\n• The average SNAP benefit is $1.40 per person per meal\n• You can use SNAP at farmer's markets in all 50 states\n• Online grocery shopping with SNAP is available in most states\n• SNAP benefits cannot be used for alcohol, tobacco, vitamins, or hot prepared foods\n• If you're denied SNAP, you have the right to appeal within 90 days";
      }
      if (response.includes('budget') || response.includes('cheap')) {
        return response + "\n\n**Additional budget-saving strategies:**\n• Cook in bulk and freeze portions for later\n• Use store loyalty programs for extra discounts\n• Shop early morning for discounted day-old bread\n• Buy meat in family packs and freeze individual portions\n• Use apps like TooGoodToGo or Flashfood for discounted groceries\n• Grow herbs and simple vegetables in containers";
      }
    }
    return response;
  };

  // Founder questions
  if (lower.includes('founder') || lower.includes('founded') || lower.includes('who created') || lower.includes('who made') || lower.includes('who built')) {
    const baseResponse = "Everbite was founded by **Moyinoluwa Ajibade**, a passionate advocate for food justice and technology-driven solutions to food insecurity. The co-founders are **Hadassah Yakubu** and **Aasiyah Adeoti**. Together, they built Everbite to ensure that no American has to navigate the food system alone.";
    return formatResponse(baseResponse, wantsBrief, wantsDetailed);
  }
  if (lower.includes('cmo') || lower.includes('chief marketing') || lower.includes('moyinoluwa')) {
    const baseResponse = "**Moyinoluwa Ajibade** is the Founder of Everbite. She leads the vision to connect millions of food-insecure Americans with Everbite's life-changing tools, alongside co-founders **Hadassah Yakubu** and **Aasiyah Adeoti**.";
    return formatResponse(baseResponse, wantsBrief, wantsDetailed);
  }
  if (lower.includes('hadassah') || lower.includes('aasiyah') || lower.includes('co-founder') || lower.includes('cofounder')) {
    const baseResponse = "Everbite's co-founders are **Hadassah Yakubu** and **Aasiyah Adeoti**, who joined founder **Moyinoluwa Ajibade** in building this platform to fight food insecurity across America.";
    return formatResponse(baseResponse, wantsBrief, wantsDetailed);
  }

  // SNAP questions
  if (lower.includes('snap') || lower.includes('ebt') || lower.includes('food stamp')) {
    let response = "**SNAP (Supplemental Nutrition Assistance Program)** — here's what you need to know:\n\n";
    if (profile.snapStatus) {
      response += "✅ Great news — you're already receiving SNAP benefits!\n\n";
      response += "**Tips to maximize your SNAP:**\n";
      response += "• Shop at stores with EBT acceptance (Aldi, Walmart, Save-a-Lot have best prices)\n";
      response += "• Buy store brands — same nutrition, 30-40% cheaper\n";
      response += "• Stock up on beans, rice, oats, and eggs — most nutrition per SNAP dollar\n";
      response += "• Check if your state has SNAP farmers market matches (doubles your benefit)\n";
    } else {
      response += "**How to apply for SNAP:**\n";
      response += "1. Visit benefits.gov or your state's SNAP website\n";
      response += "2. Or call 1-800-221-5689 (free)\n";
      response += "3. Approval usually takes 30 days (7 days if expedited)\n\n";
      response += "**Who qualifies:**\n";
      response += `• A family of ${profile.familySize} may qualify if income is under ~$${(profile.familySize * 1600).toLocaleString()}/month\n`;
      response += "• Even if you earn income, you may still qualify\n";
      response += "• Undocumented immigrants generally don't qualify but citizen children in mixed families do\n";
    }
    return response;
  }

  // Budget meal planning
  if ((lower.includes('budget') || lower.includes('cheap') || lower.includes('afford') || lower.includes('low cost')) && (lower.includes('meal') || lower.includes('eat') || lower.includes('food'))) {
    let response = hasProfile
      ? `With your budget of $${profile.weeklyBudget}/week for ${profile.familySize} person${profile.familySize > 1 ? 's' : ''} ($${perPerson.toFixed(0)}/person), here's how to eat well:\n\n`
      : "Here's how to eat well on a tight budget:\n\n";
    response += "**Best budget foods (most nutrition per dollar):**\n";
    response += "• 🫘 Dried beans/lentils — $1.20/lb, 8+ servings, complete protein with rice\n";
    response += "• 🍚 Rice — $1.50 for 2lb bag, calorie-dense base for dozens of meals\n";
    response += "• 🥚 Eggs — $2-3/dozen, 12 servings of high-quality protein\n";
    response += "• 🌾 Oats — $1.50 for a week of breakfasts\n";
    response += "• 🥜 Peanut butter — $2-3, lasts weeks, high protein and calories\n\n";
    response += "**Avoid:** Pre-packaged meals, name brands, snack foods — same nutrition, 2-3x cost\n";
    response += "\n💡 Want me to generate a specific meal plan? Go to the **Meal Planner** tab!";
    return response;
  }

  // Ingredient questions
  if (lower.includes('ingredient') || lower.includes('what can i make') || lower.includes('what to cook') || lower.includes('recipe')) {
    if (profile.ingredients.length > 0) {
      const ings = profile.ingredients.slice(0, 5).join(', ');
      return `Based on your profile, you have: **${ings}**\n\nHere's what you can make with those:\n\n${getIngredientSuggestions(profile.ingredients)}\n\n💡 Go to the **Meal Planner** tab for full recipes, grocery lists, and a 7-day plan!`;
    }
    return "Tell me what ingredients you have and I'll suggest meals!\n\nFor example:\n- \"I have rice and eggs\" → Egg fried rice, rice bowl, egg toast\n- \"I have beans and bread\" → Bean sandwich, bean soup, bean tacos\n- \"I have oats and peanut butter\" → Peanut butter oatmeal, energy balls\n\nOr go to the **Meal Planner** tab to enter your ingredients for a full personalized plan.";
  }

  // Food desert questions
  if (lower.includes('food desert') || lower.includes('no grocery') || lower.includes('far from food') || lower.includes('access')) {
    let response = "**Food deserts** are areas where fresh, affordable food is more than 1 mile away in urban areas (or 10 miles in rural areas).\n\n";
    if (profile.zipCode) {
      response += `**In your area (ZIP ${profile.zipCode}):**\n`;
      response += "• Check your Food Access Score for your specific risk level\n";
      response += "• The Nearby Resources tab shows all food sources within your travel range\n\n";
    }
    response += "**How to navigate a food desert:**\n";
    response += "• 📞 Call 2-1-1 for immediate local food help\n";
    response += "• 🏛️ Food pantries give free groceries — no appointment needed at most\n";
    response += "• ❄️ Community fridges are available 24/7 in many cities\n";
    response += "• 🚌 Check if your county has free grocery bus routes or delivery for seniors\n";
    response += "• 📦 Imperfect Foods, Misfits Market, and similar services deliver to food deserts";
    return response;
  }

  // Nutrition questions
  if (lower.includes('nutrition') || lower.includes('healthy') || lower.includes('vitamin') || lower.includes('protein') || lower.includes('calorie')) {
    let response = "**Eating nutritiously on a budget** is absolutely possible. Here's what to prioritize:\n\n";
    response += "**Complete proteins on a budget:**\n";
    response += "• Beans + rice = complete protein (all amino acids)\n";
    response += "• Eggs — highest quality protein available cheaply\n";
    response += "• Peanut butter — high protein, long shelf life\n\n";
    response += "**Budget-friendly vitamins:**\n";
    response += "• Frozen vegetables retain 90% of nutrients and cost less than fresh\n";
    response += "• Bananas, apples, carrots are among the cheapest nutritious foods\n";
    response += "• Canned tomatoes have high lycopene — good for heart health\n\n";
    response += "**Daily nutrition targets:**\n";
    response += `• For ${profile.familySize} person${profile.familySize > 1 ? 's' : ''}: ~${profile.familySize * 2000} calories/day total\n`;
    response += `• Protein: ~${profile.familySize * 50}g/day target\n`;
    response += "• Focus: fiber from beans/vegetables, protein from eggs/beans, carbs from rice/oats";
    return response;
  }

  // Survival / emergency
  if (lower.includes('emergency') || lower.includes('out of food') || lower.includes('no food') || lower.includes('starving') || lower.includes('survive')) {
    return "🚨 **Emergency food help — right now:**\n\n**Immediate options:**\n• Call **2-1-1** — free, 24/7, any state. They'll find same-day food near you.\n• Search **feedingamerica.org/find-your-local-foodbank** for nearest food bank\n• Community fridges are free and available 24/7 — search findafridge.com\n• Most churches distribute food without appointment — call a local church\n\n**This week:**\n• Go to the **Survive This Week** tab — enter what you have left and get an emergency plan\n• Apply for SNAP expedited benefits (approved in 7 days in urgent cases)\n• Text 'FOOD' to 304-304 for immediate resource referral (Feeding America)\n\nYou are not alone. These resources exist exactly for this situation. 💙";
  }

  // WIC
  if (lower.includes('wic') || lower.includes('infant') || lower.includes('baby food') || lower.includes('pregnant')) {
    return "**WIC (Women, Infants, and Children Program)** provides free food and support for:\n• Pregnant women\n• Breastfeeding mothers (up to 1 year after birth)\n• Postpartum women (up to 6 months)\n• Infants and children under 5\n\n**What WIC provides:**\n• Monthly food vouchers/EBT card for specific foods\n• Free infant formula\n• Nutrition education and breastfeeding support\n• Healthcare referrals\n\n**How to apply:**\n• Call 1-800-942-3678 or visit signupwic.com\n• Must meet income guidelines (185% of poverty level)\n• WIC offices are in most health departments, clinics, and hospitals";
  }

  // Everbite general
  if (lower.includes('everbite') || lower.includes('what is this') || lower.includes('how does this work') || lower.includes('what can you do')) {
    return "**Everbite** is an AI-powered food accessibility platform. Here's everything I can help you with:\n\n🍳 **Meal Planning** — Enter ingredients you have and I'll generate personalized meals that match your budget, family size, and kitchen access\n\n📍 **Food Access Score** — Get a real-time score showing your food access level based on your ZIP, budget, and situation\n\n🗺️ **Nearby Resources** — Find food pantries, grocery stores, community fridges, SNAP offices, and church programs near you\n\n🚨 **Survive This Week** — Emergency planning when money is critically low\n\n🎭 **Reality Mode** — See food access through the eyes of real Americans\n\n🤖 **Me** — Ask me anything about food access, SNAP, nutrition, recipes, or budgeting and I'll give you personalized advice.\n\nFounded by Moyinoluwa Ajibade · Co-founders: Hadassah Yakubu & Aasiyah Adeoti";
  }

  // Off-topic redirect
  if (!isOnTopic(lower)) {
    return "I'm Everbite's AI assistant, specialized in food access, nutrition, SNAP/EBT, meal planning, and grocery budgeting.\n\nI can't help with topics outside of food and nutrition — but I'm extremely knowledgeable in those areas!\n\n**Try asking me:**\n• \"What can I make with beans and rice?\"\n• \"How do I apply for SNAP?\"\n• \"What's the cheapest way to eat healthy?\"\n• \"I only have $10 left for 5 days — what do I do?\"\n• \"Where can I find free food near me?\"";
  }

  // Default helpful response
  return `Great question about food access! ${hasProfile ? `Based on your profile ($${profile.weeklyBudget}/week for ${profile.familySize} people):` : 'Here\'s what I recommend:'}\n\n• **Meal Planner**: Enter your ingredients for personalized recipe ideas\n• **Food Access Score**: See your food access level and how to improve it\n• **Nearby Resources**: Find free food and affordable stores near you\n• **Survive This Week**: Emergency planning when funds are critically low\n\nWhat specific aspect of food access can I help you with? I can assist with SNAP, nutrition, budgeting, meal ideas, emergency food, or local resources.`;
}

function getIngredientSuggestions(ingredients: string[]): string {
  const has = ingredients.map(i => i.toLowerCase());
  const meals: string[] = [];

  if (has.some(i => i.includes('rice') && has.some(j => j.includes('egg')))) meals.push('🍳 Egg Fried Rice');
  if (has.some(i => i.includes('bean'))) meals.push('🫘 Bean Soup, Bean Stew, Beans & Rice');
  if (has.some(i => i.includes('egg'))) meals.push('🥚 Scrambled Eggs, Boiled Eggs, Egg Toast');
  if (has.some(i => i.includes('bread') && has.some(j => j.includes('peanut')))) meals.push('🥜 Peanut Butter Sandwich');
  if (has.some(i => i.includes('rice'))) meals.push('🍚 Rice Bowl, Seasoned Rice');
  if (has.some(i => i.includes('pasta'))) meals.push('🍝 Plain Pasta, Pasta with Egg');
  if (has.some(i => i.includes('oat'))) meals.push('🌾 Oatmeal, Savory Oats');

  return meals.length > 0 ? meals.join('\n') : 'Try the Meal Planner tab — enter your specific ingredients for custom recipes.';
}

const quickPrompts = [
  'What can I make with beans and rice?',
  'How do I apply for SNAP?',
  'How do I eat healthy on $25/week?',
  'Who founded Everbite?',
  'I\'m out of food — help!',
  'Best cheap protein sources?',
];

export default function AIAssistant() {
  const { userProfile } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `👋 Hi! I'm Everbite AI, your personal food access assistant.\n\n${
        userProfile.isSetupComplete
          ? `I can see your profile: **$${userProfile.weeklyBudget}/week** for **${userProfile.familySize} person${userProfile.familySize > 1 ? 's' : ''}** in **ZIP ${userProfile.zipCode}**. I'll use this to personalize all my answers.\n\n`
          : 'I specialize in food deserts, SNAP/EBT, meal planning, nutrition, and grocery budgeting.\n\n'
      }Ask me anything — I'm here to help. 💙`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setInput('');
    const userMsg: Message = { role: 'user', content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

    const response = generateResponse(msg, {
      weeklyBudget: userProfile.weeklyBudget,
      familySize: userProfile.familySize,
      transportation: userProfile.transportation,
      snapStatus: userProfile.snapStatus,
      zipCode: userProfile.zipCode,
      ingredients: userProfile.ingredients,
      kitchenAccess: userProfile.kitchenAccess,
      dietaryNeeds: userProfile.dietaryNeeds,
    });

    const aiMsg: Message = { role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} className="font-black text-gray-900 mt-2 mb-1">{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*/g);
        return (
          <div key={i} className="mb-0.5">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>)}
          </div>
        );
      }
      if (line.startsWith('•') || line.startsWith('*')) {
        return <div key={i} className="ml-2 mb-0.5">{line}</div>;
      }
      if (line === '') return <div key={i} className="h-1" />;
      return <div key={i} className="mb-0.5">{line}</div>;
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-0 flex flex-col" style={{ background: '#FFF9F2' }}>
      {/* Header */}
      <div className="text-center py-6 px-4">
        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-2"
          style={{ background: 'rgba(124,58,237,0.1)', color: '#7C3AED' }}>
          🤖 AI Assistant
        </div>
        <h1 className="text-2xl font-black text-gray-900">Everbite AI</h1>
        <p className="text-gray-400 text-xs mt-1">
          {userProfile.isSetupComplete
            ? `Personalized for your profile · ${userProfile.zipCode} · $${userProfile.weeklyBudget}/wk · ${userProfile.familySize} people`
            : 'Specialized in food access, SNAP, nutrition, and budgeting'}
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 max-w-2xl w-full mx-auto">
        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2 text-center">Quick questions to get started:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickPrompts.map((p, i) => (
                <button key={i} onClick={() => send(p)}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-all">
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #7C3AED)' }}>
                🤖
              </div>
            )}
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'text-white rounded-br-sm'
                : 'bg-white border border-gray-100 text-gray-700 rounded-bl-sm shadow-sm'
            }`}
              style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' } : {}}>
              {formatMessage(msg.content)}
              <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-300'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mr-2"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #7C3AED)' }}>
              🤖
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask about food, SNAP, recipes, budgeting..."
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-2xl text-white font-bold transition-all hover:scale-105 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #7C3AED)' }}>
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
