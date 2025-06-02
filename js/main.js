/*
 * Custom JavaScript for Online Resume/Portfolio
 * Author: Your Name
 * Date: June 2, 2025
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
	// Initialize AOS (Animate On Scroll)
	// Function to handle AOS animations based on device type
	function initializeAOS() {
		const isMobile = window.innerWidth <= 768
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

		// On mobile or touch devices, replace problematic horizontal animations
		if (isMobile || isTouch) {
			document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"]').forEach((element) => {
				element.setAttribute('data-aos', 'fade-up')
			})
		}

		AOS.init({
			duration: isMobile ? 600 : 800,
			easing: 'ease-in-out',
			once: true,
			disable: false,
			offset: isMobile ? 30 : 50,
			anchorPlacement: 'top-bottom',
		})
	}

	// Initialize AOS
	initializeAOS()

	// Reinitialize AOS on window resize to handle orientation changes
	let resizeTimeout
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimeout)
		resizeTimeout = setTimeout(function () {
			AOS.refresh()
			initializeAOS()
		}, 250)
	})

	// Navbar shrink effect on scroll
	const navbarShrink = function () {
		const navbarCollapsible = document.getElementById('mainNav')
		if (!navbarCollapsible) {
			return
		}
		if (window.scrollY === 0) {
			navbarCollapsible.classList.remove('navbar-shrink')
		} else {
			navbarCollapsible.classList.add('navbar-shrink')
		}
	}

	// Shrink the navbar when page is scrolled
	document.addEventListener('scroll', navbarShrink)

	// Shrink the navbar when page is loaded
	navbarShrink()

	// Smooth scrolling for all anchor links
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

	// Back to top button
	const backToTopButton = document.getElementById('backToTop')

	if (backToTopButton) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 300) {
				backToTopButton.classList.add('show')
				backToTopButton.classList.remove('d-none')
			} else {
				backToTopButton.classList.remove('show')
				backToTopButton.classList.add('d-none')
			}
		})

		// Smooth scroll to top
		backToTopButton.addEventListener('click', (e) => {
			e.preventDefault()
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		})
	}

	// Dark mode toggle
	// Create dark mode toggle button
	const darkModeToggle = document.createElement('div')
	darkModeToggle.className = 'dark-mode-toggle'
	darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
	document.body.appendChild(darkModeToggle)

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

	// Validate and handle form submission
	const contactForm = document.getElementById('contactForm')
	if (contactForm) {
		// Bootstrap 5 form validation
		contactForm.addEventListener('submit', function (event) {
			if (!contactForm.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			} else {
				// Form is valid, handle submission
				event.preventDefault()
				handleFormSubmission()
			}

			contactForm.classList.add('was-validated')
		})

		// Real-time validation feedback
		const formControls = contactForm.querySelectorAll('.form-control')
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
		contactForm.addEventListener('reset', function () {
			this.classList.remove('was-validated')
			formControls.forEach((input) => {
				input.classList.remove('is-valid', 'is-invalid')
			})
		})

		// Handle form submission
		function handleFormSubmission() {
			const submitBtn = contactForm.querySelector('button[type="submit"]')
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
				showAlert('Zpráva byla úspěšně odeslána! Odpovím vám co nejdříve.', 'success')

				// Reset form
				contactForm.reset()
				contactForm.classList.remove('was-validated')
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

		// Show alert function
		function showAlert(message, type) {
			const alertDiv = document.createElement('div')
			alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`
			alertDiv.innerHTML = `
				${message}
				<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
			`

			// Insert alert after form
			contactForm.parentNode.insertBefore(alertDiv, contactForm.nextSibling)

			// Auto remove after 5 seconds
			setTimeout(() => {
				if (alertDiv.parentNode) {
					alertDiv.remove()
				}
			}, 5000)
		}
	}

	// Email validation helper function
	function isValidEmail(email) {
		const regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regex.test(String(email).toLowerCase())
	}

	// Add active class to navbar items on scroll
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

	// Mobile menu close on click
	const navbarToggler = document.querySelector('.navbar-toggler')
	const navbarMenu = document.querySelector('.navbar-collapse')

	document.querySelectorAll('.nav-link').forEach((link) => {
		link.addEventListener('click', () => {
			if (navbarMenu.classList.contains('show')) {
				navbarToggler.click()
			}
		})
	})

	// Counter animation on scroll
	const counters = document.querySelectorAll('.counter')
	let hasRun = false

	function runCounters() {
		if (hasRun) return

		const counterSection = document.getElementById('about')
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
})
