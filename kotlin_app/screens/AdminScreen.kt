package com.successempire.app.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.successempire.app.AppSettings
import com.successempire.app.AppNotification
import com.successempire.app.CinematicButton
import com.successempire.app.GlassCard
import com.successempire.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdminScreen(
    appSettings: AppSettings,
    onUpdateSettings: (AppSettings) -> Unit,
    onSendNotification: (String, String) -> Unit,
    onResetDatabase: () -> Unit,
    onBack: () -> Unit
) {
    var appTitleField by remember { mutableStateOf(appSettings.appName) }
    var whatsappField by remember { mutableStateOf(appSettings.whatsappLink) }
    var pushTitle by remember { mutableStateOf("") }
    var pushBody by remember { mutableStateOf("") }

    var adminStatusToast by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
            .verticalScroll(rememberScrollState())
            .padding(20.dp)
            .padding(bottom = 90.dp) // pad for bottom bars
    ) {
        // TOP BACK APP BAR
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.04f))
                    .clickable { onBack() },
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.ChevronLeft,
                    contentDescription = "Back",
                    tint = Color.White
                )
            }
            Text(
                text = "Admin Panel",
                color = Color.White,
                fontSize = 16.sp,
                fontWeight = FontWeight.Black
            )
            Box(modifier = Modifier.size(40.dp)) // empty spacer
        }

        Spacer(modifier = Modifier.height(24.dp))

        // SECTION 1: GLOBAL BRAND CONFIGS
        Text(
            text = "⚙️ PLATFORM SETTINGS",
            color = TextMuted,
            fontSize = 9.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 2.sp
        )

        Spacer(modifier = Modifier.height(10.dp))

        GlassCard(modifier = Modifier.fillMaxWidth()) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(
                    value = appTitleField,
                    onValueChange = { appTitleField = it },
                    label = { Text("App Brand Title", color = TextSecondary, fontSize = 10.sp) },
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        focusedBorderColor = PrimaryPurple,
                        unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                        textColor = Color.White
                    ),
                    modifier = Modifier.fillMaxWidth()
                )

                OutlinedTextField(
                    value = whatsappField,
                    onValueChange = { whatsappField = it },
                    label = { Text("WhatsApp Query Link", color = TextSecondary, fontSize = 10.sp) },
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        focusedBorderColor = PrimaryPurple,
                        unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                        textColor = Color.White
                    ),
                    modifier = Modifier.fillMaxWidth()
                )

                CinematicButton(
                    text = "SAVE PLATFORM CONFIGS",
                    modifier = Modifier.fillMaxWidth(),
                    onClick = {
                        val updated = appSettings.copy(
                            appName = appTitleField,
                            whatsappLink = whatsappField
                        )
                        onUpdateSettings(updated)
                        adminStatusToast = "Settings successfully updated! 🎉"
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        // SECTION 2: SEND BROADCAST NOTIFICATIONS
        Text(
            text = "📢 PUSH SYSTEM NOTIFICATION",
            color = TextMuted,
            fontSize = 9.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 2.sp
        )

        Spacer(modifier = Modifier.height(10.dp))

        GlassCard(modifier = Modifier.fillMaxWidth()) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(
                    value = pushTitle,
                    onValueChange = { pushTitle = it },
                    label = { Text("Notification Title", color = TextSecondary, fontSize = 10.sp) },
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        focusedBorderColor = PrimaryPurple,
                        unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                        textColor = Color.White
                    ),
                    modifier = Modifier.fillMaxWidth()
                )

                OutlinedTextField(
                    value = pushBody,
                    onValueChange = { pushBody = it },
                    label = { Text("Notification Body Text", color = TextSecondary, fontSize = 10.sp) },
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        focusedBorderColor = PrimaryPurple,
                        unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                        textColor = Color.White
                    ),
                    modifier = Modifier.fillMaxWidth()
                )

                CinematicButton(
                    text = "SEND BROADCAST ALERT",
                    modifier = Modifier.fillMaxWidth(),
                    onClick = {
                        if (pushTitle.isBlank() || pushBody.isBlank()) {
                            adminStatusToast = "Empty field entry! Kripya details bharein."
                            return@CinematicButton
                        }
                        onSendNotification(pushTitle, pushBody)
                        pushTitle = ""
                        pushBody = ""
                        adminStatusToast = "Broadcast notification sent! 🚀"
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        // SECTION 3: SYSTEM HARD SEED RESET
        Text(
            text = "⚠️ MAINTENANCE CONTROL",
            color = TextMuted,
            fontSize = 9.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 2.sp
        )

        Spacer(modifier = Modifier.height(10.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(AlertRed.copy(alpha = 0.08f))
                .border(1.dp, AlertRed.copy(alpha = 0.2f), RoundedCornerShape(16.dp))
                .clickable {
                    onResetDatabase()
                    appTitleField = "Success Empire"
                    whatsappField = "https://wa.me/917858036851?text=Hi,%20mujhe%20help%20chahiye"
                    adminStatusToast = "Database reset successfully! 🧹"
                }
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.DeleteSweep,
                    contentDescription = "Reset Database",
                    tint = AlertRed,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "RESET MOCK DATABASE SEEDS",
                    color = AlertRed,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 1.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Toast feedback box
        if (adminStatusToast.isNotEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.1f))
                    .padding(12.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = adminStatusToast,
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            LaunchedEffect(adminStatusToast) {
                kotlinx.coroutines.delay(2000)
                adminStatusToast = ""
            }
        }
    }
}
