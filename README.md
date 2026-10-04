<!-- Created by Erion Nezha — © 2026 All rights reserved -->
# Furgon.al — Orarët e furgonëve nga Tirana

Orarët e **furgonëve dhe autobusëve ndërqytetas nga Tirana**: **29 destinacione**,
**179 nisje** konkrete, **10 operatorë** me telefon. Countdown live për nisjen e ardhshme.

## Linket live

- 🌐 Sajti live (Netlify): https://furgon-al.netlify.app
- 👀 Demo live (GitHub Pages): https://erionnezha.github.io/furgon-al/demo/
- 📄 Kjo faqe (demo + kodi burim): https://erionnezha.github.io/furgon-al/

## Veçoritë

- 🗺️ 29 destinacione nga Tirana me orare konkrete nisjeje
- ⏱️ Countdown live për nisjen e ardhshme
- 📞 10 operatorë me numër telefoni
- 🔍 Kërkim destinacionesh (tolerant ndaj ë/ç)
- 🇦🇱🇬🇧 Dy gjuhë: shqip + anglisht (333 çelësa)
- 📱 PWA — instalohet si app
- 🎫 Identiteti vizual "BILETA": kartë bilete me perforim, stil i ngrohtë letror

## Besueshmëria e të dhënave

- 1 destinacion i verifikuar plotësisht (Rinas)
- 27 pjesërisht të verifikuara
- 1 e paverifikuar (Kavajë)
- Çmimet € të operatorit dhe tarifat lekë (VKM 92/2024) të ndara qartë, pa konvertim të shpikur

## Teknologjitë

- React 18 + Vite 6
- Deploy: Netlify (produksion) + GitHub Pages (demo)

## Struktura

```
furgon-al-github/
├── index.html      ← kjo faqe: demo live + paneli "Kodi Burim"
├── README.md
└── demo/           ← build-i statik i sajtit (demo live)
    ├── index.html
    ├── assets/
    ├── icons/
    └── code/       ← file-e burim për panelin e kodit
        ├── App.jsx
        ├── data.js
        └── index.css
```

---
Krijuar nga Erion Nezha — © 2026 All rights reserved
