package com.alhindwan.tours.data.repository

import android.content.Context
import android.content.SharedPreferences
import com.alhindwan.tours.data.models.SavedPilgrim
import com.alhindwan.tours.data.models.UserProfile
import org.json.JSONArray
import org.json.JSONObject

class UserRepository private constructor(context: Context) {

    private val prefs: SharedPreferences = context.applicationContext.getSharedPreferences(
        PREFS_NAME,
        Context.MODE_PRIVATE
    )

    init {
        // Seed default profile if absent
        if (!prefs.contains(KEY_PROFILE_NAME)) {
            saveProfile(
                UserProfile(
                    fullName = "Mohammed Omer Farooq",
                    email = "mdomerfarooqmnk@gmail.com",
                    phone = "+91 9700762916",
                    emergencyPhone = "+91 8555943416",
                    city = "Hyderabad / Bidar",
                    passportNumber = "Z5849301",
                    passportExpiry = "15/08/2032",
                    nationality = "Indian"
                )
            )
        }

        // Seed default saved pilgrims if absent
        if (!prefs.contains(KEY_SAVED_PILGRIMS)) {
            val initialPilgrims = listOf(
                SavedPilgrim(
                    id = "sp-1",
                    fullName = "Mohammed Omer Farooq",
                    relation = "Self",
                    gender = "Male",
                    passportNumber = "Z5849301",
                    passportExpiry = "15/08/2032",
                    age = "34"
                ),
                SavedPilgrim(
                    id = "sp-2",
                    fullName = "Fatima Begum",
                    relation = "Spouse",
                    gender = "Female",
                    passportNumber = "P3920194",
                    passportExpiry = "20/03/2031",
                    age = "31"
                )
            )
            saveAllPilgrims(initialPilgrims)
        }
    }

    @Synchronized
    fun getProfile(): UserProfile {
        return UserProfile(
            fullName = prefs.getString(KEY_PROFILE_NAME, "Mohammed Omer Farooq") ?: "Mohammed Omer Farooq",
            email = prefs.getString(KEY_PROFILE_EMAIL, "mdomerfarooqmnk@gmail.com") ?: "mdomerfarooqmnk@gmail.com",
            phone = prefs.getString(KEY_PROFILE_PHONE, "+91 9700762916") ?: "+91 9700762916",
            emergencyPhone = prefs.getString(KEY_PROFILE_EMERGENCY, "+91 8555943416") ?: "+91 8555943416",
            city = prefs.getString(KEY_PROFILE_CITY, "Hyderabad / Bidar") ?: "Hyderabad / Bidar",
            passportNumber = prefs.getString(KEY_PROFILE_PASSPORT, "Z5849301") ?: "Z5849301",
            passportExpiry = prefs.getString(KEY_PROFILE_EXPIRY, "15/08/2032") ?: "15/08/2032",
            nationality = prefs.getString(KEY_PROFILE_NAT, "Indian") ?: "Indian"
        )
    }

    @Synchronized
    fun saveProfile(profile: UserProfile) {
        prefs.edit()
            .putString(KEY_PROFILE_NAME, profile.fullName)
            .putString(KEY_PROFILE_EMAIL, profile.email)
            .putString(KEY_PROFILE_PHONE, profile.phone)
            .putString(KEY_PROFILE_EMERGENCY, profile.emergencyPhone)
            .putString(KEY_PROFILE_CITY, profile.city)
            .putString(KEY_PROFILE_PASSPORT, profile.passportNumber)
            .putString(KEY_PROFILE_EXPIRY, profile.passportExpiry)
            .putString(KEY_PROFILE_NAT, profile.nationality)
            .apply()
    }

    @Synchronized
    fun getSavedPilgrims(): List<SavedPilgrim> {
        val json = prefs.getString(KEY_SAVED_PILGRIMS, null) ?: return emptyList()
        val list = mutableListOf<SavedPilgrim>()
        try {
            val arr = JSONArray(json)
            for (i in 0 until arr.length()) {
                val obj = arr.getJSONObject(i)
                list.add(
                    SavedPilgrim(
                        id = obj.optString("id", "sp-$i"),
                        fullName = obj.optString("fullName", ""),
                        relation = obj.optString("relation", "Family"),
                        gender = obj.optString("gender", "Male"),
                        passportNumber = obj.optString("passportNumber", ""),
                        passportExpiry = obj.optString("passportExpiry", ""),
                        age = obj.optString("age", "")
                    )
                )
            }
        } catch (_: Exception) {
            // fallback
        }
        return list
    }

    @Synchronized
    fun addOrUpdatePilgrim(pilgrim: SavedPilgrim) {
        val current = getSavedPilgrims().toMutableList()
        val idx = current.indexOfFirst { it.id == pilgrim.id }
        if (idx >= 0) {
            current[idx] = pilgrim
        } else {
            current.add(pilgrim)
        }
        saveAllPilgrims(current)
    }

    @Synchronized
    fun removePilgrim(id: String) {
        val current = getSavedPilgrims().filterNot { it.id == id }
        saveAllPilgrims(current)
    }

    @Synchronized
    private fun saveAllPilgrims(pilgrims: List<SavedPilgrim>) {
        val arr = JSONArray()
        for (p in pilgrims) {
            val obj = JSONObject()
            obj.put("id", p.id)
            obj.put("fullName", p.fullName)
            obj.put("relation", p.relation)
            obj.put("gender", p.gender)
            obj.put("passportNumber", p.passportNumber)
            obj.put("passportExpiry", p.passportExpiry)
            obj.put("age", p.age)
            arr.put(obj)
        }
        prefs.edit().putString(KEY_SAVED_PILGRIMS, arr.toString()).apply()
    }

    companion object {
        private const val PREFS_NAME = "alhindwan_user_prefs"
        private const val KEY_PROFILE_NAME = "key_profile_name"
        private const val KEY_PROFILE_EMAIL = "key_profile_email"
        private const val KEY_PROFILE_PHONE = "key_profile_phone"
        private const val KEY_PROFILE_EMERGENCY = "key_profile_emergency"
        private const val KEY_PROFILE_CITY = "key_profile_city"
        private const val KEY_PROFILE_PASSPORT = "key_profile_passport"
        private const val KEY_PROFILE_EXPIRY = "key_profile_expiry"
        private const val KEY_PROFILE_NAT = "key_profile_nat"
        private const val KEY_SAVED_PILGRIMS = "key_saved_pilgrims"

        @Volatile
        private var INSTANCE: UserRepository? = null

        fun getInstance(context: Context): UserRepository {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: UserRepository(context).also { INSTANCE = it }
            }
        }
    }
}
