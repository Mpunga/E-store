/**
 * Données des apps
 * - link: lien direct Google Drive (uc?export=download&id=FILE_ID)
 * - sha: SHA256 calculé localement et collé ici
 * - updated: date ISO ou friendly
 */
const apps = [{
        id: "e-chimie",
        name: "E-Chimie",
        category: "chimie",
        desc: "Calculatrices (molarité, normalité, pH), quiz Exetat, tableau de bord de progression.",
        img: "assets/module2.jpg",
        link: "https://drive.google.com/file/d/1MQXdyHK5x_BNEjeCzHx_KeRWZLM_7f-S/view?usp=sharing",
        sha: "96:46:C0:74:FB:79:11:28:24:95:49:BD:47:8E:9A:97:A1:2D:3C:B9:9C:01:8B:8A:3B:EB:BD:3C:19:2C:9D:57",
        updated: "2025-09-01",
        rating: "4.8 (1.2k)"
    },
    {
        id: "e-physique",
        name: "E-Physique",
        category: "physique",
        desc: "Formulaires et calculs (mécanique, électricité, optique), conversions d’unités, quiz Exetat et fiches synthétiques.",
        img: "assets/logo physique 3.jpg",
        link: "https://drive.google.com/file/d/1K3dbYg76sRK1H0FvsJRXMu1rb49aK3dC/view?usp=drive_link",
        sha: "",
        updated: "2025-09-21",
        rating: "4.5 (980)"
    }
];

/* --- Utils DOM --- */
const appsGrid = document.getElementById('apps-grid');
const modal = document.getElementById('app-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function createAppCard(app) {
    const card = document.createElement('article');
    card.className = 'app-card';
    card.setAttribute('role', 'listitem');
    if (app.category) card.dataset.category = app.category;
    card.innerHTML = `
        <img src="${app.img}" alt="Aperçu ${app.name}" loading="lazy" class="w-full h-40 object-cover">
        <div class="p-4">
            <h3 class="text-lg font-bold mb-2">${app.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${app.desc}</p>
            <div class="flex items-center mb-2">
                <span class="rating">★★★★★</span>
                <span class="text-sm text-gray-600 ml-2">${app.rating}</span>
            </div>
            <div class="flex space-x-2">
                <button class="install-btn w-full" onclick="window.open('${app.link}', '_blank')">Installer</button>
                <button class="details-btn w-full" data-app="${app.id}">Détails</button>
            </div>
        </div>
    `;
    return card;
}

function populate() {
    if (!appsGrid) return;
    apps.forEach(app => {
        appsGrid.appendChild(createAppCard(app));
    });

    // Add event listeners for details buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.currentTarget.dataset.app;
            const app = apps.find(a => a.id === id);
            if (app) openModal(app);
        });
    });
}

function openModal(app) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = `
        <h2 class="text-xl font-bold mb-3">${app.name}</h2>
        <p class="text-gray-600 mb-4">${app.desc}</p>
        <img src="${app.img}" alt="Screenshot ${app.name}" loading="lazy" class="w-full h-48 object-cover rounded-lg mb-4">
        <dl class="grid grid-cols-2 gap-2 mb-4">
            <dt class="font-semibold">SHA256</dt><dd><code class="text-sm">${app.sha || 'Non fourni'}</code></dd>
            <dt class="font-semibold">Lien</dt><dd><a href="${app.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600">${app.link}</a></dd>
            <dt class="font-semibold">Mise à jour</dt><dd>${app.updated || '—'}</dd>
            <dt class="font-semibold">Évaluation</dt><dd>${app.rating}</dd>
        </dl>
        <div class="flex space-x-2">
            <a class="install-btn w-full text-center" href="${app.link}" target="_blank" rel="noopener noreferrer" download>Installer</a>
            <button id="verify-btn" class="details-btn w-full">Vérifier SHA256</button>
        </div>
    `;
    modal.classList.add('open');
    document.body.classList.add('modal-open');

    const verifyBtn = document.getElementById('verify-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            window.open('securite-guide.html', '_blank');
        });
    }
}

function closeModal() {
    if (!modal || !modalBody) return;
    modal.classList.remove('open');
    modalBody.innerHTML = '';
    document.body.classList.remove('modal-open');
}

// Init after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    populate();

    // Modal controls
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksMobile = document.querySelector('.nav-links-mobile');
    if (hamburger && navLinksMobile) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinksMobile.classList.toggle('hidden');
        });
    }

    // Category filter
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            document.querySelectorAll('.app-card').forEach(card => {
                card.style.display = category === 'all' || card.dataset.category === category ? '' : 'none';
            });
            if (category === 'chimie') {
                const chimieBtn = document.querySelector('.app-card[data-category="chimie"] .install-btn');
                if (chimieBtn) {
                    chimieBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
});