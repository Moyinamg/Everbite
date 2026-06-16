import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'setup', label: 'My Profile' },
  { id: 'score', label: 'Access Score' },
  { id: 'mealplanner', label: 'Meal Planner' },
  { id: 'reality', label: 'Reality Mode' },
  { id: 'survive', label: 'Survive This Week' },
  { id: 'resources', label: 'Resources' },
  { id: 'assistant', label: 'AI Assistant' },
];

export default function Navbar() {
  const { currentPage, setCurrentPage, foodAccessScore, userProfile } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scoreColor = foodAccessScore >= 80 ? '#22C55E' : foodAccessScore >= 60 ? '#FF6B00' : foodAccessScore >= 40 ? '#FF8A65' : '#EF4444';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setCurrentPage('home')} className="flex-shrink-0">
            <Logo size="sm" white={!scrolled && currentPage === 'home'} />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(1).map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-orange-500 text-white shadow-orange'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {userProfile.isSetupComplete && (
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer glass border shadow-sm"
                onClick={() => setCurrentPage('score')}
                style={{ borderColor: scoreColor + '40' }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: scoreColor }} />
                <span style={{ color: scoreColor }}>{foodAccessScore}/100</span>
              </div>
            )}
            <button
              onClick={() => setCurrentPage('setup')}
              className="hidden sm:block px-4 py-2 rounded-full text-sm font-semibold text-white shadow-orange transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A65)' }}
            >
              {userProfile.isSetupComplete ? 'My Profile' : 'Get Started'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl glass"
            >
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/30 py-4 px-4 animate-slide-up">
          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
