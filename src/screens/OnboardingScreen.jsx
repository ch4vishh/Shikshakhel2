import { useState } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/Onboarding.css';

const slides = [
  {
    emoji: '🎮',
    titleHi: 'खेलो और सीखो!',
    titleEn: 'Play & Learn!',
    descHi: 'हर रोज़ 5-10 मिनट के मज़ेदार गेम से कक्षा 1-3 का गणित और पर्यावरण सीखो।',
    descEn: 'Master Class 1–3 Maths and EVS with fun 5–10 minute game sessions every day.',
    badge: { labelHi: 'कक्षा 1–3', labelEn: 'Class 1–3', cls: 'badge-purple' },
    illClass: 'onboarding-illustration-1',
  },
  {
    emoji: '🔥',
    titleHi: 'स्ट्रीक बनाओ!',
    titleEn: 'Build Streaks!',
    descHi: 'रोज़ सीखने से स्ट्रीक बढ़ती है। बैज जीतो और अपने गाँव में टॉप रैंक पाओ।',
    descEn: 'Daily learning builds streaks. Win badges and top the village leaderboard!',
    badge: { labelHi: '🏅 बैज और इनाम', labelEn: '🏅 Badges & Rewards', cls: 'badge-amber' },
    illClass: 'onboarding-illustration-2',
  },
  {
    emoji: '📊',
    titleHi: 'माता-पिता के लिए रिपोर्ट',
    titleEn: 'Reports for Parents',
    descHi: 'हर रोज़ WhatsApp पर प्रगति रिपोर्ट। जानो आपका बच्चा क्या सीख रहा है।',
    descEn: 'Daily WhatsApp progress reports so parents always know what their child learned.',
    badge: { labelHi: '📱 WhatsApp अपडेट', labelEn: '📱 WhatsApp Updates', cls: 'badge-green' },
    illClass: 'onboarding-illustration-3',
  },
];

export default function OnboardingScreen() {
  const { navigate, language } = useApp();
  const t = useT();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
    else navigate('login');
  };

  const skip = () => navigate('login');
  const slide = slides[current];
  const isHi = language === 'hi';

  return (
    <div className="onboarding-screen bg-gradient">
      <div className="onboarding-content">
        <div className="onboarding-slide" key={current}>
          <div className={`onboarding-illustration ${slide.illClass}`}>
            {slide.emoji}
          </div>

          <div>
            <h2 className="text-gradient">
              {isHi ? slide.titleHi : slide.titleEn}
            </h2>
          </div>

          <span className={`badge ${slide.badge.cls}`}>
            {isHi ? slide.badge.labelHi : slide.badge.labelEn}
          </span>

          <p>{isHi ? slide.descHi : slide.descEn}</p>
        </div>

        {/* Indicators */}
        <div className="onboarding-indicators">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`indicator-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      <div className="onboarding-footer">
        <button className="onboarding-skip" onClick={skip}>
          {t.continue} →
        </button>
        <button className="btn btn-primary onboarding-next" onClick={next}>
          {current === slides.length - 1 ? t.start : t.next}
        </button>
      </div>
    </div>
  );
}
