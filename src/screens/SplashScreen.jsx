import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/Splash.css';

export default function SplashScreen() {
  const { navigate } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => navigate('onboarding'), 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      {/* Ambient orbs */}
      <div className="splash-orb splash-orb-1" />
      <div className="splash-orb splash-orb-2" />
      <div className="splash-orb splash-orb-3" />

      <div className="splash-logo-wrapper">
        <div className="splash-icon">📚</div>
        <h1 className="splash-title">शिक्षाखेल</h1>
        <p className="splash-tagline">खेलो • सीखो • बढ़ो</p>

        <div className="splash-dots">
          <span className="splash-dot" />
          <span className="splash-dot" />
          <span className="splash-dot" />
        </div>
      </div>

      <p className="splash-version">v1.0.0 MVP — F‑Society</p>
    </div>
  );
}
