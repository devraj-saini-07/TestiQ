    // firebase connections 

//    const firebaseApp = firebase.initializeApp({ 
   
//   apiKey: "AIzaSyBrosNrggkNnnVstEQkdAcJRF2_a0VHeJU",
//   authDomain: "testiq-85962.firebaseapp.com",
//   databaseURL: "https://testiq-85962-default-rtdb.firebaseio.com",
//   projectId: "testiq-85962",
//   storageBucket: "testiq-85962.firebasestorage.app",
//   messagingSenderId: "1025687455656",
//   appId: "1:1025687455656:web:5708e2f717a0760de43f9d",
//   measurementId: "G-GY1RPK5V5M"

//     });
//    const db = firebaseApp.database();

//    const auth = firebaseApp.auth();

// export {db,auth};


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import { getDatabase } 
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";


const firebaseConfig = {

  apiKey: "AIzaSyBrosNrggkNnnVstEQkdAcJRF2_a0VHeJU",
  authDomain: "testiq-85962.firebaseapp.com",
  databaseURL: "https://testiq-85962-default-rtdb.firebaseio.com",
  projectId: "testiq-85962",
  storageBucket: "testiq-85962.firebasestorage.app",
  messagingSenderId: "1025687455656",
  appId: "1:1025687455656:web:5708e2f717a0760de43f9d",
  measurementId: "G-GY1RPK5V5M"


};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);
