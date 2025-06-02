# Lokální spuštění a testování

Pro lokální spuštění a testování tohoto portfolia/CV webu máte několik možností:

## Možnost 1: Přímo otevřít HTML soubor

Nejjednodušší způsob, jak si prohlédnout web, je otevřít soubor `index.html` přímo v prohlížeči:

1. Otevřete složku projektu
2. Klikněte pravým tlačítkem na soubor `index.html`
3. Vyberte "Otevřít v" a zvolte váš oblíbený prohlížeč

## Možnost 2: Použití lokálního serveru

Pro lepší testování, zejména pokud používáte JavaScript funkce, je vhodné spustit lokální server:

### Pomocí Python

Python má vestavěný HTTP server:

```bash
# Python 3
cd /cesta/k/Virtual_CV
python -m http.server

# Python 2
cd /cesta/k/Virtual_CV
python -m SimpleHTTPServer
```

Web pak bude dostupný na adrese: `http://localhost:8000`

### Pomocí Node.js

Pokud máte nainstalovaný Node.js, můžete použít `http-server`:

```bash
# Instalace (stačí jednou)
npm install -g http-server

# Spuštění
cd /cesta/k/Virtual_CV
http-server
```

Web pak bude dostupný na adrese: `http://localhost:8080`

### Pomocí VS Code

Pokud používáte Visual Studio Code, můžete nainstalovat rozšíření "Live Server":

1. Otevřete VS Code
2. Nainstalujte rozšíření "Live Server" (autor: Ritwick Dey)
3. Otevřete složku projektu
4. Klikněte pravým tlačítkem na soubor `index.html`
5. Vyberte "Open with Live Server"

## Testování responzivity

Pro testování, jak web vypadá na různých zařízeních:

1. Otevřete web v prohlížeči
2. Otevřete vývojářské nástroje (F12 nebo pravé tlačítko > Prozkoumat)
3. Přepněte do režimu responzivního designu (ikona mobilního zařízení)
4. Vyberte různá zařízení nebo nastavte vlastní rozměry
