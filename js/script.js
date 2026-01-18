document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Sticky Header
    const header = document.querySelector('header');
    
    function toggleStickyHeader() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
       window.addEventListener('scroll', toggleStickyHeader);
    
       // Get lightbox elements
       const lightbox = document.getElementById('lightbox');
       const lightboxMediaContainer = document.querySelector('.lightbox-media-container');
       const lightboxCaption = document.querySelector('.lightbox-caption');
       const closeLightbox = document.querySelector('.close-lightbox');
    
       // Get all gallery items
       const galleryItems = document.querySelectorAll('.galerie-item');
    
       // Add click event to each gallery item
       galleryItems.forEach(item => {
           item.addEventListener('click', function() {
               const imageSrc = this.getAttribute('data-src');
               const caption = this.querySelector('.galerie-info h3').textContent;
            
               // Clear previous content
               lightboxMediaContainer.innerHTML = '';
            
               // Create and add image
               const img = document.createElement('img');
               img.src = imageSrc;
               img.alt = caption;
               lightboxMediaContainer.appendChild(img);
            
               // Set caption
               lightboxCaption.textContent = caption;
            
               // Show lightbox
               lightbox.style.display = 'block';
           });
       });
    
       // Close lightbox when clicking the close button
       closeLightbox.addEventListener('click', function() {
           lightbox.style.display = 'none';
       });
    
       // Close lightbox when clicking outside the content
       lightbox.addEventListener('click', function(e) {
           if (e.target === lightbox) {
               lightbox.style.display = 'none';
           }
       });
    
       // Close lightbox with Escape key
       document.addEventListener('keydown', function(e) {
           if (e.key === 'Escape' && lightbox.style.display === 'block') {
               lightbox.style.display = 'none';
           }
       });
    toggleStickyHeader();
    
    console.log('Looking for elements...');
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Închide meniul la click pe link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    toggleBackToTopButton();
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    let hasAnimated = false;
    
    function startCounterAnimation() {
        if (hasAnimated) return;
        
        const counterSection = document.querySelector('.counter-section');
        const sectionPosition = counterSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            hasAnimated = true;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
            });
        }
    }
    
    window.addEventListener('scroll', startCounterAnimation);
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('nav ul li a[href="#' + sectionId + '"]').classList.add('active');
            } else {
                document.querySelector('nav ul li a[href="#' + sectionId + '"]').classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Simple Slider for Testimonials
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalSlides = testimonials.length;
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        updateDots();
    }
    
    const dots = document.querySelectorAll('.dot');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            updateDots();
        });
    });

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Initialize slider if there are testimonials
    if (testimonials.length > 1) {
        // Show first slide initially
        showSlide(0);
        
        const prevButton = document.querySelector('.prev-testimonial');
        const nextButton = document.querySelector('.next-testimonial');

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 3);
       
    }});
