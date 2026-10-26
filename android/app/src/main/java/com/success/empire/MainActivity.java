package com.success.empire;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.Window;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import androidx.core.app.NotificationCompat;
import com.google.firebase.messaging.FirebaseMessaging;
import android.util.Log;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "MAIN_ACTIVITY";
    private String pendingScreen = null;
    private String pendingNotifId = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        showSystemUI();
        
        // Expose JavaScript Interface for orientation control
        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            webView.addJavascriptInterface(new Object() {
                @JavascriptInterface
                public void lockLandscape() {
                    runOnUiThread(() -> {
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                        hideSystemUI();
                    });
                }

                @JavascriptInterface
                public float getSystemVolume() {
                    try {
                        android.media.AudioManager audioManager = (android.media.AudioManager) getSystemService(android.content.Context.AUDIO_SERVICE);
                        if (audioManager != null) {
                            int current = audioManager.getStreamVolume(android.media.AudioManager.STREAM_MUSIC);
                            int max = audioManager.getStreamMaxVolume(android.media.AudioManager.STREAM_MUSIC);
                            return (float) current / max;
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to get system volume", e);
                    }
                    return 1.0f;
                }

                @JavascriptInterface
                public void setSystemVolume(float volumePercent) {
                    try {
                        android.media.AudioManager audioManager = (android.media.AudioManager) getSystemService(android.content.Context.AUDIO_SERVICE);
                        if (audioManager != null) {
                            int max = audioManager.getStreamMaxVolume(android.media.AudioManager.STREAM_MUSIC);
                            int index = Math.round(volumePercent * max);
                            audioManager.setStreamVolume(android.media.AudioManager.STREAM_MUSIC, index, 0);
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to set system volume", e);
                    }
                }
                
                @JavascriptInterface
                public void lockPortrait() {
                    runOnUiThread(() -> {
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                        showSystemUI();
                    });
                }
                
                @JavascriptInterface
                public void unlock() {
                    runOnUiThread(() -> {
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
                        showSystemUI();
                    });
                }

                @JavascriptInterface
                public void hideSystemBars() {
                    runOnUiThread(() -> {
                        hideSystemUI();
                    });
                }

                @JavascriptInterface
                public void showSystemBars() {
                    runOnUiThread(() -> {
                        showSystemUI();
                    });
                }
            }, "AndroidOrientation");

            // Expose JavaScript Interface for notifications control
            webView.addJavascriptInterface(new Object() {
                @JavascriptInterface
                public void requestNotificationPermission() {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.POST_NOTIFICATIONS}, 101);
                        }
                    }
                }

                @JavascriptInterface
                public void showNotification(String title, String body) {
                    try {
                        String channelId = "success_empire_notif_channel";
                        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
                        
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            NotificationChannel channel = new NotificationChannel(channelId, "Success Empire", NotificationManager.IMPORTANCE_HIGH);
                            channel.setDescription("Success Empire Course Notifications");
                            if (notificationManager != null) {
                                notificationManager.createNotificationChannel(channel);
                            }
                        }

                        Intent intent = new Intent(MainActivity.this, MainActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        PendingIntent pendingIntent = PendingIntent.getActivity(
                            MainActivity.this, 
                            0, 
                            intent, 
                            PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0)
                        );

                        NotificationCompat.Builder builder = new NotificationCompat.Builder(MainActivity.this, channelId)
                            .setSmallIcon(getApplicationInfo().icon)
                            .setContentTitle(title)
                            .setContentText(body)
                            .setAutoCancel(true)
                            .setPriority(NotificationCompat.PRIORITY_HIGH)
                            .setContentIntent(pendingIntent);

                        if (notificationManager != null) {
                            notificationManager.notify((int) System.currentTimeMillis(), builder.build());
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

                @JavascriptInterface
                public void fetchFCMToken() {
                    FirebaseMessaging.getInstance().getToken()
                        .addOnCompleteListener(task -> {
                            if (!task.isSuccessful()) {
                                Log.w(TAG, "Fetching FCM registration token failed", task.getException());
                                return;
                            }
                            String token = task.getResult();
                            Log.d(TAG, "FCM Token retrieved: " + token);

                            // Subscribe to broadcast topic automatically
                            FirebaseMessaging.getInstance().subscribeToTopic("all_users");

                            // Return token to JavaScript context
                            runOnUiThread(() -> {
                                if (getBridge() != null && getBridge().getWebView() != null) {
                                    getBridge().getWebView().evaluateJavascript(
                                        "if(window.onFCMTokenReceived) { window.onFCMTokenReceived('" + token + "'); }", 
                                        null
                                    );
                                }
                            });
                        });
                }

                @JavascriptInterface
                public void checkPendingLaunchNotification() {
                    if (pendingScreen != null) {
                        runOnUiThread(() -> {
                            if (getBridge() != null && getBridge().getWebView() != null) {
                                getBridge().getWebView().evaluateJavascript(
                                    "if(window.onNativeNotificationClick) { window.onNativeNotificationClick('" + pendingScreen + "', '" + pendingNotifId + "'); }", 
                                    null
                                );
                                pendingScreen = null;
                                pendingNotifId = null;
                            }
                        });
                    }
                }
            }, "AndroidNotifications");
        }

        // Check launch intent for notification payloads
        handleIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        if (intent != null && intent.hasExtra("notification_screen")) {
            String screen = intent.getStringExtra("notification_screen");
            String notifId = intent.getStringExtra("notification_id");
            if (getBridge() != null && getBridge().getWebView() != null) {
                runOnUiThread(() -> {
                    getBridge().getWebView().evaluateJavascript(
                        "if(window.onNativeNotificationClick) { window.onNativeNotificationClick('" + screen + "', '" + notifId + "'); }", 
                        null
                    );
                });
            } else {
                pendingScreen = screen;
                pendingNotifId = notifId;
            }
        }
    }

    private void hideSystemUI() {
        Window window = getWindow();
        if (window != null) {
            WindowCompat.setDecorFitsSystemWindows(window, false);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                window.getAttributes().layoutInDisplayCutoutMode = android.view.WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT;
            }
            WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(window, window.getDecorView());
            if (controller != null) {
                controller.hide(WindowInsetsCompat.Type.statusBars() | WindowInsetsCompat.Type.navigationBars());
                controller.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        }
    }

    private void showSystemUI() {
        Window window = getWindow();
        if (window != null) {
            WindowCompat.setDecorFitsSystemWindows(window, false);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                window.getAttributes().layoutInDisplayCutoutMode = android.view.WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            }
            WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(window, window.getDecorView());
            if (controller != null) {
                controller.show(WindowInsetsCompat.Type.statusBars() | WindowInsetsCompat.Type.navigationBars());
                controller.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
                // Set status bar icons and navigation bar buttons to dark (readable on light backgrounds)
                controller.setAppearanceLightStatusBars(true);
                controller.setAppearanceLightNavigationBars(true);
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                window.setStatusBarColor(android.graphics.Color.TRANSPARENT);
                window.setNavigationBarColor(android.graphics.Color.TRANSPARENT);
            }
        }
    }
}
