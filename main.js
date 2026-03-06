// Modal de vídeo removido

function animateOnScroll() {
    const featureCards = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove a classe quando sai da viewport para permitir re-animação
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => observer.observe(card));
    steps.forEach(step => observer.observe(step));
}

// Animação de contagem para números
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        const suffix = element.textContent.includes('K') ? 'K+' : (element.textContent.includes('%') ? '%' : '');
        element.textContent = value + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progressBar');

    if (!header || !progressBar) return;
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Progress bar
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop) / (docHeight - winHeight);
    const progressPercent = scrollPercent * 100;
    
    progressBar.style.width = progressPercent + '%';
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Create overlay for mobile nav
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    function openMenu() {
        navLinks.classList.add('active');
        navOverlay.classList.add('show');
        mobileMenuBtn.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('show');
        mobileMenuBtn.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        mobileMenuBtn.focus();
    }

    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) closeMenu();
        else openMenu();
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    navOverlay.addEventListener('click', closeMenu);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Mobile mode toggle
function initMobileModeToggle() {
    const btn = document.getElementById('mobileToggle');
    if (!btn) return;

    function enableMobileMode() {
        document.documentElement.setAttribute('data-mode', 'mobile');
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('active');
        btn.title = 'Desativar modo telemóvel';
        localStorage.setItem('mobileMode', 'on');
    }

    function disableMobileMode() {
        document.documentElement.removeAttribute('data-mode');
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('active');
        btn.title = 'Ativar modo telemóvel';
        localStorage.setItem('mobileMode', 'off');
    }

    const navLinks = document.getElementById('navLinks');
    if (navLinks.classList.contains('active')) navLinks.setAttribute('aria-hidden', 'false');
    else navLinks.setAttribute('aria-hidden', 'true');

    const saved = localStorage.getItem('mobileMode');
    if (saved === 'on') enableMobileMode();

    btn.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-mode') === 'mobile') disableMobileMode();
        else enableMobileMode();
    });

    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
}

function initSpotifyMiniPlayer() {
    const wrapper = document.querySelector('.spotify-mini-player');
    const toggle = document.getElementById('spotifyMiniToggle');
    const panel = document.getElementById('spotifyMiniPanel');

    if (!wrapper || !toggle || !panel) return;

    toggle.addEventListener('click', () => {
        const isOpen = wrapper.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'Fechar leitor Spotify' : 'Abrir leitor Spotify');
    });
}

// Formulário de avaliação
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm && reviewForm.dataset.emailBound === 'true') return;
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value;
            const userEmail = document.getElementById('userEmail').value;
            const rating = document.getElementById('rating').value;
            const userExperience = document.getElementById('userExperience').value;
            const weatherImpact = document.getElementById('weatherImpact').value;
            
            if (!rating) {
                showNotification('Atenção', 'Por favor, selecione uma avaliação com as estrelas.');
                return;
            }
            
            try {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> A enviar...';
                submitBtn.disabled = true;
                
                await sendReviewEmail({
                    userName,
                    userEmail,
                    rating,
                    userExperience,
                    weatherImpact,
                    timestamp: new Date().toLocaleString('pt-PT')
                });
                
                showNotification('Sucesso!', `Obrigado, ${userName}! A sua avaliação de ${rating} estrelas foi enviada com sucesso.`);
                this.reset();
                
                document.querySelectorAll('.star').forEach(star => {
                    star.classList.remove('active');
                });
                
            } catch (error) {
                console.error('Erro ao enviar review:', error);
                showNotification('Erro', 'Não foi possível enviar a sua avaliação. Tente novamente.');
            } finally {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<span>📨 Enviar Avaliação</span>';
                submitBtn.disabled = false;
            }
        });
    }
});

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    animateOnScroll();
    initStarRating();
    updateWeatherData();
    initMobileMenu();
    
    let scrollScheduled = false;
    const onScroll = () => {
        if (scrollScheduled) return;
        scrollScheduled = true;
        requestAnimationFrame(() => {
            handleHeaderScroll();
            scrollScheduled = false;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleHeaderScroll();
    initMobileModeToggle();
    initSpotifyMiniPlayer();

    // Eventos do modal removidos
});
