import { useState } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/ProfileSelector.css';

const AVATARS = ['🦁', '🦋', '🐯', '🦊', '🐘', '🦄', '🐬', '🦅', '🐸', '🐼'];
const CLASSES = ['1', '2', '3'];

export default function ProfileSelectorScreen() {
  const { profiles, selectProfile, setProfiles } = useApp();
  const t = useT();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('🦁');
  const [newClass, setNewClass] = useState('1');

  const addProfile = () => {
    if (!newName.trim()) return;
    const p = {
      id: Date.now(),
      name: newName.trim(),
      avatar: newAvatar,
      class: parseInt(newClass),
      stars: 0,
      streak: 0,
      level: 1,
    };
    setProfiles(prev => [...prev, p]);
    setShowModal(false);
    setNewName('');
    setNewAvatar('🦁');
    setNewClass('1');
  };

  return (
    <div className="profile-screen bg-gradient">
      <div className="profile-header fade-in-up">
        <h2 className="text-gradient">बच्चा चुनें</h2>
        <p>कौन आज सीखेगा?</p>
      </div>

      <div className="profiles-grid fade-in-up">
        {profiles.map((p, i) => (
          <div
            key={p.id}
            className="profile-card"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => selectProfile(p)}
          >
            <div className="profile-avatar">{p.avatar}</div>
            <div className="profile-card-name">{p.name}</div>
            <div className="profile-card-meta">
              <span className="profile-card-class">कक्षा {p.class}</span>
              <div className="profile-card-stats">
                <span className="profile-stat">⭐ {p.stars}</span>
                <span className="profile-stat">🔥 {p.streak}</span>
              </div>
            </div>

            {/* Progress bar — star-based so it's always meaningful and visible */}
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  {p.stars === 0 ? '🌱 नया प्रोफ़ाइल' : `⭐ ${p.stars} सितारे`}
                </span>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--lavender), var(--pink))',
                  color: '#fff', padding: '2px 8px', borderRadius: 99
                }}>
                  Lv.{p.level}
                </span>
              </div>
              <div className="progress-bar-track" style={{ height: 8 }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    width: p.stars === 0
                      ? '6%'                                      // new profile: show a tiny visible stub
                      : `${Math.min(100, (p.stars / 500) * 100)}%`  // star-based progress
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {profiles.length < 3 && (
          <div className="profile-card add-profile-card" onClick={() => setShowModal(true)}>
            <div className="add-profile-icon">➕</div>
            <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-primary)', fontWeight: 700 }}>
              {t.addChild}
            </span>
          </div>
        )}
      </div>

      {/* Add Profile Bottom Sheet */}
      {showModal && (
        <div className="add-profile-modal" onClick={() => setShowModal(false)}>
          <div className="add-profile-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <h3>नया बच्चा जोड़ें</h3>

            <div className="input-group">
              <label className="input-label">बच्चे का नाम</label>
              <input
                className="input-glass"
                placeholder="जैसे: अर्जुन, प्रिया..."
                value={newName}
                onChange={e => setNewName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="input-group">
              <label className="input-label">अवतार चुनें</label>
              <div className="avatar-picker">
                {AVATARS.map(a => (
                  <button
                    key={a}
                    className={`avatar-option ${newAvatar === a ? 'selected' : ''}`}
                    onClick={() => setNewAvatar(a)}
                  >{a}</button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">कक्षा</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {CLASSES.map(c => (
                  <button
                    key={c}
                    className={`btn ${newClass === c ? 'btn-primary' : 'btn-glass'} btn-sm`}
                    style={{ flex: 1 }}
                    onClick={() => setNewClass(c)}
                  >कक्षा {c}</button>
                ))}
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={addProfile}>
              ✅ {t.addChild}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
