import { useApp } from '../context/AppContext';
import '../styles/Components.css';

export default function PWAInstallBanner() {
  const { showInstallBanner, setShowInstallBanner, installPWA } = useApp();
  if (!showInstallBanner) return null;

  return (
    <div className="install-banner">
      <span className="install-banner-icon">📲</span>
      <div className="install-banner-text">
        <div className="install-banner-title">ऐप इंस्टॉल करें!</div>
        <div className="install-banner-sub">ऑफलाइन भी खेलें</div>
      </div>
      <div className="install-banner-actions">
        <button className="install-banner-btn install-banner-install" onClick={installPWA}>
          इंस्टॉल
        </button>
        <button
          className="install-banner-btn install-banner-dismiss"
          onClick={() => setShowInstallBanner(false)}
        >✕</button>
      </div>
    </div>
  );
}
