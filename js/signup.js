import { auth, db } from "./auth.js";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
   signInWithRedirect
}
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import {
  ref,
  set
}
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";




// EMAIL SIGNUP
const signup = async () => {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  try {

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = result.user;

    await set(ref(db, "users/" + user.uid), {
      name: name,
      email: email
    });

    alert("Signup Success ✅");
    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

};

document.getElementById("btn")
.addEventListener("click", signup);





// GOOGLE SIGN IN
const provider = new GoogleAuthProvider();

const googleLogin = async () => {

  try {

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    await set(ref(db, "users/" + user.uid), {
      name: user.displayName,
      email: user.email
    });

    alert("Google Login Success ✅");
    window.location.href = "index.html";

  } catch (error) {

    console.log(error);

    alert(error.message);

  }

};

document.getElementById("googleBtn")
.addEventListener("click", googleLogin);