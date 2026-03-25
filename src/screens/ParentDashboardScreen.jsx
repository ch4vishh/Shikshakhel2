import { useState, useMemo } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/ParentDashboard.css';

const WEEK = ['सो', 'मं', 'बु', 'गु', 'शु', 'श', 'र'];

// Static village players for rank calculation
const VILLAGE_STARS = [320, 280, 265, 195, 178, 155, 132];

export default function ParentDashboardScreen() {
  const { profiles, navigate, parent } = useApp();
  const t = useT();
  const [activeChild, setActiveChild] = useState(0);

  const child = profiles[activeChild] || profiles[0];

  return (
    <div className="parent-screen">
      <div className="parent-header">
        <div className="parent-header-title">
          <p>👨‍👩‍👧 अभिभावक डैशबोर्ड</p>
          <h2 className="text-gradient">प्रगति रिपोर्ट</h2>
        </div>
        <button className="parent-notify-btn" title="Notifications">🔔</button>
      </div>

      {/* Child selector */}
      {profiles.length > 1 && (
        <div className="child-selector">
          {profiles.map((p, i) => (
            <button
              key={p.id}
              className={`child-tab ${activeChild === i ? 'active' : ''}`}
              onClick={() => setActiveChild(i)}
            >
              <span className="child-tab-avatar">{p.avatar}</span>
              {p.name}
            </button>
          ))}
        </div>
      )}

      {child && (
        <>
          {/* Derived stats from profile */}
          {(() => {
            // Math progress: level 1 = 10%, each level adds ~9% up to level 10 = 100%
            const mathPct = Math.min(100, Math.round((child.level / 10) * 100));
            // EVS unlocks after level 4 with offset of 3
            const evsPct  = Math.min(100, Math.max(0, Math.round(((child.level - 3) / 5) * 100)));
            // Weekly time estimate based on streak (5 min/day)
            const weeklyMins = child.streak > 0 ? Math.min(70, child.streak * 5 + child.level * 2) : 0;
            // Rank: count how many village players have more stars
            const rank = VILLAGE_STARS.filter(s => s > child.stars).length + 1;
            // Week dots: filled days = min(streak, 6), today always shown
            const weekStatus = WEEK.map((_, i) => {
              if (i === 6) return 'today';
              return i < Math.min(child.streak, 6) ? 'done' : 'missed';
            });

            return (
              <>
                {/* Overview stats */}
                <div className="parent-overview">
                  <div className="parent-stat-card parent-stat-card-streak glass-card" data-icon="🔥">
                    <div className="parent-stat-label">{t.streak}</div>
                    <div className="parent-stat-value text-amber">{child.streak}</div>
                    <div className="parent-stat-sub">दिन लगातार</div>
                  </div>
                  <div className="parent-stat-card parent-stat-card-stars glass-card" data-icon="⭐">
                    <div className="parent-stat-label">{t.stars}</div>
                    <div className="parent-stat-value text-purple">{child.stars}</div>
                    <div className="parent-stat-sub">इस महीने</div>
                  </div>
                  <div className="parent-stat-card parent-stat-card-time glass-card" data-icon="⏱️">
                    <div className="parent-stat-label">समय</div>
                    <div className="parent-stat-value text-cyan">{weeklyMins}</div>
                    <div className="parent-stat-sub">मिनट/सप्ताह</div>
                  </div>
                  <div className="parent-stat-card parent-stat-card-rank glass-card" data-icon="🏆">
                    <div className="parent-stat-label">{t.rank}</div>
                    <div className="parent-stat-value text-green">#{rank}</div>
                    <div className="parent-stat-sub">गाँव में</div>
                  </div>
                </div>

                {/* Subject progress — derived from level */}
                <div className="parent-progress">
                  <div className="section-title">📊 {t.progress}</div>
                  <div className="glass-card parent-progress-card">
                    <div className="subject-progress-row">
                      <div className="subject-bar">
                        <div className="subject-bar-header">
                          <span className="subject-bar-name">🔢 {t.math}</span>
                          <span className="subject-bar-pct">{mathPct}%</span>
                        </div>
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill" style={{ width: `${mathPct}%` }} />
                        </div>
                      </div>
                      <div className="subject-bar">
                        <div className="subject-bar-header">
                          <span className="subject-bar-name">🌿 {t.evs}</span>
                          <span className="subject-bar-pct">{evsPct}%</span>
                        </div>
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill" style={{ width: `${evsPct || 0}%`, background: 'linear-gradient(90deg, var(--green), var(--cyan))' }} />
                        </div>
                        {evsPct === 0 && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                            🔒 Level 4 के बाद खुलेगा
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Streak calendar — derived from streak count */}
                <div className="streak-calendar">
                  <div className="section-title">📅 इस सप्ताह</div>
                  <div className="glass-card streak-calendar-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-primary)' }}>
                        सप्ताहिक स्ट्रीक
                      </span>
                      <span className="badge badge-amber">🔥 {child.streak} दिन</span>
                    </div>
                    <div className="week-dots">
                      {WEEK.map((day, i) => (
                        <div key={day} className="week-day">
                          <div className={`week-day-dot ${weekStatus[i]}`}>
                            {weekStatus[i] === 'done' ? '✓' : weekStatus[i] === 'missed' ? '✗' : '•'}
                          </div>
                          <span className="week-day-label">{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="parent-actions">
                  <div className="section-title">⚡ त्वरित कार्य</div>
                  <div className="parent-action-row" onClick={() => navigate('weeklyreport')}>
                    <div className="parent-action-icon" style={{ background: 'rgba(162,155,254,0.2)' }}>📋</div>
                    <div className="parent-action-text">
                      <div className="parent-action-title">{t.weeklyReport}</div>
                      <div className="parent-action-sub">PDF डाउनलोड और WhatsApp से शेयर करें</div>
                    </div>
                    <span className="parent-action-arrow">›</span>
                  </div>
                  <div className="parent-action-row" onClick={() => navigate('subscription')}>
                    <div className="parent-action-icon" style={{ background: 'rgba(255,217,61,0.2)' }}>💎</div>
                    <div className="parent-action-text">
                      <div className="parent-action-title">{t.subscribe}</div>
                      <div className="parent-action-sub">₹5/दिन · ₹29/सप्ताह · ₹99/माह</div>
                    </div>
                    <span className="parent-action-arrow">›</span>
                  </div>
                  <div className="parent-action-row" onClick={() => navigate('settings')}>
                    <div className="parent-action-icon" style={{ background: 'rgba(78,205,196,0.2)' }}>⚙️</div>
                    <div className="parent-action-text">
                      <div className="parent-action-title">{t.settings}</div>
                      <div className="parent-action-sub">भाषा, सूचनाएँ, अकाउंट</div>
                    </div>
                    <span className="parent-action-arrow">›</span>
                  </div>
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}
