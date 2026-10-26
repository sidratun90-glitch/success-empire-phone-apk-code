package com.successempire.app

object MockData {
    val CATEGORIES = listOf("All", "Foundation", "Intermediate", "Advanced", "Mastery", "Technology")

    val DEFAULT_PACKAGES = mutableListOf<CoursePackage>()


    val DEFAULT_NOTIFICATIONS = mutableListOf(
        AppNotification(1, "🎉 New Offer!", "Ramadan special 50% off on all packages.", "10 min ago"),
        AppNotification(2, "📚 New Course", "Advanced React has been added to Premium Pro.", "2 hours ago"),
        AppNotification(3, "🏆 Certificate Alert", "Your Web Basics certificate is ready.", "1 day ago", isRead = true),
        AppNotification(4, "⚡ Live Class", "Join the Q&A session tonight at 8 PM.", "2 days ago", isRead = true)
    )

    val DEFAULT_POSTERS = listOf(
        TrendingPoster(1, "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"),
        TrendingPoster(2, "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"),
        TrendingPoster(3, "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800")
    )

    val DEFAULT_SETTINGS = AppSettings(
        appName = "Success Empire",
        appLogo = null,
        whatsappLink = "https://wa.me/917858036851?text=Hi,%20mujhe%20help%20chahiye",
        youtubeLink = "https://youtube.com/@successempire",
        instagramLink = "https://instagram.com/successempire",
        facebookLink = "https://facebook.com/successempire",
        twitterLink = "https://twitter.com/successempire",
        trendingPosters = DEFAULT_POSTERS
    )
}
