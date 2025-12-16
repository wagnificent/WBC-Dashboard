/**
 * Firebase Configuration for Wooden Bat Classic Dashboard
 *
 * This file contains the Firebase configuration and initialization
 * for the dashboard application.
 */

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6NjwGVYq45kd_cruPhamOxXRClPIHFd4",
  authDomain: "wbc-dashboard.firebaseapp.com",
  projectId: "wbc-dashboard",
  storageBucket: "wbc-dashboard.firebasestorage.app",
  messagingSenderId: "594611335380",
  appId: "1:594611335380:web:7e162a0f9dc25c7f8f0b41",
  measurementId: "G-1TNPWMGH2F"
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
