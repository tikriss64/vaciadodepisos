// script.js - VERSIÓN COMPLETA Y CORREGIDA

// ===== VARIABLES GLOBALES PARA LA GALERÍA =====
let currentGallery = '';
let currentSlideIndex = 0;
const galleryData = {
    transformacion: [
        { 
            src: 'imagenes/grandes/nave-industrial-abandonada-llena-escombros.webp', 
            title: 'Nave industrial antes', 
            desc: 'Pisos y Naves - antes del vaciado' 
        },
        { 
            src: 'imagenes/grandes/nave-industrial-taller-vacio-suelo-bicolor.webp', 
            title: 'Limpieza terminada', 
            desc: 'Antes y después de la limpieza' 
        },
        { 
            src: 'imagenes/grandes/habitacion-vacia-suelo-ajedrezado-balcon-1200x900.webp', 
            title: 'Sala de estar', 
            desc: 'Espacio completamente limpiado y renovado' 
        },
        { 
            src: 'imagenes/grandes/limpieza-integral-trajes-proteccion.webp', 
            title: 'limpieza post renvovacion integral', 
            desc: 'Transformación completa' 
        }
    ],
    limpieza: [
        { 
            src: 'imagenes/grandes/habitacion-llena-de-latas-y-basura-1200x1600.webp', 
            title: 'Limpieza Diógenes', 
            desc: 'Servicio especializado con máxima sensibilidad' 
        },
        { 
            src: 'imagenes/grandes/limpieza-habitacion-desordenada-escombros-1200x1600.webp', 
            title: 'Salón Diógenes', 
            desc: 'Limpieza profunda y desinfección' 
        },
        { 
            src: 'imagenes/grandes/habitacion-vacia-suelo-cuadros-puertas-abiertas.webp', 
            title: 'Resultado limpio y restaurado', 
            desc: 'Antes y después impresionante' 
        },
        { 
            src: 'imagenes/grandes/Derribo-cocina-Limpieza-integral.webp', 
            title: 'Cocina desmonatada Diógenes', 
            desc: 'Recuperación completa del espacio' 
        }
    ],
    pintura: [
        { 
            src: 'imagenes/grandes/barnizando-marco-puerta-madera.webp', 
            title: 'Pintura Profesional', 
            desc: 'Trabajos de pintura y reparaciones' 
        },
        { 
            src: 'imagenes/grandes/puerta-metalica-blanca-lamas.webp', 
            title: 'Puerta metalica Pintada', 
            desc: 'Acabado profesional y duradero' 
        },
        { 
            src: 'imagenes/grandes/trabajo-final-epoxi-garaje.webp', 
            title: 'Garaje Renovado', 
            desc: 'Pintura epoxi moderna' 
        },
        { 
            src: 'imagenes/grandes/habitacion-preparada-para-pintar.webp', 
            title: 'Detalles Perfectos', 
            desc: 'Acabados de alta calidad' 
        }
    ]
};

// ===== FUNCIONES GLOBALES PARA LA GALERÍA =====
function showSlide(index, images) {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    
    const slides = modal.querySelectorAll('.modal-slide');
    const thumbs = modal.querySelectorAll('.modal-thumb');
    
    // Ocultar todos los slides
    slides.forEach(slide => slide.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    
    // Mostrar slide actual
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (thumbs[index]) {
        thumbs[index].classList.add('active');
    }
    
    // Actualizar índice y caption
    currentSlideIndex = index;
    updateCaption(images[index]);
}

function updateCaption(image) {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    
    const caption = modal.querySelector('.modal-caption');
    if (caption && image) {
        caption.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.desc}</p>
        `;
    }
}

function closeImageGallery() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cargado correctamente');

    // ===== MENÚ MÓVIL =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== HEADER SCROLL MEJORADO =====
let lastScrollTop = 0;
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll hacia ABAJO - ocultar header
            header.classList.add('header-hidden');
        } else {
            // Scroll hacia ARRIBA - mostrar header
            header.classList.remove('header-hidden');
        }
        
        // Fondo sólido cuando se hace scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

    // ===== GALERÍA DE IMÁGENES =====
    const imageCards = document.querySelectorAll('.image-card');
    const modal = document.getElementById('gallery-modal');
    
    if (imageCards.length > 0 && modal) {
        console.log('Inicializando galería de imágenes');
        
        // Abrir modal para imágenes
        imageCards.forEach(card => {
            card.addEventListener('click', function() {
                const galleryName = this.getAttribute('data-gallery');
                currentGallery = galleryName;
                currentSlideIndex = 0;
                
                if (galleryData[galleryName]) {
                    openImageGallery(galleryData[galleryName]);
                } else {
                    // Si no hay galería, mostrar solo la imagen actual
                    const img = this.querySelector('img');
                    const title = this.querySelector('h3').textContent;
                    const desc = this.querySelector('p').textContent;
                    
                    const singleImage = [
                        { 
                            src: img.src, 
                            title: title, 
                            desc: desc 
                        }
                    ];
                    openImageGallery(singleImage);
                }
            });
        });

        function openImageGallery(images) {
            const modalSlides = modal.querySelector('.modal-slides');
            const modalThumbnails = modal.querySelector('.modal-thumbnails');
            const modalCaption = modal.querySelector('.modal-caption');
            
            // Limpiar contenido previo
            modalSlides.innerHTML = '';
            modalThumbnails.innerHTML = '';
            
            // Crear slides
            images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = 'modal-slide' + (index === 0 ? ' active' : '');
                slide.innerHTML = `
                    <img src="${image.src}" alt="${image.title}" class="modal-image">
                `;
                modalSlides.appendChild(slide);
                
                // Crear thumbnails (solo si hay más de una imagen)
                if (images.length > 1) {
                    const thumb = document.createElement('img');
                    thumb.src = image.src;
                    thumb.alt = image.title;
                    thumb.className = 'modal-thumb' + (index === 0 ? ' active' : '');
                    thumb.addEventListener('click', () => showSlide(index, images));
                    modalThumbnails.appendChild(thumb);
                }
            });
            
            // Actualizar caption
            updateCaption(images[0]);
            
            // Ocultar thumbnails si solo hay una imagen
            if (images.length <= 1) {
                modalThumbnails.style.display = 'none';
            } else {
                modalThumbnails.style.display = 'flex';
            }
            
            // Mostrar modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        // Navegación del modal
        const closeModal = modal.querySelector('.close-modal');
        const modalPrev = modal.querySelector('.modal-prev');
        const modalNext = modal.querySelector('.modal-next');

        if (closeModal) {
            closeModal.addEventListener('click', closeImageGallery);
        }

        if (modalPrev) {
            modalPrev.addEventListener('click', function() {
                if (currentGallery && galleryData[currentGallery]) {
                    const images = galleryData[currentGallery];
                    currentSlideIndex = (currentSlideIndex - 1 + images.length) % images.length;
                    showSlide(currentSlideIndex, images);
                }
            });
        }

        if (modalNext) {
            modalNext.addEventListener('click', function() {
                if (currentGallery && galleryData[currentGallery]) {
                    const images = galleryData[currentGallery];
                    currentSlideIndex = (currentSlideIndex + 1) % images.length;
                    showSlide(currentSlideIndex, images);
                }
            });
        }

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageGallery();
            }
        });
    }

    // ===== VIDEOS YOUTUBE =====
    document.querySelectorAll('.video-card').forEach(card => {
        const thumbnail = card.querySelector('.media-thumbnail');
        const videoId = thumbnail.getAttribute('data-video-id');
        const videoThumbnail = thumbnail.querySelector('.video-thumbnail');
        const playButton = thumbnail.querySelector('.video-play-button');
        const videoPlayer = thumbnail.querySelector('.video-player');
        
        // Establecer miniatura del video
        if (videoThumbnail && videoId) {
            videoThumbnail.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
        }
        
        // Reproducir video al hacer clic
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevenir que se active el clic de la tarjeta
                if (videoPlayer && videoId) {
                    videoPlayer.innerHTML = `
                        <iframe 
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                            allow="autoplay; encrypted-media" 
                            allowfullscreen
                            style="width: 100%; height: 100%; border: none;"
                        ></iframe>
                    `;
                    thumbnail.classList.add('video-loaded');
                    
                    // Ocultar miniatura y botón de play
                    videoThumbnail.style.display = 'none';
                    playButton.style.display = 'none';
                }
            });
        }

        // Prevenir que el clic en la tarjeta active el video
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.video-play-button')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    // ===== ACORDEÓN FAQ =====
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Cerrar todos los demás
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
    document.querySelectorAll('.service-card, .testimonial-card, .step, .media-card').forEach(el => {
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
    // ===== SCROLL SUAVE MODERNO (usa scroll-margin-top) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== BANNER DE COOKIES - EXACTO COMO EN LA VERSIÓN ANTIGUA =====
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    if (cookieBanner) {
        setTimeout(() => {
            if (!localStorage.getItem('cookiesAccepted')) {
                cookieBanner.style.display = 'block';
            }
        }, 2000);

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.style.display = 'none';
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'false');
                cookieBanner.style.display = 'none';
            });
        }
    }

    console.log('Todas las funcionalidades inicializadas correctamente');
});

// ===== GOOGLE REVIEWS FUNCTIONS - VERSIÓN CORREGIDA =====
function openGoogleReviews() {
    const modal = document.getElementById('googleReviewsModal');
    console.log("Abriendo modal de reseñas...");
    
    if (modal) {
        modal.style.display = 'flex';
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

async function loadGoogleReviews() {
    const container = document.getElementById('reviewsContainer');
    console.log("✅ Cargando reseñas...");
    
    if (container) {
        try {
            // Mostrar loading
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #E8A933; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto 15px;"></div>
                    <p style="color: #666;">Cargando reseñas de Google...</p>
                </div>
            `;

            const PLACE_ID = 'ChIJYTKzWI6BoxIRLXcFmfz88Ik';
            const API_KEY = 'AIzaSyDmPh60BWVRjsupiCzryw-Ouq6VsJMrsgk';

            const response = await fetch(
                `https://places.googleapis.com/v1/places/${PLACE_ID}?key=${API_KEY}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-FieldMask': 'displayName,rating,reviews,userRatingCount,formattedAddress'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("✅ Datos recibidos correctamente:", data);
            displayGoogleReviews(container, data);

        } catch (error) {
            console.error('❌ Error cargando reseñas:', error);
            showFallbackContent(container);
        }
    }
}

function displayGoogleReviews(container, data) {
    console.log("Datos recibidos de Google:", data);
    
    // Extraer valores de forma segura
    const businessName = data.displayName?.text || 'Vaciado de Pisos';
    const address = data.formattedAddress || 'Sant Pere de Ribes';
    const rating = data.rating || '0';
    const reviewCount = data.userRatingCount || '0';
    const reviews = data.reviews || [];

    if (!reviews || reviews.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <h3>${businessName}</h3>
                <p style="color: #666; margin: 10px 0;">${address}</p>
                <div style="font-size: 2rem; color: #E8A933; margin: 15px 0;">
                    ⭐ ${rating}/5
                </div>
                <p style="color: #666; margin-bottom: 20px;">Aún no hay reseñas disponibles</p>
                <a href="https://search.google.com/local/writereview?placeid=ChIJYTKzWI6BoxIRLXcFmfz88Ik" 
                   target="_blank" 
                   class="google-btn">
                    <i class="fas fa-pen"></i> Sé el primero en reseñar
                </a>
            </div>
        `;
        return;
    }

    // Mostrar reseñas reales
    const reviewsHTML = reviews.slice(0, 8).map(review => {
        const authorName = review.authorAttribution?.displayName || 'Cliente Google';
        const reviewDate = new Date(review.publishTime).toLocaleDateString('es-ES');
        const reviewText = review.text?.text || 'Sin comentario';
        const reviewRating = review.rating || 5;

        return `
            <div class="review-item-modal">
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>${authorName}</h4>
                        <div class="review-date">${reviewDate}</div>
                    </div>
                    <div class="review-stars">
                        ${'⭐'.repeat(reviewRating)} ${reviewRating}/5
                    </div>
                </div>
                <p class="review-text">"${reviewText}"</p>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <h3 style="color: #333; margin-bottom: 8px;">${businessName}</h3>
            <p style="color: #666; margin-bottom: 15px;">${address}</p>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                <div style="font-size: 2.5rem; color: #E8A933;">
                    ⭐ ${rating}
                </div>
                <div style="text-align: left;">
                    <div style="font-weight: 600; color: #333;">${rating}/5</div>
                    <div style="color: #666; font-size: 0.9em;">Basado en ${reviewCount} reseñas</div>
                </div>
            </div>
        </div>
        
        <div class="reviews-grid-modal">
            ${reviewsHTML}
        </div>
    `;
}

function showFallbackContent(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <div style="font-size: 3rem; color: #E8A933; margin-bottom: 15px;">⭐</div>
            <h3 style="color: #333; margin-bottom: 15px;">Reseñas Reales en Google</h3>
            <p style="color: #666; margin-bottom: 25px; line-height: 1.5;">
                Para ver nuestras reseñas actualizadas, visita nuestro perfil de Google Business.
            </p>
            <a href="https://g.page/r/Carrer-de-la-Torreta-8-local-7-Sant-Pere-de-Ribes/review" 
               target="_blank" 
               class="google-btn">
                <i class="fab fa-google"></i>
                Ver Reseñas en Google Business
            </a>
        </div>
    `;
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
    const googleModal = document.getElementById('googleReviewsModal');
    if (event.key === 'Escape' && googleModal && googleModal.style.display === 'flex') {
        closeGoogleReviews();
    }
});

// === SELECTOR DE IDIOMA ===
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');

if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', () => {
        langDropdown.classList.remove('show');
    });
}

// === SELECTOR IDIOMA FLOTANTE ===
const floatingLangBtn = document.getElementById('floating-lang-btn');
const floatingLangDropdown = document.getElementById('floating-lang-dropdown');

if (floatingLangBtn && floatingLangDropdown) {
    floatingLangBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatingLangDropdown.classList.toggle('show');
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', () => {
        floatingLangDropdown.classList.remove('show');
    });
}
// ===== BLOG - SOLUCIÓN DEFINITIVA =====
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;
    
    // Obtener TODOS los artículos una sola vez
    const allArticles = Array.from(document.querySelectorAll('.blog-card'));
    let currentPage = 1;
    const articlesPerPage = 6;
    
    // Función para mostrar artículos
    function showArticles() {
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        
        // Mostrar solo los artículos de la página actual
        allArticles.forEach((article, index) => {
            if (index >= startIndex && index < endIndex) {
                article.style.display = 'flex';
            } else {
                article.style.display = 'none';
            }
        });
        
        // Ocultar botón si no hay más páginas
        if (endIndex >= allArticles.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Cargar más artículos
    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        showArticles();
    });
    
    // Mostrar primera página
    showArticles();
});