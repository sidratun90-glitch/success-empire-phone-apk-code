/**
 * Payment Service Abstraction
 * Designed for Course App 2 (Success Empire)
 * 
 * Provides a modular, scalable architecture to swap or extend payment providers
 * (e.g., Manual UPI verification, Razorpay, Stripe, Paytm) without changing the core UI components.
 */

import { doc, setDoc, addDoc, collection, getDoc, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';

/**
 * Utility to create a purchase-only backup snapshot in Firestore backups collection
 */
export const createPurchaseBackupSnapshot = async (db, category, label, adminEmail = 'system') => {
  try {
    const snap = await getDocs(collection(db, "purchase_records"));
    const purchase_records = [];
    snap.forEach((docSnap) => {
      purchase_records.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Simple hash function for integrity
    const hashData = JSON.stringify(purchase_records);
    let hash = 0;
    for (let i = 0; i < hashData.length; i++) {
      hash = (hash << 5) - hash + hashData.charCodeAt(i);
      hash |= 0;
    }
    const integrityHash = `SHA-${Math.abs(hash).toString(16).toUpperCase()}`;

    const payload = {
      backupType: "purchase_records",
      backupMeta: {
        version: "1.0",
        createdAt: Date.now(),
        label: label,
        recordCount: purchase_records.length,
        createdBy: adminEmail,
        integrityHash
      },
      purchase_records: purchase_records
    };

    const backupId = `purchase_backup_${Date.now()}`;
    const backupDoc = {
      id: backupId,
      createdAt: Date.now(),
      category: category, // "purchase_auto", "purchase_manual", "purchase_golden"
      label: label,
      fileSize: `${(JSON.stringify(payload).length / 1024).toFixed(2)} KB`,
      isLocked: category === "purchase_golden",
      storedOffline: false,
      packageCount: 0,
      lessonCount: 0,
      userCount: 0,
      purchaseCount: purchase_records.length,
      data: JSON.stringify(payload)
    };

    await setDoc(doc(db, "backups", backupId), backupDoc);
    return backupDoc;
  } catch (e) {
    console.error("Failed to create purchase backup snapshot:", e);
    return null;
  }
};

/**
 * Interface/Base class for Payment Providers
 */
export class PaymentProvider {
  /**
   * Process a payment request
   * @param {Object} data - Payment transaction details
   * @returns {Promise<Object>} - Status and receipt details
   */
  async process(data) {
    throw new Error("process() method must be implemented by concrete providers");
  }
}

/**
 * Concrete Provider for Manual Payment Verification (Screenshots + UPI ID)
 */
export class ManualPaymentProvider extends PaymentProvider {
  /**
   * Processes a manual payment request by writing a pending record to Firestore.
   */
  async process({ db, auth, userId, userEmail, userName, userPhone, packageId, packageName, amountPaid, discountAmount, couponCode, transactionId, screenshotUrl }) {
    if (!db) throw new Error("Firestore database instance is required.");
    if (!auth || !userId) throw new Error("Authenticated user details are required.");

    const paymentRequestId = `REQ-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const requestData = {
      id: paymentRequestId,
      userId,
      userEmail: userEmail || auth.currentUser?.email || '',
      userName: userName || auth.currentUser?.displayName || 'Student',
      userPhone: userPhone || '',
      packageId,
      packageName,
      amountPaid: Number(amountPaid),
      discountAmount: Number(discountAmount || 0),
      couponCode: couponCode || null,
      transactionId: String(transactionId).trim(),
      screenshotUrl: screenshotUrl || '',
      status: 'pending', // pending, approved, rejected
      timestamp: Date.now(),
      paymentMethod: 'upi_manual',
      reviewedBy: null,
      reviewedAt: null,
      rejectionReason: null
    };

    // 1. Create the pending request in the payment_requests collection
    const requestRef = doc(db, "payment_requests", paymentRequestId);
    await setDoc(requestRef, requestData);

    // 2. Also log this transaction with a pending status in the payments collection for historic logs
    const paymentLogRef = doc(db, "payments", paymentRequestId);
    await setDoc(paymentLogRef, {
      id: paymentRequestId,
      userId,
      userEmail: userEmail || auth.currentUser?.email || '',
      packageName,
      packageId,
      amount: Number(amountPaid),
      discountAmount: Number(discountAmount || 0),
      couponCode: couponCode || null,
      status: "Pending Verification",
      timestamp: Date.now(),
      paymentMethod: "UPI Manual Request",
      transactionId: String(transactionId).trim(),
      screenshotUrl: screenshotUrl || ''
    });

    return {
      success: true,
      requestId: paymentRequestId,
      status: 'pending',
      message: "Payment request submitted successfully for approval."
    };
  }

  /**
   * Approves a manual payment request, unlocks the course, creates an immutable purchase record,
   * and creates an automatic purchase backup snapshot.
   */
  async approve(db, requestId) {
    if (!db) throw new Error("Firestore database instance is required.");

    const requestRef = doc(db, "payment_requests", requestId);
    const requestSnap = await getDoc(requestRef);
    if (!requestSnap.exists()) {
      return { success: false, message: "Payment request not found." };
    }

    const requestData = requestSnap.data();
    if (requestData.status === 'approved') {
      return { success: false, message: "Payment request already approved." };
    }

    const adminEmail = auth.currentUser?.email || 'parwejhayat3@gmail.com';
    const now = Date.now();

    // 1. Update status of the request
    await updateDoc(requestRef, {
      status: 'approved',
      reviewedAt: now,
      reviewedBy: adminEmail
    });

    // 2. Update status of the payment log
    const paymentLogRef = doc(db, "payments", requestId);
    const paymentLogSnap = await getDoc(paymentLogRef);
    if (paymentLogSnap.exists()) {
      await updateDoc(paymentLogRef, {
        status: 'Approved'
      });
    }

    // 3. Update user profile to unlock course
    const userRef = doc(db, "users", requestData.userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        purchasedPackages: arrayUnion(requestData.packageId)
      });
    }

    // 4. Create immutable purchase record
    const helperHash = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    };
    const certId = `SE-${Math.abs(helperHash((requestData.userName || requestData.userEmail || 'Student') + requestData.packageName)).toString(36).toUpperCase()}`;

    const purchaseRecordData = {
      uid: requestData.userId,
      userName: requestData.userName || 'Student',
      email: requestData.userEmail || 'unknown@example.com',
      packageId: requestData.packageId,
      courseId: requestData.packageId, // store both for safety
      packageName: requestData.packageName,
      amountPaid: Number(requestData.amountPaid) || 0,
      paymentId: requestId,
      transactionId: requestData.transactionId || requestId,
      purchaseDate: requestData.timestamp || now,
      approvedAt: now,
      paymentStatus: 'approved',
      adminName: adminEmail,
      restoreStatus: 'original',
      certificateId: certId
    };

    // Storing in purchase_records collection with a unique but readable ID
    const recordDocId = `${requestData.userEmail}_${requestData.packageId}`.replace(/\./g, '_');
    await setDoc(doc(db, "purchase_records", recordDocId), purchaseRecordData);

    // 5. Create automatic purchase backup snapshot
    await createPurchaseBackupSnapshot(
      db,
      "purchase_auto",
      `Auto Backup on Approval of ${requestData.userEmail} for ${requestData.packageName}`,
      adminEmail
    );

    // 6. Log recovery event
    await addDoc(collection(db, "recovery_logs"), {
      userEmail: requestData.userEmail || 'unknown@example.com',
      actionType: "APPROVE_PAYMENT_AND_BACKUP",
      performedBy: adminEmail,
      actionDate: now,
      notes: `Approved access to ${requestData.packageName}. Created automatic purchase backup.`
    });

    return {
      success: true,
      message: "Payment approved and purchase backed up successfully."
    };
  }
}

/**
 * Concrete Provider for Razorpay Payment Gateway (Placeholder/Ready to wire)
 */
export class RazorpayPaymentProvider extends PaymentProvider {
  async process({ db, auth, packageId, packageName, amountPaid, couponCode, onGatewaySuccess }) {
    console.log("[RAZORPAY] Initializing gateway transaction for", packageName, "Amount:", amountPaid);
    
    // In the future, to integrate Razorpay:
    // 1. Load Razorpay checkout script: https://checkout.razorpay.com/v1/checkout.js
    // 2. Create order on your backend (or Firebase Cloud Function) to secure order_id
    // 3. Open Razorpay checkout options:
    //    const options = {
    //      key: "YOUR_RAZORPAY_KEY",
    //      amount: amountPaid * 100, // in paisa
    //      currency: "INR",
    //      name: "Success Empire",
    //      description: packageName,
    //      order_id: orderId,
    //      handler: function(response) {
    //        // on success call onGatewaySuccess(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
    //      }
    //    }
    
    return new Promise((resolve) => {
      // Simulate Razorpay Gateway Opening
      setTimeout(() => {
        resolve({
          gatewayOpened: true,
          message: "Razorpay simulated screen. Wire up production API keys here."
        });
      }, 500);
    });
  }
}

/**
 * Payment Manager Factory to instantiate correct provider
 */
export class PaymentManager {
  static getProvider(method) {
    switch (method) {
      case 'upi_manual':
        return new ManualPaymentProvider();
      case 'razorpay':
        return new RazorpayPaymentProvider();
      default:
        throw new Error(`Unsupported payment method: ${method}`);
    }
  }
}
