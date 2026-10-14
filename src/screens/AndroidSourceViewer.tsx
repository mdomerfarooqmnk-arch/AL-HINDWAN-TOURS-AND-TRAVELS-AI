import React, { useState } from 'react';
import { FileCode, Copy, Check, ArrowLeft, Download, Terminal, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AndroidSourceViewer: React.FC = () => {
  const { setViewMode } = useApp();
  const [activeFile, setActiveFile] = useState<string>('MainActivity.kt');
  const [copied, setCopied] = useState(false);

  const files: Record<string, { path: string; lang: string; content: string }> = {
    'MainActivity.kt': {
      path: 'android/app/src/main/java/com/alhindwan/tours/MainActivity.kt',
      lang: 'kotlin',
      content: `package com.alhindwan.tours

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.*
import com.alhindwan.tours.theme.AlHindwanTheme
import com.alhindwan.tours.theme.DeepGreen
import com.alhindwan.tours.theme.PremiumGold
import com.alhindwan.tours.theme.PrimaryGreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AlHindwanTheme {
                AlHindwanApp()
            }
        }
    }
}

sealed class Screen(val route: String, val title: String) {
    object Splash : Screen("splash", "Splash")
    object Home : Screen("home", "Home")
    object Packages : Screen("packages", "Umrah Packages")
    object Search : Screen("search", "Search Packages")
    object PackageDetails : Screen("package_details/{packageId}", "Package Details")
    object BookingForm : Screen("booking_form/{packageId}", "Booking Form")
    object PassengerDetails : Screen("passenger_details", "Passenger Details")
    object Payment : Screen("payment", "Payment")
    object VisaDocs : Screen("visa_docs", "Visa & Documents")
    object Hotels : Screen("hotels", "Hotel Details")
    object Ziyarat : Screen("ziyarat", "Ziyarat Places")
    object Contact : Screen("contact", "Contact Us")
    object MyBookings : Screen("my_bookings", "My Bookings")
    object Profile : Screen("profile", "Profile")
}

@Composable
fun AlHindwanApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val showBottomBar = currentRoute in listOf(
        Screen.Home.route,
        Screen.Packages.route,
        Screen.MyBookings.route,
        Screen.Profile.route
    )

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    containerColor = PrimaryGreen,
                    contentColor = PremiumGold
                ) {
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                        label = { Text("Home") },
                        selected = currentRoute == Screen.Home.route,
                        onClick = { navController.navigate(Screen.Home.route) }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Explore, contentDescription = "Packages") },
                        label = { Text("Packages") },
                        selected = currentRoute == Screen.Packages.route,
                        onClick = { navController.navigate(Screen.Packages.route) }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.CalendarToday, contentDescription = "Booking") },
                        label = { Text("Booking") },
                        selected = currentRoute == Screen.MyBookings.route,
                        onClick = { navController.navigate(Screen.MyBookings.route) }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Person, contentDescription = "Profile") },
                        label = { Text("Profile") },
                        selected = currentRoute == Screen.Profile.route,
                        onClick = { navController.navigate(Screen.Profile.route) }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Splash.route,
            modifier = Modifier.fillMaxSize().padding(innerPadding)
        ) {
            composable(Screen.Splash.route) { /* Splash Screen */ }
            composable(Screen.Home.route) { /* Home Screen */ }
            composable(Screen.Packages.route) { /* Umrah Packages */ }
            composable(Screen.Search.route) { /* Search & Filter */ }
            composable(Screen.PackageDetails.route) { /* Details */ }
            composable(Screen.BookingForm.route) { /* Booking */ }
            composable(Screen.PassengerDetails.route) { /* Passengers */ }
            composable(Screen.Payment.route) { /* Payment */ }
            composable(Screen.VisaDocs.route) { /* Visa Docs */ }
            composable(Screen.Hotels.route) { /* Hotels */ }
            composable(Screen.Ziyarat.route) { /* Ziyarat */ }
            composable(Screen.Contact.route) { /* Contact & WhatsApp */ }
            composable(Screen.MyBookings.route) { /* Bookings */ }
            composable(Screen.Profile.route) { /* Profile */ }
        }
    }
}`
    },
    'build.gradle.kts': {
      path: 'android/app/build.gradle.kts',
      lang: 'kotlin',
      content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.google.gms.google.services)
}

android {
    namespace = "com.alhindwan.tours"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.alhindwan.tours"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.navigation.compose)
    implementation("io.coil-kt:coil-compose:2.7.0")
    implementation(platform("com.google.firebase:firebase-bom:33.7.0"))
    implementation("com.google.firebase:firebase-auth-ktx")
    implementation("com.google.firebase:firebase-firestore-ktx")
    implementation("com.google.firebase:firebase-storage-ktx")
}`
    },
    'Models.kt': {
      path: 'android/app/src/main/java/com/alhindwan/tours/data/models/Models.kt',
      lang: 'kotlin',
      content: `package com.alhindwan.tours.data.models

data class UmrahPackage(
    val id: String = "",
    val title: String = "",
    val category: String = "Standard",
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
)`
    },
    'Theme.kt': {
      path: 'android/app/src/main/java/com/alhindwan/tours/theme/Theme.kt',
      lang: 'kotlin',
      content: `package com.alhindwan.tours.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val PrimaryGreen = Color(0xFF064632)
val DeepGreen = Color(0xFF032D23)
val PremiumGold = Color(0xFFD8B45A)
val CreamBackground = Color(0xFFFFF9EB)
val WhiteCard = Color(0xFFFFFFFF)
val MainText = Color(0xFF17211D)

private val LightColorScheme = lightColorScheme(
    primary = PrimaryGreen,
    onPrimary = WhiteCard,
    primaryContainer = DeepGreen,
    onPrimaryContainer = PremiumGold,
    secondary = PremiumGold,
    background = CreamBackground,
    surface = WhiteCard,
    onSurface = MainText
)

@Composable
fun AlHindwanTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}`
    },
    'firestore.rules': {
      path: 'android/firestore.rules',
      lang: 'javascript',
      content: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }
    function isAdmin() {
      return isAuthenticated() && (
        request.auth.token.admin == true ||
        exists(/databases/$(database)/documents/admins/$(request.auth.uid))
      );
    }

    match /packages/{packageId} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }
    match /hotels/{hotelId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /ziyarat_places/{placeId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /bookings/{bookingId} {
      allow create: if isAuthenticated();
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow update, delete: if isAdmin();
    }
  }
}`
    },
    'AndroidManifest.xml': {
      path: 'android/app/src/main/AndroidManifest.xml',
      lang: 'xml',
      content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CALL_PHONE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Al Hindwan Tours"
        android:theme="@style/Theme.AlHindwanTours">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.AlHindwanTours">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeFile].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('emulator')}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-[#D8B45A]" />
                <span>Native Android Studio Kotlin Project</span>
              </h1>
              <p className="text-xs text-stone-400">
                Package: <code className="text-[#D8B45A]">com.alhindwan.tours</code> · Jetpack Compose · Material 3 · Firebase
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-stone-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#D8B45A]" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy File Content'}</span>
            </button>

            <button
              onClick={() => setViewMode('emulator')}
              className="px-4 py-2 rounded-xl bg-[#064632] hover:bg-emerald-900 text-white text-xs font-bold transition-colors"
            >
              Test Live in App Emulator
            </button>
          </div>
        </div>

        {/* File Tabs & Code Box */}
        <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl">
          {/* File Tabs */}
          <div className="flex items-center space-x-1 bg-stone-900/90 px-4 py-2 border-b border-stone-800 overflow-x-auto">
            {Object.keys(files).map((fileName) => (
              <button
                key={fileName}
                onClick={() => setActiveFile(fileName)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  activeFile === fileName
                    ? 'bg-stone-800 text-[#D8B45A] font-bold border border-stone-700'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {fileName}
              </button>
            ))}
          </div>

          {/* Path banner */}
          <div className="px-4 py-2 bg-stone-900/40 border-b border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-center justify-between">
            <span>Path: {files[activeFile].path}</span>
            <span className="text-[10px] text-stone-500 uppercase">{files[activeFile].lang}</span>
          </div>

          {/* Code area */}
          <pre className="p-6 text-xs font-mono text-stone-200 overflow-x-auto leading-relaxed max-h-[600px] select-all">
            <code>{files[activeFile].content}</code>
          </pre>
        </div>

        {/* Build Commands Box */}
        <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
          <h3 className="text-xs font-bold text-[#D8B45A] uppercase tracking-wider flex items-center space-x-2">
            <Terminal className="w-4 h-4" />
            <span>Terminal Gradle Build Commands</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <span className="text-stone-400 block text-[10px] mb-1">Assemble Debug APK:</span>
              <code className="text-emerald-400 font-bold">./gradlew assembleDebug</code>
              <p className="text-[10px] text-stone-500 mt-1">Output: app/build/outputs/apk/debug/app-debug.apk</p>
            </div>

            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <span className="text-stone-400 block text-[10px] mb-1">Assemble Release Bundle:</span>
              <code className="text-emerald-400 font-bold">./gradlew bundleRelease</code>
              <p className="text-[10px] text-stone-500 mt-1">Output: app/build/outputs/bundle/release/app-release.aab</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
