import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB47gK0A-e79t0GyOMz6AdbWNndlkGOyJo",
  authDomain: "bigdark-1837.firebaseapp.com",
  projectId: "bigdark-1837",
  storageBucket: "bigdark-1837.firebasestorage.app",
  messagingSenderId: "309071918698",
  appId: "1:309071918698:web:d416ec569273be10853c13"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
