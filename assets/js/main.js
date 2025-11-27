/**
 * TEA - Teresa Alcázar Website JavaScript
 * Funcionalidades principales del sitio web
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showNextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    // Change slide every 4 seconds
    setInterval(showNextSlide, 5000);

    // Manejar scroll al cargar la página con hash (ej: desde especialidades.html#faq)
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offset = target.id === 'faq' ? 120 : 80;
                const offsetTop = target.offsetTop - offset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Usar offset mayor para la sección FAQ
                const offset = target.id === 'faq' ? 120 : 80;
                const offsetTop = target.offsetTop - offset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Progress Bar
    function updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Header Background on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Fade In Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Contact Form Animation
    const contactButtons = document.querySelectorAll('.contact-buttons .btn');
    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.style.opacity = '0.7';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + originalText;
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Testimonial cards hover effect
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
        });
    });

    // Create and add scroll-to-top button
    function createScrollToTopButton() {
        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopButton.setAttribute('id', 'scrollToTop');
        scrollToTopButton.setAttribute('aria-label', 'Volver arriba');
        
        // Styles for scroll to top button
        scrollToTopButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(163, 31, 55, 0.3);
        `;

        document.body.appendChild(scrollToTopButton);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopButton.style.opacity = '1';
                scrollToTopButton.style.visibility = 'visible';
            } else {
                scrollToTopButton.style.opacity = '0';
                scrollToTopButton.style.visibility = 'hidden';
            }
        });

        // Scroll to top functionality
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effects
        scrollToTopButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#8b1a2e';
        });

        scrollToTopButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#a31f37';
        });
    }

    // Initialize scroll to top button
    createScrollToTopButton();

    // Add parallax effect to hero section (optional)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Add typewriter effect to hero text (optional enhancement)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize page
    console.log('TEA Website loaded successfully');
	
	// ===================================
// CARRUSEL DE TESTIMONIOS - 3 en 3
// AÑADIR ESTE CÓDIGO JUSTO DESPUÉS DE LA LÍNEA 159
// (después de: console.log('TEA Website loaded successfully');)
// ===================================

// Inicializar carrusel de testimonios
function initTestimonialsCarousel() {
    const testimonialSlides = document.querySelectorAll('.testimonials-carousel .testimonial-slide');
    if (testimonialSlides.length === 0) return;
    
    const prevBtn = document.querySelector('.testimonials-carousel-wrapper .carousel-nav.prev');
    const nextBtn = document.querySelector('.testimonials-carousel-wrapper .carousel-nav.next');
    const dotsContainer = document.querySelector('.testimonials-carousel-wrapper + .carousel-dots');
    const carouselWrapper = document.querySelector('.testimonials-carousel-wrapper');
    
    let currentTestimonialSlide = 0;
    const totalTestimonialSlides = testimonialSlides.length;
    let testimonialAutoplayInterval;
    
    // Crear indicadores de puntos
    if (dotsContainer) {
        for (let i = 0; i < totalTestimonialSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonialSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    const dots = document.querySelectorAll('.carousel-dots .carousel-dot');
    
    function showTestimonialSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonialSlide = (n + totalTestimonialSlides) % totalTestimonialSlides;
        
        testimonialSlides[currentTestimonialSlide].classList.add('active');
        if (dots[currentTestimonialSlide]) {
            dots[currentTestimonialSlide].classList.add('active');
        }
    }
    
    function nextTestimonialSlide() {
        showTestimonialSlide(currentTestimonialSlide + 1);
    }
    
    function prevTestimonialSlide() {
        showTestimonialSlide(currentTestimonialSlide - 1);
    }
    
    function goToTestimonialSlide(n) {
        showTestimonialSlide(n);
        resetTestimonialAutoplay();
    }
    
    function startTestimonialAutoplay() {
        testimonialAutoplayInterval = setInterval(nextTestimonialSlide, 6000);
    }
    
    function stopTestimonialAutoplay() {
        clearInterval(testimonialAutoplayInterval);
    }
    
    function resetTestimonialAutoplay() {
        stopTestimonialAutoplay();
        startTestimonialAutoplay();
    }
    
    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonialSlide();
            resetTestimonialAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonialSlide();
            resetTestimonialAutoplay();
        });
    }
    
    // Pausar autoplay al pasar el ratón
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopTestimonialAutoplay);
        carouselWrapper.addEventListener('mouseleave', startTestimonialAutoplay);
    }
    
    // Navegación con teclado (solo cuando el carrusel está visible)
    let isCarouselInView = false;
    
    if (carouselWrapper) {
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isCarouselInView = entry.isIntersecting;
            });
        }, { threshold: 0.5 });
        
        carouselObserver.observe(carouselWrapper);
    }
    
    document.addEventListener('keydown', (e) => {
        if (isCarouselInView) {
            if (e.key === 'ArrowLeft') {
                prevTestimonialSlide();
                resetTestimonialAutoplay();
            }
            if (e.key === 'ArrowRight') {
                nextTestimonialSlide();
                resetTestimonialAutoplay();
            }
        }
    });
    
    // Gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleTestimonialSwipe();
        }, { passive: true });
    }
    
    function handleTestimonialSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextTestimonialSlide();
            resetTestimonialAutoplay();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevTestimonialSlide();
            resetTestimonialAutoplay();
        }
    }
    
    // Iniciar autoplay
    startTestimonialAutoplay();
    
    console.log('Carrusel de testimonios inicializado');
}

// Llamar a la función de inicialización
initTestimonialsCarousel();
    
    // Update scroll progress on load
    updateScrollProgress();

    // Preload critical images
    function preloadImages() {
        const criticalImages = [
            'assets/images/logo.png',
            'assets/images/screenshots/cuerpoMente.jpg',
            'assets/images/screenshots/cuerpoMente2.jpg',
            'assets/images/screenshots/cuerpoMente3.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages();

    // Add error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder or hide if image fails to load
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });

    // Add loading states for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only add loading state for external links
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('http')) {
                this.style.opacity = '0.8';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 1500);
            }
        });
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedScrollProgress = debounce(updateScrollProgress, 10);
    window.removeEventListener('scroll', updateScrollProgress);
    window.addEventListener('scroll', debouncedScrollProgress);

    // Forzar reproducción de video en móviles con múltiples estrategias
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Asegurar que el video está realmente silenciado
        heroVideo.muted = true;
        heroVideo.volume = 0;
        heroVideo.defaultMuted = true;

        // Función para forzar reproducción
        const forcePlay = () => {
            const playPromise = heroVideo.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Video reproduciéndose correctamente');
                    })
                    .catch(err => {
                        console.log('Autoplay bloqueado, intentando estrategias alternativas:', err);

                        // Estrategia 1: Reproducir al primer toque
                        const playOnInteraction = () => {
                            heroVideo.muted = true;
                            heroVideo.play().then(() => {
                                console.log('Video iniciado tras interacción');
                            }).catch(() => {
                                console.log('Falló reproducción tras interacción');
                            });
                        };

                        // Escuchar múltiples eventos de interacción
                        document.addEventListener('touchstart', playOnInteraction, { once: true, passive: true });
                        document.addEventListener('click', playOnInteraction, { once: true });
                        document.addEventListener('scroll', playOnInteraction, { once: true, passive: true });
                    });
            }
        };

        // Estrategia 2: Intentar reproducir inmediatamente
        forcePlay();

        // Estrategia 3: Intentar cuando el video cargue metadata
        heroVideo.addEventListener('loadedmetadata', forcePlay);

        // Estrategia 4: Intentar cuando el video pueda reproducirse
        heroVideo.addEventListener('canplay', forcePlay);

        // Estrategia 5: Usar IntersectionObserver para reproducir cuando sea visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (heroVideo.paused) {
                        forcePlay();
                    }
                } else {
                    // Pausar cuando no es visible (ahorro de batería)
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.25 });

        videoObserver.observe(heroVideo);

        // Estrategia 6: Manejar errores de carga
        heroVideo.addEventListener('error', function(e) {
            console.error('Error al cargar video:', e);
            // Ocultar video y mostrar solo el fondo de color
            heroVideo.style.display = 'none';
        });

        // Estrategia 7: Detectar si el video realmente se está reproduciendo
        let checkInterval = setInterval(() => {
            if (heroVideo.currentTime > 0 && !heroVideo.paused && !heroVideo.ended && heroVideo.readyState > 2) {
                console.log('Video confirmado reproduciéndose');
                clearInterval(checkInterval);
            }
        }, 1000);

        // Limpiar interval después de 10 segundos
        setTimeout(() => clearInterval(checkInterval), 10000);
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Add focus management for accessibility
    document.querySelectorAll('.nav-menu a, .btn').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #a31f37';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    let isScrollLocked = false;

    // Función para bloquear el scroll
    const lockScroll = () => {
        isScrollLocked = true;
        document.documentElement.style.scrollBehavior = 'auto';
    };

    // Función para desbloquear el scroll
    const unlockScroll = () => {
        setTimeout(() => {
            isScrollLocked = false;
            document.documentElement.style.scrollBehavior = 'smooth';
        }, 500);
    };

    // Prevenir scroll automático durante la interacción con FAQ
    const preventAutoScroll = (e) => {
        if (isScrollLocked) {
            e.preventDefault();
            return false;
        }
    };

    faqQuestions.forEach(question => {
        question.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Bloquear el scroll
            lockScroll();

            // Obtener posición de la pregunta clickeada ANTES de cambiar el DOM
            const questionRect = question.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const questionTop = questionRect.top + scrollTop;
            const headerOffset = 100;
            const targetScroll = questionTop - headerOffset;

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
            }

            // Usar múltiples frames para asegurar que el scroll se mantiene
            requestAnimationFrame(() => {
                window.scrollTo(0, targetScroll);

                requestAnimationFrame(() => {
                    window.scrollTo(0, targetScroll);

                    // Tercera verificación después de que termine la animación CSS
                    setTimeout(() => {
                        window.scrollTo(0, targetScroll);
                        unlockScroll();
                    }, 450);
                });
            });
        });
    });

    // Prevenir scroll automático del navegador
    window.addEventListener('scroll', preventAutoScroll, { passive: false });

    console.log('FAQ Accordion initialized');
});

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("preferences-modal");

  const saved = localStorage.getItem("cookieConsent");
  if (!saved) banner.classList.remove("hidden");

  window.acceptAllCookies = function () {
    localStorage.setItem("cookieConsent", JSON.stringify({
      analytics: true,
      marketing: true
    }));
    banner.classList.add("hidden");
  };

  window.rejectAllCookies = function () {
    localStorage.setItem("cookieConsent", JSON.stringify({
      analytics: false,
      marketing: false
    }));
    banner.classList.add("hidden");
  };

  window.showPreferences = function () {
    modal.classList.remove("hidden");
  };

  window.closePreferences = function () {
    modal.classList.add("hidden");
  };

  window.savePreferences = function () {
    const analytics = document.getElementById("analytics-cookies").checked;
    const marketing = document.getElementById("marketing-cookies").checked;
    localStorage.setItem("cookieConsent", JSON.stringify({
      analytics,
      marketing
    }));
    modal.classList.add("hidden");
    banner.classList.add("hidden");
  };
});


// JavaScript Document
