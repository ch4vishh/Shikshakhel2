import { useState, useRef } from 'react';
import { useApp, useT } from '../context/AppContext';
import '../styles/Login.css';

export default function LoginScreen() {
  const { navigate } = useApp();
  const t = useT();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const sendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(30);
      const interval = setInterval(() => {
        setTimer(t => { if (t <= 1) { clearInterval(interval); return 0; } return t - 1; });
      }, 1000);
    }, 1200);
  };

  const handleOtpChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 3) otpRefs[idx + 1].current?.focus();
    if (!val && idx > 0) otpRefs[idx - 1].current?.focus();
    // Auto-submit when all filled
    if (idx === 3 && val) {
      const full = [...next].join('');
      if (full.length === 4) {
        setLoading(true);
        setTimeout(() => { setLoading(false); navigate('profile'); }, 1000);
      }
    }
  };

  const verifyOtp = () => {
    if (otp.join('').length < 4) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('profile'); }, 1000);
  };

  return (
    <div className="login-screen">
      <div className="login-bg-blob login-bg-blob-1" />
      <div className="login-bg-blob login-bg-blob-2" />

      <div className="glass-card login-card">
        <div className="login-header">
          <span className="login-icon">🏫</span>
          <h2>{step === 'phone' ? 'माता-पिता लॉगिन' : 'OTP दर्ज करें'}</h2>
          <p>
            {step === 'phone'
              ? 'अपना मोबाइल नंबर डालें'
              : `${phone} पर OTP भेजा गया`}
          </p>
        </div>

        {/* Step indicator */}
        <div className="login-step-indicator">
          <div className={`step-dot ${step === 'phone' || step === 'otp' ? 'active' : ''}`} />
          <div className="step-line" />
          <div className={`step-dot ${step === 'otp' ? 'active' : ''}`} />
        </div>

        <div className="login-form">
          {step === 'phone' ? (
            <>
              <div className="input-group">
                <label className="input-label">मोबाइल नंबर</label>
                <div className="input-row">
                  <span className="input-prefix">🇮🇳 +91</span>
                  <input
                    className="input-glass"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={e => e.key === 'Enter' && sendOtp()}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary btn-full btn-lg send-otp-btn"
                onClick={sendOtp}
                disabled={loading || phone.length < 10}
              >
                {loading ? '⏳ भेज रहे हैं...' : '📱 OTP भेजें'}
              </button>
            </>
          ) : (
            <>
              <div className="input-group">
                <label className="input-label">4-अंकी OTP</label>
                <div className="otp-inputs">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      className="input-glass otp-input"
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => e.key === 'Backspace' && !digit && i > 0 && otpRefs[i-1].current?.focus()}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="otp-timer">
                {timer > 0
                  ? `${timer}s में दोबारा भेजें`
                  : <span onClick={() => { setTimer(30); }}>दोबारा OTP भेजें</span>}
              </div>

              <button
                className="btn btn-primary btn-full btn-lg"
                onClick={verifyOtp}
                disabled={loading || otp.join('').length < 4}
              >
                {loading ? '⏳ जाँच रहे हैं...' : '✅ OTP जाँचें'}
              </button>

              <button
                className="btn btn-glass btn-full btn-sm"
                onClick={() => setStep('phone')}
              >
                ← नंबर बदलें
              </button>
            </>
          )}

          <div className="login-divider"><span>या</span></div>

          <button
            className="btn btn-glass btn-full"
            onClick={() => navigate('profile')}
          >
            🔍 Demo मोड में देखें
          </button>
        </div>
      </div>
    </div>
  );
}
