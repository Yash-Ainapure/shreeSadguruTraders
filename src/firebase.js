import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC5britv7Z2qu53by6XbdXjIMw610UweFg",
  authDomain: "shreesadgurutraders-d2a49.firebaseapp.com",
  databaseURL: "https://shreesadgurutraders-d2a49-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shreesadgurutraders-d2a49",
  storageBucket: "shreesadgurutraders-d2a49.appspot.com",
  messagingSenderId: "1017282681130",
  appId: "1:1017282681130:web:3c09d80c0e232bcfc3a653",
  measurementId: "G-HTR7REJ94J"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

const database=getDatabase(app)

export {database};
export const auth = getAuth(app);
export default app;
