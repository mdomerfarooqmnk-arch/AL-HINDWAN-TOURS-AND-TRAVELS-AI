import React, { useState } from 'react';
import { Calendar, User, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';
import { Passenger } from '../types';

export const Screen7PassengerDetails: React.FC = () => {
  const { bookingDraft, updateBookingDraft, navigateTo } = useApp();
  const [errorMsg, setErrorMsg] = useState('');

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...bookingDraft.passengers];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    updateBookingDraft({ passengers: updated });
    setErrorMsg('');
  };

  const addPassenger = () => {
    if (bookingDraft.passengers.length >= 10) return;
    const newPassenger: Passenger = {
      fullName: '',
      dob: '',
      passportNumber: '',
      passportExpiry: '',
      nationality: 'India',
      gender: 'Male'
    };
    updateBookingDraft({
      passengerCount: bookingDraft.passengers.length + 1,
      passengers: [...bookingDraft.passengers, newPassenger]
    });
  };

  const removePassenger = (index: number) => {
    if (bookingDraft.passengers.length <= 1) return;
    const updated = bookingDraft.passengers.filter((_, i) => i !== index);
    updateBookingDraft({
      passengerCount: updated.length,
      passengers: updated
    });
  };

  const handleNext = () => {
    // Basic validation
    for (let i = 0; i < bookingDraft.passengers.length; i++) {
      const p = bookingDraft.passengers[i];
      if (!p.fullName.trim()) {
        setErrorMsg(`Please enter Full Name for Passenger ${i + 1}`);
        return;
      }
      if (!p.passportNumber.trim()) {
        setErrorMsg(`Please enter Passport Number for Passenger ${i + 1}`);
        return;
      }
    }
    navigateTo('payment');
  };

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Passenger Details"
        onBack={() => navigateTo('booking_form')}
      />

      {/* 4-Step Stepper Header */}
      <div className="bg-white px-4 py-3 border-b border-[#D8B45A]/25">
        <div className="flex items-center justify-between max-w-xs mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#064632] text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span className="text-[10px] font-bold text-[#064632] mt-1">Package</span>
          </div>

          <div className="flex-1 h-0.5 bg-[#064632] mx-2" />

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#064632] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              2
            </div>
            <span className="text-[10px] font-bold text-[#064632] mt-1">Passengers</span>
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
        {errorMsg && (
          <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-xl text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Passenger Cards */}
        {bookingDraft.passengers.map((p, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-white rounded-2xl border border-[#D8B45A]/30 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-xs font-black text-[#064632] uppercase tracking-wider flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Passenger {idx + 1}</span>
              </span>

              {bookingDraft.passengers.length > 1 && (
                <button
                  onClick={() => removePassenger(idx)}
                  className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                  aria-label={`Remove Passenger ${idx + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Full Name (As per Passport)
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                value={p.fullName}
                onChange={(e) => updatePassenger(idx, 'fullName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={p.dob}
                  onChange={(e) => updatePassenger(idx, 'dob', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
                />
              </div>
            </div>

            {/* Passport Number */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Passport Number
              </label>
              <input
                type="text"
                placeholder="Enter passport number (e.g. Z5849301)"
                value={p.passportNumber}
                onChange={(e) => updatePassenger(idx, 'passportNumber', e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50 uppercase font-mono"
              />
            </div>

            {/* Passport Expiry Date */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Passport Expiry Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={p.passportExpiry}
                  onChange={(e) => updatePassenger(idx, 'passportExpiry', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
                />
              </div>
            </div>

            {/* Nationality & Gender Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Nationality
                </label>
                <select
                  value={p.nationality}
                  onChange={(e) => updatePassenger(idx, 'nationality', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
                >
                  <option value="India">India</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="UAE">UAE</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Gender
                </label>
                <select
                  value={p.gender}
                  onChange={(e) => updatePassenger(idx, 'gender', e.target.value as 'Male' | 'Female')}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* Add More Passenger Button */}
        <button
          onClick={addPassenger}
          className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#D8B45A] text-[#064632] font-bold text-xs hover:bg-[#D8B45A]/10 active:scale-98 transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
        >
          <Plus className="w-4 h-4 text-[#D8B45A]" />
          <span>Add More Passenger +</span>
        </button>

        {/* Privacy Note */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[10px] text-stone-500 flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>
            Passport details are encrypted and securely utilized strictly for Saudi Ministry of Hajj & Umrah visa clearance and airline e-ticketing.
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-4 rounded-xl bg-[#064632] text-white font-bold text-sm shadow-md hover:bg-emerald-950 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
