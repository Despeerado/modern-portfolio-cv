# Online Životopis / Portfolio

Tato šablona online životopisu a portfolia je vytvořena pomocí HTML, CSS (Sass), JavaScript a Bootstrap 5.

## Struktura Sass

Projekt používá metodologii BEM (Block, Element, Modifier) pro pojmenování tříd a strukturu Sass pro organizaci stylů.

### Adresářová struktura

```
scss/
  ├── abstracts/           # Pomocné soubory (proměnné, mixiny, funkce)
  │   ├── _variables.scss  # Proměnné (barvy, rozměry, atd.)
  │   ├── _mixins.scss     # Mixiny pro opakované použití kódu
  │   ├── _functions.scss  # Sass funkce
  │   └── _responsive.scss # Responsivní nastavení
  │
  ├── base/                # Základní styly
  │   ├── _reset.scss      # Reset a základní nastavení
  │   ├── _typography.scss # Typografie
  │   └── _utilities.scss  # Pomocné třídy
  │
  ├── components/          # Komponenty (nezávislé části UI)
  │   ├── _buttons.scss    # Tlačítka
  │   ├── _cards.scss      # Karty a boxy
  │   ├── _sections.scss   # Sekce stránky
  │   ├── _forms.scss      # Formuláře
  │   ├── _carousel.scss   # Karusely
  │   └── _icons.scss      # Ikony
  │
  ├── layout/              # Rozvržení stránky
  │   ├── _header.scss     # Hlavička
  │   ├── _navigation.scss # Navigace
  │   └── _footer.scss     # Patička
  │
  ├── pages/               # Specifické styly pro jednotlivé sekce
  │   ├── _home.scss       # Domovská stránka
  │   ├── _about.scss      # O mně
  │   ├── _portfolio.scss  # Portfolio
  │   └── ...              # Další sekce
  │
  ├── themes/              # Témata (světlé/tmavé)
  │   └── _dark-mode.scss  # Tmavý režim
  │
  ├── vendors/             # Styly třetích stran
  │   └── _bootstrap.scss  # Úpravy Bootstrap stylů
  │
  └── main.scss            # Hlavní soubor importující všechny ostatní
```

### BEM Metodologie

BEM (Block, Element, Modifier) je metodologie pojmenování CSS tříd, která pomáhá udržet kód přehledný a modulární.

- **Block**: Samostatná komponenta (např. `header`, `button`)
- **Element**: Součást bloku (např. `header__title`, `button__icon`)
- **Modifier**: Varianta bloku nebo elementu (např. `button--primary`, `header--dark`)

Příklad:
```scss
.card {                 // Block
  &__title {           // Element
    font-size: 1.5rem;
  }
  
  &__content {         // Element
    padding: 1rem;
  }
  
  &--featured {        // Modifier
    border: 2px solid gold;
  }
}
```

## Kompilace Sass

Pro kompilaci Sass do CSS použijte následující příkazy:

```bash
# Instalace závislostí
npm install

# Jednorázová kompilace
npm run sass

# Sledování změn a automatická kompilace
npm run sass:watch

# Kompilace pro produkci (komprimovaný výstup)
npm run build
```

## Použité technologie

- HTML5
- CSS3 / Sass
- JavaScript
- Bootstrap 5
- Font Awesome
- Google Fonts
- AOS (Animate On Scroll)
