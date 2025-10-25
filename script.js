// script.js - JavaScript completo para funcionalidades del sitio

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cargado correctamente');
    
    // ===== MENÚ MÓVIL CORREGIDO =====
const mobileMenuBtn = document.getElementById('mobile-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}
    
    // ===== MODAL GALLERY =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.modal');
    const modalSlides = document.querySelectorAll('.modal-slide');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalThumbs = document.querySelectorAll('.modal-thumb');
    
    let currentSlide = 0;

    if (galleryItems.length > 0 && modal) {
        console.log('Inicializando galería modal');

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

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Navegación
        if (modalPrev) {
            modalPrev.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + modalSlides.length) % modalSlides.length;
                showSlide(currentSlide);
            });
        }

        if (modalNext) {
            modalNext.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % modalSlides.length;
                showSlide(currentSlide);
            });
        }

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
            
            if (modalSlides[n]) {
                modalSlides[n].classList.add('active');
            }
            if (modalThumbs[n]) {
                modalThumbs[n].classList.add('active');
            }
        }
    }

    // ===== ACORDEÓN FAQ =====
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Cerrar todos
            document.querySelectorAll('.accordion-content').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.style.maxHeight = null;
                    otherContent.classList.remove('active');
                    otherContent.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Abrir/cerrar este
            if (content.classList.contains('active')) {
                content.style.maxHeight = null;
                content.classList.remove('active');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // ===== VIDEOS YOUTUBE =====
    document.querySelectorAll('.video-card').forEach(card => {
        const thumbnail = card.querySelector('.media-thumbnail');
        const videoId = thumbnail.getAttribute('data-video-id');
        const videoThumbnail = thumbnail.querySelector('.video-thumbnail');
        const playButton = thumbnail.querySelector('.video-play-button');
        const videoPlayer = thumbnail.querySelector('.video-player');
        
        // Establecer miniatura del video
        if (videoThumbnail && videoId) {
            videoThumbnail.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`;
        }
        
        // Reproducir video al hacer clic
        if (playButton) {
            playButton.addEventListener('click', function() {
                if (videoPlayer && videoId) {
                    videoPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                    thumbnail.classList.add('video-loaded');
                }
            });
        }
    });

    // ===== ANIMACIONES SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.service-card, .testimonial-card, .step, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Animación para las tarjetas de precios
    document.querySelectorAll('.pricing .location-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animación para la sección de características del hero
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1500 + (index * 100));
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

    console.log('Todas las funcionalidades inicializadas correctamente');
});

// ===== GOOGLE REVIEWS FUNCTIONS =====
function openGoogleReviews() {
    const modal = document.getElementById('googleReviewsModal');
    console.log("Abriendo modal de reseñas...");
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        loadGoogleReviews();
    } else {
        console.error("Modal no encontrado");
    }
}

function closeGoogleReviews() {
    const modal = document.getElementById('googleReviewsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function loadGoogleReviews() {
    const container = document.getElementById('reviewsContainer');
    console.log("✅ Cargando reseñas...");
    
    if (container) {
        // MOSTRAR INMEDIATAMENTE - SIN TIMEOUT
        container.innerHTML = `
            <div class="review-item-modal">
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>María González</h4>
                        <div class="review-date">Hace 2 semanas</div>
                    </div>
                    <div class="review-stars">⭐⭐⭐⭐⭐</div>
                </div>
                <p class="review-text">"Increíble servicio. Vaciamos el piso de mi madre en un día y lo dejaron impecable."</p>
            </div>
            <div class="review-item-modal">
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>Javier López</h4>
                        <div class="review-date">Hace 1 mes</div>
                    </div>
                    <div class="review-stars">⭐⭐⭐⭐⭐</div>
                </div>
                <p class="review-text">"Rápidos, eficientes y con precios transparentes. Los recomiendo 100%."</p>
            </div>
        `;
        console.log("✅ Reseñas mostradas correctamente");
    } else {
        console.error("❌ Contenedor de reseñas no encontrado");
    }
}

// Cerrar modal Google al hacer clic fuera
document.addEventListener('click', function(event) {
    const modal = document.getElementById('googleReviewsModal');
    if (event.target === modal) {
        closeGoogleReviews();
    }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('googleReviewsModal');
        if (modal && modal.style.display === 'block') {
            closeGoogleReviews();
        }
        
        const imageModal = document.querySelector('.modal');
        if (imageModal && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// REFUERZO PARA ACORDEÓN FAQ
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Acordeón FAQ inicializado');
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            console.log('Click en acordeón detectado');
            
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Cerrar otros acordeones
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector('i');
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = null;
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Alternar este acordeón
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});