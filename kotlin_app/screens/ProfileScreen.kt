package com.successempire.app.screens

import androidx.compose.animation.*
import androidx.compose.foundation.*
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
import com.successempire.app.*
import com.successempire.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    userName: String,
    userEmail: String,
    packages: List<CoursePackage>,
    purchasedPackages: List<Int>,
    completedLessons: List<Int>,
    appSettings: AppSettings,
    onUpdateSettings: (AppSettings) -> Unit,
    onLogout: () -> Unit,
    onNavigateToPackage: (Int) -> Unit
) {
    var showSettingsDialog by remember { mutableStateOf(false) }

    // Settings editable fields
    var appNameField by remember { mutableStateOf(appSettings.appName) }
    var whatsappField by remember { mutableStateOf(appSettings.whatsappLink) }
    var youtubeField by remember { mutableStateOf(appSettings.youtubeLink) }
    var instagramField by remember { mutableStateOf(appSettings.instagramLink) }

    // Enrolled packages statistics
    val enrolledPackages = remember(packages, purchasedPackages) {
        packages.filter { purchasedPackages.contains(it.id) }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
            .verticalScroll(rememberScrollState())
            .padding(bottom = 90.dp) // padding bottom bar
    ) {
        Spacer(modifier = Modifier.height(24.dp))

        // HEADER ROW WITH SETTINGS GEAR
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "My Profile",
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black
            )

            IconButton(
                onClick = { showSettingsDialog = true },
                modifier = Modifier
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.04f))
            ) {
                Icon(
                    imageVector = Icons.Default.Settings,
                    contentDescription = "Edit Settings",
                    tint = Color.White
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // STUDENT AVATAR CARD
        GlassCard(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            cornerRadius = 24.dp
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(68.dp)
                        .clip(CircleShape)
                        .background(
                            brush = Brush.linearGradient(
                                colors = listOf(PrimaryPurple, SecondaryPink)
                            )
                        )
                        .padding(2.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .clip(CircleShape)
                            .background(Color.DarkGray),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("👨‍🎓", fontSize = 28.sp)
                    }
                }

                Spacer(modifier = Modifier.width(20.dp))

                Column {
                    Text(
                        text = userName,
                        color = Color.White,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = userEmail,
                        color = TextSecondary,
                        fontSize = 11.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(GoldAccent.copy(alpha = 0.15f))
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "👑 EMPIRE MEMBER",
                            color = GoldAccent,
                            fontSize = 8.sp,
                            fontWeight = FontWeight.Black
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // AFFILIATE / PROGRESS METRICS GRID
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Box 1: Total Completed Lectures
            GlassCard(
                modifier = Modifier.weight(1f),
                cornerRadius = 20.dp
            ) {
                Column {
                    Text(
                        text = "COMPLETED",
                        color = TextSecondary,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Black,
                        letterSpacing = 1.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "${completedLessons.size} Lectures",
                        color = Color.White,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Black
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Keep it up! 👍",
                        color = SuccessGreen,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            // Box 2: Affiliate Rank
            GlassCard(
                modifier = Modifier.weight(1f),
                cornerRadius = 20.dp
            ) {
                Column {
                    Text(
                        text = "AFFILIATE EARNINGS",
                        color = TextSecondary,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Black,
                        letterSpacing = 1.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "₹12,450",
                        color = Color.White,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Black
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Rank: Gold Star ⭐",
                        color = GoldAccent,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        // ENROLLED PACKAGES LIST
        Text(
            text = "🎓 MY PURCHASED PACKAGES",
            color = Color.White,
            fontSize = 13.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 1.sp,
            modifier = Modifier.padding(horizontal = 20.dp)
        )

        Spacer(modifier = Modifier.height(12.dp))

        if (enrolledPackages.isEmpty()) {
            GlassCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                cornerRadius = 20.dp
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = "You are not enrolled in any course yet!",
                        color = TextSecondary,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Visit Home to explore premium Indian Muslim classes.",
                        color = TextMuted,
                        fontSize = 10.sp,
                        textAlign = TextAlign.Center
                    )
                }
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                enrolledPackages.forEach { pkg ->
                    // Calculate completion percentage
                    val totalLectures = pkg.lessons.size
                    val completedCount = pkg.lessons.count { completedLessons.contains(it.id) }
                    val percent = if (totalLectures > 0) (completedCount * 100) / totalLectures else 0

                    GlassCard(
                        modifier = Modifier.fillMaxWidth(),
                        cornerRadius = 20.dp,
                        onClick = { onNavigateToPackage(pkg.id) }
                    ) {
                        Column {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = pkg.title,
                                        color = Color.White,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                    Spacer(modifier = Modifier.height(2.dp))
                                    Text(
                                        text = "$completedCount of $totalLectures lessons done",
                                        color = TextSecondary,
                                        fontSize = 10.sp
                                    )
                                }

                                CircularProgressIndicator(
                                    progress = percent / 100f,
                                    color = SuccessGreen,
                                    strokeWidth = 3.dp,
                                    modifier = Modifier.size(28.dp)
                                )
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(4.dp)
                                    .clip(CircleShape)
                                    .background(Color.White.copy(alpha = 0.05f))
                            ) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxHeight()
                                        .fillMaxWidth(percent / 100f)
                                        .background(PrimaryPurple)
                                )
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        // SOCIAL HANDLES LINKS BUTTONS
        Text(
            text = "🤝 SUPPORT & EMPIRE HANDLES",
            color = Color.White,
            fontSize = 13.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 1.sp,
            modifier = Modifier.padding(horizontal = 20.dp)
        )

        Spacer(modifier = Modifier.height(12.dp))

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf(
                "WhatsApp" to SuccessGreen,
                "YouTube" to AlertRed,
                "Instagram" to SecondaryPink
            ).forEach { (label, tintColor) ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color.White.copy(alpha = 0.03f))
                        .border(1.dp, Color.White.copy(alpha = 0.05f), RoundedCornerShape(12.dp))
                        .clickable { /* Trigger Intent URL open */ }
                        .padding(vertical = 12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = label,
                        color = tintColor,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // LOGOUT ACTION
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(AlertRed.copy(alpha = 0.08f))
                .border(1.dp, AlertRed.copy(alpha = 0.2f), RoundedCornerShape(16.dp))
                .clickable { onLogout() }
                .padding(vertical = 16.dp),
            contentAlignment = Alignment.Center
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Logout,
                    contentDescription = "Logout",
                    tint = AlertRed,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "LOGOUT ACCOUNT",
                    color = AlertRed,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 1.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))
    }

    // SYSTEM OVERRIDE SETTINGS DIALOG VIEW
    if (showSettingsDialog) {
        AlertDialog(
            onDismissRequest = { showSettingsDialog = false },
            title = {
                Text(
                    text = "Application Settings",
                    color = Color.White,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    OutlinedTextField(
                        value = appNameField,
                        onValueChange = { appNameField = it },
                        label = { Text("App Brand Title", color = TextSecondary, fontSize = 10.sp) },
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            focusedBorderColor = PrimaryPurple,
                            textColor = Color.White
                        )
                    )
                    OutlinedTextField(
                        value = whatsappField,
                        onValueChange = { whatsappField = it },
                        label = { Text("WhatsApp Query Link", color = TextSecondary, fontSize = 10.sp) },
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            focusedBorderColor = PrimaryPurple,
                            textColor = Color.White
                        )
                    )
                    OutlinedTextField(
                        value = youtubeField,
                        onValueChange = { youtubeField = it },
                        label = { Text("YouTube Channel Link", color = TextSecondary, fontSize = 10.sp) },
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            focusedBorderColor = PrimaryPurple,
                            textColor = Color.White
                        )
                    )
                    OutlinedTextField(
                        value = instagramField,
                        onValueChange = { instagramField = it },
                        label = { Text("Instagram Account Link", color = TextSecondary, fontSize = 10.sp) },
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            focusedBorderColor = PrimaryPurple,
                            textColor = Color.White
                        )
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val updated = appSettings.copy(
                            appName = appNameField,
                            whatsappLink = whatsappField,
                            youtubeLink = youtubeField,
                            instagramLink = instagramField
                        )
                        onUpdateSettings(updated)
                        showSettingsDialog = false
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryPurple)
                ) {
                    Text("SAVE CHANGES", color = Color.White, fontSize = 11.sp)
                }
            },
            dismissButton = {
                TextButton(onClick = { showSettingsDialog = false }) {
                    Text("CANCEL", color = TextSecondary, fontSize = 11.sp)
                }
            },
            containerColor = DarkSurface,
            shape = RoundedCornerShape(20.dp)
        )
    }
}
