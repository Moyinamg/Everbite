import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';

const stats = [
  { value: '44M', label: 'Americans Face Hunger', icon: '🍽️', color: '#FF6B00' },
  { value: '19M', label: 'Live in Food Deserts', icon: '🗺️', color: '#7C3AED' },
  { value: '13M', label: 'Children Face Food Insecurity', icon: '👶', color: '#FF8A65' },
  { value: '$0', label: 'Cost to Use Everbite', icon: '💚', color: '#22C55E' },
];

const features = [
  {
    icon: '🧠',
    title: 'AI Meal Planner',
    desc: 'Enter what ingredients you have. Get personalized, budget-friendly meal plans instantly.',
    color: '#FF6B00',
    page: 'mealplanner',
  },
  {
    icon: '📍',
    title: 'Food Access Score',
    desc: 'Get a real-time score showing your food access level based on your ZIP, budget, and situation.',
    color: '#7C3AED',
    page: 'score',
  },
  {
    icon: '🗺️',
    title: 'Nearby Resources',
    desc: 'Find food pantries, community fridges, SNAP locations, and church food programs near you.',
    color: '#22C55E',
    page: 'resources',
  },
  {
    icon: '🚨',
    title: 'Survive This Week',
    desc: 'When things get critical — enter what you have left and get an emergency survival plan.',
    color: '#EF4444',
    page: 'survive',
  },
  {
    icon: '🎭',
    title: 'Reality Mode',
    desc: 'See food access through the eyes of real people. Maria, James, Dorothy, and more.',
    color: '#FF8A65',
    page: 'reality',
  },
  {
    icon: '🤖',
    title: 'Everbite AI',
    desc: 'Your 24/7 food access assistant. Ask anything about SNAP, nutrition, or budgeting.',
    color: '#06B6D4',
    page: 'assistant',
  },
];

const testimonials = [
  {
    name: 'Maria G.',
    role: 'Single Mom, Chicago',
    text: 'Everbite showed me 3 pantries within walking distance I never knew about. It changed everything for my kids.',
    avatar: '👩‍👧',
    rating: 5,
  },
  {
    name: 'James T.',
    role: 'College Student, Detroit',
    text: 'I had rice and eggs and Everbite gave me 6 real meals I could actually make. The AI is incredible.',
    avatar: '👨‍🎓',
    rating: 5,
  },
  {
    name: 'Dorothy M.',
    role: 'Retired, Atlanta',
    text: 'At 72 with no car, I thought I was stuck. Everbite found delivery options and nearby community programs.',
    avatar: '👵',
    rating: 5,
  },
];

function CountUp({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, ''));
        if (!num) { setDisplay(target); return; }
        const suffix = target.replace(/[\d]/g, '');
        let start = 0;
        const step = Math.ceil(num / (duration / 16));
        const timer = setInterval(() => {
          start = Math.min(start + step, num);
          setDisplay(start + suffix);
          if (start >= num) clearInterval(timer);
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref}>{display}</div>;
}

export default function Home() {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111827 0%, #1F1147 50%, #7C1010 100%)' }}>

        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 animate-float"
            style={{ background: 'radial-gradient(circle, #FF6B00, transparent)' }} />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 animate-float-delay"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #22C55E, transparent)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 pb-16">
          <div className="flex justify-center mb-8 animate-fade-in">
            <Logo size="lg" white />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 animate-slide-up"
            style={{ background: 'rgba(255,107,0,0.2)', border: '1px solid rgba(255,107,0,0.4)', color: '#FF8A65' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Smart Paths to Every Bite
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: '0.1s' }}>
            No One Should Go<br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B00, #FF8A65, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Hungry</span> in America
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.2s' }}>
            Everbite uses AI to help people in food deserts find affordable food, create meal plans from what they already have, and connect with life-saving local resources.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setCurrentPage('setup')}
              className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-orange transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' }}
            >
              Find My Food Access Score →
            </button>
            <button
              onClick={() => setCurrentPage('mealplanner')}
              className="px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)' }}
            >
              🍳 Plan Meals Now
            </button>
          </div>

          {/* Floating cards */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat, i) => (
              <div key={i} className="glass-dark rounded-2xl p-4 text-center card-hover">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black" style={{ color: stat.color }}>
                  <CountUp target={stat.value} />
                </div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4" style={{ background: '#FFF9F2' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(124,58,237,0.1)', color: '#7C3AED' }}>
            Our Mission
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
            Food Access Is a{' '}
            <span className="text-gradient">Human Right</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            44 million Americans struggle with food insecurity while 19 million live in food deserts — areas where fresh, affordable food is nearly impossible to access. Everbite bridges that gap using AI, real-time data, and compassionate design.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4" style={{ background: '#F8F4FF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
              Features Built for Real Life
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900">
              Everything You Need,{' '}
              <span className="text-gradient">Nothing You Don't</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(f.page)}
                className="text-left p-6 bg-white rounded-3xl shadow-sm card-hover border border-gray-100 group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                  style={{ background: f.color + '15' }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-4 text-sm font-semibold flex items-center gap-1" style={{ color: f.color }}>
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4" style={{ background: '#FFF9F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Real People. Real Impact.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A65 40%, #7C3AED 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
            Your Food Journey Starts Here
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Join thousands of Americans using Everbite to take control of their food access. Free, private, and built with compassion.
          </p>
          <button
            onClick={() => setCurrentPage('setup')}
            className="px-10 py-5 bg-white rounded-2xl text-lg font-black transition-all hover:scale-105 shadow-2xl"
            style={{ color: '#FF6B00' }}
          >
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-center">
        <Logo size="md" white />
        <p className="text-gray-400 text-sm mt-4">Smart Paths to Every Bite</p>
        <p className="text-gray-500 text-xs mt-2">
          Founded by Moyinoluwa Ajibade · Co-founders: Hadassah Yakubu & Aasiyah Adeoti
        </p>
        <p className="text-gray-600 text-xs mt-4">© 2026 Everbite. Built to end food insecurity.</p>
      </footer>
    </div>
  );
}
