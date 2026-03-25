import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

const defaultProfiles = [
  { id: 1, name: 'Arjun', avatar: '🦁', class: 1, stars: 42, streak: 5, level: 8 },
  { id: 2, name: 'Priya', avatar: '🦋', class: 2, stars: 78, streak: 12, level: 15 },
];

const defaultParent = {
  name: 'Ramesh Kumar',
  phone: '9876543210',
  village: 'Sundarpur',
  plan: 'monthly',
};

export function AppProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeProfile, setActiveProfile] = useState(null);
  const [profiles, setProfiles] = useState(defaultProfiles);
  const [parent, setParent] = useState(defaultParent);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [language, setLanguage] = useState('hi'); // 'hi' | 'en'
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, []);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowInstallBanner(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const navigate = (screen) => setCurrentScreen(screen);

  const updateProfile = (id, updates) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (activeProfile?.id === id) setActiveProfile(prev => ({ ...prev, ...updates }));
  };

  const selectProfile = (profile) => { setActiveProfile(profile); navigate('dashboard'); };

  const installPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  return (
    <AppContext.Provider value={{
      currentScreen, navigate,
      activeProfile, selectProfile, setActiveProfile,
      profiles, setProfiles, updateProfile,
      parent, setParent,
      isOnline, language, setLanguage,
      showInstallBanner, setShowInstallBanner, installPWA,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

// Translation helper
const translations = {
  hi: {
    appName: 'शिक्षाखेल',
    tagline: 'खेलो, सीखो, बढ़ो!',
    login: 'लॉगिन करें',
    start: 'शुरू करें',
    dashboard: 'डैशबोर्ड',
    leaderboard: 'लीडरबोर्ड',
    parent: 'अभिभावक',
    map: 'नक्शा',
    streak: 'स्ट्रीक',
    stars: 'सितारे',
    level: 'स्तर',
    math: 'गणित',
    evs: 'पर्यावरण',
    settings: 'सेटिंग्स',
    logout: 'बाहर निकलें',
    subscribe: 'सदस्यता',
    offline: 'ऑफलाइन मोड में हैं',
    missionToday: 'आज का मिशन',
    startMission: 'मिशन शुरू करें',
    weeklyReport: 'साप्ताहिक रिपोर्ट',
    rank: 'रैंक',
    village: 'गाँव',
    class: 'कक्षा',
    continue: 'जारी रखें',
    back: 'वापस',
    next: 'आगे',
    done: 'हो गया',
    select: 'चुनें',
    addChild: 'बच्चा जोड़ें',
    progress: 'प्रगति',
    gameDevArea: 'गेम डेवलपर क्षेत्र',
  },
  en: {
    appName: 'Shikshakhel',
    tagline: 'Play, Learn, Grow!',
    login: 'Login',
    start: 'Get Started',
    dashboard: 'Dashboard',
    leaderboard: 'Leaderboard',
    parent: 'Parent',
    map: 'Map',
    streak: 'Streak',
    stars: 'Stars',
    level: 'Level',
    math: 'Maths',
    evs: 'EVS',
    settings: 'Settings',
    logout: 'Logout',
    subscribe: 'Subscribe',
    offline: 'You are Offline',
    missionToday: "Today's Mission",
    startMission: 'Start Mission',
    weeklyReport: 'Weekly Report',
    rank: 'Rank',
    village: 'Village',
    class: 'Class',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    select: 'Select',
    addChild: 'Add Child',
    progress: 'Progress',
    gameDevArea: 'Game Dev Area',
  }
};

export const useT = () => {
  const { language } = useApp();
  return translations[language] || translations.hi;
};
