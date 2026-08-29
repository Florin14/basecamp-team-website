# v2 — varianta statică (HTML + CSS + JS, fără dependențe)

Site complet, funcțional, care rulează direct din fișiere. Nu are build step și nu
depinde de proiectul React din rădăcină — cele două sunt independente.

```bash
cd v2 && python3 -m http.server 5173     # http://localhost:5173
```

## Conținut

```
index.html                 pagina completă, semantic HTML + meta/OG + JSON-LD
assets/css/styles.css      design tokens (albastru/alb), glassmorphism, dark mode,
                           animații, mesh gradient, elemente 3D din hero, responsive
assets/js/main.js          preloader, scroll progress, cursor custom, butoane magnetice,
                           reveal la scroll, scramble text, countere, parallax,
                           marquee infinit, canvas cu particule, validare formular
assets/img/*.svg           imagini placeholder, vectoriale
```

## Rolul ei acum

1. **Referință de design** pentru proiectul React din rădăcină — tokens-urile din
   `styles.css` și logica de animație din `main.js` se portează în `src/styles/` și hooks.
2. **Variantă de sine stătătoare**, păstrată la cererea clientului. Rămâne funcțională
   indiferent de stadiul proiectului React.

## Atenție la conținut

Textele sunt cele din brief-ul inițial — portofoliu de developer, nu echipă de fotbal.
Numele, proiectele, testimonialele și `hello@example.com` sunt placeholdere.
