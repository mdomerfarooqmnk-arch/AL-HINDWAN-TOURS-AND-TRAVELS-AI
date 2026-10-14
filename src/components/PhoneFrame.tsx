import React from 'react';
import { Wifi, Battery, Signal, Home, Compass, CalendarCheck, User } from 'lucide-react';
import { useApp, ScreenId } from '../context/AppContext';

export const AndroidStatusBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-5 py-2 text-white text-xs select-none bg-[#032D23]/90 backdrop-blur-sm z-30">
      <span className="font-semibold tracking-wider text-[11px]">9:41</span>
      {/* Front camera punch hole */}
      <div className="w-3.5 h-3.5 bg-black rounded-full border border-white/20 mx-auto -mr-2" />
      <div className="flex items-center space-x-1.5 opacity-90">
        <Signal className="w-3 h-3 text-white" />
        <Wifi className="w-3 h-3 text-white" />
        <Battery className="w-3.5 h-3.5 text-white" />
      </div>
    </div>
  );
};

export const AndroidBottomNav: React.FC<{ activeTab?: string }> = () => {
  const { activeScreen, navigateTo } = useApp();

  const navItems: { id: ScreenId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'packages', label: 'Packages', icon: Compass },
    { id: 'my_bookings', label: 'Booking', icon: CalendarCheck },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Don't show bottom nav on splash or booking form flow to preserve screen space
  if (
    activeScreen === 'splash' ||
    activeScreen === 'booking_form' ||
    activeScreen === 'passenger_details' ||
    activeScreen === 'payment'
  ) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#064632] border-t border-[#D8B45A]/30 px-3 py-1.5 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          activeScreen === item.id ||
          (item.id === 'packages' && (activeScreen === 'package_details' || activeScreen === 'search'));

        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all min-h-[44px] min-w-[56px] ${
              isActive
                ? 'text-[#D8B45A] font-bold scale-105'
                : 'text-emerald-100/70 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.label}</span>
            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#D8B45A] mt-0.5" />}
          </button>
        );
      })}
    </div>
  );
};

export const ScreenHeader: React.FC<{
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}> = ({ title, onBack, rightAction }) => {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#064632] border-b border-[#D8B45A]/20 text-white shadow-sm">
      <div className="flex items-center space-x-2">
        {onBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
            aria-label="Back"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h2 className="text-base font-bold text-white tracking-wide truncate">{title}</h2>
      </div>
      <div>{rightAction}</div>
    </div>
  );
};
