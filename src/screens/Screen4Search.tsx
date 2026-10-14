import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Calendar, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen4Search: React.FC = () => {
  const { packages, navigateTo } = useApp();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | 'Economy' | 'Standard' | 'Premium'>('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [selectedAirline, setSelectedAirline] = useState('All');
  const [selectedHotelStandard, setSelectedHotelStandard] = useState('All');

  const months = ['All', 'October 2026', 'December 2026', 'January 2027', 'February 2027', 'March 2027'];
  const airlines = ['All', 'IndiGo', 'Air India', 'Saudia Airlines'];
  const hotelStandards = ['All', 'Standard', 'Premium', 'Economy'];

  const filteredPackages = packages.filter((pkg) => {
    // text query match
    if (query.trim()) {
      const q = query.toLowerCase();
      const match =
        pkg.title.toLowerCase().includes(q) ||
        pkg.airline.toLowerCase().includes(q) ||
        pkg.makkahHotel.toLowerCase().includes(q) ||
        pkg.departureDate.toLowerCase().includes(q);
      if (!match) return false;
    }

    // category
    if (category !== 'All' && pkg.category !== category) return false;

    // month
    if (selectedMonth !== 'All') {
      const monthShort = selectedMonth.split(' ')[0].slice(0, 3).toUpperCase();
      if (!pkg.departureDate.toUpperCase().includes(monthShort)) return false;
    }

    // price
    if (pkg.pricePerPerson > maxPrice) return false;

    // airline
    if (selectedAirline !== 'All' && !pkg.airline.toLowerCase().includes(selectedAirline.toLowerCase())) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSelectedMonth('All');
    setMaxPrice(150000);
    setSelectedAirline('All');
    setSelectedHotelStandard('All');
  };

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Search Packages"
        onBack={() => navigateTo('packages')}
        rightAction={
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 text-xs text-[#D8B45A] font-semibold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        }
      />

      {/* Main Search Input */}
      <div className="p-3 bg-white border-b border-[#D8B45A]/20">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by date, airline, hotel..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] focus:ring-1 focus:ring-[#064632] bg-stone-50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {(['All', 'Economy', 'Standard', 'Premium'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-[#064632] text-white shadow-xs'
                  : 'bg-[#FFF9EB] text-[#064632] border border-[#D8B45A]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Parameters Form */}
      <div className="p-3 space-y-4 bg-white/70 m-3 rounded-2xl border border-[#D8B45A]/20 shadow-xs">
        {/* Departure Month */}
        <div>
          <label className="block text-xs font-bold text-[#064632] mb-1">
            Departure Month
          </label>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-hidden focus:border-[#064632] appearance-none"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m === 'All' ? 'Select Month (All)' : m}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-[#064632]">Price Range</label>
            <span className="text-xs font-bold text-[#064632]">
              ₹50,000 – ₹{maxPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={50000}
            max={150000}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#064632] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-500 font-mono">
            <span>₹50,000</span>
            <span>₹1,50,000</span>
          </div>
        </div>

        {/* Airline Selector */}
        <div>
          <label className="block text-xs font-bold text-[#064632] mb-1">
            Airline
          </label>
          <div className="relative">
            <select
              value={selectedAirline}
              onChange={(e) => setSelectedAirline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-hidden focus:border-[#064632] appearance-none"
            >
              {airlines.map((a) => (
                <option key={a} value={a}>
                  {a === 'All' ? 'All Airlines' : a}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Hotel Category */}
        <div>
          <label className="block text-xs font-bold text-[#064632] mb-1">
            Hotel Category
          </label>
          <div className="relative">
            <select
              value={selectedHotelStandard}
              onChange={(e) => setSelectedHotelStandard(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-hidden focus:border-[#064632] appearance-none"
            >
              {hotelStandards.map((h) => (
                <option key={h} value={h}>
                  {h === 'All' ? 'All Hotels' : `${h} Hotels`}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="px-3 pt-2 pb-1 flex items-center justify-between">
        <h3 className="text-xs font-bold text-stone-700">
          Search Results ({filteredPackages.length} Packages Found)
        </h3>
      </div>

      {/* Filtered Packages Cards */}
      <div className="px-3 space-y-2.5">
        {filteredPackages.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-xl border border-stone-200">
            <p className="text-xs font-medium text-stone-600">No packages matched your filters.</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-xs font-bold text-[#064632] underline"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => navigateTo('package_details', pkg.id)}
              className="p-3 bg-white rounded-xl border border-[#D8B45A]/30 shadow-xs hover:border-[#D8B45A] cursor-pointer flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-[#064632]">{pkg.title}</h4>
                <p className="text-[10px] text-stone-600 mt-0.5">
                  📅 {pkg.departureDate} · ✈️ {pkg.airline}
                </p>
                <div className="text-xs font-extrabold text-[#064632] mt-1">
                  ₹{pkg.pricePerPerson.toLocaleString('en-IN')}/-
                  <span className="text-[9px] font-normal text-stone-500 ml-1">Per Person</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('package_details', pkg.id);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#D8B45A] text-[#032D23] font-bold text-[11px] shadow-xs hover:bg-amber-300"
              >
                View
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
