import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmMH-Porgvfd8AGrM9LFc2xrwKpK6XhPU",
  authDomain: "crown-clothing-db-70e3b.firebaseapp.com",
  projectId: "crown-clothing-db-70e3b",
  storageBucket: "crown-clothing-db-70e3b.appspot.com",
  messagingSenderId: "179932318652",
  appId: "1:179932318652:web:8841f8b7ac4bc6ffc1f9b9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { dislayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        dislayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
