import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  /** your firebase config here */
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};