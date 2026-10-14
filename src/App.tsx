/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp, ScreenId } from './context/AppContext';
import { AndroidStatusBar, AndroidBottomNav } from './components/PhoneFrame';
import { Screen1Splash } from './screens/Screen1Splash';
import { Screen2Home } from './screens/Screen2Home';
import { Screen3Packages } from './screens/Screen3Packages';
import { Screen4Search } from './screens/Screen4Search';
import { Screen5PackageDetails } from './screens/Screen5PackageDetails';
import { Screen6BookingForm } from './screens/Screen6BookingForm';
import { Screen7PassengerDetails } from './screens/Screen7PassengerDetails';
import { Screen8Payment } from './screens/Screen8Payment';
import { Screen9VisaDocs } from './screens/Screen9VisaDocs';
import { Screen10Hotels } from './screens/Screen10Hotels';
import { Screen11Ziyarat } from './screens/Screen11Ziyarat';
import { Screen12Contact } from './screens/Screen12Contact';
import { ScreenMyBookings } from './screens/ScreenMyBookings';
import { ScreenProfile } from './screens/ScreenProfile';
import { AdminDashboard } from './screens/AdminDashboard';
import { ShowcaseGrid } from './screens/ShowcaseGrid';
import { AndroidSourceViewer } from './screens/AndroidSourceViewer';
import { Smartphone, Grid, Shield, Code, ChevronDown } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeScreen, navigateTo, viewMode, setViewMode } = useApp();

  const screenOptions: { id: ScreenId; label: string }[] = [
    { id: 'splash', label: '1. Splash Screen' },
    { id: 'home', label: '2. Home Screen' },
    { id: 'packages', label: '3. Umrah Packages' },
    { id: 'search', label: '4. Search & Filter' },
    { id: 'package_details', label: '5. Package Details' },
    { id: 'booking_form', label: '6. Booking Form' },
    { id: 'passenger_details', label: '7. Passenger Details' },
    { id: 'payment', label: '8. Payment Screen' },
    { id: 'visa_docs', label: '9. Visa & Documents' },
    { id: 'hotels', label: '10. Hotel Details' },
    { id: 'ziyarat', label: '11. Ziyarat Places' },
    { id: 'contact', label: '12. Contact & WhatsApp' },
    { id: 'my_bookings', label: 'My Bookings (Tab)' },
    { id: 'profile', label: 'Profile (Tab)' }
  ];

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'splash':
        return <Screen1Splash />;
      case 'home':
        return <Screen2Home />;
      case 'packages':
        return <Screen3Packages />;
      case 'search':
        return <Screen4Search />;
      case 'package_details':
        return <Screen5PackageDetails />;
      case 'booking_form':
        return <Screen6BookingForm />;
      case 'passenger_details':
        return <Screen7PassengerDetails />;
      case 'payment':
        return <Screen8Payment />;
      case 'visa_docs':
        return <Screen9VisaDocs />;
      case 'hotels':
        return <Screen10Hotels />;
      case 'ziyarat':
        return <Screen11Ziyarat />;
      case 'contact':
        return <Screen12Contact />;
      case 'my_bookings':
        return <ScreenMyBookings />;
      case 'profile':
        return <ScreenProfile />;
      default:
        return <Screen2Home />;
    }
  };

  if (viewMode === 'showcase_grid') {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col">
        {/* Navigation Toolbar */}
        <TopControlsBar />
        <ShowcaseGrid />
      </div>
    );
  }

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col">
        <TopControlsBar />
        <AdminDashboard />
      </div>
    );
  }

  if (viewMode === 'android_source') {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col">
        <TopControlsBar />
        <AndroidSourceViewer />
      </div>
    );
  }

  // Default: Phone Emulator Mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 flex flex-col items-center justify-start text-stone-100 font-sans">
      <TopControlsBar />

      <main className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-6">
        {/* Android Phone Mockup Frame */}
        <div className="w-full max-w-[420px] h-[860px] max-h-[92vh] bg-black rounded-[42px] border-[10px] border-stone-800 shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-white/10">
          {/* Top Speaker Ear-piece */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-stone-700 rounded-full z-40 pointer-events-none" />

          {/* Android Status Bar */}
          <AndroidStatusBar />

          {/* Screen Content Viewport */}
          <div className="flex-1 overflow-y-auto bg-[#FFF9EB] relative scrollbar-thin">
            {renderActiveScreen()}
          </div>

          {/* Android Bottom Navigation */}
          <AndroidBottomNav />

          {/* Android Gesture Bar */}
          <div className="h-4 bg-black flex items-center justify-center shrink-0 z-40">
            <div className="w-28 h-1 bg-stone-500 rounded-full" />
          </div>
        </div>
      </main>
    </div>
  );
};

const TopControlsBar: React.FC = () => {
  const { viewMode, setViewMode, activeScreen, navigateTo } = useApp();

  const screenOptions: { id: ScreenId; label: string }[] = [
    { id: 'splash', label: '1. Splash Screen' },
    { id: 'home', label: '2. Home Screen' },
    { id: 'packages', label: '3. Umrah Packages' },
    { id: 'search', label: '4. Search & Filter' },
    { id: 'package_details', label: '5. Package Details' },
    { id: 'booking_form', label: '6. Booking Form' },
    { id: 'passenger_details', label: '7. Passenger Details' },
    { id: 'payment', label: '8. Payment Screen' },
    { id: 'visa_docs', label: '9. Visa & Documents' },
    { id: 'hotels', label: '10. Hotel Details' },
    { id: 'ziyarat', label: '11. Ziyarat Places' },
    { id: 'contact', label: '12. Contact & WhatsApp' },
    { id: 'my_bookings', label: 'My Bookings (Tab)' },
    { id: 'profile', label: 'Profile (Tab)' }
  ];

  return (
    <header className="w-full bg-[#032D23] border-b border-[#D8B45A]/30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-white z-50">
      <div className="flex items-center space-x-2.5">
        <div className="w-7 h-7 rounded-full bg-[#064632] border border-[#D8B45A] flex items-center justify-center text-[#D8B45A] font-bold text-xs">
          AH
        </div>
        <div className="truncate">
          <span className="font-extrabold text-[#D8B45A] tracking-wider uppercase font-serif">
            AL HINDWAN TOURS
          </span>
          <span className="text-[10px] text-emerald-200 ml-2 hidden sm:inline">
            Umrah-Only Native Android App Showcase
          </span>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex items-center space-x-1.5 overflow-x-auto">
        <button
          onClick={() => setViewMode('emulator')}
          className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
            viewMode === 'emulator'
              ? 'bg-[#D8B45A] text-[#032D23] shadow-xs'
              : 'bg-white/10 text-stone-300 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Phone Emulator</span>
        </button>

        <button
          onClick={() => setViewMode('showcase_grid')}
          className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
            viewMode === 'showcase_grid'
              ? 'bg-[#D8B45A] text-[#032D23] shadow-xs'
              : 'bg-white/10 text-stone-300 hover:text-white'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>12-Screen Grid</span>
        </button>

        <button
          onClick={() => setViewMode('admin')}
          className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
            viewMode === 'admin'
              ? 'bg-[#D8B45A] text-[#032D23] shadow-xs'
              : 'bg-white/10 text-stone-300 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin Console</span>
        </button>

        <button
          onClick={() => setViewMode('android_source')}
          className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
            viewMode === 'android_source'
              ? 'bg-[#D8B45A] text-[#032D23] shadow-xs'
              : 'bg-white/10 text-stone-300 hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Android Source</span>
        </button>
      </div>

      {/* Screen Jumper in Emulator Mode */}
      {viewMode === 'emulator' && (
        <div className="relative">
          <select
            value={activeScreen}
            onChange={(e) => navigateTo(e.target.value as ScreenId)}
            className="px-2.5 py-1.5 pr-7 rounded-lg bg-emerald-950/80 border border-[#D8B45A]/40 text-xs font-semibold text-[#D8B45A] appearance-none focus:outline-hidden cursor-pointer"
          >
            {screenOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-stone-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#D8B45A] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      )}
    </header>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
