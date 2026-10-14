import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Building2,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Download,
  MessageCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen8Payment: React.FC = () => {
  const { packages, bookingDraft, updateBookingDraft, completeBooking, navigateTo } = useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const selectedPkg =
    packages.find((p) => p.id === bookingDraft.packageId) || packages[0];

  const totalAmount = selectedPkg.pricePerPerson * bookingDraft.passengerCount;

  const paymentOptions: {
    id: 'UPI' | 'Card' | 'NetBanking' | 'BankTransfer';
    label: string;
    sublabel: string;
    icon: React.ElementType;
  }[] = [
    {
      id: 'UPI',
      label: 'UPI (GPay / PhonePe / Paytm)',
      sublabel: 'Instant zero-fee payment via any UPI app',
      icon: QrCode
    },
    {
      id: 'Card',
      label: 'Credit / Debit Card',
      sublabel: 'Visa, MasterCard, RuPay, Maestro',
      icon: CreditCard
    },
    {
      id: 'NetBanking',
      label: 'Net Banking',
      sublabel: 'All major Indian retail banks supported',
      icon: Building2
    },
    {
      id: 'BankTransfer',
      label: 'Bank Transfer (NEFT / RTGS)',
      sublabel: 'Current Account direct transfer with receipt upload',
      icon: Landmark
    }
  ];

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate server side payment order verification
    setTimeout(async () => {
      const bookingId = await completeBooking();
      setIsProcessing(false);
      setConfirmedBookingId(bookingId);
    }, 1200);
  };

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Payment"
        onBack={() => navigateTo('passenger_details')}
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
            <div className="w-7 h-7 rounded-full bg-[#064632] text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span className="text-[10px] font-bold text-[#064632] mt-1">Passengers</span>
          </div>

          <div className="flex-1 h-0.5 bg-[#064632] mx-2" />

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#064632] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              3
            </div>
            <span className="text-[10px] font-bold text-[#064632] mt-1">Payment</span>
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
        {/* Payment Summary Box */}
        <div className="p-4 bg-white rounded-2xl border border-[#D8B45A]/30 shadow-xs space-y-2.5">
          <div className="flex justify-between text-xs text-stone-600">
            <span>Package Amount</span>
            <span className="font-semibold text-stone-800">
              ₹{selectedPkg.pricePerPerson.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between text-xs text-stone-600">
            <span>No. of Passengers</span>
            <span className="font-semibold text-stone-800">
              {bookingDraft.passengerCount}
            </span>
          </div>

          <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
            <span className="text-sm font-bold text-[#064632]">Total Amount</span>
            <span className="text-lg font-black text-[#064632]">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div>
          <h3 className="text-xs font-bold text-[#064632] uppercase tracking-wider mb-2">
            Select Payment Method
          </h3>

          <div className="space-y-2.5">
            {paymentOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = bookingDraft.paymentMethod === opt.id;

              return (
                <label
                  key={opt.id}
                  onClick={() => updateBookingDraft({ paymentMethod: opt.id })}
                  className={`flex items-center p-3 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-[#064632] ring-1 ring-[#064632]'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={isSelected}
                    onChange={() => updateBookingDraft({ paymentMethod: opt.id })}
                    className="accent-[#064632] w-4 h-4 mr-3"
                  />

                  <div className="w-8 h-8 rounded-lg bg-[#FFF9EB] border border-[#D8B45A]/40 flex items-center justify-center text-[#064632] mr-3 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#17211D]">{opt.label}</p>
                    <p className="text-[10px] text-stone-500 truncate">{opt.sublabel}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Bank Transfer Details Box if Selected */}
        {bookingDraft.paymentMethod === 'BankTransfer' && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <p className="font-bold">Official Current Account Details:</p>
            <p>Account Name: AL HINDWAN TOURS & TRAVELS</p>
            <p>Bank: HDFC Bank, Chandrayangutta Branch, Hyderabad</p>
            <p>A/C No: 50200084920194 · IFSC: HDFC0001842</p>
          </div>
        )}

        {/* Pay Now Button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3.5 px-4 rounded-xl bg-[#064632] text-white font-bold text-sm shadow-md hover:bg-emerald-950 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying with Gateway...</span>
            </div>
          ) : (
            <span>Pay Now (₹{totalAmount.toLocaleString('en-IN')})</span>
          )}
        </button>

        {/* 100% Secure Payment Badge */}
        <div className="flex items-center justify-center space-x-1.5 text-emerald-800 text-xs font-semibold pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>100% Secure Payment (PCI-DSS & SSL Encrypted)</span>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      {confirmedBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border-2 border-[#D8B45A] shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#064632] font-serif">
                Booking Confirmed!
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Alhamdulillah! Your Umrah reservation has been received.
              </p>
              <div className="mt-3 p-2 rounded-xl bg-stone-100 font-mono text-xs font-bold text-stone-800">
                Booking ID: {confirmedBookingId}
              </div>
            </div>

            <div className="text-left bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-500">Package:</span>
                <span className="font-semibold text-stone-800 truncate">{selectedPkg.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Departure:</span>
                <span className="font-semibold text-stone-800">{selectedPkg.departureDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Passengers:</span>
                <span className="font-semibold text-stone-800">{bookingDraft.passengerCount} Persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Amount Paid:</span>
                <span className="font-bold text-[#064632]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    `Assalamu Alaikum! I have completed booking ${confirmedBookingId} for ${selectedPkg.title} (${bookingDraft.passengerCount} passengers). Please verify my documents.`
                  );
                  window.open(`https://wa.me/919700762916?text=${message}`, '_blank');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to Agency WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedBookingId(null);
                  navigateTo('my_bookings');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#064632] text-white font-bold text-xs shadow-xs hover:bg-emerald-950"
              >
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
