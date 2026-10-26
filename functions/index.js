const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendFcmNotification = onDocumentCreated("notifications/{notifId}", async (event) => {
    const newNotif = event.data.data();
    if (!newNotif) return;

    const title = newNotif.title || "New Announcement";
    const body = newNotif.desc || "";
    const recipient = newNotif.recipient || "all";
    const targetScreen = newNotif.screen || "notifications";
    const notifIdStr = String(newNotif.id || event.params.notifId);

    // High priority notification payload according to FCM HTTP v1 specification
    const messagePayload = {
        notification: {
            title: title,
            body: body
        },
        android: {
            priority: "high",
            notification: {
                sound: "default",
                clickAction: "FLUTTER_NOTIFICATION_CLICK"
            },
            data: {
                screen: targetScreen,
                notifId: notifIdStr
            }
        },
        data: {
            screen: targetScreen,
            notifId: notifIdStr,
            title: title,
            body: body
        }
    };

    try {
        if (recipient.toLowerCase().trim() === "all" || recipient.toLowerCase().trim() === "all users") {
            // Send broadcast to all devices subscribed to the "all_users" topic
            const broadcastMessage = {
                ...messagePayload,
                topic: "all_users"
            };
            const response = await admin.messaging().send(broadcastMessage);
            console.log("Successfully sent broadcast message:", response);
        } else {
            // Find target user's registered FCM token inside Firestore users collection
            const usersRef = admin.firestore().collection("users");
            const snapshot = await usersRef.where("email", "==", recipient.toLowerCase().trim()).get();
            
            if (snapshot.empty) {
                console.log("FCM trigger: No registered user found for email:", recipient);
                return;
            }

            let tokensSent = 0;
            for (const doc of snapshot.docs) {
                const userData = doc.data();
                const fcmToken = userData.fcmToken;
                if (fcmToken) {
                    const personalMessage = {
                        ...messagePayload,
                        token: fcmToken
                    };
                    const response = await admin.messaging().send(personalMessage);
                    console.log(`Successfully sent targeted message to token for ${recipient}:`, response);
                    tokensSent++;
                }
            }
            if (tokensSent === 0) {
                console.log(`FCM trigger: User ${recipient} exists but has no active FCM token.`);
            }
        }
    } catch (error) {
        console.error("Error dispatching FCM notification:", error);
    }
});

exports.onPaymentRequestCreated = onDocumentCreated("payment_requests/{requestId}", async (event) => {
    const requestData = event.data.data();
    if (!requestData) return;

    const { userName, packageName, amountPaid, transactionId, id } = requestData;
    const db = admin.firestore();

    const messageText = `New Purchase Request!
Student Name: ${userName}
Package: ${packageName}
Payment Received.
Kripya Admin Panel me jaakar Approve ya Reject karein.`;

    try {
        // Fetch settings from settings/notifications
        const settingsSnap = await db.collection("settings").doc("notifications").get();
        let notifSettings = {
            whatsapp: { enabled: true, recipientPhone: "917858036851" },
            telegram: { enabled: false },
            email: { enabled: false },
            fcm: { enabled: true }
        };

        if (settingsSnap.exists) {
            notifSettings = settingsSnap.data();
        }

        // 1. WhatsApp Notification
        if (notifSettings.whatsapp && notifSettings.whatsapp.enabled) {
            const { apiEndpoint, accessToken, recipientPhone } = notifSettings.whatsapp;
            const targetPhone = recipientPhone || "917858036851";
            console.log(`[NOTIFY] Sending WhatsApp message to ${targetPhone}...`);
            
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
                            text: { body: messageText }
                        })
                    });
                    const resJson = await response.json();
                    console.log("[NOTIFY] WhatsApp API response:", resJson);
                } catch (err) {
                    console.error("[NOTIFY] WhatsApp API connection error:", err);
                }
            } else {
                console.log("[NOTIFY] WhatsApp simulated (credentials not set up in settings/notifications).");
            }
        }

        // 2. Telegram Notification
        if (notifSettings.telegram && notifSettings.telegram.enabled) {
            const { botToken, chatId } = notifSettings.telegram;
            if (botToken && chatId) {
                console.log(`[NOTIFY] Sending Telegram message to ${chatId}...`);
                const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
                try {
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: messageText
                        })
                    });
                } catch (err) {
                    console.error("[NOTIFY] Telegram API connection error:", err);
                }
            }
        }

        // 3. Email Notification
        if (notifSettings.email && notifSettings.email.enabled) {
            const { apiEndpoint, apiKey, recipientEmail } = notifSettings.email;
            if (apiEndpoint && apiKey) {
                console.log(`[NOTIFY] Sending Email notification to ${recipientEmail}...`);
                try {
                    await fetch(apiEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            to: recipientEmail,
                            subject: "New Course Purchase Request - Success Empire",
                            html: `<pre>${messageText}</pre>`
                        })
                    });
                } catch (err) {
                    console.error("[NOTIFY] Email dispatch failed:", err);
                }
            }
        }

        // 4. FCM Push Notification (Creates an admin notification in the database)
        if (notifSettings.fcm && notifSettings.fcm.enabled) {
            console.log("[NOTIFY] Sending FCM Admin Alert...");
            const notifId = `admin-alert-${Date.now()}`;
            await db.collection("notifications").doc(notifId).set({
                id: Date.now(),
                title: "New Purchase Request! 💳",
                desc: `${userName} is requesting access to ${packageName}`,
                recipient: "parwejhayat3@gmail.com", // Admin email
                screen: "pendingPayments", // Route admin straight to the approval tab
                timestamp: Date.now()
            });
        }

    } catch (error) {
        console.error("[NOTIFY] Error in onPaymentRequestCreated trigger:", error);
    }
});
