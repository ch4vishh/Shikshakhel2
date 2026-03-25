import { useState } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/LevelMap.css';

// Base level definitions — status is computed dynamically per profile
const mathLevelDefs = [
  { id: 1,  name: 'संख्याएँ सीखो',   desc: '1–10 गिनती',          emoji: '1️⃣' },
  { id: 2,  name: 'संख्याएँ 11–20',  desc: '11 से 20 तक',         emoji: '2️⃣' },
  { id: 3,  name: 'जोड़ना (1-अंक)',   desc: 'एकल अंक जोड़',        emoji: '➕' },
  { id: 4,  name: 'घटाना (1-अंक)',   desc: 'एकल अंक घटाव',        emoji: '➖' },
  { id: 5,  name: 'Number Bonds',    desc: '10 के जोड़े',          emoji: '🔗' },
  { id: 6,  name: 'दहाई और इकाई',   desc: 'Place Value',          emoji: '🏛️' },
  { id: 7,  name: 'जोड़ना (2-अंक)',   desc: '10-99 जोड़',           emoji: '💯' },
  { id: 8,  name: 'घटाना (2-अंक)',   desc: '10-99 घटाव',          emoji: '🎯' },
  { id: 9,  name: 'गुणन टेबल',      desc: '2 और 5 का पहाड़ा',     emoji: '✖️' },
  { id: 10, name: 'आकार और माप',    desc: 'Shapes & Measurement', emoji: '📐' },
];

const evsLevelDefs = [
  { id: 1, name: 'मेरा परिवार',  desc: 'Family members',    emoji: '👨‍👩‍👧' },
  { id: 2, name: 'पशु-पक्षी',    desc: 'Animals & Birds',   emoji: '🦁' },
  { id: 3, name: 'पौधे और पेड़', desc: 'Plants & Trees',    emoji: '🌳' },
  { id: 4, name: 'मौसम',        desc: 'Weather & Seasons', emoji: '☀️' },
  { id: 5, name: 'भोजन',        desc: 'Food & Nutrition',  emoji: '🍎' },
];

/**
 * Compute level status based on profile's current level number.
 * Levels below profileLevel are completed, profileLevel is active, rest are locked.
 * Stars awarded only to completed levels (mock: 3 stars for 2+ below, 2 for 1 below active).
 */
function buildLevels(defs, profileLevel) {
  return defs.map((def) => {
    if (def.id < profileLevel) {
      const stars = def.id < profileLevel - 1 ? 3 : 2;
      return { ...def, status: 'completed', stars };
    }
    if (def.id === profileLevel) {
      return { ...def, status: 'active', stars: 0 };
    }
    return { ...def, status: 'locked', stars: 0 };
  });
}

export default function LevelMapScreen() {
  const { navigate, activeProfile } = useApp();
  const t = useT();
  const [activeSubject, setActiveSubject] = useState('math');

  // For a brand-new profile, level defaults to 1 → only first level active, rest locked
  const profileLevel = activeProfile?.level ?? 1;

  const mathLevels = buildLevels(mathLevelDefs, profileLevel);
  // EVS unlocks later — offset by 3 so new users start with EVS locked too
  const evsProfileLevel = Math.max(1, profileLevel - 3);
  const evsLevels = buildLevels(evsLevelDefs, evsProfileLevel);

  const sections = {
    math: [
      { label: 'अध्याय 1: संख्याएँ',    items: mathLevels.slice(0, 4) },
      { label: 'अध्याय 2: जोड़-घटाव',   items: mathLevels.slice(4, 8) },
      { label: 'अध्याय 3: उन्नत',       items: mathLevels.slice(8) },
    ],
    evs: [
      { label: 'अध्याय 1: मेरा संसार', items: evsLevels },
    ],
  };

  const handleLevelClick = (level) => {
    if (level.status === 'locked') return;
    navigate('game');
  };

  return (
    <div className="levelmap-screen">
      <div className="levelmap-header">
        <button className="levelmap-back" onClick={() => navigate('dashboard')}>
          ← {t.back}
        </button>
        <h2 className="text-gradient">स्तर का नक्शा</h2>
        <p>
          {activeProfile?.name} — Level {profileLevel} •&nbsp;
          अपना विषय चुनें
        </p>
      </div>

      {/* Subject Tabs */}
      <div className="levelmap-tabs">
        <button
          className={`levelmap-tab ${activeSubject === 'math' ? 'active' : ''}`}
          onClick={() => setActiveSubject('math')}
        >🔢 {t.math}</button>
        <button
          className={`levelmap-tab ${activeSubject === 'evs' ? 'active' : ''}`}
          onClick={() => setActiveSubject('evs')}
        >🌿 {t.evs}</button>
      </div>

      {/* Level Path */}
      <div className="level-path">
        {sections[activeSubject].map((section) => (
          <div key={section.label}>
            <div className="level-section-header">
              <span className="level-section-label">{section.label}</span>
              <div className="level-section-line" />
            </div>
            {section.items.map((level, i) => (
              <div
                key={level.id}
                className={`level-node ${level.status}`}
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => handleLevelClick(level)}
              >
                <div className="level-node-circle">
                  {level.status === 'completed' ? '✓'
                    : level.status === 'locked' ? '🔒'
                    : level.emoji}
                </div>
                <div className="level-node-info">
                  <div className="level-node-name">{level.name}</div>
                  <div className="level-node-desc">{level.desc}</div>
                </div>
                <div className="level-node-stars">
                  {[1, 2, 3].map(s => (
                    <span key={s} className={s <= level.stars ? 'star-filled' : 'star-empty'}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
