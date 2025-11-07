import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Car, Clock, Star, ShieldCheck, Phone, Mail, MapPin, Plus, Globe } from "lucide-react";

/* ----------------- ANIMS ----------------- */
const fade = (d = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
});

/* ----------------- CONTACT ----------------- */
const PHONE_DISPLAY = "06 49 79 53 46";
const PHONE_E164 = "33649795346";
const EMAIL = "Benjivantransport@gmail.com";
const phone = "";


/* ----------------- I18N ----------------- */
const T = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      fleet: "Véhicules",
      dedicated: "Chauffeur",
      europe: "Destinations",
      about: "À propos?",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      title: "Chauffeur Privé Premium",
      sub: "Voyagez avec élégance et confort à bord de nos vans haut de gamme.",
      cta1: "Réserver maintenant",
      cta2: "Nos services",
      b1: "24h/24 • 7j/7",
      b2: "Prix fixés à l’avance",
      b3: "Accueil VIP",
      b4: "Disposition à partir de 3h"
    },
  services: "Nos Services",
s1: {
  title: "Transferts Aéroports & Gares",
  text: `Nous venons à vous.  
Bénéficiez d’un transfert privé depuis ou vers Orly, Roissy-CDG, Beauvais  
et toutes les gares parisiennes.  

Accueil personnalisé, suivi de vol en temps réel  
et confort absolu à bord de nos vans haut de gamme.`,
  img: "/cdg.png"
},

s2: {
  title: "Longs Trajets en France & en Europe",
  text: `Voyagez sereinement à travers la France  
et les grandes capitales européennes : Suisse, Belgique, Allemagne, Italie, Luxembourg…  

Une expérience sur mesure, alliant élégance, confort et discrétion.`,
  img: "/pays.png"
},

s3: {
  title: "Chauffeur à Disposition — dès 3h",
  text: `Un chauffeur privé à votre service  
pour vos rendez-vous, séminaires ou événements.  

Service flexible dès 3 heures,  
dans un confort optimal et une discrétion totale.`,
  img: "/start.png"
},



    access: {
      title: "Accessible 24h/24",
      p1: "Confirmation immédiate de votre réservation en ligne",
      p2: "Prix fixé à l’avance, sans surprise quel que soit le trafic",
      p3: "Anticipation des retards d’avion et de train",
      book: "Réserver",
    },

    fleet: "Notre flotte",
    fleetCards: [
      { t: "Mercedes Classe V", d: "Cuir, confort, Wi-Fi,t eau, sièges enfants sur demande.", img: "/classeV.png" },
      { t: "Intérieur cuir premium", d: "Luxe discret, finitions parfaites et confort total.", img: "/cuir.png" },
      { t: "Van 7 places", d: "Idéal groupes, événements ou transferts VIP.", img: "/int.png" },
    ],

    chauffeurs: "Votre Chauffeur",
    chauffeursLead: "Un professionnel dédié à votre sérénité : ponctualité, conduite soignée et discrétion.",
    benji: { name: "Benji", role: "Chauffeur privé premium" },

    dedicated: {
      title: "Votre chauffeur dédié",
      text:
        "Votre interlocuteur unique pour organiser et suivre chaque trajet. Un accompagnement simple, réactif et discret, du premier message à la dépose. Possibilité de mise à disposition demi-journée ou journée complète.",
      cta: "Parler à votre chauffeur",
    },

    europe: {
      title: "Trajets en Europe",
      text:
        "Nous réalisons également vos trajets longue distance en Europe : France, Suisse, Belgique, Italie, Allemagne et plus encore. Confort, élégance et discrétion, quelle que soit la destination.",
      cta: "Demander un devis",
    },

    about: "À propos",
    aboutText:
      "BenjiVanTransport propose un service de chauffeur privé premium à Paris et en Île-de-France. Ponctualité, confort et discrétion sont nos maîtres mots. Pour vos événements, transferts ou déplacements professionnels, profitez d’un trajet élégant et serein à bord de nos véhicules.",
    reviewsTitle: "Ils nous font confiance",
    reviewAkim:
      "“Service impeccable ! Chauffeur professionnel, véhicule irréprochable, gestion parfaite des horaires. Je recommande à 100 %.”",
    reviewAuthor: "— Akim B., client entreprise",

    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Comment réserver rapidement ?",
        a:
          "Le plus simple : WhatsApp ou appel direct au " + PHONE_DISPLAY + ". Nous vous confirmons la prise en charge avec un prix fixe en quelques minutes.",
      },
      {
        q: "Que se passe-t-il si mon vol est en retard ?",
        a:
          "Nous suivons votre vol en temps réel via numéro et compagnie. L’heure de prise en charge est automatiquement ajustée, sans frais supplémentaires.",
      },
      {
        q: "Quels services sont inclus à bord ?",
        a:
          "Eau, chargeurs iPhone/Android, confiseries, Wi-Fi (selon disponibilité), siège enfant sur demande, conduite souple et discrétion totale.",
      },
      {
        q: "Faites-vous des mises à disposition ?",
        a:
          "Oui, demi-journée, journée ou soirée (mariages, séminaires, tournées de rendez-vous). Facturation claire et transparente, sans surprise.",
      },
      {
        q: "Comment sont fixés les tarifs ?",
        a:
          "Prix annoncé à l’avance selon le trajet ou le temps de mise à disposition. Pas de variable liée au trafic ou aux détours nécessaires.",
      },
      {
        q: "Zones d’intervention",
        a:
          "Paris et Île-de-France en standard. Longues distances possibles sur devis (France/Europe).",
      },
    ],

    contact: "Contact & Réservation",
    contactLead: "Devis rapide ou réservation immédiate.",
    form: {
      name: "Nom",
      email: "E-mail",
      route: "Départ → Arrivée",
      date: "Date & heure",
      pax: "Passagers",
      msg: "Message",
      send: "Envoyer la demande",
    },
    footer: "Tous droits réservés.",
    langBtn: "EN",
  },

  en: {
    nav: {
      home: "Home",
      services: "Services",
      fleet: "Fleet",
      chauffeurs: "Driver",
      dedicated: "Your driver",
      europe: "Europe",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
    },
hero: {
  title: "Premium Private Chauffeur",
  sub: "Travel with elegance and comfort in our high-end vans.",
  cta1: "Book now",
  cta2: "Our services",
  b1: "24/7 service",
  b2: "Fixed pricing",
  b3: "VIP welcome",
  b4: "Available from 3h"
},
    services: "Our Services",
s1: {
  title: "Airport & Train Station Transfers",
  text: `We come to you.  
Private transfers to and from Orly, Roissy-CDG, Beauvais  
and all Paris train stations.  

Personalized welcome, real-time flight tracking,  
and total comfort aboard our premium vans.`,
  img: "/cdg.png"
},

s2: {
  title: "Long-Distance Trips in France & Europe",
  text: `Travel with peace of mind across France  
and major European cities — Switzerland, Belgium, Germany, Italy, Luxembourg…  

A tailored experience combining elegance, comfort, and discretion.`,
  img: "/pays.png"
},

s3: {
  title: "Private Chauffeur — from 3h",
  text: `A professional driver at your disposal  
for meetings, business days or private events.  

Flexible booking from 3 hours,  
with premium comfort and total discretion.`,
  img: "/start.png"
},

    access: {
      title: "Available 24/7",
      p1: "Instant confirmation for your booking",
      p2: "Fixed price upfront, no surprises whatever the traffic",
      p3: "Flight and train delay anticipation",
      p4: "Available from a minimum of 3 hours",
      book: "Book",
    },

    fleet: "Our Fleet",
    fleetCards: [
      { t: "Mercedes V-Class", d: "Leather, comfort, Wi-Fi, water, child seats on request.", img: "/classeV.png" },
      { t: "Premium leather interior", d: "Discreet luxury with flawless finish and comfort.", img: "/cuir.png" },
      { t: "7-seater van", d: "Perfect for groups, events or VIP transfers.", img: "/van_paris.png" },
    ],

    chauffeurs: "Your Driver",
    chauffeursLead: "A dedicated professional: punctual, smooth driving and discreet.",
    benji: { name: "Benji", role: "Premium private chauffeur" },

    dedicated: {
      title: "Your dedicated chauffeur",
      text:
        "A single point of contact to organise and follow every ride. Simple, responsive and discreet — from first message to drop-off. Half-day or full-day hires available.",
      cta: "Chat with your chauffeur",
    },

    europe: {
      title: "Trips across Europe",
      text:
        "We also handle long-distance transfers across France, Switzerland, Belgium, Italy, Germany and more.",
      cta: "Request a quote",
    },

    about: "About",
    aboutText:
      "BenjiVanTransport delivers premium chauffeur service in Paris and Europe. Punctuality, comfort and discretion are our core values.",
    reviewsTitle: "Trusted by our clients",
    reviewAkim:
      "“Flawless service. Professional driver, immaculate car, perfect timing management. Highly recommended.”",
    reviewAuthor: "— Akim B., corporate client",

    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "How do I book quickly?", a: "WhatsApp or call " + PHONE_DISPLAY + ". We confirm with a fixed price within minutes." },
      { q: "What if my flight is delayed?", a: "We track it in real time and adjust pick-up automatically at no extra cost." },
      { q: "What amenities are included?", a: "Water, iPhone/Android chargers, sweets, Wi-Fi (when available), child seat on request." },
      { q: "Do you offer on-hold/hourly service?", a: "Yes — half day, full day or evening. Clear transparent billing." },
      { q: "How is pricing set?", a: "Upfront fixed price per route or per hour. No surprises due to traffic or detours." },
      { q: "Service area", a: "Paris/Île-de-France by default. Long distances on request (France/Europe)." },
    ],

    contact: "Contact & Booking",
    contactLead: "Quick quote or immediate booking.",
    form: { name: "Name", email: "Email", route: "From → To", date: "Date & time", pax: "Passengers", msg: "Message", send: "Send request" },
    footer: "All rights reserved.",
    langBtn: "FR",
  },
};

/* ----------------- APP ----------------- */
export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "fr");
  useEffect(() => localStorage.setItem("lang", lang), [lang]);
  const t = useMemo(() => T[lang], [lang]);
  const switchLang = () => setLang((p) => (p === "fr" ? "en" : "fr"));

  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 20) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ----------------- FORM SUBMIT ----------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("Nom").trim();
    const email = formData.get("Email").trim();
const depart = formData.get("Depart").trim();
const arrivee = formData.get("Arrivee").trim();

    const date = formData.get("Date");
    const pax = formData.get("Passagers");
    const message = formData.get("Message").trim();

    // --- Validation basique ---
if (!name || !email || !depart || !arrivee || !date) {
  alert("Merci de remplir tous les champs obligatoires.");
  return;
}

    // --- Format du message WhatsApp ---
    const text = `
📩 Nouvelle demande de réservation :
👤 Nom : ${name}
📧 Email : ${email}
🚗 Départ : ${depart}
📍 Arrivée : ${arrivee}
📞 Téléphone : ${phone}
📅 Date : ${new Date(date).toLocaleString("fr-FR")}
👥 Passagers : ${pax || "Non précisé"}
💬 Message : ${message || "—"}
`;

    // --- Envoi WhatsApp ---
    const url = `https://api.whatsapp.com/send?phone=${PHONE_E164}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  /* ----------------- RETURN ----------------- */
  return (
    <div className="min-h-screen bg-luxury">


{/* HEADER LUXE */}
<header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/70 border-b border-zinc-800/60">
  <div className="section flex items-center justify-between h-20">
    {/* --- Bloc gauche : Logo + Nom --- */}
    <div className="flex items-center gap-4">
      <a href="#accueil" className="flex items-center gap-3 group">
        <img
          src="/logo-benji.png"
          alt="Logo BenjiVanTransport"
          className="h-14 w-auto object-contain rounded-full shadow-[0_0_20px_rgba(200,169,81,0.25)] group-hover:scale-105 transition-transform duration-300"
        />
        <span className="font-playfair text-xl sm:text-2xl text-zinc-100 tracking-wide group-hover:text-[var(--gold)] transition">
          BenjiVan&nbsp;<span className="text-[var(--gold)]">Transport</span>
        </span>
      </a>
    </div>

    {/* --- Navigation Desktop --- */}
    <nav className="hidden xl:flex items-center gap-10 text-sm text-zinc-400 font-medium">
      {[
        { id: "accueil", label: t.nav.home },
        { id: "services", label: t.nav.services },
        { id: "vehicules", label: t.nav.fleet },
        { id: "dedie", label: t.nav.dedicated },
        { id: "europe", label: t.nav.europe },
        { id: "apropos", label: t.nav.about },
        { id: "faq", label: t.nav.faq },
        { id: "contact", label: t.nav.contact },
      ].map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="relative group hover:text-white transition"
        >
          {link.label}
          <span className="absolute left-0 bottom-[-3px] w-0 h-[1px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full"></span>
        </a>
      ))}
    </nav>

    {/* --- Bouton Langue --- */}
    <div className="flex items-center gap-3">
      <button
        onClick={switchLang}
        className="btn-ghost text-xs px-3 py-2 border-zinc-700 hover:border-[var(--gold)] hover:text-[var(--gold)] transition"
      >
        {t.langBtn}
      </button>

      {/* --- Burger Mobile --- */}
      <button
        className="xl:hidden flex flex-col gap-[5px] p-3"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="w-6 h-[2px] bg-[var(--gold)] rounded-full"></span>
        <span className="w-6 h-[2px] bg-[var(--gold)] rounded-full"></span>
        <span className="w-6 h-[2px] bg-[var(--gold)] rounded-full"></span>
      </button>
    </div>
  </div>

  {/* --- Menu Mobile --- */}
  {menuOpen && (
    <div className="xl:hidden bg-black/95 border-t border-zinc-800 animate-slideDownGold shadow-[0_8px_30px_rgba(200,169,81,0.08)]">
      <nav className="flex flex-col text-zinc-300 py-5 px-6 space-y-4 text-base">
        {[
          { id: "accueil", label: t.nav.home },
          { id: "services", label: t.nav.services },
          { id: "vehicules", label: t.nav.fleet },
          { id: "dedie", label: t.nav.dedicated },
          { id: "europe", label: t.nav.europe },
          { id: "apropos", label: t.nav.about },
          { id: "faq", label: t.nav.faq },
          { id: "contact", label: t.nav.contact },
        ].map((link, i) => (
          <a
            key={i}
            href={`#${link.id}`}
            onClick={() => setMenuOpen(false)}
            className="hover:text-[var(--gold)] transition flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] opacity-0 group-hover:opacity-100 transition" />
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )}
</header>


{/* Décalage pour compenser le header fixe */}
<div className="h-[200px]"></div>


{/* SECTION ACCUEIL + CONTACT — VERSION LUXE RESPONSIVE */}
<section
  id="accueil"
  className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black"
>
  {/* IMAGE DE FOND */}
  <img
    src="/van_paris.png"
    alt="Van de luxe Paris"
    className="absolute inset-0 w-full h-full object-cover brightness-[0.45] contrast-[1.15] saturate-[1.05]"
  />

  {/* DÉGRADÉ DE FOND */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-black/95" />

  {/* CONTENU CENTRAL */}
  <div className="relative z-10 section py-20 grid lg:grid-cols-2 gap-24 items-center">

{/* --- COLONNE GAUCHE (TEXTE) --- */}
<motion.div {...fade(.1)} className="text-center lg:text-left max-w-xl mx-auto">
  <h1 className="text-5xl sm:text-6xl font-playfair luxury-title mb-6 leading-tight">
    {t.hero.title}
  </h1>
  <p className="text-zinc-300 text-lg mb-10 leading-relaxed">
    {t.hero.sub}
  </p>

  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
    <span className="badge"><Clock className="w-4 h-4 text-[var(--gold)]" /> {t.hero.b1}</span>
    <span className="badge"><ShieldCheck className="w-4 h-4 text-[var(--gold)]" /> {t.hero.b2}</span>
    <span className="badge"><Star className="w-4 h-4 text-[var(--gold)]" /> {t.hero.b3}</span>
    <span className="badge"><Car className="w-4 h-4 text-[var(--gold)]" /> {t.hero.b4}</span>
  </div>

  <a
    href={`https://api.whatsapp.com/send?phone=${PHONE_E164}`}
    target="_blank"
    rel="noreferrer"
    className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 mx-auto lg:mx-0"
  >
    <Car className="w-5 h-5" /> {t.hero.cta1}
  </a>
</motion.div>


 {/* --- COLONNE DROITE (FORMULAIRE) --- */}
<motion.div
  {...fade(.2)}
  className="relative bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-10 shadow-[0_0_65px_rgba(200,169,81,0.12)] backdrop-blur-md hover:shadow-[0_0_85px_rgba(200,169,81,0.22)] transition-all max-w-lg mx-auto w-full"
>
  {/* Halo doré subtil */}
  <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(200,169,81,0.1),transparent_70%)] pointer-events-none animate-pulse-slow" />

  <h2 className="text-3xl font-playfair luxury-title mb-4 text-center">
    {t.contact}
  </h2>
  <p className="text-zinc-400 text-center mb-8 text-sm sm:text-base">
    {t.contactLead}
  </p>

  {/* FORMULAIRE */}
<form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 text-sm relative z-10">
  <input
    type="text"
    name="Nom"
    placeholder={t.form.name}
    className="input"
    pattern="^[A-Za-zÀ-ÿ'\- ]{2,}$"
    title="Veuillez entrer un nom valide"
    required
  />

  <input
  type="tel"
  name="Telephone"
  placeholder={lang === "fr" ? "Téléphone" : "Phone number"}
  className="input"
  required
  pattern="^(\+?\d{1,3}[-.\s]?)?\d{6,14}$"
  title={lang === "fr"
    ? "Veuillez entrer un numéro valide (ex : +33612345678)"
    : "Please enter a valid phone number (e.g. +33612345678)"
  }
/>

  <input
    type="email"
    name="Email"
    placeholder={t.form.email}
    className="input"
    required
  />

    <input
    type="datetime-local"
    name="Date"
    placeholder={t.form.date}
    className="input"
    required
  />

<input
  type="text"
  name="Depart"
  placeholder="Adresse de départ"
  className="input"
  required
/>

<input
  type="text"
  name="Arrivee"
  placeholder="Adresse d’arrivée"
  className="input"
  required
/>


  <input
    type="number"
    name="Passagers"
    placeholder={t.form.pax}
    className="input"
    min="1"
    max="7"
  />

  <textarea
    name="Message"
    placeholder={t.form.msg}
    className="textarea sm:col-span-2"
  />

  <button
    type="submit"
    className="btn-primary sm:col-span-2 py-4 text-base font-semibold hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(200,169,81,0.4)]"
  >
    ✉️ {t.form.send}
  </button>
</form>


  {/* INFOS CONTACT */}
  <div className="mt-8 space-y-3 text-center text-zinc-300 relative z-10">
    <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 hover:text-[var(--gold)] transition">
      <Phone className="w-5 h-5 text-[var(--gold)]" /> {PHONE_DISPLAY}
    </a>
    <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-2 hover:text-[var(--gold)] transition">
      <Mail className="w-5 h-5 text-[var(--gold)]" /> {EMAIL}
    </a>
    <div className="flex items-center justify-center gap-2">
      <MapPin className="w-5 h-5 text-[var(--gold)]" /> Paris & Europe
    </div>
  </div>
</motion.div>

  </div>
</section>



{/* SECTION NOS SERVICES — VERSION LUXE & PRO */}
<section id="services" className="py-24 bg-[#0e0e0e]">
  <div className="section">
    <motion.h2
      {...fade()}
      className="text-4xl font-playfair luxury-title mb-16 text-center"
    >
      {t.services}
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

      {/* 1️⃣ Transferts Aéroports & Gares */}
      <ServiceCard
        img={t.s1.img}
        title={t.s1.title}
        text={t.s1.text}
        delay={0.1}
      />

      {/* 2️⃣ Longs Trajets France & Europe */}
      <ServiceCard
        img={t.s2.img}
        title={t.s2.title}
        text={t.s2.text}
        delay={0.2}
      />

      {/* 3️⃣ Mise à disposition */}
      <ServiceCard
        img={t.s3.img}
        title={t.s3.title}
        text={t.s3.text}
        delay={0.3}
      />

    </div>
  </div>
</section>


{/* EUROPE + ACCESSIBLE 24/7 COMBO (aligné et stylé) */}
<section id="europe" className="py-24 bg-black">
  <div className="section flex flex-col gap-24">

    {/* --- Ligne 1 : Europe --- */}
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.img
        {...fade()}
        src="/europe.png"
        alt="Trajets en Europe"
        className="rounded-3xl img-halo-strong w-full"
      />
      <motion.div {...fade(.15)}>
        <h3 className="text-4xl font-playfair luxury-title mb-6 flex items-center gap-2">
          <Globe className="text-[var(--gold)]" /> {t.europe.title}
        </h3>
        <p className="text-zinc-300 mb-6">{t.europe.text}</p>
        <a
          href={`https://api.whatsapp.com/send?phone=${PHONE_E164}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          {t.europe.cta}
        </a>
      </motion.div>
    </div>

    {/* --- Ligne 2 : Accessible 24/24 (inversé pour effet croisé) --- */}
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div {...fade(.15)} className="order-2 lg:order-1">
        <h3 className="text-4xl font-playfair luxury-title mb-6">
          {t.access.title}
        </h3>
        <ul className="space-y-3 text-zinc-300 leading-relaxed">
          <li>✔️ {t.access.p1}</li>
          <li>✔️ {t.access.p2}</li>
          <li>✔️ {t.access.p3}</li>
        </ul>
        <a
          href={`https://api.whatsapp.com/send?phone=${PHONE_E164}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-6 text-[var(--gold)] hover:underline"
        >
          {t.access.book}
        </a>
      </motion.div>
      <motion.img
        {...fade()}
        src="/start.png"
        alt="Accessible 24/24"
        className="rounded-3xl img-halo-strong w-full order-1 lg:order-2"
      />
    </div>

  </div>
</section>


      {/* FLEET */}
      <section id="vehicules" className="py-20 bg-[#0e0e0e]">
        <div className="section">
          <motion.h2 {...fade()} className="text-4xl font-playfair luxury-title mb-10">{t.fleet}</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.fleetCards.map((c, i) => (
              <ServiceCard key={i} img={c.img} title={c.t} text={c.d} delay={.1 + i*0.1} />
            ))}
          </div>
        </div>
      </section>

 {/* VOTRE CHAUFFEUR PRIVÉ */}
<section id="chauffeurs" className="py-24 bg-[#0e0e0e]">
  <div className="section grid lg:grid-cols-2 gap-12 items-center">
    <motion.div {...fade()}>
      <img
        src="/chauffeur1.png"
        alt="Votre chauffeur Benji"
        className="rounded-3xl img-halo-strong w-full"
      />
    </motion.div>

    <motion.div {...fade(.15)}>
      <h2 className="text-4xl font-playfair luxury-title mb-4">
        {t.chauffeurs}
      </h2>
      <p className="text-zinc-400 mb-6">{t.chauffeursLead}</p>

      <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
        <h3 className="text-2xl font-semibold text-zinc-100 mb-2">
          {t.benji.name}
        </h3>
        <p className="text-sm text-zinc-400 mb-4">{t.benji.role}</p>
        <p className="text-zinc-300 leading-relaxed mb-6">
          {t.dedicated.text}
        </p>
        <a
          href={`https://api.whatsapp.com/send?phone=${PHONE_E164}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          <Phone className="w-4 h-4" />&nbsp;{t.dedicated.cta}
        </a>
      </div>
    </motion.div>
  </div>
</section>


      {/* PRESTATION HAUT DE GAMME */}
<section id="prestige" className="py-24 bg-black/90">
  <div className="section grid lg:grid-cols-2 gap-10 items-center">
    <motion.div {...fade()}>
      <h3 className="text-4xl font-playfair luxury-title mb-6">Une prestation haut de gamme</h3>
      <p className="text-zinc-300 mb-6 leading-relaxed">
        Chaque détail compte pour votre confort : nos véhicules sont équipés de tout ce qui fait la différence
        lors de vos trajets professionnels ou personnels.
      </p>
      <ul className="space-y-3 text-zinc-300">
        <li>✔️ Bouteilles d’eau individuelles</li>
        <li>✔️ Chargeurs iPhone & Android</li>
        <li>✔️ Confiseries & lingettes</li>
        <li>✔️ Wi-Fi (sur demande)</li>
        <li>✔️ Siège enfant disponible</li>
        <li>✔️ Chauffeur discret, tenue élégante</li>
      </ul>
      <a
        href={`https://api.whatsapp.com/send?phone=${PHONE_E164}`}
        target="_blank"
        rel="noreferrer"
        className="btn-primary mt-8 inline-flex"
      >
        <Car className="w-4 h-4" /> Réserver un trajet
      </a>
    </motion.div>

    <motion.img
      {...fade(.2)}
      src="/bonbon.png"
      alt="Service haut de gamme"
      className="rounded-3xl img-halo-strong"
    />
  </div>
</section>



{/* À PROPOS + AVIS CLIENTS LUXE CARROUSEL */}
<section id="apropos" className="relative py-32 bg-[#0e0e0e] overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#141414] to-black/90 pointer-events-none" />

  <div className="section relative z-10 flex flex-col gap-24">
    {/* --- À PROPOS (image + texte côte à côte) --- */}
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div {...fade()} className="order-1 lg:order-1 flex justify-center">
        <img
          src="/apropos.png"
          alt="BenjiVanTransport à propos"
          className="rounded-3xl img-halo-strong w-full max-w-lg"
        />
      </motion.div>

      <motion.div {...fade(.1)} className="order-2 lg:order-2 text-center lg:text-left">
        <h2 className="text-4xl font-playfair luxury-title mb-4">{t.about}</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">{t.aboutText}</p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm max-w-md mx-auto lg:mx-0">
          <span className="badge"><ShieldCheck className="w-4 h-4 text-[var(--gold)]"/> Chauffeur pro</span>
          <span className="badge"><Star className="w-4 h-4 text-[var(--gold)]"/> Véhicules premium</span>
          <span className="badge"><Clock className="w-4 h-4 text-[var(--gold)]"/> 24/7</span>
          <span className="badge"><MapPin className="w-4 h-4 text-[var(--gold)]"/> Île-de-France</span>
        </div>
      </motion.div>
    </div>

    {/* --- AVIS CLIENTS LUXE --- */}
    <motion.h3 {...fade(.2)} className="text-3xl font-playfair luxury-title text-center mb-12">
      {t.reviewsTitle}
    </motion.h3>

    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-8 animate-slide"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      >
        {[...Array(2)].flatMap(() => [
          {
            name: "Akim B.",
            role: "Client entreprise",
            text:
              "“Service impeccable ! Chauffeur professionnel, véhicule irréprochable, gestion parfaite des horaires. Je recommande à 100 %.”",
            img: "/avis1.png",
          },
          {
            name: "Sofia M.",
            role: "Mariage & Événement",
            text:
              "“Benji a rendu notre mariage parfait. Van magnifique, accueil VIP, musique, champagne — un service d’exception digne d’un 5★.”",
            img: "/avis2.png",
          },
          {
            name: "Marc L.",
            role: "Voyage professionnel",
            text:
              "“Excellence du service, conduite fluide, ponctualité absolue. Un vrai partenaire pour mes trajets Paris-Genève.”",
            img: "/avis3.png",
          },
        ]).map((a, i) => (
          <div
            key={i}
            className="min-w-[300px] sm:min-w-[360px] md:min-w-[400px] bg-gradient-to-b from-zinc-900/90 to-black/40 border border-zinc-800 hover:border-[var(--gold)] rounded-3xl p-6 transition hover:shadow-[0_0_35px_rgba(200,169,81,.25)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={a.img} alt={a.name} className="w-14 h-14 rounded-full object-cover img-halo" />
              <div>
                <p className="font-semibold text-zinc-100">{a.name}</p>
                <p className="text-xs text-zinc-400">{a.role}</p>
              </div>
            </div>
            <p className="italic text-zinc-300 leading-relaxed">{a.text}</p>
            <div className="flex mt-3 text-[var(--gold)]">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="w-4 h-4 fill-[var(--gold)]" />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Filtres dégradés gauche/droite */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent pointer-events-none" />
    </div>
  </div>
</section>

{/* SECTION FAQ LUXE */}
<section id="faq" className="relative py-28 bg-black overflow-hidden">
  {/* Halo et texture subtile */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-black to-[#0b0b0b] opacity-95 pointer-events-none" />

  <div className="section relative z-10 max-w-4xl mx-auto">
    <motion.h2 {...fade()} className="text-4xl font-playfair luxury-title mb-12 text-center">
      {t.faqTitle}
    </motion.h2>

    <div className="divide-y divide-zinc-800 border border-zinc-800/60 rounded-3xl bg-gradient-to-b from-zinc-900/40 to-zinc-950/10 backdrop-blur-sm shadow-[0_0_45px_rgba(200,169,81,0.05)]">
      {t.faqs.map((faq, i) => (
        <motion.div
          key={i}
          className="group cursor-pointer px-6 sm:px-10 py-6 transition-all hover:bg-zinc-900/30"
          {...fade(i * 0.08)}
          onClick={() => setOpen(open === i ? -1 : i)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg sm:text-xl font-medium text-zinc-100 group-hover:text-[var(--gold)] transition">
              {faq.q}
            </h3>
            <Plus
              className={`w-5 h-5 text-[var(--gold)] transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              open === i ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-zinc-400 text-sm leading-relaxed border-l border-[var(--gold)]/30 pl-4">
              {faq.a}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>



      {/* WHATSAPP FLOAT – “lave d’or” animée */}
      <a
        href={`https://api.whatsapp.com/send?phone=${PHONE_E164}`}
        target="_blank" rel="noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
        className="whap-float"
      >
        <span className="lava"></span>
        <img src="/logo_whap.svg" alt="WhatsApp" className="icon" />
      </a>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} BenjiVanTransport — {t.footer}
      </footer>
    </div>
  );
}

/* ----------------- COMPOSANTS ----------------- */
function ServiceCard({ img, title, text, delay }) {
  return (
    <motion.div {...fade(delay)} className="card group hover:border-[var(--gold)] transition">
      <img src={img} alt={title} className="w-full h-52 object-cover rounded-t-2xl img-halo" />
      <div className="card-body">
        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{text}</p>
      </div>
    </motion.div>
  );
}

function DriverCard({ img, name, role, delay }) {
  return (
    <motion.div {...fade(delay)} className="card overflow-hidden rounded-2xl bg-black/40 max-w-md mx-auto">
      <img
        src={img}
        alt={name}
        className="w-full h-96 object-contain rounded-t-2xl img-halo"
      />
      <div className="card-body border-t border-zinc-800 backdrop-blur-sm text-center">
        <h3 className="text-lg font-semibold text-zinc-100">{name}</h3>
        <p className="text-sm text-zinc-400">{role}</p>
      </div>
    </motion.div>
  );
}

function FAQ({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item ${isOpen ? "open" : ""}`} onClick={() => setOpen(isOpen ? -1 : i)}>
            <div className="faq-question">
              <span>{f.q}</span>
              <Plus className={`faq-icon ${isOpen ? "rotate-45" : ""}`} />
            </div>
            <div className="faq-answer">{f.a}</div>
          </div>
        );
      })}
    </div>
  );
}
