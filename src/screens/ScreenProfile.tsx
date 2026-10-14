import React from 'react';
import {
  User,
  Shield,
  FileText,
  Phone,
  HelpCircle,
  LogOut,
  ExternalLink,
  Lock,
  Layers,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';
import { AlHindwanLogo } from '../components/IslamicGraphics';

export const ScreenProfile: React.FC = () => {
  const { userRole, setUserRole, navigateTo, setViewMode } = useApp();

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Profile & Settings"
        onBack={() => navigateTo('home')}
      />

      {/* User Card */}
      <div className="p-4 bg-gradient-to-br from-[#064632] to-[#032D23] text-white flex items-center space-x-3.5">
        <div className="w-14 h-14 rounded-full bg-[#FFF9EB] border-2 border-[#D8B45A] flex items-center justify-center text-[#064632] font-black text-xl shadow-md">
          OF
        </div>
        <div>
          <h3 className="text-sm font-bold font-serif text-[#D8B45A]">
            Mohammed Omer Farooq
          </h3>
          <p className="text-[11px] text-emerald-100">mdomerfarooqmnk@gmail.com</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#D8B45A] text-[#032D23] uppercase">
            Registered Pilgrim
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-[#D8B45A]/30 overflow-hidden shadow-xs divide-y divide-stone-100">
          <button
            onClick={() => navigateTo('my_bookings')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4 text-[#064632]" />
              <span className="text-xs font-semibold text-stone-800">My Umrah Bookings & Vouchers</span>
            </div>
            <span className="text-stone-400 text-xs">›</span>
          </button>

          <button
            onClick={() => navigateTo('visa_docs')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-[#064632]" />
              <span className="text-xs font-semibold text-stone-800">Visa Requirements & Status</span>
            </div>
            <span className="text-stone-400 text-xs">›</span>
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-[#064632]" />
              <span className="text-xs font-semibold text-stone-800">Office Contact & Support</span>
            </div>
            <span className="text-stone-400 text-xs">›</span>
          </button>
        </div>

        {/* Admin Console Switch Box */}
        <div className="p-4 rounded-2xl bg-[#064632] text-white border border-[#D8B45A]/40 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#D8B45A]" />
              <h4 className="text-xs font-bold text-[#D8B45A] uppercase tracking-wider">
                Management Portal
              </h4>
            </div>
            <span className="text-[10px] bg-[#D8B45A]/20 px-2 py-0.5 rounded-full border border-[#D8B45A]/40 text-[#D8B45A]">
              Agency Staff
            </span>
          </div>

          <p className="text-[11px] text-emerald-100/90 leading-relaxed">
            Authorized administrators can modify Umrah package rates, departure schedules, hotels, booking approvals, and client enquiries.
          </p>

          <button
            onClick={() => {
              setUserRole('admin');
              setViewMode('admin');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#D8B45A] text-[#032D23] font-bold text-xs shadow-xs hover:bg-amber-300 active:scale-98 transition-all flex items-center justify-center space-x-1.5"
          >
            <Settings className="w-4 h-4" />
            <span>Open Admin Dashboard</span>
          </button>
        </div>

        {/* Agency Information Footer */}
        <div className="p-4 rounded-2xl bg-white border border-[#D8B45A]/20 text-center space-y-1.5">
          <AlHindwanLogo size={36} showText={false} />
          <h4 className="text-xs font-bold text-[#064632]">
            AL HINDWAN TOURS & TRAVELS
          </h4>
          <p className="text-[10px] text-stone-500">
            Registered Government of India Umrah Agency
          </p>
          <p className="text-[9px] text-stone-400">
            Android App Version 2.4.0 (Kotlin / Jetpack Compose)
          </p>
        </div>
      </div>
    </div>
  );
};
