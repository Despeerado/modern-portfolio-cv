# GitHub Pages Setup

Pro správné hostování tohoto webu na GitHub Pages postupujte podle následujících kroků:

1. Forkněte nebo naklonujte tento repozitář
2. V nastavení repozitáře přejděte do sekce "Pages"
3. V sekci "Source" vyberte větev "main" a klikněte na "Save"
4. Váš web bude dostupný na adrese `https://vaseuzivatelskejmeno.github.io/Virtual_CV/`

## Přizpůsobení obsahu

Pro personalizaci webu:

1. Upravte `index.html` - nahraďte "Vaše Jméno" vaším skutečným jménem
2. Aktualizujte osobní informace v sekcích "O mně", "Služby" a "Kontakt"
3. Nahraďte zástupné SVG obrázky vlastními fotografiemi
4. Aktualizujte portfolio, reference a další obsah podle potřeby

## Kontaktní formulář

Pro zprovoznění kontaktního formuláře:

1. Vytvořte účet na [Formspree](https://formspree.io/)
2. Vytvořte nový formulář a získejte jedinečné ID
3. V souboru `index.html` aktualizujte řádek s action atributem formuláře:
   ```html
   <form id="contactForm" action="https://formspree.io/f/vase-formspree-id" method="POST">
   ```
