import React, { useState } from 'react';
import {
  Calendar,
  Plane,
  MapPin,
  CheckCircle2,
  Building,
  Share2,
  Clock,
  Sparkles,
  Shield,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen5PackageDetails: React.FC = () => {
  const { packages, selectedPackageId, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'inclusions' | 'hotels'>('overview');

  const pkg = packages.find((p) => p.id === selectedPackageId) || packages[0];

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title={pkg.title}
        onBack={() => navigateTo('packages')}
        rightAction={
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: pkg.title,
                  text: `Check out ${pkg.title} with Al Hindwan Tours: ₹${pkg.pricePerPerson.toLocaleString('en-IN')}`,
                  url: window.location.href
                }).catch(() => {});
              }
            }}
            className="p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors text-white"
            aria-label="Share Package"
          >
            <Share2 className="w-4 h-4" />
          </button>
        }
      />

      {/* Package Hero Image */}
      <div className="relative h-52 w-full bg-emerald-950">
        <img
          src={pkg.thumbnail}
          alt={pkg.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D8B45A] text-[#032D23] uppercase mb-1">
            {pkg.category} Category
          </div>
          <h1 className="text-lg font-black font-serif leading-tight">
            {pkg.title}
          </h1>
        </div>
      </div>

      {/* Price Header Strip */}
      <div className="px-4 py-3 bg-white border-b border-[#D8B45A]/30 flex items-center justify-between">
        <div>
          <div className="text-xl font-black text-[#064632]">
            ₹{pkg.pricePerPerson.toLocaleString('en-IN')}/-
          </div>
          <div className="text-[10px] text-stone-500 font-medium">Per Person (All Inclusions)</div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
          Seats: {pkg.availableSeats} Left
        </span>
      </div>

      {/* Quick Specifications Grid */}
      <div className="p-4 bg-white/70 mx-3 my-3 rounded-2xl border border-[#D8B45A]/25 space-y-2.5 text-xs text-stone-800">
        <div className="flex items-center space-x-2.5">
          <Calendar className="w-4 h-4 text-[#064632] shrink-0" />
          <div>
            <span className="font-bold text-[#064632]">Departure: </span>
            <span className="font-semibold">{pkg.departureDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <Clock className="w-4 h-4 text-[#064632] shrink-0" />
          <div>
            <span className="font-bold text-[#064632]">Return: </span>
            <span className="font-semibold">{pkg.returnDate} ({pkg.durationDays} Days)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <Plane className="w-4 h-4 text-[#064632] shrink-0" />
          <div>
            <span className="font-bold text-[#064632]">Airline: </span>
            <span className="font-semibold">{pkg.airline}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <MapPin className="w-4 h-4 text-[#064632] shrink-0" />
          <div>
            <span className="font-bold text-[#064632]">Route: </span>
            <span className="font-semibold">{pkg.route}</span>
          </div>
        </div>
      </div>

      {/* Segmented Tabs (Overview, Inclusions, Hotels) */}
      <div className="px-3">
        <div className="flex rounded-xl bg-stone-200/60 p-1 border border-stone-300/40">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-[#064632] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'inclusions'
                ? 'bg-[#064632] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Inclusions
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'hotels'
                ? 'bg-[#064632] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hotels
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-3">
        {activeTab === 'overview' && (
          <div className="bg-white p-4 rounded-2xl border border-[#D8B45A]/25 space-y-3">
            <h3 className="text-xs font-bold text-[#064632] uppercase tracking-wider">
              Package Highlights
            </h3>
            <div className="space-y-2">
              {pkg.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {pkg.notes && (
              <div className="mt-3 p-3 rounded-xl bg-[#FFF9EB] border border-[#D8B45A]/30 text-stone-700 text-xs">
                <span className="font-bold text-[#064632]">Pilgrim Note: </span>
                {pkg.notes}
              </div>
            )}
          </div>
        )}

        {activeTab === 'inclusions' && (
          <div className="bg-white p-4 rounded-2xl border border-[#D8B45A]/25 space-y-3">
            <div>
              <h3 className="text-xs font-bold text-[#064632] uppercase tracking-wider mb-2">
                What’s Included
              </h3>
              <div className="space-y-2">
                {pkg.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-medium">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">
                Exclusions
              </h3>
              <div className="space-y-1.5">
                {pkg.exclusions.map((exc, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-stone-600">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>{exc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="bg-white p-4 rounded-2xl border border-[#D8B45A]/25 space-y-3">
            <h3 className="text-xs font-bold text-[#064632] uppercase tracking-wider">
              Accommodations
            </h3>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-[#064632]" />
                <span className="font-bold text-xs text-[#064632]">Makkah Hotel:</span>
              </div>
              <p className="text-xs text-stone-800 font-semibold">{pkg.makkahHotel}</p>
              <p className="text-[11px] text-stone-500">Duration: {pkg.makkahNights} Nights</p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-[#064632]" />
                <span className="font-bold text-xs text-[#064632]">Madinah Hotel:</span>
              </div>
              <p className="text-xs text-stone-800 font-semibold">{pkg.madinahHotel}</p>
              <p className="text-[11px] text-stone-500">Duration: {pkg.madinahNights} Nights</p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#D8B45A]/30 flex items-center space-x-3 z-40 max-w-md mx-auto">
        <button
          onClick={() => {
            const message = encodeURIComponent(
              `Assalamu Alaikum! I would like to enquire about the ${pkg.title} (Price: ₹${pkg.pricePerPerson.toLocaleString('en-IN')}) with Al Hindwan Tours.`
            );
            window.open(`https://wa.me/919700762916?text=${message}`, '_blank');
          }}
          className="flex-1 py-3 px-3 rounded-xl bg-[#FFF9EB] text-[#064632] border border-[#D8B45A] font-bold text-xs hover:bg-[#D8B45A]/20 transition-all flex items-center justify-center space-x-1.5"
        >
          <MessageCircle className="w-4 h-4 text-emerald-700" />
          <span>Enquire Now</span>
        </button>

        <button
          onClick={() => navigateTo('booking_form', pkg.id)}
          className="flex-1 py-3 px-3 rounded-xl bg-[#064632] text-white font-bold text-xs shadow-md hover:bg-emerald-950 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
        >
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};
