// script.js - JavaScript para funcionalidades del sitio

// ===== MENÚ MÓVIL =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // ===== MODAL GALLERY =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.modal');
    const modalSlides = document.querySelectorAll('.modal-slide');
    const modalImages = document.querySelectorAll('.modal-image');
    const modalCaptions = document.querySelectorAll('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalThumbs = document.querySelectorAll('.modal-thumb');
    
    let currentSlide = 0;

    // Abrir modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Navegación
    modalPrev.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + modalSlides.length) % modalSlides.length;
        showSlide(currentSlide);
    });

    modalNext.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % modalSlides.length;
        showSlide(currentSlide);
    });

    // Thumbnails
    modalThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + modalSlides.length) % modalSlides.length;
                showSlide(currentSlide);
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % modalSlides.length;
                showSlide(currentSlide);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    function showSlide(n) {
        modalSlides.forEach(slide => slide.classList.remove('active'));
        modalThumbs.forEach(thumb => thumb.classList.remove('active'));
        
        modalSlides[n].classList.add('active');
        modalThumbs[n].classList.add('active');
    }

    // ===== ACORDEÓN FAQ =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Cerrar otros acordeones
            document.querySelectorAll('.accordion-content').forEach(content => {
                if (content !== accordionContent && content.classList.contains('active')) {
                    content.classList.remove('active');
                    content.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle actual
            accordionContent.classList.toggle('active');
            
            if (accordionContent.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // ===== VIDEO YOUTUBE =====
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        const playButton = placeholder.querySelector('.play-button');
        const thumbnail = placeholder.querySelector('.thumbnail');
        
        playButton.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const iframe = document.createElement('iframe');
            
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'autoplay; encrypted-media');
            iframe.setAttribute('allowfullscreen', '');
            
            placeholder.innerHTML = '';
            placeholder.appendChild(iframe);
            placeholder.classList.add('loaded');
        });
    });

    // ===== SCROLL SUAVE =====
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== FORMULARIO CONTACTO =====
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const nombre = this.querySelector('input[name="nombre"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const telefono = this.querySelector('input[name="telefono"]').value;
            const mensaje = this.querySelector('textarea[name="mensaje"]').value;
            
            if (!nombre || !email || !telefono || !mensaje) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Aquí iría la lógica para enviar el formulario
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        });
    }
});

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .step, .media-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}
