package com.alhindwan.tours

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
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
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavGraph.Companion.findStartDestination
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
    object MyBookings : Screen("my_bookings", "My Bookings")
    object Profile : Screen("profile", "Profile")
    object PackageDetails : Screen("package_details/{packageId}", "Package Details")
    object BookingForm : Screen("booking_form/{packageId}", "Booking Form")
    object BookingConfirmation : Screen("booking_confirmation/{bookingId}", "Booking Confirmation")
    object VisaDocs : Screen("visa_docs", "Visa & Documents")
    object Hotels : Screen("hotels", "Hotel Details")
    object Ziyarat : Screen("ziyarat", "Ziyarat Places")
    object Contact : Screen("contact", "Contact Us")
}

@Composable
fun AlHindwanApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    // Show bottom bar on the 4 primary tabs
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
                    // Tab 1: Home
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                        label = { Text("Home") },
                        selected = currentRoute == Screen.Home.route,
                        onClick = {
                            if (currentRoute != Screen.Home.route) {
                                navController.navigate(Screen.Home.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen,
                            unselectedIconColor = Color.White.copy(alpha = 0.85f),
                            unselectedTextColor = Color.White.copy(alpha = 0.85f)
                        )
                    )

                    // Tab 2: Packages
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Place, contentDescription = "Packages") },
                        label = { Text("Packages") },
                        selected = currentRoute == Screen.Packages.route,
                        onClick = {
                            if (currentRoute != Screen.Packages.route) {
                                navController.navigate(Screen.Packages.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen,
                            unselectedIconColor = Color.White.copy(alpha = 0.85f),
                            unselectedTextColor = Color.White.copy(alpha = 0.85f)
                        )
                    )

                    // Tab 3: My Bookings
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.DateRange, contentDescription = "My Bookings") },
                        label = { Text("My Bookings") },
                        selected = currentRoute == Screen.MyBookings.route,
                        onClick = {
                            if (currentRoute != Screen.MyBookings.route) {
                                navController.navigate(Screen.MyBookings.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen,
                            unselectedIconColor = Color.White.copy(alpha = 0.85f),
                            unselectedTextColor = Color.White.copy(alpha = 0.85f)
                        )
                    )

                    // Tab 4: Profile
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Person, contentDescription = "Profile") },
                        label = { Text("Profile") },
                        selected = currentRoute == Screen.Profile.route,
                        onClick = {
                            if (currentRoute != Screen.Profile.route) {
                                navController.navigate(Screen.Profile.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PremiumGold,
                            selectedTextColor = PremiumGold,
                            indicatorColor = DeepGreen,
                            unselectedIconColor = Color.White.copy(alpha = 0.85f),
                            unselectedTextColor = Color.White.copy(alpha = 0.85f)
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
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Home.route) {
                HomeScreen(
                    onNavigateToPackages = { navController.navigate(Screen.Packages.route) { launchSingleTop = true } },
                    onNavigateToHotels = { navController.navigate(Screen.Hotels.route) { launchSingleTop = true } },
                    onNavigateToVisa = { navController.navigate(Screen.VisaDocs.route) { launchSingleTop = true } },
                    onNavigateToZiyarat = { navController.navigate(Screen.Ziyarat.route) { launchSingleTop = true } },
                    onNavigateToBooking = { pkgId -> navController.navigate("booking_form/$pkgId") { launchSingleTop = true } },
                    onNavigateToMyBookings = { navController.navigate(Screen.MyBookings.route) { launchSingleTop = true } },
                    onNavigateToProfile = { navController.navigate(Screen.Profile.route) { launchSingleTop = true } },
                    onNavigateToContact = { navController.navigate(Screen.Contact.route) { launchSingleTop = true } },
                    onNavigateToDetails = { pkgId -> navController.navigate("package_details/$pkgId") { launchSingleTop = true } }
                )
            }
            composable(Screen.Packages.route) {
                PackagesScreen(
                    onSelectPackage = { pkgId -> navController.navigate("package_details/$pkgId") { launchSingleTop = true } },
                    onBookPackage = { pkgId -> navController.navigate("booking_form/$pkgId") { launchSingleTop = true } }
                )
            }
            composable(Screen.MyBookings.route) {
                MyBookingsScreen(
                    onNavigateToPackages = { navController.navigate(Screen.Packages.route) { launchSingleTop = true } },
                    onBookPackage = { pkgId -> navController.navigate("booking_form/$pkgId") { launchSingleTop = true } }
                )
            }
            composable(Screen.Profile.route) {
                ProfileScreen(
                    onNavigateToMyBookings = { navController.navigate(Screen.MyBookings.route) { launchSingleTop = true } },
                    onNavigateToVisaDocs = { navController.navigate(Screen.VisaDocs.route) { launchSingleTop = true } },
                    onNavigateToContact = { navController.navigate(Screen.Contact.route) { launchSingleTop = true } }
                )
            }
            composable(Screen.PackageDetails.route) { backStackEntry ->
                val packageId = backStackEntry.arguments?.getString("packageId")
                PackageDetailsScreen(
                    packageId = packageId,
                    onBack = { navController.popBackStack() },
                    onBookNow = { pkgId -> navController.navigate("booking_form/$pkgId") { launchSingleTop = true } }
                )
            }
            composable(Screen.BookingForm.route) { backStackEntry ->
                val packageId = backStackEntry.arguments?.getString("packageId")
                BookingFormScreen(
                    packageId = packageId,
                    onBookingSuccess = { bookingId ->
                        navController.navigate("booking_confirmation/$bookingId") {
                            popUpTo(Screen.Home.route)
                            launchSingleTop = true
                        }
                    },
                    onBack = { navController.popBackStack() }
                )
            }
            composable(Screen.BookingConfirmation.route) { backStackEntry ->
                val bookingId = backStackEntry.arguments?.getString("bookingId")
                BookingConfirmationScreen(
                    bookingId = bookingId,
                    onNavigateToMyBookings = {
                        navController.navigate(Screen.MyBookings.route) {
                            popUpTo(Screen.Home.route)
                            launchSingleTop = true
                        }
                    },
                    onNavigateToHome = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Home.route) { inclusive = true }
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.VisaDocs.route) {
                VisaDocsScreen(
                    onBack = { navController.popBackStack() },
                    onContact = { navController.navigate(Screen.Contact.route) { launchSingleTop = true } }
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
