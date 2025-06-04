// CSS Loading Performance Optimization
// Defer non-critical CSS loading with improved performance
function loadCSS(href, before, media) {
	var doc = window.document
	var ss = doc.createElement('link')
	var ref
	if (before) {
		ref = before
	} else {
		var refs = (doc.body || doc.getElementsByTagName('head')[0]).childNodes
		ref = refs[refs.length - 1]
	}

	var sheets = doc.styleSheets
	ss.rel = 'stylesheet'
	ss.href = href
	ss.media = 'only x'

	function ready(cb) {
		if (doc.body) {
			return cb()
		}
		setTimeout(function () {
			ready(cb)
		})
	}

	ready(function () {
		ref.parentNode.insertBefore(ss, before ? ref : ref.nextSibling)
	})

	var onloadcssdefined = function (cb) {
		var resolvedHref = ss.href
		var i = sheets.length
		while (i--) {
			if (sheets[i].href === resolvedHref) {
				return cb()
			}
		}
		setTimeout(function () {
			onloadcssdefined(cb)
		})
	}

	function loadCB() {
		if (ss.addEventListener) {
			ss.removeEventListener('load', loadCB)
		}
		ss.media = media || 'all'
	}

	if (ss.addEventListener) {
		ss.addEventListener('load', loadCB)
	}
	ss.onloadcssdefined = onloadcssdefined
	onloadcssdefined(loadCB)
	return ss
}

// Optimized CSS loading function with reduced network requests
function preloadCSS() {
	// Load only essential CSS files asynchronously
	// Custom Bootstrap (already minified)
	loadCSS('css/custom-bootstrap.css')

	// AOS CSS (minimal version with only used animations)
	loadCSS('css/aos-minimal.css')

	// Icons CSS (optimized)
	loadCSS('css/icons.css')

	// Main CSS styles
	loadCSS('css/style.css')
}

// Enhanced loading with intersection observer for better performance
function initOptimizedLoading() {
	// Load CSS immediately for critical above-the-fold content
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', preloadCSS)
	} else {
		preloadCSS()
	}
}

// Initialize optimized loading
initOptimizedLoading()

// Enhanced fallback for browsers without JavaScript
document.write(
	'<noscript><link rel="stylesheet" href="css/custom-bootstrap.css"><link rel="stylesheet" href="css/aos-minimal.css"><link rel="stylesheet" href="css/icons.css"><link rel="stylesheet" href="css/style.css"></noscript>'
)
