// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvvKMnVg9oBSxuVpt8ulGbAD0uYOyVxMI",
  authDomain: "prismaforge-a992d.firebaseapp.com",
  projectId: "prismaforge-a992d",
  storageBucket: "prismaforge-a992d.appspot.com",
  messagingSenderId: "655784851397",
  appId: "1:655784851397:web:fe49cd4c0b9036bf0a3dac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    console.log("Sign-in function successful.");
    const user = result.user;
    console.log("Full result body: ", result);
    console.log("User: ", user);
  } catch (error) {
    console.log(error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Sign-out function successful.");
  } catch (error) {
    console.log(error);
  }
};

const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, signInWithGoogle, signOutUser, onAuthStateChange };
export type { User };
