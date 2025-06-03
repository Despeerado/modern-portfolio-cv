/*
 * Custom JavaScript for Online Resume/Portfolio
 * Author: Your Name
 * Date: June 3, 2025
 * Refactored: Modular structure with separated functions
 */

/**
 * Bootstrap Color Mode Management
 * Handles theme switching functionality
 */
const ThemeManager = (() => {
	'use strict'

	// Private methods
	const getStoredTheme = () => localStorage.getItem('theme')
	const setStoredTheme = (theme) => localStorage.setItem('theme', theme)

	const getPreferredTheme = () => {
		const storedTheme = getStoredTheme()
		if (storedTheme) {
			return storedTheme
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}

	const setTheme = (theme) => {
		if (theme === 'auto') {
			const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			document.documentElement.setAttribute('data-bs-theme', preferredTheme)
		} else {
			document.documentElement.setAttribute('data-bs-theme', theme)
		}
	}

	const showActiveTheme = (theme) => {
		document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
			element.classList.remove('active')
			element.setAttribute('aria-pressed', 'false')
		})

		const activeBtn = document.querySelector(`[data-bs-theme-value="${theme}"]`)
		if (activeBtn) {
			activeBtn.classList.add('active')
			activeBtn.setAttribute('aria-pressed', 'true')
		}
	}

	const attachEventListeners = () => {
		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			const storedTheme = getStoredTheme()
			if (storedTheme !== 'light' && storedTheme !== 'dark') {
				setTheme(getPreferredTheme())
			}
		})

		// Add click listeners to theme buttons
		document.querySelectorAll('[data-bs-theme-value]').forEach((toggle) => {
			toggle.addEventListener('click', () => {
				const theme = toggle.getAttribute('data-bs-theme-value')
				setStoredTheme(theme)
				setTheme(theme)
				showActiveTheme(theme)
			})
		})
	}

	// Public interface
	return {
		init() {
			setTheme(getPreferredTheme())
			showActiveTheme(getPreferredTheme())
			attachEventListeners()
		},
	}
})()

/**
 * AOS (Animate On Scroll) Manager
 * Handles scroll animations with device optimization
 */
const AnimationManager = (() => {
	const optimizeAnimationsForDevice = () => {
		const isMobile = window.innerWidth <= 768
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

		// On mobile or touch devices, replace problematic horizontal animations
		if (isMobile || isTouch) {
			document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"]').forEach((element) => {
				element.setAttribute('data-aos', 'fade-up')
			})
		}

		return { isMobile, isTouch }
	}

	const initializeAOS = () => {
		const { isMobile } = optimizeAnimationsForDevice()

		AOS.init({
			duration: isMobile ? 600 : 800,
			easing: 'ease-in-out',
			once: true,
			disable: false,
			offset: isMobile ? 30 : 50,
			anchorPlacement: 'top-bottom',
		})
	}

	const attachResizeListener = () => {
		let resizeTimeout
		window.addEventListener('resize', function () {
			clearTimeout(resizeTimeout)
			resizeTimeout = setTimeout(function () {
				AOS.refresh()
				initializeAOS()
			}, 250)
		})
	}

	return {
		init() {
			initializeAOS()
			attachResizeListener()
		},
	}
})()

/**
 * Navigation Manager
 * Handles navbar behavior and smooth scrolling
 */
const NavigationManager = (() => {
	const setupNavbarShrink = () => {
		const navbarShrink = function () {
			const navbarCollapsible = document.getElementById('mainNav')
			if (!navbarCollapsible) return

			if (window.scrollY === 0) {
				navbarCollapsible.classList.remove('navbar-shrink')
			} else {
				navbarCollapsible.classList.add('navbar-shrink')
			}
		}

		// Attach scroll listener
		document.addEventListener('scroll', navbarShrink)
		// Initial call
		navbarShrink()
	}

	const setupSmoothScrolling = () => {
		document.querySelectorAll('a.navbar__link, a.btn-hire-me, a.back-to-top').forEach((link) => {
			link.addEventListener('click', function (e) {
				if (this.hash !== '') {
					e.preventDefault()
					const hash = this.hash

					// Using scrollIntoView with smooth behavior
					document.querySelector(hash).scrollIntoView({
						behavior: 'smooth',
					})

					// Update URL with hash after scrolling
					setTimeout(() => {
						window.location.hash = hash
					}, 800)
				}
			})
		})
	}

	const setupActiveNavLinks = () => {
		const sections = document.querySelectorAll('section')
		const navLinks = document.querySelectorAll('.nav-link')

		window.addEventListener('scroll', () => {
			let current = ''

			sections.forEach((section) => {
				const sectionTop = section.offsetTop
				const sectionHeight = section.clientHeight

				if (window.scrollY >= sectionTop - 200) {
					current = section.getAttribute('id')
				}
			})

			navLinks.forEach((link) => {
				link.classList.remove('active')
				if (link.getAttribute('href') === `#${current}`) {
					link.classList.add('active')
				}
			})
		})
	}

	const setupMobileMenuClose = () => {
		const navbarToggler = document.querySelector('.navbar-toggler')
		const navbarMenu = document.querySelector('.navbar-collapse')

		document.querySelectorAll('.nav-link').forEach((link) => {
			link.addEventListener('click', () => {
				if (navbarMenu && navbarMenu.classList.contains('show')) {
					navbarToggler?.click()
				}
			})
		})
	}

	return {
		init() {
			setupNavbarShrink()
			setupSmoothScrolling()
			setupActiveNavLinks()
			setupMobileMenuClose()
		},
	}
})()

/**
 * UI Components Manager
 * Handles back to top button and counter animations
 */
const UIComponentsManager = (() => {
	const setupBackToTopButton = () => {
		const backToTopButton = document.getElementById('backToTop')
		if (!backToTopButton) return

		const handleScroll = () => {
			if (window.scrollY > 300) {
				backToTopButton.classList.add('show')
				backToTopButton.classList.remove('d-none')
			} else {
				backToTopButton.classList.remove('show')
				backToTopButton.classList.add('d-none')
			}
		}

		const handleClick = (e) => {
			e.preventDefault()
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}

		window.addEventListener('scroll', handleScroll)
		backToTopButton.addEventListener('click', handleClick)
	}

	const setupCounterAnimation = () => {
		const counters = document.querySelectorAll('.counter')
		let hasRun = false

		const runCounters = () => {
			if (hasRun) return

			const counterSection = document.getElementById('about')
			if (!counterSection) return

			const sectionPos = counterSection.getBoundingClientRect().top
			const screenPos = window.innerHeight / 1.3

			if (sectionPos < screenPos) {
				counters.forEach((counter) => {
					const target = +counter.textContent
					let count = 0
					const duration = 2000 // 2 seconds
					const increment = Math.ceil(target / (duration / 20)) // Update every 20ms

					const updateCount = () => {
						if (count < target) {
							count += increment
							if (count > target) count = target
							counter.textContent = count
							setTimeout(updateCount, 20)
						}
					}

					updateCount()
				})

				hasRun = true
			}
		}

		window.addEventListener('scroll', runCounters)
		window.addEventListener('load', runCounters)
	}

	return {
		init() {
			setupBackToTopButton()
			setupCounterAnimation()
		},
	}
})()

/**
 * Form Manager
 * Handles contact form validation and submission
 */
const FormManager = (() => {
	const isValidEmail = (email) => {
		const regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regex.test(String(email).toLowerCase())
	}

	const showAlert = (message, type, form) => {
		const alertDiv = document.createElement('div')
		alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`
		alertDiv.innerHTML = `
			${message}
			<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
		`

		// Insert alert after form
		form.parentNode.insertBefore(alertDiv, form.nextSibling)

		// Auto remove after 5 seconds
		setTimeout(() => {
			if (alertDiv.parentNode) {
				alertDiv.remove()
			}
		}, 5000)
	}

	const handleFormSubmission = (form, formControls) => {
		const submitBtn = form.querySelector('button[type="submit"]')
		const originalHTML = submitBtn.innerHTML

		// Show loading state
		submitBtn.disabled = true
		submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Odesílání...'

		// Simulate form submission (replace with actual submission logic)
		setTimeout(() => {
			// Show success state
			submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Odesláno!'
			submitBtn.classList.remove('btn-primary')
			submitBtn.classList.add('btn-success')

			// Show success message
			showAlert('Zpráva byla úspěšně odeslána! Odpovím vám co nejdříve.', 'success', form)

			// Reset form
			form.reset()
			form.classList.remove('was-validated')
			formControls.forEach((input) => {
				input.classList.remove('is-valid', 'is-invalid')
			})

			// Reset button after 3 seconds
			setTimeout(() => {
				submitBtn.innerHTML = originalHTML
				submitBtn.classList.remove('btn-success')
				submitBtn.classList.add('btn-primary')
				submitBtn.disabled = false
			}, 3000)
		}, 1500)
	}

	const setupFormValidation = (form) => {
		const formControls = form.querySelectorAll('.form-control')

		// Bootstrap 5 form validation
		form.addEventListener('submit', function (event) {
			if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			} else {
				// Form is valid, handle submission
				event.preventDefault()
				handleFormSubmission(form, formControls)
			}

			form.classList.add('was-validated')
		})

		// Real-time validation feedback
		formControls.forEach((input) => {
			input.addEventListener('input', function () {
				if (this.checkValidity()) {
					this.classList.remove('is-invalid')
					this.classList.add('is-valid')
				} else {
					this.classList.remove('is-valid')
					this.classList.add('is-invalid')
				}
			})
		})

		// Reset form validation on reset
		form.addEventListener('reset', function () {
			this.classList.remove('was-validated')
			formControls.forEach((input) => {
				input.classList.remove('is-valid', 'is-invalid')
			})
		})
	}

	return {
		init() {
			const contactForm = document.getElementById('contactForm')
			if (contactForm) {
				setupFormValidation(contactForm)
			}
		},
	}
})()

/**
 * Legacy Dark Mode Manager (Deprecated - keeping for compatibility)
 * This will be removed in favor of Bootstrap Color Mode
 */
const LegacyDarkModeManager = (() => {
	const createDarkModeToggle = () => {
		const darkModeToggle = document.createElement('div')
		darkModeToggle.className = 'dark-mode-toggle'
		darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
		document.body.appendChild(darkModeToggle)
		return darkModeToggle
	}

	const setupLegacyThemeToggle = () => {
		const themeToggle = document.getElementById('theme-toggle')
		const themeIcon = document.getElementById('theme-icon')
		const htmlElement = document.documentElement

		if (!themeToggle || !themeIcon) return

		// Get stored theme or default to 'light'
		const getStoredTheme = () => localStorage.getItem('theme')
		const getPreferredTheme = () => {
			const storedTheme = getStoredTheme()
			if (storedTheme) {
				return storedTheme
			}
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		}

		// Set theme function
		const setTheme = (theme) => {
			htmlElement.setAttribute('data-bs-theme', theme)
			localStorage.setItem('theme', theme)

			// Update icon
			if (theme === 'dark') {
				themeIcon.className = 'fas fa-sun'
				themeToggle.setAttribute('title', 'Přepnout na světlé téma')
			} else {
				themeIcon.className = 'fas fa-moon'
				themeToggle.setAttribute('title', 'Přepnout na tmavé téma')
			}
		}

		// Initialize theme
		setTheme(getPreferredTheme())

		// Theme toggle event listener
		themeToggle.addEventListener('click', () => {
			const currentTheme = htmlElement.getAttribute('data-bs-theme')
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
			setTheme(newTheme)
		})

		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			const storedTheme = getStoredTheme()
			if (!storedTheme) {
				setTheme(getPreferredTheme())
			}
		})
	}

	return {
		init() {
			// Create legacy dark mode toggle (if needed)
			const darkModeToggle = createDarkModeToggle()

			// Check if user previously set dark mode
			const isDarkMode = localStorage.getItem('darkMode') === 'true'

			// Set initial state
			if (isDarkMode) {
				document.body.classList.add('dark-mode')
				darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
			}

			// Toggle dark mode on click
			darkModeToggle.addEventListener('click', () => {
				document.body.classList.toggle('dark-mode')

				const isDarkModeNow = document.body.classList.contains('dark-mode')
				localStorage.setItem('darkMode', isDarkModeNow)

				// Change icon
				if (isDarkModeNow) {
					darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
				} else {
					darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
				}
			})

			// Setup legacy theme toggle
			setupLegacyThemeToggle()
		},
	}
})()

/**
 * Main Application Controller
 * Orchestrates all managers and initializes the application
 */
const App = (() => {
	return {
		init() {
			// Initialize all managers
			ThemeManager.init()
			AnimationManager.init()
			NavigationManager.init()
			UIComponentsManager.init()
			FormManager.init()
			LegacyDarkModeManager.init()
		},
	}
})()

// Wait for the DOM to be fully loaded and initialize the application
document.addEventListener('DOMContentLoaded', function () {
	App.init()
})
