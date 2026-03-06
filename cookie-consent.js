(function () {
    var CONSENT_KEY = 'pk_cookie_consent_v1';
    var SESSION_POPUP_KEY = 'pk_cookie_popup_seen_session';

    function getConsent() {
        return localStorage.getItem(CONSENT_KEY);
    }

    function setConsent(value) {
        localStorage.setItem(CONSENT_KEY, value);
        localStorage.setItem(CONSENT_KEY + '_updated_at', new Date().toISOString());
        window.dispatchEvent(new CustomEvent('pk:consent-updated', { detail: { consent: value } }));
    }

    function injectStyles() {
        if (document.getElementById('cookie-consent-styles')) return;

        var style = document.createElement('style');
        style.id = 'cookie-consent-styles';
        style.textContent = '\n            .cookie-consent-container {\n                margin-top: 14px;\n                font-family: Inter, sans-serif;\n            }\n            .cookie-consent-overlay {\n                position: fixed;\n                inset: 0;\n                z-index: 4000;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: 16px;\n                background: rgba(2, 6, 23, 0.45);\n                backdrop-filter: blur(8px);\n                -webkit-backdrop-filter: blur(8px);\n            }\n            .cookie-consent-popup {\n                width: min(92vw, 760px);\n                background: rgba(255, 255, 255, 0.95);\n                border: 1px solid rgba(37, 99, 235, 0.2);\n                border-radius: 16px;\n                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);\n                padding: 16px;\n            }\n            .cookie-consent-content {\n                display: flex;\n                gap: 12px;\n                align-items: center;\n                justify-content: space-between;\n                flex-wrap: wrap;\n            }\n            .cookie-consent-text {\n                color: #1e293b;\n                font-size: 0.9rem;\n                line-height: 1.45;\n                flex: 1 1 420px;\n            }\n            .cookie-consent-text a {\n                color: inherit;\n                text-decoration: underline;\n            }\n            .cookie-consent-actions {\n                display: flex;\n                gap: 10px;\n                flex: 0 0 auto;\n            }\n            .cookie-btn {\n                border: 1px solid rgba(37, 99, 235, 0.25);\n                border-radius: 10px;\n                padding: 8px 12px;\n                cursor: pointer;\n                font-weight: 600;\n                font-family: Inter, sans-serif;\n            }\n            .cookie-btn-accept {\n                background: #22c55e;\n                color: #052e16;\n                border-color: rgba(34, 197, 94, 0.55);\n            }\n            .cookie-btn-reject {\n                background: #ffffff;\n                color: #1e293b;\n            }\n            .cookie-manage-btn {\n                display: inline-flex;\n                align-items: center;\n                gap: 8px;\n                border: 1px solid rgba(255, 255, 255, 0.3);\n                border-radius: 999px;\n                padding: 8px 12px;\n                background: rgba(15, 23, 42, 0.45);\n                color: #e2e8f0;\n                font-size: 0.86rem;\n                font-weight: 600;\n                cursor: pointer;\n                font-family: Inter, sans-serif;\n            }\n            .cookie-manage-btn.accepted::before {\n                content: "Aceitou";\n                color: #86efac;\n            }\n            .cookie-manage-btn.rejected::before {\n                content: "Recusou";\n                color: #fca5a5;\n            }\n            .cookie-manage-btn::after {\n                content: "Mudar opiniao";\n                color: #dbeafe;\n            }\n            @media (max-width: 640px) {\n                .cookie-consent-actions { width: 100%; }\n                .cookie-btn { flex: 1; }\n            }\n\n            [data-theme="dark"] .cookie-consent-popup {\n                background: rgba(15, 23, 42, 0.95);\n                border-color: rgba(148, 163, 184, 0.35);\n            }\n            [data-theme="dark"] .cookie-consent-text {\n                color: #e2e8f0;\n            }\n            [data-theme="dark"] .cookie-btn-reject {\n                background: rgba(51, 65, 85, 0.95);\n                color: #e2e8f0;\n                border-color: rgba(148, 163, 184, 0.28);\n            }\n            [data-theme="dark"] .cookie-manage-btn {\n                background: rgba(30, 41, 59, 0.85);\n                color: #e2e8f0;\n                border-color: rgba(148, 163, 184, 0.35);\n            }\n            [data-theme="dark"] .cookie-manage-btn::after {\n                color: #cbd5e1;\n            }\n\n            [data-purple-theme="on"] .cookie-consent-overlay {\n                background: rgba(16, 26, 48, 0.45);\n                backdrop-filter: blur(9px);\n                -webkit-backdrop-filter: blur(9px);\n            }\n            [data-purple-theme="on"] .cookie-consent-popup {\n                background: linear-gradient(180deg, rgba(245, 252, 255, 0.95) 0%, rgba(222, 240, 255, 0.9) 56%, rgba(190, 220, 255, 0.88) 100%);\n                border: 1px solid rgba(113, 171, 241, 0.75);\n                box-shadow: 0 18px 42px rgba(24, 71, 145, 0.32);\n            }\n            [data-purple-theme="on"] .cookie-consent-text {\n                color: #0f3f86;\n            }\n            [data-purple-theme="on"] .cookie-btn-reject {\n                background: rgba(255, 255, 255, 0.95);\n                color: #1b4d99;\n                border-color: rgba(113, 171, 241, 0.75);\n            }\n            [data-purple-theme="on"] .cookie-manage-btn {\n                background: linear-gradient(180deg, #ffffff 0%, #d8ecff 10%, #7eb9ff 65%, #4f8ee8 100%);\n                color: #0d3e88;\n                border-color: rgba(47, 111, 214, 0.78);\n                box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.72), inset -1px -1px 0 rgba(47, 111, 214, 0.45), 0 6px 16px rgba(47, 111, 214, 0.24);\n            }\n            [data-purple-theme="on"] .cookie-manage-btn::after {\n                color: #0d3e88;\n            }\n\n            [data-space-theme="on"] .cookie-consent-overlay {\n                background: rgba(2, 6, 23, 0.62);\n                backdrop-filter: blur(10px);\n                -webkit-backdrop-filter: blur(10px);\n            }\n            [data-space-theme="on"] .cookie-consent-popup {\n                background: rgba(15, 23, 42, 0.92);\n                border: 1px solid rgba(167, 139, 250, 0.4);\n                box-shadow: 0 20px 48px rgba(2, 6, 23, 0.5), 0 0 18px rgba(129, 140, 248, 0.2);\n            }\n            [data-space-theme="on"] .cookie-consent-text {\n                color: #dbe7ff;\n            }\n            [data-space-theme="on"] .cookie-btn-reject {\n                background: rgba(15, 23, 42, 0.72);\n                color: #dbe7ff;\n                border-color: rgba(129, 140, 248, 0.45);\n            }\n            [data-space-theme="on"] .cookie-manage-btn {\n                background: rgba(15, 23, 42, 0.7);\n                color: #e2e8f0;\n                border-color: rgba(167, 139, 250, 0.45);\n                box-shadow: 0 8px 20px rgba(2, 6, 23, 0.35), 0 0 14px rgba(129, 140, 248, 0.18);\n            }\n            [data-space-theme="on"] .cookie-manage-btn::after {\n                color: #bfdbfe;\n            }\n        ';

        document.head.appendChild(style);
    }

    function ensureHostContainer() {
        var container = document.getElementById('cookieConsentContainer');
        if (container) return container;

        container = document.createElement('div');
        container.id = 'cookieConsentContainer';
        container.className = 'cookie-consent-container';

        var footerContent = document.querySelector('.footer .footer-content');
        if (footerContent) {
            footerContent.appendChild(container);
        } else {
            document.body.appendChild(container);
        }

        return container;
    }

    function renderManageButton(consent) {
        var host = ensureHostContainer();
        host.innerHTML = '';

        var button = document.createElement('button');
        button.type = 'button';
        button.id = 'cookieManageBtn';
        button.className = 'cookie-manage-btn ' + (consent === 'accepted' ? 'accepted' : 'rejected');
        button.setAttribute('aria-label', 'Mudar opiniao sobre cookies');

        button.addEventListener('click', function () {
            openConsentPopup();
        });

        host.appendChild(button);
    }

    function closeConsentPopup() {
        var popup = document.getElementById('cookieConsentOverlay');
        if (popup) {
            popup.remove();
        }
    }

    function openConsentPopup() {
        closeConsentPopup();

        var overlay = document.createElement('div');
        overlay.id = 'cookieConsentOverlay';
        overlay.className = 'cookie-consent-overlay';
        overlay.innerHTML = '\n            <div class="cookie-consent-popup" role="dialog" aria-modal="true" aria-labelledby="cookieConsentTitle">\n                <div class="cookie-consent-content">\n                    <div class="cookie-consent-text">\n                        <strong id="cookieConsentTitle">Preferencias de Cookies</strong><br>\n                        Este site utiliza recursos de terceiros (YouTube, Botpress, EmailJS e OpenWeatherMap) para funcionalidades essenciais.\n                        Pode aceitar ou recusar a ativacao destes servicos nao essenciais.\n                        Consulte a <a href="politica-privacidade.html">Politica de Privacidade</a>.\n                    </div>\n                    <div class="cookie-consent-actions">\n                        <button type="button" class="cookie-btn cookie-btn-reject" id="cookieRejectBtn">Recusar</button>\n                        <button type="button" class="cookie-btn cookie-btn-accept" id="cookieAcceptBtn">Aceitar</button>\n                    </div>\n                </div>\n            </div>\n        ';

        document.body.appendChild(overlay);

        document.getElementById('cookieAcceptBtn').addEventListener('click', function () {
            setConsent('accepted');
            renderManageButton('accepted');
            closeConsentPopup();
        });

        document.getElementById('cookieRejectBtn').addEventListener('click', function () {
            setConsent('rejected');
            renderManageButton('rejected');
            closeConsentPopup();
        });
    }

    function init() {
        injectStyles();
        ensureHostContainer();

        var existingConsent = getConsent();
        if (existingConsent === 'accepted' || existingConsent === 'rejected') {
            renderManageButton(existingConsent);
        } else {
            renderManageButton('rejected');
        }

        // Abre ao entrar no site (nova sessao), sem repetir em navegacao interna.
        if (sessionStorage.getItem(SESSION_POPUP_KEY) !== 'true') {
            openConsentPopup();
            sessionStorage.setItem(SESSION_POPUP_KEY, 'true');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
