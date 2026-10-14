import React, { useState } from 'react';
import {
  Building,
  MapPin,
  Wifi,
  UtensilsCrossed,
  Footprints,
  ArrowUpDown,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen10Hotels: React.FC = () => {
  const { hotels, navigateTo } = useApp();
  const [activeCity, setActiveCity] = useState<'Makkah' | 'Madinah'>('Makkah');

  const cityHotels = hotels.filter((h) => h.city === activeCity);

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Hotel Details"
        onBack={() => navigateTo('home')}
      />

      {/* Tabs: Makkah Hotels | Madinah Hotels */}
      <div className="p-3 bg-white border-b border-[#D8B45A]/25">
        <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
          <button
            onClick={() => setActiveCity('Makkah')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeCity === 'Makkah'
                ? 'bg-[#064632] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Makkah Hotels
          </button>
          <button
            onClick={() => setActiveCity('Madinah')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeCity === 'Madinah'
                ? 'bg-[#064632] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Madinah Hotels
          </button>
        </div>
      </div>

      {/* Hotels List */}
      <div className="p-3 space-y-3.5">
        {cityHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#D8B45A]/30 shadow-xs hover:border-[#D8B45A] hover:shadow-md transition-all"
          >
            {/* Hotel Photo Banner */}
            <div className="relative h-44 w-full bg-emerald-950">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute top-2.5 right-2.5 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-black/60 text-amber-300 text-[10px] font-bold backdrop-blur-xs">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>{hotel.starRating}-Star Rating</span>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <h3 className="text-sm font-bold font-serif leading-tight">
                  {hotel.name}
                </h3>
                <p className="text-[11px] text-[#D8B45A] font-semibold flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{hotel.distanceFromHaram}</span>
                </p>
              </div>
            </div>

            {/* Hotel Amenities Icons Strip (Matching Screenshot 10) */}
            <div className="p-3 border-b border-stone-100 grid grid-cols-4 gap-1 text-center">
              <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-stone-50">
                <Footprints className="w-4 h-4 text-[#064632] mb-1" />
                <span className="text-[9px] font-semibold text-stone-700 leading-tight">
                  Walking Distance
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-stone-50">
                <Wifi className="w-4 h-4 text-[#064632] mb-1" />
                <span className="text-[9px] font-semibold text-stone-700 leading-tight">
                  Free WiFi
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-stone-50">
                <UtensilsCrossed className="w-4 h-4 text-[#064632] mb-1" />
                <span className="text-[9px] font-semibold text-stone-700 leading-tight truncate w-full">
                  {hotel.mealsIncluded.includes('Hyderabadi') ? 'Hyderabadi Khana' : 'Buffet Food'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-stone-50">
                <ArrowUpDown className="w-4 h-4 text-[#064632] mb-1" />
                <span className="text-[9px] font-semibold text-stone-700 leading-tight">
                  Lift Facility
                </span>
              </div>
            </div>

            {/* Hotel Description & Category */}
            <div className="p-3 bg-white text-xs text-stone-600 space-y-2">
              <p className="line-clamp-2 leading-relaxed">{hotel.description}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-bold text-[#064632] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {hotel.category} Standard
                </span>

                <button
                  onClick={() => navigateTo('packages')}
                  className="text-xs font-bold text-[#064632] hover:underline flex items-center space-x-1"
                >
                  <span>View Included Packages</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
