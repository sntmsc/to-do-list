import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCFlQNy_qMe0giJIx7fDE_cxR2Pt7VdERE",
    authDomain: "todo-list-e4b1b.firebaseapp.com",
    projectId: "todo-list-e4b1b",
    storageBucket: "todo-list-e4b1b.appspot.com",
    messagingSenderId: "118071534541",
    appId: "1:118071534541:web:bec0403dc9b744b82f5a84"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  export default db;
  