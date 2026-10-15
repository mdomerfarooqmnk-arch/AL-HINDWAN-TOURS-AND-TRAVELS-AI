package com.alhindwan.tours.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.alhindwan.tours.data.AppConfig
import com.alhindwan.tours.data.MockDataProvider
import com.alhindwan.tours.data.models.*
import com.alhindwan.tours.data.repository.BookingRepository
import com.alhindwan.tours.data.repository.UserRepository
import com.alhindwan.tours.theme.*
import kotlinx.coroutines.delay
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

// -------------------------------------------------------------
// 1. SPLASH SCREEN
// -------------------------------------------------------------
@Composable
fun SplashScreen(onNavigateToHome: () -> Unit) {
    var progress by remember { mutableFloatStateOf(0.15f) }

    LaunchedEffect(Unit) {
        while (progress < 1f) {
            delay(70)
            progress += 0.15f
        }
        delay(120)
        onNavigateToHome()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(DeepGreen, PrimaryGreen, Color(0xFF021C16))
                )
            )
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(92.dp)
                    .clip(CircleShape)
                    .background(DeepGreen)
                    .border(2.5.dp, PremiumGold, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Place,
                    contentDescription = "Emblem",
                    tint = PremiumGold,
                    modifier = Modifier.size(50.dp)
                )
            }

            Spacer(modifier = Modifier.height(18.dp))

            Text(
                text = "AL HINDWAN",
                color = PremiumGold,
                fontSize = 25.sp,
                fontWeight = FontWeight.Black,
                letterSpacing = 3.sp
            )
            Text(
                text = "TOURS & TRAVELS",
                color = Color.White,
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp
            )
            Text(
                text = "— UMRAH SERVICES —",
                color = PremiumGold,
                fontSize = 11.sp,
                fontWeight = FontWeight.Medium,
                letterSpacing = 2.sp,
                modifier = Modifier.padding(top = 4.dp)
            )

            Spacer(modifier = Modifier.height(28.dp))

            Text(
                text = "“Your Spiritual Journey, Our Trusted Service”",
                color = Color(0xFFD1E7DD),
                fontSize = 12.sp,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(36.dp))

            LinearProgressIndicator(
                progress = { progress.coerceIn(0f, 1f) },
                modifier = Modifier
                    .fillMaxWidth(0.6f)
                    .height(4.dp)
                    .clip(RoundedCornerShape(2.dp)),
                color = PremiumGold,
                trackColor = DeepGreen
            )

            Spacer(modifier = Modifier.height(24.dp))

            Button(
                onClick = onNavigateToHome,
                colors = ButtonDefaults.buttonColors(containerColor = PremiumGold),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "Enter App →",
                    color = DeepGreen,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

// -------------------------------------------------------------
// 2. HOME SCREEN
// -------------------------------------------------------------
@Composable
fun HomeScreen(
    onNavigateToPackages: () -> Unit,
    onNavigateToHotels: () -> Unit,
    onNavigateToVisa: () -> Unit,
    onNavigateToZiyarat: () -> Unit,
    onNavigateToBooking: (String) -> Unit,
    onNavigateToMyBookings: () -> Unit,
    onNavigateToProfile: () -> Unit,
    onNavigateToContact: () -> Unit,
    onNavigateToDetails: (String) -> Unit
) {
    val context = LocalContext.current
    val packages = remember { MockDataProvider.packages }
    val featured = packages.firstOrNull() ?: UmrahPackage()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
    ) {
        // App Bar Header
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(PrimaryGreen)
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(
                        text = AppConfig.AGENCY_NAME,
                        color = PremiumGold,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Black
                    )
                    Text(
                        text = AppConfig.TAGLINE,
                        color = Color.White.copy(alpha = 0.85f),
                        fontSize = 10.sp
                    )
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(onClick = { AppConfig.dialPhone(context, AppConfig.PRIMARY_PHONE) }) {
                        Icon(
                            imageVector = Icons.Default.Phone,
                            contentDescription = "Contact",
                            tint = PremiumGold
                        )
                    }
                    IconButton(onClick = onNavigateToProfile) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = "Profile",
                            tint = PremiumGold
                        )
                    }
                }
            }
        }

        // Hero Kaaba Banner with prominent Book Now
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = DeepGreen),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Box(modifier = Modifier.height(190.dp).background(DeepGreen)) {
                    AsyncImage(
                        model = featured.thumbnail,
                        contentDescription = "Kaaba Banner",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                Brush.verticalGradient(
                                    listOf(Color.Transparent, Color.Black.copy(alpha = 0.88f))
                                )
                            )
                    )
                    Column(
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(16.dp)
                    ) {
                        Surface(
                            color = PremiumGold,
                            shape = RoundedCornerShape(6.dp)
                        ) {
                            Text(
                                text = "OFFICIAL UMRAH PACKAGES",
                                color = DeepGreen,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Umrah — A Journey of Faith",
                            color = Color.White,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Direct IndiGo Flights from Hyderabad · 3-Time Hyderabadi Khana",
                            color = Color(0xFFD1E7DD),
                            fontSize = 10.sp
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Button(
                                onClick = { onNavigateToBooking(featured.id) },
                                colors = ButtonDefaults.buttonColors(containerColor = PremiumGold),
                                shape = RoundedCornerShape(8.dp),
                                contentPadding = PaddingValues(horizontal = 14.dp, vertical = 6.dp)
                            ) {
                                Text(
                                    text = "Book Now →",
                                    color = DeepGreen,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            OutlinedButton(
                                onClick = { onNavigateToDetails(featured.id) },
                                colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White),
                                border = BorderStroke(1.dp, PremiumGold),
                                shape = RoundedCornerShape(8.dp),
                                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
                            ) {
                                Text("Details", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }
        }

        // Services & Guidance Shortcuts Grid
        item {
            Text(
                text = "Services & Guidance",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = PrimaryGreen,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp)
            )

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                horizontalArrangement = Arrangement.SpaceAround
            ) {
                ShortcutItem(title = "Packages", icon = Icons.Default.Place, onClick = onNavigateToPackages)
                ShortcutItem(title = "Hotels", icon = Icons.Default.Home, onClick = onNavigateToHotels)
                ShortcutItem(title = "Visa Docs", icon = Icons.Default.Info, onClick = onNavigateToVisa)
                ShortcutItem(title = "Ziyarat", icon = Icons.Default.LocationOn, onClick = onNavigateToZiyarat)
            }

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                horizontalArrangement = Arrangement.SpaceAround
            ) {
                ShortcutItem(title = "My Bookings", icon = Icons.Default.DateRange, onClick = onNavigateToMyBookings)
                ShortcutItem(title = "Profile", icon = Icons.Default.Person, onClick = onNavigateToProfile)
                ShortcutItem(
                    title = "WhatsApp",
                    icon = Icons.Default.Send,
                    isAccent = true,
                    onClick = {
                        AppConfig.openWhatsApp(context, "Assalamu Alaikum! I would like to inquire about Umrah packages from Hyderabad.")
                    }
                )
                ShortcutItem(title = "Contact Us", icon = Icons.Default.Phone, onClick = onNavigateToContact)
            }
        }

        // Featured Packages Header
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Featured Umrah Packages",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = PrimaryGreen
                )
                TextButton(onClick = onNavigateToPackages) {
                    Text(text = "View All", color = PrimaryGreen, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                }
            }
        }

        // Package Cards with Clear "Book" & "Details" Buttons
        items(packages) { pkg ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 14.dp, vertical = 6.dp)
                    .clickable { onNavigateToDetails(pkg.id) },
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.45f)),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Row(modifier = Modifier.padding(12.dp)) {
                    Box(
                        modifier = Modifier
                            .size(78.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(DeepGreen)
                    ) {
                        AsyncImage(
                            model = pkg.thumbnail,
                            contentDescription = pkg.title,
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Crop
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = pkg.title,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = PrimaryGreen,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                        Text(
                            text = "📅 ${pkg.departureDate} · ${pkg.airline}",
                            fontSize = 11.sp,
                            color = Color.DarkGray
                        )
                        Text(
                            text = "🏨 ${pkg.makkahHotel.take(22)}...",
                            fontSize = 10.sp,
                            color = Color.Gray
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "₹${pkg.pricePerPerson}/-",
                                fontWeight = FontWeight.Black,
                                fontSize = 14.sp,
                                color = PrimaryGreen
                            )
                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                OutlinedButton(
                                    onClick = { onNavigateToDetails(pkg.id) },
                                    colors = ButtonDefaults.outlinedButtonColors(contentColor = PrimaryGreen),
                                    border = BorderStroke(1.dp, PrimaryGreen.copy(alpha = 0.5f)),
                                    shape = RoundedCornerShape(8.dp),
                                    contentPadding = PaddingValues(horizontal = 8.dp, vertical = 2.dp)
                                ) {
                                    Text("Details", fontSize = 10.sp, fontWeight = FontWeight.Bold)
                                }
                                Button(
                                    onClick = { onNavigateToBooking(pkg.id) },
                                    colors = ButtonDefaults.buttonColors(containerColor = PremiumGold),
                                    shape = RoundedCornerShape(8.dp),
                                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp)
                                ) {
                                    Text("Book", color = DeepGreen, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                        }
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun ShortcutItem(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    isAccent: Boolean = false,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .width(78.dp)
            .clickable(onClick = onClick)
            .padding(vertical = 4.dp)
    ) {
        Box(
            modifier = Modifier
                .size(46.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(if (isAccent) Color(0xFF25D366) else Color.White)
                .border(1.dp, PremiumGold.copy(alpha = 0.5f), RoundedCornerShape(12.dp)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = title,
                tint = if (isAccent) Color.White else PrimaryGreen,
                modifier = Modifier.size(24.dp)
            )
        }
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = title,
            fontSize = 10.sp,
            fontWeight = FontWeight.SemiBold,
            color = MainText,
            textAlign = TextAlign.Center,
            maxLines = 1
        )
    }
}

// -------------------------------------------------------------
// 3. PACKAGES SCREEN
// -------------------------------------------------------------
@Composable
fun PackagesScreen(
    onSelectPackage: (String) -> Unit,
    onBookPackage: (String) -> Unit
) {
    val packages = remember { MockDataProvider.packages }
    var selectedCat by remember { mutableStateOf("All") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
    ) {
        // Category Filter Tabs
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(horizontal = 12.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("All", "Economy", "Standard", "Premium").forEach { cat ->
                val isSelected = selectedCat == cat
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = if (isSelected) PrimaryGreen else CreamBackground,
                    border = BorderStroke(1.dp, PremiumGold),
                    modifier = Modifier.clickable { selectedCat = cat }
                ) {
                    Text(
                        text = cat,
                        color = if (isSelected) Color.White else PrimaryGreen,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp)
                    )
                }
            }
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp)
        ) {
            items(packages.filter { selectedCat == "All" || it.category == selectedCat }) { pkg ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.5f)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Column {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(145.dp)
                                .background(DeepGreen)
                        ) {
                            AsyncImage(
                                model = pkg.thumbnail,
                                contentDescription = pkg.title,
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Crop
                            )
                            Surface(
                                color = PremiumGold,
                                shape = RoundedCornerShape(bottomEnd = 8.dp),
                                modifier = Modifier.align(Alignment.TopStart)
                            ) {
                                Text(
                                    text = pkg.category,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = DeepGreen,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                                )
                            }
                        }
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(
                                text = pkg.title,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp,
                                color = PrimaryGreen
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "📅 ${pkg.departureDate} (${pkg.durationDays} Days)",
                                fontSize = 11.sp,
                                color = Color.Gray
                            )
                            Text(
                                text = "✈️ ${pkg.airline} · ${pkg.route}",
                                fontSize = 11.sp,
                                color = Color.Gray
                            )
                            Spacer(modifier = Modifier.height(10.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(
                                        text = "₹${pkg.pricePerPerson}/-",
                                        fontSize = 17.sp,
                                        fontWeight = FontWeight.Black,
                                        color = PrimaryGreen
                                    )
                                    Text(text = "per person all-inclusive", fontSize = 9.sp, color = Color.Gray)
                                }
                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    OutlinedButton(
                                        onClick = { onSelectPackage(pkg.id) },
                                        shape = RoundedCornerShape(8.dp),
                                        colors = ButtonDefaults.outlinedButtonColors(contentColor = PrimaryGreen),
                                        border = BorderStroke(1.dp, PrimaryGreen)
                                    ) {
                                        Text("Details", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    }
                                    Button(
                                        onClick = { onBookPackage(pkg.id) },
                                        colors = ButtonDefaults.buttonColors(containerColor = PremiumGold),
                                        shape = RoundedCornerShape(8.dp)
                                    ) {
                                        Text("Book Now", color = DeepGreen, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// -------------------------------------------------------------
// 4. PACKAGE DETAILS SCREEN
// -------------------------------------------------------------
@Composable
fun PackageDetailsScreen(
    packageId: String?,
    onBack: () -> Unit,
    onBookNow: (String) -> Unit
) {
    val pkg = MockDataProvider.packages.find { it.id == packageId } ?: MockDataProvider.packages.first()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
    ) {
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(210.dp)
                    .background(DeepGreen)
            ) {
                AsyncImage(
                    model = pkg.thumbnail,
                    contentDescription = pkg.title,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .padding(12.dp)
                        .background(DeepGreen.copy(alpha = 0.7f), CircleShape)
                        .align(Alignment.TopStart)
                ) {
                    Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                }
            }
        }

        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = pkg.title, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "₹${pkg.pricePerPerson}/- Per Person",
                        fontSize = 19.sp,
                        fontWeight = FontWeight.Black,
                        color = PremiumGold
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    DetailRow(label = "Departure Date", value = pkg.departureDate)
                    DetailRow(label = "Return Date", value = pkg.returnDate)
                    DetailRow(label = "Duration", value = "${pkg.durationDays} Days / ${pkg.durationDays - 1} Nights")
                    DetailRow(label = "Flight & Route", value = "${pkg.airline} (${pkg.route})")
                    DetailRow(label = "Makkah Stay", value = "${pkg.makkahHotel} (${pkg.makkahNights} Nights)")
                    DetailRow(label = "Madinah Stay", value = "${pkg.madinahHotel} (${pkg.madinahNights} Nights)")

                    Spacer(modifier = Modifier.height(14.dp))
                    Text(text = "Package Inclusions:", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 13.sp)
                    pkg.inclusions.forEach { inc ->
                        Text(
                            text = "✓ $inc",
                            fontSize = 12.sp,
                            color = Color(0xFF0F5132),
                            modifier = Modifier.padding(vertical = 1.5.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(20.dp))
                    Button(
                        onClick = { onBookNow(pkg.id) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = PremiumGold),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text(
                            text = "Proceed to Booking →",
                            color = DeepGreen,
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun DetailRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 2.5.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, fontSize = 11.sp, color = Color.Gray)
        Text(text = value, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = MainText)
    }
}

// -------------------------------------------------------------
// 5. BOOKING FORM SCREEN (Complete Validation & Persistence)
// -------------------------------------------------------------
@Composable
fun BookingFormScreen(
    packageId: String?,
    onBookingSuccess: (String) -> Unit,
    onBack: () -> Unit
) {
    val context = LocalContext.current
    val pkg = MockDataProvider.packages.find { it.id == packageId } ?: MockDataProvider.packages.first()

    val userRepo = remember { UserRepository.getInstance(context) }
    val profile = remember { userRepo.getProfile() }

    var passengerCount by remember { mutableIntStateOf(1) }
    var primaryName by remember { mutableStateOf(profile.fullName) }
    var contactPhone by remember { mutableStateOf(profile.phone) }
    var contactEmail by remember { mutableStateOf(profile.email) }
    var specialRequests by remember { mutableStateOf("") }

    // Passenger details list
    val passengers = remember {
        mutableStateListOf(
            Passenger(
                fullName = profile.fullName,
                age = "34",
                passportNumber = profile.passportNumber,
                passportExpiry = profile.passportExpiry,
                nationality = "Indian",
                gender = "Male"
            )
        )
    }

    // Keep passengers list synced with passenger count
    LaunchedEffect(passengerCount) {
        while (passengers.size < passengerCount) {
            val idx = passengers.size + 1
            passengers.add(
                Passenger(
                    fullName = "",
                    age = "",
                    passportNumber = "",
                    passportExpiry = "",
                    nationality = "Indian",
                    gender = "Male"
                )
            )
        }
        while (passengers.size > passengerCount) {
            passengers.removeAt(passengers.size - 1)
        }
    }

    var errorMessage by remember { mutableStateOf<String?>(null) }
    var isSubmitting by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(14.dp)
    ) {
        item {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp)
            ) {
                IconButton(onClick = onBack) {
                    Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back", tint = PrimaryGreen)
                }
                Column {
                    Text(
                        text = "Umrah Booking Form",
                        fontSize = 17.sp,
                        fontWeight = FontWeight.Bold,
                        color = PrimaryGreen
                    )
                    Text(text = pkg.title, fontSize = 11.sp, color = Color.Gray)
                }
            }
        }

        // Package Summary Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = PrimaryGreen),
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "Departure Date", color = Color.White.copy(alpha = 0.8f), fontSize = 11.sp)
                        Text(text = pkg.departureDate, color = PremiumGold, fontSize = 15.sp, fontWeight = FontWeight.Bold)
                        Text(text = pkg.airline, color = Color.White, fontSize = 11.sp)
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Text(text = "Rate per Person", color = Color.White.copy(alpha = 0.8f), fontSize = 11.sp)
                        Text(text = "₹${pkg.pricePerPerson}/-", color = PremiumGold, fontSize = 17.sp, fontWeight = FontWeight.Black)
                    }
                }
            }
            Spacer(modifier = Modifier.height(14.dp))
        }

        // Passenger Count Stepper
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "Number of Pilgrims", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = PrimaryGreen)
                        Text(text = "Select adults & family members", fontSize = 10.sp, color = Color.Gray)
                    }
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        FilledIconButton(
                            onClick = { if (passengerCount > 1) passengerCount-- },
                            colors = IconButtonDefaults.filledIconButtonColors(containerColor = DeepGreen),
                            modifier = Modifier.size(36.dp)
                        ) {
                            Text("-", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                        }
                        Text(
                            text = "$passengerCount",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Black,
                            color = PrimaryGreen,
                            modifier = Modifier.padding(horizontal = 14.dp)
                        )
                        FilledIconButton(
                            onClick = { if (passengerCount < 8) passengerCount++ },
                            colors = IconButtonDefaults.filledIconButtonColors(containerColor = DeepGreen),
                            modifier = Modifier.size(36.dp)
                        ) {
                            Text("+", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(14.dp))
        }

        // Primary Contact Details Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "1. Primary Contact Information",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = PrimaryGreen
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = primaryName,
                        onValueChange = { primaryName = it },
                        label = { Text("Lead Pilgrim Full Name *") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = contactPhone,
                        onValueChange = { contactPhone = it },
                        label = { Text("WhatsApp Contact Number *") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = contactEmail,
                        onValueChange = { contactEmail = it },
                        label = { Text("Email Address") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                }
            }
            Spacer(modifier = Modifier.height(14.dp))
        }

        // Dynamic Passenger Passport Cards
        item {
            Text(
                text = "2. Pilgrim Passport Details ($passengerCount Persons)",
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp,
                color = PrimaryGreen,
                modifier = Modifier.padding(bottom = 6.dp)
            )
        }

        items(passengers.indices.toList()) { index ->
            val p = passengers[index]
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Pilgrim #${index + 1}",
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            color = PrimaryGreen
                        )
                        if (index == 0) {
                            Surface(
                                color = PremiumGold.copy(alpha = 0.2f),
                                shape = RoundedCornerShape(4.dp)
                            ) {
                                Text(
                                    text = "Primary",
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = DeepGreen,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    OutlinedTextField(
                        value = p.fullName,
                        onValueChange = { passengers[index] = p.copy(fullName = it) },
                        label = { Text("Full Name as in Passport *") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(6.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedTextField(
                            value = p.passportNumber,
                            onValueChange = { passengers[index] = p.copy(passportNumber = it.uppercase()) },
                            label = { Text("Passport No. *") },
                            modifier = Modifier.weight(1f),
                            singleLine = true
                        )
                        OutlinedTextField(
                            value = p.age,
                            onValueChange = { passengers[index] = p.copy(age = it) },
                            label = { Text("Age") },
                            modifier = Modifier.weight(0.7f),
                            singleLine = true
                        )
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedTextField(
                            value = p.passportExpiry,
                            onValueChange = { passengers[index] = p.copy(passportExpiry = it) },
                            label = { Text("Passport Expiry (DD/MM/YYYY)") },
                            modifier = Modifier.weight(1f),
                            singleLine = true
                        )
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.align(Alignment.CenterVertically)
                        ) {
                            FilterChip(
                                selected = p.gender == "Male",
                                onClick = { passengers[index] = p.copy(gender = "Male") },
                                label = { Text("M") }
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            FilterChip(
                                selected = p.gender == "Female",
                                onClick = { passengers[index] = p.copy(gender = "Female") },
                                label = { Text("F") }
                            )
                        }
                    }
                }
            }
        }

        // Special Requests & Pricing
        item {
            Spacer(modifier = Modifier.height(10.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "3. Special Requests & Preferences",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = PrimaryGreen
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = specialRequests,
                        onValueChange = { specialRequests = it },
                        placeholder = { Text("e.g. Ground floor hotel room, wheelchair assistance at airport, adjoining rooms") },
                        modifier = Modifier.fillMaxWidth(),
                        minLines = 2
                    )
                }
            }
        }

        // Total Amount Calculation Card
        item {
            val totalAmount = pkg.pricePerPerson * passengerCount
            Spacer(modifier = Modifier.height(14.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = DeepGreen),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "Total Payable Amount", color = Color.White.copy(alpha = 0.85f), fontSize = 12.sp)
                        Text(text = "$passengerCount × ₹${pkg.pricePerPerson}", color = Color.White.copy(alpha = 0.7f), fontSize = 11.sp)
                    }
                    Text(
                        text = "₹${totalAmount}/-",
                        color = PremiumGold,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Black
                    )
                    Text(
                        text = "No immediate online payment needed. Booking confirmation voucher generated instantly and verified on WhatsApp.",
                        color = Color(0xFFD1E7DD),
                        fontSize = 10.sp,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            }
        }

        // Error message if any
        if (errorMessage != null) {
            item {
                Spacer(modifier = Modifier.height(8.dp))
                Surface(
                    color = Color(0xFFFFEBEE),
                    shape = RoundedCornerShape(8.dp),
                    border = BorderStroke(1.dp, Color(0xFFE57373))
                ) {
                    Text(
                        text = errorMessage ?: "",
                        color = Color(0xFFC62828),
                        fontSize = 12.sp,
                        modifier = Modifier.padding(10.dp)
                    )
                }
            }
        }

        // Submit Button
        item {
            val totalAmount = pkg.pricePerPerson * passengerCount
            Spacer(modifier = Modifier.height(18.dp))
            Button(
                onClick = {
                    if (primaryName.isBlank()) {
                        errorMessage = "Please enter the lead pilgrim's full name"
                        return@Button
                    }
                    if (contactPhone.isBlank()) {
                        errorMessage = "Please enter a valid WhatsApp contact number"
                        return@Button
                    }
                    // Validate passengers
                    for (i in 0 until passengerCount) {
                        if (passengers[i].fullName.isBlank()) {
                            errorMessage = "Please enter full name for Pilgrim #${i + 1}"
                            return@Button
                        }
                    }

                    errorMessage = null
                    isSubmitting = true

                    val bookingId = "AH-2026-${(10000..99999).random()}"
                    val dateFormat = SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.getDefault())
                    val newBooking = Booking(
                        id = bookingId,
                        packageId = pkg.id,
                        packageTitle = pkg.title,
                        departureDate = pkg.departureDate,
                        returnDate = pkg.returnDate,
                        airline = pkg.airline,
                        passengerCount = passengerCount,
                        pricePerPerson = pkg.pricePerPerson,
                        totalAmount = totalAmount,
                        primaryPassengerName = primaryName,
                        contactPhone = contactPhone,
                        contactEmail = contactEmail,
                        specialRequests = specialRequests,
                        bookingStatus = "Confirmed",
                        paymentStatus = "Pending Verification",
                        createdAt = dateFormat.format(Date()),
                        passengers = passengers.take(passengerCount)
                    )

                    // Persist booking to SharedPreferences
                    BookingRepository.getInstance(context).saveBooking(newBooking)

                    Toast.makeText(context, "Booking successfully created!", Toast.LENGTH_SHORT).show()
                    onBookingSuccess(bookingId)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                colors = ButtonDefaults.buttonColors(containerColor = PremiumGold),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "Confirm Reservation & Generate Booking →",
                    color = DeepGreen,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            }
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

// -------------------------------------------------------------
// 6. BOOKING CONFIRMATION SCREEN (With WhatsApp Sharing)
// -------------------------------------------------------------
@Composable
fun BookingConfirmationScreen(
    bookingId: String?,
    onNavigateToMyBookings: () -> Unit,
    onNavigateToHome: () -> Unit
) {
    val context = LocalContext.current
    val repo = remember { BookingRepository.getInstance(context) }
    val booking = remember(bookingId) {
        repo.getBookingById(bookingId ?: "") ?: repo.getAllBookings().firstOrNull() ?: Booking()
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        item {
            Spacer(modifier = Modifier.height(16.dp))
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(PrimaryGreen)
                    .border(3.dp, PremiumGold, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = "Confirmed",
                    tint = PremiumGold,
                    modifier = Modifier.size(44.dp)
                )
            }
            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Alhamdulillah!",
                fontSize = 24.sp,
                fontWeight = FontWeight.Black,
                color = PrimaryGreen
            )
            Text(
                text = "Your Umrah Booking is Received",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = DeepGreen
            )
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Reference Code Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(14.dp),
                border = BorderStroke(1.5.dp, PremiumGold)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "BOOKING REFERENCE NUMBER", fontSize = 10.sp, color = Color.Gray, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = booking.id,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Black,
                        color = PrimaryGreen,
                        letterSpacing = 1.sp
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(CreamBackground)
                            .clickable {
                                val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                                val clip = ClipData.newPlainText("Booking Ref", booking.id)
                                clipboard.setPrimaryClip(clip)
                                Toast.makeText(context, "Copied ${booking.id} to clipboard", Toast.LENGTH_SHORT).show()
                            }
                            .padding(horizontal = 10.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(imageVector = Icons.Default.ContentCopy, contentDescription = "Copy", tint = PrimaryGreen, modifier = Modifier.size(14.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(text = "Tap to Copy ID", fontSize = 11.sp, color = PrimaryGreen, fontWeight = FontWeight.Bold)
                    }
                }
            }
            Spacer(modifier = Modifier.height(14.dp))
        }

        // Booking Summary
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(14.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Booking Details", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = PrimaryGreen)
                    Spacer(modifier = Modifier.height(8.dp))
                    DetailRow(label = "Package", value = booking.packageTitle)
                    DetailRow(label = "Departure Date", value = booking.departureDate)
                    DetailRow(label = "Lead Pilgrim", value = booking.primaryPassengerName)
                    DetailRow(label = "Contact Phone", value = booking.contactPhone)
                    DetailRow(label = "Passengers", value = "${booking.passengerCount} Persons")
                    DetailRow(label = "Total Amount", value = "₹${booking.totalAmount}/-")
                    DetailRow(label = "Status", value = booking.bookingStatus)

                    if (booking.passengers.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(text = "Registered Pilgrims:", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
                        booking.passengers.forEachIndexed { i, p ->
                            Text(
                                text = "${i + 1}. ${p.fullName} (Passport: ${p.passportNumber.ifBlank { "Pending" }})",
                                fontSize = 11.sp,
                                color = Color.DarkGray
                            )
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(18.dp))
        }

        // WhatsApp Share Action Button (Official WhatsApp Green #25D366)
        item {
            Button(
                onClick = {
                    val summary = buildString {
                        appendLine("🕋 *AL HINDWAN TOURS & TRAVELS — UMRAH BOOKING*")
                        appendLine("----------------------------------")
                        appendLine("📋 *Booking Ref:* ${booking.id}")
                        appendLine("📦 *Package:* ${booking.packageTitle}")
                        appendLine("📅 *Departure Date:* ${booking.departureDate}")
                        appendLine("✈️ *Airline:* ${booking.airline}")
                        appendLine("👤 *Lead Pilgrim:* ${booking.primaryPassengerName}")
                        appendLine("📞 *Contact Phone:* ${booking.contactPhone}")
                        appendLine("👥 *Pilgrims Count:* ${booking.passengerCount} Persons")
                        appendLine("💵 *Total Amount:* ₹${booking.totalAmount}/-")
                        if (booking.specialRequests.isNotBlank()) {
                            appendLine("📝 *Special Request:* ${booking.specialRequests}")
                        }
                        appendLine("----------------------------------")
                        appendLine("*Pilgrims List:*")
                        booking.passengers.forEachIndexed { idx, p ->
                            appendLine("${idx + 1}. ${p.fullName} - Passport: ${p.passportNumber}")
                        }
                        appendLine("----------------------------------")
                        appendLine("Assalamu Alaikum! Please verify my Umrah booking and share the next steps for visa & document submission.")
                    }
                    AppConfig.openWhatsApp(context, summary)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(imageVector = Icons.Default.Send, contentDescription = "WhatsApp", tint = Color.White)
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Send Booking Details on WhatsApp",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
        }

        // Navigation Actions
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                OutlinedButton(
                    onClick = onNavigateToMyBookings,
                    modifier = Modifier.weight(1f).height(46.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = PrimaryGreen),
                    border = BorderStroke(1.dp, PrimaryGreen),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text("View My Bookings", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }

                Button(
                    onClick = onNavigateToHome,
                    modifier = Modifier.weight(1f).height(46.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text("Back to Home", color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }
            }
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

// -------------------------------------------------------------
// 7. MY BOOKINGS SCREEN (Tab 3 in Bottom Navigation)
// -------------------------------------------------------------
@Composable
fun MyBookingsScreen(
    onNavigateToPackages: () -> Unit,
    onBookPackage: (String) -> Unit
) {
    val context = LocalContext.current
    val repo = remember { BookingRepository.getInstance(context) }
    var bookings by remember { mutableStateOf(repo.getAllBookings()) }
    var selectedFilter by remember { mutableStateOf("All") }

    var bookingToCancel by remember { mutableStateOf<Booking?>(null) }

    // Dialog for cancellation
    if (bookingToCancel != null) {
        val b = bookingToCancel!!
        AlertDialog(
            onDismissRequest = { bookingToCancel = null },
            title = { Text(text = "Cancel Booking?", fontWeight = FontWeight.Bold, color = PrimaryGreen) },
            text = {
                Text(text = "Are you sure you want to cancel booking ${b.id} for ${b.packageTitle}? You can also chat with our tour manager to reschedule your dates.")
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        repo.cancelBooking(b.id)
                        bookings = repo.getAllBookings()
                        bookingToCancel = null
                        Toast.makeText(context, "Booking ${b.id} cancelled", Toast.LENGTH_SHORT).show()
                    }
                ) {
                    Text("Yes, Cancel", color = Color.Red, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { bookingToCancel = null }) {
                    Text("Keep Booking", color = PrimaryGreen)
                }
            }
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
    ) {
        // Screen Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(PrimaryGreen)
                .padding(horizontal = 16.dp, vertical = 14.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                Text(
                    text = "My Umrah Bookings",
                    color = PremiumGold,
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "View saved reservations & booking vouchers",
                    color = Color.White.copy(alpha = 0.85f),
                    fontSize = 11.sp
                )
            }
            Surface(
                color = PremiumGold,
                shape = CircleShape
            ) {
                Text(
                    text = "${bookings.size}",
                    color = DeepGreen,
                    fontWeight = FontWeight.Black,
                    fontSize = 12.sp,
                    modifier = Modifier.padding(horizontal = 9.dp, vertical = 2.dp)
                )
            }
        }

        // Filter Chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(horizontal = 12.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("All", "Confirmed", "Pending", "Cancelled").forEach { filter ->
                val isSelected = selectedFilter == filter
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = if (isSelected) PrimaryGreen else CreamBackground,
                    border = BorderStroke(1.dp, PremiumGold),
                    modifier = Modifier.clickable { selectedFilter = filter }
                ) {
                    Text(
                        text = filter,
                        color = if (isSelected) Color.White else PrimaryGreen,
                        fontWeight = FontWeight.Bold,
                        fontSize = 11.sp,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 5.dp)
                    )
                }
            }
        }

        val filteredBookings = bookings.filter {
            selectedFilter == "All" || it.bookingStatus.equals(selectedFilter, ignoreCase = true)
        }

        if (filteredBookings.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    shape = RoundedCornerShape(16.dp),
                    border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Box(
                            modifier = Modifier
                                .size(64.dp)
                                .clip(CircleShape)
                                .background(CreamBackground)
                                .border(1.5.dp, PremiumGold, CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.DateRange,
                                contentDescription = "No Bookings",
                                tint = PrimaryGreen,
                                modifier = Modifier.size(32.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(14.dp))
                        Text(
                            text = "No Bookings Found",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = PrimaryGreen
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "You do not have any $selectedFilter Umrah reservations at this moment.",
                            fontSize = 11.sp,
                            color = Color.Gray,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(
                            onClick = onNavigateToPackages,
                            colors = ButtonDefaults.buttonColors(containerColor = PremiumGold),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text("Browse Umrah Packages", color = DeepGreen, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }
                    }
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(12.dp)
            ) {
                items(filteredBookings) { b ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 6.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        shape = RoundedCornerShape(14.dp),
                        border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f)),
                        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(
                                        text = b.id,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Black,
                                        color = PrimaryGreen
                                    )
                                    Text(
                                        text = b.packageTitle,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = MainText
                                    )
                                }
                                Surface(
                                    color = when (b.bookingStatus) {
                                        "Confirmed" -> Color(0xFFD1E7DD)
                                        "Cancelled" -> Color(0xFFFFCDD2)
                                        else -> Color(0xFFFFF3CD)
                                    },
                                    shape = RoundedCornerShape(6.dp)
                                ) {
                                    Text(
                                        text = b.bookingStatus,
                                        color = when (b.bookingStatus) {
                                            "Confirmed" -> Color(0xFF0F5132)
                                            "Cancelled" -> Color(0xFFB71C1C)
                                            else -> Color(0xFF664D03)
                                        },
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(8.dp))
                            Divider(color = CreamBackground, thickness = 1.dp)
                            Spacer(modifier = Modifier.height(8.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Column {
                                    Text(text = "Departure Date", fontSize = 10.sp, color = Color.Gray)
                                    Text(text = b.departureDate, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                                }
                                Column {
                                    Text(text = "Pilgrims", fontSize = 10.sp, color = Color.Gray)
                                    Text(text = "${b.passengerCount} Persons", fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                                }
                                Column(horizontalAlignment = Alignment.End) {
                                    Text(text = "Total Amount", fontSize = 10.sp, color = Color.Gray)
                                    Text(text = "₹${b.totalAmount}/-", fontSize = 13.sp, fontWeight = FontWeight.Black, color = PrimaryGreen)
                                }
                            }

                            if (b.passengers.isNotEmpty()) {
                                Spacer(modifier = Modifier.height(8.dp))
                                Surface(
                                    color = CreamBackground,
                                    shape = RoundedCornerShape(8.dp),
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Column(modifier = Modifier.padding(8.dp)) {
                                        Text(text = "Pilgrim List:", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
                                        b.passengers.forEachIndexed { idx, p ->
                                            Text(
                                                text = "${idx + 1}. ${p.fullName} • ${p.passportNumber.ifBlank { "Passport Pending" }}",
                                                fontSize = 10.sp,
                                                color = Color.DarkGray
                                            )
                                        }
                                    }
                                }
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Button(
                                    onClick = {
                                        val msg = "Assalamu Alaikum! Checking status for Booking Ref: ${b.id} (${b.packageTitle}). Primary Pilgrim: ${b.primaryPassengerName}."
                                        AppConfig.openWhatsApp(context, msg)
                                    },
                                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
                                    shape = RoundedCornerShape(8.dp),
                                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp)
                                ) {
                                    Icon(imageVector = Icons.Default.Send, contentDescription = "WhatsApp", tint = Color.White, modifier = Modifier.size(14.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("WhatsApp Manager", color = Color.White, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                                }

                                if (b.bookingStatus != "Cancelled") {
                                    TextButton(onClick = { bookingToCancel = b }) {
                                        Text("Cancel", color = Color.Red, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// -------------------------------------------------------------
// 8. PROFILE SCREEN (Tab 4 in Bottom Navigation)
// -------------------------------------------------------------
@Composable
fun ProfileScreen(
    onNavigateToMyBookings: () -> Unit,
    onNavigateToVisaDocs: () -> Unit,
    onNavigateToContact: () -> Unit
) {
    val context = LocalContext.current
    val userRepo = remember { UserRepository.getInstance(context) }
    var profile by remember { mutableStateOf(userRepo.getProfile()) }
    var savedPilgrims by remember { mutableStateOf(userRepo.getSavedPilgrims()) }

    var showEditProfileDialog by remember { mutableStateOf(false) }
    var showAddPilgrimDialog by remember { mutableStateOf(false) }
    var hidePassportInfo by remember { mutableStateOf(true) }

    // Dialog: Edit Profile
    if (showEditProfileDialog) {
        var editName by remember { mutableStateOf(profile.fullName) }
        var editPhone by remember { mutableStateOf(profile.phone) }
        var editEmail by remember { mutableStateOf(profile.email) }
        var editEmergency by remember { mutableStateOf(profile.emergencyPhone) }
        var editPassport by remember { mutableStateOf(profile.passportNumber) }
        var editCity by remember { mutableStateOf(profile.city) }

        AlertDialog(
            onDismissRequest = { showEditProfileDialog = false },
            title = { Text(text = "Edit Profile", fontWeight = FontWeight.Bold, color = PrimaryGreen) },
            text = {
                Column(modifier = Modifier.fillMaxWidth()) {
                    OutlinedTextField(
                        value = editName,
                        onValueChange = { editName = it },
                        label = { Text("Full Name") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = editPhone,
                        onValueChange = { editPhone = it },
                        label = { Text("Phone Number") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = editEmail,
                        onValueChange = { editEmail = it },
                        label = { Text("Email Address") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = editPassport,
                        onValueChange = { editPassport = it.uppercase() },
                        label = { Text("Passport Number") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = editCity,
                        onValueChange = { editCity = it },
                        label = { Text("City / State") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val updated = profile.copy(
                            fullName = editName,
                            phone = editPhone,
                            email = editEmail,
                            emergencyPhone = editEmergency,
                            passportNumber = editPassport,
                            city = editCity
                        )
                        userRepo.saveProfile(updated)
                        profile = updated
                        showEditProfileDialog = false
                        Toast.makeText(context, "Profile updated successfully!", Toast.LENGTH_SHORT).show()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen)
                ) {
                    Text("Save Changes", color = Color.White, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showEditProfileDialog = false }) {
                    Text("Cancel", color = Color.Gray)
                }
            }
        )
    }

    // Dialog: Add Family Pilgrim
    if (showAddPilgrimDialog) {
        var pName by remember { mutableStateOf("") }
        var pRelation by remember { mutableStateOf("Family") }
        var pPassport by remember { mutableStateOf("") }
        var pAge by remember { mutableStateOf("") }
        var pGender by remember { mutableStateOf("Male") }

        AlertDialog(
            onDismissRequest = { showAddPilgrimDialog = false },
            title = { Text(text = "Add Family Pilgrim", fontWeight = FontWeight.Bold, color = PrimaryGreen) },
            text = {
                Column(modifier = Modifier.fillMaxWidth()) {
                    OutlinedTextField(
                        value = pName,
                        onValueChange = { pName = it },
                        label = { Text("Pilgrim Full Name *") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = pPassport,
                        onValueChange = { pPassport = it.uppercase() },
                        label = { Text("Passport Number") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedTextField(
                            value = pRelation,
                            onValueChange = { pRelation = it },
                            label = { Text("Relation") },
                            modifier = Modifier.weight(1f),
                            singleLine = true
                        )
                        OutlinedTextField(
                            value = pAge,
                            onValueChange = { pAge = it },
                            label = { Text("Age") },
                            modifier = Modifier.weight(0.7f),
                            singleLine = true
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (pName.isNotBlank()) {
                            val newP = SavedPilgrim(
                                id = "sp-${System.currentTimeMillis() % 10000}",
                                fullName = pName,
                                relation = pRelation,
                                passportNumber = pPassport,
                                age = pAge,
                                gender = pGender
                            )
                            userRepo.addOrUpdatePilgrim(newP)
                            savedPilgrims = userRepo.getSavedPilgrims()
                            showAddPilgrimDialog = false
                            Toast.makeText(context, "Pilgrim saved!", Toast.LENGTH_SHORT).show()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen)
                ) {
                    Text("Save Pilgrim", color = Color.White, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showAddPilgrimDialog = false }) {
                    Text("Cancel", color = Color.Gray)
                }
            }
        )
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
    ) {
        // User Header Card
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.verticalGradient(
                            listOf(DeepGreen, PrimaryGreen)
                        )
                    )
                    .padding(20.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(64.dp)
                            .clip(CircleShape)
                            .background(CreamBackground)
                            .border(2.5.dp, PremiumGold, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = profile.fullName.split(" ").mapNotNull { it.firstOrNull()?.toString() }.take(2).joinToString(""),
                            color = PrimaryGreen,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Black
                        )
                    }

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = profile.fullName,
                            color = PremiumGold,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = profile.phone,
                            color = Color.White.copy(alpha = 0.9f),
                            fontSize = 12.sp
                        )
                        Text(
                            text = profile.email,
                            color = Color(0xFFD1E7DD),
                            fontSize = 11.sp
                        )
                        Surface(
                            color = PremiumGold,
                            shape = RoundedCornerShape(4.dp),
                            modifier = Modifier.padding(top = 4.dp)
                        ) {
                            Text(
                                text = "VERIFIED PILGRIM",
                                color = DeepGreen,
                                fontSize = 8.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }

                    IconButton(onClick = { showEditProfileDialog = true }) {
                        Icon(imageVector = Icons.Default.Edit, contentDescription = "Edit Profile", tint = PremiumGold)
                    }
                }
            }
        }

        // Account & Documents Section
        item {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = "Account & Pilgrim Profile",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = PrimaryGreen,
                    modifier = Modifier.padding(vertical = 4.dp)
                )

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    shape = RoundedCornerShape(14.dp),
                    border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(text = "Passport Number", fontSize = 11.sp, color = Color.Gray)
                                val displayPassport = if (hidePassportInfo && profile.passportNumber.length > 3) {
                                    profile.passportNumber.take(3) + "****" + profile.passportNumber.takeLast(2)
                                } else {
                                    profile.passportNumber
                                }
                                Text(text = displayPassport, fontSize = 14.sp, fontWeight = FontWeight.Black, color = PrimaryGreen)
                            }

                            IconButton(onClick = { hidePassportInfo = !hidePassportInfo }) {
                                Icon(
                                    imageVector = if (hidePassportInfo) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                                    contentDescription = "Toggle Passport",
                                    tint = PrimaryGreen
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))
                        DetailRow(label = "Nationality", value = profile.nationality)
                        DetailRow(label = "Home City", value = profile.city)
                        DetailRow(label = "Emergency Contact", value = profile.emergencyPhone)
                    }
                }
            }
        }

        // Saved Pilgrims (Family Members for Fast Booking)
        item {
            Column(modifier = Modifier.padding(horizontal = 14.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Saved Family Pilgrims (${savedPilgrims.size})",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = PrimaryGreen
                    )
                    TextButton(onClick = { showAddPilgrimDialog = true }) {
                        Text("+ Add Pilgrim", color = PrimaryGreen, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    }
                }

                savedPilgrims.forEach { sp ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 3.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        shape = RoundedCornerShape(10.dp),
                        border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.25f))
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(10.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(text = sp.fullName, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
                                Text(
                                    text = "${sp.relation} • ${sp.passportNumber.ifBlank { "No Passport" }}",
                                    fontSize = 10.sp,
                                    color = Color.Gray
                                )
                            }
                            IconButton(
                                onClick = {
                                    userRepo.removePilgrim(sp.id)
                                    savedPilgrims = userRepo.getSavedPilgrims()
                                    Toast.makeText(context, "Pilgrim removed", Toast.LENGTH_SHORT).show()
                                },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete", tint = Color.Gray, modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                }
            }
        }

        // Quick Navigation & Support
        item {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = "Umrah Services & Support",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = PrimaryGreen,
                    modifier = Modifier.padding(vertical = 4.dp)
                )

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    shape = RoundedCornerShape(14.dp),
                    border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
                ) {
                    Column {
                        ProfileMenuItem(
                            title = "My Umrah Bookings",
                            icon = Icons.Default.DateRange,
                            subtitle = "View active and past bookings",
                            onClick = onNavigateToMyBookings
                        )
                        Divider(color = CreamBackground, thickness = 1.dp)
                        ProfileMenuItem(
                            title = "Visa Documents & Rules",
                            icon = Icons.Default.Info,
                            subtitle = "Required photo specifications & validities",
                            onClick = onNavigateToVisaDocs
                        )
                        Divider(color = CreamBackground, thickness = 1.dp)
                        ProfileMenuItem(
                            title = "WhatsApp Support Desk",
                            icon = Icons.Default.Send,
                            subtitle = "Chat directly with agency tour manager",
                            onClick = {
                                AppConfig.openWhatsApp(context, "Assalamu Alaikum! I need customer support regarding Al Hindwan Umrah services.")
                            }
                        )
                        Divider(color = CreamBackground, thickness = 1.dp)
                        ProfileMenuItem(
                            title = "Agency Offices & Phone Numbers",
                            icon = Icons.Default.Phone,
                            subtitle = "Hyderabad and Bidar branch addresses",
                            onClick = onNavigateToContact
                        )
                    }
                }
            }
        }

        // Agency Branding & Version Footer
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = AppConfig.AGENCY_NAME,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Black,
                    color = PrimaryGreen
                )
                Text(
                    text = "Umrah Services Provider • Hyderabad & Karnataka",
                    fontSize = 10.sp,
                    color = Color.Gray
                )
                Text(
                    text = "App Version 2.5.0 (Kotlin Jetpack Compose)",
                    fontSize = 9.sp,
                    color = Color.LightGray,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun ProfileMenuItem(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    subtitle: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 14.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(36.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(CreamBackground)
                .border(1.dp, PremiumGold.copy(alpha = 0.5f), RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Icon(imageVector = icon, contentDescription = title, tint = PrimaryGreen, modifier = Modifier.size(18.dp))
        }
        Spacer(modifier = Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(text = title, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MainText)
            Text(text = subtitle, fontSize = 10.sp, color = Color.Gray)
        }
        Icon(imageVector = Icons.Default.KeyboardArrowRight, contentDescription = "Go", tint = Color.Gray, modifier = Modifier.size(20.dp))
    }
}

// -------------------------------------------------------------
// 9. VISA DOCS SCREEN
// -------------------------------------------------------------
@Composable
fun VisaDocsScreen(onBack: () -> Unit, onContact: () -> Unit) {
    val context = LocalContext.current

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(16.dp)
    ) {
        item {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp)
            ) {
                IconButton(onClick = onBack) {
                    Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back", tint = PrimaryGreen)
                }
                Text(
                    text = "Umrah Visa & Documents",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = PrimaryGreen
                )
            }
        }

        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "📋 Required Documents for Umrah", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 14.sp)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "• Original Passport (Minimum 6 months validity from travel date)", fontSize = 12.sp, color = MainText)
                    Text(text = "• 2 Recent Color Photos (35mm x 45mm, White Background, 80% face view)", fontSize = 12.sp, color = MainText)
                    Text(text = "• Copy of Indian PAN Card (Mandatory for TCS/LRS compliance)", fontSize = 12.sp, color = MainText)
                    Text(text = "• COVID-19 / Meningitis Vaccination Certificate", fontSize = 12.sp, color = MainText)
                }
            }
        }

        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "🕋 Ministry Guidelines & Mahram Rules", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 14.sp)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "• Women of any age are now permitted to perform Umrah with an organized group (Mahram is no longer required as per Ministry of Hajj & Umrah)", fontSize = 12.sp, color = MainText)
                    Text(text = "• Tourist e-Visa / Umrah Visa valid for 90 days stay inside the Kingdom", fontSize = 12.sp, color = MainText)
                    Text(text = "• Biometric registration via Saudi Bio App is handled by our staff", fontSize = 12.sp, color = MainText)
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
            Button(
                onClick = {
                    AppConfig.openWhatsApp(context, "Assalamu Alaikum, I need assistance with my Umrah Visa documents.")
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(imageVector = Icons.Default.Send, contentDescription = "WhatsApp", tint = Color.White)
                Spacer(modifier = Modifier.width(6.dp))
                Text("WhatsApp Visa Specialist", color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
    }
}

// -------------------------------------------------------------
// 10. HOTELS SCREEN
// -------------------------------------------------------------
@Composable
fun HotelsScreen() {
    val hotels = remember { MockDataProvider.hotels }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(14.dp)
    ) {
        items(hotels) { hotel ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(14.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
            ) {
                Column {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(130.dp)
                            .background(DeepGreen)
                    ) {
                        AsyncImage(
                            model = hotel.image,
                            contentDescription = hotel.name,
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Crop
                        )
                    }
                    Column(modifier = Modifier.padding(12.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(text = hotel.name, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = PrimaryGreen)
                            Text(text = "${hotel.starRating} ★", fontWeight = FontWeight.Bold, color = PremiumGold)
                        }
                        Text(text = "${hotel.city} · ${hotel.distanceFromHaram}", fontSize = 11.sp, color = Color.DarkGray)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(text = "Included Meal: ${hotel.mealsIncluded}", fontSize = 11.sp, color = PrimaryGreen)
                    }
                }
            }
        }
    }
}

// -------------------------------------------------------------
// 11. ZIYARAT SCREEN
// -------------------------------------------------------------
@Composable
fun ZiyaratScreen() {
    val places = remember { MockDataProvider.ziyaratPlaces }

    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(10.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(places) { place ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.3f))
            ) {
                Column {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(90.dp)
                            .background(DeepGreen)
                    ) {
                        AsyncImage(
                            model = place.image,
                            contentDescription = place.name,
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Crop
                        )
                    }
                    Column(modifier = Modifier.padding(8.dp)) {
                        Text(text = place.name, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = PrimaryGreen)
                        Text(text = place.city, fontSize = 10.sp, color = Color.Gray)
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(text = place.subName, fontSize = 10.sp, color = Color.DarkGray, maxLines = 1)
                    }
                }
            }
        }
    }
}

// -------------------------------------------------------------
// 12. CONTACT SCREEN
// -------------------------------------------------------------
@Composable
fun ContactScreen() {
    val context = LocalContext.current

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(16.dp)
    ) {
        item {
            Text(text = "Contact Al Hindwan Tours & Travels", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
            Text(text = "Licensed & Government Recognized Umrah Operator", fontSize = 11.sp, color = Color.Gray)
            Spacer(modifier = Modifier.height(14.dp))
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(text = "Head Office — Hyderabad", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 14.sp)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(text = "📞 ${AppConfig.PRIMARY_PHONE}", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                    Text(text = "📞 ${AppConfig.SECONDARY_PHONE}", fontSize = 12.sp)
                    Text(text = "📍 ${AppConfig.HEAD_OFFICE}", fontSize = 11.sp, color = Color.DarkGray)
                }
            }
            Spacer(modifier = Modifier.height(12.dp))
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.dp, PremiumGold.copy(alpha = 0.35f))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(text = "Branch Office — Manna Ekhelli (Bidar, Karnataka)", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 14.sp)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(text = "📞 ${AppConfig.BIDAR_BRANCH_PHONE}", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                    Text(text = "📍 ${AppConfig.BRANCH_OFFICE}", fontSize = 11.sp, color = Color.DarkGray)
                }
            }
            Spacer(modifier = Modifier.height(20.dp))
        }

        item {
            Button(
                onClick = { AppConfig.dialPhone(context, AppConfig.PRIMARY_PHONE) },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(imageVector = Icons.Default.Phone, contentDescription = "Call", tint = Color.White)
                Spacer(modifier = Modifier.width(6.dp))
                Text("Call Head Office (${AppConfig.PRIMARY_PHONE})", color = Color.White, fontWeight = FontWeight.Bold)
            }
            Spacer(modifier = Modifier.height(10.dp))
        }

        item {
            Button(
                onClick = {
                    AppConfig.openWhatsApp(context, "Assalamu Alaikum, I would like to enquire about Umrah packages and booking.")
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(imageVector = Icons.Default.Send, contentDescription = "WhatsApp", tint = Color.White)
                Spacer(modifier = Modifier.width(6.dp))
                Text("Open WhatsApp Booking Chat", color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
    }
}
