package com.successempire.app.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.shape.CircleShape
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
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.successempire.app.CinematicButton
import com.successempire.app.GlassCard
import com.successempire.app.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import com.google.firebase.auth.FirebaseAuth

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthScreen(
    onLoginSuccess: (isAdmin: Boolean, email: String, name: String) -> Unit,
    onGuestLogin: () -> Unit
) {
    var mode by remember { mutableStateOf("login") } // login, register
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var name by remember { mutableStateOf("") }

    var isProcessing by remember { mutableStateOf(false) }
    var toastMessage by remember { mutableStateOf("") }
    
    val scope = rememberCoroutineScope()
    val auth = remember { FirebaseAuth.getInstance() }

    fun showToast(msg: String) {
        toastMessage = msg
        scope.launch {
            delay(2500)
            toastMessage = ""
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        // Soft glowing ambient blobs
        Box(
            modifier = Modifier
                .size(300.dp)
                .align(Alignment.TopStart)
                .offset(x = (-80).dp, y = (-80).dp)
                .background(
                    brush = Brush.radialGradient(
                        colors = listOf(PrimaryPurple.copy(alpha = 0.08f), Color.Transparent)
                    ),
                    shape = RoundedCornerShape(150.dp)
                )
        )

        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxWidth()
        ) {
            // Success Empire Shield Emblem Small
            Box(
                modifier = Modifier
                    .size(68.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(PrimaryPurple, SecondaryPink)
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Star,
                    contentDescription = "App Logo",
                    tint = GoldAccent,
                    modifier = Modifier.size(32.dp)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "SUCCESS EMPIRE",
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black,
                letterSpacing = 4.sp
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = "Premium Cinematic Learning App",
                color = TextSecondary,
                fontSize = 11.sp,
                fontWeight = FontWeight.SemiBold
            )

            Spacer(modifier = Modifier.height(28.dp))

            // Main Auth Container Card
            GlassCard(
                modifier = Modifier.fillMaxWidth(),
                cornerRadius = 24.dp
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    // Mode Toggle Buttons
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(44.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color.White.copy(alpha = 0.04f))
                            .padding(2.dp)
                    ) {
                        listOf("login" to "Login", "register" to "Register").forEach { (key, label) ->
                            val isSelected = mode == key
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .fillMaxHeight()
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(if (isSelected) PrimaryPurple else Color.Transparent)
                                    .clickable {
                                        mode = key
                                    },
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = label,
                                    color = if (isSelected) Color.White else TextSecondary,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    if (mode == "register") {
                        // Full Name
                        OutlinedTextField(
                            value = name,
                            onValueChange = { name = it },
                            label = { Text("Full Name", color = TextSecondary, fontSize = 11.sp) },
                            leadingIcon = { Icon(Icons.Default.Person, contentDescription = "Name", tint = PrimaryPurple) },
                            colors = TextFieldDefaults.outlinedTextFieldColors(
                                focusedBorderColor = PrimaryPurple,
                                unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                                textColor = Color.White
                            ),
                            shape = RoundedCornerShape(14.dp),
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                    }

                    // Email
                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("Email Address", color = TextSecondary, fontSize = 11.sp) },
                        leadingIcon = { Icon(Icons.Default.Email, contentDescription = "Email", tint = PrimaryPurple) },
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            focusedBorderColor = PrimaryPurple,
                            unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                            textColor = Color.White
                        ),
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier.fillMaxWidth()
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Password
                    OutlinedTextField(
                        value = password,
                        onValueChange = { password = it },
                        label = { Text("Password", color = TextSecondary, fontSize = 11.sp) },
                        leadingIcon = { Icon(Icons.Default.Lock, contentDescription = "Password", tint = PrimaryPurple) },
                        visualTransformation = PasswordVisualTransformation(),
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            focusedBorderColor = PrimaryPurple,
                            unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                            textColor = Color.White
                        ),
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier.fillMaxWidth()
                    )

                    Spacer(modifier = Modifier.height(20.dp))

                    CinematicButton(
                        text = if (mode == "login") "SECURE LOGIN" else "CREATE ACCOUNT",
                        modifier = Modifier.fillMaxWidth(),
                        enabled = !isProcessing,
                        onClick = {
                            if (email.isBlank() || password.isBlank()) {
                                showToast("Kripya sabhi fields bharein!")
                                return@CinematicButton
                            }
                            isProcessing = true
                            scope.launch {
                                delay(1000)
                                isProcessing = false
                                val isAdmin = email.lowercase() == "parwejhayat3@gmail.com"
                                onLoginSuccess(isAdmin, email, if (mode == "register") name else email.split("@")[0])
                                showToast("Safar shuru ho gaya! 🎉")
                            }
                        }
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // Social login mock
                    Text(
                        text = "OR SIGN IN WITH",
                        color = TextMuted,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Black,
                        letterSpacing = 1.sp
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        horizontalArrangement = Arrangement.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color.White.copy(alpha = 0.04f))
                            .border(1.dp, Color.White.copy(alpha = 0.08f), RoundedCornerShape(12.dp))
                            .clickable {
                                isProcessing = true
                                scope.launch {
                                    delay(1200)
                                    isProcessing = false
                                    onLoginSuccess(false, "google.student@gmail.com", "Google Scholar")
                                    showToast("Google Login safal raha! 🚀")
                                }
                            }
                            .padding(vertical = 12.dp)
                    ) {
                        Text(
                            text = "🔴  Google Account",
                            color = Color.White,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Continue as guest
            Text(
                text = "Continue as Guest (Explore App)",
                color = PrimaryPurple,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .clickable { onGuestLogin() }
                    .padding(8.dp)
            )
        }

        // Custom Toast Alert
        AnimatedVisibility(
            visible = toastMessage.isNotEmpty(),
            enter = fadeIn() + scaleIn(),
            exit = fadeOut() + scaleOut(),
            modifier = Modifier.align(Alignment.BottomCenter)
        ) {
            Box(
                modifier = Modifier
                    .padding(bottom = 60.dp)
                    .clip(CircleShape)
                    .background(Color.Black.copy(alpha = 0.85f))
                    .border(1.dp, Color.White.copy(alpha = 0.1f), CircleShape)
                    .padding(horizontal = 20.dp, vertical = 10.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.CheckCircle,
                        contentDescription = "Success",
                        tint = SuccessGreen,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = toastMessage,
                        color = Color.White,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
    }
}
