# ColossalMC — Design Ideas

## Approcci stilistici considerati

### 1. Dark Fantasy Forge
Tema medievale-fantasy scuro ispirato alle fortezze di pietra. Toni di antracite, oro antico e rosso fuoco.
**Probabilità:** 0.07

### 2. Neon Pixel Arcade
Estetica retro-gaming con pixel art, neon vibranti su sfondo nero profondo, tipografia monospace.
**Probabilità:** 0.04

### 3. Epic Stone Kingdom ← SCELTO
Grandiosità epica ispirata a castelli colossali e regni di pietra. Sfondo scuro con texture rocciosa, accenti ambra/arancio come torce fiammeggianti, titoli imponenti.
**Probabilità:** 0.09

---

## Approccio Scelto: Epic Stone Kingdom

### Design Movement
Dark Epic Fantasy — ispirato all'estetica dei grandi RPG e server Minecraft di fascia alta. Grandioso, imponente, con senso di avventura e comunità.

### Core Principles
1. **Monumentalità** — ogni sezione deve sembrare grande, epica, degna di un regno
2. **Contrasto drammatico** — sfondi scuri con testi e accenti luminosi ad alto contrasto
3. **Texture e profondità** — overlay di pietra, gradients profondi, nessuna superficie piatta
4. **Chiarezza d'azione** — CTA sempre visibili, IP del server sempre in primo piano

### Color Philosophy
- **Sfondo primario:** `oklch(0.10 0.01 260)` — quasi nero con sfumatura blu-notte
- **Sfondo secondario:** `oklch(0.14 0.015 260)` — grigio scuro pietra
- **Accento primario (fuoco/ambra):** `oklch(0.72 0.18 55)` — arancio-ambra caldo, come torce
- **Accento secondario (oro):** `oklch(0.82 0.15 85)` — oro antico per titoli speciali
- **Testo primario:** `oklch(0.95 0.005 80)` — bianco caldo
- **Testo secondario:** `oklch(0.65 0.02 80)` — grigio chiaro

### Layout Paradigm
Layout asimmetrico con hero a schermo intero, sezioni alternate con angoli diagonali (clip-path), sidebar laterale per l'IP del server nella hero. Nessun grid centrato generico.

### Signature Elements
1. **Bordi luminosi ambra** — sottile glow arancio su card e pulsanti principali
2. **Texture pietra** — overlay semitrasparente su sfondi scuri per simulare muri di pietra
3. **Titoli con gradient oro-ambra** — text-gradient per i titoli principali

### Interaction Philosophy
Hover con glow ambra, transizioni fluide 200ms, pulsanti con scala 0.97 al click. Il sito deve sembrare "vivo" come un mondo fantasy.

### Animation
- Entrata hero: fade-in + slide-up 600ms ease-out
- Card hover: translateY(-4px) + glow intensificato 200ms
- Navbar: blur + opacità su scroll
- Particelle di fuoco/scintille nella hero (CSS puro)

### Typography System
- **Display/Titoli:** `Cinzel` (Google Fonts) — serif maiuscolo, stile romano-epico
- **Body/UI:** `Rajdhani` (Google Fonts) — sans-serif geometrico, leggibile e moderno
- **Monospace/IP:** `JetBrains Mono` — per l'indirizzo IP del server

### Brand Essence
**ColossalMC** — il server Minecraft survival per chi vuole costruire un'eredità. Epico, comunitario, senza compromessi.
Personalità: **Grandioso · Accogliente · Avventuroso**

### Brand Voice
Tono eroico ma accessibile. Titoli come proclami di un regno.
- Esempio headline: *"Forgia la tua leggenda su ColossalMC"*
- Esempio CTA: *"Unisciti al regno"*
Vietato: "Benvenuto nel nostro sito", "Inizia ora"

### Wordmark & Logo
Scudo stilizzato con la lettera "C" intagliata in pietra, con bagliore ambra. Simbolo grafico senza testo.

### Signature Brand Color
**Ambra fuoco** `oklch(0.72 0.18 55)` — il colore inconfondibile di ColossalMC.

---

## Style Decisions
- Usare `clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%)` per le sezioni diagonali
- Navbar trasparente → opaca su scroll con backdrop-blur
- IP sempre visibile con font monospace e bordo ambra
- Ogni sezione principale deve includere almeno un elemento "stone-kingdom": taglio diagonale, divisore intagliato, bagliore torcia, silhouette fortezza, bordo inciso o marcatore araldico
- Identità Minecraft visibile oltre al testo: usare motivi voxel/survival-world come terreno a blocchi, minerali, chunk, costruzioni, strumenti o icone artigianali integrati nell'art direction dark epic fantasy
- Il sistema di accenti di ColossalMC è **ambra fuoco prima, oro antico secondo**; tutti gli altri colori sono eccezioni araldiche rare e non devono mai competere con l'ambra come colore firma
