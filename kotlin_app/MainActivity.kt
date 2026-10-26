package com.successempire.app

import android.os.Bundle
import android.app.Activity
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.ui.platform.LocalContext
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.successempire.app.screens.*
import com.successempire.app.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val window = this.window
        WindowCompat.setDecorFitsSystemWindows(window, false)
        val insetsController = WindowCompat.getInsetsController(window, window.decorView)
        insetsController.hide(WindowInsetsCompat.Type.statusBars())
        insetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        setContent {
            SuccessEmpireTheme {
                MainAppContainer()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainAppContainer() {
    val context = LocalContext.current
    val activity = context as? Activity
    val navHistoryStack = remember { mutableStateListOf<String>() }
    var isGoingBack by remember { mutableStateOf(false) }
    var lastBackPressTime by remember { mutableStateOf(0L) }
    var showPaymentCancelDialog by remember { mutableStateOf(false) }

    // APP CENTRAL STATE MANAGEMENT
    var currentRoute by remember { mutableStateOf("splash") } // splash, onboarding, auth, main, package_detail, player, admin, notifications, payment, payment_success
    var activeTab by remember { mutableStateOf("home") } // home, explore, profile
    
    var selectedPackageId by remember { mutableStateOf(1) }
    var selectedLessonId by remember { mutableStateOf(101) }

    // User authentication state
    var isLoggedIn by remember { mutableStateOf(false) }
    var isAdmin by remember { mutableStateOf(false) }
    var userName by remember { mutableStateOf("") }
    var userEmail by remember { mutableStateOf("") }

    // Dynamic Lists seeded from MockData
    var packages by remember { mutableStateOf(MockData.DEFAULT_PACKAGES.toList()) }
    var purchasedPackages by remember { mutableStateOf(mutableListOf(1)) } // Seed Package 1 as purchased initially
    var completedLessons by remember { mutableStateOf(mutableListOf<Int>()) }
    var favoriteLessons by remember { mutableStateOf(mutableListOf<Lesson>()) }
    var downloadedLessons by remember { mutableStateOf(mutableListOf<Int>()) }
    var notifications by remember { mutableStateOf(MockData.DEFAULT_NOTIFICATIONS.toMutableList()) }
    var appSettings by remember { mutableStateOf(MockData.DEFAULT_SETTINGS) }

    // Payment variables
    var payingPackageId by remember { mutableStateOf(1) }
    var paymentProcessing by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    // central notifications read trigger
    val unreadNotificationsCount = remember(notifications) {
        notifications.count { !it.isRead }
    }

    LaunchedEffect(currentRoute) {
        if (isGoingBack) {
            isGoingBack = false
            return@LaunchedEffect
        }
        if (currentRoute == "main" || currentRoute == "auth" || currentRoute == "splash") {
            navHistoryStack.clear()
        } else {
            if (navHistoryStack.isEmpty() || navHistoryStack.last() != currentRoute) {
                navHistoryStack.add(currentRoute)
            }
        }
    }

    BackHandler(enabled = true) {
        if (currentRoute == "payment" && paymentProcessing) {
            showPaymentCancelDialog = true
            return@BackHandler
        }

        if (navHistoryStack.isNotEmpty()) {
            val prevRoute = navHistoryStack.removeLast()
            isGoingBack = true
            currentRoute = prevRoute
            return@BackHandler
        }

        if (currentRoute == "main") {
            val currentTime = System.currentTimeMillis()
            if (currentTime - lastBackPressTime < 2000) {
                activity?.finish()
            } else {
                lastBackPressTime = currentTime
                Toast.makeText(context, "Back again to exit", Toast.LENGTH_SHORT).show()
            }
            return@BackHandler
        }

        activity?.finish()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
    ) {
        // --- ROUTING HANDLER VIEWS ---
        when (currentRoute) {
            "splash" -> {
                SplashScreen(onSplashComplete = {
                    currentRoute = "onboarding"
                })
            }

            "onboarding" -> {
                OnboardingScreen(onComplete = {
                    currentRoute = "auth"
                })
            }

            "auth" -> {
                AuthScreen(
                    onLoginSuccess = { isUserAdmin, email, name ->
                        isLoggedIn = true
                        isAdmin = isUserAdmin
                        userEmail = email
                        userName = name
                        currentRoute = "main"
                        activeTab = "home"
                    },
                    onGuestLogin = {
                        isLoggedIn = false
                        isAdmin = false
                        userEmail = "guest.learner@successempire.com"
                        userName = "Guest Student"
                        currentRoute = "main"
                        activeTab = "home"
                    }
                )
            }

            "main" -> {
                Box(modifier = Modifier.fillMaxSize()) {
                    when (activeTab) {
                        "home" -> {
                            MainDashboard(
                                appSettings = appSettings,
                                packages = packages,
                                purchasedPackages = purchasedPackages,
                                unreadCount = unreadNotificationsCount,
                                onNavigateToPackage = { pkgId ->
                                    selectedPackageId = pkgId
                                    currentRoute = "package_detail"
                                },
                                onNavigateToNotifications = {
                                    currentRoute = "notifications"
                                },
                                onNavigateToProfile = {
                                    activeTab = "profile"
                                }
                            )
                        }

                        "explore" -> {
                            ExploreScreen(
                                packages = packages,
                                purchasedPackages = purchasedPackages,
                                onNavigateToLesson = { pkgId, lessonId ->
                                    selectedPackageId = pkgId
                                    selectedLessonId = lessonId
                                    val isPurchased = purchasedPackages.contains(pkgId)
                                    if (isPurchased) {
                                        currentRoute = "player"
                                    } else {
                                        currentRoute = "package_detail"
                                    }
                                }
                            )
                        }

                        "profile" -> {
                            ProfileScreen(
                                userName = userName,
                                userEmail = userEmail,
                                packages = packages,
                                purchasedPackages = purchasedPackages,
                                completedLessons = completedLessons,
                                appSettings = appSettings,
                                onUpdateSettings = { appSettings = it },
                                onLogout = {
                                    isLoggedIn = false
                                    isAdmin = false
                                    userName = ""
                                    userEmail = ""
                                    currentRoute = "auth"
                                },
                                onNavigateToPackage = { pkgId ->
                                    selectedPackageId = pkgId
                                    currentRoute = "package_detail"
                                }
                            )
                        }
                    }

                    // --- INTEGRATED BOTTOM NAV BAR WIDGET ---
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .padding(bottom = 12.dp)
                            .fillMaxWidth(0.9f)
                            .height(64.dp)
                            .clip(RoundedCornerShape(20.dp))
                            .background(DarkSurface)
                            .border(1.dp, Color.White.copy(alpha = 0.08f), RoundedCornerShape(20.dp))
                            .padding(horizontal = 12.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(
                            modifier = Modifier.fillMaxSize(),
                            horizontalArrangement = Arrangement.SpaceAround,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            // Home Tab
                            BottomNavItem(
                                label = "Home",
                                icon = Icons.Default.Home,
                                isSelected = activeTab == "home",
                                onClick = { activeTab = "home" }
                            )

                            // Search Tab
                            BottomNavItem(
                                label = "Explore",
                                icon = Icons.Default.Search,
                                isSelected = activeTab == "explore",
                                onClick = { activeTab = "explore" }
                            )

                            // Profile Tab
                            BottomNavItem(
                                label = "Profile",
                                icon = Icons.Default.Person,
                                isSelected = activeTab == "profile",
                                onClick = { activeTab = "profile" }
                            )

                            // Admin control tab visible only if logged in as Admin
                            if (isAdmin) {
                                BottomNavItem(
                                    label = "Admin",
                                    icon = Icons.Default.AdminPanelSettings,
                                    isSelected = false,
                                    onClick = { currentRoute = "admin" }
                                )
                            }
                        }
                    }
                }
            }

            "package_detail" -> {
                PackageDetailScreen(
                    packageId = selectedPackageId,
                    packages = packages,
                    purchasedPackages = purchasedPackages,
                    favoriteLessons = favoriteLessons,
                    onToggleFavorite = { fav ->
                        if (favoriteLessons.any { it.id == fav.id }) {
                            favoriteLessons.removeIf { it.id == fav.id }
                        } else {
                            favoriteLessons.add(fav)
                        }
                    },
                    onBack = { currentRoute = "main" },
                    onNavigateToPlayer = { pkgId, lessonId ->
                        selectedPackageId = pkgId
                        selectedLessonId = lessonId
                        currentRoute = "player"
                    },
                    onNavigateToPayment = { pkgId ->
                        payingPackageId = pkgId
                        currentRoute = "payment"
                    }
                )
            }

            "player" -> {
                VideoPlayerScreen(
                    packageId = selectedPackageId,
                    lessonId = selectedLessonId,
                    packages = packages,
                    completedLessons = completedLessons,
                    downloadedLessons = downloadedLessons,
                    favoriteLessons = favoriteLessons,
                    userEmail = userEmail,
                    onToggleCompleted = { lId ->
                        if (completedLessons.contains(lId)) {
                            completedLessons.remove(lId)
                        } else {
                            completedLessons.add(lId)
                        }
                    },
                    onToggleFavorite = { fav ->
                        if (favoriteLessons.any { it.id == fav.id }) {
                            favoriteLessons.removeIf { it.id == fav.id }
                        } else {
                            favoriteLessons.add(fav)
                        }
                    },
                    onToggleDownload = { download ->
                        if (downloadedLessons.contains(download.id)) {
                            downloadedLessons.remove(download.id)
                        } else {
                            downloadedLessons.add(download.id)
                        }
                    },
                    onBack = { currentRoute = "package_detail" },
                    onNavigateToLesson = { pkgId, lessonId ->
                        selectedPackageId = pkgId
                        selectedLessonId = lessonId
                    }
                )
            }

            "admin" -> {
                AdminScreen(
                    appSettings = appSettings,
                    onUpdateSettings = { appSettings = it },
                    onSendNotification = { title, body ->
                        notifications.add(
                            0,
                            AppNotification(
                                id = notifications.size + 1,
                                title = title,
                                body = body,
                                timestamp = "1 sec ago"
                            )
                        )
                    },
                    onResetDatabase = {
                        purchasedPackages = mutableListOf(1)
                        completedLessons = mutableListOf()
                        favoriteLessons = mutableListOf()
                        downloadedLessons = mutableListOf()
                        notifications = MockData.DEFAULT_NOTIFICATIONS.toMutableList()
                        appSettings = MockData.DEFAULT_SETTINGS
                    },
                    onBack = { currentRoute = "main" }
                )
            }

            "notifications" -> {
                NotificationsScreen(
                    notifications = notifications,
                    onClearAll = {
                        notifications.clear()
                    },
                    onMarkAllRead = {
                        notifications.forEach { it.isRead = true }
                    },
                    onBack = { currentRoute = "main" }
                )
            }

            "payment" -> {
                val pkg = packages.find { it.id == payingPackageId }
                if (pkg != null) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(DarkBg)
                            .padding(24.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        if (paymentProcessing) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.Center
                            ) {
                                CircularProgressIndicator(
                                    color = PrimaryPurple,
                                    modifier = Modifier.size(56.dp)
                                )
                                Spacer(modifier = Modifier.height(16.dp))
                                Text("Connecting to Razorpay gateway...", color = Color.White, fontSize = 14.sp)
                                Spacer(modifier = Modifier.height(4.dp))
                                Text("Kripya back button press na karein.", color = TextSecondary, fontSize = 10.sp)
                            }
                        } else {
                            Column(
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.ChevronLeft,
                                        contentDescription = "Back",
                                        tint = Color.White,
                                        modifier = Modifier.clickable { currentRoute = "package_detail" }
                                    )
                                    Spacer(modifier = Modifier.width(12.dp))
                                    Text("Checkout details", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                                }

                                Spacer(modifier = Modifier.height(24.dp))

                                GlassCard(modifier = Modifier.fillMaxWidth()) {
                                    Row {
                                        Box(
                                            modifier = Modifier
                                                .size(60.dp)
                                                .clip(RoundedCornerShape(8.dp))
                                                .background(Color.White.copy(alpha = 0.05f))
                                        )
                                        Spacer(modifier = Modifier.width(16.dp))
                                        Column {
                                            Text(pkg.title, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                                            Text("By ${pkg.instructor}", color = TextSecondary, fontSize = 10.sp)
                                            Spacer(modifier = Modifier.height(4.dp))
                                            Text("₹${pkg.price}", color = PrimaryPurple, fontSize = 14.sp, fontWeight = FontWeight.Black)
                                        }
                                    }
                                }

                                Spacer(modifier = Modifier.height(24.dp))

                                Text("Select simulated payment method", color = TextSecondary, fontSize = 11.sp, fontWeight = FontWeight.Bold)

                                Spacer(modifier = Modifier.height(10.dp))

                                listOf("UPI / Google Pay", "Credit or Debit Card", "Net Banking").forEachIndexed { index, method ->
                                    val isSel = index == 0
                                    Row(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .padding(vertical = 4.dp)
                                            .clip(RoundedCornerShape(12.dp))
                                            .background(if (isSel) PrimaryPurple.copy(alpha = 0.1f) else Color.White.copy(alpha = 0.02f))
                                            .border(1.dp, if (isSel) PrimaryPurple else Color.White.copy(alpha = 0.08f), RoundedCornerShape(12.dp))
                                            .padding(16.dp),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(method, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                        if (isSel) {
                                            Icon(Icons.Default.CheckCircle, contentDescription = "Active", tint = SuccessGreen)
                                        }
                                    }
                                }

                                Spacer(modifier = Modifier.weight(1f))

                                CinematicButton(
                                    text = "PAY SECURELY WITH RAZORPAY",
                                    modifier = Modifier.fillMaxWidth(),
                                    onClick = {
                                        paymentProcessing = true
                                        scope.launch {
                                            delay(2500)
                                            paymentProcessing = false
                                            purchasedPackages.add(payingPackageId)
                                            currentRoute = "payment_success"
                                        }
                                    }
                                )
                            }
                        }
                    }
                }
            }

            "payment_success" -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(DarkBg)
                        .padding(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Box(
                            modifier = Modifier
                                .size(80.dp)
                                .clip(CircleShape)
                                .background(SuccessGreen.copy(alpha = 0.15f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = "Success",
                                tint = SuccessGreen,
                                modifier = Modifier.size(48.dp)
                            )
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        Text("Payment Successful! 🎉", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Black)

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = "Course package features unlocked successfully. Invoice copy sent to email.",
                            color = TextSecondary,
                            fontSize = 12.sp,
                            textAlign = TextAlign.Center,
                            modifier = Modifier.padding(horizontal = 16.dp)
                        )

                        Spacer(modifier = Modifier.height(36.dp))

                        CinematicButton(
                            text = "START LEARNING NOW",
                            modifier = Modifier.fillMaxWidth(0.8f),
                            onClick = {
                                selectedPackageId = payingPackageId
                                currentRoute = "package_detail"
                            }
                        )
                    }
                }
            }
        }
    }

    if (showPaymentCancelDialog) {
        AlertDialog(
            onDismissRequest = { showPaymentCancelDialog = false },
            title = {
                Text(
                    text = "Cancel Payment?",
                    color = Color.White,
                    fontWeight = FontWeight.Black,
                    fontSize = 18.sp
                )
            },
            text = {
                Text(
                    text = "Are you sure you want to cancel payment? Processing payment cancel karne se package unlock nahi hoga.",
                    color = TextSecondary,
                    fontSize = 13.sp
                )
            },
            confirmButton = {
                Button(
                    onClick = {
                        showPaymentCancelDialog = false
                        paymentProcessing = false
                        currentRoute = "package_detail"
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = AlertRed)
                ) {
                    Text("Yes, Cancel", color = Color.White, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(
                    onClick = { showPaymentCancelDialog = false }
                ) {
                    Text("No, Continue", color = Color.White, fontWeight = FontWeight.Bold)
                }
            },
            containerColor = DarkSurface,
            shape = RoundedCornerShape(24.dp)
        )
    }
}

@Composable
fun BottomNavItem(
    label: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier
            .clip(RoundedCornerShape(12.dp))
            .clickable { onClick() }
            .padding(horizontal = 12.dp, vertical = 6.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = if (isSelected) PrimaryPurple else TextSecondary,
            modifier = Modifier.size(22.dp)
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = label,
            color = if (isSelected) Color.White else TextSecondary,
            fontSize = 9.sp,
            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
        )
    }
}
