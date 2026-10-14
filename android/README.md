# AL HINDWAN TOURS & TRAVELS — UMRAH SERVICES
## Native Android Application (Kotlin + Jetpack Compose)

This repository contains the complete native Android application for **AL HINDWAN TOURS & TRAVELS — UMRAH SERVICES**, developed exclusively for Umrah pilgrimage services (zero Hajj content).

---

### Application Specifications
- **App Name**: AL HINDWAN TOURS & TRAVELS
- **Application ID**: `com.alhindwan.tours`
- **Language**: Kotlin 2.0+
- **UI Framework**: Jetpack Compose with Material 3
- **Min SDK**: API 24 (Android 7.0 Nougat)
- **Target SDK**: API 35 (Android 15)
- **Architecture**: Clean MVVM + Repository Pattern with StateFlow
- **Theme Palette**:
  - Primary Green: `#064632`
  - Deep Green: `#032D23`
  - Premium Gold: `#D8B45A`
  - Cream Canvas: `#FFF9EB`
  - Card White: `#FFFFFF`
  - Body Text: `#17211D`

---

### 12 Connected Screen Architecture
1. **Screen 1 — Splash Screen**: Brand emblem, tagline “Your Spiritual Journey, Our Trusted Service”, auto-initialization.
2. **Screen 2 — Home Screen**: Kaaba hero banner, “Umrah — A Journey of Faith”, Book Now CTA, 8 service shortcuts, featured packages.
3. **Screen 3 — Umrah Packages**: Live package catalog, category filters (Economy, Standard, Premium), departure cards.
4. **Screen 4 — Package Search & Filter**: Month selector, price range slider (₹50,000–₹1,50,000), airline filter, hotel standard.
5. **Screen 5 — Package Details**: Hotel specifications, flight route, inclusions checklist, Enquire Now & Book Now actions.
6. **Screen 6 — Booking Form (Step 1)**: Package summary, passenger counter `[-] N [+]`, dynamic total fare calculation.
7. **Screen 7 — Passenger Details (Step 2)**: Passport validation, DOB, passport expiry, nationality, gender, and multi-passenger addition.
8. **Screen 8 — Payment Screen (Step 3)**: UPI, Credit/Debit card, Net Banking, and Bank Transfer with server-side status verification.
9. **Screen 9 — Umrah Visa & Documents**: Required documents, passport guidelines, photo specs, live passport status tracker, downloadable forms.
10. **Screen 10 — Hotel Details**: Makkah and Madinah hotel tabs with verified amenities (Walking Distance, Free WiFi, Hyderabadi Khana, Lift).
11. **Screen 11 — Ziyarat Places**: 2-column image grid of holy sites (Jabal e Noor, Jabal e Thawr, Arafat, Mina, Muzdalifah, Masjid e Quba, Mount Uhud, Qiblatain).
12. **Screen 12 — Contact & WhatsApp Booking**: Head Office (Hyderabad) + Branch Office (Manna Ekhelli, Karnataka), instant WhatsApp booking launcher and telephone dialers.

---

### How to Open & Build in Android Studio

1. **System Requirements**:
   - Android Studio Ladybug (2024.2.1) or Hedgehog / Jellyfish
   - JDK 17 (Eclipse Temurin 17 or Android Studio Embedded JDK)
   - Android SDK 35

2. **Open Project**:
   - In Android Studio, select `File -> Open` and browse to the `/android` directory.
   - Wait for Gradle sync to complete.

3. **Build Debug APK**:
   ```bash
   ./gradlew assembleDebug
   ```
   The output APK will be generated at:
   `app/build/outputs/apk/debug/app-debug.apk`

4. **Run on Emulator / Device**:
   ```bash
   ./gradlew installDebug
   ```

---

### Firebase Integration Instructions

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project named `alhindwan-umrah`.
2. Register an Android App with package name `com.alhindwan.tours`.
3. Download `google-services.json` and place it in the `android/app/` folder.
4. Enable **Firebase Authentication** (Email/Password and Phone Auth).
5. Enable **Cloud Firestore** in production mode and deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```
6. Enable **Cloud Storage** for hotel and package imagery.

---

### Release Signing Instructions

1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore alhindwan-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias alhindwan
   ```
2. Configure credentials in your environment (or `local.properties` - never commit secrets into git):
   ```properties
   RELEASE_STORE_FILE=alhindwan-release.jks
   RELEASE_STORE_PASSWORD=***
   RELEASE_KEY_ALIAS=alhindwan
   RELEASE_KEY_PASSWORD=***
   ```
3. Run release build:
   ```bash
   ./gradlew bundleRelease
   ```
