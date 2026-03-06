// Garante que o SDK do EmailJS esta pronto antes de tentar enviar.
function ensureEmailJsReady() {
    const consentKey = 'pk_cookie_consent_v1';

    if (window.emailjs && typeof window.emailjs.send === 'function') {
        return Promise.resolve();
    }

    if (localStorage.getItem(consentKey) !== 'accepted') {
        return Promise.reject(new Error('COOKIE_CONSENT_REQUIRED'));
    }

    const existingScript = document.getElementById('pk-emailjs-sdk');
    if (existingScript && existingScript.dataset.ready === 'true' && window.emailjs) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        function initAndResolve() {
            if (!window.emailjs || typeof window.emailjs.init !== 'function') {
                reject(new Error('EmailJS indisponivel.'));
                return;
            }

            const publicKey = document.body?.dataset?.emailjsKey;
            if (publicKey) {
                try {
                    window.emailjs.init(publicKey);
                } catch (error) {
                    console.warn('EmailJS init falhou:', error);
                }
            }

            resolve();
        }

        if (existingScript) {
            if (window.emailjs) {
                initAndResolve();
            } else {
                existingScript.addEventListener('load', initAndResolve, { once: true });
                existingScript.addEventListener('error', () => reject(new Error('Falha ao carregar EmailJS.')), { once: true });
            }
            return;
        }

        const script = document.createElement('script');
        script.id = 'pk-emailjs-sdk';
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = function () {
            script.dataset.ready = 'true';
            initAndResolve();
        };
        script.onerror = function () {
            reject(new Error('Falha ao carregar EmailJS.'));
        };
        document.body.appendChild(script);
    });
}

// Função para enviar email usando EmailJS (apenas UM email)
async function sendReviewEmail(reviewData) {
    await ensureEmailJsReady();

    const templateParams = {
        to_email: 'papproductivekey@gmail.com',
        from_name: reviewData.userName,
        from_email: reviewData.userEmail,
        rating: reviewData.rating + ' estrelas',
        experience: reviewData.userExperience,
        weather_impact: getWeatherImpactText(reviewData.weatherImpact),
        timestamp: reviewData.timestamp,
        subject: `Nova Avaliação - ${reviewData.rating} estrelas - ${reviewData.userName}`
    };

    try {
        const response = await emailjs.send(
            'service_aou9kya',
            'template_jyte39w', // ✅ APENAS ESTE TEMPLATE
            templateParams
        );
        
        console.log('✅ Email enviado com sucesso');
        return response;
    } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
        throw error;
    }
}

// Ligar envio de avaliação via EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    if (!reviewForm || reviewForm.dataset.emailBound === 'true') return;

    reviewForm.dataset.emailBound = 'true';

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
            if (error && error.message === 'COOKIE_CONSENT_REQUIRED') {
                showNotification('Atenção', 'Para enviar a avaliação, aceite primeiro os cookies no banner.');
            } else {
                showNotification('Erro', 'Não foi possível enviar a sua avaliação. Tente novamente.');
            }
        } finally {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>📨 Enviar Avaliação</span>';
            submitBtn.disabled = false;
        }
    });
});

// Função para enviar feedback beta usando EmailJS
async function sendBetaFeedbackEmail(feedbackData) {
    await ensureEmailJsReady();

    const templateParams = {
        to_email: 'papproductivekey@gmail.com',
        from_name: feedbackData.userName,
        from_email: feedbackData.userEmail,
        rating: 'Feedback Beta',
        experience: feedbackData.message,
        weather_impact: 'N/A',
        timestamp: feedbackData.timestamp,
        subject: `Novo Feedback Beta - ${feedbackData.userName}`
    };

    try {
        const response = await emailjs.send(
            'service_aou9kya',
            'template_jyte39w',
            templateParams
        );
        console.log('✅ Feedback enviado com sucesso');
        return response;
    } catch (error) {
        console.error('❌ Erro ao enviar feedback:', error);
        throw error;
    }
}
