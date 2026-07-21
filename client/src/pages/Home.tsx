/**
 * ColossalMC — Homepage
 * Epic Stone Kingdom — v2
 * Revisione: layout asimmetrico, divisori intagliati, motivi voxel,
 * colori araldici solo ambra+oro, sezioni con texture fortezza.
 */
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Shield,
  ShoppingBag,
  Users,
  Copy,
  Check,
  ChevronDown,
  Pickaxe,
  TreePine,
  Zap,
  ExternalLink,
  ArrowRight,
  Sword,
  Star,
  Flame,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ══════════════════════════════════════
   Ember particles
══════════════════════════════════════ */
function EmberParticles() {
  const embers = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 6.2) % 90}%`,
    delay: `${(i * 0.37) % 3}s`,
    duration: `${2.5 + (i * 0.3) % 2}s`,
    size: `${2 + (i % 3)}px`,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {embers.map((e) => (
        <div
          key={e.id}
          className="ember"
          style={{
            left: e.left,
            bottom: "5%",
            animationDelay: e.delay,
            animationDuration: e.duration,
            width: e.size,
            height: e.size,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   Stone divider SVG (torch-lit engraved)
══════════════════════════════════════ */
function StoneDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{ transform: flip ? "scaleY(-1)" : "none", marginBottom: flip ? "-1px" : "0", marginTop: flip ? "0" : "-1px" }}
    >
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-16">
        <path
          d="M0,0 L0,30 Q120,60 240,35 Q360,10 480,40 Q600,60 720,30 Q840,5 960,38 Q1080,60 1200,32 Q1320,8 1440,35 L1440,0 Z"
          fill="oklch(0.10 0.012 260)"
        />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════
   Torch divider (amber glow line)
══════════════════════════════════════ */
function TorchDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.18_55/0.4)] to-transparent" />
      <Flame size={16} className="text-[oklch(0.72_0.18_55)] flex-shrink-0" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.18_55/0.4)] to-transparent" />
    </div>
  );
}

/* ══════════════════════════════════════
   Minecraft block icon (voxel motif)
══════════════════════════════════════ */
function BlockIcon({ color = "oklch(0.72 0.18 55)" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" fill={color} opacity="0.9" rx="1" />
      <rect x="11" y="2" width="7" height="7" fill={color} opacity="0.5" rx="1" />
      <rect x="2" y="11" width="7" height="7" fill={color} opacity="0.5" rx="1" />
      <rect x="11" y="11" width="7" height="7" fill={color} opacity="0.25" rx="1" />
    </svg>
  );
}

/* ══════════════════════════════════════
   Feature card — fortress style
══════════════════════════════════════ */
function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className="animate-fade-in-up group relative p-6 rounded-none border-l-2 border-b border-[oklch(0.72_0.18_55/0.25)] border-r border-t border-white/5 bg-[oklch(0.13_0.014_260)] hover:border-l-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.15_0.016_260)] transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: delay, opacity: 0 }}
    >
      {/* Corner engraving */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[oklch(0.72_0.18_55/0.3)] group-hover:border-[oklch(0.72_0.18_55/0.6)] transition-colors" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[oklch(0.72_0.18_55/0.15)] group-hover:border-[oklch(0.72_0.18_55/0.4)] transition-colors" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-none bg-[oklch(0.72_0.18_55/0.10)] flex items-center justify-center group-hover:bg-[oklch(0.72_0.18_55/0.18)] transition-colors duration-300 border border-[oklch(0.72_0.18_55/0.2)]">
          <Icon size={18} className="text-[oklch(0.72_0.18_55)]" />
        </div>
        <BlockIcon />
      </div>
      <h3
        className="text-sm font-bold text-[oklch(0.92_0.005_80)] mb-2 tracking-widest uppercase"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-[oklch(0.58_0.014_80)] leading-relaxed"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Home() {
  const [copied, setCopied] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText("colossalmc.ddns.net").then(() => {
      setCopied(true);
      toast.success("IP copiato negli appunti!", {
        description: "Incollalo in Minecraft per connetterti.",
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const features = [
    {
      icon: Pickaxe,
      title: "Survival Puro",
      desc: "Esplora un mondo vasto senza limiti. Raccogli risorse, costruisci la tua base e sopravvivi.",
      delay: "0.1s",
    },
    {
      icon: TreePine,
      title: "Mondo Persistente",
      desc: "Il tuo progresso viene salvato. Ogni costruzione, ogni risorsa, ogni conquista rimane.",
      delay: "0.2s",
    },
    {
      icon: Users,
      title: "Community Italiana",
      desc: "Una comunità accogliente di giocatori italiani pronti ad aiutarti e collaborare.",
      delay: "0.3s",
    },
    {
      icon: Shield,
      title: "Anti-Cheat & Protezione",
      desc: "Sistema anti-cheat avanzato e protezione delle build per un'esperienza equa.",
      delay: "0.4s",
    },
    {
      icon: Zap,
      title: "Server Performante",
      desc: "Hardware dedicato per garantire bassa latenza e gameplay fluido in ogni momento.",
      delay: "0.5s",
    },
    {
      icon: Star,
      title: "Aggiornamenti Costanti",
      desc: "Nuovi contenuti, eventi stagionali e miglioramenti continui guidati dalla community.",
      delay: "0.6s",
    },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.012_260)] text-[oklch(0.95_0.005_80)] overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════
          HERO — Fullscreen fortress
      ══════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/manus-storage/hero-bg_802c4531.jpg')` }}
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.012_260)] via-[oklch(0.10_0.012_260/0.30)] to-[oklch(0.08_0.010_260/0.50)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.012_260/0.80)] via-[oklch(0.10_0.012_260/0.20)] to-transparent" />
        {/* Vignette top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[oklch(0.08_0.010_260/0.6)] to-transparent" />

        <EmberParticles />

        {/* Asymmetric hero content — left-aligned */}
        <div className="relative z-10 container pb-28 pt-32 max-w-none">
          <div className="max-w-2xl">
            {/* Status badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-[oklch(0.72_0.18_55/0.35)] bg-[oklch(0.08_0.010_260/0.80)] transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="online-dot" />
              <span
                className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.72_0.18_55)]"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Server Online · Survival 1.20.1
              </span>
            </div>

            {/* Title */}
            <h1
              className={`text-6xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none mb-6 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "Cinzel, serif" }}
            >
              <span className="block text-gradient-gold">Colossal</span>
              <span className="block text-[oklch(0.95_0.005_80)] -mt-2">MC</span>
            </h1>

            {/* Torch divider */}
            <div
              className={`transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <TorchDivider />
            </div>

            {/* Tagline */}
            <p
              className={`text-xl sm:text-2xl font-semibold text-[oklch(0.82_0.01_80)] mt-5 mb-3 max-w-lg transition-all duration-700 delay-300 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Forgia la tua leggenda nel più epico server Survival italiano
            </p>
            <p
              className={`text-base text-[oklch(0.50_0.012_80)] max-w-md mb-10 transition-all duration-700 delay-400 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Costruisci, esplora e conquista insieme a una community di avventurieri.
              Il tuo regno ti aspetta.
            </p>

            {/* CTA row */}
            <div
              className={`flex flex-wrap gap-4 items-center transition-all duration-700 delay-500 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 px-8 py-4 font-bold text-sm tracking-[0.2em] uppercase bg-[oklch(0.72_0.18_55)] text-[oklch(0.10_0.012_260)] hover:bg-[oklch(0.78_0.18_55)] transition-all duration-200 active:scale-[0.97] glow-amber"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Unisciti al Regno
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://colossalmc.tebex.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 font-bold text-sm tracking-[0.2em] uppercase border border-[oklch(0.72_0.18_55/0.35)] text-[oklch(0.72_0.18_55)] hover:border-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.72_0.18_55/0.08)] transition-all duration-200 active:scale-[0.97]"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                <ShoppingBag size={16} />
                Store
              </a>
            </div>

            {/* Quick IP */}
            <div
              className={`mt-8 flex items-center gap-3 transition-all duration-700 delay-[600ms] ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span
                className="text-xs text-[oklch(0.40_0.010_80)] tracking-widest uppercase"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                IP:
              </span>
              <button
                onClick={copyIP}
                className="ip-badge text-sm flex items-center gap-2 group"
              >
                colossalmc.ddns.net
                {copied ? (
                  <Check size={13} className="text-green-400" />
                ) : (
                  <Copy size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll arrow */}
        <button
          onClick={() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 right-8 text-[oklch(0.72_0.18_55/0.5)] hover:text-[oklch(0.72_0.18_55)] transition-colors animate-bounce z-20"
          aria-label="Scorri"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* ══════════════════════════════════════
          COME CONNETTERSI
      ══════════════════════════════════════ */}
      <section id="connect" className="relative bg-[oklch(0.10_0.012_260)] py-24">
        {/* Stone texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, oklch(0.72 0.18 55) 0px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, oklch(0.72 0.18 55) 0px, transparent 1px, transparent 40px)`,
          }}
        />

        <div className="container relative z-10">
          {/* Asymmetric header — left */}
          <div className="mb-16 border-l-4 border-[oklch(0.72_0.18_55)] pl-6">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase text-[oklch(0.72_0.18_55)] mb-2"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Inizia l'avventura
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-wide text-[oklch(0.95_0.005_80)]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Come Connettersi
            </h2>
          </div>

          {/* Steps — asymmetric horizontal */}
          <div className="grid md:grid-cols-3 gap-0 mb-16 border border-[oklch(0.72_0.18_55/0.15)]">
            {[
              {
                step: "I",
                title: "Apri Minecraft",
                desc: "Avvia Minecraft Java Edition versione 1.20.1 sul tuo computer.",
                icon: "⛏",
              },
              {
                step: "II",
                title: "Aggiungi Server",
                desc: "Vai su Multiplayer → Aggiungi Server e inserisci l'indirizzo IP qui sotto.",
                icon: "🗺",
              },
              {
                step: "III",
                title: "Connettiti",
                desc: "Clicca su Connetti e inizia la tua avventura nel regno di ColossalMC!",
                icon: "⚔",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`relative p-8 ${i < 2 ? "md:border-r border-[oklch(0.72_0.18_55/0.15)]" : ""} hover:bg-[oklch(0.13_0.014_260)] transition-colors duration-300`}
              >
                {/* Roman numeral */}
                <div
                  className="text-6xl font-black text-[oklch(0.72_0.18_55/0.12)] mb-4 leading-none"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {item.step}
                </div>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3
                  className="text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-[oklch(0.58_0.014_80)] leading-relaxed"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  {item.desc}
                </p>
                {/* Corner mark */}
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[oklch(0.72_0.18_55/0.25)]" />
              </div>
            ))}
          </div>

          {/* IP Section — fortress display */}
          <div className="max-w-2xl mx-auto text-center">
            <TorchDivider />
            <div className="mt-8 p-8 border border-[oklch(0.72_0.18_55/0.25)] bg-[oklch(0.12_0.013_260)] relative">
              {/* Corner engravings */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.72_0.18_55/0.5)]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[oklch(0.72_0.18_55/0.5)]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[oklch(0.72_0.18_55/0.5)]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[oklch(0.72_0.18_55/0.5)]" />

              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase text-[oklch(0.50_0.012_80)] mb-4"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Indirizzo IP del Server
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="ip-badge text-lg md:text-xl select-all">
                  colossalmc.ddns.net
                </div>
                <button
                  onClick={copyIP}
                  className="flex items-center gap-2 px-6 py-3 font-bold text-sm tracking-[0.2em] uppercase bg-[oklch(0.72_0.18_55)] text-[oklch(0.10_0.012_260)] hover:bg-[oklch(0.78_0.18_55)] transition-all duration-200 active:scale-[0.97] glow-amber"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  {copied ? <><Check size={15} /> Copiato!</> : <><Copy size={15} /> Copia IP</>}
                </button>
              </div>
              <p
                className="mt-4 text-xs text-[oklch(0.45_0.01_80)]"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Versione consigliata: Minecraft Java Edition 1.20.1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SURVIVAL — Stone hall
      ══════════════════════════════════════ */}
      <section
        id="survival"
        className="relative py-24 overflow-hidden"
        style={{ background: "oklch(0.12 0.014 260)" }}
      >
        {/* Diagonal top cut */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-[oklch(0.10_0.012_260)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
        />
        {/* Subtle bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url('/manus-storage/survival-section_0897be54.jpg')` }}
        />
        {/* Voxel grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, oklch(0.95 0.005 80) 0px, transparent 1px, transparent 32px),
              repeating-linear-gradient(90deg, oklch(0.95 0.005 80) 0px, transparent 1px, transparent 32px)`,
          }}
        />

        <div className="container relative z-10 pt-8">
          {/* Right-aligned header */}
          <div className="mb-16 flex justify-end">
            <div className="border-r-4 border-[oklch(0.72_0.18_55)] pr-6 text-right">
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase text-[oklch(0.72_0.18_55)] mb-2"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Modalità di gioco
              </p>
              <h2
                className="text-4xl md:text-5xl font-black tracking-wide text-[oklch(0.95_0.005_80)]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Survival
              </h2>
              <p
                className="mt-3 text-base text-[oklch(0.58_0.014_80)] max-w-sm ml-auto"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Un'esperienza survival autentica, bilanciata e ricca di contenuti.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Bottom voxel terrain silhouette */}
          <div className="mt-16 flex items-end justify-center gap-1 opacity-20">
            {[3, 5, 4, 7, 6, 8, 5, 9, 7, 6, 8, 10, 7, 5, 6, 4, 7, 5, 3, 4, 6, 5, 8, 7, 6].map((h, i) => (
              <div
                key={i}
                className="bg-[oklch(0.72_0.18_55)]"
                style={{ width: "16px", height: `${h * 8}px`, flexShrink: 0 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STAFF — Throne room
      ══════════════════════════════════════ */}
      <section id="staff" className="relative py-24 overflow-hidden bg-[oklch(0.10_0.012_260)]">
        {/* Diagonal top */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-[oklch(0.12_0.014_260)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }}
        />
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: `url('/manus-storage/staff-section_bf49af60.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.012_260/0.5)] to-[oklch(0.10_0.012_260/0.9)]" />

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: text */}
            <div>
              <div className="border-l-4 border-[oklch(0.72_0.18_55)] pl-6 mb-8">
                <p
                  className="text-xs font-semibold tracking-[0.3em] uppercase text-[oklch(0.72_0.18_55)] mb-2"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  Entra nel team
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black tracking-wide text-[oklch(0.95_0.005_80)]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Candidati allo Staff
                </h2>
              </div>
              <p
                className="text-base text-[oklch(0.62_0.014_80)] leading-relaxed mb-8"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Vuoi fare la differenza nella nostra community? Stiamo cercando persone
                appassionate, mature e disponibili che vogliano contribuire alla crescita
                di ColossalMC come moderatori, helper o builder.
              </p>

              {/* Requirements — engraved list */}
              <div className="border border-[oklch(0.72_0.18_55/0.20)] bg-[oklch(0.12_0.013_260)] p-6 mb-8 relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[oklch(0.72_0.18_55/0.4)]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[oklch(0.72_0.18_55/0.4)]" />
                <p
                  className="text-xs font-bold tracking-[0.25em] uppercase text-[oklch(0.72_0.18_55)] mb-4"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Requisiti
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Almeno 14 anni di età",
                    "Attivo sul server da almeno 2 settimane",
                    "Conoscenza delle regole del server",
                    "Microfono funzionante",
                    "Disponibilità regolare",
                  ].map((req) => (
                    <li
                      key={req}
                      className="flex items-center gap-3 text-sm text-[oklch(0.68_0.014_80)]"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      <BlockIcon color="oklch(0.72 0.18 55)" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/candidatura"
                className="group inline-flex items-center gap-2 px-8 py-4 font-bold text-sm tracking-[0.2em] uppercase bg-[oklch(0.72_0.18_55)] text-[oklch(0.10_0.012_260)] hover:bg-[oklch(0.78_0.18_55)] transition-all duration-200 active:scale-[0.97] glow-amber"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                <Shield size={16} />
                Invia Candidatura
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right: role cards */}
            <div className="space-y-4 pt-4">
              {[
                {
                  role: "Moderatore",
                  icon: Shield,
                  desc: "Gestisci i conflitti, applica le regole e mantieni l'ordine nel server.",
                  badge: "Ruolo chiuso",
                },
                {
                  role: "Helper",
                  icon: Users,
                  desc: "Aiuta i nuovi giocatori, rispondi alle domande e crea un ambiente accogliente.",
                  badge: "Aperto",
                },
                {
                  role: "Builder",
                  icon: Sword,
                  desc: "Crea strutture epiche per arricchire il mondo di ColossalMC.",
                  badge: "Aperto",
                },
              ].map((r) => (
                <div
                  key={r.role}
                  className="flex items-start gap-5 p-5 border-l-2 border-[oklch(0.72_0.18_55/0.3)] bg-[oklch(0.13_0.014_260)] hover:border-l-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.15_0.016_260)] transition-all duration-300 relative"
                >
                  <div className="w-10 h-10 bg-[oklch(0.72_0.18_55/0.10)] border border-[oklch(0.72_0.18_55/0.25)] flex items-center justify-center flex-shrink-0">
                    <r.icon size={18} className="text-[oklch(0.72_0.18_55)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4
                        className="text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)]"
                        style={{ fontFamily: "Cinzel, serif" }}
                      >
                        {r.role}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 font-semibold tracking-wide ${
                          r.badge === "Aperto"
                            ? "bg-[oklch(0.72_0.18_55/0.15)] text-[oklch(0.72_0.18_55)] border border-[oklch(0.72_0.18_55/0.3)]"
                            : "bg-white/5 text-[oklch(0.45_0.010_80)] border border-white/10"
                        }`}
                        style={{ fontFamily: "Rajdhani, sans-serif" }}
                      >
                        {r.badge}
                      </span>
                    </div>
                    <p
                      className="text-xs text-[oklch(0.55_0.012_80)] leading-relaxed"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      {r.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORE — Amber forge
      ══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "oklch(0.11 0.013 260)" }}>
        {/* Diagonal top */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-[oklch(0.10_0.012_260)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
        />
        {/* Amber radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,oklch(0.72_0.18_55/0.06),transparent)]" />

        <div className="container relative z-10 pt-8">
          <div className="max-w-3xl mx-auto">
            <TorchDivider />
            <div className="mt-10 p-10 border border-[oklch(0.72_0.18_55/0.30)] bg-[oklch(0.12_0.013_260)] relative">
              {/* Corner engravings */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[oklch(0.72_0.18_55/0.6)]" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[oklch(0.72_0.18_55/0.6)]" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[oklch(0.72_0.18_55/0.6)]" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[oklch(0.72_0.18_55/0.6)]" />

              <div className="text-center">
                <div className="w-16 h-16 bg-[oklch(0.72_0.18_55/0.12)] border border-[oklch(0.72_0.18_55/0.35)] flex items-center justify-center mx-auto mb-6 glow-amber">
                  <ShoppingBag size={28} className="text-[oklch(0.72_0.18_55)]" />
                </div>
                <p
                  className="text-xs font-semibold tracking-[0.3em] uppercase text-[oklch(0.72_0.18_55)] mb-3"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  Supporta il server
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black tracking-wide text-[oklch(0.95_0.005_80)] mb-6"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Store Ufficiale
                </h2>
                <p
                  className="text-base text-[oklch(0.60_0.014_80)] leading-relaxed mb-10 max-w-xl mx-auto"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  Acquista rang, kit e vantaggi esclusivi per migliorare la tua esperienza su ColossalMC.
                  Ogni acquisto supporta direttamente il server e la sua crescita.
                </p>

                {/* Store items preview */}
                <div className="grid grid-cols-3 gap-3 mb-10">
                  {[
                    { name: "Rang VIP", icon: "👑", desc: "Accesso a comandi esclusivi" },
                    { name: "Kit Survival", icon: "⚔️", desc: "Equipaggiamento potenziato" },
                    { name: "Cosmetics", icon: "✨", desc: "Personalizza il tuo stile" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="p-4 border border-[oklch(0.72_0.18_55/0.15)] bg-[oklch(0.10_0.012_260)] hover:border-[oklch(0.72_0.18_55/0.35)] transition-colors duration-200"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div
                        className="text-xs font-bold tracking-widest uppercase text-[oklch(0.82_0.005_80)] mb-1"
                        style={{ fontFamily: "Cinzel, serif" }}
                      >
                        {item.name}
                      </div>
                      <div
                        className="text-xs text-[oklch(0.48_0.010_80)]"
                        style={{ fontFamily: "Rajdhani, sans-serif" }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://colossalmc.tebex.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-10 py-4 font-bold text-sm tracking-[0.2em] uppercase bg-[oklch(0.72_0.18_55)] text-[oklch(0.10_0.012_260)] hover:bg-[oklch(0.78_0.18_55)] transition-all duration-200 active:scale-[0.97] glow-amber"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  <ShoppingBag size={18} />
                  Visita lo Store
                  <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
                <p
                  className="mt-5 text-xs text-[oklch(0.38_0.008_80)]"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  Pagamenti sicuri tramite Tebex · Nessun vantaggio pay-to-win
                </p>
              </div>
            </div>
            <TorchDivider />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="relative py-10 bg-[oklch(0.07_0.008_260)] border-t border-[oklch(0.72_0.18_55/0.12)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/manus-storage/logo-icon_1e8342a8.png"
                alt="ColossalMC"
                className="w-8 h-8 object-contain opacity-80"
              />
              <span
                className="text-base font-bold text-gradient-gold tracking-wider"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                ColossalMC
              </span>
            </div>

            <div className="flex items-center gap-6">
              {[
                { label: "Store", href: "https://colossalmc.tebex.io", external: true },
                { label: "Staff", anchor: "staff" },
                { label: "Connettiti", anchor: "connect" },
              ].map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold tracking-widest uppercase text-[oklch(0.40_0.010_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() =>
                      document.getElementById(link.anchor!)?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-xs font-semibold tracking-widest uppercase text-[oklch(0.40_0.010_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            <p
              className="text-xs text-[oklch(0.30_0.006_80)]"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              © 2024 ColossalMC · Non affiliato con Mojang Studios
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
