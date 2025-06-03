# 🎨 Bootstrap Color Mode Implementation

## ✅ Implementováno: Oficiální Bootstrap 5.3 Color Modes

### 📋 Implementované funkce:

#### 1. **HTML Structure (index.html)**
```html
<!-- Root element s data-bs-theme -->
<html lang="cs" data-bs-theme="light">

<!-- Navbar s Bootstrap dropdown -->
<nav class="navbar navbar-expand-lg fixed-top shadow-sm" data-bs-theme="light">
  <div class="dropdown me-2">
    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" 
            data-bs-toggle="dropdown" aria-label="Toggle theme">
      <i class="fas fa-circle-half-stroke me-1"></i>
      <span class="d-none d-sm-inline">Téma</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li><button class="dropdown-item" data-bs-theme-value="light">
        <i class="fas fa-sun me-2"></i>Light</button></li>
      <li><button class="dropdown-item" data-bs-theme-value="dark">
        <i class="fas fa-moon me-2"></i>Dark</button></li>
      <li><button class="dropdown-item" data-bs-theme-value="auto">
        <i class="fas fa-circle-half-stroke me-2"></i>Auto</button></li>
    </ul>
  </div>
</nav>
```

#### 2. **JavaScript Implementation (js/main.js)**
```javascript
// Bootstrap Color Mode - Oficiální implementace
// Based on: https://getbootstrap.com/docs/5.3/customize/color-modes/

const getStoredTheme = () => localStorage.getItem('theme')
const setStoredTheme = theme => localStorage.setItem('theme', theme)

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme()
  if (storedTheme) {
    return storedTheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = theme => {
  if (theme === 'auto') {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', preferredTheme)
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
}
```

#### 3. **CSS Optimization (css/custom.css)**
```css
/* Bootstrap Color Mode Support */
[data-bs-theme="dark"] .navbar {
  background: rgba(33, 37, 41, 0.95) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

[data-bs-theme="light"] .navbar {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

[data-bs-theme="dark"] .glass {
  background: rgba(255, 255, 255, 0.1);
}

[data-bs-theme="light"] .glass {
  background: rgba(255, 255, 255, 0.25);
}
```

### 🎯 Funkce:

#### ✅ **Tři módy podpory:**
1. **Light Mode** - světlý režim
2. **Dark Mode** - tmavý režim  
3. **Auto Mode** - automaticky podle systémových preferencí

#### ✅ **Persistence:**
- Uložení preference v `localStorage`
- Pamatuje si volbu mezi sessiony
- Auto-detekce systémových preferencí

#### ✅ **Responsivní design:**
- Dropdown menu se přizpůsobuje velikosti obrazovky
- Na mobilech skryje text "Téma", zobrazuje jen ikonu
- Plně Bootstrap-kompatibilní

#### ✅ **Accessibility:**
- Správné ARIA labels
- Keyboard navigation support
- Active state indication

### 🔧 Technické specifikace:

#### **Bootstrap verze:** 5.3.0+
#### **Data atributy:**
- `data-bs-theme="light|dark|auto"` na `<html>` elementu
- `data-bs-theme-value` na dropdown položkách

#### **LocalStorage:**
- Klíč: `theme`
- Hodnoty: `light`, `dark`, `auto`

#### **Media Query Support:**
- Automatická detekce `(prefers-color-scheme: dark)`
- Dynamické přepínání při změně systémových preferencí

### 📱 Mobile Optimization:

#### **Responsivní chování:**
```css
@media (max-width: 575.98px) {
  .dropdown .btn .d-none.d-sm-inline {
    display: none !important;
  }
}
```

#### **Touch-friendly:**
- Optimalizované velikosti tlačítek
- Smooth transitions
- Proper spacing pro touch targets

### 🎨 Design Features:

#### **Icons:**
- 🌞 Sun icon pro Light mode
- 🌙 Moon icon pro Dark mode  
- ⚪ Half-circle icon pro Auto mode

#### **Smooth Transitions:**
- CSS transitions na všech prvcích
- Bootstrap utility třídy
- Konzistentní vzhled napříč módy

### 🚀 Výhody Bootstrap řešení:

1. **Oficiální podpora** - Bootstrap 5.3+ native feature
2. **Future-proof** - dlouhodobá podpora
3. **Automatic fallbacks** - graceful degradation
4. **CSS Variables** - Bootstrap CSS custom properties
5. **Component compatibility** - všechny Bootstrap komponenty fungují
6. **Performance** - optimalizované pro rychlost

### 🔍 Testování:

#### **Ověřte funkčnost:**
1. **Dropdown menu** - kliknutí na theme toggle
2. **Theme switching** - přepínání mezi light/dark/auto
3. **Persistence** - refresh stránky zachová volbu
4. **System preference** - auto mode sleduje OS
5. **Mobile responsivity** - správné zobrazení na mobilech

---

**Status: ✅ BOOTSTRAP COLOR MODES IMPLEMENTOVÁNY**  
**Datum: 2. června 2025**  
**Metoda: Oficiální Bootstrap 5.3 dokumentace**
