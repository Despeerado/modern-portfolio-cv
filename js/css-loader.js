// CSS Loading Performance Optimization
// Defer non-critical CSS loading
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

// Preload non-critical CSS
function preloadCSS() {
	// Bootstrap CSS
	loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css')

	// AOS CSS
	loadCSS('https://unpkg.com/aos@2.3.1/dist/aos.css')

	// Main CSS (defer after critical)
	loadCSS('css/style.css')
}

// Load CSS after critical content is rendered
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', preloadCSS)
} else {
	preloadCSS()
}

// Fallback for browsers without JavaScript
document.write(
	'<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"><link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css"><link rel="stylesheet" href="css/style.css"></noscript>'
)
