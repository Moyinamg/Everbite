import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserSetup from './pages/UserSetup';
import FoodAccessScore from './pages/FoodAccessScore';
import MealPlanner from './pages/MealPlanner';
import RealityMode from './pages/RealityMode';
import SurviveThisWeek from './pages/SurviveThisWeek';
import NearbyResources from './pages/NearbyResources';
import AIAssistant from './pages/AIAssistant';

function AppContent() {
  const { currentPage } = useApp();

  const pages: Record<string, React.ReactNode> = {
    home: <Home />,
    setup: <UserSetup />,
    score: <FoodAccessScore />,
    mealplanner: <MealPlanner />,
    reality: <RealityMode />,
    survive: <SurviveThisWeek />,
    resources: <NearbyResources />,
    assistant: <AIAssistant />,
  };

  return (
    <div className="min-h-screen" style={{ background: '#FFF9F2' }}>
      <Navbar />
      <main>
        {pages[currentPage] || <Home />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
