import React from 'react';
import { Calendar, User, FileText, CheckCircle2, Clock, Phone, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const ScreenMyBookings: React.FC = () => {
  const { bookings, navigateTo } = useApp();

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="My Bookings"
        onBack={() => navigateTo('home')}
      />

      <div className="p-3 space-y-3">
        {bookings.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 mt-4 space-y-3">
            <Calendar className="w-12 h-12 text-[#064632]/40 mx-auto" />
            <h3 className="text-sm font-bold text-stone-800">No Bookings Found</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              You haven’t reserved an Umrah package yet. Browse our published Umrah dates from Hyderabad.
            </p>
            <button
              onClick={() => navigateTo('packages')}
              className="px-4 py-2 rounded-xl bg-[#064632] text-white text-xs font-bold shadow-xs hover:bg-emerald-950"
            >
              Browse Umrah Packages
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 bg-white rounded-2xl border border-[#D8B45A]/35 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono text-stone-500 block">
                    ID: {booking.id}
                  </span>
                  <h3 className="text-xs font-bold text-[#064632] font-serif">
                    {booking.packageTitle}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    booking.bookingStatus === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {booking.bookingStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                <div>
                  <span className="text-[10px] text-stone-500 block">Departure</span>
                  <span className="font-semibold">{booking.departureDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">Total Amount</span>
                  <span className="font-bold text-[#064632]">
                    ₹{booking.totalAmount.toLocaleString('en-IN')}/-
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">Passengers</span>
                  <span className="font-semibold">{booking.passengerCount} Persons</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">Payment Method</span>
                  <span className="font-semibold">{booking.paymentMethod} (Paid)</span>
                </div>
              </div>

              {/* Passengers List summary */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                <span className="font-bold text-[11px] text-[#064632] block">
                  Registered Pilgrims:
                </span>
                {booking.passengers.map((p, i) => (
                  <div key={i} className="flex justify-between text-[11px] text-stone-700">
                    <span>{i + 1}. {p.fullName || 'Passenger'}</span>
                    <span className="font-mono text-stone-500">{p.passportNumber || 'Passport Pending'}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1 flex items-center justify-between">
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Assalamu Alaikum! Checking status for Booking Ref: ${booking.id} (${booking.packageTitle})`
                    );
                    window.open(`https://wa.me/919700762916?text=${msg}`, '_blank');
                  }}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1"
                >
                  <span>Chat with Tour Manager</span>
                </button>

                <button
                  onClick={() => alert(`Receipt downloaded for ${booking.id}. A copy has been saved.`)}
                  className="px-3 py-1.5 rounded-lg bg-[#FFF9EB] border border-[#D8B45A] text-[#064632] text-[11px] font-bold hover:bg-[#D8B45A]/20 flex items-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Voucher</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
