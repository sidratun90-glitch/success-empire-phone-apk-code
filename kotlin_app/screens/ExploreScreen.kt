package com.successempire.app.screens

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
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
import com.successempire.app.GlassCard
import com.successempire.app.Lesson
import com.successempire.app.MockData
import com.successempire.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ExploreScreen(
    packages: List<com.successempire.app.CoursePackage>,
    purchasedPackages: List<Int>,
    onNavigateToLesson: (packageId: Int, lessonId: Int) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("All") }

    // Flatten all lessons across packages
    val allLessons = remember(packages) {
        packages.flatMap { pkg ->
            pkg.lessons.map { lesson ->
                lesson.copy(packageId = pkg.id) // Ensure correct binding
            }
        }
    }

    // Filter lessons based on search query and category
    val filteredLessons = remember(searchQuery, selectedCategory, allLessons, packages) {
        allLessons.filter { lesson ->
            val pkg = packages.find { it.id == lesson.packageId }
            val matchesCategory = selectedCategory == "All" || pkg?.category?.equals(selectedCategory, ignoreCase = true) == true
            val matchesQuery = lesson.title.contains(searchQuery, ignoreCase = true) ||
                    lesson.courseName.contains(searchQuery, ignoreCase = true) ||
                    lesson.desc.contains(searchQuery, ignoreCase = true)

            matchesCategory && matchesQuery
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 20.dp)
            .padding(bottom = 90.dp) // pad for bottom bar
    ) {
        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = "Explore Courses",
            color = Color.White,
            fontSize = 20.sp,
            fontWeight = FontWeight.Black
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Search Input Bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search course name, parts, keys...", color = TextSecondary, fontSize = 11.sp) },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search", tint = PrimaryPurple) },
            trailingIcon = {
                if (searchQuery.isNotEmpty()) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Clear",
                        tint = Color.White,
                        modifier = Modifier.clickable { searchQuery = "" }
                    )
                }
            },
            colors = TextFieldDefaults.outlinedTextFieldColors(
                focusedBorderColor = PrimaryPurple,
                unfocusedBorderColor = Color.White.copy(alpha = 0.08f),
                textColor = Color.White
            ),
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Quick Horizontal filter pills
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(vertical = 4.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            MockData.CATEGORIES.forEach { cat ->
                val isSelected = selectedCategory == cat
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (isSelected) PrimaryPurple else Color.White.copy(alpha = 0.03f))
                        .clickable { selectedCategory = cat }
                        .padding(horizontal = 14.dp, vertical = 8.dp)
                ) {
                    Text(
                        text = cat,
                        color = if (isSelected) Color.White else TextSecondary,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Grid list of filtered lessons
        if (filteredLessons.isEmpty()) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth(),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.MenuBook,
                        contentDescription = "Empty",
                        tint = TextMuted,
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "No match found!",
                        color = TextSecondary,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Try searching with a different course title or category.",
                        color = TextMuted,
                        fontSize = 10.sp,
                        textAlign = TextAlign.Center
                    )
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(filteredLessons) { lesson ->
                    val isPackagePurchased = purchasedPackages.contains(lesson.packageId)
                    val isActuallyLocked = lesson.isLocked && !isPackagePurchased

                    GlassCard(
                        modifier = Modifier.fillMaxWidth(),
                        cornerRadius = 16.dp,
                        onClick = {
                            onNavigateToLesson(lesson.packageId, lesson.id)
                        }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            // Dummy lesson thumbnail placeholder
                            Box(
                                modifier = Modifier
                                    .size(72.dp)
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(Color.White.copy(alpha = 0.05f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = if (isActuallyLocked) Icons.Default.Lock else Icons.Default.PlayArrow,
                                    contentDescription = "State",
                                    tint = if (isActuallyLocked) Color.White.copy(alpha = 0.4f) else SuccessGreen,
                                    modifier = Modifier.size(24.dp)
                                )
                            }

                            Spacer(modifier = Modifier.width(16.dp))

                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = lesson.courseName,
                                    color = PrimaryPurple,
                                    fontSize = 9.sp,
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
                            } else if (isActuallyLocked) {
                                Icon(
                                    imageVector = Icons.Default.Lock,
                                    contentDescription = "Locked Premium",
                                    tint = AlertRed,
                                    modifier = Modifier.size(16.dp)
                                )
                            } else {
                                Icon(
                                    imageVector = Icons.Default.ChevronRight,
                                    contentDescription = "Navigate",
                                    tint = TextSecondary,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
