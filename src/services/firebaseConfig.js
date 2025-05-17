import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAp4RiSw2pg06VEqzaQnVJ2OWTMupzmBsM",
  authDomain: "fastfood-91470.firebaseapp.com",
  projectId: "fastfood-91470",
  storageBucket: "fastfood-91470.appspot.com",
  messagingSenderId: "350888010660",
  appId: "1:350888010660:web:afb61fb3677b79d1511731",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;

try {
  auth = getAuth();
} catch (e) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

const db = getFirestore(app);

export { app, auth, db };
