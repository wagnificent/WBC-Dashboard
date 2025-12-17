/**
 * Firebase Configuration for Wooden Bat Classic Dashboard
 *
 * This file contains the Firebase configuration and initialization
 * for the dashboard application.
 */

// Firebase configuration - should be loaded from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.FIREBASE_APP_ID || "",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase
let firebaseApp;
let db;
let analytics;

function initializeFirebase() {
  // Check if Firebase is already initialized
  if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
    firebaseApp = firebase.apps[0];
    db = firebaseApp.firestore();
    console.log('Firebase already initialized, using existing instance');
    return;
  }

  // Import and initialize Firebase
  import('https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js').then(() => {
    import('https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js').then(() => {
      import('https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js').then(() => {
        // Initialize Firebase
        firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebaseApp.firestore();

        // Initialize Analytics (optional)
        if (typeof firebase.analytics !== 'undefined') {
          analytics = firebase.analytics();
        }

        console.log('Firebase initialized successfully');
      }).catch(error => {
        console.warn('Firebase Analytics failed to load:', error);
        // Continue without analytics
      });
    });
  }).catch(error => {
    console.error('Failed to load Firebase:', error);
  });
}

// Function to get Firestore database instance
function getFirestore() {
  if (!db) {
    console.warn('Firebase not initialized. Call initializeFirebase() first.');
  }
  return db;
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeFirebase,
    getFirestore,
    firebaseConfig
  };
} else {
  // Browser global
  window.firebaseConfig = firebaseConfig;
  window.initializeFirebase = initializeFirebase;
  window.getFirestore = getFirestore;
}
