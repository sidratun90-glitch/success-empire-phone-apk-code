package com.successempire.app.screens

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.successempire.app.*
import com.successempire.app.ui.theme.*

@Composable
fun PackageDetailScreen(
    packageId: Int,
    packages: List<CoursePackage>,
    purchasedPackages: List<Int>,
    favoriteLessons: List<Lesson>,
    onToggleFavorite: (Lesson) -> Unit,
    onBack: () -> Unit,
    onNavigateToPlayer: (packageId: Int, lessonId: Int) -> Unit,
    onNavigateToPayment: (packageId: Int) -> Unit
) {
    val pkg = packages.find { it.id == packageId } ?: return

    var activeTab by remember { mutableStateOf("curriculum") } // curriculum, about, reviews
    val isPurchased = purchasedPackages.contains(pkg.id)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
    ) {
        // TOP BACK APP BAR
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
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
                text = "Package Details",
                color = Color.White,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold
            )
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.04f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Share,
                    contentDescription = "Share",
                    tint = Color.White,
                    modifier = Modifier.size(18.dp)
                )
            }
        }

        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp)
        ) {
            // Cinematic Visual Cover
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
                    .clip(RoundedCornerShape(24.dp))
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(DarkSurface, PrimaryPurple.copy(alpha = 0.4f))
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.PlayCircleFilled,
                        contentDescription = "Trailer",
                        tint = PrimaryPurple,
                        modifier = Modifier.size(60.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "WATCH INTRO VIDEO",
                        color = Color.White,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Black,
                        letterSpacing = 1.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Title & Badges
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(PrimaryPurple.copy(alpha = 0.15f))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = pkg.category.uppercase(),
                        color = PrimaryPurple,
                        fontSize = 8.sp,
                        fontWeight = FontWeight.Black,
                        letterSpacing = 1.sp
                    )
                }
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(GoldAccent.copy(alpha = 0.15f))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = "LIFETIME ACCESS",
                        color = GoldAccent,
                        fontSize = 8.sp,
                        fontWeight = FontWeight.Black
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = pkg.title,
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black
            )

            Spacer(modifier = Modifier.height(8.dp))

            // Rating Stars
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Star,
                    contentDescription = "Rating",
                    tint = GoldAccent,
                    modifier = Modifier.size(16.dp)
                )
                Text(
                    text = "${pkg.rating} Rating",
                    color = Color.White,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "• By ${pkg.instructor}",
                    color = TextSecondary,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Custom Tabs
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(44.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.03f))
                    .border(1.dp, Color.White.copy(alpha = 0.05f), RoundedCornerShape(12.dp))
                    .padding(2.dp)
            ) {
                listOf("curriculum" to "Curriculum", "about" to "About", "reviews" to "Reviews").forEach { (key, label) ->
                    val isTabSelected = activeTab == key
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxHeight()
                            .clip(RoundedCornerShape(10.dp))
                            .background(if (isTabSelected) PrimaryPurple else Color.Transparent)
                            .clickable { activeTab = key },
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = label,
                            color = if (isTabSelected) Color.White else TextSecondary,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Tab rendering
            when (activeTab) {
                "curriculum" -> {
                    pkg.lessons.forEachIndexed { index, lesson ->
                        val isLocked = lesson.isLocked && !isPurchased

                        GlassCard(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 6.dp),
                            cornerRadius = 16.dp,
                            onClick = {
                                if (lesson.isComingSoon) return@GlassCard
                                onNavigateToPlayer(pkg.id, lesson.id)
                            }
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                // Serial indicator
                                Text(
                                    text = String.format("%02d", index + 1),
                                    color = if (isLocked) TextMuted else PrimaryPurple,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Black
                                )

                                Spacer(modifier = Modifier.width(16.dp))

                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = lesson.courseName.uppercase(),
                                        color = TextMuted,
                                        fontSize = 8.sp,
                                        fontWeight = FontWeight.Black,
                                        letterSpacing = 1.sp
                                    )
                                    Spacer(modifier = Modifier.height(2.dp))
                                    Text(
                                        text = lesson.title,
                                        color = Color.White,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold,
                                        maxLines = 1
                                    )
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = "Duration: ${lesson.duration}",
                                        color = TextSecondary,
                                        fontSize = 10.sp
                                    )
                                }

                                if (lesson.isComingSoon) {
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(4.dp))
                                            .background(GoldAccent.copy(alpha = 0.15f))
                                            .padding(horizontal = 6.dp, vertical = 2.dp)
                                    ) {
                                        Text(
                                            text = "COMING SOON",
                                            color = GoldAccent,
                                            fontSize = 7.sp,
                                            fontWeight = FontWeight.Black
                                        )
                                    }
                                } else if (isLocked) {
                                    Icon(
                                        imageVector = Icons.Default.Lock,
                                        contentDescription = "Locked",
                                        tint = AlertRed,
                                        modifier = Modifier.size(16.dp)
                                    )
                                } else {
                                    Icon(
                                        imageVector = Icons.Default.PlayArrow,
                                        contentDescription = "Play",
                                        tint = SuccessGreen,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                            }
                        }
                    }
                }
                "about" -> {
                    Text(
                        text = "Course Description",
                        color = Color.White,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = pkg.description,
                        color = TextSecondary,
                        fontSize = 12.sp,
                        lineHeight = 18.sp
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "What you will learn:",
                        color = Color.White,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    listOf(
                        "Gain basic to advanced module access.",
                        "Understand key industry secrets and metrics.",
                        "Apply formulas to actual coding layouts.",
                        "Receive directly verifiable digital certificate.",
                        "Direct mentor WhatsApp group query support."
                    ).forEach { point ->
                        Row(modifier = Modifier.padding(vertical = 4.dp)) {
                            Text(text = "✓", color = SuccessGreen, fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.width(10.dp))
                            Text(text = point, color = TextSecondary, fontSize = 11.sp)
                        }
                    }
                }
                "reviews" -> {
                    // Styled Star Review breakdowns
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = pkg.rating.toString(),
                                color = Color.White,
                                fontSize = 36.sp,
                                fontWeight = FontWeight.Black
                            )
                            Text(
                                text = "out of 5",
                                color = TextMuted,
                                fontSize = 9.sp
                            )
                        }

                        Spacer(modifier = Modifier.width(32.dp))

                        Column(modifier = Modifier.weight(1f)) {
                            listOf(90, 8, 2, 0, 0).forEachIndexed { index, value ->
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    modifier = Modifier.padding(vertical = 2.dp)
                                ) {
                                    Text(
                                        text = "${5 - index} ★",
                                        color = TextSecondary,
                                        fontSize = 10.sp,
                                        modifier = Modifier.width(24.dp)
                                    )
                                    Box(
                                        modifier = Modifier
                                            .weight(1f)
                                            .height(4.dp)
                                            .clip(CircleShape)
                                            .background(Color.White.copy(alpha = 0.05f))
                                    ) {
                                        Box(
                                            modifier = Modifier
                                                .fillMaxHeight()
                                                .fillMaxWidth(value / 100f)
                                                .background(PrimaryPurple)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(30.dp))
        }

        // BOTTOM ACTION PURCHASE BAR
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                .background(DarkSurface)
                .border(1.dp, Color.White.copy(alpha = 0.08f), RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                .padding(20.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                if (isPurchased) {
                    Column {
                        Text(
                            text = "Life-Time Enrollment",
                            color = SuccessGreen,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Access Unlocked 🎉",
                            color = Color.White,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Black
                        )
                    }

                    CinematicButton(
                        text = "START LEARNING",
                        modifier = Modifier.width(180.dp),
                        onClick = {
                            val firstLesson = pkg.lessons.firstOrNull { !it.isComingSoon }
                            if (firstLesson != null) {
                                onNavigateToPlayer(pkg.id, firstLesson.id)
                            }
                        }
                    )
                } else {
                    Column {
                        Row(verticalAlignment = Alignment.Bottom) {
                            Text(
                                text = "₹${pkg.price}",
                                color = Color.White,
                                fontSize = 20.sp,
                                fontWeight = FontWeight.Black
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "₹${pkg.originalPrice}",
                                color = TextSecondary,
                                fontSize = 12.sp,
                                textDecoration = TextDecoration.LineThrough
                            )
                        }
                        Text(
                            text = "All inclusive single payment",
                            color = TextMuted,
                            fontSize = 9.sp
                        )
                    }

                    CinematicButton(
                        text = "UNLOCK ACCESS",
                        modifier = Modifier.width(180.dp),
                        onClick = {
                            onNavigateToPayment(pkg.id)
                        }
                    )
                }
            }
        }
    }
}
