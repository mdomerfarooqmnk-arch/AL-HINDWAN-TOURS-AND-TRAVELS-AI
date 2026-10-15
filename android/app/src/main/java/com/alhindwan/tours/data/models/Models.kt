package com.alhindwan.tours.data.models

data class UmrahPackage(
    val id: String = "",
    val title: String = "",
    val category: String = "Standard", // Economy, Standard, Premium
    val departureDate: String = "",
    val returnDate: String = "",
    val durationDays: Int = 15,
    val pricePerPerson: Long = 93000L,
    val airline: String = "IndiGo (Direct)",
    val route: String = "Hyderabad – Jeddah – Hyderabad",
    val makkahHotel: String = "",
    val madinahHotel: String = "",
    val makkahNights: Int = 8,
    val madinahNights: Int = 7,
    val thumbnail: String = "",
    val featured: Boolean = false,
    val published: Boolean = true,
    val availableSeats: Int = 30,
    val inclusions: List<String> = emptyList(),
    val exclusions: List<String> = emptyList(),
    val notes: String = ""
)

data class Passenger(
    val fullName: String = "",
    val age: String = "",
    val passportNumber: String = "",
    val passportExpiry: String = "",
    val nationality: String = "Indian",
    val gender: String = "Male"
)

data class Booking(
    val id: String = "",
    val packageId: String = "",
    val packageTitle: String = "",
    val departureDate: String = "",
    val returnDate: String = "",
    val airline: String = "IndiGo (Direct)",
    val passengerCount: Int = 1,
    val pricePerPerson: Long = 93000L,
    val totalAmount: Long = 93000L,
    val primaryPassengerName: String = "",
    val contactPhone: String = "",
    val contactEmail: String = "",
    val specialRequests: String = "",
    val paymentMethod: String = "UPI / Cash on Verification",
    val paymentStatus: String = "Pending", // Pending, Partially Paid, Confirmed
    val bookingStatus: String = "Confirmed", // Pending, Confirmed, Cancelled
    val passengers: List<Passenger> = emptyList(),
    val createdAt: String = "",
    val transactionRef: String = ""
)

data class UserProfile(
    val fullName: String = "Mohammed Omer Farooq",
    val email: String = "mdomerfarooqmnk@gmail.com",
    val phone: String = "+91 9700762916",
    val emergencyPhone: String = "+91 8555943416",
    val city: String = "Hyderabad / Bidar",
    val passportNumber: String = "Z5849301",
    val passportExpiry: String = "15/08/2032",
    val nationality: String = "Indian"
)

data class SavedPilgrim(
    val id: String = "",
    val fullName: String = "",
    val relation: String = "Self", // Self, Spouse, Parent, Child, Other
    val gender: String = "Male",
    val passportNumber: String = "",
    val passportExpiry: String = "",
    val age: String = ""
)

data class Hotel(
    val id: String = "",
    val city: String = "Makkah", // Makkah or Madinah
    val name: String = "",
    val distanceFromHaram: String = "",
    val category: String = "Standard",
    val starRating: Int = 4,
    val walkingDistance: Boolean = true,
    val freeWifi: Boolean = true,
    val mealsIncluded: String = "Hyderabadi Khana",
    val hasLift: Boolean = true,
    val description: String = "",
    val image: String = ""
)

data class ZiyaratPlace(
    val id: String = "",
    val city: String = "Makkah",
    val name: String = "",
    val subName: String = "",
    val description: String = "",
    val significance: String = "",
    val image: String = "",
    val itineraryNote: String = ""
)
