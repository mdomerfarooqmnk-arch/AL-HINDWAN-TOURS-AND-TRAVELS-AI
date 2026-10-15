package com.alhindwan.tours.ui.screens

import android.content.Intent
import android.net.Uri
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
import com.alhindwan.tours.data.MockDataProvider
import com.alhindwan.tours.data.models.*
import com.alhindwan.tours.theme.*
import kotlinx.coroutines.delay

@Composable
fun SplashScreen(onNavigateToHome: () -> Unit) {
    var progress by remember { mutableFloatStateOf(0.15f) }

    LaunchedEffect(Unit) {
        while (progress < 1f) {
            delay(120)
            progress += 0.12f
        }
        delay(300)
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
                    .size(90.dp)
                    .clip(CircleShape)
                    .background(DeepGreen)
                    .border(2.dp, PremiumGold, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Place,
                    contentDescription = "Emblem",
                    tint = PremiumGold,
                    modifier = Modifier.size(48.dp)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "AL HINDWAN",
                color = PremiumGold,
                fontSize = 24.sp,
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
                progress = { progress },
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

@Composable
fun HomeScreen(
    onNavigateToPackages: () -> Unit,
    onNavigateToHotels: () -> Unit,
    onNavigateToVisa: () -> Unit,
    onNavigateToZiyarat: () -> Unit,
    onNavigateToBooking: (String) -> Unit,
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
        // App Bar
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
                        text = "AL HINDWAN TOURS",
                        color = PremiumGold,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Black
                    )
                    Text(
                        text = "Umrah Services · Hyderabad & Karnataka",
                        color = Color.White.copy(alpha = 0.8f),
                        fontSize = 10.sp
                    )
                }

                IconButton(onClick = onNavigateToContact) {
                    Icon(
                        imageVector = Icons.Default.Phone,
                        contentDescription = "Contact",
                        tint = PremiumGold
                    )
                }
            }
        }

        // Hero Banner
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = DeepGreen)
            ) {
                Box(modifier = Modifier.height(180.dp)) {
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
                                    listOf(Color.Transparent, Color.Black.copy(alpha = 0.85f))
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
                                text = "OFFICIAL UMRAH PACKAGE",
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
                        Spacer(modifier = Modifier.height(8.dp))
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
                    }
                }
            }
        }

        // Service Shortcuts
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
                ShortcutItem(title = "My Booking", icon = Icons.Default.DateRange, onClick = { onNavigateToBooking(featured.id) })
                ShortcutItem(title = "Contact", icon = Icons.Default.Phone, onClick = onNavigateToContact)
                ShortcutItem(
                    title = "WhatsApp",
                    icon = Icons.Default.Send,
                    isAccent = true,
                    onClick = {
                        val uri = Uri.parse("https://wa.me/919700762916?text=Assalamu%20Alaikum%20Al%20Hindwan%20Tours")
                        context.startActivity(Intent(Intent.ACTION_VIEW, uri))
                    }
                )
                ShortcutItem(title = "Profile", icon = Icons.Default.Person, onClick = onNavigateToContact)
            }
        }

        // Featured Packages
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

        items(packages) { pkg ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 14.dp, vertical = 6.dp)
                    .clickable { onNavigateToDetails(pkg.id) },
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = androidx.compose.foundation.BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
            ) {
                Row(modifier = Modifier.padding(12.dp)) {
                    AsyncImage(
                        model = pkg.thumbnail,
                        contentDescription = pkg.title,
                        modifier = Modifier
                            .size(72.dp)
                            .clip(RoundedCornerShape(10.dp)),
                        contentScale = ContentScale.Crop
                    )
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
                        Spacer(modifier = Modifier.height(4.dp))
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

        item {
            Spacer(modifier = Modifier.height(40.dp))
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

@Composable
fun PackagesScreen(onSelectPackage: (String) -> Unit) {
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
                    border = androidx.compose.foundation.BorderStroke(1.dp, PremiumGold),
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

        LazyColumn(modifier = Modifier.fillMaxSize().padding(12.dp)) {
            items(packages.filter { selectedCat == "All" || it.category == selectedCat }) { pkg ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp)
                        .clickable { onSelectPackage(pkg.id) },
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = androidx.compose.foundation.BorderStroke(1.dp, PremiumGold.copy(alpha = 0.5f))
                ) {
                    Column {
                        Box(modifier = Modifier.fillMaxWidth().height(140.dp)) {
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
                            Text(text = "📅 ${pkg.departureDate} (${pkg.durationDays} Days)", fontSize = 11.sp, color = Color.Gray)
                            Text(text = "✈️ ${pkg.airline} · ${pkg.route}", fontSize = 11.sp, color = Color.Gray)
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "₹${pkg.pricePerPerson}/-",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Black,
                                    color = PrimaryGreen
                                )
                                Button(
                                    onClick = { onSelectPackage(pkg.id) },
                                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
                                    shape = RoundedCornerShape(8.dp)
                                ) {
                                    Text("View Details", color = Color.White, fontSize = 11.sp)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun PackageDetailsScreen(packageId: String?, onBookNow: (String) -> Unit) {
    val pkg = MockDataProvider.packages.find { it.id == packageId } ?: MockDataProvider.packages.first()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
    ) {
        item {
            Box(modifier = Modifier.fillMaxWidth().height(200.dp)) {
                AsyncImage(
                    model = pkg.thumbnail,
                    contentDescription = pkg.title,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )
            }
        }

        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = pkg.title, fontSize = 17.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(text = "₹${pkg.pricePerPerson}/- Per Person", fontSize = 18.sp, fontWeight = FontWeight.Black, color = PremiumGold)
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(text = "Departure: ${pkg.departureDate}", fontSize = 12.sp, color = Color.DarkGray)
                    Text(text = "Return: ${pkg.returnDate}", fontSize = 12.sp, color = Color.DarkGray)
                    Text(text = "Flight: ${pkg.airline}", fontSize = 12.sp, color = Color.DarkGray)
                    Text(text = "Makkah Hotel: ${pkg.makkahHotel}", fontSize = 12.sp, color = Color.DarkGray)
                    Text(text = "Madinah Hotel: ${pkg.madinahHotel}", fontSize = 12.sp, color = Color.DarkGray)

                    Spacer(modifier = Modifier.height(14.dp))
                    Text(text = "Package Inclusions:", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 13.sp)
                    pkg.inclusions.forEach { inc ->
                        Text(text = "✓ $inc", fontSize = 11.sp, color = Color(0xFF0F5132), modifier = Modifier.padding(vertical = 1.dp))
                    }

                    Spacer(modifier = Modifier.height(18.dp))
                    Button(
                        onClick = { onBookNow(pkg.id) },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text(text = "Proceed to Booking →", color = Color.White, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}

@Composable
fun BookingFormScreen(packageId: String?, onConfirm: () -> Unit) {
    val pkg = MockDataProvider.packages.find { it.id == packageId } ?: MockDataProvider.packages.first()
    var passengerCount by remember { mutableIntStateOf(2) }
    var name by remember { mutableStateOf("Mohammed Omer Farooq") }
    var phone by remember { mutableStateOf("+91 9700762916") }
    var passport by remember { mutableStateOf("Z5849301") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(16.dp)
    ) {
        Text(text = "Umrah Booking Form", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
        Text(text = pkg.title, fontSize = 12.sp, color = Color.Gray)

        Spacer(modifier = Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(text = "Passengers Count", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = "$passengerCount Persons", fontSize = 15.sp, fontWeight = FontWeight.Black, color = PrimaryGreen)
                    Row {
                        IconButton(onClick = { if (passengerCount > 1) passengerCount-- }) {
                            Text("-", fontSize = 20.sp, fontWeight = FontWeight.Bold)
                        }
                        IconButton(onClick = { passengerCount++ }) {
                            Text("+", fontSize = 20.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Primary Pilgrim Name") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(
                    value = phone,
                    onValueChange = { phone = it },
                    label = { Text("WhatsApp Phone") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(
                    value = passport,
                    onValueChange = { passport = it },
                    label = { Text("Passport Number") },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = PrimaryGreen),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(text = "Total Payable Amount", color = Color.White.copy(alpha = 0.8f), fontSize = 11.sp)
                Text(
                    text = "₹${pkg.pricePerPerson * passengerCount}/-",
                    color = PremiumGold,
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Black
                )
            }
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = onConfirm,
            modifier = Modifier.fillMaxWidth().height(48.dp),
            colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
            shape = RoundedCornerShape(10.dp)
        ) {
            Text(text = "Confirm Reservation & Send WhatsApp", color = Color.White, fontWeight = FontWeight.Bold)
        }
    }
}

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
                border = androidx.compose.foundation.BorderStroke(1.dp, PremiumGold.copy(alpha = 0.4f))
            ) {
                Column {
                    AsyncImage(
                        model = hotel.image,
                        contentDescription = hotel.name,
                        modifier = Modifier.fillMaxWidth().height(130.dp),
                        contentScale = ContentScale.Crop
                    )
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
                border = androidx.compose.foundation.BorderStroke(1.dp, PremiumGold.copy(alpha = 0.3f))
            ) {
                Column {
                    AsyncImage(
                        model = place.image,
                        contentDescription = place.name,
                        modifier = Modifier.fillMaxWidth().height(90.dp),
                        contentScale = ContentScale.Crop
                    )
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

@Composable
fun ContactScreen() {
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBackground)
            .padding(16.dp)
    ) {
        Text(text = "Contact Al Hindwan Tours", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
        Spacer(modifier = Modifier.height(14.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(text = "Head Office — Hyderabad", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 14.sp)
                Spacer(modifier = Modifier.height(4.dp))
                Text(text = "📞 +91 9700762916", fontSize = 12.sp)
                Text(text = "📞 +91 8555943416", fontSize = 12.sp)
                Text(text = "📍 #18-13-6/74/3 to 8, Hashamabad, Chandrayangutta, Hyderabad, Telangana – 500053", fontSize = 11.sp, color = Color.DarkGray)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(text = "Branch Office — Manna Ekhelli", fontWeight = FontWeight.Bold, color = PrimaryGreen, fontSize = 14.sp)
                Spacer(modifier = Modifier.height(4.dp))
                Text(text = "📞 +91 9743481876", fontSize = 12.sp)
                Text(text = "📍 1st Floor, Gram Panchayat Building, Manna Ekhelli, Bidar District, Karnataka", fontSize = 11.sp, color = Color.DarkGray)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Button(
            onClick = {
                val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:+919700762916"))
                context.startActivity(intent)
            },
            modifier = Modifier.fillMaxWidth().height(48.dp),
            colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
            shape = RoundedCornerShape(10.dp)
        ) {
            Text("Call Office (+91 9700762916)", color = Color.White, fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(10.dp))

        Button(
            onClick = {
                val uri = Uri.parse("https://wa.me/919700762916?text=Assalamu%20Alaikum,%20I%20want%20to%20enquire%20about%20Umrah%20packages.")
                context.startActivity(Intent(Intent.ACTION_VIEW, uri))
            },
            modifier = Modifier.fillMaxWidth().height(48.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
            shape = RoundedCornerShape(10.dp)
        ) {
            Text("Open WhatsApp Booking", color = Color.White, fontWeight = FontWeight.Bold)
        }
    }
}
