/**
 * Données des apps
 * - link: lien direct Google Drive (uc?export=download&id=FILE_ID)
 * - sha: SHA256 calculé localement et collé ici
 * - updated: date ISO ou friendly
 *
 * Pour ajouter une app: ajouter un objet ici puis push sur GitHub.
 */
const apps = [{
        id: "e-chimie",
        name: "E-Chimie",
        desc: "Calculatrices (molarité, normalité, pH), quiz Exetat, tableau de bord de progression.",
        img: "assets/presentation.png",
        link: "https://drive.google.com/file/d/1MQXdyHK5x_BNEjeCzHx_KeRWZLM_7f-S/view?usp=sharing",
        sha: " 96:46:C0:74:FB:79:11:28:24:95:49:BD:47:8E:9A:97:A1:2D:3C:B9:9C:01:8B:8A:3B:EB:BD:3C:19:2C:9D:57",
        updated: "2025-09-01"
    }
    // Ajoute d'autres apps ici...
];

/* --- Utils DOM --- */
const appsGrid = document.getElementById('apps-grid');
const hashBody = document.getElementById('hash-table-body');
const modal = document.getElementById('app-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function createAppCard(app) {
    const card = document.createElement('article');
    card.className = 'app-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
        <div class="app-card-inner">
          <img src="${app.img}" alt="Aperçu ${app.name}" loading="lazy" class="app-thumb">
          <div class="app-meta">
            <h3 class="app-name">${app.name}</h3>
            <p class="app-desc">${app.desc}</p>
            <div class="app-actions">
              <button class="btn btn-outline btn-details" data-app="${app.id}">Voir détails</button>
              <a class="btn btn-primary" href="${app.link}" rel="noopener noreferrer" target="_blank" download>⬇️ Télécharger</a>
            </div>
          </div>
        </div>
      `;
    return card;
}

function populate() {
    apps.forEach(app => {
        // Grid card
        appsGrid.appendChild(createAppCard(app));

        // Hash table row
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${app.name}</td><td><code class="mono">${app.sha || '—'}</code></td><td>${app.updated || '—'}</td>`;
        hashBody.appendChild(tr);
    });

    // Add event listeners for details
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.currentTarget.dataset.app;
            const app = apps.find(a => a.id === id);
            openModal(app);
        });
    });
}

function openModal(app) {
    modalBody.innerHTML = `
        <h2>${app.name}</h2>
        <p class="muted">${app.desc}</p>
        <img src="${app.img}" alt="Screenshot ${app.name}" loading="lazy" class="modal-img">
        <dl class="modal-dl">
          <dt>SHA256</dt><dd><code class="mono">${app.sha || 'Non fourni'}</code></dd>
          <dt>Lien</dt><dd><a href="${app.link}" target="_blank" rel="noopener noreferrer" class="mono">${app.link}</a></dd>
          <dt>Dernière mise à jour</dt><dd>${app.updated || '—'}</dd>
        </dl>
        <div class="modal-actions">
          <a class="btn btn-primary" href="${app.link}" target="_blank" rel="noopener noreferrer" download>⬇️ Télécharger</a>
          <button id="verify-btn" class="btn btn-ghost">Comment vérifier le SHA256 ?</button>
        </div>
      `;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');

    document.getElementById('verify-btn').addEventListener('click', () => {
        window.open('securite-guide.html', '_blank');
    });
}

function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    modalBody.innerHTML = '';
}

// Init
populate();

// Modal controls
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Small nav toggle for mobile
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');
navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
});


// Close nav on link click (mobile)

// Filtrage des cartes APK par catégorie + scroll vers le bouton de téléchargement E-Chimie
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        document.querySelectorAll('.app-card').forEach(card => {
            if (cat === 'autres' || card.dataset.category === cat) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        // Si E-Chimie, scroll vers le bouton de téléchargement
        if (cat === 'chimie') {
            const chimieBtn = document.querySelector('.app-card[data-category="chimie"] .btn-primary');
            if (chimieBtn) {
                setTimeout(() => {
                    chimieBtn.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 200);
            }
        }
    });
});