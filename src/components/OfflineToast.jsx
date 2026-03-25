import { useApp } from '../context/AppContext';
import '../styles/Components.css';

export default function OfflineToast() {
  const { isOnline } = useApp();
  if (isOnline) return null;
  return (
    <div className="offline-toast">
      <div className="offline-toast-dot" />
      📶 ऑफलाइन मोड में हैं
    </div>
  );
}
