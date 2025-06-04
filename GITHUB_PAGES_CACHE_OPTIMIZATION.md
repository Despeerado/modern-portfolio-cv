# GitHub Pages Cache Optimization Guide

## Problém
GitHub Pages má pouze **10 minut TTL** pro cache, což je daleko od doporučených **1 roku** pro statické assety podle Lighthouse.

## Řešení

### 1. 🔧 Service Worker Optimalizace
- **Soubor**: `sw-optimized.js` (kopírovat přes `sw.js`)
- **Strategie**: Cache-First pro statické assety, Network-First pro HTML
- **TTL simulace**: 1 rok pro CSS/JS/obrázky, 1 den pro HTML

### 2. 📦 Cache Busting
```bash
# Automatické cache busting přes GitHub Actions
style.css → style.css?v=1733318400
main.js → main.js?v=1733318400
```

### 3. 🚀 GitHub Actions Deployment
- **Workflow**: `.github/workflows/deploy-optimized.yml`
- **Automaticky**: Minifikace, cache busting, optimalizace obrázků

### 4. 📊 Monitoring Cache Performance
```javascript
// Získání cache statistik
navigator.serviceWorker.controller?.postMessage({
  type: 'CACHE_STATS'
});
```

## Implementace

### Krok 1: Aktivovat optimalizovaný Service Worker
```bash
cp sw-optimized.js sw.js
```

### Krok 2: Přidat cache busting k HTML souborům
```bash
# Přidat timestamp ke všem CSS/JS odkazům
TIMESTAMP=$(date +%s)
sed -i "s/style\.css/style.css?v=$TIMESTAMP/g" *.html
sed -i "s/main\.min\.js/main.min.js?v=$TIMESTAMP/g" *.html
```

### Krok 3: Nastavit GitHub Actions
1. Vytvořit `.github/workflows/deploy-optimized.yml`
2. Commit a push do main/master branch
3. GitHub Actions automaticky aplikuje optimalizace

## Výsledky

### Před optimalizací:
- ❌ TTL: 10 minut pro všechny assety
- ❌ Opakované stahování při každé návštěvě
- ❌ Pomalé načítání

### Po optimalizaci:
- ✅ Simulované TTL: 1 rok pro statické assety
- ✅ Intelligent cache strategie
- ✅ Stale-while-revalidate pro aktualizace
- ✅ Offline fallback

## Cache Strategie

### Statické Assety (Cache-First + 1 rok TTL)
- CSS soubory (`*.css`)
- JavaScript soubory (`*.js`) 
- Obrázky (`*.svg`, `*.webp`, `*.png`)
- Loga a ikony
- Manifest a favicon

### Dynamický Obsah (Network-First + 1 den TTL)
- HTML stránky
- API calls (budoucí rozšíření)

## Monitoring

### Cache Hit Rate
```javascript
// Sledování cache hit rate
performance.getEntriesByType('navigation')[0].transferSize === 0
// true = served from cache
```

### Service Worker Status
```javascript
// Kontrola stavu service workeru
navigator.serviceWorker.ready.then(registration => {
  console.log('SW ready:', registration.active.state);
});
```

## GitHub Pages Limitace

### ❌ Co GitHub Pages nepodporuje:
- `.htaccess` soubory
- Vlastní server-side cache hlavičky
- Custom TTL nastavení

### ✅ Co můžeme použít:
- Service Worker pro client-side cache
- Cache busting query parametry
- Intelligent cache strategies
- Automatic asset optimization

## Performance Monitoring

### Lighthouse Metriky (očekávané zlepšení):
- **"Serve static assets with efficient cache policy"**: ✅ PASS
- **TTL simulace**: 365 dní místo 10 minut
- **Repeat visit performance**: 📈 Výrazné zlepšení

### Měření výkonu:
```bash
# Lighthouse CI test
npm install -g @lhci/cli
lhci autorun
```

## Deployment Checklist

- [ ] Zkopírovat `sw-optimized.js` → `sw.js`
- [ ] Nastavit GitHub Actions workflow
- [ ] Aplikovat cache busting na HTML
- [ ] Otestovat na GitHub Pages URL
- [ ] Ověřit Lighthouse skóre
- [ ] Zkontrolovat Service Worker v DevTools

## Troubleshooting

### Service Worker se nenačítá:
```javascript
// Debug registrace
navigator.serviceWorker.register('/sw.js')
  .then(reg => console.log('SW registered:', reg))
  .catch(err => console.log('SW registration failed:', err));
```

### Cache se neaktualizuje:
```javascript
// Force aktualizace cache
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => registration.unregister());
});
```

---

**📈 Očekávaný dopad**: Snížení loading time o 60-80% při opakovaných návštěvách díky efektivnímu cachování statických assetů.
