# FC Base Camp Cluj-Napoca — site oficial

Site pentru **FC Base Camp**, echipă de **minifotbal** din Cluj-Napoca (înființată în
2017), construit ca aplicație **Vite + React + TypeScript**. Structură hibridă: o pagină
principală plus pagini dedicate pentru club, lot, meciuri, știri și sponsorizare.

## Ce este real și ce este încă demo

| Real | Încă demo, de înlocuit |
|---|---|
| Identitatea clubului, sigla, orașul, terenul (Liceul Eugen Pora) | Lotul de jucători și statisticile lor |
| Competițiile: AJM Cluj, Liga 1 All Time Sport, Friends4Football turnee FRM | Meciurile, rezultatele și clasamentele |
| Propunerea de sponsorizare: pachete, buget, plan de acoperire, direcție 3 ani | Știrile și galeria foto |
| Contactele: Bogdan Tiut (coordonator echipă), Zimbru Florin (sponsorizări), pagina de Facebook | — |

Clubul nu are antrenor angajat: echipa este coordonată de Bogdan Tiut, fondatorul ei.
Secțiunea de staff din `/lot` reflectă asta — nu inventa un antrenor în `src/data/staff.ts`.

Meciurile și clasamentele se actualizează din Supabase, fără deploy — vezi secțiunea
dedicată mai jos.

## Rulare

```bash
npm install
npm run dev        # server de dezvoltare pe http://localhost:5173
npm run build      # typecheck + build de producție în dist/
npm run preview    # servește build-ul de producție
npm run typecheck  # doar verificarea de tipuri
```

## Rute

| Rută | Conținut |
|---|---|
| `/` | Landing, în ordinea: hero → următorul meci → despre club → lot → galerie → competiții → știri → rezultate și clasamente → contact |
| `/club` | Povestea clubului, parcursă la scroll (secțiunea `Story`) |
| `/lot` | Golgheterii clubului, lotul grupat pe posturi cu filtre, staff-ul |
| `/meciuri` | Program, rezultate și clasamente (tab-uri), filtru pe competiție, play-off/play-out |
| `/stiri` | Toate articolele, cu filtru pe categorie |
| `/stiri/:slug` | Articol individual + articole conexe |
| `/sponsorizare` | Propunerea pentru parteneri (`Partners`) + sponsorii actuali (`Sponsors`) |
| orice altceva | Pagina 404 |

Doar `/` intră în bundle-ul inițial; restul rutelor se încarcă la cerere
(`React.lazy` în `src/App.tsx`, cu `Suspense` în `Layout`).

## Competiții și faze

Clubul joacă simultan în patru competiții, definite în `src/data/competitions.ts`:

| Competiție | Format | Faze |
|---|---|---|
| Campionatul Județean de Minifotbal (AJM Cluj) | Campionat | sezon regulat → play-off (primele 6) / play-out |
| Liga 1 All Time Sport (ATS Cluj) | Campionat | clasament unic |
| Friends4Football | Campionat | sezon regulat → play-off (primele 7) / play-out |
| Turnee naționale (sub egida FRM) | Turnee | fără clasament |

> Structura fazelor pentru AJM este o presupunere — de confirmat cu regulamentul
> competiției și ajustat în `src/data/competitions.ts`.

O competiție cu mai multe faze primește automat un comutator
**Sezon regulat / Play-off / Play-out** deasupra tabelului. Fazele care nu au încă
rânduri publicate afișează regula de calificare în locul tabelului, nu se ascund.

Zonele colorate din clasament se calculează în `zoneOf()` din `src/data/standings.ts`,
diferit pe fază: în sezonul regulat marchează cine prinde play-off-ul, în play-off cine
merge la turneul final, în play-out cine retrogradează.

## Actualizare fără deploy (Supabase)

Scorurile și clasamentele nu trebuie recompilate: sunt citite la runtime dintr-o bază
de date Supabase, în care scrie aplicația ta separată de scraping.

```
aplicația ta de scraping  ──(service_role key, scriere)──►  Supabase (Postgres)
                                                                  │
                          site-ul (anon key, doar citire, RLS) ◄──┘
```

**Configurare, o singură dată:**

1. Creează un proiect pe [supabase.com](https://supabase.com).
2. În **SQL Editor**, rulează `supabase/schema.sql` (tabele, trigger pentru
   `updated_at`, RLS cu citire publică). Opțional `supabase/seed.sql` pentru date de test.
3. Copiază `.env.example` în `.env` și completează:
   ```
   VITE_SUPABASE_URL=https://<proiect>.supabase.co
   VITE_SUPABASE_ANON_KEY=<cheia anon, publică>
   ```
4. Rebuild o singură dată. De aici încolo, orice scriere în baza de date apare pe site
   fără deploy.

**Ce citește site-ul:** tabelele `matches` și `standings`. Restul conținutului (lot,
staff, texte despre club, știri, sponsori, galerie) rămâne în `src/data/` și se schimbă
prin deploy.

**Cum se comportă:**
- Fără variabilele de mediu, sau dacă cererea eșuează, site-ul folosește datele din
  `src/data/` și funcționează normal — nu rămâne niciodată gol.
- Reîmprospătează la revenirea în tab și la fiecare 15 minute.
- Pe `/meciuri` apare momentul ultimei actualizări, când datele vin din sursa live.

**Ce scrie aplicația ta:** `upsert` în `matches` (cheia `id`) și în `standings`
(cheia compusă `competition, phase, position`). Un meci fără `home_score`/`away_score`
este tratat ca programat; când primește scor, devine rezultat. `phase` acceptă
`regular`, `playoff` sau `playout`. Cheia `service_role` ocolește RLS și nu trebuie
să ajungă niciodată în acest proiect.

## Deploy pe Vercel

Proiectul are `vercel.json` — Vercel citește de acolo build-ul, folderul de ieșire și
rescrierea pentru rutele SPA. În interfață nu trebuie schimbat nimic la setările de build.

| Setare | Valoare |
|---|---|
| Framework Preset | Vite (detectat automat) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Root Directory | rădăcina repo-ului |

**Variabile de mediu** (Settings → Environment Variables), aceleași pe Production,
Preview și Development:

| Nume | Valoare |
|---|---|
| `VITE_SUPABASE_URL` | `https://<proiect>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | cheia **anon**, publică |

Două lucruri de reținut:

- Variabilele `VITE_*` sunt înlocuite **la build**, nu citite la runtime. Dacă schimbi o
  cheie, trebuie un redeploy ca să aibă efect.
- Cheia anon ajunge, prin construcție, în bundle-ul trimis în browser. Este în regulă:
  accesul e limitat de politicile RLS din `supabase/schema.sql`, care permit doar
  citirea. Cheia `service_role` nu trebuie pusă niciodată aici — ea rămâne doar în
  aplicația ta de scraping.

Fără variabile, deploy-ul funcționează oricum: site-ul cade pe datele din `src/data/`.

**Rescrierea SPA** din `vercel.json` este obligatorie. Fără ea, `/lot` sau
`/stiri/:slug` dau 404 la acces direct sau la refresh, pentru că pe server nu există
fișiere cu numele astea — există o singură pagină, iar rutarea se face în browser.

## Structură

```
src/
  components/
    layout/     Nav, Footer, Layout, PageHeader, Preloader, PageTransition, cursor, progres
    cards/      MatchCard, PlayerCard, StaffCard, NewsCard, CompetitionCard,
                StandingsTable, PhaseSwitcher, FormPills
    ui/         Button, Reveal, SplitText, SectionHead, MeshBackground, iconițe
  data/         Datele clubului + DataProvider (sursa live) — vezi mai jos
  hooks/        useTheme, useReveal, useInView, useCountdown, useCountUp, useCursor,
                useMagnetic, useTilt, useParallax, useRipple, useScramble, usePreloader,
                useScrollProgress, useDocumentTitle
  lib/          Formatare ro-RO, pluralizare, client REST pentru Supabase
  pages/        Câte o pagină per rută
  sections/     Secțiunile paginii principale
  styles/       tokens.css (design tokens) + global.css (reset, primitive, animații)
public/img/     Imagini placeholder SVG generate
supabase/       schema.sql + seed.sql
```

## Date

Conținutul este **demo** și se înlocuiește fără a atinge componentele:

- `club.ts` — identitate, teren, contact, rețele sociale, cifrele din hero
- `competitions.ts` — competițiile, fazele și zonele de clasament
- `squad.ts` / `staff.ts` — lotul (14 jucători) și banca tehnică
- `matches.ts` — program + rezultate (un meci devine „rezultat" când primește `score`)
- `standings.ts` — clasamentele, pe competiție și pe fază
- `news.ts`, `sponsors.ts`, `gallery.ts`
- `DataProvider.tsx` — înlocuiește `matches` și `standings` cu datele din Supabase

## Pagina principală: prezentare întâi, tehnic la final

Homepage-ul este ordonat pentru un vizitator care nu știe nimic despre club — inclusiv
un potențial sponsor — nu pentru un suporter care caută clasamentul. Detaliile tehnice
(rezultate, clasamente pe faze) stau spre final; cine le caută are `/meciuri` în meniu.

Cele două blocuri lungi — povestea clubului (400vh de scroll) și propunerea pentru
parteneri — au pagini proprii (`/club`, `/sponsorizare`), accesibile din meniu. Landing-ul
rămâne astfel de ~9 secțiuni, iar sponsorii ajung direct pe pagina care îi privește
(link și din canalul „Vrei să ne susții" al secțiunii Contact).

Două secțiuni poartă greutatea prezentării:

- **`Story`** (`src/sections/Story.tsx`) — povestea clubului parcursă la scroll: panoul
  din dreapta rămâne fixat, iar anul, imaginea și textul se schimbă pe măsură ce cobori,
  cu o bară de progres verticală. Sub 900px sau la `prefers-reduced-motion` devine o
  listă verticală obișnuită, fără fixare. Conținutul e în `src/data/story.ts`.
- **`Partners`** (`src/sections/Partners.tsx`) — propunerea de colaborare, cu datele
  reale din documentul clubului: un echipament desenat în SVG (față, secundar, șort) cu
  zonele de sponsorizare selectabile la hover, click sau tastatură; pachetele lunare
  (500 / 1.000 / 2.000 lei) și cele sezoniere; **bugetul anual detaliat pe categorii**,
  cu totalul calculat automat din categorii; planul de acoperire și direcția pe trei ani.
  Tot conținutul e în `src/data/partnership.ts`.
- **`Sponsors`** — cât timp lista de sponsori din `src/data/sponsors.ts` este goală,
  secțiunea afișează **locurile de partener disponibile** în loc de logo-uri inventate.
  Când apar primii parteneri, adaugă-i în listă și secțiunea trece automat pe marquee-ul
  cu logo-uri.

## Tipografie

Patru familii, fiecare cu un rol clar:

| Font | Rol |
|---|---|
| Inter | text curent |
| Poppins | titluri structurale, cifre, etichete |
| **Playfair Display** | titluri editoriale, cu italic pe cuvântul accentuat — secțiunile de prezentare (`serif` pe `SectionHead`, clasa `.editorial`) |
| **Caveat** | adnotări scrise de mână, scurte (clasa `.hand`) |

## Animații

Design-ul albastru/glass este portat din varianta statică din `v2/` (păstrată ca
referință), cu un strat de mișcare peste: ecran de întâmpinare cu siglă desenată,
tranziții între pagini, titluri care se ridică literă cu literă, gradient animat,
text „scramble", tilt 3D și sheen pe carduri, ripple pe butoane, parallax pe decor,
countdown cu cifre care alunecă, scoruri care urcă de la zero, clasamente în cascadă
cu bare de puncte.

Toate se opresc la `prefers-reduced-motion: reduce`; efectele care depind de cursor
(tilt, magnetic, cursor personalizat) se activează doar pe pointer fin.

### Reguli de performanță pentru decor

Fundalurile difuze (`.mesh__blob`, `.orb` din `NextMatch`/`Contact`/`Partners`) sunt
suprafețe uriașe cu `filter: blur(...)`. Ca să nu blocheze scroll-ul:

- **Nu anima `scale` pe ele.** Scale forțează re-rasterizarea suprafeței blurate la
  fiecare cadru; `translate3d` singur e o operație pură de compozitare. Keyframe-urile
  `drift1/2/3` și `orbDrift` sunt intenționat doar din translate.
- **`MeshBackground` oprește animația off-screen** (IntersectionObserver → clasa
  `.mesh--idle` cu `animation-play-state: paused`). Orice fundal animat nou ar trebui
  să facă la fel.
- **`will-change: transform` doar pe elemente puține și chiar animate** (parallax-ul din
  `Hero`/`ClubIntro`, blob-urile vizibile). Pe carduri care se repetă de N ori promova
  fiecare card într-un layer GPU separat, degeaba.
- **Hook-urile de scroll cuantifică progresul** (`useScrollProgress`, `useScrollScene`
  rotunjesc la 0,5%), ca să nu declanșeze un re-render React la fiecare cadru.

Ecranul de întâmpinare apare **o singură dată pe sesiune** (`sessionStorage`) și dispare
după primul cadru randat — nu așteaptă fonturile sau imaginile. Fonturile Google se
încarcă neblocant (`media="print"` + `onload`), ca să nu întârzie primul render.

## Accesibilitate

- Temă light/dark cu persistare și respectarea `prefers-color-scheme`
- Meniul mobil se închide la Escape, la click în afara lui și la schimbarea rutei
- Skip-link, roluri ARIA pe tab-uri și filtre, tabele de clasament cu `caption` și `th`
