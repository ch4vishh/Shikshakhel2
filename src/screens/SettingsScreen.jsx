import { useState } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/Settings.css';

export default function SettingsScreen() {
  const { navigate, parent, language, setLanguage } = useApp();
  const t = useT();
  const [notifs, setNotifs] = useState(true);
  const [sounds, setSounds] = useState(true);

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <button className="settings-back" onClick={() => navigate('dashboard')}>←</button>
        <h2>{t.settings}</h2>
      </div>

      {/* Profile */}
      <div className="settings-group settings-profile">
        <div className="glass-card settings-profile-card">
          <div className="settings-profile-avatar">👨</div>
          <div className="settings-profile-info">
            <div className="settings-profile-name">{parent.name}</div>
            <div className="settings-profile-phone">📱 +91 {parent.phone}</div>
            <div className="settings-profile-phone">📍 {parent.village}</div>
          </div>
          <button className="settings-profile-edit">✏️ Edit</button>
        </div>
      </div>

      {/* Language */}
      <div className="settings-group">
        <div className="settings-group-label">🌐 भाषा / Language</div>
        <div className="settings-list">
          <div className="settings-row" style={{ cursor: 'default' }}>
            <div className="settings-row-icon" style={{ background: 'rgba(124,58,237,0.15)' }}>🌐</div>
            <div className="settings-row-text">
              <div className="settings-row-title">भाषा चुनें</div>
            </div>
            <div className="lang-pills">
              <button
                className={`lang-pill ${language === 'hi' ? 'active' : ''}`}
                onClick={() => setLanguage('hi')}
              >हिंदी</button>
              <button
                className={`lang-pill ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >English</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-group">
        <div className="settings-group-label">🔔 सूचनाएँ / Notifications</div>
        <div className="settings-list">
          <div className="settings-row">
            <div className="settings-row-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>🔔</div>
            <div className="settings-row-text">
              <div className="settings-row-title">Push Notifications</div>
              <div className="settings-row-sub">रोज़ाना मिशन रिमाइंडर</div>
            </div>
            <label className="settings-toggle">
              <input type="checkbox" checked={notifs} onChange={e => setNotifs(e.target.checked)} />
              <span className="settings-toggle-track" />
            </label>
          </div>
          <div className="settings-row">
            <div className="settings-row-icon" style={{ background: 'rgba(6,182,212,0.15)' }}>🔊</div>
            <div className="settings-row-text">
              <div className="settings-row-title">Sound Effects</div>
              <div className="settings-row-sub">गेम में आवाज़ें</div>
            </div>
            <label className="settings-toggle">
              <input type="checkbox" checked={sounds} onChange={e => setSounds(e.target.checked)} />
              <span className="settings-toggle-track" />
            </label>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="settings-group">
        <div className="settings-group-label">👤 खाता / Account</div>
        <div className="settings-list">
          <div className="settings-row" onClick={() => navigate('subscription')}>
            <div className="settings-row-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>💎</div>
            <div className="settings-row-text">
              <div className="settings-row-title">{t.subscribe}</div>
              <div className="settings-row-sub">₹5/दिन से शुरू</div>
            </div>
            <span className="settings-chevron">›</span>
          </div>
          <div className="settings-row" onClick={() => navigate('weeklyreport')}>
            <div className="settings-row-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>📋</div>
            <div className="settings-row-text">
              <div className="settings-row-title">{t.weeklyReport}</div>
              <div className="settings-row-sub">PDF & WhatsApp</div>
            </div>
            <span className="settings-chevron">›</span>
          </div>
          <div className="settings-row" onClick={() => navigate('onboarding')}>
            <div className="settings-row-icon" style={{ background: 'rgba(124,58,237,0.15)' }}>❓</div>
            <div className="settings-row-text">
              <div className="settings-row-title">ऐप Tutorial</div>
              <div className="settings-row-sub">फिर से देखें</div>
            </div>
            <span className="settings-chevron">›</span>
          </div>
          <div className="settings-row danger" onClick={() => navigate('login')}>
            <div className="settings-row-icon" style={{ background: 'rgba(244,63,94,0.12)' }}>🚪</div>
            <div className="settings-row-text">
              <div className="settings-row-title">{t.logout}</div>
            </div>
            <span className="settings-chevron">›</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          Shikshakhel v1.0.0 MVP · F‑Society Team
        </p>
      </div>
    </div>
  );
}
