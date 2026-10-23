document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-up');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenu ? mobileMenu.querySelector('i') : null;

    if (mobileMenu && navLinks) {
        const toggleMenu = (e) => {
            if (e) {
                e.stopPropagation();
            }
            const isActive = navLinks.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            
            if (menuIcon) {
                if (isActive) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        };

        const closeMenu = () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        };

        mobileMenu.addEventListener('click', toggleMenu);

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when tapping or clicking outside (iOS Safari & desktop)
        const handleOutsideClick = (e) => {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchend', handleOutsideClick, { passive: true });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    /* ========================================================
       SOAP PRODUCTS DATA & CATALOG FUNCTIONALITY
       ======================================================== */
    const soapProductsData = {
        carbon: {
            id: 'carbon',
            name: 'Jabón de Carbón con Menta',
            price: '59,00 MXN',
            weight: 'Barra de más de 100 gramos',
            badge: 'Purificante & Detox',
            badgeClass: 'tag-carbon',
            flyerImg: 'assets/jabon-carbon.jpg',
            headline: '¡TIENES QUE PROBARLO!',
            description: 'Funciona como un imán atrayendo toxinas e impurezas que están dentro de la piel como la suciedad y grasa de los poros.',
            benefits: [
                'Suaviza, regenera la piel',
                'Reduce la inflamación y rojez',
                'Brinda efecto lifting al tensar los poros de la piel',
                'Limpieza Profunda y purificante',
                'Elimina puntos negros y espinillas',
                'Cierra poros visiblemente',
                'Astringente natural muy útil en afecciones de la piel como acné'
            ],
            extraNotes: [
                { icon: 'fas fa-magnet', title: 'Acción Imán:', text: 'Atrae toxinas profundas y limpia los poros obstruidos.' },
                { icon: 'fas fa-leaf', title: 'Menta Natural:', text: 'Refresca, desinflama y calma la piel con rojez o brotes.' }
            ],
            socialTag: '@BIO_ALOE_2327',
            whatsappMsg: 'Hola Natural Bio Aloe, me gustaría pedir el Jabón de Carbón con Menta ($59 MXN).'
        },
        perejil: {
            id: 'perejil',
            name: 'Jabón de Perejil',
            price: '59,00 MXN',
            weight: 'Barra de 80 gramos aprox. (Relieve Masajeador)',
            badge: 'Extra Aclarante',
            badgeClass: 'tag-perejil',
            flyerImg: 'assets/jabon-perejil.jpg',
            headline: 'JABÓN DE PEREJIL - Extra aclarante para zonas difíciles',
            description: 'Especialmente formulado para aclarar zonas difíciles como codos, axilas y rodillas. Aprovecha el poder antioxidante del perejil para restaurar el tono natural de la piel.',
            benefits: [
                'El perejil tiene vitamina C: estimula activamente la producción de colágeno',
                'Actúa como cicatrizante y regenerador celular natural',
                'Reparador natural que combate los radicales libres gracias a su alto poder antioxidante',
                'Ideal para combatir manchas causadas por el sol, paño, etc.',
                'Aclara zonas difíciles propensas a hiperpigmentación (codos, axilas, rodillas)',
                'No contiene ningún aroma ni colorante artificial: 100% natural',
                'Diseño ergonómico con nódulos masajeadores que activan la circulación'
            ],
            extraNotes: [
                { icon: 'fas fa-stopwatch', title: 'Modo de Aplicación:', text: 'Déjalo actuar en la zona a aclarar por 15 minutos y enjuaga con abundante agua.' },
                { icon: 'fas fa-seedling', title: 'Pureza:', text: 'Sin perfumes sintéticos ni colorantes añadidos.' }
            ],
            socialTag: '@BIO_ALOE_2327',
            whatsappMsg: 'Hola Natural Bio Aloe, me gustaría pedir el Jabón de Perejil Extra Aclarante ($59 MXN).'
        },
        azufre: {
            id: 'azufre',
            name: 'Jabón de Azufre',
            price: '55,00 MXN',
            weight: 'Contenido 100 gramos',
            badge: 'Terapéutico & Antiacné',
            badgeClass: 'tag-azufre',
            flyerImg: 'assets/jabon-azufre.jpg',
            headline: 'EL JABÓN DE AZUFRE - Cuidado dermatológico natural',
            description: 'El azufre siempre ha sido un mineral natural muy popular en el cuidado de la piel y los tratamientos contra: El acné, la dermatitis o la psoriasis.',
            benefits: [
                'Tratamiento coadyuvante natural contra el acné, la dermatitis o la psoriasis',
                'Propiedades desinfectantes y antibacterianas de amplio espectro',
                'Astringente natural: regula el exceso de sebo y grasa dérmica',
                'Acción antiinflamatoria que alivia la comezón, enrojecimiento y brotes',
                'Desobstruye poros y ayuda a prevenir nuevas espinillas',
                'Fórmula mineral pura de alta eficacia cosmética artesanal'
            ],
            extraNotes: [
                { icon: 'fas fa-shield-virus', title: 'Propiedades Terapéuticas:', text: 'Desinfectante, astringente y antiinflamatorio natural para afecciones cutáneas.' },
                { icon: 'fas fa-hand-sparkles', title: 'Recomendación de uso:', text: 'Generar espuma, aplicar en la zona afectada y enjuagar con agua tibia.' }
            ],
            socialTag: '@BIO_ALOE_2327',
            whatsappMsg: 'Hola Natural Bio Aloe, me gustaría pedir el Jabón de Azufre ($55 MXN).'
        },
        romero: {
            id: 'romero',
            name: 'Jabón de Romero',
            price: '59,00 MXN',
            weight: 'Barra 100 gramos',
            badge: 'Estimulante Capilar',
            badgeClass: 'tag-romero',
            flyerImg: 'assets/hero_shampoo.jpg',
            headline: 'JABÓN DE ROMERO - Revitaliza y fortalece tu cabello',
            description: 'El romero es reconocido como uno de los mejores estimulantes capilares de la naturaleza. Activa la circulación del cuero cabelludo, fortalece los folículos desde la raíz y le devuelve al cabello su vitalidad natural.',
            benefits: [
                'Estimula el crecimiento del cabello desde la raíz',
                'Reduce la caída y fortalece los folículos pilosos',
                'Mejora la circulación sanguínea en el cuero cabelludo',
                'Aporta brillo, fuerza y suavidad naturales',
                'Fórmula 100% natural, sin sulfatos ni parabenos',
                'Ideal para cabello debilitado, opaco o con caída',
                'Aroma herbal revitalizante de romero puro'
            ],
            extraNotes: [
                { icon: 'fas fa-seedling', title: 'Acción Estimulante:', text: 'Activa los folículos pilosos y promueve un crecimiento más denso y fuerte.' },
                { icon: 'fas fa-leaf', title: 'Pureza Natural:', text: 'Sin ingredientes sintéticos. Solo el poder puro del romero botánico.' }
            ],
            socialTag: '@BIO_ALOE_2327',
            whatsappMsg: 'Hola Natural Bio Aloe, me gustaría pedir el Jabón de Romero ($59 MXN).'
        }
    };

    // Category Filter Buttons
    const filterButtons = document.querySelectorAll('.soap-filter-btn');
    const soapCards = document.querySelectorAll('.soap-card');

    if (filterButtons.length > 0 && soapCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active state
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Filter cards
                soapCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Soap Details Modal Logic
    const soapModal = document.getElementById('soap-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    let lastActiveElement = null;

    function openSoapModal(productId) {
        const product = soapProductsData[productId];
        if (!product || !soapModal || !modalBody) return;

        lastActiveElement = document.activeElement;

        // Construct Modal HTML
        const benefitsHtml = product.benefits.map(b => `
            <li><i class="fas fa-check-circle"></i> <span>${b}</span></li>
        `).join('');

        const notesHtml = product.extraNotes ? product.extraNotes.map(n => `
            <div class="modal-usage-box">
                <i class="${n.icon} color-green" style="margin-right:8px;"></i>
                <strong>${n.title}</strong> ${n.text}
            </div>
        `).join('') : '';

        const encodedMsg = encodeURIComponent(product.whatsappMsg);

        modalBody.innerHTML = `
            <div class="modal-flyer-col">
                <img src="${product.flyerImg}" alt="${product.name} Natural Bio Aloe" loading="lazy">
                <div class="modal-flyer-hint">
                    <i class="fas fa-leaf color-green"></i> 100% Artesanal y Natural
                </div>
            </div>
            <div class="modal-details-col">
                <div class="modal-details-header">
                    <div class="modal-badges-row">
                        <span class="soap-tag ${product.badgeClass}">${product.badge}</span>
                    </div>
                    <h2 class="modal-title">${product.name}</h2>
                    <div class="modal-price-row">
                        <span class="modal-price">$${product.price}</span>
                    </div>
                    <p class="modal-tagline">${product.headline}</p>
                </div>

                <div class="modal-section-block">
                    <h3 class="modal-section-title"><i class="fas fa-align-left"></i> Descripción</h3>
                    <p class="modal-description">${product.description}</p>
                </div>

                <div class="modal-section-block">
                    <h3 class="modal-section-title"><i class="fas fa-star color-yellow"></i> Propiedades y Beneficios</h3>
                    <ul class="modal-benefits-list">
                        ${benefitsHtml}
                    </ul>
                </div>

                ${notesHtml}

                <div class="modal-contact-row">
                    <span><i class="fas fa-store"></i> Cosmética Artesanal Consciente</span>
                    <a href="https://www.instagram.com/bio_aloe_2327/" target="_blank"><i class="fab fa-instagram"></i> ${product.socialTag}</a>
                </div>

                <div class="modal-actions">
                    <a href="https://wa.me/523311741166?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" class="btn modal-whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Pedir este Jabón por WhatsApp ($${product.price})
                    </a>
                </div>
            </div>
        `;

        soapModal.classList.add('active');
        soapModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (modalClose) {
            modalClose.focus();
        }
    }

    function closeSoapModal() {
        if (!soapModal) return;
        soapModal.classList.remove('active');
        soapModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (modalBody) {
            modalBody.innerHTML = '';
        }
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    }

    // Modal Trigger Buttons
    document.querySelectorAll('[data-product]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const prodId = btn.getAttribute('data-product');
            openSoapModal(prodId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeSoapModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeSoapModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && soapModal && soapModal.classList.contains('active')) {
            closeSoapModal();
        }
    });
});

// ── Rotating hero word ──────────────────────────────────────────────────────
(function () {
    const words = [
        { text: 'Romero',  color: '' },           // default (CSS gradient colour)
        { text: 'Carb\u00f3n', color: '#4e4e4eff' },      // negro
        { text: 'Perejil', color: '#a35a41ff' },      // marrón
        { text: 'Azufre',  color: '#9a710aff' },      // amarillo mostaza
    ];

    const el = document.getElementById('rotating-word');
    if (!el) return;

    let current = 0;

    // Apply transition style once
    el.style.transition = 'opacity 0.6s ease, color 0.6s ease';

    setInterval(() => {
        // Fade out
        el.style.opacity = '0';

        setTimeout(() => {
            current = (current + 1) % words.length;
            const w = words[current];
            el.textContent = w.text;

            if (w.color) {
                el.style.color = w.color;
                el.style.webkitTextFillColor = w.color;   // override gradient clip if any
                el.style.backgroundImage = 'none';
                el.style.backgroundClip = 'unset';
                el.style.webkitBackgroundClip = 'unset';
            } else {
                // Restore original gradient/colour from CSS
                el.style.color = '';
                el.style.webkitTextFillColor = '';
                el.style.backgroundImage = '';
                el.style.backgroundClip = '';
                el.style.webkitBackgroundClip = '';
            }

            // Fade back in
            el.style.opacity = '1';
        }, 380); // slightly longer than the CSS transition
    }, 2000); // total cycle: 1.5 s (visible) + 0.38 s (transition) ≈ 2 s per word
})();


