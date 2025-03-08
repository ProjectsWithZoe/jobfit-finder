import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

// Firebase configuration - replace with your own config
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_apiKey,
  authDomain: process.env.VITE_FIREBASE_authDomain,
  projectId: process.env.VITE_FIREBASE_projectId,
  storageBucket: process.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: process.env.VITE_FIREBASE_messagingSenderId,
  appId: process.env.VITE_FIREBASE_appId,
  measurementId: process.env.VITE_FIREBASE_measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
