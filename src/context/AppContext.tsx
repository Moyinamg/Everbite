import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface UserProfile {
  zipCode: string;
  weeklyBudget: number;
  familySize: number;
  transportation: 'walking' | 'bus' | 'car' | 'rideshare' | '';
  snapStatus: boolean;
  kitchenAccess: 'full' | 'microwave' | 'none' | '';
  dietaryNeeds: string[];
  ingredients: string[];
  isSetupComplete: boolean;
}

export interface AppState {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  foodAccessScore: number;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const defaultProfile: UserProfile = {
  zipCode: '',
  weeklyBudget: 50,
  familySize: 1,
  transportation: '',
  snapStatus: false,
  kitchenAccess: '',
  dietaryNeeds: [],
  ingredients: [],
  isSetupComplete: false,
};

const AppContext = createContext<AppState | undefined>(undefined);

// ZIP code intelligence mock data
const zipData: Record<string, { foodDesertRisk: number; pantryCount: number; storeCount: number; city: string; state: string; lat?: number; lon?: number }> = {
  '10001': { foodDesertRisk: 0.2, pantryCount: 8, storeCount: 15, city: 'New York', state: 'NY', lat: 40.7489, lon: -73.9680 },
  '60619': { foodDesertRisk: 0.8, pantryCount: 3, storeCount: 2, city: 'Chicago', state: 'IL', lat: 41.7450, lon: -87.6130 },
  '90011': { foodDesertRisk: 0.75, pantryCount: 4, storeCount: 3, city: 'Los Angeles', state: 'CA', lat: 34.0070, lon: -118.2580 },
  '77051': { foodDesertRisk: 0.85, pantryCount: 2, storeCount: 1, city: 'Houston', state: 'TX', lat: 29.6900, lon: -95.3290 },
  '30310': { foodDesertRisk: 0.7, pantryCount: 5, storeCount: 3, city: 'Atlanta', state: 'GA', lat: 33.7278, lon: -84.4242 },
  '48213': { foodDesertRisk: 0.9, pantryCount: 2, storeCount: 1, city: 'Detroit', state: 'MI', lat: 42.3960, lon: -83.1070 },
  '94102': { foodDesertRisk: 0.4, pantryCount: 6, storeCount: 8, city: 'San Francisco', state: 'CA', lat: 37.7794, lon: -122.4192 },
  '33127': { foodDesertRisk: 0.65, pantryCount: 4, storeCount: 4, city: 'Miami', state: 'FL', lat: 25.7770, lon: -80.2060 },
  '98101': { foodDesertRisk: 0.25, pantryCount: 7, storeCount: 10, city: 'Seattle', state: 'WA', lat: 47.6137, lon: -122.3337 },
  '85034': { foodDesertRisk: 0.72, pantryCount: 3, storeCount: 2, city: 'Phoenix', state: 'AZ', lat: 33.4140, lon: -112.1360 },
  '10025': { foodDesertRisk: 0.3, pantryCount: 7, storeCount: 12, city: 'New York', state: 'NY', lat: 40.7980, lon: -73.9660 },
};

export function getZipData(zip: string) {
  if (zipData[zip]) return zipData[zip];
  // Generate deterministic mock data based on zip digits
  const sum = zip.split('').reduce((a, b) => a + parseInt(b || '0'), 0);
  const risk = (sum % 10) / 10 + 0.1;
  
  // Generate deterministic lat/lon based on ZIP code for mock data
  const latBase = 39.8283 + (parseInt(zip.substring(0, 2) || '0') - 25) * 0.5;
  const lonBase = -98.5795 + (parseInt(zip.substring(2, 4) || '0') - 25) * 0.8;
  
  return {
    foodDesertRisk: Math.min(risk, 0.95),
    pantryCount: Math.max(1, 10 - Math.floor(risk * 10)),
    storeCount: Math.max(1, 15 - Math.floor(risk * 14)),
    city: 'Your City',
    state: 'US',
    lat: latBase,
    lon: lonBase,
  };
}

export function calculateFoodAccessScore(profile: UserProfile): number {
  if (!profile.zipCode && !profile.transportation && !profile.kitchenAccess) return 0;

  let score = 100;

  // ZIP code / food desert risk (up to -40 points)
  if (profile.zipCode) {
    const data = getZipData(profile.zipCode);
    score -= data.foodDesertRisk * 40;
  }

  // Transportation (up to -25 points)
  const transportPenalty: Record<string, number> = {
    car: 0,
    rideshare: 8,
    bus: 15,
    walking: 25,
    '': 20,
  };
  score -= transportPenalty[profile.transportation] || 20;

  // Budget (up to -15 points)
  const perPerson = profile.weeklyBudget / Math.max(profile.familySize, 1);
  if (perPerson < 10) score -= 15;
  else if (perPerson < 20) score -= 10;
  else if (perPerson < 35) score -= 5;

  // SNAP boosts access (+10)
  if (profile.snapStatus) score += 10;

  // Kitchen access
  const kitchenPenalty: Record<string, number> = {
    full: 0,
    microwave: 8,
    none: 15,
    '': 5,
  };
  score -= kitchenPenalty[profile.kitchenAccess] || 5;

  // Family size burden
  if (profile.familySize >= 5) score -= 8;
  else if (profile.familySize >= 3) score -= 3;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('everbite_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });
  const [currentPage, setCurrentPage] = useState('home');

  const foodAccessScore = calculateFoodAccessScore(userProfile);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem('everbite_profile', JSON.stringify(profile));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...updates };
    setUserProfile(updated);
  };

  useEffect(() => {
    localStorage.setItem('everbite_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  return (
    <AppContext.Provider value={{ userProfile, setUserProfile, updateProfile, foodAccessScore, currentPage, setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
