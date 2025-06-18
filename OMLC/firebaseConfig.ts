// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: In a real-world application, these should be environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyDAoXAQuJL7PgpdcU5bIT48ACYZ4HlN8LE",
  authDomain: "omlc-60539.firebaseapp.com",
  projectId: "omlc-60539",
  storageBucket: "omlc-60539.firebasestorage.app",
  messagingSenderId: "698949149313",
  appId: "1:698949149313:web:22698dd6c7569d9521a380",
  measurementId: "G-8046V4ERP7"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore; // Declare Firestore instance

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app); // Initialize Firestore
  // You can initialize other Firebase services here if needed (e.g., Storage)
  // const analytics = getAnalytics(app); // If you need analytics
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Handle initialization error appropriately, e.g., show a message to the user
  // For now, we'll re-throw, or you might want to set app/auth to null or a mock
  throw error;
}

export { app, auth, db }; // Export db
