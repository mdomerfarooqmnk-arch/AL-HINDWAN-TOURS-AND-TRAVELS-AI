import React from 'react';
import { Calendar, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen6BookingForm: React.FC = () => {
  const { packages, bookingDraft, updateBookingDraft, navigateTo } = useApp();

  const selectedPkg =
    packages.find((p) => p.id === bookingDraft.packageId) || packages[0];

  const handlePassengerCountChange = (newCount: number) => {
    if (newCount < 1 || newCount > 10) return;

    // Adjust passengers list length to match count
    const currentPassengers = [...bookingDraft.passengers];
    if (newCount > currentPassengers.length) {
      for (let i = currentPassengers.length; i < newCount; i++) {
        currentPassengers.push({
          fullName: '',
          dob: '',
          passportNumber: '',
          passportExpiry: '',
          nationality: 'Indian',
          gender: 'Male'
        });
      }
    } else if (newCount < currentPassengers.length) {
      currentPassengers.splice(newCount);
    }

    updateBookingDraft({
      passengerCount: newCount,
      passengers: currentPassengers
    });
  };

  const totalAmount = selectedPkg.pricePerPerson * bookingDraft.passengerCount;

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Booking Form"
        onBack={() => navigateTo('package_details', selectedPkg.id)}
      />

      {/* 4-Step Stepper Header */}
      <div className="bg-white px-4 py-3 border-b border-[#D8B45A]/25">
        <div className="flex items-center justify-between max-w-xs mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#064632] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              1
            </div>
            <span className="text-[10px] font-bold text-[#064632] mt-1">Package</span>
          </div>

          <div className="flex-1 h-0.5 bg-stone-300 mx-2" />

          {/* Step 2 */}
          <div className="flex flex-col items-center opacity-60">
            <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold">
              2
            </div>
            <span className="text-[10px] font-medium text-stone-500 mt-1">Passengers</span>
          </div>

          <div className="flex-1 h-0.5 bg-stone-300 mx-2" />

          {/* Step 3 */}
          <div className="flex flex-col items-center opacity-60">
            <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <span className="text-[10px] font-medium text-stone-500 mt-1">Payment</span>
          </div>

          <div className="flex-1 h-0.5 bg-stone-300 mx-2" />

          {/* Step 4 */}
          <div className="flex flex-col items-center opacity-60">
            <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold">
              4
            </div>
            <span className="text-[10px] font-medium text-stone-500 mt-1">Confirm</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Selected Package Summary Card */}
        <div>
          <h3 className="text-xs font-bold text-[#064632] uppercase tracking-wider mb-2">
            Selected Package
          </h3>
          <div className="p-3 bg-white rounded-2xl border border-[#D8B45A]/30 shadow-xs flex items-center space-x-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-emerald-950">
              <img
                src={selectedPkg.thumbnail}
                alt={selectedPkg.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#064632] truncate">
                {selectedPkg.title}
              </h4>
              <p className="text-[10px] text-stone-600 mt-0.5">
                📅 {selectedPkg.departureDate}
              </p>
              <div className="text-xs font-black text-[#064632] mt-1">
                ₹{selectedPkg.pricePerPerson.toLocaleString('en-IN')}/-
                <span className="text-[9px] font-normal text-stone-500 ml-1">Per Person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Departure Date Selection */}
        <div>
          <label className="block text-xs font-bold text-[#064632] uppercase tracking-wider mb-1.5">
            Departure Date
          </label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={bookingDraft.departureDate || selectedPkg.departureDate}
              className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-800"
            />
            <Calendar className="w-4 h-4 text-[#064632] absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Number of Passengers Stepper */}
        <div>
          <label className="block text-xs font-bold text-[#064632] uppercase tracking-wider mb-1.5">
            Number of Passengers
          </label>
          <div className="flex items-center justify-between p-2.5 bg-white rounded-2xl border border-stone-300">
            <button
              onClick={() => handlePassengerCountChange(bookingDraft.passengerCount - 1)}
              disabled={bookingDraft.passengerCount <= 1}
              className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-40 hover:bg-stone-200 active:scale-95 transition-all"
              aria-label="Decrease passenger count"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="text-base font-black text-[#064632] px-4 font-mono">
              {bookingDraft.passengerCount}
            </span>

            <button
              onClick={() => handlePassengerCountChange(bookingDraft.passengerCount + 1)}
              disabled={bookingDraft.passengerCount >= 10}
              className="w-10 h-10 rounded-xl bg-[#064632] flex items-center justify-center text-white disabled:opacity-40 hover:bg-emerald-950 active:scale-95 transition-all"
              aria-label="Increase passenger count"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Total Amount Summary */}
        <div className="p-4 bg-emerald-900 text-white rounded-2xl border border-[#D8B45A]/40 shadow-sm space-y-2">
          <div className="flex justify-between text-xs text-emerald-200">
            <span>Price per person</span>
            <span>₹{selectedPkg.pricePerPerson.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-xs text-emerald-200">
            <span>Passengers</span>
            <span>× {bookingDraft.passengerCount}</span>
          </div>
          <div className="pt-2 border-t border-emerald-700/60 flex justify-between items-baseline">
            <span className="text-sm font-bold text-[#D8B45A]">Total Amount:</span>
            <span className="text-lg font-black text-[#D8B45A]">
              ₹{totalAmount.toLocaleString('en-IN')}/-
            </span>
          </div>
          <p className="text-[10px] text-emerald-300/80 italic text-right">
            Includes visa, flights, stay, 3 meals & ziyarat
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigateTo('passenger_details')}
          className="w-full py-3.5 px-4 rounded-xl bg-[#064632] text-white font-bold text-sm shadow-md hover:bg-emerald-950 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
