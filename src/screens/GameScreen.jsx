import { useApp, useT } from '../context/AppContext';
import '../styles/Game.css';

export default function GameScreen() {
  const { navigate, activeProfile } = useApp();
  const t = useT();
  const profile = activeProfile || { name: 'Arjun', class: 1 };

  return (
    <div className="game-screen">
      {/* Grid background */}
      <div className="game-bg-grid" />

      {/* Decorative floating emojis */}
      <span className="game-corner-deco game-corner-deco-1">🎮</span>
      <span className="game-corner-deco game-corner-deco-2">⭐</span>
      <span className="game-corner-deco game-corner-deco-3">🎯</span>

      {/* Back button */}
      <button className="game-back-btn" onClick={() => navigate('levelmap')}>
        ← {t.back}
      </button>

      {/* Placeholder Card */}
      <div className="glass-card game-placeholder-card bounce-in">
        <span className="game-dev-icon">🛠️</span>
        <h2 className="text-gradient">{t.gameDevArea}</h2>
        <p>
          यह क्षेत्र <strong>गेम डेवलपर</strong> के लिए है।
          यहाँ गणित और EVS के इंटरैक्टिव गेम लागू होंगे।
          <br /><br />
          <em>This area is reserved for the Game Developer to implement interactive Math & EVS game levels.</em>
        </p>

        <div className="game-level-info">
          <span className="game-info-chip">👤 {profile.name}</span>
          <span className="game-info-chip">🏫 कक्षा {profile.class}</span>
          <span className="game-info-chip">🔢 घटाना – Level 4</span>
          <span className="game-info-chip">⏱️ 5 मिनट</span>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('dashboard')}>
            🏠 Dashboard
          </button>
          <button className="btn btn-glass" onClick={() => navigate('levelmap')}>
            🗺️ Level Map
          </button>
        </div>
      </div>
    </div>
  );
}
