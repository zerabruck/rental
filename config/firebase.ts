import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCvBbAv_p-5AAgpceVwjgeoTfyOJ77SaYA",
  authDomain: "house-rental-23157.firebaseapp.com",
  projectId:"house-rental-23157",
  storageBucket:"house-rental-23157.appspot.com",
  messagingSenderId:"410392996060",
  appId:"1:410392996060:web:9d277e9e4cd5c9c53b2c19",
  measurementId:"G-FFKNB2PHYJ"
};
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId:process.env.NEXT_PUBLIC_MEASUREMENT_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)