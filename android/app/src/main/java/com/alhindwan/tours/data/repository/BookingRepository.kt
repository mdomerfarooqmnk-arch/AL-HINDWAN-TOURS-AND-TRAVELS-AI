package com.alhindwan.tours.data.repository

import android.content.Context
import android.content.SharedPreferences
import com.alhindwan.tours.data.models.Booking
import com.alhindwan.tours.data.models.Passenger
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class BookingRepository private constructor(context: Context) {

    private val prefs: SharedPreferences = context.applicationContext.getSharedPreferences(
        PREFS_NAME,
        Context.MODE_PRIVATE
    )

    init {
        // Seed initial sample booking if repository is fresh
        if (!prefs.contains(KEY_BOOKINGS)) {
            val initialBookings = listOf(
                Booking(
                    id = "AH-2026-9301",
                    packageId = "pkg-oct-2026",
                    packageTitle = "October 2026 Umrah Package",
                    departureDate = "29 OCT 2026",
                    returnDate = "12 NOV 2026",
                    airline = "IndiGo (Direct)",
                    passengerCount = 2,
                    pricePerPerson = 93000L,
                    totalAmount = 186000L,
                    primaryPassengerName = "Mohammed Omer Farooq",
                    contactPhone = "+91 9700762916",
                    contactEmail = "mdomerfarooqmnk@gmail.com",
                    specialRequests = "Ground floor or elevator near room in Makkah",
                    paymentMethod = "UPI Advance",
                    paymentStatus = "Confirmed",
                    bookingStatus = "Confirmed",
                    createdAt = "10 Oct 2026, 02:45 PM",
                    passengers = listOf(
                        Passenger(
                            fullName = "Mohammed Omer Farooq",
                            age = "34",
                            passportNumber = "Z5849301",
                            passportExpiry = "15/08/2032",
                            nationality = "Indian",
                            gender = "Male"
                        ),
                        Passenger(
                            fullName = "Fatima Begum",
                            age = "31",
                            passportNumber = "P3920194",
                            passportExpiry = "20/03/2031",
                            nationality = "Indian",
                            gender = "Female"
                        )
                    )
                )
            )
            saveAllBookings(initialBookings)
        }
    }

    @Synchronized
    fun getAllBookings(): List<Booking> {
        val jsonString = prefs.getString(KEY_BOOKINGS, null) ?: return emptyList()
        val list = mutableListOf<Booking>()
        try {
            val jsonArray = JSONArray(jsonString)
            for (i in 0 until jsonArray.length()) {
                val obj = jsonArray.getJSONObject(i)
                list.add(parseBooking(obj))
            }
        } catch (_: Exception) {
            // fallback
        }
        return list
    }

    @Synchronized
    fun getBookingById(id: String): Booking? {
        return getAllBookings().find { it.id == id }
    }

    @Synchronized
    fun saveBooking(booking: Booking) {
        val current = getAllBookings().toMutableList()
        // If already exists, replace it, else prepend
        val existingIndex = current.indexOfFirst { it.id == booking.id }
        if (existingIndex >= 0) {
            current[existingIndex] = booking
        } else {
            current.add(0, booking)
        }
        saveAllBookings(current)
    }

    @Synchronized
    fun updateBookingStatus(id: String, newStatus: String) {
        val current = getAllBookings().map {
            if (it.id == id) it.copy(bookingStatus = newStatus) else it
        }
        saveAllBookings(current)
    }

    @Synchronized
    fun cancelBooking(id: String) {
        updateBookingStatus(id, "Cancelled")
    }

    @Synchronized
    private fun saveAllBookings(bookings: List<Booking>) {
        val jsonArray = JSONArray()
        for (b in bookings) {
            jsonArray.put(serializeBooking(b))
        }
        prefs.edit().putString(KEY_BOOKINGS, jsonArray.toString()).apply()
    }

    private fun serializeBooking(b: Booking): JSONObject {
        val obj = JSONObject()
        obj.put("id", b.id)
        obj.put("packageId", b.packageId)
        obj.put("packageTitle", b.packageTitle)
        obj.put("departureDate", b.departureDate)
        obj.put("returnDate", b.returnDate)
        obj.put("airline", b.airline)
        obj.put("passengerCount", b.passengerCount)
        obj.put("pricePerPerson", b.pricePerPerson)
        obj.put("totalAmount", b.totalAmount)
        obj.put("primaryPassengerName", b.primaryPassengerName)
        obj.put("contactPhone", b.contactPhone)
        obj.put("contactEmail", b.contactEmail)
        obj.put("specialRequests", b.specialRequests)
        obj.put("paymentMethod", b.paymentMethod)
        obj.put("paymentStatus", b.paymentStatus)
        obj.put("bookingStatus", b.bookingStatus)
        obj.put("createdAt", b.createdAt)
        obj.put("transactionRef", b.transactionRef)

        val passArray = JSONArray()
        for (p in b.passengers) {
            val pObj = JSONObject()
            pObj.put("fullName", p.fullName)
            pObj.put("age", p.age)
            pObj.put("passportNumber", p.passportNumber)
            pObj.put("passportExpiry", p.passportExpiry)
            pObj.put("nationality", p.nationality)
            pObj.put("gender", p.gender)
            passArray.put(pObj)
        }
        obj.put("passengers", passArray)
        return obj
    }

    private fun parseBooking(obj: JSONObject): Booking {
        val passList = mutableListOf<Passenger>()
        val passArray = obj.optJSONArray("passengers")
        if (passArray != null) {
            for (j in 0 until passArray.length()) {
                val pObj = passArray.getJSONObject(j)
                passList.add(
                    Passenger(
                        fullName = pObj.optString("fullName", ""),
                        age = pObj.optString("age", ""),
                        passportNumber = pObj.optString("passportNumber", ""),
                        passportExpiry = pObj.optString("passportExpiry", ""),
                        nationality = pObj.optString("nationality", "Indian"),
                        gender = pObj.optString("gender", "Male")
                    )
                )
            }
        }

        return Booking(
            id = obj.optString("id", "AH-UMRAH-${System.currentTimeMillis() % 100000}"),
            packageId = obj.optString("packageId", ""),
            packageTitle = obj.optString("packageTitle", ""),
            departureDate = obj.optString("departureDate", ""),
            returnDate = obj.optString("returnDate", ""),
            airline = obj.optString("airline", "IndiGo"),
            passengerCount = obj.optInt("passengerCount", 1),
            pricePerPerson = obj.optLong("pricePerPerson", 93000L),
            totalAmount = obj.optLong("totalAmount", 93000L),
            primaryPassengerName = obj.optString("primaryPassengerName", ""),
            contactPhone = obj.optString("contactPhone", ""),
            contactEmail = obj.optString("contactEmail", ""),
            specialRequests = obj.optString("specialRequests", ""),
            paymentMethod = obj.optString("paymentMethod", "UPI"),
            paymentStatus = obj.optString("paymentStatus", "Pending"),
            bookingStatus = obj.optString("bookingStatus", "Confirmed"),
            createdAt = obj.optString("createdAt", SimpleDateFormat("dd MMM yyyy", Locale.getDefault()).format(Date())),
            transactionRef = obj.optString("transactionRef", ""),
            passengers = passList
        )
    }

    companion object {
        private const val PREFS_NAME = "alhindwan_bookings_prefs"
        private const val KEY_BOOKINGS = "key_bookings_list"

        @Volatile
        private var INSTANCE: BookingRepository? = null

        fun getInstance(context: Context): BookingRepository {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: BookingRepository(context).also { INSTANCE = it }
            }
        }
    }
}
