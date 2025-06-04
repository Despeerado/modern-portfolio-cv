// Service Worker for Virtual CV Portfolio
// Version 1.0 - Performance optimized caching strategy

const CACHE_NAME = 'virtual-cv-v1'
const STATIC_CACHE = 'virtual-cv-static-v1'
const DYNAMIC_CACHE = 'virtual-cv-dynamic-v1'

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
	'/',
	'/index.html',
	'/css/custom-bootstrap.css',
	'/css/aos-minimal.css',
	'/css/icons.css',
	'/css/style.css',
	'/js/main.min.js',
	'/js/css-loader.js',
	'/images/profile-placeholder.svg',
	'/images/image_brush.svg',
	'/images/image_documents.svg',
	'/images/image_api.svg',
]

// Performance optimized resources
const PERFORMANCE_RESOURCES = ['/images/skills/shoptet-logo-sign-full.webp', '/favicon.svg', '/favicon.ico']

// Install event - cache critical resources
self.addEventListener('install', (event) => {
	console.log('Service Worker: Installing...')

	event.waitUntil(
		Promise.all([
			// Cache critical resources
			caches.open(STATIC_CACHE).then((cache) => {
				console.log('Service Worker: Caching critical resources')
				return cache.addAll(CRITICAL_RESOURCES)
			}),

			// Cache performance resources
			caches.open(DYNAMIC_CACHE).then((cache) => {
				console.log('Service Worker: Caching performance resources')
				return cache.addAll(PERFORMANCE_RESOURCES)
			}),
		]).then(() => {
			console.log('Service Worker: Installation complete')
			return self.skipWaiting()
		})
	)
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
	console.log('Service Worker: Activating...')

	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cache) => {
						// Delete old caches
						if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
							console.log('Service Worker: Deleting old cache:', cache)
							return caches.delete(cache)
						}
					})
				)
			})
			.then(() => {
				console.log('Service Worker: Activation complete')
				return self.clients.claim()
			})
	)
})

// Fetch event - optimized cache strategy
self.addEventListener('fetch', (event) => {
	const { request } = event
	const url = new URL(request.url)

	// Only handle same-origin requests
	if (url.origin !== location.origin) {
		return
	}

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			// Return cached version if available
			if (cachedResponse) {
				console.log('Service Worker: Serving from cache:', request.url)
				return cachedResponse
			}

			// Network first for HTML
			if (request.destination === 'document') {
				return networkFirst(request)
			}

			// Cache first for static assets
			if (request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
				return cacheFirst(request)
			}

			// Default to network first
			return networkFirst(request)
		})
	)
})

// Network first strategy
async function networkFirst(request) {
	try {
		const networkResponse = await fetch(request)

		// Cache successful responses
		if (networkResponse.status === 200) {
			const cache = await caches.open(DYNAMIC_CACHE)
			cache.put(request, networkResponse.clone())
		}

		return networkResponse
	} catch (error) {
		console.log('Service Worker: Network failed, trying cache:', request.url)
		const cachedResponse = await caches.match(request)

		if (cachedResponse) {
			return cachedResponse
		}

		// Fallback for offline HTML requests
		if (request.destination === 'document') {
			return caches.match('/index.html')
		}

		throw error
	}
}

// Cache first strategy
async function cacheFirst(request) {
	const cachedResponse = await caches.match(request)

	if (cachedResponse) {
		return cachedResponse
	}

	try {
		const networkResponse = await fetch(request)

		if (networkResponse.status === 200) {
			const cache = await caches.open(STATIC_CACHE)
			cache.put(request, networkResponse.clone())
		}

		return networkResponse
	} catch (error) {
		console.log('Service Worker: Failed to fetch:', request.url)
		throw error
	}
}

// Background sync for analytics (future enhancement)
self.addEventListener('sync', (event) => {
	if (event.tag === 'background-sync') {
		console.log('Service Worker: Background sync triggered')
		// Could implement analytics or form submission sync here
	}
})

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
	if (event.data) {
		console.log('Service Worker: Push notification received')
		// Could implement push notifications for portfolio updates
	}
})
