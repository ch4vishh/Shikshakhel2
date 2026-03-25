import { AppProvider, useApp } from './context/AppContext';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileSelectorScreen from './screens/ProfileSelectorScreen';
import DashboardScreen from './screens/DashboardScreen';
import LevelMapScreen from './screens/LevelMapScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ParentDashboardScreen from './screens/ParentDashboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import WeeklyReportScreen from './screens/WeeklyReportScreen';

// Shared components
import BottomNavBar from './components/BottomNavBar';
import OfflineToast from './components/OfflineToast';
import PWAInstallBanner from './components/PWAInstallBanner';

// Screens that show the bottom nav bar
const NAV_SCREENS = ['dashboard', 'levelmap', 'leaderboard', 'parent'];

const SCREEN_MAP = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  login: LoginScreen,
  profile: ProfileSelectorScreen,
  dashboard: DashboardScreen,
  levelmap: LevelMapScreen,
  game: GameScreen,
  leaderboard: LeaderboardScreen,
  parent: ParentDashboardScreen,
  settings: SettingsScreen,
  subscription: SubscriptionScreen,
  weeklyreport: WeeklyReportScreen,
};

function AppRouter() {
  const { currentScreen } = useApp();
  const ScreenComponent = SCREEN_MAP[currentScreen] || DashboardScreen;
  const showNav = NAV_SCREENS.includes(currentScreen);

  return (
    <div className="app-shell">
      <OfflineToast />
      <div className="screen bg-gradient" key={currentScreen}>
        <ScreenComponent />
      </div>
      {showNav && <BottomNavBar />}
      <PWAInstallBanner />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
