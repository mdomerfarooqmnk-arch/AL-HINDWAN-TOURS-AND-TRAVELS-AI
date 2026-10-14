import React, { useState } from 'react';
import {
  Package,
  CalendarCheck,
  Building,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  RotateCcw,
  ArrowLeft,
  Search,
  Download,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UmrahPackage } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    packages,
    bookings,
    enquiries,
    addPackage,
    updatePackage,
    deletePackage,
    updateBookingStatus,
    updatePaymentStatus,
    resetToSampleData,
    setViewMode,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'packages' | 'bookings' | 'enquiries' | 'settings'>('packages');
  const [editingPackage, setEditingPackage] = useState<UmrahPackage | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New package form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Economy' | 'Standard' | 'Premium'>('Standard');
  const [newDepDate, setNewDepDate] = useState('15 NOV 2026');
  const [newRetDate, setNewRetDate] = useState('29 NOV 2026');
  const [newPrice, setNewPrice] = useState(93000);
  const [newAirline, setNewAirline] = useState('IndiGo (Direct)');
  const [newRoute, setNewRoute] = useState('Hyderabad – Jeddah – Hyderabad');
  const [newMakkahHotel, setNewMakkahHotel] = useState('Mather Al Jewar Hotel');
  const [newMadinahHotel, setNewMadinahHotel] = useState('Emaar Al Noor');
  const [newSeats, setNewSeats] = useState(30);

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addPackage({
      title: newTitle,
      category: newCategory,
      departureDate: newDepDate,
      returnDate: newRetDate,
      durationDays: 15,
      pricePerPerson: Number(newPrice),
      airline: newAirline,
      route: newRoute,
      makkahHotel: newMakkahHotel,
      madinahHotel: newMadinahHotel,
      makkahNights: 8,
      madinahNights: 7,
      thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
      featured: false,
      published: true,
      availableSeats: Number(newSeats),
      inclusions: [
        'Umrah Visa with Insurance',
        'Direct Return Flight Tickets',
        'Hotel Stay in Makkah & Madinah',
        '3 Time Hyderabadi Meals',
        'Guided Ziyarat Tour',
        '5L Zamzam Can'
      ],
      exclusions: [
        'Personal laundry & room service'
      ]
    });

    setIsAddingNew(false);
    setNewTitle('');
  };

  const handleUpdatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    updatePackage(editingPackage.id, editingPackage);
    setEditingPackage(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-[#17211D]">
      {/* Admin Top Bar */}
      <div className="bg-[#064632] text-white px-6 py-4 flex flex-wrap items-center justify-between border-b border-[#D8B45A]/40 shadow-md gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode('emulator')}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Return to App Emulator"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-black tracking-wider text-[#D8B45A] font-serif uppercase">
              AL HINDWAN TOURS & TRAVELS — ADMIN CONSOLE
            </h1>
            <p className="text-xs text-emerald-200">
              Role: Authorized Agency Super Admin · Real-Time Umrah Catalog Management
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={resetToSampleData}
            className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold hover:bg-white/20 flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => setViewMode('emulator')}
            className="px-4 py-1.5 rounded-lg bg-[#D8B45A] text-[#032D23] text-xs font-bold shadow-xs hover:bg-amber-300 transition-colors"
          >
            Launch Customer App
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="bg-white border-b border-stone-200 px-6 py-2 flex items-center space-x-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('packages')}
          className={`py-2 px-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'packages'
              ? 'border-[#064632] text-[#064632]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Umrah Packages ({packages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`py-2 px-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'bookings'
              ? 'border-[#064632] text-[#064632]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Customer Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`py-2 px-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'enquiries'
              ? 'border-[#064632] text-[#064632]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customer Enquiries ({enquiries.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-stone-900">Umrah Package Inventory</h2>
                <p className="text-xs text-stone-500">
                  Update rates, departures, flight carriers, and publish states directly to the live app.
                </p>
              </div>

              <button
                onClick={() => setIsAddingNew(true)}
                className="px-4 py-2 rounded-xl bg-[#064632] text-white font-bold text-xs shadow-sm hover:bg-emerald-950 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Umrah Package</span>
              </button>
            </div>

            {/* Add New Package Modal/Card */}
            {isAddingNew && (
              <form
                onSubmit={handleCreatePackage}
                className="p-5 bg-white rounded-2xl border-2 border-[#D8B45A] shadow-md space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h3 className="text-sm font-bold text-[#064632]">Create New Umrah Package</h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Package Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. November 2026 Special Umrah"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Price Per Person (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Departure Date</label>
                    <input
                      type="text"
                      required
                      value={newDepDate}
                      onChange={(e) => setNewDepDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Return Date</label>
                    <input
                      type="text"
                      required
                      value={newRetDate}
                      onChange={(e) => setNewRetDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Airline & Flight Type</label>
                    <input
                      type="text"
                      required
                      value={newAirline}
                      onChange={(e) => setNewAirline(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Makkah Hotel</label>
                    <input
                      type="text"
                      required
                      value={newMakkahHotel}
                      onChange={(e) => setNewMakkahHotel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Madinah Hotel</label>
                    <input
                      type="text"
                      required
                      value={newMadinahHotel}
                      onChange={(e) => setNewMadinahHotel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Available Seats</label>
                    <input
                      type="number"
                      required
                      value={newSeats}
                      onChange={(e) => setNewSeats(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#064632] text-white text-xs font-bold hover:bg-emerald-950"
                  >
                    Save & Publish
                  </button>
                </div>
              </form>
            )}

            {/* Packages Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#064632]/5 border-b border-stone-200 text-[#064632] font-bold">
                    <tr>
                      <th className="p-3">Package Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Departure</th>
                      <th className="p-3">Price / Person</th>
                      <th className="p-3">Airline & Route</th>
                      <th className="p-3">Hotels</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-stone-50">
                        <td className="p-3 font-bold text-stone-900">
                          {pkg.title}
                          {pkg.featured && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-sm text-[9px] bg-amber-100 text-amber-800 font-bold">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700">
                            {pkg.category}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-stone-700">{pkg.departureDate}</td>
                        <td className="p-3 font-mono font-bold text-[#064632]">
                          ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-stone-600 truncate max-w-[150px]">
                          {pkg.airline}
                        </td>
                        <td className="p-3 text-stone-600 truncate max-w-[150px]">
                          {pkg.makkahHotel}
                        </td>
                        <td className="p-3 font-mono">{pkg.availableSeats}</td>
                        <td className="p-3">
                          <button
                            onClick={() => updatePackage(pkg.id, { published: !pkg.published })}
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              pkg.published
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {pkg.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{pkg.published ? 'Published' : 'Hidden'}</span>
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => {
                                updatePackage(pkg.id, { featured: !pkg.featured });
                              }}
                              className="p-1 rounded-md text-amber-600 hover:bg-amber-50"
                              title="Toggle Featured"
                            >
                              ★
                            </button>
                            <button
                              onClick={() => deletePackage(pkg.id)}
                              className="p-1 rounded-md text-rose-600 hover:bg-rose-50"
                              title="Delete Package"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Customer Bookings & Pilgrim Management</h2>
              <p className="text-xs text-stone-500">
                View passenger passport manifests, update payment confirmations, and issue visa approvals.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#064632]/5 border-b border-stone-200 text-[#064632] font-bold">
                    <tr>
                      <th className="p-3">Booking ID</th>
                      <th className="p-3">Package</th>
                      <th className="p-3">Departure</th>
                      <th className="p-3">Passengers</th>
                      <th className="p-3">Total Fare</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Workflow Status</th>
                      <th className="p-3">Change Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50">
                        <td className="p-3 font-mono font-bold text-[#064632]">{b.id}</td>
                        <td className="p-3 font-semibold text-stone-900">{b.packageTitle}</td>
                        <td className="p-3">{b.departureDate}</td>
                        <td className="p-3">
                          <span className="font-bold">{b.passengerCount} Persons</span>
                          <div className="text-[10px] text-stone-500">
                            {b.passengers.map((p) => p.fullName).filter(Boolean).join(', ')}
                          </div>
                        </td>
                        <td className="p-3 font-mono font-bold text-stone-900">
                          ₹{b.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {b.paymentStatus} ({b.paymentMethod})
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D8B45A]/20 text-[#064632] border border-[#D8B45A]/40">
                            {b.bookingStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={b.bookingStatus}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                            className="px-2 py-1 rounded-lg border border-stone-300 text-[11px] bg-white font-medium"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending Verification">Pending Verification</option>
                            <option value="Documents Review">Documents Review</option>
                            <option value="Visa Approved">Visa Approved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Lead Enquiries & Inbound Messages</h2>
              <p className="text-xs text-stone-500">
                Prospective pilgrims requesting booking callbacks from Hyderabad & Karnataka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 bg-white rounded-2xl border border-[#D8B45A]/30 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#064632]">{enq.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-stone-800">
                    Phone: <a href={`tel:${enq.phone}`} className="text-[#064632] underline">{enq.phone}</a>
                  </p>
                  <p className="text-xs text-stone-600">
                    Preferred Month: <strong>{enq.preferredMonth}</strong> · Pilgrims: <strong>{enq.numPassengers}</strong>
                  </p>
                  {enq.message && (
                    <p className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 italic">
                      "{enq.message}"
                    </p>
                  )}

                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      onClick={() => {
                        window.open(`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                    >
                      WhatsApp Reply
                    </button>
                    <a
                      href={`tel:${enq.phone}`}
                      className="px-3 py-1.5 rounded-lg bg-[#064632] text-white text-xs font-bold hover:bg-emerald-950"
                    >
                      Call Lead
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
