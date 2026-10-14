export interface UmrahPackage {
  id: string;
  title: string;
  category: 'Economy' | 'Standard' | 'Premium';
  departureDate: string; // e.g. "29 OCT 2026"
  returnDate: string; // e.g. "12 NOV 2026"
  durationDays: number;
  pricePerPerson: number; // e.g. 93000
  airline: string; // e.g. "IndiGo (Direct)"
  route: string; // e.g. "Hyderabad – Jeddah – Hyderabad"
  makkahHotel: string; // e.g. "Mather Al Jewar Hotel (Near Haram)"
  madinahHotel: string; // e.g. "Emaar Taiba / Swissotel"
  makkahNights: number;
  madinahNights: number;
  thumbnail: string;
  featured: boolean;
  published: boolean;
  availableSeats: number;
  inclusions: string[];
  exclusions: string[];
  notes?: string;
}

export interface Passenger {
  fullName: string;
  dob: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
  gender: 'Male' | 'Female';
}

export interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  departureDate: string;
  passengerCount: number;
  pricePerPerson: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'BankTransfer';
  paymentStatus: 'Pending' | 'Successful' | 'Failed';
  bookingStatus: 'Confirmed' | 'Pending Verification' | 'Documents Review' | 'Visa Approved';
  passengers: Passenger[];
  createdAt: string;
  contactPhone: string;
  contactEmail: string;
  transactionRef: string;
}

export interface Hotel {
  id: string;
  city: 'Makkah' | 'Madinah';
  name: string;
  distanceFromHaram: string;
  category: 'Economy' | 'Standard' | 'Premium';
  starRating: number;
  walkingDistance: boolean;
  freeWifi: boolean;
  mealsIncluded: string; // e.g. "Hyderabadi Khana" or "International Buffet"
  hasLift: boolean;
  description: string;
  image: string;
}

export interface ZiyaratPlace {
  id: string;
  city: 'Makkah' | 'Madinah';
  name: string;
  subName?: string;
  description: string;
  significance: string;
  image: string;
  itineraryNote: string;
}

export interface ContactInfo {
  headOffice: {
    city: string;
    phones: string[];
    address: string;
    timings: string;
    whatsapp: string;
    email: string;
  };
  branchOffice: {
    city: string;
    locationName: string;
    phones: string[];
    address: string;
  };
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredMonth: string;
  numPassengers: number;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}
