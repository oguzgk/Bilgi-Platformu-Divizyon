import React, { useEffect, useState } from 'react';
import { Coins, TrendingUp, X } from 'lucide-react';

interface CoinNotificationProps {
  amount: number;
  reason: string;
  multiplier?: number;
  onClose: () => void;
  autoClose?: number; // milliseconds
}

function CoinNotification({ 
  amount, 
  reason, 
  multiplier = 1,
  onClose,
  autoClose = 5000 
}: CoinNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const isPositive = amount > 0;
  const displayAmount = Math.abs(amount);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Animation süresi sonra kaldır
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-24 right-6 z-50 animate-in slide-in-from-right fade-in duration-300 ${
        !isVisible ? 'animate-out slide-out-to-right fade-out' : ''
      }`}
    >
      <div className={`
        rounded-2xl shadow-2xl border-2 p-4 pr-12 min-w-[280px] relative
        ${isPositive 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
          : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
        }
      `}>
        {/* Close Button */}
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-white/50 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`
            p-2.5 rounded-full mt-0.5
            ${isPositive ? 'bg-green-200' : 'bg-red-200'}
          `}>
            <Coins 
              size={24} 
              className={isPositive ? 'text-green-700' : 'text-red-700'} 
              fill={isPositive ? 'currentColor' : 'none'}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`
                text-2xl font-black
                ${isPositive ? 'text-green-700' : 'text-red-700'}
              `}>
                {isPositive ? '+' : '-'}{displayAmount}
              </span>
              <span className="text-sm font-semibold text-gray-600">GençCoin</span>
              {multiplier > 1 && (
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  {multiplier}x
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-700 font-normal">
              {reason}
            </p>

            {multiplier > 1 && (
              <p className="text-xs text-gray-500 mt-1">
                Temel: {Math.floor(displayAmount / multiplier)} Coin × {multiplier}x Çarpan
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-2xl overflow-hidden">
          <div 
            className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
            style={{
              animation: `shrink ${autoClose}ms linear forwards`
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Context ve hook için
interface CoinNotificationContextType {
  showNotification: (amount: number, reason: string, multiplier?: number) => void;
}

export const CoinNotificationContext = React.createContext<CoinNotificationContextType | null>(null);

export function CoinNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Array<{ id: string; amount: number; reason: string; multiplier: number }>>([]);

  const showNotification = (amount: number, reason: string, multiplier: number = 1) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, amount, reason, multiplier }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <CoinNotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.map((notif, index) => (
        <div key={notif.id} style={{ top: `${6 + index * 7}rem` }}>
          <CoinNotification
            amount={notif.amount}
            reason={notif.reason}
            multiplier={notif.multiplier}
            onClose={() => removeNotification(notif.id)}
          />
        </div>
      ))}
    </CoinNotificationContext.Provider>
  );
}

// Hook
export const useCoinNotification = () => {
  const context = React.useContext(CoinNotificationContext);
  if (!context) {
    throw new Error('useCoinNotification must be used within CoinNotificationProvider');
  }
  return context;
};

export default CoinNotification;

