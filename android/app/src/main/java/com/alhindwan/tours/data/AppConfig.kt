package com.alhindwan.tours.data

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast

/**
 * Centralized configuration for Al Hindwan Tours & Travels.
 * Configures contact numbers, WhatsApp business numbers, and office locations.
 */
object AppConfig {
    const val AGENCY_NAME = "AL HINDWAN TOURS & TRAVELS"
    const val TAGLINE = "Umrah Services · Hyderabad & Karnataka"
    const val SUB_TITLE = "Official Umrah Operator · Government Recognized"
    
    // WhatsApp contact without '+' or leading zeros for wa.me URL
    const val WHATSAPP_NUMBER = "919700762916"
    
    // Primary contact phone numbers
    const val PRIMARY_PHONE = "+91 9700762916"
    const val SECONDARY_PHONE = "+91 8555943416"
    const val BIDAR_BRANCH_PHONE = "+91 9743481876"
    const val EMAIL = "mdomerfarooqmnk@gmail.com"
    
    // Office addresses
    const val HEAD_OFFICE = "#18-13-6/74/3 to 8, Hashamabad, Chandrayangutta, Hyderabad, Telangana – 500053"
    const val BRANCH_OFFICE = "1st Floor, Gram Panchayat Building, Manna Ekhelli, Bidar District, Karnataka"

    /**
     * Helper to safely launch WhatsApp or fallback to browser wa.me
     */
    fun openWhatsApp(context: Context, message: String) {
        val encodedMessage = Uri.encode(message)
        val uri = Uri.parse("https://wa.me/$WHATSAPP_NUMBER?text=$encodedMessage")
        
        try {
            val intent = Intent(Intent.ACTION_VIEW, uri)
            // Try standard WhatsApp first
            intent.setPackage("com.whatsapp")
            context.startActivity(intent)
        } catch (_: Exception) {
            try {
                // Try WhatsApp Business
                val w4bIntent = Intent(Intent.ACTION_VIEW, uri)
                w4bIntent.setPackage("com.whatsapp.w4b")
                context.startActivity(w4bIntent)
            } catch (_: Exception) {
                // Fallback to web browser
                try {
                    val browserIntent = Intent(Intent.ACTION_VIEW, uri)
                    context.startActivity(browserIntent)
                } catch (_: Exception) {
                    Toast.makeText(context, "Could not open WhatsApp or browser", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    /**
     * Helper to initiate phone call dialer
     */
    fun dialPhone(context: Context, phoneNumber: String) {
        try {
            val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:$phoneNumber"))
            context.startActivity(intent)
        } catch (_: Exception) {
            Toast.makeText(context, "Could not open dialer", Toast.LENGTH_SHORT).show()
        }
    }
}
