import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDq2Xg7UbUmgtsJdiSRov_s7EFMoYAQX1Q",
  authDomain: "fir-basics-63caf.firebaseapp.com",
  projectId: "fir-basics-63caf",
  storageBucket: "fir-basics-63caf.appspot.com",
  messagingSenderId: "724639443069",
  appId: "1:724639443069:web:31ed32b2c7d5d9f5e3e914",
};
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
