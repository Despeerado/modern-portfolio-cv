// Service Worker Registration with Performance Optimization
// Defer registration until after page load for better performance

function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('/sw.js', {
					scope: '/',
				})
				.then((registration) => {
					console.log('SW: Registration successful', registration.scope)

					// Check for updates
					registration.addEventListener('updatefound', () => {
						const newWorker = registration.installing
						console.log('SW: New version installing...')

						newWorker.addEventListener('statechange', () => {
							if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
								console.log('SW: New version available, consider refresh')
								// Could show user notification about update here
							}
						})
					})
				})
				.catch((error) => {
					console.log('SW: Registration failed', error)
				})
		})
	} else {
		console.log('SW: Service Workers not supported')
	}
}

// Initialize service worker registration
registerServiceWorker()
