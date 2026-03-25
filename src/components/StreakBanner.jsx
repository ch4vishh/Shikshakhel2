import '../styles/Components.css';

export default function StreakBanner({ streak, onDismiss }) {
  return (
    <div className="streak-banner">
      <span className="streak-banner-icon">🔥</span>
      <div className="streak-banner-text">
        <div className="streak-banner-title">{streak} दिन की स्ट्रीक!</div>
        <div className="streak-banner-sub">बहुत बढ़िया! लगातार सीखते रहो। 🎉</div>
      </div>
      <button className="streak-banner-close" onClick={onDismiss}>✕</button>
    </div>
  );
}
