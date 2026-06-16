# Everbite: Food Access Intelligence Platform

![Everbite Banner](https://via.placeholder.com/800x200/FF6B00/FFFFFF?text=EVERBITE+Food+Access+Intelligence)

## 🚀 About Everbite

Everbite is an AI-powered food access intelligence platform designed to combat food insecurity through technology. Built with React 19, TypeScript 6, and modern web technologies, it provides 8 complete features to help individuals and families navigate food access challenges.

**Founder**: Moyinoluwa Ajibade  
**Co-Founders**: Hadassah Yakubu, Aasiyah Adeoti  
**Year**: 2026

## ✨ Features

### 1. **Food Access Score**
- Real-time assessment algorithm (0-100 score)
- Factor breakdown showing improvement pathways
- Personalized recommendations based on user profile

### 2. **AI Meal Planner**
- Ingredient-based meal generation across 9 cuisines
- 50+ recipes with nutrition calculations
- Budget optimization and grocery list generation

### 3. **Nearby Resources**
- ZIP code-based resource mapping (20706 → Lanham, MD)
- Real addresses with Google Maps integration
- 6 resource types: grocery stores, food pantries, SNAP offices, etc.

### 4. **AI Assistant**
- Conversational guidance for food-related questions
- Strict topic control (food, nutrition, SNAP, budgeting only)
- Response length adjustment (brief/detailed based on request)

### 5. **Survive This Week**
- Emergency crisis management for $0-5 situations
- Step-by-step survival instructions
- 24/7 hotline integration (2-1-1)

### 6. **Reality Mode**
- Interactive food insecurity simulation
- Educational outcomes with resource connections
- Respectful, non-patronizing experience

### 7. **User Setup**
- 4-step profile configuration
- Real-time validation and localStorage persistence
- Dietary restriction and kitchen access tracking

### 8. **Home Dashboard**
- Feature overview and navigation
- Founder information display
- Privacy-focused design

## 🛠️ Technical Stack

- **Framework**: React 19.2.6 + TypeScript 6.0.2
- **Build System**: Vite 8.0.12
- **Styling**: Tailwind CSS 4.3.0
- **State Management**: Context API + localStorage
- **Routing**: React Router DOM 7.16.0
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## 📊 Technical Metrics

- **Lines of Code**: 12,000+ TypeScript
- **Bundle Size**: 361KB total (329KB JS + 32KB CSS)
- **Dependencies**: 212 packages, zero vulnerabilities
- **Type Safety**: Zero TypeScript errors in production build
- **Performance**: 2-second load time target, works on 3G

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation
```bash
# Clone the repository
git clone https://github.com/[your-username]/everbite.git

# Navigate to project
cd everbite

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Server
The app will be available at: `http://localhost:5173`

### Build for Production
```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── pages/                    # 8 feature pages
│   ├── Home.tsx             # Landing page
│   ├── UserSetup.tsx        # Profile configuration
│   ├── FoodAccessScore.tsx  # Assessment algorithm
│   ├── MealPlanner.tsx      # AI meal generation
│   ├── RealityMode.tsx      # Simulation experience
│   ├── SurviveThisWeek.tsx  # Emergency planning
│   ├── NearbyResources.tsx  # ZIP-based mapping
│   └── AIAssistant.tsx      # Chat interface
├── utils/                   # Core algorithms
│   ├── mealEngine.ts        # 812-line AI meal algorithm
│   └── zipValidation.ts     # ZIP code intelligence
└── context/                 # State management
    └── AppContext.tsx       # Context API implementation
```

## 🌍 Social Impact

Everbite addresses critical food insecurity challenges:
- **44+ million Americans** facing food insecurity
- **Food deserts** affecting 23.5 million people
- **SNAP participation gap** (only 82% of eligible)
- **Digital divide** in food access solutions

## 🔒 Privacy & Accessibility

- **Zero Backend Architecture**: All data stays on device
- **Offline Functionality**: Works without internet access
- **WCAG AA Compliance**: Accessible to diverse populations
- **Cultural Competency**: 9 cuisine support for diverse communities

## 📈 Future Roadmap

1. **Scale ZIP Coverage**: Expand from 40+ to all 42,000+ US ZIP codes
2. **Partnership Integration**: Connect with food banks and government agencies
3. **Mobile App**: Native iOS/Android applications
4. **Community Features**: User sharing and support networks

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for hackathon competition
- Inspired by real food access challenges
- Dedicated to all families navigating food insecurity

---

**Everbite**: Food Access Reimagined. Technology with Purpose.