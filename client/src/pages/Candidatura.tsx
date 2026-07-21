/**
 * ColossalMC — Pagina Candidatura Staff
 * Form completo per candidarsi come Moderatore, Helper o Builder
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

interface FormData {
  nome: string;
  eta: string;
  discordUsername: string;
  ruolo: "moderatore" | "helper" | "builder";
  esperienza: string;
  motivazione: string;
  disponibilita: string;
}

export default function Candidatura() {
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    eta: "",
    discordUsername: "",
    ruolo: "helper",
    esperienza: "",
    motivazione: "",
    disponibilita: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nome.trim()) newErrors.nome = "Il nome è obbligatorio";
    if (!formData.eta.trim()) newErrors.eta = "L'età è obbligatoria";
    if (parseInt(formData.eta) < 14) newErrors.eta = "Devi avere almeno 14 anni";
    if (!formData.discordUsername.trim()) newErrors.discordUsername = "Username Discord obbligatorio";
    if (!formData.esperienza.trim()) newErrors.esperienza = "Descrivi la tua esperienza";
    if (formData.esperienza.length < 20) newErrors.esperienza = "Minimo 20 caratteri";
    if (!formData.motivazione.trim()) newErrors.motivazione = "Descrivi la tua motivazione";
    if (formData.motivazione.length < 30) newErrors.motivazione = "Minimo 30 caratteri";
    if (!formData.disponibilita.trim()) newErrors.disponibilita = "Indica la tua disponibilità";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Compila tutti i campi correttamente", {
        description: "Controlla gli errori nel form",
      });
      return;
    }

    setLoading(true);

    try {
      // Simula invio (in futuro potrai integrare un backend)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log dei dati (in produzione, invierai a un backend/email)
      console.log("Candidatura inviata:", formData);

      setSubmitted(true);
      toast.success("Candidatura inviata con successo!", {
        description: "Lo staff ti contatterà presto su Discord.",
        duration: 5000,
      });

      // Reset form dopo 3 secondi
      setTimeout(() => {
        setFormData({
          nome: "",
          eta: "",
          discordUsername: "",
          ruolo: "helper",
          esperienza: "",
          motivazione: "",
          disponibilita: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error("Errore nell'invio della candidatura", {
        description: "Riprova più tardi",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const roleDescriptions: Record<string, string> = {
    moderatore: "Gestisci i conflitti, applica le regole e mantieni l'ordine nel server.",
    helper: "Aiuta i nuovi giocatori, rispondi alle domande e crea un ambiente accogliente.",
    builder: "Crea strutture epiche per arricchire il mondo di ColossalMC.",
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.012_260)] text-[oklch(0.95_0.005_80)]">
      <Navbar />

      {/* Hero section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[oklch(0.12_0.014_260)] to-[oklch(0.10_0.012_260)]">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, oklch(0.72 0.18 55) 0px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, oklch(0.72 0.18 55) 0px, transparent 1px, transparent 40px)`,
          }}
        />
        <div className="container relative z-10 pt-12">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-[oklch(0.72_0.18_55)] hover:text-[oklch(0.82_0.18_55)] transition-colors mb-8"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            <ArrowLeft size={16} />
            Torna alla Home
          </button>

          <div className="border-l-4 border-[oklch(0.72_0.18_55)] pl-6">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase text-[oklch(0.72_0.18_55)] mb-2"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Entra nel team
            </p>
            <h1
              className="text-4xl md:text-5xl font-black tracking-wide text-[oklch(0.95_0.005_80)] mb-4"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Candidati allo Staff
            </h1>
            <p
              className="text-base text-[oklch(0.60_0.015_80)] max-w-2xl"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Compila il form sottostante per candidarti. Leggi attentamente i requisiti e sii sincero nelle tue risposte.
              Lo staff valuterà tutte le candidature.
            </p>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container max-w-3xl">
          {submitted ? (
            /* Success message */
            <div className="p-10 border border-[oklch(0.72_0.18_55/0.30)] bg-[oklch(0.12_0.013_260)] rounded-none relative text-center">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[oklch(0.72_0.18_55/0.6)]" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[oklch(0.72_0.18_55/0.6)]" />

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[oklch(0.72_0.18_55/0.12)] border border-[oklch(0.72_0.18_55/0.35)] flex items-center justify-center">
                  <CheckCircle size={32} className="text-[oklch(0.72_0.18_55)]" />
                </div>
              </div>

              <h2
                className="text-3xl font-black tracking-wide text-[oklch(0.95_0.005_80)] mb-3"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Candidatura Inviata!
              </h2>
              <p
                className="text-base text-[oklch(0.60_0.015_80)] mb-2"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Grazie per la tua candidatura. Lo staff di ColossalMC valuterà la tua richiesta.
              </p>
              <p
                className="text-sm text-[oklch(0.50_0.012_80)]"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Ti contatteremo su Discord entro 7 giorni con la risposta.
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Requisiti */}
              <div className="p-6 border border-[oklch(0.72_0.18_55/0.20)] bg-[oklch(0.12_0.013_260)] relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[oklch(0.72_0.18_55/0.4)]" />
                <p
                  className="text-xs font-bold tracking-[0.25em] uppercase text-[oklch(0.72_0.18_55)] mb-4"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Requisiti Obbligatori
                </p>
                <ul className="space-y-2">
                  {[
                    "✓ Almeno 14 anni di età",
                    "✓ Attivo sul server da almeno 2 settimane",
                    "✓ Conoscenza delle regole del server",
                    "✓ Microfono funzionante",
                    "✓ Disponibilità regolare",
                  ].map((req) => (
                    <li
                      key={req}
                      className="text-sm text-[oklch(0.68_0.014_80)]"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nome */}
              <div>
                <label
                  className="block text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Es. Marco Rossi"
                  className={`w-full px-4 py-3 bg-[oklch(0.13_0.014_260)] border text-[oklch(0.95_0.005_80)] placeholder-[oklch(0.40_0.010_80)] focus:outline-none focus:border-[oklch(0.72_0.18_55)] transition-colors ${
                    errors.nome ? "border-red-500" : "border-[oklch(0.72_0.18_55/0.25)]"
                  }`}
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                />
                {errors.nome && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.nome}
                  </p>
                )}
              </div>

              {/* Età */}
              <div>
                <label
                  className="block text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Età *
                </label>
                <input
                  type="number"
                  name="eta"
                  value={formData.eta}
                  onChange={handleChange}
                  placeholder="Es. 16"
                  min="14"
                  max="100"
                  className={`w-full px-4 py-3 bg-[oklch(0.13_0.014_260)] border text-[oklch(0.95_0.005_80)] placeholder-[oklch(0.40_0.010_80)] focus:outline-none focus:border-[oklch(0.72_0.18_55)] transition-colors ${
                    errors.eta ? "border-red-500" : "border-[oklch(0.72_0.18_55/0.25)]"
                  }`}
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                />
                {errors.eta && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.eta}
                  </p>
                )}
              </div>

              {/* Discord Username */}
              <div>
                <label
                  className="block text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Username Discord *
                </label>
                <input
                  type="text"
                  name="discordUsername"
                  value={formData.discordUsername}
                  onChange={handleChange}
                  placeholder="Es. MarcoRossi#1234 o MarcoRossi"
                  className={`w-full px-4 py-3 bg-[oklch(0.13_0.014_260)] border text-[oklch(0.95_0.005_80)] placeholder-[oklch(0.40_0.010_80)] focus:outline-none focus:border-[oklch(0.72_0.18_55)] transition-colors ${
                    errors.discordUsername ? "border-red-500" : "border-[oklch(0.72_0.18_55/0.25)]"
                  }`}
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                />
                {errors.discordUsername && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.discordUsername}
                  </p>
                )}
              </div>

              {/* Ruolo */}
              <div>
                <label
                  className="block text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Ruolo Desiderato *
                </label>
                <select
                  name="ruolo"
                  value={formData.ruolo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[oklch(0.13_0.014_260)] border border-[oklch(0.72_0.18_55/0.25)] text-[oklch(0.95_0.005_80)] focus:outline-none focus:border-[oklch(0.72_0.18_55)] transition-colors"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  <option value="helper">Helper — Aiuta i nuovi giocatori</option>
                  <option value="moderatore">Moderatore — Gestisci l'ordine</option>
                  <option value="builder">Builder — Crea strutture epiche</option>
                </select>
                <p
                  className="text-xs text-[oklch(0.50_0.012_80)] mt-2"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  {roleDescriptions[formData.ruolo]}
                </p>
              </div>

              {/* Esperienza */}
              <div>
                <label
                  className="block text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Esperienza nel Ruolo * (minimo 20 caratteri)
                </label>
                <textarea
                  name="esperienza"
                  value={formData.esperienza}
                  onChange={handleChange}
                  placeholder="Descrivi la tua esperienza come moderatore, helper o builder. Cosa hai fatto in altri server? Quali sono le tue competenze?"
                  rows={4}
                  className={`w-full px-4 py-3 bg-[oklch(0.13_0.014_260)] border text-[oklch(0.95_0.005_80)] placeholder-[oklch(0.40_0.010_80)] focus:outline-none focus:border-[oklch(0.72_0.18_55)] transition-colors resize-none ${
                    errors.esperienza ? "border-red-500" : "border-[oklch(0.72_0.18_55/0.25)]"
                  }`}
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                />
                <div className="flex justify-between items-center mt-2">
                  <p
                    className="text-xs text-[oklch(0.50_0.012_80)]"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {formData.esperienza.length} caratteri
                  </p>
                  {errors.esperienza && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.esperienza}
                    </p>
                  )}
                </div>
              </div>

              {/* Motivazione */}
              <div>
                <label
                  className="block text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Motivazione * (minimo 30 caratteri)
                </label>
                <textarea
                  name="motivazione"
                  value={formData.motivazione}
                  onChange={handleChange}
                  placeholder="Perché vuoi candidarti? Cosa ti attrae di ColossalMC? Come pensi di contribuire alla community?"
                  rows={4}
                  className={`w-full px-4 py-3 bg-[oklch(0.13_0.014_260)] border text-[oklch(0.95_0.005_80)] placeholder-[oklch(0.40_0.010_80)] focus:outline-none focus:border-[oklch(0.72_0.18_55)] transition-colors resize-none ${
                    errors.motivazione ? "border-red-500" : "border-[oklch(0.72_0.18_55/0.25)]"
                  }`}
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                />
                <div className="flex justify-between items-center mt-2">
                  <p
                    className="text-xs text-[oklch(0.50_0.012_80)]"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {formData.motivazione.length} caratteri
                  </p>
                  {errors.motivazione && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.motivazione}
                    </p>
                  )}
                </div>
              </div>

              {/* Disponibilità */}
              <div>
                <label
                  className="block text-sm font-bold tracking-widest uppercase text-[oklch(0.92_0.005_80)] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Disponibilità Settimanale *
                </label>
                <input
                  type="text"
                  name="disponibilita"
                  value={formData.disponibilita}
                  onChange={handleChange}
                  placeholder="Es. Lunedì-Venerdì 18:00-22:00, Sabato-Domenica 15:00-23:00"
                  className={`w-full px-4 py-3 bg-[oklch(0.13_0.014_260)] border text-[oklch(0.95_0.005_80)] placeholder-[oklch(0.40_0.010_80)] focus:outline-none focus:border-[oklch(0.72_0.18_55)] transition-colors ${
                    errors.disponibilita ? "border-red-500" : "border-[oklch(0.72_0.18_55/0.25)]"
                  }`}
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                />
                {errors.disponibilita && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.disponibilita}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 font-bold text-base tracking-[0.2em] uppercase bg-[oklch(0.72_0.18_55)] text-[oklch(0.10_0.012_260)] hover:bg-[oklch(0.78_0.18_55)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97] glow-amber"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[oklch(0.10_0.012_260)] border-t-transparent rounded-full animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Invia Candidatura
                  </>
                )}
              </button>

              <p
                className="text-xs text-center text-[oklch(0.40_0.010_80)]"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Compilando questo form accetti che i tuoi dati vengano utilizzati per valutare la tua candidatura.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 bg-[oklch(0.07_0.008_260)] border-t border-[oklch(0.72_0.18_55/0.12)]">
        <div className="container text-center">
          <p
            className="text-xs text-[oklch(0.30_0.006_80)]"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            © 2024 ColossalMC · Candidature Staff
          </p>
        </div>
      </footer>
    </div>
  );
}
