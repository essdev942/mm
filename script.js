// =================================================================
// 1. تهيئة Firebase وقاعدة البيانات السحابية
// =================================================================
const firebaseConfig = {
    apiKey: "AIzaSyCoju04Ko7nri7TnZhiGXSzfFg-tqiBhfQc",
    authDomain: "eslam-portfolio-db.firebaseapp.com",
    databaseURL: "https://eslam-portfolio-db-default-rtdb.firebaseio.com",
    projectId: "eslam-portfolio-db",
    storageBucket: "eslam-portfolio-db.appspot.com",
    messagingSenderId: "5271284397",
    appId: "1:5271284397:web:f18b8a95ff24f6f9c7424"
};

let db = null;
let dbInitialized = false;

function initFirebase() {
    if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK failed to load. Falling back to local storage.');
        return;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    dbInitialized = true;
    listenToCloudData();
}

function listenToCloudData() {
    if (!db) return;

    db.collection('products').orderBy('updatedAt', 'desc').onSnapshot((snapshot) => {
        products = [];
        snapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        renderAppContent();
    }, (error) => {
        console.error('Firestore products error:', error);
    });

    db.collection('projects').orderBy('updatedAt', 'desc').onSnapshot((snapshot) => {
        projectsData = [];
        snapshot.forEach((doc) => {
            projectsData.push({ id: doc.id, ...doc.data() });
        });
        renderAppContent();
    }, (error) => {
        console.error('Firestore projects error:', error);
    });
}

// كشف نوع جهاز الزائر للتوافقية
const isMobile = () => window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isTablet = () => window.innerWidth > 768 && window.innerWidth <= 1200;
const isDesktop = () => window.innerWidth > 1200;

// إدارة وتخزين بيانات المنتجات والمشاريع محلياً
let defaultProducts = [
    { id: 1, title: "NextJS 14 SaaS Boilerplate", category: "Script", price: "49.00", desc: "Production-ready system with PostgreSQL & iron-clad Auth layer.", img: "images/prod1.jpg" },
    { id: 2, title: "Automated Lead Engine Bot", category: "Bot", price: "35.00", desc: "High-performance Go/Python automated pipeline for business scraping.", img: "images/prod2.jpg" }
];
if (!localStorage.getItem('eslam_products')) { localStorage.setItem('eslam_products', JSON.stringify(defaultProducts)); }
let products = JSON.parse(localStorage.getItem('eslam_products')) || [];

let defaultProjects = [
    { id: 1, title: "Fintech Dashboard Suite", img: "images/proj1.jpg", imgHover: "images/proj1_hover.jpg", url: "https://github.com" },
    { id: 2, title: "AI Cloud Automation Bot", img: "images/proj2.jpg", imgHover: "images/proj2_hover.jpg", url: "https://github.com" }
];
if (!localStorage.getItem('eslam_projects')) { localStorage.setItem('eslam_projects', JSON.stringify(defaultProjects)); }
let projectsData = JSON.parse(localStorage.getItem('eslam_projects')) || [];

// =================================================================
// 2. ربط الفورمات المحلية عند وجودها
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    initFirebase();

    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const product = {
                title: document.getElementById('prod-title').value,
                category: document.getElementById('prod-category').value,
                price: document.getElementById('prod-price').value,
                img: document.getElementById('prod-img').value,
                desc: document.getElementById('prod-desc').value
            };

            if (dbInitialized && db) {
                // إضافة الوقت السحابي فقط عند استقرار اتصال Firebase
                product.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
                db.collection('products').add(product)
                    .then(() => {
                        this.reset();
                        showDashToast?.('🚀 Product pushed to Firebase!');
                        resetAndTriggerScrollReveal();
                    })
                    .catch((error) => {
                        console.error('Failed to add product to Firebase:', error);
                        alert('Failed to add product to Firebase. Check console.');
                    });
            } else {
                const localProduct = { id: Date.now(), ...product, updatedAt: new Date().toISOString() };
                products.push(localProduct);
                localStorage.setItem('eslam_products', JSON.stringify(products));
                renderAppContent();
                this.reset();
                showDashToast?.('🚀 Product pushed locally (offline mode).');
                resetAndTriggerScrollReveal();
            }
        });
    }

    const addProjectForm = document.getElementById('add-project-form');
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const project = {
                title: document.getElementById('proj-title').value,
                img: document.getElementById('proj-img').value,
                imgHover: document.getElementById('proj-img-hover').value,
                url: document.getElementById('proj-url').value
            };

            if (dbInitialized && db) {
                project.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
                db.collection('projects').add(project)
                    .then(() => {
                        this.reset();
                        showDashToast?.('🛡️ Project deployed to Firebase successfully!');
                        resetAndTriggerScrollReveal();
                    })
                    .catch((error) => {
                        console.error('Failed to add project to Firebase:', error);
                        alert('Failed to add project to Firebase. Check console.');
                    });
            } else {
                const localProject = { id: Date.now(), ...project, updatedAt: new Date().toISOString() };
                projectsData.push(localProject);
                localStorage.setItem('eslam_projects', JSON.stringify(projectsData));
                renderAppContent();
                this.reset();
                showDashToast?.('🛡️ Project deployed locally (offline mode).');
                resetAndTriggerScrollReveal();
            }
        });
    }
});

// 🟢 تهيئة مكتبة EmailJS برقم الـ Public Key الخاص بك
(function() { 
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); 
    }
})();

// 🔄 معالج تغيير حجم النافذة
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 📱 منع التكبير/التصغير غير المقصود على الهواتف
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

const tabsContainer = document.getElementById('tabs-container');
const pages = document.querySelectorAll('.page-section');

// التحكم بالتبويبات
document.addEventListener('click', function(e) {
    if(e.target && e.target.closest('.tab')) {
        const tabEl = e.target.closest('.tab');
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tabEl.classList.add('active');

        const target = tabEl.getAttribute('data-target');
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === target) { page.classList.add('active'); }
        });
        updateIndexStyle(target);
        resetAndTriggerScrollReveal();
    }
});

function scrollToSection(pageId) {
    const targetTab = document.querySelector(`.tab[data-target="${pageId}"]`);
    if (targetTab) { 
        targetTab.click(); 
    } else if(pageId === 'dashboard') {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById('dashboard').classList.add('active');
        updateIndexStyle('dashboard');
        resetAndTriggerScrollReveal();
    }
}

function updateIndexStyle(pageId) {
    document.querySelectorAll('.index-links li').forEach(link => {
        link.classList.remove('active-link');
        if(link.getAttribute('onclick') && link.getAttribute('onclick').includes(pageId)) {
            link.classList.add('active-link');
        }
    });
}

// عرض عناصر المتجر والمشاريع مع دعم ميزة الـ Hover
function renderAppContent() {
    const storeGrid = document.querySelector('.store-grid');
    const inventoryDisplay = document.getElementById('inventory-display');
    if(storeGrid) {
        storeGrid.innerHTML = '';
        products.forEach(prod => {
            storeGrid.innerHTML += `
                <div class="product-card scroll-reveal">
                    <div class="product-tag">${prod.category}</div>
                    <img src="${prod.img}" alt="${prod.title}" class="product-img" onerror="this.src='https://via.placeholder.com/300x140/1c1c1c/ffffff?text=Digital+Module'">
                    <div class="product-info">
                        <h3>${prod.title}</h3>
                        <p>${prod.desc}</p>
                        <div class="product-footer">
                            <span class="price">$${prod.price}</span>
                            <button class="buy-btn" onclick="window.open('https://wa.me/201127134174?text=Hi Eslam, I want to purchase module: ${prod.title}')">Buy Now</button>
                        </div>
                    </div>
                </div>`;
        });
    }
    if(inventoryDisplay) {
        inventoryDisplay.innerHTML = '';
        products.forEach(prod => {
            // تم تصليح تمرير الـ id هنا بوضعه داخل علامات تنصيص مفردة
            inventoryDisplay.innerHTML += `<li><span>${prod.title} ($${prod.price})</span><button class="delete-btn" onclick="deleteProduct('${prod.id}')"><i class="fas fa-trash"></i></button></li>`;
        });
    }

    const projectsGrid = document.getElementById('projects-grid-display');
    const projectsInventory = document.getElementById('projects-inventory-display');
    if(projectsGrid) {
        projectsGrid.innerHTML = '';
        projectsData.forEach(proj => {
            projectsGrid.innerHTML += `
                <div class="project-card-premium scroll-reveal" onclick="window.open('${proj.url}', '_blank')">
                    <div class="proj-header">
                        <h3>${proj.title}</h3> 
                        <i class="fas fa-arrow-up-right-from-square"></i>
                    </div>
                    <div class="project-img-wrapper">
                        <img src="${proj.img}" class="img-primary" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/400x200/1c1c1c/ffffff?text=Eslam+Deployment'">
                        <img src="${proj.imgHover || proj.img}" class="img-hover-alt" alt="${proj.title} Preview" onerror="this.style.display='none'">
                    </div>
                </div>`;
        });
    }
    if(projectsInventory) {
        projectsInventory.innerHTML = '';
        projectsData.forEach(proj => {
            // تم تصليح تمرير الـ id هنا بوضعه داخل علامات تنصيص مفردة
            projectsInventory.innerHTML += `<li><span>${proj.title}</span><button class="delete-btn" onclick="deleteProject('${proj.id}')"><i class="fas fa-trash"></i></button></li>`;
        });
    }
}

function deleteProduct(id) {
    if (dbInitialized && db && typeof id === 'string' && isNaN(id)) {
        db.collection('products').doc(id).delete()
            .then(() => {
                showDashToast?.('Product deleted from Firebase');
            })
            .catch((error) => console.error('Failed to delete product from Firebase:', error));
        return;
    }
    products = products.filter(p => p.id != id);
    localStorage.setItem('eslam_products', JSON.stringify(products));
    renderAppContent();
}

function deleteProject(id) {
    if (dbInitialized && db && typeof id === 'string' && isNaN(id)) {
        db.collection('projects').doc(id).delete()
            .then(() => {
                showDashToast?.('Project deleted from Firebase');
            })
            .catch((error) => console.error('Failed to delete project from Firebase:', error));
        return;
    }
    projectsData = projectsData.filter(p => p.id != id);
    localStorage.setItem('eslam_projects', JSON.stringify(projectsData));
    renderAppContent();
}

// مؤشر الماوس البرمجي المستطيل الأزرق
const cyberCursor = document.querySelector('.custom-cyber-cursor');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
let isTouchDevice = false;

function detectTouchDevice() {
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    const hasTouchEvent = 'ontouchstart' in window;
    const hasCoarsePointer = window.matchMedia('(pointer:coarse)').matches;
    return hasTouchPoints || hasTouchEvent || hasCoarsePointer;
}

isTouchDevice = detectTouchDevice();

if (!isTouchDevice && isDesktop()) {
    if (cyberCursor) cyberCursor.style.display = 'block';
    
    window.addEventListener('mousemove', (e) => { 
        mouseX = e.clientX; 
        mouseY = e.clientY; 
    });
    
    function animateCyberCursor() {
        curX += (mouseX - curX) * 0.2; 
        curY += (mouseY - curY) * 0.2;
        if(cyberCursor) { 
            cyberCursor.style.left = curX + 'px'; 
            cyberCursor.style.top = curY + 'px'; 
        }
        requestAnimationFrame(animateCyberCursor);
    }
    animateCyberCursor();
} else {
    if (cyberCursor) cyberCursor.style.display = 'none';
}

const interactives = 'a, button, .tab, .tech-card, .product-card, .project-card-premium, input, textarea, .delete-btn, .index-links li';
document.addEventListener('mouseover', (e) => { if (e.target.closest(interactives)) cyberCursor?.classList.add('hovered'); });
document.addEventListener('mouseout', (e) => { if (e.target.closest(interactives)) cyberCursor?.classList.remove('hovered'); });

// 🌐 معالج اختيار اللغات
const languageSelector = document.getElementById('language-selector');
if (languageSelector) {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelector.value = savedLanguage;
    
    languageSelector.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('selectedLanguage', lang);
        
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'en';
        }
    });
    
    if (savedLanguage === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    }
}

// 📱 تحسينات Touch للهواتف الذكية
if (isMobile()) {
    document.addEventListener('touchstart', (e) => {
        const el = e.target.closest(interactives);
        if (el) el.classList.add('active-touch');
    });
    document.addEventListener('touchend', (e) => {
        document.querySelectorAll('.active-touch').forEach(el => el.classList.remove('active-touch'));
    });
}

// أنيميشن السكرول تدريجياً للأكواد
let textObserver;
function initScrollReveal() {
    const revealTargets = document.querySelectorAll('.scroll-reveal');
    if (textObserver) textObserver.disconnect();

    const observerOptions = {
        root: document.querySelector('.code-editor-body'),
        threshold: isMobile() ? 0.01 : 0.05,
        rootMargin: isMobile() ? "30px 0px 30px 0px" : "50px 0px 50px 0px"
    };

    textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                entry.target.classList.add('revealed');
                textObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealTargets.forEach(target => {
        textObserver.observe(target);
        if (target.getBoundingClientRect().top < window.innerHeight) { target.classList.add('revealed'); }
    });
}

function resetAndTriggerScrollReveal() {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.remove('revealed'));
    setTimeout(initScrollReveal, isMobile() ? 100 : 50);
}

// تيرمينال وبوابة الـ Dashboard
const terminalInput = document.getElementById('terminal-query');
const terminalOut = document.getElementById('terminal-out');
const SECRET_KEY = "eslam123"; 

if(terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            const val = this.value.trim(); if(!val) return;
            const p = document.createElement('p'); p.innerHTML = `<span class="prompt">eslam@developer:~# </span> ${val}`;
            terminalOut.appendChild(p);

            if(val === SECRET_KEY) {
                if(!document.querySelector('.tab[data-target="dashboard"]')) {
                    const newTab = document.createElement('div'); newTab.className = "tab"; newTab.setAttribute('data-target', 'dashboard'); newTab.style.color = "#007acc"; newTab.innerHTML = `<i class="fas fa-user-shield"></i> dashboard.json`;
                    tabsContainer.appendChild(newTab);
                    const newIndex = document.createElement('li'); newIndex.setAttribute('onclick', "scrollToSection('dashboard')"); newIndex.style.color = "#007acc"; newIndex.innerText = "dashboard.root";
                    document.getElementById('index-container').appendChild(newIndex);
                }
                scrollToSection('dashboard');
            } else if (val.toLowerCase() === 'clear') { terminalOut.innerHTML = ''; }
            this.value = ''; terminalOut.scrollTop = terminalOut.scrollHeight;
        }
    });
}

// ارسال فورم الـ Contact
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending Pipeline...";
    submitBtn.style.opacity = "0.6";
    submitBtn.disabled = true;

    if (!navigator.onLine) {
        alert('⚠️ No internet connection. Please check your connection and try again.');
        submitBtn.innerText = originalText;
        submitBtn.style.opacity = "1";
        submitBtn.disabled = false;
        return;
    }

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            alert('📥 System: Your message has been routed to Eslam successfully!');
            this.reset();
            submitBtn.innerText = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
        }, (error) => {
            alert('⚠️ System Error: Failed to transmit data.');
            console.error('Email error:', error);
            submitBtn.innerText = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
        });
});

// ⚡ إدارة وإخفاء شاشة الـ Loading
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startTime = performance.now();
    
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = '';
            }, 600);
        }, Math.max(800, 1000 - (performance.now() - startTime)));
    }
    
    if (isMobile()) document.body.classList.add('is-mobile');
    if (isTablet()) document.body.classList.add('is-tablet');
    if (isDesktop()) document.body.classList.add('is-desktop');
});

document.addEventListener('DOMContentLoaded', () => { 
    renderAppContent(); 
    setTimeout(() => { initScrollReveal(); }, 100);
    initSiteSettings();
    initPageEditor();
    initHomeImageManager();
});

/* ------------------------- Site Settings Logic ------------------------- */
const SETTINGS_KEY = 'eslam_site_settings';
const defaultSettings = {
    theme: 'dark',
    accent: '#007acc',
    showSidebars: true,
    customCursor: true,
    baseFontSize: 14
};

function applySettings(settings) {
    if (settings.theme === 'light') document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');

    document.documentElement.style.setProperty('--accent-blue', settings.accent);

    const left = document.querySelector('.left-sidebar');
    const right = document.querySelector('.right-navigation');
    if (left) left.style.display = settings.showSidebars ? '' : 'none';
    if (right) right.style.display = settings.showSidebars ? '' : 'none';

    const cyberCursorEl = document.querySelector('.custom-cyber-cursor');
    if (cyberCursorEl) cyberCursorEl.style.display = settings.customCursor ? '' : 'none';

    document.body.style.fontSize = settings.baseFontSize + 'px';
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);
    let s = raw ? JSON.parse(raw) : {};
    s = Object.assign({}, defaultSettings, s);
    return s;
}

function initSiteSettings() {
    const settings = loadSettings();

    const themeEl = document.getElementById('settings-theme');
    const accentEl = document.getElementById('settings-accent');
    const sidebarsEl = document.getElementById('settings-sidebars');
    const cursorEl = document.getElementById('settings-cursor');
    const fontsizeEl = document.getElementById('settings-fontsize');
    const fontsizeLabel = document.getElementById('settings-fontsize-label');
    const saveBtn = document.getElementById('settings-save');
    const resetBtn = document.getElementById('settings-reset');

    if (themeEl) themeEl.value = settings.theme;
    if (accentEl) accentEl.value = settings.accent;
    if (sidebarsEl) sidebarsEl.checked = !!settings.showSidebars;
    if (cursorEl) cursorEl.checked = !!settings.customCursor;
    if (fontsizeEl) fontsizeEl.value = settings.baseFontSize;
    if (fontsizeLabel) fontsizeLabel.innerText = settings.baseFontSize;

    applySettings(settings);

    if (accentEl) accentEl.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--accent-blue', e.target.value);
    });
    if (fontsizeEl) fontsizeEl.addEventListener('input', (e) => {
        if (fontsizeLabel) fontsizeLabel.innerText = e.target.value;
        document.body.style.fontSize = e.target.value + 'px';
    });

    if (saveBtn) saveBtn.addEventListener('click', () => {
        const newSettings = {
            theme: themeEl?.value || defaultSettings.theme,
            accent: accentEl?.value || defaultSettings.accent,
            showSidebars: !!sidebarsEl?.checked,
            customCursor: !!cursorEl?.checked,
            baseFontSize: Number(fontsizeEl?.value) || defaultSettings.baseFontSize
        };
        applySettings(newSettings);
        saveBtn.classList.add('btn-saved');
        setTimeout(() => saveBtn.classList.remove('btn-saved'), 900);
        showDashToast?.('Site settings applied');
    });

    if (resetBtn) resetBtn.addEventListener('click', () => {
        localStorage.removeItem(SETTINGS_KEY);
        applySettings(defaultSettings);
        if (themeEl) themeEl.value = defaultSettings.theme;
        if (accentEl) accentEl.value = defaultSettings.accent;
        if (sidebarsEl) sidebarsEl.checked = defaultSettings.showSidebars;
        if (cursorEl) cursorEl.checked = defaultSettings.customCursor;
        if (fontsizeEl) fontsizeEl.value = defaultSettings.baseFontSize;
        if (fontsizeLabel) fontsizeLabel.innerText = defaultSettings.baseFontSize;
        alert('⚠️ Settings reset to defaults.');
    });
}

/* ------------------------- Page Editor Logic ------------------------- */
const PAGE_CONTENT_KEY = 'eslam_page_content';
const defaultPageContent = {
    heroHTML: 'Architecting Digital <br><span>Efficiency.</span>',
    heroDesc: 'I specialize in bridging advanced Frontend frameworks with solid Backend logic, building secure API networks, and automating web scrapers or cloud systems.',
    heroImage: 'https://via.placeholder.com/900x380?text=Hero+Image',
    heroImageAlt: 'Hero Visual',
    bioShort: 'I engineer highly scalable web architectures, microservices, and self-made automation infrastructures that optimize modern business workflows.',
    watermark: 'CORE'
};

function applyPageContent(content) {
    const heroEl = document.querySelector('.hero-title');
    const heroDescEl = document.querySelector('.hero-desc');
    const heroImageEl = document.querySelector('.hero-image');
    const bioEl = document.querySelector('.bio-short');
    const watermarkEl = document.querySelector('.watermark-bg');

    if (heroEl) {
        heroEl.innerHTML = content.heroHTML;
        heroEl.setAttribute('data-text', content.heroHTML.replace(/<[^>]*>/g, '').trim());
    }
    if (heroDescEl) heroDescEl.innerText = content.heroDesc;
    if (heroImageEl) {
        heroImageEl.src = content.heroImage || defaultPageContent.heroImage;
        heroImageEl.alt = content.heroImageAlt || defaultPageContent.heroImageAlt;
    }
    if (bioEl) bioEl.innerText = content.bioShort;
    if (watermarkEl) watermarkEl.innerText = content.watermark;

    resetAndTriggerScrollReveal();
}

function loadPageContent() {
    const raw = localStorage.getItem(PAGE_CONTENT_KEY);
    let c = raw ? JSON.parse(raw) : {};
    c = Object.assign({}, defaultPageContent, c);
    return c;
}

const PAGE_IMAGES_KEY = 'eslam_page_images';

function loadPageImages() {
    const raw = localStorage.getItem(PAGE_IMAGES_KEY);
    return raw ? JSON.parse(raw) : [];
}

function savePageImages(images) {
    localStorage.setItem(PAGE_IMAGES_KEY, JSON.stringify(images));
}

function renderPageImages() {
    const gallery = document.getElementById('home-image-gallery');
    if (!gallery) return;
    const images = loadPageImages();
    gallery.innerHTML = '';
    if (!images.length) {
        gallery.innerHTML = '<div class="gallery-placeholder">Add image URLs from the dashboard to populate this gallery.</div>';
        return;
    }
    images.forEach((url, index) => {
        const card = document.createElement('div');
        card.className = 'hero-gallery-item';
        card.innerHTML = `<img src="${url}" alt="Home image ${index + 1}" onerror="this.src='https://via.placeholder.com/900x380?text=Invalid+Image'">`;
        gallery.appendChild(card);
    });
}

function refreshPageImagesList() {
    const list = document.getElementById('page-images-list');
    if (!list) return;
    const images = loadPageImages();
    if (!images.length) {
        list.innerHTML = '<li class="gallery-empty">No images added yet.</li>';
        return;
    }
    list.innerHTML = images.map((url, index) => `
        <li>
            <span>${url}</span>
            <button type="button" class="delete-btn" data-index="${index}">Remove</button>
        </li>
    `).join('');
    list.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = Number(btn.getAttribute('data-index'));
            const updated = loadPageImages().filter((_, i) => i !== index);
            savePageImages(updated);
            refreshPageImagesList();
            renderPageImages();
            showDashToast?.('Image removed');
        });
    });
}

function initHomeImageManager() {
    const imageUrlInput = document.getElementById('page-image-url');
    const addButton = document.getElementById('page-add-image');

    refreshPageImagesList();
    renderPageImages();

    if (addButton) {
        addButton.addEventListener('click', () => {
            const url = imageUrlInput?.value.trim();
            if (!url) {
                alert('Please enter a valid image URL.');
                return;
            }
            const images = loadPageImages();
            images.unshift(url);
            savePageImages(images);
            if (imageUrlInput) imageUrlInput.value = '';
            refreshPageImagesList();
            renderPageImages();
            showDashToast?.('Image URL added');
        });
    }
}

function initPageEditor() {
    const heroInput = document.getElementById('page-hero-title');
    const heroHtmlInput = document.getElementById('page-hero-html');
    const heroDescInput = document.getElementById('page-hero-desc');
    const heroImageInput = document.getElementById('page-hero-image');
    const bioInput = document.getElementById('page-bio-short');
    const watermarkInput = document.getElementById('page-watermark');
    const saveBtn = document.getElementById('page-save');
    const resetBtn = document.getElementById('page-reset');

    const content = loadPageContent();

    if (heroInput) heroInput.value = content.heroHTML.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '');
    if (heroHtmlInput) heroHtmlInput.value = content.heroHTML;
    if (heroDescInput) heroDescInput.value = content.heroDesc;
    if (heroImageInput) heroImageInput.value = content.heroImage;
    if (bioInput) bioInput.value = content.bioShort;
    if (watermarkInput) watermarkInput.value = content.watermark;

    applyPageContent(content);

    if (heroHtmlInput) heroHtmlInput.addEventListener('input', (e) => {
        const preview = Object.assign({}, content, { heroHTML: e.target.value });
        applyPageContent(preview);
    });
    if (heroDescInput) heroDescInput.addEventListener('input', (e) => {
        const preview = Object.assign({}, content, { heroDesc: e.target.value });
        applyPageContent(preview);
    });
    if (heroImageInput) heroImageInput.addEventListener('input', (e) => {
        const preview = Object.assign({}, content, { heroImage: e.target.value });
        applyPageContent(preview);
    });
    if (bioInput) bioInput.addEventListener('input', (e) => {
        const preview = Object.assign({}, content, { bioShort: e.target.value });
        applyPageContent(preview);
    });
    if (watermarkInput) watermarkInput.addEventListener('input', (e) => {
        const preview = Object.assign({}, content, { watermark: e.target.value });
        applyPageContent(preview);
    });

    if (saveBtn) saveBtn.addEventListener('click', () => {
        const newContent = {
            heroHTML: heroHtmlInput?.value || defaultPageContent.heroHTML,
            heroDesc: heroDescInput?.value || defaultPageContent.heroDesc,
            heroImage: heroImageInput?.value || defaultPageContent.heroImage,
            bioShort: bioInput?.value || defaultPageContent.bioShort,
            watermark: watermarkInput?.value || defaultPageContent.watermark
        };
        localStorage.setItem(PAGE_CONTENT_KEY, JSON.stringify(newContent));
        applyPageContent(newContent);
        alert('✅ Page content saved.');
    });

    // 🟢 تم تكملة الجزء المقطوع بالكامل وتصليحه هنا:
    if (resetBtn) resetBtn.addEventListener('click', () => {
        localStorage.removeItem(PAGE_CONTENT_KEY);
        applyPageContent(defaultPageContent);
        if (heroHtmlInput) heroHtmlInput.value = defaultPageContent.heroHTML;
        if (heroDescInput) heroDescInput.value = defaultPageContent.heroDesc;
        if (heroImageInput) heroImageInput.value = defaultPageContent.heroImage;
        if (bioInput) bioInput.value = defaultPageContent.bioShort;
        if (watermarkInput) watermarkInput.value = defaultPageContent.watermark;
        alert('⚠️ Page content reset to defaults.');
    });
}

// دالة مساعدة لعرض التنبيهات الصغيرة في لوحة التحكم بشكل سلس
function showDashToast(message) {
    console.log("System Toast:", message);
    // لو عندك عنصر في الـ HTML مخصص للـ Toast هيظهر هنا تلقائياً
    const toastEl = document.getElementById('dash-toast');
    if (toastEl) {
        toastEl.innerText = message;
        toastEl.classList.add('show');
        setTimeout(() => toastEl.classList.remove('show'), 3000);
    }
}
