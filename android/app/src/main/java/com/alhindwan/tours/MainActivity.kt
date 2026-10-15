package com.alhindwan.tours

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Place
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

import com.alhindwan.tours.ui.screens.*

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
        Screen.Hotels.route,
        Screen.Ziyarat.route,
        Screen.Contact.route
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
                        icon = { Icon(Icons.Default.Place, contentDescription = "Packages") },
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
                        icon = { Icon(Icons.Default.LocationOn, contentDescription = "Ziyarat") },
                        label = { Text("Ziyarat") },
                        selected = currentRoute == Screen.Ziyarat.route,
                        onClick = { navController.navigate(Screen.Ziyarat.route) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen
                        )
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Phone, contentDescription = "Contact") },
                        label = { Text("Contact") },
                        selected = currentRoute == Screen.Contact.route,
                        onClick = { navController.navigate(Screen.Contact.route) },
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
                SplashScreen(
                    onNavigateToHome = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Splash.route) { inclusive = true }
                        }
                    }
                )
            }
            composable(Screen.Home.route) {
                HomeScreen(
                    onNavigateToPackages = { navController.navigate(Screen.Packages.route) },
                    onNavigateToHotels = { navController.navigate(Screen.Hotels.route) },
                    onNavigateToVisa = { navController.navigate(Screen.Hotels.route) },
                    onNavigateToZiyarat = { navController.navigate(Screen.Ziyarat.route) },
                    onNavigateToBooking = { pkgId -> navController.navigate("booking_form/$pkgId") },
                    onNavigateToContact = { navController.navigate(Screen.Contact.route) },
                    onNavigateToDetails = { pkgId -> navController.navigate("package_details/$pkgId") }
                )
            }
            composable(Screen.Packages.route) {
                PackagesScreen(
                    onSelectPackage = { pkgId -> navController.navigate("package_details/$pkgId") }
                )
            }
            composable(Screen.PackageDetails.route) { backStackEntry ->
                val packageId = backStackEntry.arguments?.getString("packageId")
                PackageDetailsScreen(
                    packageId = packageId,
                    onBookNow = { pkgId -> navController.navigate("booking_form/$pkgId") }
                )
            }
            composable(Screen.BookingForm.route) { backStackEntry ->
                val packageId = backStackEntry.arguments?.getString("packageId")
                BookingFormScreen(
                    packageId = packageId,
                    onConfirm = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Home.route) { inclusive = true }
                        }
                    }
                )
            }
            composable(Screen.Hotels.route) {
                HotelsScreen()
            }
            composable(Screen.Ziyarat.route) {
                ZiyaratScreen()
            }
            composable(Screen.Contact.route) {
                ContactScreen()
            }
        }
    }
}
