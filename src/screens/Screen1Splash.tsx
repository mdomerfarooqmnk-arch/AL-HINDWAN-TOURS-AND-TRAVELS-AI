import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlHindwanLogo } from '../components/IslamicGraphics';

export const Screen1Splash: React.FC = () => {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 12;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[640px] h-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#032D23] via-[#064632] to-[#021C16] text-white overflow-hidden">
      {/* Decorative Islamic border patterns */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D8B45A 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Decorative Gold Arches */}
      <div className="absolute top-0 left-0 right-0 h-40 flex justify-center opacity-30 pointer-events-none">
        <svg viewBox="0 0 360 120" fill="none" className="w-full max-w-sm">
          <path
            d="M20 120 C60 20, 300 20, 340 120"
            stroke="#D8B45A"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M50 120 C90 40, 270 40, 310 120"
            stroke="#D8B45A"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="w-full pt-8" />

      {/* Center Branding */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-[#032D23]/70 border border-[#D8B45A]/40 shadow-2xl mb-5">
          <AlHindwanLogo size={88} showText={false} />
        </div>

        <h1 className="text-2xl font-black tracking-widest text-[#D8B45A] font-serif uppercase drop-shadow-md">
          AL HINDWAN
        </h1>
        <div className="text-sm font-semibold tracking-wider text-emerald-100 uppercase mt-0.5">
          TOURS & TRAVELS
        </div>
        <div className="inline-block px-3 py-1 mt-2 text-[10px] tracking-widest uppercase font-bold text-[#D8B45A] border border-[#D8B45A]/40 rounded-full bg-emerald-950/60">
          Umrah Services
        </div>

        <div className="mt-8 px-6 text-xs text-emerald-100/90 italic tracking-wide font-medium">
          “Your Spiritual Journey, Our Trusted Service”
        </div>
      </div>

      {/* Bottom Progress & Action */}
      <div className="relative z-10 w-full max-w-xs mb-8 flex flex-col items-center">
        {/* Progress bar matching reference */}
        <div className="w-full h-1.5 bg-emerald-950/80 rounded-full overflow-hidden border border-[#D8B45A]/30 mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#D8B45A] to-amber-200 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#D8B45A] to-amber-400 text-[#032D23] font-bold text-sm shadow-lg hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <span>Enter App</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <p className="text-[10px] text-emerald-300/60 mt-3 text-center">
          Hyderabad & Karnataka Authorized Umrah Operator
        </p>
      </div>
    </div>
  );
};
