/**
 * Google Fonts Dynamic Loader
 * Automaticky načítá nejnovější verze Google Fonts bez nutnosti ručních aktualizací
 *
 * @author GitHub Copilot & Despeerado
 * @version 1.0.0
 */

class FontLoader {
	constructor() {
		this.fonts = {
			// Definice fontů bez verzí - Google Fonts API automaticky vrátí nejnovější
			'karla-petrona': {
				url: 'https://fonts.googleapis.com/css2?family=Karla:wght@200..800&family=Petrona:wght@100..900&display=swap',
				preload: ['Karla', 'Petrona'],
			},
			poppins: {
				url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
				preload: ['Poppins'],
			},
		}

		this.cache = new Map()
		this.loadedFonts = new Set()
	}

	/**
	 * Načte font asynchronně s optimalizací výkonu
	 * @param {string} fontKey - Klíč fontu z this.fonts
	 * @param {boolean} preload - Zda přednahrát font soubory
	 */
	async loadFont(fontKey, preload = true) {
		if (this.loadedFonts.has(fontKey)) {
			return Promise.resolve()
		}

		const fontConfig = this.fonts[fontKey]
		if (!fontConfig) {
			console.warn(`Font "${fontKey}" not found in configuration`)
			return Promise.reject(new Error(`Unknown font: ${fontKey}`))
		}

		try {
			// 1. Načteme CSS s definicemi fontů
			await this.loadFontCSS(fontConfig.url)

			// 2. Volitelně přednahrajeme font soubory
			if (preload) {
				await this.preloadFontFiles(fontConfig.url)
			}

			this.loadedFonts.add(fontKey)
			console.log(`✅ Font "${fontKey}" loaded successfully`)
		} catch (error) {
			console.error(`❌ Failed to load font "${fontKey}":`, error)
			throw error
		}
	}

	/**
	 * Načte CSS s definicemi fontů
	 */
	async loadFontCSS(url) {
		return new Promise((resolve, reject) => {
			// Zkontrolujeme cache
			if (this.cache.has(url)) {
				resolve(this.cache.get(url))
				return
			}

			const link = document.createElement('link')
			link.rel = 'stylesheet'
			link.href = url
			link.media = 'print' // Začneme s print médii pro async loading

			link.onload = () => {
				link.media = 'all' // Aktivujeme font pro všechna média
				this.cache.set(url, link)
				resolve(link)
			}

			link.onerror = () => {
				reject(new Error(`Failed to load font CSS: ${url}`))
			}

			// Přidáme preconnect pro rychlejší DNS lookup
			this.addPreconnect()

			document.head.appendChild(link)
		})
	}

	/**
	 * Dynamicky přednahraje font soubory z Google Fonts CSS
	 */
	async preloadFontFiles(cssUrl) {
		try {
			// Stáhneme CSS a extrahujeme URL font souborů
			const response = await fetch(cssUrl)
			const cssText = await response.text()

			// Regex pro extrakci WOFF2 URLs
			const woff2Urls = cssText.match(/url\(([^)]+\.woff2)\)/g)

			if (woff2Urls) {
				const preloadPromises = woff2Urls
					.map((match) => match.replace(/url\(|\)/g, ''))
					.slice(0, 4) // Limitujeme na 4 nejdůležitější fonty (latin variants)
					.map((url) => this.preloadSingleFont(url))

				await Promise.all(preloadPromises)
			}
		} catch (error) {
			console.warn('Font preloading failed (non-critical):', error)
		}
	}

	/**
	 * Přednahraje jednotlivý font soubor
	 */
	preloadSingleFont(url) {
		return new Promise((resolve) => {
			const link = document.createElement('link')
			link.rel = 'preload'
			link.href = url
			link.as = 'font'
			link.type = 'font/woff2'
			link.crossOrigin = 'anonymous'

			link.onload = () => resolve()
			link.onerror = () => resolve() // Non-blocking

			document.head.appendChild(link)
		})
	}

	/**
	 * Přidá preconnect pro Google Fonts domény
	 */
	addPreconnect() {
		const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']

		domains.forEach((domain) => {
			if (!document.querySelector(`link[href="${domain}"]`)) {
				const link = document.createElement('link')
				link.rel = 'preconnect'
				link.href = domain
				if (domain.includes('gstatic')) {
					link.crossOrigin = 'anonymous'
				}
				document.head.appendChild(link)
			}
		})
	}

	/**
	 * Načte fonty na základě stránky
	 */
	async loadPageFonts() {
		const pathname = window.location.pathname

		if (pathname.includes('index.html') || pathname === '/') {
			// Hlavní stránka používá Karla + Petrona
			await this.loadFont('karla-petrona', true)
		} else {
			// Ostatní stránky používají Poppins
			await this.loadFont('poppins', true)
		}
	}

	/**
	 * Inicializace - volá se automaticky při načtení stránky
	 */
	async init() {
		try {
			await this.loadPageFonts()
		} catch (error) {
			console.error('Font loading initialization failed:', error)
		}
	}
}

// Automatická inicializace při načtení DOM
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		window.fontLoader = new FontLoader()
		window.fontLoader.init()
	})
} else {
	window.fontLoader = new FontLoader()
	window.fontLoader.init()
}

// Export pro možné použití v jiných skriptech
if (typeof module !== 'undefined' && module.exports) {
	module.exports = FontLoader
}
