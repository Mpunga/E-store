/**
 * Données des apps
 * - link: lien direct Google Drive (uc?export=download&id=FILE_ID)
 * - sha: SHA256 calculé localement et collé ici
 * - updated: date ISO ou friendly
 */
var apps = [{
        id: "e-chimie",
        name: "E-Chimie",
        category: "chimie",
        desc: "Calculatrices (molarité, normalité, pH), quiz Exetat, tableau de bord de progression.",
        img: "assets/module2.jpg",
        link: "https://drive.google.com/file/d/1Jf_7Ksuq9RhqxdEqhnoaBn39DXhhm237/view?usp=sharing",
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
        link: "https://drive.google.com/file/d/1g1iHc5Ke5frE7rkzEtcAcdIqoyIpDuEs/view?usp=sharing",
        sha: "96:46:C0:74:FB:79:11:28:24:95:49:BD:47:8E:9A:97:A1:2D:3C:B9:9C:01:8B:8A:3B:EB:BD:3C:19:2C:9D:57",
        updated: "2025-09-21",
        rating: "4.5 (980)"
    }
];

/* --- Utils DOM --- */
var appsGrid = document.getElementById('apps-grid');
var modal = document.getElementById('app-modal');
var modalBody = document.getElementById('modal-body');
var modalClose = document.getElementById('modal-close');

function createAppCard(app) {
    var card = document.createElement('article');
    card.className = 'app-card';
    card.setAttribute('role', 'listitem');
    if (app.category) card.setAttribute('data-category', app.category);
    var imgSrc = encodeURI(app.img);
    var html = '' +
        '<img src="' + imgSrc + '" alt="Aperçu ' + app.name + '" loading="lazy" class="w-full h-40 object-cover">' +
        '<div class="p-4">' +
        '  <h3 class="text-lg font-bold mb-2">' + app.name + '</h3>' +
        '  <p class="text-sm text-gray-600 mb-2">' + app.desc + '</p>' +
        '  <div class="flex items-center mb-2">' +
        '    <span class="rating">★★★★★</span>' +
        '    <span class="text-sm text-gray-600 ml-2">' + (app.rating || '') + '</span>' +
        '  </div>' +
        '  <div class="flex space-x-2">' +
        '    <a class="install-btn w-full text-center" href="' + app.link + '" target="_blank" rel="noopener noreferrer">Installer</a>' +
        '    <button class="details-btn w-full" data-app="' + app.id + '">Détails</button>' +
        '  </div>' +
        '</div>';
    card.innerHTML = html;
    return card;
}

function populate() {
    if (!appsGrid) return;
    for (var i = 0; i < apps.length; i++) {
        appsGrid.appendChild(createAppCard(apps[i]));
    }
    // Add event listeners for details buttons
    var buttons = document.querySelectorAll('.details-btn');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener('click', function(e) {
            var id = this.getAttribute('data-app');
            for (var k = 0; k < apps.length; k++) {
                if (apps[k].id === id) {
                    openModal(apps[k]);
                    break;
                }
            }
        });
    }
}

function openModal(app) {
    if (!modal || !modalBody) return;
    var html = '' +
        '<h2 class="text-xl font-bold mb-3">' + app.name + '</h2>' +
        '<p class="text-gray-600 mb-4">' + app.desc + '</p>' +
        '<img src="' + encodeURI(app.img) + '" alt="Screenshot ' + app.name + '" loading="lazy" class="w-full h-48 object-cover rounded-lg mb-4">' +
        '<dl class="grid grid-cols-2 gap-2 mb-4">' +
        '  <dt class="font-semibold">SHA256</dt><dd><code class="text-sm">' + (app.sha || 'Non fourni') + '</code></dd>' +
        '  <dt class="font-semibold">Lien</dt><dd><a href="' + app.link + '" target="_blank" rel="noopener noreferrer" class="text-blue-600">' + app.link + '</a></dd>' +
        '  <dt class="font-semibold">Mise à jour</dt><dd>' + (app.updated || '—') + '</dd>' +
        '  <dt class="font-semibold">Évaluation</dt><dd>' + (app.rating || '') + '</dd>' +
        '</dl>' +
        '<div class="flex space-x-2">' +
        '  <a class="install-btn w-full text-center" href="' + app.link + '" target="_blank" rel="noopener noreferrer" download>Installer</a>' +
        '  <button id="verify-btn" class="details-btn w-full">Vérifier SHA256</button>' +
        '</div>';
    modalBody.innerHTML = html;
    modal.classList.add('open');
    document.body.classList.add('modal-open');

    var verifyBtn = document.getElementById('verify-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    populate();

    // Modal controls
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        var key = e.key || e.keyCode;
        if ((key === 'Escape' || key === 27) && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Hamburger menu
    var hamburger = document.querySelector('.hamburger');
    var navLinksMobile = document.querySelector('.nav-links-mobile');
    if (hamburger && navLinksMobile) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            navLinksMobile.classList.toggle('hidden');
        });
    }

    // Category filter
    var catBtns = document.querySelectorAll('.category-btn');
    for (var c = 0; c < catBtns.length; c++) {
        catBtns[c].addEventListener('click', function() {
            for (var d = 0; d < catBtns.length; d++) catBtns[d].classList.remove('active');
            this.classList.add('active');
            var category = this.getAttribute('data-category');
            var cards = document.querySelectorAll('.app-card');
            for (var e = 0; e < cards.length; e++) {
                var cardCat = cards[e].getAttribute('data-category');
                cards[e].style.display = (category === 'all' || category === 'autres' || cardCat === category) ? '' : 'none';
            }
            if (category === 'chimie') {
                var chimieBtn = document.querySelector('.app-card[data-category="chimie"] .install-btn');
                if (chimieBtn && chimieBtn.scrollIntoView) {
                    try { chimieBtn.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (err) { chimieBtn.scrollIntoView(); }
                }
            }
        });
    }
});