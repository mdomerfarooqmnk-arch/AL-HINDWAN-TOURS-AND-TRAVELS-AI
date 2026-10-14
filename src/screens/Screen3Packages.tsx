import React, { useState } from 'react';
import { Search, Calendar, Plane, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen3Packages: React.FC = () => {
  const { packages, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Economy' | 'Standard' | 'Premium'>('All');

  const categories: ('All' | 'Economy' | 'Standard' | 'Premium')[] = [
    'All',
    'Economy',
    'Standard',
    'Premium'
  ];

  const filteredPackages = packages.filter((pkg) => {
    if (selectedCategory === 'All') return true;
    return pkg.category === selectedCategory;
  });

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Umrah Packages"
        onBack={() => navigateTo('home')}
        rightAction={
          <button
            onClick={() => navigateTo('search')}
            className="p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors text-white"
            aria-label="Search and Filter"
          >
            <Search className="w-5 h-5" />
          </button>
        }
      />

      {/* Filter Category Chips */}
      <div className="p-3 bg-white border-b border-[#D8B45A]/20">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#064632] text-white shadow-xs'
                    : 'bg-[#FFF9EB] text-[#064632] border border-[#D8B45A]/40 hover:bg-[#D8B45A]/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Package Cards List */}
      <div className="p-3 space-y-3">
        {filteredPackages.length === 0 ? (
          <div className="p-8 text-center text-stone-500 bg-white rounded-xl border border-stone-200">
            <p className="font-medium text-sm">No packages found for {selectedCategory}.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-2 text-xs font-bold text-[#064632] underline"
            >
              View All Packages
            </button>
          </div>
        ) : (
          filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#D8B45A]/30 shadow-xs hover:border-[#D8B45A] hover:shadow-md transition-all"
            >
              {/* Card Thumbnail */}
              <div className="relative h-40 w-full bg-emerald-950">
                <img
                  src={pkg.thumbnail}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D8B45A] text-[#032D23] uppercase tracking-wider shadow-sm">
                    {pkg.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-black/60 text-white backdrop-blur-xs">
                    {pkg.durationDays} Days Tour
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="text-base font-bold drop-shadow-sm font-serif">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 space-y-2.5">
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#064632] shrink-0" />
                    <span className="font-semibold text-[#17211D]">{pkg.departureDate}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#064632] shrink-0" />
                    <span className="font-medium text-emerald-800">(Direct Flight)</span>
                  </div>
                  <div className="flex items-center space-x-1.5 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D8B45A] shrink-0" />
                    <span className="truncate text-stone-600">{pkg.makkahHotel}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D8B45A]/20 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-extrabold text-[#064632]">
                      ₹{pkg.pricePerPerson.toLocaleString('en-IN')}/-
                    </div>
                    <div className="text-[9px] text-stone-500 font-medium">Per Person (All Inclusive)</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateTo('package_details', pkg.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#D8B45A] text-[#032D23] font-bold text-xs shadow-xs hover:bg-amber-300 active:scale-95 transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigateTo('booking_form', pkg.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#064632] text-white font-bold text-xs shadow-xs hover:bg-emerald-900 active:scale-95 transition-all"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
