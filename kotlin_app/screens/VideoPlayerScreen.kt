package com.successempire.app.screens

import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.animation.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.successempire.app.*
import com.successempire.app.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import android.app.Activity
import android.content.pm.ActivityInfo
import androidx.activity.compose.BackHandler
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat

@Composable
fun VideoPlayerScreen(
    packageId: Int,
    lessonId: Int,
    packages: List<CoursePackage>,
    completedLessons: List<Int>,
    downloadedLessons: List<Int>,
    favoriteLessons: List<Lesson>,
    userEmail: String,
    onToggleCompleted: (Int) -> Unit,
    onToggleFavorite: (Lesson) -> Unit,
    onToggleDownload: (Lesson) -> Unit,
    onBack: () -> Unit,
    onNavigateToLesson: (packageId: Int, lessonId: Int) -> Unit
) {
    val pkg = packages.find { it.id == packageId } ?: return
    val lesson = pkg.lessons.find { it.id == lessonId } ?: return

    val context = LocalContext.current
    val activity = remember(context) { context as? Activity }
    val configuration = LocalConfiguration.current
    val isLandscape = configuration.orientation == android.content.res.Configuration.ORIENTATION_LANDSCAPE

    var isCinemaMode by remember { mutableStateOf(false) }
    var activeTab by remember { mutableStateOf("lessons") } // lessons, about

    val isFullscreenMode = isCinemaMode || isLandscape

    // BackHandler to exit fullscreen first before navigating back
    BackHandler(enabled = isFullscreenMode) {
        isCinemaMode = false
        activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
    }

    // Auto-rotate sync: when device rotates back to portrait physically, unlock orientation lock
    LaunchedEffect(isLandscape) {
        if (!isLandscape) {
            isCinemaMode = false
            activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
        }
    }

    // Manage status/navigation bar visibility (Immersive Mode) in landscape
    LaunchedEffect(isFullscreenMode) {
        val window = activity?.window
        if (window != null) {
            val insetsController = WindowCompat.getInsetsController(window, window.decorView)
            if (isFullscreenMode) {
                insetsController.hide(WindowInsetsCompat.Type.statusBars() or WindowInsetsCompat.Type.navigationBars())
                insetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            } else {
                insetsController.hide(WindowInsetsCompat.Type.statusBars())
                insetsController.show(WindowInsetsCompat.Type.navigationBars())
                insetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        }
    }

    // Lock screen orientation to Portrait on screen exit / dispose and restore system bars
    DisposableEffect(Unit) {
        onDispose {
            activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
            val window = activity?.window
            if (window != null) {
                val insetsController = WindowCompat.getInsetsController(window, window.decorView)
                insetsController.hide(WindowInsetsCompat.Type.statusBars())
                insetsController.show(WindowInsetsCompat.Type.navigationBars())
                insetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        }
    }

    // Anti-Piracy DRM Simulated Float Watermark Coordinate states
    var watermarkX by remember { mutableStateOf(0.1f) }
    var watermarkY by remember { mutableStateOf(0.2f) }

    LaunchedEffect(key1 = true) {
        while (true) {
            delay(5000)
            watermarkX = (10..80).random() / 100f
            watermarkY = (10..80).random() / 100f
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBg)
    ) {
        // TOP BACK APP BAR (Hidden in cinema / fullscreen mode)
        if (!isFullscreenMode) {
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
                    text = "Cinematic Player",
                    color = Color.White,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )

                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(Color.White.copy(alpha = 0.04f))
                        .clickable { onToggleFavorite(lesson) },
                    contentAlignment = Alignment.Center
                ) {
                    val isFav = favoriteLessons.any { it.id == lesson.id }
                    Icon(
                        imageVector = if (isFav) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                        contentDescription = "Bookmark",
                        tint = if (isFav) GoldAccent else Color.White,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }

        // CINEMATIC SECURE VIDEO VIEW
        Box(
            modifier = (if (isFullscreenMode) {
                Modifier.fillMaxSize()
            } else {
                Modifier
                    .fillMaxWidth()
                    .aspectRatio(16f / 9f)
            }).background(Color.Black),
            contentAlignment = Alignment.Center
        ) {
            // Safe WebView video rendering client
            key(lesson.id) {
                AndroidView(
                    factory = { context ->
                        WebView(context).apply {
                            settings.javaScriptEnabled = true
                            settings.domStorageEnabled = true
                            settings.databaseEnabled = true
                            settings.allowFileAccess = true
                            settings.mediaPlaybackRequiresUserGesture = false
                            settings.userAgentString = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
                            
                            webViewClient = WebViewClient()
                            webChromeClient = WebChromeClient()
                            
                            val videoUrl = lesson.videoUrl.ifEmpty { "https://player.vimeo.com/video/512390886" }
                            val htmlData = getEmbedHtml(videoUrl)
                            loadDataWithBaseURL("https://successempire.app", htmlData, "text/html", "UTF-8", null)
                        }
                    },
                    modifier = Modifier.fillMaxSize()
                )
            }


            // ANTI-PIRACY DRM WATERMARK FLOATER
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                contentAlignment = BiasAlignment(
                    horizontalBias = (watermarkX * 2) - 1f,
                    verticalBias = (watermarkY * 2) - 1f
                )
            ) {
                Text(
                    text = "$userEmail • SUCCESS EMPIRE DRM SECURE",
                    color = Color.White.copy(alpha = 0.15f),
                    fontSize = 8.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .background(Color.Black.copy(alpha = 0.2f), RoundedCornerShape(4.dp))
                        .padding(4.dp)
                )
            }

            // Cinema Mode Toggle Button overlay
            Box(
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(12.dp)
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(Color.Black.copy(alpha = 0.6f))
                    .clickable {
                        if (isFullscreenMode) {
                            isCinemaMode = false
                            activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
                        } else {
                            isCinemaMode = true
                            activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
                        }
                    },
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = if (isFullscreenMode) Icons.Default.FullscreenExit else Icons.Default.Fullscreen,
                    contentDescription = "Cinema Mode",
                    tint = Color.White,
                    modifier = Modifier.size(20.dp)
                )
            }
        }

        if (!isFullscreenMode) {
            Spacer(modifier = Modifier.height(12.dp))
        }

        // LESSON DETAILS TITLE (Hidden in cinema mode)
        if (!isFullscreenMode) {
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(rememberScrollState())
                    .padding(horizontal = 20.dp)
            ) {
                // Title & Completed Checkbox
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = lesson.courseName.uppercase(),
                            color = PrimaryPurple,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Black,
                            letterSpacing = 1.sp
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = lesson.title,
                            color = Color.White,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Black
                        )
                    }

                    // Done checkbox
                    val isDone = completedLessons.contains(lesson.id)
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .background(Color.White.copy(alpha = 0.04f))
                            .clickable { onToggleCompleted(lesson.id) }
                            .padding(horizontal = 10.dp, vertical = 6.dp)
                    ) {
                        Checkbox(
                            checked = isDone,
                            onCheckedChange = { onToggleCompleted(lesson.id) },
                            colors = CheckboxDefaults.colors(
                                checkedColor = SuccessGreen,
                                uncheckedColor = Color.White.copy(alpha = 0.4f),
                                checkmarkColor = Color.White
                            ),
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (isDone) "COMPLETED" else "MARK DONE",
                            color = if (isDone) SuccessGreen else Color.White,
                            fontSize = 8.sp,
                            fontWeight = FontWeight.Black
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Custom options: download, speeds
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Download Toggle
                    val isDownloaded = downloadedLessons.contains(lesson.id)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color.White.copy(alpha = 0.03f))
                            .border(1.dp, Color.White.copy(alpha = 0.05f), RoundedCornerShape(12.dp))
                            .clickable { onToggleDownload(lesson) }
                            .padding(vertical = 12.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = if (isDownloaded) Icons.Default.CheckCircle else Icons.Default.Download,
                                contentDescription = "Download Status",
                                tint = if (isDownloaded) SuccessGreen else Color.White,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (isDownloaded) "DOWNLOADED" else "DOWNLOAD OFFLINE",
                                color = if (isDownloaded) SuccessGreen else Color.White,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // TABS FOR NEXT LECTURES VS ABOUT
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(40.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(Color.White.copy(alpha = 0.03f))
                        .padding(2.dp)
                ) {
                    listOf("lessons" to "Next Lectures", "about" to "Lecture Info").forEach { (key, label) ->
                        val isSelected = activeTab == key
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .fillMaxHeight()
                                .clip(RoundedCornerShape(8.dp))
                                .background(if (isSelected) PrimaryPurple else Color.Transparent)
                                .clickable { activeTab = key },
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

                Spacer(modifier = Modifier.height(16.dp))

                when (activeTab) {
                    "lessons" -> {
                        pkg.lessons.forEach { item ->
                            val isCurrent = item.id == lesson.id
                            val isCompleted = completedLessons.contains(item.id)

                            GlassCard(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 4.dp)
                                    .border(
                                        width = 1.dp,
                                        color = if (isCurrent) PrimaryPurple else Color.Transparent,
                                        shape = RoundedCornerShape(16.dp)
                                    ),
                                cornerRadius = 16.dp,
                                onClick = {
                                    if (item.isComingSoon) return@GlassCard
                                    onNavigateToLesson(pkg.id, item.id)
                                }
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(
                                        modifier = Modifier
                                            .size(42.dp)
                                            .clip(RoundedCornerShape(8.dp))
                                            .background(Color.White.copy(alpha = 0.05f)),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Icon(
                                            imageVector = if (isCompleted) Icons.Default.CheckCircle else Icons.Default.PlayArrow,
                                            contentDescription = "State",
                                            tint = if (isCompleted) SuccessGreen else Color.White
                                        )
                                    }
                                    Spacer(modifier = Modifier.width(16.dp))
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            text = item.title,
                                            color = if (isCurrent) PrimaryPurple else Color.White,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold,
                                            maxLines = 1
                                        )
                                        Spacer(modifier = Modifier.height(2.dp))
                                        Text(
                                            text = "Duration: ${item.duration}",
                                            color = TextSecondary,
                                            fontSize = 10.sp
                                        )
                                    }
                                }
                            }
                        }
                    }
                    "about" -> {
                        Text(
                            text = "Lecture Description",
                            color = Color.White,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = lesson.desc,
                            color = TextSecondary,
                            fontSize = 12.sp,
                            lineHeight = 18.sp
                        )
                    }
                }
                Spacer(modifier = Modifier.height(30.dp))
            }
        }
    }
}

fun getEmbedUrl(url: String): String {
    if (url.isEmpty()) return "https://player.vimeo.com/video/512390886?autoplay=0"
    
    // YouTube
    if (url.contains("youtube.com/watch?v=")) {
        val videoId = url.substringAfter("v=").substringBefore("&")
        return "https://www.youtube.com/embed/$videoId?autoplay=0&rel=0&enablejsapi=1&modestbranding=1"
    }
    if (url.contains("youtu.be/")) {
        val videoId = url.substringAfter("youtu.be/").substringBefore("?").substringBefore("&")
        return "https://www.youtube.com/embed/$videoId?autoplay=0&rel=0&enablejsapi=1&modestbranding=1"
    }
    if (url.contains("youtube.com/embed/")) {
        var embedUrl = url
        if (embedUrl.contains("autoplay=1")) {
            embedUrl = embedUrl.replace("autoplay=1", "autoplay=0")
        } else if (!embedUrl.contains("autoplay=")) {
            embedUrl += if (embedUrl.contains("?")) "&autoplay=0" else "?autoplay=0"
        }
        return embedUrl
    }
    if (url.contains("youtube.com/shorts/")) {
        val videoId = url.substringAfter("shorts/").substringBefore("?").substringBefore("&")
        return "https://www.youtube.com/embed/$videoId?autoplay=0&rel=0&enablejsapi=1&modestbranding=1"
    }
    
    // Vimeo
    if (url.contains("vimeo.com/")) {
        val parsed = parseVimeoUrlKotlin(url)
        if (parsed.first.isNotEmpty()) {
            var embedUrl = "https://player.vimeo.com/video/${parsed.first}?autoplay=0&api=1&title=0&byline=0&portrait=0&badge=0"
            if (parsed.second.isNotEmpty()) {
                embedUrl += "&h=${parsed.second}"
            }
            return embedUrl
        }
    }
    
    return url
}

fun getEmbedHtml(url: String): String {
    val embedUrl = getEmbedUrl(url)
    
    return """
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    background-color: #000000;
                }
                .container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                iframe {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <iframe src="$embedUrl" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
        </body>
        </html>
    """.trimIndent()
}

fun parseVimeoUrlKotlin(url: String): Pair<String, String> {
    var videoId = ""
    var hash = ""
    try {
        if (url.contains("h=")) {
            hash = url.substringAfter("h=").substringBefore("&")
        }
        
        val cleanUrl = url.substringAfter("://").substringAfter("vimeo.com/")
        val pathParts = cleanUrl.substringBefore("?").split("/").filter { it.isNotEmpty() }
        
        if (pathParts.size >= 2 && pathParts[0].all { it.isDigit() } && pathParts[1].all { it.isLetterOrDigit() }) {
            videoId = pathParts[0]
            hash = pathParts[1]
        } else {
            val numericPart = pathParts.find { part -> part.all { it.isDigit() } }
            if (numericPart != null) {
                videoId = numericPart
                val idx = pathParts.indexOf(numericPart)
                if (idx + 1 < pathParts.size && pathParts[idx + 1].all { it.isLetterOrDigit() }) {
                    hash = pathParts[idx + 1]
                }
            }
        }
    } catch (e: Exception) {
        // Fallback
    }
    
    if (videoId.isEmpty()) {
        val match = Regex("""/(\d+)""").find(url)
        if (match != null) {
            videoId = match.groupValues[1]
        }
    }
    return Pair(videoId, hash)
}
