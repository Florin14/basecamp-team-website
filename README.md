# FC Base Camp — site oficial

Site pentru o echipă de **minifotbal** din Brașov, înscrisă în patru competiții,
construit ca aplicație **Vite + React + TypeScript**. Structură hibridă: o pagină
principală lungă plus pagini dedicate pentru lot, meciuri și știri.

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
| `/` | Landing: hero, următorul meci cu countdown, competiții, despre club, lot, rezultate + clasamente, știri, galerie, sponsori, contact |
| `/lot` | Golgheterii clubului, lotul grupat pe posturi cu filtre, staff-ul |
| `/meciuri` | Program, rezultate și clasamente (tab-uri), filtru pe competiție, play-off/play-out |
| `/stiri` | Toate articolele, cu filtru pe categorie |
| `/stiri/:slug` | Articol individual + articole conexe |
| orice altceva | Pagina 404 |

## Competiții și faze

Clubul joacă simultan în patru competiții, definite în `src/data/competitions.ts`:

| Competiție | Format | Faze |
|---|---|---|
| Liga Națională de Minifotbal (Seria C) | Campionat | sezon regulat → play-off (primele 6) / play-out |
| Cupa României la Minifotbal | Cupă | eliminatoriu, fără clasament |
| Campionatul Județean Brașov | Campionat | sezon regulat → play-off (primele 4) / play-out |
| Liga Corporate Brașov | Campionat | clasament unic |

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

## Animații

Design-ul albastru/glass este portat din varianta statică din `v2/` (păstrată ca
referință), cu un strat de mișcare peste: ecran de întâmpinare cu siglă desenată,
tranziții între pagini, titluri care se ridică literă cu literă, gradient animat,
text „scramble", tilt 3D și sheen pe carduri, ripple pe butoane, parallax pe decor,
countdown cu cifre care alunecă, scoruri care urcă de la zero, clasamente în cascadă
cu bare de puncte.

Toate se opresc la `prefers-reduced-motion: reduce`; efectele care depind de cursor
(tilt, magnetic, cursor personalizat) se activează doar pe pointer fin.

## Accesibilitate

- Temă light/dark cu persistare și respectarea `prefers-color-scheme`
- Meniul mobil se închide la Escape, la click în afara lui și la schimbarea rutei
- Skip-link, roluri ARIA pe tab-uri și filtre, tabele de clasament cu `caption` și `th`
