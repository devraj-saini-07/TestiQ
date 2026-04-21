import { auth, db } from "./auth.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import {
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

console.log("login page");
// Page load pe pehle localStorage dikhao

const localName = localStorage.getItem("username");
if (localName) {
  document.getElementById("usern").innerText = "Dear, " + localName;
}

// Fir Firebase se update karo
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);

    try {
      const snapshot = await get(ref(db, "users/" + user.uid));

      if (snapshot.exists()) {
        const data = snapshot.val();

        console.log("User data from DB:", data);

        // ✅ UI update from DB
        document.getElementById("usern").innerText = "Dear, " + data.name;

        // ✅ save name locally
        localStorage.setItem("username", data.name);
      } else {
        console.log("No data in DB");

        // 🔁 fallback to localStorage
        const localName = localStorage.getItem("username");

        if (localName) {
          document.getElementById("usern").innerText = "Dear, " + localName;
        }
      }
    } catch (error) {
      console.error("DB error:", error.message);

      // 🔁 fallback if error (like permission denied)
      const localName = localStorage.getItem("username");

      if (localName) {
        document.getElementById("usern").innerText = "Dear, " + localName;
      }
    }
  } else {
    console.log("No user logged in");

    document.getElementById("usern").innerText = "Dear, Guest";
  }
});

//  hide scroll up and down

document.addEventListener("DOMContentLoaded", () => {
  let head1 = document.querySelector(".head1");

  if (!head1) return; // agar element nahi mila to code stop

  let lastscroll = window.pageYOffset;

  head1.classList.remove("hide");

  window.addEventListener("scroll", () => {
    let currentscroll = window.pageYOffset;

    if (currentscroll > lastscroll && currentscroll > 100) {
      head1.classList.add("hide");
    } else {
      head1.classList.remove("hide");
    }

    lastscroll = currentscroll;
  });
});

// user motivation liness

const pmoti = document.querySelector("#moti");

const cont = [
  "Your smart companion for tracking growth and performance. Success comes from understanding your progress and improving consistently. With Testiq, visualize your journey through clear insights, interactive charts, and meaningful analysis.",

  "Your perfect partner for monitoring growth and performance. Real success begins when you track your progress and improve consistently. With Testiq, explore your journey using clear insights, engaging charts, and smart analysis.",

  "A reliable companion to track your growth and performance. Success is achieved by knowing your progress and improving step by step. With Testiq, view your journey with clear insights, dynamic charts, and useful analysis.",

  "Your daily companion for tracking growth and performance. True success comes from analyzing your progress and improving regularly. With Testiq, understand your journey through simple insights, visual charts, and deep analysis.",

  "A smart tool to monitor your growth and performance. Success grows when you understand your progress and improve consistently. With Testiq, follow your journey using clear insights, modern charts, and meaningful analysis.",

  "Your trusted companion for growth and performance tracking. Success is built by reviewing your progress and improving daily. With Testiq, see your journey through powerful insights, interactive charts, and smart analysis.",

  "An intelligent companion to track growth and performance. Real success comes from understanding progress and improving every day. With Testiq, experience your journey through clear insights, rich charts, and useful analysis.",

  "Your simple companion for tracking growth and performance. Success begins when you measure progress and improve consistently. With Testiq, discover your journey using clear insights, visual charts, and smart analysis.",

  "A modern companion to track your growth and performance. Success happens when you understand your progress and improve step by step. With Testiq, explore your journey through clear insights, interactive charts, and deep analysis.",

  "Your smart partner for tracking growth and performance. Success is driven by understanding your progress and improving consistently. With Testiq, visualize your journey with clear insights, engaging charts, and meaningful analysis.",
];

let pind = Math.floor(Math.random() * cont.length);

let para = cont[pind];
let i = 0;
let speed = 30;
function write() {
  if (i < para.length) {
    pmoti.innerHTML += para.charAt(i);
    i++;

    setTimeout(write, speed);
  }
}

window.onload = () => {
  pmoti.innerText = " ";
  write();
};

//  news fetching

const apikey = "pub_f2a5a8c079c548bd90ae3c8fa0e9cd9b";

//  filter function
function getUniqueNews(results) {
  const seen = new Set();

  return results.filter((article) => {
    if (seen.has(article.title)) return false;
    seen.add(article.title);
    return true;
  });
}

async function update() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${apikey}&q=technology`,
    );

    if (res.status === 429) throw new Error("limit");

    const data = await res.json();

    const uniqueData = getUniqueNews(data.results);

    showNews({ results: uniqueData });
    localStorage.setItem("news", JSON.stringify({ results: uniqueData }));
  } catch (err) {
    console.log("Using saved data");

    const saved = localStorage.getItem("news");
    if (saved) {
      showNews(JSON.parse(saved));
    } else {
      document.getElementById("detail").innerText =
        "News not available right now 😅";
    }
  }
}

//  ek hi function me pura rendering
function showNews(data) {
  const cards = document.querySelectorAll("#detail .detaildiv");

  cards.forEach((card, index) => {
    const article = data.results[index];
    if (!article) return;

    // heading
    card.querySelector(".heading").innerText = article.title;

    // image
    let img = card.querySelector("img");

    if (!img) {
      img = document.createElement("img");
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      card.appendChild(img);
    }

    if (article.image_url) {
      img.src = article.image_url;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }

    // description replace
    const textNode = [...card.childNodes].find((n) => n.nodeType === 3);

    if (textNode) {
      textNode.nodeValue = article.description || "";
    }
  });
}

update();

//  current time date

const pagetime = document.querySelector("#time h2");
let mydate = new Date();

let day = mydate.getDate();
let month = mydate.getMonth() + 1;
let year = mydate.getFullYear();

console.log(` Date: ${day}/${month}/${year}`);
pagetime.innerHTML = ` Date: ${day}/${month}/${year}`;

// gemini api fetching

const gemini = "AIzaSyBcn-K3B1VjLZGE_ksUez4w1GnjPULh-EU";

let prompt = " tell me about motivation 4 lines ";

async function testAI(prompt) {
  try {
    if (!prompt || !prompt.trim()) {
      return "Please enter a valid prompt.";
    }

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": gemini,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    console.log(res.status); // should be 200

    const data = await res.json();
    console.log(data);

    if (data.error) {
      console.error("API Error:", data.error.message);
      return null;
    }

    let ans = data?.candidates?.[0]?.content?.parts?.[0]?.text; // actual response

    if (!ans) {
      ans = "No response from AI";
    }
    console.log(ans);

    return ans;
  } catch (err) {
    console.log(`error :${err}`);
    return "Network error";
  }
}



// Ai box searchinng

const searchbtn = document.querySelector("#search_22");

let utext;
let load = false;

searchbtn.addEventListener("click", aiwork);

async function aiwork() {
  if (load) {
    return;
  }
  utext = document.getElementById("uinput").value;

  if (!utext.trim()) {
    alert("Please enter something");
    ptypeai.innerHTML = "Welcome back on TestiQ Ai box";

    return;
  }

  //alert("btn click");
  console.log(`user typed: ${utext}`);

  ptypeai.innerHTML = "Thinking...";

  let ans;

  searchbtn.disabled = true;
  load = true;
  ans = await testAI(utext);

  
  load = false;


  if (!ans) {
    ans = "All servers busy 😅 try later";
  }

  ptypeai.innerHTML = "";
  j = 0; // j ki value nhi ki to last se chalu hoga

  typeutext(ans);
}

const ptypeai = document.querySelector("#typepara");

let j = 0;
let speedtype = 30;

function typeutext(answere) {
  let paratext = answere;

  function type() {
    if (j < paratext.length) {
      ptypeai.innerHTML += paratext.charAt(j);
      j++;

      // setTimeout(typeutext, speedtype); ai solution niche parameter dena hota he

      setTimeout(type, speedtype);
    } else {
      searchbtn.disabled = false;
    }
  }

  type();
}

let testbtn = document.querySelector("#test_btn");

testbtn.addEventListener("click", () => {
  window.location.href = "#test_h22";
});

// test open karne ke liye

const btns = document.querySelectorAll(".testbtn");
let testid;

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first to start the test 🔐");
      window.location.href = "../login.html";
      return;
    }

    // ✅ user logged in → allow
    testid = btn.id;
    localStorage.setItem("testid", testid);
    window.location.href = "test.html";
  });
});

// profile login

const log = document.querySelector("#profileicon");

log.addEventListener("click", () => {
  window.location.href = "login.html";
});
