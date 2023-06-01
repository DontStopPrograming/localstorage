
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDvo-niKJ92kNqyC7z92L1YCC23Zbp4rPk",
  authDomain: "dyamond-2f623.firebaseapp.com",
  projectId: "dyamond-2f623",
  storageBucket: "dyamond-2f623.appspot.com",
  messagingSenderId: "1037605398500",
  appId: "1:1037605398500:web:a1371f2bbc6f45e49489f1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)