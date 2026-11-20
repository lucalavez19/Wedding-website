/* ============ SETTINGS: edit these ============ */
const CONFIG = {
  weddingDate: "2027-06-05T00:00:00+02:00", // add the ceremony time when known, e.g. 2027-06-05T16:00:00+02:00
  mapQuery: "Villa ex Magni Rizzoli, Canzo, Como, Italia",          // replace with the venue's exact address
  // Google Form: open the form > Send > "<>" tab, copy the URL inside src="...". Leave as is until ready.
  formEmbedUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true",
};

/* ============ TRANSLATIONS ============ */
const T = {
  it: {
    "nav.details": "La giornata", "nav.venue": "Location", "nav.travel": "Viaggio", "nav.rsvp": "RSVP", "nav.faq": "Domande",
    "nav.story": "La nostra storia", "story.eyebrow": "Lucia & Luca", "story.title": "Una storia in viaggio", "story.intro": "Tra montagne, città, mare e piccoli momenti quotidiani, abbiamo costruito la nostra storia. Il 5 giugno 2027 ci piacerebbe festeggiare con voi il prossimo capitolo.",
    "hero.line": "si sposano", "hero.date": "5 giugno 2027 · Canzo, Lago di Como", "hero.cta": "Conferma la tua presenza",
    "cd.d": "giorni", "cd.h": "ore", "cd.m": "minuti", "cd.s": "secondi",
    "details.title": "La giornata", "details.intro": "[Breve testo di benvenuto]",
    "ev.1": "[Cerimonia]", "ev.2": "[Ricevimento]", "ev.3": "[Cena]", "ev.4": "[Festa]",
    "ph.desc": "[Descrizione]", "ph.text": "[Inserire informazioni]", "ph.answer": "[Inserire risposta]",
    "venue.title": "Location", "venue.intro": "[Breve descrizione del luogo]", "venue.note": "[Parcheggio e indicazioni per l’arrivo]", "venue.open": "Apri in Google Maps",
    "travel.title": "Viaggio e soggiorno", "travel.intro": "[Testo introduttivo]",
    "travel.a": "Come arrivare", "travel.b": "Dove dormire", "travel.c": "Spostamenti", "travel.stay": "Hotel consigliati", "travel.link": "Sito web",
    "rsvp.title": "RSVP", "rsvp.intro": "Speriamo di festeggiare insieme a voi.", "rsvp.deadline": "Vi chiediamo gentilmente di confermare la vostra presenza entro il 30 aprile 2027.",
    "rsvp.ph": "Il modulo Google non è ancora collegato. Inserisci il suo indirizzo in script.js (formEmbedUrl).", "rsvp.open": "Apri il modulo in una nuova pagina",
    "faq.title": "Domande frequenti",
    "faq.q1": "Qual è il dress code?", "faq.q2": "I bambini sono invitati?", "faq.q3": "Dove si parcheggia?", "faq.q4": "Esigenze alimentari?", "faq.q5": "Lista nozze e regali?", "faq.q6": "Entro quando devo rispondere?",
    "foot.line": "Ci vediamo a Canzo."
  },
  en: {
    "nav.story": "Our story", "story.eyebrow": "Lucia & Luca", "story.title": "A story in motion", "story.intro": "Between mountains, cities, the sea and everyday moments, we have built our story. On 5 June 2027, we would love to celebrate the next chapter with you.",
    "nav.details": "The day", "nav.venue": "Venue", "nav.travel": "Travel", "nav.rsvp": "RSVP", "nav.faq": "Questions",
    "hero.line": "are getting married", "hero.date": "5 June 2027 · Canzo, Lake Como", "hero.cta": "Reply to your invitation",
    "cd.d": "days", "cd.h": "hours", "cd.m": "minutes", "cd.s": "seconds",
    "details.title": "The day", "details.intro": "[Short welcome text]",
    "ev.1": "[Ceremony]", "ev.2": "[Reception]", "ev.3": "[Dinner]", "ev.4": "[Party]",
    "ph.desc": "[Description]", "ph.text": "[Add information]", "ph.answer": "[Add answer]",
    "venue.title": "Venue", "venue.intro": "[Short description of the place]", "venue.note": "[Parking and arrival directions]", "venue.open": "Open in Google Maps",
    "travel.title": "Travel & stay", "travel.intro": "[Introductory text]",
    "travel.a": "Getting here", "travel.b": "Where to stay", "travel.c": "Getting around", "travel.stay": "Suggested hotels", "travel.link": "Website",
    "rsvp.title": "RSVP", "rsvp.intro": "We hope to celebrate with you.", "rsvp.deadline": "Please let us know if you can join us by 30 April 2027.",
    "rsvp.ph": "The Google Form is not connected yet. Paste its address into script.js (formEmbedUrl).", "rsvp.open": "Open the form in a new page",
    "faq.title": "Frequently asked questions",
    "faq.q1": "What is the dress code?", "faq.q2": "Are children invited?", "faq.q3": "Where can I park?", "faq.q4": "Dietary requirements?", "faq.q5": "Gifts and registry?", "faq.q6": "When should I reply by?",
    "foot.line": "See you in Canzo."
  }
};

/* ============ LANGUAGE ============ */
function setLang(lang) {
  const d = T[lang]; if (!d) return;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { const v = d[el.dataset.i18n]; if (v) el.textContent = v; });
  document.querySelectorAll("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  try { localStorage.setItem("lang", lang); } catch (e) {}
}
document.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
let saved = null; try { saved = localStorage.getItem("lang"); } catch (e) {}
const browserIsItalian = (navigator.language || "").toLowerCase().startsWith("it");
setLang(saved || (browserIsItalian ? "it" : "en"));

/* ============ COUNTDOWN ============ */
const target = new Date(CONFIG.weddingDate).getTime();
const pad = n => String(n).padStart(2, "0");
function tick() {
  const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  document.getElementById("cd-d").textContent = pad(Math.floor(s / 86400));
  document.getElementById("cd-h").textContent = pad(Math.floor(s / 3600) % 24);
  document.getElementById("cd-m").textContent = pad(Math.floor(s / 60) % 60);
  document.getElementById("cd-s").textContent = pad(s % 60);
}
tick(); setInterval(tick, 1000);

/* ============ MAP ============ */
const q = encodeURIComponent(CONFIG.mapQuery);
document.getElementById("map").src = `https://www.google.com/maps?q=${q}&output=embed`;
document.getElementById("map-link").href = `https://www.google.com/maps/search/?api=1&query=${q}`;

/* ============ RSVP (Google Forms) ============ */
if (!CONFIG.formEmbedUrl.includes("YOUR_FORM_ID")) {
  const f = document.getElementById("form");
  f.src = CONFIG.formEmbedUrl; f.hidden = false;
  document.getElementById("form-ph").hidden = true;
  const l = document.getElementById("form-link");
  l.href = CONFIG.formEmbedUrl.replace("?embedded=true", ""); l.hidden = false;
}

/* ============ UI ============ */
const nav = document.getElementById("nav"), burger = document.getElementById("burger"), menu = document.getElementById("menu");
const onScroll = () => nav.classList.toggle("solid", scrollY > 60);
onScroll(); addEventListener("scroll", onScroll, { passive: true });
burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); });
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }));

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
