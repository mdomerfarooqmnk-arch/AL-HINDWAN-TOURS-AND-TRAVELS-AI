import React from 'react';
import {
  Bell,
  Package,
  Plane,
  Building,
  FileText,
  Compass,
  CalendarCheck,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AlHindwanLogo, KaabaBannerGraphic } from '../components/IslamicGraphics';

export const Screen2Home: React.FC = () => {
  const { packages, navigateTo } = useApp();
  const featuredPackage = packages.find((p) => p.featured) || packages[0];

  const shortcuts = [
    {
      id: 'packages',
      label: 'Umrah Packages',
      icon: Package,
      action: () => navigateTo('packages')
    },
    {
      id: 'flights',
      label: 'Flight Booking',
      icon: Plane,
      action: () => navigateTo('package_details', featuredPackage?.id)
    },
    {
      id: 'hotels',
      label: 'Hotel Details',
      icon: Building,
      action: () => navigateTo('hotels')
    },
    {
      id: 'visa',
      label: 'Visa & Documents',
      icon: FileText,
      action: () => navigateTo('visa_docs')
    },
    {
      id: 'ziyarat',
      label: 'Ziyarat Places',
      icon: Compass,
      action: () => navigateTo('ziyarat')
    },
    {
      id: 'booking',
      label: 'My Booking',
      icon: CalendarCheck,
      action: () => navigateTo('my_bookings')
    },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: PhoneCall,
      action: () => navigateTo('contact')
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Booking',
      icon: MessageCircle,
      isWhatsApp: true,
      action: () => {
        window.open(
          'https://wa.me/919700762916?text=Assalamu%20Alaikum,%20I%20am%20interested%20in%20booking%20an%20Umrah%20package%20with%20Al%20Hindwan%20Tours',
          '_blank'
        );
      }
    }
  ];

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      {/* Top Header Bar */}
      <div className="bg-[#064632] px-4 pt-2 pb-3 flex items-center justify-between border-b border-[#D8B45A]/30">
        <div className="flex items-center space-x-3">
          <AlHindwanLogo size={42} showText={false} />
          <div>
            <h2 className="text-xs font-black tracking-widest text-[#D8B45A] font-serif uppercase">
              AL HINDWAN
            </h2>
            <p className="text-[10px] font-semibold text-emerald-100 uppercase tracking-tight">
              TOURS & TRAVELS
            </p>
            <p className="text-[8px] text-[#D8B45A] tracking-wider uppercase">
              — UMRAH SERVICES —
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('contact')}
          className="relative p-2 rounded-full bg-[#032D23] border border-[#D8B45A]/40 text-[#D8B45A] hover:bg-emerald-900 transition-colors"
          aria-label="Notifications & Announcements"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
        </button>
      </div>

      {/* Hero Kaaba Banner matching Screen 2 */}
      <div className="p-3">
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#D8B45A]/30 bg-gradient-to-br from-[#064632] to-[#032D23] text-white">
          <div className="h-44 w-full">
            <KaabaBannerGraphic className="h-full w-full" />
          </div>

          {/* Banner Text Overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black/85 via-black/35 to-transparent">
            <div>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#D8B45A] text-[#032D23] uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                <span>Authorized Agency</span>
              </span>
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-white font-serif leading-tight">
                Umrah
              </h1>
              <p className="text-xs font-medium text-[#FFF9EB]/90">
                A Journey of Faith
              </p>

              <button
                onClick={() => navigateTo('booking_form', featuredPackage?.id)}
                className="mt-2.5 inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-[#D8B45A] text-[#032D23] font-bold text-xs shadow-md hover:bg-amber-300 active:scale-95 transition-all"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Shortcuts Grid (8 Items, 4x2) */}
      <div className="px-3 pt-1 pb-2">
        <div className="grid grid-cols-4 gap-2.5">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="flex flex-col items-center text-center p-2 rounded-xl bg-white border border-[#D8B45A]/25 shadow-xs hover:border-[#D8B45A] hover:shadow-sm active:scale-95 transition-all min-h-[76px]"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
                    item.isWhatsApp
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#FFF9EB] text-[#064632] border border-[#D8B45A]/40'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold text-[#17211D] leading-tight line-clamp-2">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Umrah Packages Section */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-[#064632] tracking-tight">
            Featured Umrah Packages
          </h2>
          <button
            onClick={() => navigateTo('packages')}
            className="text-[11px] font-bold text-[#064632] bg-[#D8B45A]/20 px-2.5 py-1 rounded-md border border-[#D8B45A]/40 hover:bg-[#D8B45A]/30 transition-colors"
          >
            View All
          </button>
        </div>

        {/* Featured Package Horizontal / Stack Card */}
        {packages.slice(0, 2).map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => navigateTo('package_details', pkg.id)}
            className="mb-3 p-3 bg-white rounded-xl border border-[#D8B45A]/30 shadow-xs hover:border-[#D8B45A] hover:shadow-sm transition-all cursor-pointer flex items-center space-x-3"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-emerald-900 border border-[#D8B45A]/30">
              <img
                src={pkg.thumbnail}
                alt={pkg.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1">
                <span className="text-[8px] font-bold text-amber-300 uppercase">
                  {pkg.category}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-[#064632] truncate">
                {pkg.title}
              </h3>
              <p className="text-[10px] text-stone-600 font-medium mt-0.5">
                📅 {pkg.departureDate}
              </p>
              <p className="text-[10px] text-stone-500 font-medium">
                ✈️ {pkg.airline}
              </p>
              <div className="mt-1 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-black text-[#064632]">
                    ₹{pkg.pricePerPerson.toLocaleString('en-IN')}/-
                  </span>
                  <span className="text-[9px] text-stone-500 ml-1">Per Person</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('booking_form', pkg.id);
                  }}
                  className="px-2.5 py-1 text-[10px] font-bold bg-[#D8B45A] text-[#032D23] rounded-md shadow-xs hover:bg-amber-300"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
