import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCVdyiAxlbvjkcFByjX8JVC6UlAz6hoqWU",
  authDomain: "food-app-c6e60.firebaseapp.com",
  projectId: "food-app-c6e60",
  storageBucket: "food-app-c6e60.firebasestorage.app",
  messagingSenderId: "303665537848",
  appId: "1:303665537848:web:685f38b9217f38baa757cd",
  measurementId: "G-SM5GXPRST7",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

// Configure Google provider for better UX
googleProvider.setCustomParameters({
  prompt: "select_account",
})

// Enable offline persistence
export const enableOffline = () => disableNetwork(db)
export const enableOnline = () => enableNetwork(db)

// Network status monitoring
export const monitorNetworkStatus = () => {
  if (typeof window !== "undefined") {
    window.addEventListener("online", () => enableNetwork(db))
    window.addEventListener("offline", () => disableNetwork(db))
  }
}
