# Moderní Online CV/Portfolio

Moderní responzivní osobní portfolio/CV stránka vytvořená pomocí Bootstrap 5 a interaktivních prvků v JavaScriptu.

## Funkce

- Plně responzivní design (mobil, tablet, desktop)
- Tmavý/světlý režim
- Smooth scroll navigace
- Animace při scrollování (AOS - Animate On Scroll)
- Carousel pro reference
- Interaktivní efekty na hover
- Kontaktní formulář
- Hamburger menu pro mobilní zařízení
- Tlačítko "Zpět nahoru"
- Optimalizováno pro GitHub Pages

## Technologie

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome (ikony)
- Google Fonts (Poppins)
- AOS - Animate On Scroll knihovna

## Struktura projektu

```
Virtual_CV/
├── css/
│   └── style.css
├── images/
│   ├── portfolio/
│   ├── testimonials/
│   └── blog/
├── js/
│   └── main.js
└── index.html
```

## Instalace a spuštění

1. Stáhněte nebo naklonujte tento repozitář
2. Otevřete soubor `index.html` v prohlížeči

Nebo můžete web hostovat pomocí GitHub Pages:

1. Forkněte tento repozitář
2. Přejděte na kartu "Settings" > "Pages"
3. Vyberte větev "main" a klikněte na "Save"
4. Váš web bude dostupný na adrese `https://vaseuzivatelskejmeno.github.io/Virtual_CV/`

## Přizpůsobení

### Osobní údaje
Pro přizpůsobení webu vašim potřebám upravte následující:

- Nahraďte "Vaše Jméno" svým skutečným jménem ve všech výskytech
- Aktualizujte informace v sekci "O mně" 
- Přidejte vlastní fotografie do adresáře `images/`
- Aktualizujte portfolio, reference a další sekce
- Nastavte vlastní kontaktní údaje

### Barvy
Pro změnu barevného schématu upravte CSS proměnné v souboru `style.css`:

```css
:root {
    --primary-color: #6f42c1;
    --primary-light: #8559da;
    --primary-dark: #5e35b1;
    /* další barvy */
}
```

### Formspree pro kontaktní formulář
Pro funkční kontaktní formulář:

1. Zaregistrujte se na [Formspree](https://formspree.io/)
2. Získejte jedinečné ID formuláře
3. Aktualizujte `action` atribut formuláře v `index.html`:

```html
<form id="contactForm" action="https://formspree.io/f/vase-formspree-id" method="POST">
```

## Rozšíření a vylepšení

Možná vylepšení pro budoucí verze:

- Přidat filtrování portfolia
- Implementovat více možností tmavého/světlého režimu
- Přidat animovaná pozadí nebo částice
- Vytvořit vícejazyčnou verzi
- Integrovat s CMS pro snadnější správu obsahu

## Licence

Tento projekt je volně k použití pro osobní i komerční účely.

## Autor

Vytvořeno v roce 2025 
