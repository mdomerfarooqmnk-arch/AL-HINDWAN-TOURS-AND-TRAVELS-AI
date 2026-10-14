import React, { useState } from 'react';
import {
  FileText,
  CreditCard,
  Camera,
  Search,
  Download,
  Users,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/PhoneFrame';

export const Screen9VisaDocs: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [passportQuery, setPassportQuery] = useState('');
  const [searchStatusResult, setSearchStatusResult] = useState<{
    found: boolean;
    name?: string;
    status?: string;
    date?: string;
  } | null>(null);

  const docSections = [
    {
      id: 'required_docs',
      title: 'Required Documents List',
      icon: FileText,
      description: 'Checklist of original documents needed for Umrah e-Visa processing.'
    },
    {
      id: 'passport_guidelines',
      title: 'Passport Guidelines',
      icon: CreditCard,
      description: 'Validity requirements, blank pages, and machine-readable checks.'
    },
    {
      id: 'photo_specs',
      title: 'Photo Specifications',
      icon: Camera,
      description: 'Saudi Ministry photo size, background rules, and attire guidelines.'
    },
    {
      id: 'visa_status',
      title: 'Visa Process & Status',
      icon: Search,
      description: 'Track your Saudi Ministry visa approval status live using passport.'
    },
    {
      id: 'download_forms',
      title: 'Download Forms',
      icon: Download,
      description: 'Download Ministry Undertaking & Medical declaration forms.'
    },
    {
      id: 'group_individual',
      title: 'Group vs Individual Umrah Visa',
      icon: Users,
      description: 'Important differences between Group Muallim visa and Tourist e-Visa.'
    }
  ];

  const handlePassportSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passportQuery.trim()) return;

    if (passportQuery.trim().toUpperCase() === 'Z5849301') {
      setSearchStatusResult({
        found: true,
        name: 'Mohammed Omer Farooq',
        status: 'Visa Approved & Issued (MOFA Verified)',
        date: 'Valid till 28 Nov 2026'
      });
    } else {
      setSearchStatusResult({
        found: true,
        name: `Passport ${passportQuery.toUpperCase()}`,
        status: 'Under MOFA Security & Biometric Review (Estimated 24-48 hrs)',
        date: 'Submitted 14 Oct 2026'
      });
    }
  };

  return (
    <div className="min-h-full bg-[#FFF9EB] pb-24 text-[#17211D]">
      <ScreenHeader
        title="Visa & Documents"
        onBack={() => navigateTo('home')}
      />

      {/* Intro Banner */}
      <div className="p-4 bg-gradient-to-r from-[#064632] to-[#032D23] text-white">
        <h2 className="text-sm font-bold text-[#D8B45A] font-serif">
          Official Saudi Umrah e-Visa Portal
        </h2>
        <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
          Al Hindwan Tours & Travels is an authorized Saudi Ministry of Hajj & Umrah partner. All documentation is processed under strict consular standards.
        </p>
      </div>

      {/* Documents List */}
      <div className="p-3 space-y-2.5">
        {docSections.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className="p-3.5 bg-white rounded-2xl border border-[#D8B45A]/30 shadow-xs hover:border-[#D8B45A] hover:shadow-sm cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9EB] border border-[#D8B45A]/40 text-[#064632] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <h3 className="text-xs font-bold text-[#064632] truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 truncate mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#D8B45A] shrink-0 ml-2" />
            </div>
          );
        })}
      </div>

      {/* Modal / Sheet for Details */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto p-5 border-t-2 sm:border-2 border-[#D8B45A] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-sm font-bold text-[#064632]">
                {docSections.find((s) => s.id === activeModal)?.title}
              </h3>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setSearchStatusResult(null);
                }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 text-xs space-y-3 text-stone-700">
              {activeModal === 'required_docs' && (
                <div className="space-y-2.5">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-900">Original Passport</p>
                      <p className="text-stone-600 text-[11px]">Must have minimum 6 months validity from departure date and at least 2 blank pages.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-900">Recent Color Photographs</p>
                      <p className="text-stone-600 text-[11px]">2 recent photos (4cm × 6cm) with pure white background, 80% face focus.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-900">PAN Card Copy</p>
                      <p className="text-stone-600 text-[11px]">Required for RBI LRS compliance and TCS reporting.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-900">Meningitis Vaccination Certificate</p>
                      <p className="text-stone-600 text-[11px]">Mandatory ACWY quadrivalent vaccination certificate issued at least 10 days before arrival.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'photo_specs' && (
                <div className="space-y-2">
                  <p className="font-semibold text-stone-900">Saudi Foreign Ministry Photo Rules:</p>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
                    <li>Size: 4cm × 6cm or 2 inch × 2 inch.</li>
                    <li>Background: Plain, crisp white with no shadows.</li>
                    <li>Face coverage: 70% to 80% of total frame.</li>
                    <li>No glare on glasses; plain neutral expression.</li>
                    <li>Ladies: Dark or contrasting hijab with entire face oval visible.</li>
                  </ul>
                </div>
              )}

              {activeModal === 'passport_guidelines' && (
                <div className="space-y-2">
                  <p className="font-semibold text-stone-900">Passport Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
                    <li>Must be an official Machine-Readable Passport (MRP).</li>
                    <li>Strict minimum 6 full months validity from travel date.</li>
                    <li>No torn pages, water marks, or damaged laminate.</li>
                    <li>Name on booking MUST match passport character for character.</li>
                  </ul>
                </div>
              )}

              {activeModal === 'visa_status' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-stone-600">
                    Enter your 8-digit passport number to check live e-Visa clearance:
                  </p>
                  <form onSubmit={handlePassportSearch} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g. Z5849301"
                      value={passportQuery}
                      onChange={(e) => setPassportQuery(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono uppercase focus:outline-hidden focus:border-[#064632]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#064632] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-950"
                    >
                      Check Status
                    </button>
                  </form>

                  {searchStatusResult && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
                      <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{searchStatusResult.name}</span>
                      </div>
                      <p className="text-[11px] text-emerald-900 font-semibold">{searchStatusResult.status}</p>
                      <p className="text-[10px] text-emerald-700">{searchStatusResult.date}</p>
                    </div>
                  )}
                </div>
              )}

              {activeModal === 'download_forms' && (
                <div className="space-y-2">
                  <p className="font-semibold text-stone-900">Official Downloadable PDF Templates:</p>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                      <span className="font-medium">1. Saudi Umrah Passenger Undertaking.pdf</span>
                      <button
                        onClick={() => alert('Downloading official Saudi Umrah Undertaking form...')}
                        className="p-1.5 bg-[#064632] text-white rounded-lg hover:bg-emerald-950"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                      <span className="font-medium">2. Medical Fitness & ACWY Card Form.pdf</span>
                      <button
                        onClick={() => alert('Downloading Medical Fitness form...')}
                        className="p-1.5 bg-[#064632] text-white rounded-lg hover:bg-emerald-950"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'group_individual' && (
                <div className="space-y-2">
                  <p className="font-semibold text-stone-900">Group vs Individual Umrah Visas:</p>
                  <p className="text-[11px] text-stone-600">
                    • <strong>Group Umrah Visa:</strong> Handled under Al Hindwan Tours agency quota with official group Muallim escort, synchronized luxury bus transportation, and included Ziyarat.
                  </p>
                  <p className="text-[11px] text-stone-600">
                    • <strong>Individual Tourist e-Visa:</strong> 1-Year multiple entry option available for eligible passport holders or GCC residents with independent transport arrangements.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                setSearchStatusResult(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#064632] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
