package com.alhindwan.tours

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Phone
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
    object PackageDetails : Screen("package_details/{packageId}", "Package Details")
    object BookingForm : Screen("booking_form/{packageId}", "Booking Form")
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
                        onClick = {
                            if (currentRoute != Screen.Home.route) {
                                navController.navigate(Screen.Home.route) {
                                    popUpTo(Screen.Home.route) { inclusive = true }
                                    launchSingleTop = true
                                }
                            }
                        },
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
                        onClick = {
                            if (currentRoute != Screen.Packages.route) {
                                navController.navigate(Screen.Packages.route) {
                                    launchSingleTop = true
                                }
                            }
                        },
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
                        onClick = {
                            if (currentRoute != Screen.Ziyarat.route) {
                                navController.navigate(Screen.Ziyarat.route) {
                                    launchSingleTop = true
                                }
                            }
                        },
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
                        onClick = {
                            if (currentRoute != Screen.Contact.route) {
                                navController.navigate(Screen.Contact.route) {
                                    launchSingleTop = true
                                }
                            }
                        },
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
                    onNavigateToContact = { navController.navigate(Screen.Contact.route) { launchSingleTop = true } },
                    onNavigateToDetails = { pkgId -> navController.navigate("package_details/$pkgId") { launchSingleTop = true } }
                )
            }
            composable(Screen.Packages.route) {
                PackagesScreen(
                    onSelectPackage = { pkgId -> navController.navigate("package_details/$pkgId") { launchSingleTop = true } }
                )
            }
            composable(Screen.PackageDetails.route) { backStackEntry ->
                val packageId = backStackEntry.arguments?.getString("packageId")
                PackageDetailsScreen(
                    packageId = packageId,
                    onBookNow = { pkgId -> navController.navigate("booking_form/$pkgId") { launchSingleTop = true } }
                )
            }
            composable(Screen.BookingForm.route) { backStackEntry ->
                val packageId = backStackEntry.arguments?.getString("packageId")
                BookingFormScreen(
                    packageId = packageId,
                    onConfirm = {
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
