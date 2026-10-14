import React, { useState } from 'react';
import { Compass, MapPin, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';
import { ZiyaratPlace } from '../types';

export const Screen11Ziyarat: React.FC = () => {
  const { ziyarat, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'Makkah' | 'Madinah'>('Makkah');
  const [selectedZiyarat, setSelectedZiyarat] = useState<ZiyaratPlace | null>(null);

  const places = ziyarat.filter((p) => p.city === activeTab);

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Ziyarat Places"
        onBack={() => navigateTo('home')}
      />

      {/* Tabs: Makkah Ziyarat | Madinah Ziyarat */}
      <div className="p-3 bg-white border-b border-[#D8B45A]/25">
        <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
          <button
            onClick={() => setActiveTab('Makkah')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'Makkah'
                ? 'bg-[#064632] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Makkah Ziyarat
          </button>
          <button
            onClick={() => setActiveTab('Madinah')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'Madinah'
                ? 'bg-[#064632] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Madinah Ziyarat
          </button>
        </div>
      </div>

      {/* 2-Column Grid matching Screenshot 11 */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2.5">
          {places.map((place) => (
            <div
              key={place.id}
              onClick={() => setSelectedZiyarat(place)}
              className="bg-white rounded-2xl overflow-hidden border border-[#D8B45A]/30 shadow-xs hover:border-[#D8B45A] hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-28 w-full bg-stone-800">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                <div className="absolute top-1.5 left-1.5">
                  <span className="px-1.5 py-0.5 rounded-md text-[8px] font-bold bg-[#D8B45A] text-[#032D23] uppercase">
                    {place.city}
                  </span>
                </div>
              </div>

              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#064632] leading-tight">
                    {place.name}
                  </h3>
                  {place.subName && (
                    <p className="text-[10px] text-stone-500 truncate mt-0.5">
                      {place.subName}
                    </p>
                  )}
                </div>

                <div className="mt-2 pt-1 border-t border-stone-100 flex items-center justify-between text-[10px] text-emerald-800 font-semibold">
                  <span>History & Guide</span>
                  <Info className="w-3 h-3 text-[#D8B45A]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedZiyarat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden border-2 border-[#D8B45A] shadow-2xl">
            <div className="relative h-44 w-full bg-stone-900">
              <img
                src={selectedZiyarat.image}
                alt={selectedZiyarat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <button
                onClick={() => setSelectedZiyarat(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-bold text-[#D8B45A] uppercase tracking-wider">
                  {selectedZiyarat.city} Holy Site
                </span>
                <h3 className="text-base font-bold font-serif">{selectedZiyarat.name}</h3>
                {selectedZiyarat.subName && (
                  <p className="text-xs text-emerald-200">{selectedZiyarat.subName}</p>
                )}
              </div>
            </div>

            <div className="p-4 text-xs text-stone-700 space-y-3 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-[#064632] uppercase tracking-wider text-[11px] mb-1">
                  Spiritual Significance
                </h4>
                <p className="leading-relaxed text-stone-800 bg-[#FFF9EB] p-2.5 rounded-xl border border-[#D8B45A]/30">
                  {selectedZiyarat.significance}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#064632] uppercase tracking-wider text-[11px] mb-1">
                  Historical Background
                </h4>
                <p className="leading-relaxed text-stone-600">
                  {selectedZiyarat.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#064632] uppercase tracking-wider text-[11px] mb-1">
                  Tour Itinerary Note
                </h4>
                <p className="leading-relaxed text-stone-600 italic">
                  {selectedZiyarat.itineraryNote}
                </p>
              </div>
            </div>

            <div className="p-3 bg-stone-50 border-t border-stone-200">
              <button
                onClick={() => setSelectedZiyarat(null)}
                className="w-full py-2.5 rounded-xl bg-[#064632] text-white font-bold text-xs hover:bg-emerald-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
