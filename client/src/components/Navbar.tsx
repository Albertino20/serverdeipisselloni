/**
 * ColossalMC Navbar
 * Epic Stone Kingdom theme — Cinzel font, amber accents
 * Transparent on top, opaque with blur on scroll
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Survival", href: "#survival" },
    { label: "Staff", href: "#staff" },
    { label: "Store", href: "https://colossalmc.tebex.io", external: true },
  ];

  const handleAnchor = (href: string, external?: boolean) => {
    setMobileOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener noreferrer");
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.10_0.012_260/0.95)] backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => handleAnchor("#home")}
          className="flex items-center gap-3 group"
        >
          <img
            src="/manus-storage/logo-icon_1e8342a8.png"
            alt="ColossalMC Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-lg"
          />
          <span
            className="font-display text-xl md:text-2xl font-bold text-gradient-gold tracking-wider"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            ColossalMC
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleAnchor(link.href, link.external)}
              className="text-sm font-semibold tracking-widest uppercase text-[oklch(0.75_0.02_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors duration-200"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          {/* Discord link */}
          <a
            href="https://discord.gg/ResDWJwsdy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[oklch(0.65_0.015_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors duration-200 hover:scale-110"
            aria-label="Discord"
            title="Unisciti al Discord"
          >
            <MessageCircle size={20} />
          </a>
          <button
            onClick={() => handleAnchor("#connect")}
            className="px-5 py-2 text-sm font-bold tracking-widest uppercase rounded border border-[oklch(0.72_0.18_55)] text-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.72_0.18_55)] hover:text-[oklch(0.10_0.012_260)] transition-all duration-200 glow-amber-hover"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Connettiti
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[oklch(0.72_0.18_55)] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[oklch(0.10_0.012_260/0.98)] backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleAnchor(link.href, link.external)}
              className="text-left text-base font-semibold tracking-widest uppercase text-[oklch(0.75_0.02_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://discord.gg/ResDWJwsdy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-base font-semibold tracking-widest uppercase text-[oklch(0.75_0.02_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            <MessageCircle size={18} />
            Discord
          </a>
          <button
            onClick={() => handleAnchor("#connect")}
            className="mt-2 px-5 py-3 text-sm font-bold tracking-widest uppercase rounded border border-[oklch(0.72_0.18_55)] text-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.72_0.18_55)] hover:text-[oklch(0.10_0.012_260)] transition-all duration-200"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Connettiti al Server
          </button>
        </div>
      )}
    </header>
  );
}
