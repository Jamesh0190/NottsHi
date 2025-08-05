document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Tab switching for booking section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const bookingForms = document.querySelectorAll('.booking-form');
    
    if (tabBtns.length > 0 && bookingForms.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and forms
                tabBtns.forEach(b => b.classList.remove('active'));
                bookingForms.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked button and corresponding form
                this.classList.add('active');
                const targetForm = document.getElementById(tabId);
                if (targetForm) {
                    targetForm.classList.add('active');
                }
            });
        });
    }
    
    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-control.prev');
    const nextBtn = document.querySelector('.testimonial-control.next');
    
    if (testimonialCards.length > 0 && prevBtn && nextBtn) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            if (testimonialCards[index]) {
                testimonialCards[index].classList.add('active');
            }
        }
        
        prevBtn.addEventListener('click', function() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonialCards.length - 1;
            }
            showTestimonial(currentTestimonial);
        });
        
        nextBtn.addEventListener('click', function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonialCards.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });
        
        // Auto-rotate testimonials
        setInterval(function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonialCards.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Modal functionality
    const modal = document.getElementById('booking-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
    
    function openModal() {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Form submissions
    const vehicleBookingForm = document.getElementById('vehicle-booking-form');
    const venueBookingForm = document.getElementById('venue-booking-form');
    const contactForm = document.getElementById('contact-form');
    
    if (vehicleBookingForm) {
        vehicleBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            openModal();
            this.reset();
        });
    }
    
    if (venueBookingForm) {
        venueBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            openModal();
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            openModal();
            this.reset();
        });
    }
    
    // Book vehicle buttons
    const bookVehicleBtns = document.querySelectorAll('.book-vehicle');
    
    if (bookVehicleBtns.length > 0) {
        bookVehicleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const vehicleType = this.getAttribute('data-vehicle');
                const vehicleTypeSelect = document.getElementById('vehicle-type');
                if (vehicleTypeSelect) {
                    vehicleTypeSelect.value = vehicleType.toLowerCase().replace(' ', '-');
                }
                
                // Switch to vehicle booking tab
                const vehicleTabBtn = document.querySelector('.tab-btn[data-tab="vehicle-booking"]');
                if (vehicleTabBtn) {
                    vehicleTabBtn.click();
                }
                
                // Scroll to booking section
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Book venue buttons
    const bookVenueBtns = document.querySelectorAll('.book-venue');
    
    if (bookVenueBtns.length > 0) {
        bookVenueBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Switch to venue booking tab
                const venueTabBtn = document.querySelector('.tab-btn[data-tab="venue-booking"]');
                if (venueTabBtn) {
                    venueTabBtn.click();
                }
                
                // Scroll to booking section
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                
                // Scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set minimum date to today for date inputs
    const today = new Date().toISOString().split('T')[0];
    const pickupDateInput = document.getElementById('pickup-date');
    const eventDateInput = document.getElementById('event-date');
    
    if (pickupDateInput) {
        pickupDateInput.setAttribute('min', today);
    }
    
    if (eventDateInput) {
        eventDateInput.setAttribute('min', today);
    }
    
    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});