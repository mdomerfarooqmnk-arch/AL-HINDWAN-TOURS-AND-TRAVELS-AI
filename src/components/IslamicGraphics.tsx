import React from 'react';

export const AlHindwanLogo: React.FC<{ size?: number; className?: string; showText?: boolean }> = ({
  size = 54,
  className = '',
  showText = true
}) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Emblem SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="47" stroke="#D8B45A" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="44" stroke="#064632" strokeWidth="1" strokeDasharray="3 2" />
        {/* Background Radial */}
        <circle cx="50" cy="50" r="43" fill="#032D23" />
        
        {/* Islamic Arch & Dome */}
        <path
          d="M32 68V48C32 38 41 28 50 22C59 28 68 38 68 48V68H32Z"
          fill="#064632"
          stroke="#D8B45A"
          strokeWidth="1.5"
        />
        {/* Minaret Silhouette */}
        <rect x="47.5" y="16" width="5" height="15" fill="#D8B45A" rx="1" />
        <path d="M50 11L53 16H47L50 11Z" fill="#D8B45A" />
        {/* Crescent Moon */}
        <path
          d="M50 8C48.5 8 47.2 8.5 46.2 9.3C47.8 9.5 49 10.9 49 12.6C49 14.3 47.8 15.7 46.2 15.9C47.2 16.7 48.5 17.2 50 17.2C52.5 17.2 54.6 15.1 54.6 12.6C54.6 10.1 52.5 8 50 8Z"
          fill="#D8B45A"
        />
        {/* Holy Kaaba Silhouette inside Arch */}
        <rect x="43" y="52" width="14" height="14" fill="#17211D" rx="1" stroke="#D8B45A" strokeWidth="0.8" />
        <line x1="43" y1="56" x2="57" y2="56" stroke="#D8B45A" strokeWidth="1" />
        {/* Palm Branches / Floral Flourish */}
        <path
          d="M25 60C28 52 38 52 40 58"
          stroke="#D8B45A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M75 60C72 52 62 52 60 58"
          stroke="#D8B45A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <div className="mt-1 text-center">
          <div className="text-[12px] font-black tracking-widest text-[#D8B45A] uppercase leading-tight font-serif">
            AL HINDWAN
          </div>
          <div className="text-[9px] tracking-wider text-emerald-100 uppercase font-semibold">
            TOURS & TRAVELS
          </div>
          <div className="text-[7.5px] tracking-widest text-[#D8B45A]/90 font-medium mt-0.5">
            — UMRAH SERVICES —
          </div>
        </div>
      )}
    </div>
  );
};

export const KaabaBannerGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#064632] to-[#032D23] ${className}`}>
      {/* Decorative stars / geometric background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(#D8B45A 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />
      {/* Rich Kaaba Architectural Backdrop */}
      <svg
        viewBox="0 0 400 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B533E" />
            <stop offset="70%" stopColor="#043226" />
            <stop offset="100%" stopColor="#021C16" />
          </linearGradient>
          <linearGradient id="goldKiswa" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D8B45A" />
            <stop offset="50%" stopColor="#F5E4A7" />
            <stop offset="100%" stopColor="#C49B3E" />
          </linearGradient>
          <linearGradient id="marbleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF9EB" />
            <stop offset="100%" stopColor="#E9DFCA" />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect width="400" height="220" fill="url(#skyGrad)" />

        {/* Masjid Minarets in Background */}
        <g opacity="0.45" stroke="#D8B45A" strokeWidth="1">
          <line x1="60" y1="130" x2="60" y2="25" />
          <polygon points="56,25 64,25 60,10" fill="#D8B45A" />
          <line x1="85" y1="130" x2="85" y2="40" />
          <polygon points="82,40 88,40 85,25" fill="#D8B45A" />
          
          <line x1="320" y1="130" x2="320" y2="35" />
          <polygon points="316,35 324,35 320,18" fill="#D8B45A" />
          <line x1="345" y1="130" x2="345" y2="20" />
          <polygon points="341,20 349,20 345,6" fill="#D8B45A" />
        </g>

        {/* Arches of Haram Colonnade */}
        <g opacity="0.3" fill="#D8B45A">
          <path d="M20 140 C30 110, 50 110, 60 140 Z" />
          <path d="M65 140 C75 110, 95 110, 105 140 Z" />
          <path d="M295 140 C305 110, 325 110, 335 140 Z" />
          <path d="M340 140 C350 110, 370 110, 380 140 Z" />
        </g>

        {/* Mataf Marble Floor */}
        <ellipse cx="200" cy="180" rx="190" ry="40" fill="url(#marbleGrad)" opacity="0.95" />
        
        {/* Kaaba Structure (Perspective view) */}
        {/* Left Face */}
        <polygon points="150,90 200,80 200,165 150,155" fill="#151717" />
        {/* Right Face */}
        <polygon points="200,80 255,92 255,158 200,165" fill="#202222" />
        {/* Top Face */}
        <polygon points="150,90 200,80 255,92 205,102" fill="#282C2C" />

        {/* Kiswah Gold Belt (Hizam) */}
        <polygon points="150,105 200,95 200,103 150,113" fill="url(#goldKiswa)" />
        <polygon points="200,95 255,107 255,115 200,103" fill="url(#goldKiswa)" />

        {/* Gold Door of the Kaaba (Bab al-Kaaba) */}
        <polygon points="215,118 238,123 238,154 215,149" fill="url(#goldKiswa)" stroke="#8A6715" strokeWidth="0.8" />

        {/* Hijr Ismail (Hateem) semi-circular wall */}
        <path d="M130,150 C125,165, 145,172, 160,165" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />

        {/* Pilgrims in Tawaf (White and subtle figures) */}
        <g opacity="0.85">
          {Array.from({ length: 45 }).map((_, i) => {
            const angle = (i / 45) * Math.PI * 2;
            const rx = 100 + (i % 3) * 15;
            const ry = 22 + (i % 3) * 4;
            const cx = 200 + rx * Math.cos(angle);
            const cy = 175 + ry * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={1.6 + (i % 2) * 0.6}
                fill={i % 4 === 0 ? '#17211D' : '#FFFFFF'}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export const MadinahBannerGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#032D23] to-[#011712] ${className}`}>
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <rect width="400" height="200" fill="#032D23" />
        {/* Soft Evening Sky Glow */}
        <ellipse cx="200" cy="90" rx="180" ry="70" fill="#0A4634" opacity="0.6" />

        {/* Green Dome of Prophet's Mosque */}
        <path
          d="M170 125 C170 85, 230 85, 230 125 Z"
          fill="#0B6B48"
          stroke="#D8B45A"
          strokeWidth="1.2"
        />
        {/* Crescent on Dome */}
        <circle cx="200" cy="80" r="3.5" fill="#D8B45A" />
        <line x1="200" y1="83" x2="200" y2="92" stroke="#D8B45A" strokeWidth="1.5" />

        {/* Silver/White Umbrellas in Courtyard */}
        <g stroke="#D8B45A" strokeWidth="1" fill="#FFF9EB" opacity="0.85">
          <polygon points="120,110 135,130 105,130" />
          <line x1="120" y1="130" x2="120" y2="155" strokeWidth="2" stroke="#D8B45A" />

          <polygon points="280,110 295,130 265,130" />
          <line x1="280" y1="130" x2="280" y2="155" strokeWidth="2" stroke="#D8B45A" />
        </g>

        {/* Mosque Facade Base */}
        <rect x="70" y="125" width="260" height="30" fill="#D8B45A" opacity="0.3" />
        <rect x="0" y="155" width="400" height="45" fill="#EADBC0" />
      </svg>
    </div>
  );
};
