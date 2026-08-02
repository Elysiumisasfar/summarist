import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if we are running in the browser and if the key exists
const hasApiKey = typeof process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "string" && process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length > 0;

let app: FirebaseApp | undefined;

if (getApps().length > 0) {
  app = getApp();
} else if (hasApiKey) {
  app = initializeApp(firebaseConfig);
}

// Safely initialize auth only if app exists
export const auth = app ? getAuth(app) : ({} as Auth);