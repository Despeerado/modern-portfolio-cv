# Font Configuration
# Centralizovaná konfigurace pro Google Fonts
# Používá nejnovější verze automaticky bez nutnosti ručních aktualizací

## Použité fonty

### Hlavní stránka (index.html)
- **Karla**: Pro tělo textu a UI elementy
  - Váhy: 200-800 (variable font)
  - Použití: Navigace, odstavce, tlačítka
  
- **Petrona**: Pro nadpisy a výrazné texty  
  - Váhy: 100-900 (variable font)
  - Použití: H1-H6, hero sekce

### Ostatní stránky
- **Poppins**: Univerzálních font pro všechny elementy
  - Váhy: 300, 400, 500, 600, 700
  - Použití: Celá stránka

## Technické řešení

### 1. Dynamický loader (font-loader.js)
- Automaticky detekuje aktuální stránku
- Načítá pouze potřebné fonty
- Používá nejnovější verze z Google Fonts API
- Implementuje preloading pro lepší výkon

### 2. Fallback systém
- Systémové fonty jako záložní řešení
- Graceful degradation při selhání načítání
- FOUT (Flash of Unstyled Text) prevence

### 3. Výkonové optimalizace
- Preconnect pro DNS lookup
- Async loading s media="print" trick
- Font display: swap pro rychlejší zobrazení
- Preload kritických font souborů

## Výhody tohoto přístupu

✅ **Automatické aktualizace**: Žádné ruční změny verzí  
✅ **Lepší výkon**: Pouze potřebné fonty se načítají  
✅ **Robustnost**: Fallback na systémové fonty  
✅ **Udržitelnost**: Centralizovaná konfigurace  
✅ **PageSpeed optimized**: Žádné 404 chyby

## Monitorování

Font loading lze monitorovat v `cache-test.html`:
- Loading status jednotlivých fontů
- Performance metriky
- Error reporting
