package com.alhindwan.tours.data

import com.alhindwan.tours.data.models.*

object MockDataProvider {
    val packages = listOf(
        UmrahPackage(
            id = "pkg-oct-2026",
            title = "October 2026 Umrah Package",
            category = "Standard",
            departureDate = "29 OCT 2026",
            returnDate = "12 NOV 2026",
            durationDays = 15,
            pricePerPerson = 93000L,
            airline = "IndiGo (Direct)",
            route = "Hyderabad – Jeddah – Hyderabad",
            makkahHotel = "Mather Al Jewar Hotel (Near Haram)",
            madinahHotel = "Emaar Al Noor (Central Area)",
            makkahNights = 8,
            madinahNights = 7,
            thumbnail = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
            featured = true,
            published = true,
            availableSeats = 28,
            inclusions = listOf(
                "Umrah Visa with Insurance",
                "Return Air Ticket (Direct Flight)",
                "Hotel Accommodation (Makkah & Madinah)",
                "3 Time Hyderabadi Khana (Buffet)",
                "Makkah & Madinah Ziyarat with Guide",
                "5 Liter Zam Zam Water",
                "Group Guide Service & Religious Guidance"
            ),
            exclusions = listOf("Personal laundry & room service", "Excess baggage"),
            notes = "Direct flights from Hyderabad (HYD) to Jeddah (JED). Full support by experienced Hyderabadi guides."
        ),
        UmrahPackage(
            id = "pkg-dec-2026",
            title = "December 2026 Umrah Package",
            category = "Standard",
            departureDate = "08 DEC 2026",
            returnDate = "22 DEC 2026",
            durationDays = 15,
            pricePerPerson = 93000L,
            airline = "IndiGo (Direct)",
            route = "Hyderabad – Jeddah – Hyderabad",
            makkahHotel = "Mather Al Jewar Hotel (Near Haram)",
            madinahHotel = "Emaar Al Noor (Central Area)",
            makkahNights = 8,
            madinahNights = 7,
            thumbnail = "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
            featured = true,
            published = true,
            availableSeats = 34,
            inclusions = listOf(
                "Umrah Visa with Insurance",
                "Return Air Ticket (IndiGo Direct)",
                "Hotel Stay in Makkah & Madinah",
                "3 Time Hyderabadi Khana",
                "Makkah & Madinah Ziyarat",
                "5L Zamzam Water Pack"
            )
        ),
        UmrahPackage(
            id = "pkg-jan-2027",
            title = "January 2027 Umrah Package",
            category = "Economy",
            departureDate = "14 JAN 2027",
            returnDate = "28 JAN 2027",
            durationDays = 15,
            pricePerPerson = 96000L,
            airline = "Air India / IndiGo",
            route = "Hyderabad – Jeddah – Hyderabad",
            makkahHotel = "Al Kiswah Towers (Free Shuttle)",
            madinahHotel = "Rua Al Hijrah",
            makkahNights = 8,
            madinahNights = 7,
            thumbnail = "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80",
            featured = false,
            published = true,
            availableSeats = 40,
            inclusions = listOf(
                "Umrah Visa",
                "Return Flight",
                "Hotel Stay with 24/7 Shuttle",
                "Hyderabadi Meals",
                "Complete Ziyarat"
            )
        )
    )

    val hotels = listOf(
        Hotel(
            id = "h1",
            city = "Makkah",
            name = "Mather Al Jewar Hotel",
            distanceFromHaram = "Near Haram (~450m)",
            category = "Standard",
            starRating = 4,
            walkingDistance = true,
            freeWifi = true,
            mealsIncluded = "Hyderabadi Khana",
            hasLift = true,
            description = "Popular hotel among Hyderabadi pilgrims with spacious rooms and Hyderabadi buffet.",
            image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
        ),
        Hotel(
            id = "h2",
            city = "Makkah",
            name = "Swissotel Makkah",
            distanceFromHaram = "Direct Clock Tower Access",
            category = "Premium",
            starRating = 5,
            walkingDistance = true,
            freeWifi = true,
            mealsIncluded = "International Buffet",
            hasLift = true,
            description = "Direct access to the King Abdulaziz Gate with luxury Haram view rooms.",
            image = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
        ),
        Hotel(
            id = "h3",
            city = "Madinah",
            name = "Emaar Al Noor Hotel",
            distanceFromHaram = "Central North (~350m)",
            category = "Standard",
            starRating = 4,
            walkingDistance = true,
            freeWifi = true,
            mealsIncluded = "Hyderabadi Khana",
            hasLift = true,
            description = "Peaceful location with quick walking access to the Prophet's Mosque courtyard.",
            image = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
        ),
        Hotel(
            id = "h4",
            city = "Madinah",
            name = "Anwar Al Madinah Mövenpick",
            distanceFromHaram = "Zero Meters (Gate 16)",
            category = "Premium",
            starRating = 5,
            walkingDistance = true,
            freeWifi = true,
            mealsIncluded = "Gourmet Buffet",
            hasLift = true,
            description = "Direct access into the courtyard of the Prophet's Mosque with upscale amenities.",
            image = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
        )
    )

    val ziyaratPlaces = listOf(
        ZiyaratPlace(
            id = "z1",
            city = "Makkah",
            name = "Jabal e Noor",
            subName = "Cave of Hira",
            description = "The Mountain of Light where the Prophet Muhammad (pbuh) received the first Quranic revelation.",
            significance = "Site of first revelation of Surah Al-Alaq.",
            image = "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80"
        ),
        ZiyaratPlace(
            id = "z2",
            city = "Makkah",
            name = "Jabal e Thawr",
            subName = "Cave of Thawr",
            description = "Sacred mountain where the Prophet (pbuh) and Abu Bakr (RA) took refuge during the Hijrah.",
            significance = "Protected sanctuary of the Hijrah migration.",
            image = "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
        ),
        ZiyaratPlace(
            id = "z3",
            city = "Makkah",
            name = "Arafat",
            subName = "Jabal al-Rahmah",
            description = "The Mount of Mercy where the historic Farewell Sermon was delivered.",
            significance = "Plain of supreme forgiveness and remembrance.",
            image = "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80"
        ),
        ZiyaratPlace(
            id = "z4",
            city = "Madinah",
            name = "Masjid e Quba",
            subName = "First Mosque of Islam",
            description = "The first mosque built in Islamic history by the Prophet Muhammad (pbuh).",
            significance = "Praying 2 Rak'ahs here carries the spiritual reward of an Umrah.",
            image = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
        ),
        ZiyaratPlace(
            id = "z5",
            city = "Madinah",
            name = "Mount Uhud",
            subName = "Shuhada Uhud",
            description = "Beloved mountain and resting place of Sayyidna Hamza (RA) and the Uhud martyrs.",
            significance = "Scene of the Battle of Uhud and Archers' Mount.",
            image = "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80"
        )
    )
}
