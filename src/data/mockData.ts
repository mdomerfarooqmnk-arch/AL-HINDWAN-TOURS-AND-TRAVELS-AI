import { UmrahPackage, Hotel, ZiyaratPlace, ContactInfo, Booking, Enquiry } from '../types';

export const INITIAL_PACKAGES: UmrahPackage[] = [
  {
    id: 'pkg-oct-2026',
    title: 'October 2026 Umrah Package',
    category: 'Standard',
    departureDate: '29 OCT 2026',
    returnDate: '12 NOV 2026',
    durationDays: 15,
    pricePerPerson: 93000,
    airline: 'IndiGo (Direct)',
    route: 'Hyderabad – Jeddah – Hyderabad',
    makkahHotel: 'Mather Al Jewar Hotel (Near Haram)',
    madinahHotel: 'Emaar Al Noor (Central Area)',
    makkahNights: 8,
    madinahNights: 7,
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    featured: true,
    published: true,
    availableSeats: 28,
    inclusions: [
      'Umrah Visa with Insurance',
      'Return Air Ticket (Direct Flight)',
      'Hotel Accommodation (Makkah & Madinah)',
      '3 Time Hyderabadi Khana (Buffet)',
      'Makkah & Madinah Ziyarat with Guide',
      '5 Liter Zam Zam Water (subject to airline rules)',
      'Group Guide Service & Religious Guidance',
      'AC Luxury Bus Transportation in Saudi'
    ],
    exclusions: [
      'Personal laundry & room service expenses',
      'Excess luggage charges beyond airline baggage limit',
      'Any individual transit expenses outside group schedule'
    ],
    notes: 'Direct flights from Rajiv Gandhi International Airport (HYD) to King Abdulaziz Airport (JED). Full support by experienced Hyderabadi guides.'
  },
  {
    id: 'pkg-dec-2026',
    title: 'December 2026 Umrah Package',
    category: 'Standard',
    departureDate: '08 DEC 2026',
    returnDate: '22 DEC 2026',
    durationDays: 15,
    pricePerPerson: 93000,
    airline: 'IndiGo (Direct)',
    route: 'Hyderabad – Jeddah – Hyderabad',
    makkahHotel: 'Mather Al Jewar Hotel (Near Haram)',
    madinahHotel: 'Emaar Al Noor (Central Area)',
    makkahNights: 8,
    madinahNights: 7,
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    featured: true,
    published: true,
    availableSeats: 34,
    inclusions: [
      'Umrah Visa with Health Insurance',
      'Return Air Ticket (IndiGo Direct Flight)',
      'Hotel Accommodation in Makkah & Madinah',
      '3 Time Hyderabadi Khana (Breakfast, Lunch, Dinner)',
      'Guided Makkah & Madinah Holy Ziyarat',
      '5 Liter Zam Zam Water Pack',
      'Experienced Tour Leader Support 24/7',
      'Roundtrip Luxury AC Coach Transfers'
    ],
    exclusions: [
      'Room service, telephone calls & laundry',
      'Custom individual travel outside group itinerary'
    ],
    notes: 'Comfortable winter weather in the Two Holy Sanctuaries. Ideal for families and elderly pilgrims.'
  },
  {
    id: 'pkg-jan-2027',
    title: 'January 2027 Umrah Package',
    category: 'Economy',
    departureDate: '14 JAN 2027',
    returnDate: '28 JAN 2027',
    durationDays: 15,
    pricePerPerson: 96000,
    airline: 'Air India / IndiGo (Direct)',
    route: 'Hyderabad – Jeddah – Hyderabad',
    makkahHotel: 'Al Kiswah Towers (Free Shuttle 24/7)',
    madinahHotel: 'Rua Al Hijrah (Central North)',
    makkahNights: 8,
    madinahNights: 7,
    thumbnail: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    featured: true,
    published: true,
    availableSeats: 40,
    inclusions: [
      'Umrah Tourist/Entry Visa with Insurance',
      'Direct Return Flight Tickets',
      'Quality Hotel Stay near Haram with Shuttle',
      'Hyderabadi Desi Meals 3 Times Daily',
      'Complete Holy Ziyarat in Makkah & Madinah',
      '5 Litre Zamzam Cans Provided',
      'Umrah Kit (Shoulder Bag, Shoe Bag, Tawaf Tasbeeh)'
    ],
    exclusions: [
      'Personal expenditures & excess baggage'
    ],
    notes: 'Budget-friendly package without compromising on hygiene, good food, and spiritual care.'
  },
  {
    id: 'pkg-feb-2027-prem',
    title: 'February 2027 Executive Luxury Umrah',
    category: 'Premium',
    departureDate: '18 FEB 2027',
    returnDate: '04 MAR 2027',
    durationDays: 15,
    pricePerPerson: 115000,
    airline: 'Saudia Airlines (Direct)',
    route: 'Hyderabad – Madinah / Jeddah – Hyderabad',
    makkahHotel: 'Swissotel Makkah (Clock Tower Courtyard)',
    madinahHotel: 'Anwar Al Madinah Mövenpick (Direct Gate 16)',
    makkahNights: 8,
    madinahNights: 7,
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    featured: false,
    published: true,
    availableSeats: 16,
    inclusions: [
      'VIP Umrah Visa & Fast-Track clearance',
      'Direct Saudia Airlines flight Hyderabad - Madinah',
      '5-Star Luxury Hotels on the Haram Courtyards',
      'International Buffet Breakfast & Hyderabadi Gourmet Dinners',
      'Private High-Roof AC Transport for Ziyarat',
      '5L Zamzam Water packed directly at airport',
      'Dedicated Muallim & Scholar accompaniment'
    ],
    exclusions: [
      'Single room supplement (if requested)',
      'Individual shopping & porter charges'
    ],
    notes: 'Zero walking hassle. Step directly out of the hotel lobby onto the Haram marble plaza.'
  }
];

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'hotel-mather-al-jewar',
    city: 'Makkah',
    name: 'Mather Al Jewar Hotel',
    distanceFromHaram: 'Near Haram (~450m)',
    category: 'Standard',
    starRating: 4,
    walkingDistance: true,
    freeWifi: true,
    mealsIncluded: 'Hyderabadi Khana',
    hasLift: true,
    description: 'Popular hotel among Hyderabadi pilgrims with spacious rooms, high-speed elevators, and authentic Hyderabadi catering on-site.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hotel-swissotel-makkah',
    city: 'Makkah',
    name: 'Swissotel Makkah',
    distanceFromHaram: 'Direct Haram Access (Clock Tower)',
    category: 'Premium',
    starRating: 5,
    walkingDistance: true,
    freeWifi: true,
    mealsIncluded: 'International Food & Indian Cuisine',
    hasLift: true,
    description: 'Direct access to the King Abdulaziz Gate of the Grand Mosque. Luxury rooms with Haram and Kaaba view options.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hotel-al-kiswah',
    city: 'Makkah',
    name: 'Al Kiswah Towers Hotel',
    distanceFromHaram: '900m (Free 24/7 Air-Conditioned Shuttle)',
    category: 'Economy',
    starRating: 3,
    walkingDistance: false,
    freeWifi: true,
    mealsIncluded: 'Hyderabadi Buffet',
    hasLift: true,
    description: 'Modern hotel complex with continuous round-the-clock air-conditioned shuttle service to the Grand Mosque bus terminal.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hotel-emaar-al-noor',
    city: 'Madinah',
    name: 'Emaar Al Noor Hotel',
    distanceFromHaram: 'Central Northern Area (~350m)',
    category: 'Standard',
    starRating: 4,
    walkingDistance: true,
    freeWifi: true,
    mealsIncluded: 'Hyderabadi Khana',
    hasLift: true,
    description: 'Peaceful location in the Northern Central Area with quick walking access to the Ladies and Gents entrances of Masjid an-Nabawi.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hotel-anwar-al-madinah',
    city: 'Madinah',
    name: 'Anwar Al Madinah Mövenpick',
    distanceFromHaram: 'Zero Meters (Gate 16 Courtyard)',
    category: 'Premium',
    starRating: 5,
    walkingDistance: true,
    freeWifi: true,
    mealsIncluded: 'International & Hyderabadi Gourmet',
    hasLift: true,
    description: 'The largest hotel in Madinah with direct indoor ramp connection into the courtyard of the Prophet’s Mosque.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_ZIYARAT: ZiyaratPlace[] = [
  {
    id: 'ziyarat-jabal-noor',
    city: 'Makkah',
    name: 'Jabal e Noor',
    subName: 'Cave of Hira (Ghar-e-Hira)',
    description: 'The blessed Mountain of Light where the Noble Prophet Muhammad ﷺ received the very first revelation of the Holy Quran through Angel Jibreel (AS).',
    significance: 'First revelation of Surah Al-Alaq (“Iqra”). Steep historic mountain peak overlooking Makkah Al-Mukarramah.',
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Visited during group morning Ziyarat. Bus stop at base with panoramic views and guide history session.'
  },
  {
    id: 'ziyarat-jabal-thawr',
    city: 'Makkah',
    name: 'Jabal e Thawr',
    subName: 'Ghar-e-Thawr (Cave of Migration)',
    description: 'The sacred mountain south of Makkah where the Prophet ﷺ and Sayyidna Abu Bakr As-Siddiq (RA) took refuge for three days during the Hijrah to Madinah.',
    significance: 'Site mentioned in the Quran: “When the two were in the cave, and he said to his companion: Do not grieve, Allah is with us.”',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Included in Makkah holy city historical coach tour.'
  },
  {
    id: 'ziyarat-arafat',
    city: 'Makkah',
    name: 'Arafat',
    subName: 'Jabal al-Rahmah (Mount of Mercy)',
    description: 'The blessed plains of Arafat and Jabal al-Rahmah, where the Prophet ﷺ delivered the historic Farewell Sermon (Khutbat al-Wada).',
    significance: 'Spiritual plain of supreme forgiveness and remembrance of Allah.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Pilgrims stop to pray at Jabal al-Rahmah and visit Masjid Nimrah.'
  },
  {
    id: 'ziyarat-mina',
    city: 'Makkah',
    name: 'Mina',
    subName: 'Valley of Tents & Jamarat',
    description: 'The historic valley where Prophet Ibrahim (AS) stoned the Shaytan and demonstrated steadfast obedience to Allah.',
    significance: 'Home to the magnificent Jamarat bridge structure and Masjid al-Khaif.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Passed through during the comprehensive Makkah history excursion.'
  },
  {
    id: 'ziyarat-muzdalifah',
    city: 'Makkah',
    name: 'Muzdalifah',
    subName: 'Al-Mash’ar Al-Haram',
    description: 'The serene sacred plain between Mina and Arafat where pebbles are collected and night is spent in silent remembrance.',
    significance: 'Designated holy sanctuary ground mentioned explicitly in Surah Al-Baqarah.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Viewed along the route with historical narration from the group Muallim.'
  },
  {
    id: 'ziyarat-masjid-quba',
    city: 'Madinah',
    name: 'Masjid e Quba',
    subName: 'First Mosque of Islam',
    description: 'The first mosque built in Islamic history by Prophet Muhammad ﷺ upon arriving in Madinah during the Hijrah.',
    significance: 'Prophet ﷺ said: “Whoever purifies himself at home and comes to Masjid Quba and offers two Rak’ahs will have a reward like an Umrah.”',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Group visits with ample time given to perform Wudu and offer Sunnah prayers.'
  },
  {
    id: 'ziyarat-mount-uhud',
    city: 'Madinah',
    name: 'Mount Uhud',
    subName: 'Shuhada Uhud & Archers Hill',
    description: 'The majestic mountain of which the Prophet ﷺ remarked: “Uhud is a mountain that loves us and we love it.” Resting place of Hazrat Hamza (RA) and 70 martyrs.',
    significance: 'Scene of the Battle of Uhud, Jabal al-Rumah (Archers’ Mount), and the martyrs’ cemetery.',
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Walk up the Archers’ Mount and offer Salam at the Shuhada graves.'
  },
  {
    id: 'ziyarat-qiblatain',
    city: 'Madinah',
    name: 'Masjid al-Qiblatain',
    subName: 'Mosque of the Two Qiblas',
    description: 'The historic mosque where the direction of prayer was commanded by Allah to change from Bayt al-Maqdis (Jerusalem) to the Holy Kaaba in Makkah.',
    significance: 'Historic event revealed in Surah Al-Baqarah Ayah 144.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    itineraryNote: 'Included in the Madinah city morning tour.'
  }
];

export const INITIAL_CONTACT_INFO: ContactInfo = {
  headOffice: {
    city: 'Hyderabad, Telangana',
    phones: ['+91 9700762916', '+91 8555943416'],
    address: '#18-13-6/74/3 to 8, Hashamabad, Chandrayangutta, Hyderabad, Telangana – 500053',
    timings: 'Monday – Saturday: 10:00 AM – 9:00 PM',
    whatsapp: '+919700762916',
    email: 'info@alhindwantours.com'
  },
  branchOffice: {
    city: 'Bidar, Karnataka',
    locationName: 'Manna Ekhelli Branch',
    phones: ['+91 9743481876', '+91 9739481876'],
    address: '1st Floor, Gram Panchayat Building, Manna Ekhelli, Chitguppa Taluk, Bidar District, Karnataka.'
  }
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'ALH-UMR-2026-8942',
    packageId: 'pkg-oct-2026',
    packageTitle: 'October 2026 Umrah Package',
    departureDate: '29 OCT 2026',
    passengerCount: 2,
    pricePerPerson: 93000,
    totalAmount: 186000,
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    bookingStatus: 'Confirmed',
    createdAt: '2026-10-12T14:30:00Z',
    contactPhone: '+91 9849012345',
    contactEmail: 'pilgrim.hyderabad@gmail.com',
    transactionRef: 'UPI/20261012/8942001',
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
    ]
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    name: 'Syed Abdul Qadir',
    phone: '+91 9988776655',
    email: 'abdulqadir@yahoo.com',
    preferredMonth: 'December 2026',
    numPassengers: 4,
    message: 'Looking for 4 tickets for December vacation with elderly parents. Please provide hotel proximity details.',
    createdAt: '2026-10-13T11:20:00Z',
    status: 'New'
  }
];
