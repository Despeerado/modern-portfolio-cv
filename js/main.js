/*
 * Custom JavaScript for Online Resume/Portfolio
 * Author: Your Name
 * Date: June 2, 2025
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
	// Initialize AOS (Animate On Scroll)
	AOS.init({
		duration: 800,
		easing: 'ease-in-out',
		once: true,
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
	document.querySelectorAll('a.nav-link, a.btn-hire-me, a.back-to-top').forEach((link) => {
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

	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			backToTopButton.classList.add('active')
		} else {
			backToTopButton.classList.remove('active')
		}
	})

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
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault()

			// Basic validation
			let isValid = true
			const name = document.getElementById('name')
			const email = document.getElementById('email')
			const subject = document.getElementById('subject')
			const message = document.getElementById('message')

			if (name.value.trim() === '') {
				isValid = false
				name.classList.add('is-invalid')
			} else {
				name.classList.remove('is-invalid')
			}

			if (email.value.trim() === '' || !isValidEmail(email.value)) {
				isValid = false
				email.classList.add('is-invalid')
			} else {
				email.classList.remove('is-invalid')
			}

			if (subject.value.trim() === '') {
				isValid = false
				subject.classList.add('is-invalid')
			} else {
				subject.classList.remove('is-invalid')
			}

			if (message.value.trim() === '') {
				isValid = false
				message.classList.add('is-invalid')
			} else {
				message.classList.remove('is-invalid')
			}

			if (isValid) {
				// If using Formspree, the form will handle submission
				// If not, show success message
				const submitBtn = contactForm.querySelector('button[type="submit"]')
				const originalText = submitBtn.textContent

				submitBtn.disabled = true
				submitBtn.textContent = 'Odesílání...'

				// Simulate form submission (remove this in production)
				setTimeout(() => {
					submitBtn.textContent = 'Odesláno!'
					contactForm.reset()

					// Reset button after 3 seconds
					setTimeout(() => {
						submitBtn.textContent = originalText
						submitBtn.disabled = false
					}, 3000)
				}, 1500)
			}
		})

		// Form validation
		contactForm.addEventListener('submit', function (e) {
			if (!this.checkValidity()) {
				e.preventDefault()
				e.stopPropagation()
			}

			this.classList.add('was-validated')

			// Custom validation feedback
			const inputs = this.querySelectorAll('.form__control')
			inputs.forEach((input) => {
				if (!input.validity.valid) {
					input.classList.add('is-invalid')
				} else {
					input.classList.add('is-valid')
				}

				// Update on input change
				input.addEventListener('input', function () {
					if (this.validity.valid) {
						this.classList.remove('is-invalid')
						this.classList.add('is-valid')
					} else {
						this.classList.remove('is-valid')
						this.classList.add('is-invalid')
					}
				})
			})
		})

		// Reset form validation state on reset
		contactForm.addEventListener('reset', function () {
			this.classList.remove('was-validated')
			const inputs = this.querySelectorAll('.form__control')
			inputs.forEach((input) => {
				input.classList.remove('is-valid', 'is-invalid')
			})
		})
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
