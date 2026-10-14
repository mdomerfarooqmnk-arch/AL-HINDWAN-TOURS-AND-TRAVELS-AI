import React, { createContext, useContext, useState, useEffect } from 'react';
import { UmrahPackage, Hotel, ZiyaratPlace, ContactInfo, Booking, Enquiry, Passenger } from '../types';
import {
  INITIAL_PACKAGES,
  INITIAL_HOTELS,
  INITIAL_ZIYARAT,
  INITIAL_CONTACT_INFO,
  INITIAL_BOOKINGS,
  INITIAL_ENQUIRIES
} from '../data/mockData';

export type ScreenId =
  | 'splash'
  | 'home'
  | 'packages'
  | 'search'
  | 'package_details'
  | 'booking_form'
  | 'passenger_details'
  | 'payment'
  | 'visa_docs'
  | 'hotels'
  | 'ziyarat'
  | 'contact'
  | 'my_bookings'
  | 'profile'
  | 'admin';

export type ViewMode = 'emulator' | 'showcase_grid' | 'admin' | 'android_source';

interface BookingDraft {
  packageId: string;
  departureDate: string;
  passengerCount: number;
  passengers: Passenger[];
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'BankTransfer';
}

interface AppContextType {
  // Screens & Navigation
  activeScreen: ScreenId;
  navigateTo: (screen: ScreenId, packageId?: string) => void;
  selectedPackageId: string;
  setSelectedPackageId: (id: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  userRole: 'customer' | 'admin';
  setUserRole: (role: 'customer' | 'admin') => void;

  // Data
  packages: UmrahPackage[];
  hotels: Hotel[];
  ziyarat: ZiyaratPlace[];
  bookings: Booking[];
  contactInfo: ContactInfo;
  enquiries: Enquiry[];

  // Booking Draft
  bookingDraft: BookingDraft;
  updateBookingDraft: (updates: Partial<BookingDraft>) => void;
  completeBooking: () => Promise<string>;
  resetBookingDraft: () => void;

  // Admin Actions
  addPackage: (pkg: Omit<UmrahPackage, 'id'>) => void;
  updatePackage: (id: string, updates: Partial<UmrahPackage>) => void;
  deletePackage: (id: string) => void;
  updateBookingStatus: (id: string, status: Booking['bookingStatus']) => void;
  updatePaymentStatus: (id: string, status: Booking['paymentStatus']) => void;
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateContactInfo: (info: ContactInfo) => void;

  // Utilities
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-oct-2026');
  const [viewMode, setViewMode] = useState<ViewMode>('emulator');
  const [userRole, setUserRole] = useState<'customer' | 'admin'>('customer');

  // Load from local storage or defaults
  const [packages, setPackages] = useState<UmrahPackage[]>(() => {
    try {
      const saved = localStorage.getItem('alh_packages');
      return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  const [hotels, setHotels] = useState<Hotel[]>(() => {
    try {
      const saved = localStorage.getItem('alh_hotels');
      return saved ? JSON.parse(saved) : INITIAL_HOTELS;
    } catch {
      return INITIAL_HOTELS;
    }
  });

  const [ziyarat, setZiyarat] = useState<ZiyaratPlace[]>(() => {
    try {
      const saved = localStorage.getItem('alh_ziyarat');
      return saved ? JSON.parse(saved) : INITIAL_ZIYARAT;
    } catch {
      return INITIAL_ZIYARAT;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('alh_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem('alh_contact');
      return saved ? JSON.parse(saved) : INITIAL_CONTACT_INFO;
    } catch {
      return INITIAL_CONTACT_INFO;
    }
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem('alh_enquiries');
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  // Booking Draft
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    packageId: 'pkg-oct-2026',
    departureDate: '29 OCT 2026',
    passengerCount: 2,
    passengers: [
      {
        fullName: 'Mohammed Omer Farooq',
        dob: '1988-06-15',
        passportNumber: 'Z5849301',
        passportExpiry: '2032-04-10',
        nationality: 'Indian',
        gender: 'Male'
      },
      {
        fullName: 'Ayesha Fatima',
        dob: '1992-09-22',
        passportNumber: 'Z5849302',
        passportExpiry: '2033-01-18',
        nationality: 'Indian',
        gender: 'Female'
      }
    ],
    paymentMethod: 'UPI'
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('alh_packages', JSON.stringify(packages));
    } catch (e) {
      console.warn(e);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('alh_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('alh_enquiries', JSON.stringify(enquiries));
    } catch (e) {
      console.warn(e);
    }
  }, [enquiries]);

  const navigateTo = (screen: ScreenId, packageId?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
      const pkg = packages.find((p) => p.id === packageId);
      if (pkg) {
        setBookingDraft((prev) => ({
          ...prev,
          packageId: pkg.id,
          departureDate: pkg.departureDate
        }));
      }
    }
    setActiveScreen(screen);
  };

  const updateBookingDraft = (updates: Partial<BookingDraft>) => {
    setBookingDraft((prev) => ({ ...prev, ...updates }));
  };

  const resetBookingDraft = () => {
    setBookingDraft({
      packageId: 'pkg-oct-2026',
      departureDate: '29 OCT 2026',
      passengerCount: 2,
      passengers: [
        {
          fullName: '',
          dob: '',
          passportNumber: '',
          passportExpiry: '',
          nationality: 'Indian',
          gender: 'Male'
        }
      ],
      paymentMethod: 'UPI'
    });
  };

  const completeBooking = async (): Promise<string> => {
    const pkg = packages.find((p) => p.id === bookingDraft.packageId) || packages[0];
    const newId = `ALH-UMR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const total = pkg.pricePerPerson * bookingDraft.passengerCount;

    const newBooking: Booking = {
      id: newId,
      packageId: pkg.id,
      packageTitle: pkg.title,
      departureDate: bookingDraft.departureDate || pkg.departureDate,
      passengerCount: bookingDraft.passengerCount,
      pricePerPerson: pkg.pricePerPerson,
      totalAmount: total,
      paymentMethod: bookingDraft.paymentMethod,
      paymentStatus: 'Successful',
      bookingStatus: 'Confirmed',
      passengers: bookingDraft.passengers,
      createdAt: new Date().toISOString(),
      contactPhone: '+91 9700762916',
      contactEmail: 'pilgrim@alhindwantours.com',
      transactionRef: `TXN-${Date.now()}`
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newId;
  };

  const addPackage = (pkgData: Omit<UmrahPackage, 'id'>) => {
    const newPkg: UmrahPackage = {
      ...pkgData,
      id: `pkg-${Date.now()}`
    };
    setPackages((prev) => [newPkg, ...prev]);
  };

  const updatePackage = (id: string, updates: Partial<UmrahPackage>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const updateBookingStatus = (id: string, status: Booking['bookingStatus']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, bookingStatus: status } : b)));
  };

  const updatePaymentStatus = (id: string, status: Booking['paymentStatus']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, paymentStatus: status } : b)));
  };

  const submitEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnq: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setEnquiries((prev) => [newEnq, ...prev]);
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    try {
      localStorage.setItem('alh_contact', JSON.stringify(info));
    } catch (e) {
      console.warn(e);
    }
  };

  const resetToSampleData = () => {
    setPackages(INITIAL_PACKAGES);
    setHotels(INITIAL_HOTELS);
    setZiyarat(INITIAL_ZIYARAT);
    setBookings(INITIAL_BOOKINGS);
    setContactInfo(INITIAL_CONTACT_INFO);
    setEnquiries(INITIAL_ENQUIRIES);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        navigateTo,
        selectedPackageId,
        setSelectedPackageId,
        viewMode,
        setViewMode,
        userRole,
        setUserRole,
        packages,
        hotels,
        ziyarat,
        bookings,
        contactInfo,
        enquiries,
        bookingDraft,
        updateBookingDraft,
        completeBooking,
        resetBookingDraft,
        addPackage,
        updatePackage,
        deletePackage,
        updateBookingStatus,
        updatePaymentStatus,
        submitEnquiry,
        updateContactInfo,
        resetToSampleData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
