document.addEventListener('DOMContentLoaded', () => {
    const extensionsListContainer = document.getElementById('extensions-list');
    const filterControls = document.querySelector('.filter-controls');
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    let allExtensions = [];
    let currentFilter = 'all';

    // --- Lógica de Tema ---
    const sunIcon = './assets/images/icon-sun.svg';
    const moonIcon = './assets/images/icon-moon.svg';

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.dataset.theme = 'light';
            themeIcon.src = moonIcon; // No tema claro, mostra o ícone da LUA
            themeIcon.alt = 'Mudar para tema escuro';
        } else {
            // Padrão é escuro
            document.body.removeAttribute('data-theme');
            themeIcon.src = sunIcon; // No tema escuro, mostra o ícone do SOL
            themeIcon.alt = 'Mudar para tema claro';
        }
        localStorage.setItem('theme', theme);
    }

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme === 'light' ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --- Lógica de Extensões ---

    async function loadExtensions() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allExtensions = await response.json();
            renderExtensions();
        } catch (error) {
            console.error("Não foi possível carregar as extensões:", error);
            extensionsListContainer.innerHTML = "<p>Erro ao carregar extensões.</p>";
        }
    }

    function renderExtensions() {
        const filteredExtensions = allExtensions.filter(ext => {
            if (currentFilter === 'active') return ext.isActive;
            if (currentFilter === 'inactive') return !ext.isActive;
            return true; // para o filtro 'all'
        });

        extensionsListContainer.innerHTML = '';
        if (filteredExtensions.length === 0) {
            extensionsListContainer.innerHTML = `<p class="empty-message">Nenhuma extensão encontrada.</p>`;
            return;
        }
        
        filteredExtensions.forEach(ext => {
            const originalIndex = allExtensions.indexOf(ext);
            const card = document.createElement('div');
            card.className = `extension-card ${!ext.isActive ? 'inactive' : ''}`;
            card.dataset.index = originalIndex;

            // O comentário que causava o problema foi removido daqui
            card.innerHTML = `
                <div class="card-header">
                    <img src="${ext.logo}" alt="${ext.name} logo">
                    <h3>${ext.name}</h3>
                </div>
                <div class="card-body">
                    <p>${ext.description}</p>
                </div>
                <div class="card-footer">
                    <button class="remove-btn">Remove</button>
                    <label class="toggle-switch">
                        <input type="checkbox" ${ext.isActive ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
            `;
            extensionsListContainer.appendChild(card);
        });
    }

    filterControls.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderExtensions();
        }
    });

    extensionsListContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.extension-card');
        if (!card) return;

        const extensionIndex = parseInt(card.dataset.index, 10);
        if (isNaN(extensionIndex) || extensionIndex >= allExtensions.length) return;

        if (e.target.classList.contains('remove-btn')) {
            allExtensions.splice(extensionIndex, 1);
            renderExtensions();
        }

        const toggleInput = e.target.closest('.toggle-switch input');
        if (toggleInput) {
            allExtensions[extensionIndex].isActive = toggleInput.checked;
            renderExtensions();
        }
    });

    // --- Inicialização da Aplicação ---
    function init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);
        loadExtensions();
    }
    
    init();
});