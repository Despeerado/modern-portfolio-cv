# Převod na Bootstrap 5 Mobile-First

## Shrnutí změn

### ✅ Dokončeno

1. **Zjednodušení struktury souborů**:
   - Odstraněna složitá Sass struktura s mnoha soubory
   - Vytvořen jediný `custom.css` soubor (~ 3KB) s minimálními custom styly
   - Využití Bootstrap 5 utility tříd pro 95% stylování

2. **HTML převod na Bootstrap třídy**:
   - `navbar` → čisté Bootstrap navbar s `navbar-expand-lg`, `navbar-light`, `bg-light`
   - `header` → Bootstrap utility třídy: `py-5`, `bg-light`, `display-4`, `text-center`, `text-lg-start`
   - `about` → Bootstrap grid a text utility: `fw-bold`, `text-primary`, `lead`, `text-muted`
   - `portfolio` → Bootstrap cards s `card`, `card-img-overlay`, `position-relative`
   - `services` → Bootstrap cards s `h-100`, `shadow-sm`, `text-center`

3. **Mobile-first breakpointy**:
   - `col-12` → základní mobilní layout (full width)
   - `col-sm-6` → 2 sloupce na malých mobilech (576px+)
   - `col-lg-4` → 3 sloupce na large (992px+)
   - `col-md-4` → responzivní services grid

4. **Glassmorphism efekty zachovány**:
   - Navbar má backdrop-filter pro glassmorphism
   - Minimální CSS pro hover efekty a transitions

### 📋 Custom CSS (css/custom.css)
Obsahuje pouze:
- Glassmorphism mixiny (`.glass`, `.glass-dark`)
- Navbar backdrop-filter
- Portfolio a service card hover efekty
- Utility třídy (`min-vh-75`)
- Smooth scroll a animace

### 🎯 Výhody tohoto přístupu:

1. **Rychlost vývoje**: Bootstrap utility třídy jsou rychlejší než psaní custom CSS
2. **Menší bundle**: Custom CSS má pouze ~3KB místo původních ~50KB
3. **Konzistence**: Bootstrap zajišťuje konzistentní spacing, typografii a breakpointy
4. **Přístupnost**: Bootstrap má vestavěnou podporu accessibility
5. **Mobile-first**: Bootstrap 5 je nativně mobile-first
6. **Udržovatelnost**: Méně custom kódu = méně chyb a jednodušší maintenance

### 🔧 Technické detaily:

**Breakpointy Bootstrap 5:**
- `xs`: < 576px (default)
- `sm`: ≥ 576px
- `md`: ≥ 768px
- `lg`: ≥ 992px
- `xl`: ≥ 1200px
- `xxl`: ≥ 1400px

**Použité Bootstrap komponenty:**
- Grid system (`container`, `row`, `col-*`)
- Cards (`card`, `card-body`, `card-img-overlay`)
- Navbar (`navbar`, `navbar-expand-lg`, `navbar-toggler`)
- Utilities (`text-*`, `bg-*`, `d-*`, `p-*`, `m-*`)
- Typography (`display-*`, `fs-*`, `fw-*`, `lead`)

### 📱 Mobile-first implementace:

1. **Výchozí styly** jsou pro nejmenší obrazovky
2. **Progressive enhancement** pomocí responsive tříd
3. **Flexbox layout** pro lepší responzivní chování
4. **Touch-friendly** velikosti tlačítek a click areas

### ⚡ Výkon:
- CSS bundle: ~3KB (custom) + Bootstrap 5 CDN
- Rychlejší loading díky CDN cache
- Menší custom CSS = rychlejší parsing

Tento přístup výrazně zjednodušuje kódovou základnu při zachování všech požadovaných funkcí a designu.
