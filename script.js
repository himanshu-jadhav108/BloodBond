// Theme Toggle
function toggleTheme() { document.body.classList.toggle("dark-theme"); }

// Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,hi,mr,ta,te,bn,gu,kn,ml,pa,ur' }, 'google_translate_element');
}

// Counter Animation
document.querySelectorAll('.counter').forEach(counter => {
  counter.innerText = "0";
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 100;
    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(updateCounter, 20);
    } else counter.innerText = target;
  };
  updateCounter();
});

// Quiz
const quizQuestions = [
  { q: "Donating blood makes you weak for life.", a: false },
  { q: "One donation can save up to 3 lives.", a: true },
  { q: "You can donate blood every 3 months.", a: true }
];
let currentQ = 0, score = 0;
function loadQuestion() {
  if (currentQ < quizQuestions.length) {
    document.getElementById("quiz-question").innerText = quizQuestions[currentQ].q;
    document.getElementById("quiz-result").innerText = "";
  } else {
    document.getElementById("quiz-question").innerText = `🎯 Quiz Completed! Score: ${score}/${quizQuestions.length}`;
    document.getElementById("quiz-result").innerHTML = `<button onclick="restartQuiz()">Restart Quiz</button>`;
  }
}
function checkAnswer(ans) {
  if (currentQ < quizQuestions.length) {
    if (ans === quizQuestions[currentQ].a) { score++; document.getElementById("quiz-result").innerText = "✅ Correct!"; }
    else document.getElementById("quiz-result").innerText = "❌ Wrong!";
    setTimeout(()=>{ currentQ++; loadQuestion(); },1000);
  }
}
function restartQuiz(){ currentQ=0; score=0; loadQuestion(); }
loadQuestion();

// Volunteer Form
document.querySelector(".volunteer-form")?.addEventListener("submit", e => {
  e.preventDefault(); alert("✅ Thank you for volunteering!"); e.target.reset();
});

// Feedback
document.querySelector(".feedback-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const name=e.target[0].value, rating=e.target[1].value, msg=e.target[2].value;
  const card=document.createElement("div"); card.classList.add("feedback-card");
  card.innerHTML=`<p>"${msg}"</p><h4>- ${name} ${rating}</h4>`;
  document.getElementById("feedback-list").prepend(card);
  e.target.reset();
});

// Leaflet Map
const map = L.map('map').setView([19.7515,75.7139],6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'&copy; OpenStreetMap'}).addTo(map);
fetch("hospitals.json").then(r=>r.json()).then(data=>{
  data.forEach(h=>L.marker(h.coords).addTo(map).bindPopup(`<b>${h.name}</b><br>📞 <a href="tel:${h.phone}">${h.phone}</a>`));
});
map.locate({setView:true,maxZoom:12});
map.on("locationfound",e=>L.marker(e.latlng).addTo(map).bindPopup("📍 You are here").openPopup());

// Blood Requests
const reqForm=document.querySelector(".request-form");
const reqList=document.getElementById("request-list");
reqForm?.addEventListener("submit", e=>{
  e.preventDefault();
  const name=e.target[0].value, group=e.target[1].value, loc=e.target[2].value, phone=e.target[3].value;
  const card=document.createElement("div"); card.classList.add("request-card");
  card.innerHTML=`<h4>${group} Needed</h4><p>👤 ${name}<br>📍 ${loc}<br>📞 <a href="tel:${phone}">${phone}</a></p>`;
  reqList.prepend(card); e.target.reset();
});

