document.addEventListener('DOMContentLoaded', () => {
	// Mobile Navigation
	const menuBtn = document.querySelector('.menu-btn, .mobile-menu-btn');
	const navLinks = document.querySelector('.nav-links');

	if (menuBtn && navLinks) {
		// Toggle menu
		menuBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			navLinks.classList.toggle('active');
			const icon = menuBtn.querySelector('i');
			icon.classList.toggle('fa-bars');
			icon.classList.toggle('fa-times');
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
				navLinks.classList.remove('active');
				const icon = menuBtn.querySelector('i');
				if (icon) {
					icon.classList.add('fa-bars');
					icon.classList.remove('fa-times');
				}
			}
		});

		// Close menu when clicking a link
		navLinks.querySelectorAll('a, button').forEach(item => {
			item.addEventListener('click', () => {
				navLinks.classList.remove('active');
				const icon = menuBtn.querySelector('i');
				if (icon) {
					icon.classList.add('fa-bars');
					icon.classList.remove('fa-times');
				}
			});
		});
	}

	// Scroll Spy for Navigation
	const sections = document.querySelectorAll('section[id]');
	const navItems = document.querySelectorAll('.nav-link');

	function updateActiveSection() {
		const scrollPosition = window.scrollY + 100; // Offset for better accuracy

		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute('id');

			if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
				navItems.forEach(item => {
					item.classList.remove('active');
					if (item.getAttribute('href') === `#${sectionId}`) {
						item.classList.add('active');
					}
				});
			}
		});

		// Special case for home section when at the very top
		if (scrollPosition < sections[0].offsetTop + 100) {
			navItems.forEach(item => {
				item.classList.remove('active');
				if (item.getAttribute('href') === '#home') {
					item.classList.add('active');
				}
			});
		}
	}

	// Update active section on scroll
	window.addEventListener('scroll', updateActiveSection);
	// Update active section on page load
	updateActiveSection();

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Authentication check for prototype page
	if (window.location.pathname.includes('prototype.html')) {
		if (!localStorage.getItem('isLoggedIn') && !sessionStorage.getItem('isLoggedIn')) {
			window.location.href = 'login.html';
		}
	}
});