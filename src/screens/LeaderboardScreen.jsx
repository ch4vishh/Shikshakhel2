import { useState, useMemo } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/Leaderboard.css';

// Hardcoded village players (other families)
const VILLAGE_PLAYERS = [
  { id: 'v1', name: 'Priya',  avatar: '🦋', village: 'Sundarpur', stars: 320, streak: 18, class: 2 },
  { id: 'v2', name: 'Ravi',   avatar: '🦅', village: 'Ramnagar',  stars: 280, streak: 14, class: 3 },
  { id: 'v3', name: 'Meena',  avatar: '🦄', village: 'Sundarpur', stars: 265, streak: 11, class: 1 },
  { id: 'v4', name: 'Kavya',  avatar: '🐼', village: 'Devpur',    stars: 195, streak: 8,  class: 2 },
  { id: 'v5', name: 'Rohit',  avatar: '🐯', village: 'Ramnagar',  stars: 178, streak: 6,  class: 3 },
  { id: 'v6', name: 'Ananya', avatar: '🦊', village: 'Sundarpur', stars: 155, streak: 4,  class: 1 },
  { id: 'v7', name: 'Deepak', avatar: '🐸', village: 'Devpur',    stars: 132, streak: 3,  class: 2 },
];

const FILTERS = ['गाँव', 'जिला', 'सप्ताह', 'माह'];

export default function LeaderboardScreen() {
  const { profiles, parent, activeProfile } = useApp();
  const t = useT();
  const [activeFilter, setActiveFilter] = useState('गाँव');

  // Merge: convert your profiles into leaderboard entries, then combine with village players
  const allPlayers = useMemo(() => {
    const myEntries = profiles.map(p => ({
      id: `my-${p.id}`,
      name: p.name,
      avatar: p.avatar,
      village: parent?.village ?? 'Sundarpur',
      stars: p.stars,
      streak: p.streak,
      class: p.class,
      isMe: p.id === activeProfile?.id,   // only the currently selected child
    }));

    // Merge and sort by stars descending
    return [...myEntries, ...VILLAGE_PLAYERS].sort((a, b) => b.stars - a.stars);
  }, [profiles, parent]);

  const top3 = allPlayers.slice(0, 3);
  const rest  = allPlayers.slice(3);

  return (
    <div className="leaderboard-screen">
      <div className="leaderboard-header">
        <h2 className="text-gradient">🏆 {t.leaderboard}</h2>
        <p>अपने गाँव में रैंक देखें</p>
      </div>

      {/* Filters */}
      <div className="leaderboard-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >{f}</button>
        ))}
      </div>

      {/* Podium — only show if we have at least 3 players */}
      {top3.length === 3 && (
        <div className="podium">
          {/* 2nd place */}
          <div className="podium-item">
            <div className="podium-avatar" style={{ border: '2px solid rgba(162,155,254,0.4)' }}>
              {top3[1].avatar}
            </div>
            <div className="podium-name">
              {top3[1].name}{top3[1].isMe && ' 👈'}
            </div>
            <div className="podium-score">⭐ {top3[1].stars}</div>
            <div className="podium-block podium-block-2">2</div>
          </div>

          {/* 1st place */}
          <div className="podium-item podium-1">
            <div className="podium-crown">👑</div>
            <div className="podium-avatar" style={{ width: 68, height: 68, fontSize: 38 }}>
              {top3[0].avatar}
            </div>
            <div className="podium-name">
              {top3[0].name}{top3[0].isMe && ' 👈'}
            </div>
            <div className="podium-score">⭐ {top3[0].stars}</div>
            <div className="podium-block podium-block-1">1</div>
          </div>

          {/* 3rd place */}
          <div className="podium-item">
            <div className="podium-avatar" style={{ border: '2px solid rgba(255,159,67,0.4)' }}>
              {top3[2].avatar}
            </div>
            <div className="podium-name">
              {top3[2].name}{top3[2].isMe && ' 👈'}
            </div>
            <div className="podium-score">⭐ {top3[2].stars}</div>
            <div className="podium-block podium-block-3">3</div>
          </div>
        </div>
      )}

      {/* Rank list */}
      <div className="rank-list">
        {rest.map((player, i) => (
          <div
            key={player.id}
            className={`rank-item ${player.isMe ? 'my-rank' : ''}`}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className={`rank-number ${i < 3 ? 'top3' : ''}`}>{i + 4}</div>
            <div className="rank-avatar-sm">{player.avatar}</div>
            <div className="rank-info">
              <div className="rank-name">
                {player.name}
                {player.isMe && (
                  <span className="badge badge-purple" style={{ fontSize: '0.62rem', padding: '2px 8px', marginLeft: 4 }}>
                    आप
                  </span>
                )}
              </div>
              <div className="rank-village">📍 {player.village} · कक्षा {player.class}</div>
            </div>
            <div className="rank-score">
              <div className="rank-stars">⭐ {player.stars}</div>
              <div className="rank-streak">🔥 {player.streak} दिन</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
