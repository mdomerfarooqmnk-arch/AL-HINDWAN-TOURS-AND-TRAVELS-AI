import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  MessageCircle,
  PhoneCall,
  Clock,
  Send,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen12Contact: React.FC = () => {
  const { contactInfo, submitEnquiry, navigateTo } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [month, setMonth] = useState('October 2026');
  const [passengers, setPassengers] = useState(2);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    submitEnquiry({
      name,
      phone,
      preferredMonth: month,
      numPassengers: passengers,
      message
    });

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const openWhatsApp = (phoneNum: string = '+919700762916') => {
    const text = encodeURIComponent(
      'Assalamu Alaikum! I want to enquire about Umrah packages and booking with Al Hindwan Tours & Travels.'
    );
    window.open(`https://wa.me/${phoneNum.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const callPhone = (num: string) => {
    window.location.href = `tel:${num.replace(/\s+/g, '')}`;
  };

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Contact Us"
        onBack={() => navigateTo('home')}
      />

      <div className="p-4 space-y-4">
        {/* Head Office Card - Hyderabad */}
        <div className="p-4 bg-white rounded-2xl border border-[#D8B45A]/35 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h3 className="text-xs font-black text-[#064632] uppercase tracking-wider font-serif">
              Head Office – Hyderabad
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#D8B45A]/20 text-[#064632] border border-[#D8B45A]/40">
              Telangana
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {contactInfo.headOffice.phones.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <a
                  href={`tel:${p.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-2 text-stone-800 font-semibold hover:text-[#064632]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#064632]" />
                  <span>{p}</span>
                </a>
                <button
                  onClick={() => callPhone(p)}
                  className="px-2 py-0.5 text-[10px] font-bold bg-[#FFF9EB] text-[#064632] border border-[#D8B45A] rounded-md hover:bg-[#D8B45A]/20"
                >
                  Call
                </button>
              </div>
            ))}

            <div className="flex items-start space-x-2 pt-1 text-stone-700">
              <MapPin className="w-4 h-4 text-[#D8B45A] shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                {contactInfo.headOffice.address}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-stone-500">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{contactInfo.headOffice.timings}</span>
            </div>
          </div>
        </div>

        {/* Branch Office Card - Manna Ekhelli */}
        <div className="p-4 bg-white rounded-2xl border border-[#D8B45A]/35 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h3 className="text-xs font-black text-[#064632] uppercase tracking-wider font-serif">
              Branch Office – Manna Ekhelli
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#D8B45A]/20 text-[#064632] border border-[#D8B45A]/40">
              Karnataka
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {contactInfo.branchOffice.phones.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <a
                  href={`tel:${p.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-2 text-stone-800 font-semibold hover:text-[#064632]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#064632]" />
                  <span>{p}</span>
                </a>
                <button
                  onClick={() => callPhone(p)}
                  className="px-2 py-0.5 text-[10px] font-bold bg-[#FFF9EB] text-[#064632] border border-[#D8B45A] rounded-md hover:bg-[#D8B45A]/20"
                >
                  Call
                </button>
              </div>
            ))}

            <div className="flex items-start space-x-2 pt-1 text-stone-700">
              <MapPin className="w-4 h-4 text-[#D8B45A] shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                {contactInfo.branchOffice.address}
              </p>
            </div>
          </div>
        </div>

        {/* Big Action Buttons matching Screenshot 12 */}
        <div className="space-y-2.5">
          {/* Green WhatsApp Booking Button */}
          <button
            onClick={() => openWhatsApp('+919700762916')}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Booking</span>
          </button>

          {/* Gold Call Now Button */}
          <button
            onClick={() => callPhone('+919700762916')}
            className="w-full py-3.5 px-4 rounded-xl bg-[#D8B45A] text-[#032D23] font-bold text-sm shadow-md hover:bg-amber-300 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call Now (+91 9700762916)</span>
          </button>
        </div>

        {/* Quick Online Enquiry Form */}
        <div className="p-4 bg-white rounded-2xl border border-[#D8B45A]/30 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#064632] uppercase tracking-wider">
            Send Umrah Enquiry
          </h3>

          {submitted ? (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Jazakallahu Khair! Your enquiry has been received. Our Hyderabadi consultant will call you shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-2.5">
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Mobile / WhatsApp Number (+91 ...)"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50"
                  >
                    <option value="October 2026">October 2026</option>
                    <option value="December 2026">December 2026</option>
                    <option value="January 2027">January 2027</option>
                    <option value="February 2027">February 2027</option>
                  </select>
                </div>
                <div>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Specific room requirements, elderly assistance, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#064632] bg-stone-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#064632] text-white font-bold text-xs shadow-xs hover:bg-emerald-950 flex items-center justify-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
