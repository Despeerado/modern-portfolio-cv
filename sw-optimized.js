// Service Worker pro GitHub Pages optimalizaci cache
// Verze 2.0 - Optimalizace pro dlouhodobé cachování statických assetů

const CACHE_VERSION = 'v2-github-pages'
const STATIC_CACHE = `static-${CACHE_VERSION}`
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`

// Statické assety s dlouhým cache TTL (1 rok)
const LONG_CACHE_ASSETS = [
	// CSS soubory
	'/css/custom-bootstrap.css',
	'/css/style.min.css',
	'/css/icons.css',
	'/css/aos-minimal.css',

	// JavaScript soubory
	'/js/main.min.js',
	'/js/sw-register.js',
	'/js/css-loader.js',

	// Obrázky - loga a ikony (neměnné)
	'/images/logo_sass.svg',
	'/images/logo_css3.svg',
	'/images/logo_copilot.svg',
	'/images/logo_gitkraken.svg',
	'/images/logo_bootstrap.svg',
	'/images/logo_typescript.svg',
	'/images/logo_chatgpt.svg',
	'/images/logo_nodejs.svg',
	'/images/logo_javascript.svg',
	'/images/logo_vscode.svg',
	'/images/logo_tailwind.svg',
	'/images/logo_html.svg',
	'/images/logo_npm.svg',
	'/images/logo_figma.svg',
	'/images/logo_react.svg',
	'/images/logo_terminal.svg',
	'/images/webpack.svg',

	// Utility obrázky
	'/images/image_brush.svg',
	'/images/image_api.svg',
	'/images/image_documents.svg',
	'/images/profile-placeholder.svg',

	// Portfolio projekty
	'/images/portfolio/project1.svg',
	'/images/portfolio/project2.svg',
	'/images/portfolio/project3.svg',
	'/images/portfolio/project4.svg',
	'/images/portfolio/project5.svg',
	'/images/portfolio/project6.svg',

	// Skills obrázky
	'/images/skills/shoptet-logo-sign-full.webp',

	// Favicon a manifest
	'/favicon.svg',
	'/manifest.json',
]

// HTML stránky s kratším cache (1 den)
const SHORT_CACHE_ASSETS = ['/', '/index.html', '/index1.html', '/index_customized.html', '/_index.html', '/thank-you.html']

// Cache strategii podle typu souboru
const getCacheStrategy = (request) => {
	const url = new URL(request.url)
	const pathname = url.pathname

	// HTML soubory - Network First (aktuální obsah)
	if (pathname.endsWith('.html') || pathname === '/') {
		return 'network-first'
	}

	// Statické assety - Cache First (dlouhodobé cache)
	if (
		pathname.endsWith('.css') ||
		pathname.endsWith('.js') ||
		pathname.endsWith('.svg') ||
		pathname.endsWith('.webp') ||
		pathname.endsWith('.png') ||
		pathname.endsWith('.jpg') ||
		pathname.endsWith('.json')
	) {
		return 'cache-first'
	}

	return 'network-first'
}

// Install event
self.addEventListener('install', (event) => {
	console.log('SW: Installing optimized cache version', CACHE_VERSION)

	event.waitUntil(
		Promise.all([
			// Cache statické assety
			caches.open(STATIC_CACHE).then((cache) => {
				console.log('SW: Caching static assets')
				return cache.addAll(
					LONG_CACHE_ASSETS.map((url) => {
						return new Request(url, {
							cache: 'reload', // Vynutit fresh download při instalaci
						})
					})
				)
			}),

			// Cache HTML stránky
			caches.open(DYNAMIC_CACHE).then((cache) => {
				console.log('SW: Caching HTML pages')
				return cache.addAll(SHORT_CACHE_ASSETS)
			}),
		]).then(() => {
			console.log('SW: Installation complete, skipping waiting')
			return self.skipWaiting()
		})
	)
})

// Activate event
self.addEventListener('activate', (event) => {
	console.log('SW: Activating version', CACHE_VERSION)

	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						// Smaž staré verze cache
						if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
							console.log('SW: Deleting old cache:', cacheName)
							return caches.delete(cacheName)
						}
					})
				)
			})
			.then(() => {
				console.log('SW: Activation complete')
				return self.clients.claim()
			})
	)
})

// Fetch event s optimalizovanou strategií
self.addEventListener('fetch', (event) => {
	const request = event.request
	const url = new URL(request.url)

	// Pouze same-origin requesty
	if (url.origin !== location.origin) {
		return
	}

	// Ignore non-GET requests
	if (request.method !== 'GET') {
		return
	}

	const strategy = getCacheStrategy(request)

	event.respondWith(strategy === 'cache-first' ? cacheFirstStrategy(request) : networkFirstStrategy(request))
})

// Cache First strategie pro statické assety
async function cacheFirstStrategy(request) {
	try {
		const cachedResponse = await caches.match(request)

		if (cachedResponse) {
			console.log('SW: Serving from cache:', request.url)

			// Stale-while-revalidate: aktualizuj cache na pozadí
			updateCache(request)

			return cachedResponse
		}

		// Pokud není v cache, stáhni a cachuj
		return await fetchAndCache(request, STATIC_CACHE)
	} catch (error) {
		console.error('SW: Cache first failed:', error)
		throw error
	}
}

// Network First strategie pro HTML
async function networkFirstStrategy(request) {
	try {
		const networkResponse = await fetch(request)

		if (networkResponse.ok) {
			// Cache úspěšnou odpověď
			const cache = await caches.open(DYNAMIC_CACHE)
			cache.put(request, networkResponse.clone())
		}

		return networkResponse
	} catch (error) {
		console.log('SW: Network failed, trying cache for:', request.url)

		const cachedResponse = await caches.match(request)

		if (cachedResponse) {
			return cachedResponse
		}

		// Fallback pro offline HTML
		if (request.destination === 'document') {
			const fallback = await caches.match('/index.html')
			if (fallback) {
				return fallback
			}
		}

		throw error
	}
}

// Fetch a cache helper
async function fetchAndCache(request, cacheName) {
	const response = await fetch(request)

	if (response.ok) {
		const cache = await caches.open(cacheName)
		cache.put(request, response.clone())
	}

	return response
}

// Update cache na pozadí (stale-while-revalidate)
async function updateCache(request) {
	try {
		const response = await fetch(request)

		if (response.ok) {
			const cache = await caches.open(STATIC_CACHE)
			await cache.put(request, response)
			console.log('SW: Background cache update for:', request.url)
		}
	} catch (error) {
		// Tiché selhání pro background update
		console.log('SW: Background update failed for:', request.url)
	}
}

// Performance monitoring
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'CACHE_STATS') {
		getCacheStats().then((stats) => {
			event.ports[0].postMessage(stats)
		})
	}
})

// Cache statistiky
async function getCacheStats() {
	const cacheNames = await caches.keys()
	const stats = {}

	for (const cacheName of cacheNames) {
		const cache = await caches.open(cacheName)
		const keys = await cache.keys()
		stats[cacheName] = keys.length
	}

	return stats
}

console.log('SW: Service Worker loaded for GitHub Pages optimization')
