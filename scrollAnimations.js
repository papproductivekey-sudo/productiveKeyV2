<<<<<<< HEAD
// ================================
// SCROLL ANIMATIONS - Profissional
// Sistema avançado com Intersection Observer
// ================================

class ScrollAnimations {
    constructor() {
        this.activePhones = new Set();
        this.mouseRafId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.maxParallaxElements = 4;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupObserver();
        if (!this.prefersReducedMotion && window.innerWidth > 768) {
            this.setupMouseTracking();
        }
    }

    setupObserver() {
        const options = {
            threshold: [0.05, 0.25, 0.5],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Adiciona a classe show com delay em cascata
                    setTimeout(() => {
                        entry.target.classList.add('show');
                        this.activePhones.add(entry.target);
                        this.setupPhoneHoverListener(entry.target);
                    }, index * 100);
                    
                    // Desobserva após aparecer para melhor performance
                    observer.unobserve(entry.target);
                } else {
                    // Remove do set quando sai do viewport
                    this.activePhones.delete(entry.target);
                }
            });
        }, options);

        // Observar todos os elementos com scroll-animate
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Setup de listeners para cada iPhone
     * Detecta hover para pausar animação contínua
     */
    setupPhoneHoverListener(phoneContainer) {
        phoneContainer.addEventListener('mouseenter', () => {
            // Pausa a animação contínua ao hover
            phoneContainer.style.animationPlayState = 'paused';
        });

        phoneContainer.addEventListener('mouseleave', () => {
            // Retoma a animação contínua ao sair do hover
            phoneContainer.style.animationPlayState = 'running';
        });
    }

    /**
     * Sistema de parallax suave com movimento do mouse
     * Cria efeito 3D elegante sem comprometer performance
     */
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            if (this.mouseRafId !== null) return;
            this.mouseRafId = requestAnimationFrame(() => {
                this.applyParallaxFrame();
                this.mouseRafId = null;
            });
        }, { passive: true });

        // Reset ao sair do documento
        document.addEventListener('mouseleave', () => {
            this.activePhones.forEach(phone => {
                phone.style.setProperty('--parallax-x', '0deg');
                phone.style.setProperty('--parallax-y', '0deg');
            });
        });
    }

    applyParallaxFrame() {
        if (document.documentElement.getAttribute('data-space-theme') === 'on') {
            this.activePhones.forEach(phone => {
                phone.style.setProperty('--parallax-x', '0deg');
                phone.style.setProperty('--parallax-y', '0deg');
            });
            return;
        }

        let processed = 0;
        this.activePhones.forEach(phone => {
            if (processed >= this.maxParallaxElements) return;
            if (phone.matches(':hover')) return;

            const rect = phone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angleX = (this.mouseY - centerY) * 0.008;
            const angleY = (this.mouseX - centerX) * 0.008;

            phone.style.setProperty('--parallax-x', `${angleX}deg`);
            phone.style.setProperty('--parallax-y', `${angleY}deg`);
            processed += 1;
        });
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
=======
// ================================
// SCROLL ANIMATIONS - Profissional
// Sistema avançado com Intersection Observer
// ================================

class ScrollAnimations {
    constructor() {
        this.activePhones = new Set();
        this.mouseRafId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.maxParallaxElements = 4;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupObserver();
        if (!this.prefersReducedMotion && window.innerWidth > 768) {
            this.setupMouseTracking();
        }
    }

    setupObserver() {
        const options = {
            threshold: [0.05, 0.25, 0.5],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Adiciona a classe show com delay em cascata
                    setTimeout(() => {
                        entry.target.classList.add('show');
                        this.activePhones.add(entry.target);
                        this.setupPhoneHoverListener(entry.target);
                    }, index * 100);
                    
                    // Desobserva após aparecer para melhor performance
                    observer.unobserve(entry.target);
                } else {
                    // Remove do set quando sai do viewport
                    this.activePhones.delete(entry.target);
                }
            });
        }, options);

        // Observar todos os elementos com scroll-animate
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Setup de listeners para cada iPhone
     * Detecta hover para pausar animação contínua
     */
    setupPhoneHoverListener(phoneContainer) {
        phoneContainer.addEventListener('mouseenter', () => {
            // Pausa a animação contínua ao hover
            phoneContainer.style.animationPlayState = 'paused';
        });

        phoneContainer.addEventListener('mouseleave', () => {
            // Retoma a animação contínua ao sair do hover
            phoneContainer.style.animationPlayState = 'running';
        });
    }

    /**
     * Sistema de parallax suave com movimento do mouse
     * Cria efeito 3D elegante sem comprometer performance
     */
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            if (this.mouseRafId !== null) return;
            this.mouseRafId = requestAnimationFrame(() => {
                this.applyParallaxFrame();
                this.mouseRafId = null;
            });
        }, { passive: true });

        // Reset ao sair do documento
        document.addEventListener('mouseleave', () => {
            this.activePhones.forEach(phone => {
                phone.style.setProperty('--parallax-x', '0deg');
                phone.style.setProperty('--parallax-y', '0deg');
            });
        });
    }

    applyParallaxFrame() {
        if (document.documentElement.getAttribute('data-space-theme') === 'on') {
            this.activePhones.forEach(phone => {
                phone.style.setProperty('--parallax-x', '0deg');
                phone.style.setProperty('--parallax-y', '0deg');
            });
            return;
        }

        let processed = 0;
        this.activePhones.forEach(phone => {
            if (processed >= this.maxParallaxElements) return;
            if (phone.matches(':hover')) return;

            const rect = phone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angleX = (this.mouseY - centerY) * 0.008;
            const angleY = (this.mouseX - centerX) * 0.008;

            phone.style.setProperty('--parallax-x', `${angleX}deg`);
            phone.style.setProperty('--parallax-y', `${angleY}deg`);
            processed += 1;
        });
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
>>>>>>> 45bf764cc3ef9c6910a2db17f971766eaa5ffeef
