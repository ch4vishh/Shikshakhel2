import { useState } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/Subscription.css';

const PLANS = [
  {
    id: 'daily',
    nameHi: 'दैनिक पास',
    nameEn: 'Daily Pass',
    amount: '₹5',
    period: 'प्रति दिन',
    descHi: 'एक दिन के लिए सभी स्तर',
    descEn: 'All levels for one day',
    cls: 'plan-card-daily',
    amountColor: 'text-cyan',
    features: ['सभी गेम स्तर', '5-मिनट मिशन', 'WhatsApp रिपोर्ट'],
    featuresEn: ['All game levels', '5-min missions', 'WhatsApp report'],
    popular: false,
  },
  {
    id: 'weekly',
    nameHi: 'साप्ताहिक',
    nameEn: 'Weekly',
    amount: '₹29',
    period: 'प्रति सप्ताह',
    descHi: '7 दिनों की पूरी पहुँच',
    descEn: '7-day full access',
    cls: 'plan-card-weekly',
    amountColor: 'text-purple',
    features: ['रोज़ाना मिशन', 'स्ट्रीक बैज', 'PDF रिपोर्ट', 'लीडरबोर्ड'],
    featuresEn: ['Daily missions', 'Streak badges', 'PDF report', 'Leaderboard'],
    popular: true,
  },
  {
    id: 'monthly',
    nameHi: 'मासिक',
    nameEn: 'Monthly',
    amount: '₹99',
    period: 'प्रति माह',
    descHi: 'पूरे महीने की बेहतरीन value',
    descEn: 'Best value for the month',
    cls: 'plan-card-monthly',
    amountColor: 'text-amber',
    features: ['सब कुछ + प्राथमिकता सहायता', 'AI-आधारित प्रगति', 'असीमित प्रोफ़ाइल'],
    featuresEn: ['Everything + priority support', 'AI-based progress', 'Unlimited profiles'],
    popular: false,
  },
];

export default function SubscriptionScreen() {
  const { navigate, language } = useApp();
  const t = useT();
  const [selected, setSelected] = useState('weekly');
  const [processing, setProcessing] = useState(false);
  const isHi = language === 'hi';

  const pay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); navigate('dashboard'); }, 1500);
  };

  return (
    <div className="subscription-screen">
      <button className="subscription-back" onClick={() => navigate('parent')}>← {t.back}</button>

      <div className="subscription-header">
        <div className="subscription-header-badge">💎 Shikshakhel Premium</div>
        <h2 className="text-gradient">अपना प्लान चुनें</h2>
        <p>बच्चे की शिक्षा में निवेश करें — बहुत कम कीमत में</p>
      </div>

      <div className="plans-container">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`glass-card plan-card ${plan.cls} ${selected === plan.id ? 'selected' : ''}`}
            onClick={() => setSelected(plan.id)}
          >
            {plan.popular && <div className="plan-popular-badge">⭐ सबसे लोकप्रिय</div>}
            <div className="plan-row">
              <div className="plan-info">
                <div className="plan-name">{isHi ? plan.nameHi : plan.nameEn}</div>
                <div className="plan-desc">{isHi ? plan.descHi : plan.descEn}</div>
              </div>
              <div className="plan-price">
                <div className={`plan-amount ${plan.amountColor}`}>{plan.amount}</div>
                <div className="plan-period">{plan.period}</div>
              </div>
            </div>
            <div className="plan-features">
              {(isHi ? plan.features : plan.featuresEn).map(f => (
                <div key={f} className="plan-feature">
                  <span className="plan-check">✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="subscription-cta">
        <button className="btn btn-amber btn-full btn-lg" onClick={pay} disabled={processing}>
          {processing ? '⏳ भुगतान हो रहा है...' : '💳 UPI से भुगतान करें'}
        </button>
        <p>Razorpay द्वारा सुरक्षित • कभी भी रद्द करें</p>
      </div>

      <div className="trust-row">
        <div className="trust-chip">🔒 SSL Secure</div>
        <div className="trust-chip">✅ Razorpay</div>
        <div className="trust-chip">📱 UPI / Card</div>
        <div className="trust-chip">↩️ Easy Cancel</div>
      </div>
    </div>
  );
}
