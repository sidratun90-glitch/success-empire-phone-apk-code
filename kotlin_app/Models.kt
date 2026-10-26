package com.successempire.app

import java.io.Serializable

data class Lesson(
    val id: Int,
    val courseName: String,
    val title: String,
    val duration: String,
    val isLocked: Boolean,
    val isComingSoon: Boolean = false,
    val type: String = "video",
    val thumbnail: String,
    val desc: String,
    val videoUrl: String = "",
    val packageId: Int = 0
) : Serializable

data class CoursePackage(
    val id: Int,
    val title: String,
    val instructor: String = "Success Empire Team",
    val price: Int,
    val originalPrice: Int,
    val rating: Float = 4.5f,
    val reviews: Int = 100,
    val category: String,
    val language: String,
    val thumbnail: String,
    val tags: List<String> = emptyList(),
    val description: String,
    val paymentLink: String = "",
    val lessons: List<Lesson> = emptyList()
) : Serializable

data class AppNotification(
    val id: Int,
    val title: String,
    val desc: String,
    val time: String,
    val isRead: Boolean = false,
    val recipient: String = "All Users"
) : Serializable

data class TrendingPoster(
    val id: Int,
    val image: String
) : Serializable

data class AppSettings(
    val appName: String = "Success Empire",
    val appLogo: String? = null,
    val whatsappLink: String = "https://wa.me/917858036851?text=Hi,%20mujhe%20help%20chahiye",
    val youtubeLink: String = "https://youtube.com/@successempire",
    val instagramLink: String = "https://instagram.com/successempire",
    val facebookLink: String = "https://facebook.com/successempire",
    val twitterLink: String = "https://twitter.com/successempire",
    val trendingPosters: List<TrendingPoster> = emptyList()
) : Serializable

data class FriendEmail(
    val id: Long,
    val name: String,
    val email: String
) : Serializable
