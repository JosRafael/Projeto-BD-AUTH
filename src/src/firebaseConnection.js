import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCs84AnoVJaeIuIRbM8gGrgVC2ve0u5ltk",
  authDomain: "curso-1b23a.firebaseapp.com",
  projectId: "curso-1b23a",
  storageBucket: "curso-1b23a.appspot.com",
  messagingSenderId: "507789783136",
  appId: "1:507789783136:web:3bcd830d7aee9511321305",
  measurementId: "G-ZL41S9M04N"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };