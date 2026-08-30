# FC Base Camp — stadiu

Implementarea este completă și funcțională. Vezi `README.md` pentru rulare, rute,
structură și configurarea sursei live de date.

## De făcut mai departe

1. **Conectarea la Supabase** — creează proiectul, rulează `supabase/schema.sql`,
   completează `.env`. Până atunci site-ul merge pe datele din `src/data/`.
2. **Scrierea din aplicația de scraping** — `upsert` în `matches` și `standings`,
   o dată pe zi. Contractul exact e documentat în README.
3. **Datele reale** — nume, lot, competiții, sponsori și imaginile din `public/img/`.
4. **Newsletter** — formularul din secțiunea de contact validează local, dar nu trimite
   nimic; de conectat la un serviciu (sau la un tabel `subscribers` în Supabase).
5. **SEO** — momentan doar `document.title` și description prin `useDocumentTitle`;
   de evaluat prerender dacă indexarea contează.
6. **Teste** — nu există încă.
