import { auth } from "./auth.js";
//import { signInWithRedirect } from "firebase/auth";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
   signInWithRedirect,
    getRedirectResult
}
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";




// EMAIL LOGIN
const login = async () => {

   const email = document.querySelector("#email").value;

   const password = document.querySelector("#pass").value;

   try {

      const result = await signInWithEmailAndPassword(
         auth,
         email,
         password
      );

      localStorage.setItem("user", JSON.stringify(result.user));
      alert("Login Success ✅");

      window.location.href = "index.html";

   }

   catch (error) {

      alert(error.message);

   }

};

document.querySelector("#btn")
.addEventListener("click", login);






// GOOGLE LOGIN
const provider = new GoogleAuthProvider();

const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Google user:", user);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("username", user.displayName || user.email);

    alert("Google Login Success ✅");

    window.location.href = "index.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


document.querySelector("#googleBtn")
.addEventListener("click", googleLogin);

window.addEventListener("load", async () => {
  try {
    const result = await getRedirectResult(auth);

    if (result) {
      const user = result.user;

      console.log("Google user:", user);

      // ✅ localStorage save
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("username", user.displayName || user.email);

      alert("Google Login Success ✅");

      window.location.href = "index.html";
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});