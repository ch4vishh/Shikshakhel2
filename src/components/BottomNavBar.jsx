import { useApp, useT } from '../context/AppContext';
import '../styles/Components.css';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', labelHi: 'होम', labelEn: 'Home' },
  { id: 'levelmap', icon: '🗺️', labelHi: 'नक्शा', labelEn: 'Map' },
  { id: 'leaderboard', icon: '🏆', labelHi: 'रैंक', labelEn: 'Rank' },
  { id: 'parent', icon: '👨‍👩‍👧', labelHi: 'माता-पिता', labelEn: 'Parent' },
];

export default function BottomNavBar() {
  const { currentScreen, navigate, language } = useApp();
  const isHi = language === 'hi';

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(item => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
            aria-label={isHi ? item.labelHi : item.labelEn}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{isHi ? item.labelHi : item.labelEn}</span>
            {isActive && <div className="nav-active-dot" />}
          </button>
        );
      })}
    </nav>
  );
}
