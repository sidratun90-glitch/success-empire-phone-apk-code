/**
 * Notification Service Abstraction
 * Designed for Course App 2 (Success Empire)
 * 
 * Provides a decoupled, scalable architecture supporting multiple channels:
 * - WhatsApp Business API / Webhooks
 * - Telegram Bot API
 * - Email Alerts (SMTP / Webhook)
 * - FCM Push Notifications
 * 
 * Configured dynamically via Firestore (settings/notifications) or fallbacks in settings/app.
 */

import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Base class for all notification providers
 */
class NotificationProvider {
  /**
   * Send notification message
   * @param {string} message - Text message content
   * @param {Object} context - Metadata (student name, package name, transaction ID, etc.)
   * @param {Object} config - Config details for this provider from DB settings
   */
  async send(message, context, config) {
    throw new Error("send() method must be implemented by concrete providers");
  }
}

/**
 * WhatsApp Provider (Future-ready for WhatsApp Business API or third-party gateways like Twilio/Wati)
 */
class WhatsAppNotificationProvider extends NotificationProvider {
  async send(message, context, config) {
    const { enabled, apiEndpoint, accessToken, senderPhone, recipientPhone } = config || {};
    if (!enabled) return { success: false, reason: "WhatsApp channel disabled." };
    
    const targetPhone = recipientPhone || "917858036851"; // fallback admin number
    const finalUrl = apiEndpoint || "https://api.whatsapp.com/v1/messages"; // Mock endpoint
    
    console.log("[NOTIFY] WhatsApp dispatching: ", message, "To:", targetPhone);

    // Dynamic future-ready integration code:
    // If the admin sets up an API key, we make the HTTP POST request:
    if (apiEndpoint && accessToken) {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: targetPhone,
            type: "text",
            text: { body: message }
            // Or template payload depending on API requirements
          })
        });
        const resData = await response.json();
        return { success: response.ok, data: resData };
      } catch (err) {
        console.error("WhatsApp Business API connection error:", err);
        return { success: false, error: err.message };
      }
    }

    // Default development log/simulation when credentials are not yet saved
    return { 
      success: true, 
      simulated: true, 
      message: `WhatsApp simulated to ${targetPhone}` 
    };
  }
}

/**
 * Telegram Provider (Bot API setup)
 */
class TelegramNotificationProvider extends NotificationProvider {
  async send(message, context, config) {
    const { enabled, botToken, chatId } = config || {};
    if (!enabled || !botToken || !chatId) {
      return { success: false, reason: "Telegram credentials missing or disabled." };
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
      const data = await response.json();
      return { success: data.ok, data };
    } catch (err) {
      console.error("Telegram API dispatch failed:", err);
      return { success: false, error: err.message };
    }
  }
}

/**
 * Email Provider (SMTP or API triggers like SendGrid/Resend/Mailgun)
 */
class EmailNotificationProvider extends NotificationProvider {
  async send(message, context, config) {
    const { enabled, apiEndpoint, apiKey, recipientEmail } = config || {};
    if (!enabled) return { success: false, reason: "Email channel disabled." };

    console.log("[NOTIFY] Email dispatching to:", recipientEmail || "Admin");

    if (apiEndpoint && apiKey) {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            to: recipientEmail,
            subject: "New Course Purchase Request - Success Empire",
            html: `<pre>${message}</pre>`
          })
        });
        return { success: response.ok };
      } catch (err) {
        console.error("Email dispatch failed:", err);
        return { success: false, error: err.message };
      }
    }

    return { success: true, simulated: true };
  }
}

/**
 * FCM Push Notification Provider (Native App Push using Firebase Cloud Messaging)
 */
class FcmNotificationProvider extends NotificationProvider {
  async send(message, context, config) {
    const { enabled, db } = config || {};
    if (!enabled || !db) return { success: false, reason: "FCM Push disabled." };

    console.log("[NOTIFY] FCM Push notifying admin devices...");
    // We can write to the 'notifications' collection in Firestore.
    // The existing Cloud Function 'sendFcmNotification' in index.js listens to this collection
    // and sends FCM notifications automatically!
    try {
      const adminNotifRef = doc(db, "notifications", `admin-alert-${Date.now()}`);
      await setDoc(adminNotifRef, {
        id: Date.now(),
        title: "New Purchase Request! 💳",
        desc: `${context.studentName} is requesting access to ${context.packageName}`,
        recipient: "parwejhayat3@gmail.com", // Admin email
        screen: "pendingPayments", // Navigate admin directly to verification panel
        timestamp: Date.now()
      });
      return { success: true };
    } catch (err) {
      console.error("FCM Firestore write failed:", err);
      return { success: false, error: err.message };
    }
  }
}

/**
 * Main manager that coordinates all notification channels
 */
export class NotificationManager {
  /**
   * Dispatches a notification to all active channels
   * @param {Object} db - Firestore database instance
   * @param {Object} context - Transaction metadata
   */
  static async notifyNewPurchase(db, context) {
    if (!db) {
      console.error("[NOTIFY] Database not initialized. Cannot dispatch notifications.");
      return;
    }

    const { studentName, packageName, amountPaid, transactionId } = context;

    // Standard Message Template requested by user:
    const messageText = `New Purchase Request!
Student Name: ${studentName}
Package: ${packageName}
Payment Received.
Kripya Admin Panel me jaakar Approve ya Reject karein.`;

    try {
      // 1. Fetch dynamic notification settings from Firestore
      const settingsRef = doc(db, "settings", "notifications");
      const settingsSnap = await getDoc(settingsRef);
      
      let notifSettings = {};
      if (settingsSnap.exists()) {
        notifSettings = settingsSnap.data();
      } else {
        // Seed default notification settings for standard WhatsApp notification & FCM
        notifSettings = {
          whatsapp: {
            enabled: true, // Default to true
            apiEndpoint: "", // To be entered in admin panel
            accessToken: "",
            senderPhone: "",
            recipientPhone: "917858036851" // Admin WhatsApp
          },
          telegram: {
            enabled: false,
            botToken: "",
            chatId: ""
          },
          email: {
            enabled: false,
            apiEndpoint: "",
            apiKey: "",
            recipientEmail: "parwejhayat3@gmail.com"
          },
          fcm: {
            enabled: true // Default push notification to true
          }
        };
        await setDoc(settingsRef, notifSettings);
      }

      // 2. Map and run all providers asynchronously (Enterprise safety: don't let one fail stop the others)
      const providers = [
        { key: 'whatsapp', provider: new WhatsAppNotificationProvider(), config: notifSettings.whatsapp },
        { key: 'telegram', provider: new TelegramNotificationProvider(), config: notifSettings.telegram },
        { key: 'email', provider: new EmailNotificationProvider(), config: notifSettings.email },
        { key: 'fcm', provider: new FcmNotificationProvider(), config: { ...notifSettings.fcm, db } }
      ];

      const results = await Promise.allSettled(
        providers.map(async ({ key, provider, config }) => {
          try {
            const res = await provider.send(messageText, context, config);
            console.log(`[NOTIFY] Channel [${key}] result:`, res);
            return { channel: key, ...res };
          } catch (e) {
            console.error(`[NOTIFY] Channel [${key}] threw exception:`, e);
            return { channel: key, success: false, error: e.message };
          }
        })
      );

      return results.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason });
    } catch (error) {
      console.error("[NOTIFY] Fatal error in NotificationManager dispatch:", error);
      return [];
    }
  }
}
