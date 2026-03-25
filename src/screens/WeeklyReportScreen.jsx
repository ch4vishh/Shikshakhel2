import { useApp, useT } from '../context/AppContext';

export default function WeeklyReportScreen() {
  const { navigate, activeProfile, parent } = useApp();
  const t = useT();
  const profile = activeProfile || { name: 'Arjun', avatar: '🦁', stars: 218, streak: 5, class: 1 };

  return (
    <div className="bg-gradient" style={{ minHeight: '100dvh', padding: '52px 20px 100px', overflowY: 'auto' }}>
      <button
        className="btn btn-glass btn-sm"
        style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}
        onClick={() => navigate('parent')}
      >← {t.back}</button>

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 className="text-gradient">{t.weeklyReport}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>25 मार्च 2026</p>
      </div>

      {/* Report card */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            fontSize: 40, width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.15)'
          }}>{profile.avatar}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '1.1rem' }}>{profile.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>कक्षा {profile.class} • {parent?.village}</div>
          </div>
        </div>

        {[
          { label: 'कुल सितारे अर्जित', value: `⭐ ${profile.stars}`, color: 'text-amber' },
          { label: 'स्ट्रीक', value: `🔥 ${profile.streak} दिन`, color: 'text-rose' },
          { label: 'गेम स्तर पूरे', value: '🎮 6 स्तर', color: 'text-cyan' },
          { label: 'कुल समय', value: '⏱️ 42 मिनट', color: 'text-purple' },
          { label: 'गाँव में रैंक', value: '🏆 #4', color: 'text-green' },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{row.label}</span>
            <span className={`${row.color}`} style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '0.95rem' }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Topic-wise progress */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>📚 विषय प्रगति</div>
        {[
          { name: '🔢 गणित', pct: 58, color: 'linear-gradient(90deg, var(--purple-main), var(--cyan))' },
          { name: '🌿 पर्यावरण', pct: 35, color: 'linear-gradient(90deg, var(--green), var(--cyan))' },
        ].map(s => (
          <div key={s.name} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.pct}%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Share actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary btn-full btn-lg">
          📱 WhatsApp पर शेयर करें
        </button>
        <button className="btn btn-glass btn-full">
          📄 PDF डाउनलोड करें
        </button>
      </div>
    </div>
  );
}
