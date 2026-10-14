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
    val dob: String = "",
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
    val passengerCount: Int = 1,
    val pricePerPerson: Long = 93000L,
    val totalAmount: Long = 93000L,
    val paymentMethod: String = "UPI",
    val paymentStatus: String = "Successful",
    val bookingStatus: String = "Confirmed",
    val passengers: List<Passenger> = emptyList(),
    val createdAt: String = "",
    val contactPhone: String = "",
    val contactEmail: String = "",
    val transactionRef: String = ""
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
