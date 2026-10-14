import React from 'react';
import { useApp } from '../context/AppContext';
import { AndroidStatusBar } from '../components/PhoneFrame';
import { Screen1Splash } from './Screen1Splash';
import { Screen2Home } from './Screen2Home';
import { Screen3Packages } from './Screen3Packages';
import { Screen4Search } from './Screen4Search';
import { Screen5PackageDetails } from './Screen5PackageDetails';
import { Screen6BookingForm } from './Screen6BookingForm';
import { Screen7PassengerDetails } from './Screen7PassengerDetails';
import { Screen8Payment } from './Screen8Payment';
import { Screen9VisaDocs } from './Screen9VisaDocs';
import { Screen10Hotels } from './Screen10Hotels';
import { Screen11Ziyarat } from './Screen11Ziyarat';
import { Screen12Contact } from './Screen12Contact';

interface ScreenShowcaseItem {
  id: string;
  number: number;
  title: string;
  component: React.ReactNode;
}

export const ShowcaseGrid: React.FC = () => {
  const { navigateTo, setViewMode } = useApp();

  const screens: ScreenShowcaseItem[] = [
    { id: 'splash', number: 1, title: 'Splash Screen', component: <Screen1Splash /> },
    { id: 'home', number: 2, title: 'Home Screen', component: <Screen2Home /> },
    { id: 'packages', number: 3, title: 'Umrah Packages', component: <Screen3Packages /> },
    { id: 'search', number: 4, title: 'Search & Filter', component: <Screen4Search /> },
    { id: 'package_details', number: 5, title: 'Package Details', component: <Screen5PackageDetails /> },
    { id: 'booking_form', number: 6, title: 'Booking Form', component: <Screen6BookingForm /> },
    { id: 'passenger_details', number: 7, title: 'Passenger Details', component: <Screen7PassengerDetails /> },
    { id: 'payment', number: 8, title: 'Payment Screen', component: <Screen8Payment /> },
    { id: 'visa_docs', number: 9, title: 'Visa & Documents', component: <Screen9VisaDocs /> },
    { id: 'hotels', number: 10, title: 'Hotel Details', component: <Screen10Hotels /> },
    { id: 'ziyarat', number: 11, title: 'Ziyarat Places', component: <Screen11Ziyarat /> },
    { id: 'contact', number: 12, title: 'Contact & WhatsApp', component: <Screen12Contact /> }
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-white p-6 pb-20">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-[#064632] text-[#D8B45A] font-bold text-xs uppercase tracking-widest border border-[#D8B45A]/40 mb-3">
          12 Connected Screen Showcase · Android Jetpack Compose Architecture
        </div>
        <h1 className="text-3xl font-black font-serif text-[#D8B45A] tracking-wide">
          AL HINDWAN TOURS & TRAVELS — UMRAH SERVICES
        </h1>
        <p className="text-sm text-stone-300 mt-2 max-w-2xl mx-auto">
          Complete end-to-end customer journey matching the official reference mockup. Click any screen card to interact directly in the phone emulator.
        </p>
      </div>

      {/* Grid of 12 screens (6 columns on 2xl, 3 on lg, 2 on md, 1 on mobile) */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6">
        {screens.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            {/* Header Badge matching the screenshot banner */}
            <div className="w-full text-center py-2 px-3 rounded-t-xl bg-[#064632] text-[#D8B45A] border-x border-t border-[#D8B45A]/40 font-bold text-xs font-serif shadow-sm truncate">
              {item.number}. {item.title}
            </div>

            {/* Phone Bezel Container */}
            <div className="relative w-full max-w-[280px] h-[580px] bg-black rounded-b-3xl border-4 border-stone-800 shadow-2xl overflow-hidden flex flex-col">
              {/* Android Status Bar */}
              <AndroidStatusBar />

              {/* Screen Body */}
              <div className="flex-1 overflow-y-auto bg-[#FFF9EB] scrollbar-thin select-none pointer-events-auto">
                {item.component}
              </div>

              {/* Hover / Click to enter phone simulation */}
              <div
                onClick={() => {
                  navigateTo(item.id as any);
                  setViewMode('emulator');
                }}
                className="absolute inset-0 bg-transparent hover:bg-black/10 cursor-pointer transition-colors flex items-end justify-center p-3 opacity-0 hover:opacity-100"
              >
                <span className="px-3 py-1.5 rounded-lg bg-[#D8B45A] text-[#032D23] font-bold text-xs shadow-lg">
                  Test Live in Emulator →
                </span>
              </div>

              {/* Bottom Android Gesture Bar */}
              <div className="h-4 bg-black flex items-center justify-center">
                <div className="w-24 h-1 bg-stone-600 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
