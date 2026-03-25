import { useState } from 'react';
import { useApp, useT } from '../context/AppContext';
import StreakBanner from '../components/StreakBanner';
import '../styles/Dashboard.css';

const BADGES = [
  { id: 1, icon: '🏆', label: 'पहला जीत', earned: true },
  { id: 2, icon: '🔥', label: '7-दिन स्ट्रीक', earned: true },
  { id: 3, icon: '⭐', label: 'स्टार सेवर', earned: true },
  { id: 4, icon: '🎯', label: '100% स्कोर', earned: false },
  { id: 5, icon: '📚', label: 'किताब कीड़ा', earned: false },
  { id: 6, icon: '🦁', label: 'गणित राजा', earned: false },
];

export default function DashboardScreen() {
  const { activeProfile, navigate } = useApp();
  const t = useT();
  const [showStreak, setShowStreak] = useState(true);
  const profile = activeProfile || { name: 'अर्जुन', avatar: '🦁', stars: 0, streak: 0, level: 1, class: 1 };

  // Derived progress values
  const mathPct    = Math.min(100, Math.round((profile.level / 10) * 100));
  const evsPct     = Math.min(100, Math.max(0, Math.round(((profile.level - 3) / 5) * 100)));
  // Mission: completed stages = min(level-1, 3), capped at 3 total
  const missionDone  = Math.min(profile.level - 1, 3);
  const missionTotal = 3;
  const missionPct   = Math.round((missionDone / missionTotal) * 100);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'सुप्रभात' : hour < 17 ? 'नमस्ते' : 'शुभ संध्या';

  return (
    <div className="dashboard-screen">
      {/* Top bar */}
      <div className="dashboard-topbar">
        <div className="topbar-greeting">
          <div className="topbar-greeting-label">{greeting} 👋</div>
          <div className="topbar-greeting-name">{profile.name}</div>
        </div>
        <div className="topbar-avatar" onClick={() => navigate('settings')} title="Settings">
          {profile.avatar}
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats">
        <div className="stat-chip fade-in-up">
          <span className="stat-chip-icon">⭐</span>
          <span className="stat-chip-value text-amber">{profile.stars}</span>
          <span className="stat-chip-label">{t.stars}</span>
        </div>
        <div className="stat-chip fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="stat-chip-icon">🔥</span>
          <span className="stat-chip-value" style={{ color: 'var(--rose-light)' }}>{profile.streak}</span>
          <span className="stat-chip-label">{t.streak}</span>
        </div>
        <div className="stat-chip fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="stat-chip-icon">🎮</span>
          <span className="stat-chip-value text-cyan">{profile.level}</span>
          <span className="stat-chip-label">{t.level}</span>
        </div>
        <div className="stat-chip fade-in-up" style={{ animationDelay: '0.3s' }}>
          <span className="stat-chip-icon">🏫</span>
          <span className="stat-chip-value text-purple">कक्षा {profile.class}</span>
          <span className="stat-chip-label">{t.class}</span>
        </div>
      </div>

      {/* Streak Banner */}
      {showStreak && profile.streak > 0 && (
        <StreakBanner streak={profile.streak} onDismiss={() => setShowStreak(false)} />
      )}

      {/* Mission Card */}
      <div className="glass-card mission-card fade-in-up-delay-1">
        <div className="mission-card-label">🎯 {t.missionToday}</div>
        <div className="mission-card-title">जोड़ और घटाव</div>
        <div className="mission-card-progress">
          <div className="mission-card-progress-label">
            <span>{missionDone}/{missionTotal} पूरे</span>
            <span className="text-amber">{missionPct}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${missionPct}%` }} />
          </div>
        </div>
        <button className="btn btn-amber" onClick={() => navigate('game')}>
          ▶ {t.startMission}
        </button>
        <div className="mission-mascot">{profile.avatar}</div>
      </div>

      {/* Subjects */}
      <div className="subjects-section fade-in-up-delay-2">
        <div className="section-title">📖 विषय</div>
        <div className="subjects-grid">
          <div className="subject-card subject-card-math" onClick={() => navigate('levelmap')}>
            <span className="subject-card-icon">🔢</span>
            <span className="subject-card-name">{t.math}</span>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${mathPct}%` }} />
            </div>
            <span className="subject-card-progress-text">{mathPct}% पूरा</span>
          </div>
          <div className="subject-card subject-card-evs" onClick={() => navigate('levelmap')}>
            <span className="subject-card-icon">🌿</span>
            <span className="subject-card-name">{t.evs}</span>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${evsPct}%`, background: 'linear-gradient(90deg, var(--green), var(--cyan))' }} />
            </div>
            <span className="subject-card-progress-text">{evsPct > 0 ? `${evsPct}% पूरा` : '🔒 Level 4 के बाद'}</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="badges-section fade-in-up-delay-3">
        <div className="section-title">🏅 बैज</div>
        <div className="badges-scroll">
          {BADGES.map(b => (
            <div key={b.id} className="badge-item">
              <div className={`badge-icon-wrap ${b.earned ? 'earned' : 'locked'}`}>
                {b.icon}
                {b.earned && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    background: 'var(--green)', borderRadius: '50%',
                    width: 14, height: 14, fontSize: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1.5px solid var(--purple-deep)'
                  }}>✓</div>
                )}
              </div>
              <span className="badge-item-label">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
