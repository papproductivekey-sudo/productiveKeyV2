<<<<<<< HEAD
// Space Theme Functionality (Normal + Espacial)
function initDarkMode() {
    if (document.documentElement.dataset.darkModeReady === 'true') {
        return;
    }
    document.documentElement.dataset.darkModeReady = 'true';

    const SPACE_THEME_KEY = 'pk_space_theme';
    const PURPLE_THEME_KEY = 'pk_purple_theme';

    // Remove qualquer estado legado do modo escuro
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');

    const oldThemeToggle = document.querySelector('.theme-toggle');
    if (oldThemeToggle) {
        oldThemeToggle.remove();
    }

    let spaceToggle = document.querySelector('.space-toggle');
    if (!spaceToggle) {
        spaceToggle = document.createElement('button');
        spaceToggle.className = 'space-toggle';
        spaceToggle.innerHTML = '🪐';
        spaceToggle.setAttribute('aria-label', 'Ativar tema espacial secreto');
        spaceToggle.setAttribute('title', 'Easter egg: tema espacial');
        spaceToggle.setAttribute('aria-pressed', 'false');
        document.body.appendChild(spaceToggle);
    }

    let purpleToggle = document.querySelector('.purple-toggle');
    if (!purpleToggle) {
        purpleToggle = document.createElement('button');
        purpleToggle.className = 'purple-toggle';
        purpleToggle.innerHTML = '🪟';
        purpleToggle.setAttribute('aria-label', 'Ativar tema Windows XP');
        purpleToggle.setAttribute('title', 'Tema Windows XP');
        purpleToggle.setAttribute('aria-pressed', 'false');
        document.body.appendChild(purpleToggle);
    }

    function applyTheme(mode) {
        const isSpace = mode === 'space';
        const isPurple = mode === 'purple';

        if (isSpace) {
            document.documentElement.setAttribute('data-space-theme', 'on');
            document.documentElement.removeAttribute('data-purple-theme');
            localStorage.setItem(SPACE_THEME_KEY, 'on');
            localStorage.setItem(PURPLE_THEME_KEY, 'off');
        } else if (isPurple) {
            document.documentElement.setAttribute('data-purple-theme', 'on');
            document.documentElement.removeAttribute('data-space-theme');
            localStorage.setItem(PURPLE_THEME_KEY, 'on');
            localStorage.setItem(SPACE_THEME_KEY, 'off');
        } else {
            document.documentElement.removeAttribute('data-space-theme');
            document.documentElement.removeAttribute('data-purple-theme');
            localStorage.setItem(SPACE_THEME_KEY, 'off');
            localStorage.setItem(PURPLE_THEME_KEY, 'off');
        }

        spaceToggle.innerHTML = isSpace ? '🌌' : '🪐';
        spaceToggle.setAttribute('aria-label', isSpace ? 'Desativar tema espacial secreto' : 'Ativar tema espacial secreto');
        spaceToggle.setAttribute('aria-pressed', isSpace ? 'true' : 'false');

        purpleToggle.innerHTML = isPurple ? '💠' : '🪟';
        purpleToggle.setAttribute('aria-label', isPurple ? 'Desativar tema Windows XP' : 'Ativar tema Windows XP');
        purpleToggle.setAttribute('title', isPurple ? 'Desativar tema Windows XP' : 'Tema Windows XP');
        purpleToggle.setAttribute('aria-pressed', isPurple ? 'true' : 'false');
    }

    const savedSpaceTheme = localStorage.getItem(SPACE_THEME_KEY);
    const savedPurpleTheme = localStorage.getItem(PURPLE_THEME_KEY);
    // Tema espacial como padrão quando ainda não existe preferência guardada.
    if (savedPurpleTheme === null && savedSpaceTheme === null) {
        applyTheme('space');
    } else if (savedPurpleTheme === 'on') {
        applyTheme('purple');
    } else if (savedSpaceTheme === 'on') {
        applyTheme('space');
    } else {
        applyTheme('normal');
    }

    spaceToggle.addEventListener('click', () => {
        const isEnabled = document.documentElement.getAttribute('data-space-theme') === 'on';
        applyTheme(isEnabled ? 'normal' : 'space');
    });

    purpleToggle.addEventListener('click', () => {
        const isEnabled = document.documentElement.getAttribute('data-purple-theme') === 'on';
        applyTheme(isEnabled ? 'normal' : 'purple');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}
=======
// Space Theme Functionality (Normal + Espacial)
function initDarkMode() {
    if (document.documentElement.dataset.darkModeReady === 'true') {
        return;
    }
    document.documentElement.dataset.darkModeReady = 'true';

    const SPACE_THEME_KEY = 'pk_space_theme';
    const PURPLE_THEME_KEY = 'pk_purple_theme';

    // Remove qualquer estado legado do modo escuro
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');

    const oldThemeToggle = document.querySelector('.theme-toggle');
    if (oldThemeToggle) {
        oldThemeToggle.remove();
    }

    let spaceToggle = document.querySelector('.space-toggle');
    if (!spaceToggle) {
        spaceToggle = document.createElement('button');
        spaceToggle.className = 'space-toggle';
        spaceToggle.innerHTML = '🪐';
        spaceToggle.setAttribute('aria-label', 'Ativar tema espacial secreto');
        spaceToggle.setAttribute('title', 'Easter egg: tema espacial');
        spaceToggle.setAttribute('aria-pressed', 'false');
        document.body.appendChild(spaceToggle);
    }

    let purpleToggle = document.querySelector('.purple-toggle');
    if (!purpleToggle) {
        purpleToggle = document.createElement('button');
        purpleToggle.className = 'purple-toggle';
        purpleToggle.innerHTML = '🪟';
        purpleToggle.setAttribute('aria-label', 'Ativar tema Windows XP');
        purpleToggle.setAttribute('title', 'Tema Windows XP');
        purpleToggle.setAttribute('aria-pressed', 'false');
        document.body.appendChild(purpleToggle);
    }

    function applyTheme(mode) {
        const isSpace = mode === 'space';
        const isPurple = mode === 'purple';

        if (isSpace) {
            document.documentElement.setAttribute('data-space-theme', 'on');
            document.documentElement.removeAttribute('data-purple-theme');
            localStorage.setItem(SPACE_THEME_KEY, 'on');
            localStorage.setItem(PURPLE_THEME_KEY, 'off');
        } else if (isPurple) {
            document.documentElement.setAttribute('data-purple-theme', 'on');
            document.documentElement.removeAttribute('data-space-theme');
            localStorage.setItem(PURPLE_THEME_KEY, 'on');
            localStorage.setItem(SPACE_THEME_KEY, 'off');
        } else {
            document.documentElement.removeAttribute('data-space-theme');
            document.documentElement.removeAttribute('data-purple-theme');
            localStorage.setItem(SPACE_THEME_KEY, 'off');
            localStorage.setItem(PURPLE_THEME_KEY, 'off');
        }

        spaceToggle.innerHTML = isSpace ? '🌌' : '🪐';
        spaceToggle.setAttribute('aria-label', isSpace ? 'Desativar tema espacial secreto' : 'Ativar tema espacial secreto');
        spaceToggle.setAttribute('aria-pressed', isSpace ? 'true' : 'false');

        purpleToggle.innerHTML = isPurple ? '💠' : '🪟';
        purpleToggle.setAttribute('aria-label', isPurple ? 'Desativar tema Windows XP' : 'Ativar tema Windows XP');
        purpleToggle.setAttribute('title', isPurple ? 'Desativar tema Windows XP' : 'Tema Windows XP');
        purpleToggle.setAttribute('aria-pressed', isPurple ? 'true' : 'false');
    }

    const savedSpaceTheme = localStorage.getItem(SPACE_THEME_KEY);
    const savedPurpleTheme = localStorage.getItem(PURPLE_THEME_KEY);
    if (savedPurpleTheme === 'on') {
        applyTheme('purple');
    } else if (savedSpaceTheme === 'on') {
        applyTheme('space');
    } else {
        applyTheme('normal');
    }

    spaceToggle.addEventListener('click', () => {
        const isEnabled = document.documentElement.getAttribute('data-space-theme') === 'on';
        applyTheme(isEnabled ? 'normal' : 'space');
    });

    purpleToggle.addEventListener('click', () => {
        const isEnabled = document.documentElement.getAttribute('data-purple-theme') === 'on';
        applyTheme(isEnabled ? 'normal' : 'purple');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}
>>>>>>> 45bf764cc3ef9c6910a2db17f971766eaa5ffeef
