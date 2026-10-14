package com.alhindwan.tours

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Tour
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
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
                        onClick = { navController.navigate(Screen.Home.route) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen
                        )
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Tour, contentDescription = "Packages") },
                        label = { Text("Packages") },
                        selected = currentRoute == Screen.Packages.route,
                        onClick = { navController.navigate(Screen.Packages.route) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen
                        )
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.CalendarToday, contentDescription = "Booking") },
                        label = { Text("Booking") },
                        selected = currentRoute == Screen.MyBookings.route,
                        onClick = { navController.navigate(Screen.MyBookings.route) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen
                        )
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Person, contentDescription = "Profile") },
                        label = { Text("Profile") },
                        selected = currentRoute == Screen.Profile.route,
                        onClick = { navController.navigate(Screen.Profile.route) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Splash.route,
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            composable(Screen.Splash.route) {
                // Screen 1: Splash screen
            }
            composable(Screen.Home.route) {
                // Screen 2: Home screen with Kaaba banner & shortcuts
            }
            composable(Screen.Packages.route) {
                // Screen 3: Umrah Packages
            }
            composable(Screen.Search.route) {
                // Screen 4: Search & Filter
            }
            composable(Screen.PackageDetails.route) { backStackEntry ->
                val packageId = backStackEntry.arguments?.getString("packageId")
                // Screen 5: Package Details
            }
            composable(Screen.BookingForm.route) { backStackEntry ->
                // Screen 6: Booking Form
            }
            composable(Screen.PassengerDetails.route) {
                // Screen 7: Passenger Details
            }
            composable(Screen.Payment.route) {
                // Screen 8: Payment Screen
            }
            composable(Screen.VisaDocs.route) {
                // Screen 9: Visa & Documents
            }
            composable(Screen.Hotels.route) {
                // Screen 10: Hotel Details
            }
            composable(Screen.Ziyarat.route) {
                // Screen 11: Ziyarat Places
            }
            composable(Screen.Contact.route) {
                // Screen 12: Contact & WhatsApp Booking
            }
            composable(Screen.MyBookings.route) {
                // Customer Bookings
            }
            composable(Screen.Profile.route) {
                // Pilgrim Profile
            }
        }
    }
}
