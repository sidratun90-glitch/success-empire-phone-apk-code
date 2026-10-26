package com.successempire.app

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.successempire.app.ui.theme.*

@Composable
fun GlassCard(
    modifier: Modifier = Modifier,
    cornerRadius: Dp = 24.dp,
    onClick: (() -> Unit)? = null,
    content: @Composable BoxScope.() -> Unit
) {
    val clickableModifier = if (onClick != null) {
        Modifier.clickable { onClick() }
    } else {
        Modifier
    }

    Box(
        modifier = modifier
            .then(clickableModifier)
            .shadow(
                elevation = 8.dp,
                shape = RoundedCornerShape(cornerRadius),
                clip = false,
                ambientColor = PrimaryPurple.copy(alpha = 0.2f),
                spotColor = SecondaryPink.copy(alpha = 0.2f)
            )
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(
                        Color.White.copy(alpha = 0.06f),
                        Color.White.copy(alpha = 0.02f)
                    )
                ),
                shape = RoundedCornerShape(cornerRadius)
            )
            .border(
                width = 1.dp,
                brush = Brush.linearGradient(
                    colors = listOf(
                        Color.White.copy(alpha = 0.12f),
                        Color.White.copy(alpha = 0.02f)
                    )
                ),
                shape = RoundedCornerShape(cornerRadius)
            )
    ) {
        // Highlighting top border
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(
                            Color.Transparent,
                            Color.White.copy(alpha = 0.15f),
                            Color.Transparent
                        )
                    )
                )
        )
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            content()
        }
    }
}

@Composable
fun CinematicButton(
    text: String,
    modifier: Modifier = Modifier,
    primary: Boolean = true,
    enabled: Boolean = true,
    onClick: () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition(label = "shimmer")
    val shimmerOffset by infiniteTransition.animateFloat(
        initialValue = -500f,
        targetValue = 500f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 2000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "shimmerOffset"
    )

    val backgroundBrush = if (primary) {
        if (enabled) {
            Brush.horizontalGradient(
                colors = listOf(PrimaryPurple, SecondaryBlue, SecondaryPink)
            )
        } else {
            Brush.horizontalGradient(
                colors = listOf(Color.Gray, Color.DarkGray)
            )
        }
    } else {
        Brush.verticalGradient(
            colors = listOf(
                Color.White.copy(alpha = 0.04f),
                Color.White.copy(alpha = 0.02f)
            )
        )
    }

    val buttonModifier = if (enabled) {
        Modifier.clickable { onClick() }
    } else {
        Modifier
    }

    Box(
        modifier = modifier
            .then(buttonModifier)
            .height(52.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(backgroundBrush)
            .border(
                width = 1.dp,
                color = if (primary) Color.White.copy(alpha = 0.2f) else Color.White.copy(alpha = 0.08f),
                shape = RoundedCornerShape(16.dp)
            ),
        contentAlignment = Alignment.Center
    ) {
        if (primary && enabled) {
            // Shimmer lighting effect overlay
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(
                                Color.Transparent,
                                Color.White.copy(alpha = 0.15f),
                                Color.Transparent
                            ),
                            start = Offset(shimmerOffset, 0f),
                            end = Offset(shimmerOffset + 150f, 300f)
                        )
                    )
            )
        }

        Text(
            text = text,
            color = if (enabled) Color.White else Color.Gray,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp,
            letterSpacing = 1.sp
        )
    }
}

@Composable
fun CustomToggle(
    enabled: Boolean,
    onToggle: (Boolean) -> Unit,
    modifier: Modifier = Modifier
) {
    val trackColor by animateColorAsState(
        targetValue = if (enabled) PrimaryPurple else Color.White.copy(alpha = 0.1f),
        animationSpec = tween(durationMillis = 300),
        label = "trackColor"
    )

    val thumbOffset by animateDpAsState(
        targetValue = if (enabled) 20.dp else 2.dp,
        animationSpec = tween(durationMillis = 300),
        label = "thumbOffset"
    )

    Box(
        modifier = modifier
            .size(width = 46.dp, height = 24.dp)
            .clip(CircleShape)
            .background(trackColor)
            .border(1.dp, Color.White.copy(alpha = 0.08f), CircleShape)
            .clickable { onToggle(!enabled) },
        contentAlignment = Alignment.CenterStart
    ) {
        Box(
            modifier = Modifier
                .padding(start = thumbOffset)
                .size(20.dp)
                .clip(CircleShape)
                .background(Color.White)
                .shadow(2.dp, CircleShape)
        )
    }
}

@Composable
fun CircularProgressWidget(
    percentage: Int,
    size: Dp = 48.dp,
    strokeWidth: Dp = 4.dp,
    color: Color = PrimaryPurple
) {
    Box(
        modifier = Modifier.size(size),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            // Draw background circle track
            drawCircle(
                color = Color.White.copy(alpha = 0.06f),
                radius = (size.toPx() - strokeWidth.toPx()) / 2f,
                style = Stroke(width = strokeWidth.toPx())
            )

            // Draw progress arc
            val sweepAngle = (percentage / 100f) * 360f
            val radius = (size.toPx() - strokeWidth.toPx()) / 2f
            drawArc(
                color = color,
                startAngle = -90f,
                sweepAngle = sweepAngle,
                useCenter = false,
                topLeft = Offset(strokeWidth.toPx() / 2f, strokeWidth.toPx() / 2f),
                size = Size(radius * 2f, radius * 2f),
                style = Stroke(width = strokeWidth.toPx(), cap = StrokeCap.Round)
            )
        }
        Text(
            text = "$percentage%",
            color = Color.White,
            fontSize = 9.sp,
            fontWeight = FontWeight.Black
        )
    }
}

@Composable
fun ShimmerPlaceholder(
    modifier: Modifier = Modifier,
    cornerRadius: Dp = 12.dp
) {
    val infiniteTransition = rememberInfiniteTransition(label = "placeholderShimmer")
    val shimmerAlpha by infiniteTransition.animateFloat(
        initialValue = 0.1f,
        targetValue = 0.3f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 1000, easing = LinearOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "shimmerAlpha"
    )

    Box(
        modifier = modifier
            .clip(RoundedCornerShape(cornerRadius))
            .background(Color.White.copy(alpha = shimmerAlpha))
    )
}
