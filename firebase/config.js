import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/** Firebase config. 
 * 
 * The config is using Vercel environment variables - for Vercel deployment set matching variables within the Vercel project. 
 * Otherwise use static firestore configuration here.
 * */

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};