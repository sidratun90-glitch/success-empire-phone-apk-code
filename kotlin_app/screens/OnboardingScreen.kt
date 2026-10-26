package com.successempire.app.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.successempire.app.CinematicButton
import com.successempire.app.GlassCard
import com.successempire.app.ui.theme.*

@Composable
fun OnboardingScreen(onComplete: () -> Unit) {
    var step by remember { mutableStateOf(0) }
    val steps = listOf(
        OnboardingStep(
            title = "LEARN",
            desc = "Gain access to premium, highly curated learning content designed by industry leaders.",
            icon = Icons.Default.MenuBook,
            accentColor = PrimaryPurple,
            scene = { SceneLearn() }
        ),
        OnboardingStep(
            title = "IMPLEMENT",
            desc = "Apply your knowledge practically with real world coding projects and templates.",
            icon = Icons.Default.Code,
            accentColor = SecondaryBlue,
            scene = { SceneImplement() }
        ),
        OnboardingStep(
            title = "GROW",
            desc = "Acquire high value certifications and scale your affiliate and freelancing earnings.",
            icon = Icons.Default.TrendingUp,
            accentColor = SecondaryPink,
            scene = { SceneGrow() }
        )
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
            .clickable {
                if (step < 2) step++
            }
            .padding(24.dp)
    ) {
        // Ambient soft glowing blob matching current step color
        Box(
            modifier = Modifier
                .size(300.dp)
                .align(Alignment.Center)
                .background(
                    brush = Brush.radialGradient(
                        colors = listOf(steps[step].accentColor.copy(alpha = 0.08f), Color.Transparent)
                    ),
                    shape = CircleShape
                )
        )

        // Main content
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Header spacing
            Spacer(modifier = Modifier.height(20.dp))

            // Step Details with Transition
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.Center
            ) {
                // Title Pill
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(DarkSurface)
                        .padding(horizontal = 24.dp, vertical = 8.dp)
                ) {
                    Text(
                        text = steps[step].title,
                        color = Color.White,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Black,
                        letterSpacing = 4.sp
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Scene Graphic
                Box(
                    modifier = Modifier
                        .height(260.dp)
                        .fillMaxWidth(),
                    contentAlignment = Alignment.Center
                ) {
                    steps[step].scene()
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Text details
                Text(
                    text = steps[step].desc,
                    color = TextSecondary,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Medium,
                    textAlign = TextAlign.Center,
                    lineHeight = 20.sp,
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
            }

            // Bottom Navigation Indicators & Buttons
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth()
            ) {
                // Dot Indicators
                Row(
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    steps.forEachIndexed { index, onboardingStep ->
                        val isSelected = index == step
                        Box(
                            modifier = Modifier
                                .padding(horizontal = 4.dp)
                                .height(8.dp)
                                .width(if (isSelected) 24.dp else 8.dp)
                                .clip(CircleShape)
                                .background(if (isSelected) onboardingStep.accentColor else Color.White.copy(alpha = 0.2f))
                        )
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // Continuation Button / Helper text
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(60.dp),
                    contentAlignment = Alignment.Center
                ) {
                    if (step == 2) {
                        CinematicButton(
                            text = "LET'S GET STARTED",
                            modifier = Modifier.fillMaxWidth(),
                            onClick = {
                                onComplete()
                            }
                        )
                    } else {
                        Text(
                            text = "Tap anywhere on the screen to continue",
                            color = TextMuted,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            letterSpacing = 1.sp
                        )
                    }
                }
                Spacer(modifier = Modifier.height(10.dp))
            }
        }
    }
}

data class OnboardingStep(
    val title: String,
    val desc: String,
    val icon: ImageVector,
    val accentColor: Color,
    val scene: @Composable () -> Unit
)

@Composable
fun SceneLearn() {
    GlassCard(
        modifier = Modifier
            .size(180.dp)
            .padding(8.dp)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {
            Icon(
                imageVector = Icons.Default.School,
                contentDescription = "School",
                tint = PrimaryPurple,
                modifier = Modifier.size(54.dp)
            )
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "Learn & Master",
                color = Color.White,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "Interactive Playlists",
                color = TextSecondary,
                fontSize = 10.sp
            )
        }
    }
}

@Composable
fun SceneImplement() {
    GlassCard(
        modifier = Modifier
            .size(180.dp)
            .padding(8.dp)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {
            Icon(
                imageVector = Icons.Default.Laptop,
                contentDescription = "Code",
                tint = SecondaryBlue,
                modifier = Modifier.size(54.dp)
            )
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "Build Projects",
                color = Color.White,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "Step-by-step guides",
                color = TextSecondary,
                fontSize = 10.sp
            )
        }
    }
}

@Composable
fun SceneGrow() {
    GlassCard(
        modifier = Modifier
            .size(180.dp)
            .padding(8.dp)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {
            Icon(
                imageVector = Icons.Default.EmojiEvents,
                contentDescription = "Trophy",
                tint = GoldAccent,
                modifier = Modifier.size(54.dp)
            )
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "Earn Certificates",
                color = Color.White,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "Boost Career & Income",
                color = TextSecondary,
                fontSize = 10.sp
            )
        }
    }
}
