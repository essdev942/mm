// =================================================================
// 1. تهيئة البيانات وإدارة الحالة المحلية
// =================================================================

/* ---------------- Lightbox gallery ---------------- */
const getLightboxElements = () => {
    const lightbox = document.getElementById('project-lightbox');
    return {
        lightbox,
        lightboxImg: lightbox?.querySelector('.lightbox-img') ?? null,
        lightboxCaption: lightbox?.querySelector('.lightbox-caption') ?? null,
        lightboxLive: lightbox?.querySelector('.lightbox-live') ?? null
    };
};

let currentGallery = [];
let currentIndex = 0;

function openProjectGallery(projectId, startIndex = 0) {
    const proj = projectsData.find(p => p.id === projectId);
    if (!proj || !proj.gallery || proj.gallery.length === 0) return;
    currentGallery = proj.gallery.slice();
    currentIndex = startIndex;
    showLightboxImage(currentIndex);
    const { lightbox, lightboxLive } = getLightboxElements();
    if (lightbox) { lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
    if (lightboxLive) {
        if (proj.url && proj.url !== '#') {
            lightboxLive.href = proj.url;
            lightboxLive.style.display = 'inline-block';
        } else {
            lightboxLive.style.display = 'none';
        }
    }
}

function closeLightbox() {
    const { lightbox } = getLightboxElements();
    if (lightbox) { lightbox.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
}

function showLightboxImage(index) {
    if (!currentGallery || currentGallery.length === 0) return;
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    const src = currentGallery[currentIndex];
    const { lightboxImg, lightboxCaption } = getLightboxElements();
    if (lightboxImg) { lightboxImg.src = src; }
    if (lightboxCaption) { lightboxCaption.textContent = `${currentIndex + 1} / ${currentGallery.length}`; }
}

function nextLightbox() { showLightboxImage(currentIndex + 1); }
function prevLightbox() { showLightboxImage(currentIndex - 1); }

// attach lightbox controls after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const lb = document.getElementById('project-lightbox');
    if (!lb) return;
    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-next').addEventListener('click', nextLightbox);
    lb.querySelector('.lightbox-prev').addEventListener('click', prevLightbox);
    // close on backdrop click
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    // keyboard
    document.addEventListener('keydown', (e) => {
        if (lb.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
        }
    });
});

// كشف نوع جهاز الزائر للتوافقية
const deviceType = {
    isMobile: () => window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1200,
    isDesktop: () => window.innerWidth > 1200
};


function safeLoadArray(key, defaultData) {
    try {
        const raw = localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : null;
        if (!Array.isArray(parsed) || parsed.length === 0) {
            localStorage.setItem(key, JSON.stringify(defaultData));
            return defaultData.slice();
        }
        return parsed;
    } catch (error) {
        localStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData.slice();
    }
}

// إدارة وتخزين بيانات المنتجات والمشاريع محلياً
let defaultProducts = [
    { id: 1, title: "NextJS 14 SaaS Boilerplate", category: "Script", price: "49.00", desc: "Production-ready SaaS starter with PostgreSQL.", img: "https://placehold.co/600x400/1c1c1c/white?text=SaaS+Boilerplate" },
    { id: 2, title: "Automated Lead Engine Bot", category: "Bot", price: "35.00", desc: "Automated pipeline for lead scraping.", img: "https://placehold.co/600x400/1c1c1c/white?text=Lead+Bot" },
    { id: 3, title: "Telegram Payment Bot", category: "Service", price: "50.00", desc: "Bot for payment confirmations.", img: "https://placehold.co/600x400/1c1c1c/white?text=Telegram+Bot" }
];
let products = safeLoadArray('eslam_products', defaultProducts);

let defaultProjects = [
    { id: 1, title: "Eslam.dev Portfolio", img: "https://placehold.co/900x380/1c1c1c/white?text=Project+Alpha", imgHover: "https://placehold.co/900x380/007acc/white?text=Preview+Alpha", url: "https://wap-tau.vercel.app/#home",
        gallery: ["https://placehold.co/800x600", "https://placehold.co/800x601"]
    },
    { id: 2, title: "Napoli Egy Network", img: "https://placehold.co/900x380/1c1c1c/white?text=Napoli+Project", imgHover: "https://placehold.co/900x380/007acc/white?text=Napoli+Hover", url: "https://napoliegy.net",
        gallery: ["https://placehold.co/800x602"]
    },
    { id: 3, title: "Vernis Egy Web", img: "https://placehold.co/900x380/1c1c1c/white?text=Vernis+Project", imgHover: "https://placehold.co/900x380/007acc/white?text=Vernis+Hover", url: "https://vernisegy.com",
        gallery: ["https://placehold.co/800x603"]
    }
];
let projectsData = safeLoadArray('eslam_projects', defaultProjects);

// =================================================================
// 2. ربط الفورمات المحلية عند وجودها
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
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

            products.push({ id: Date.now(), ...product });
            localStorage.setItem('eslam_products', JSON.stringify(products));
            renderAppContent();
            this.reset();
            alert('🚀 Product added locally.');
            resetAndTriggerScrollReveal();
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

            projectsData.push({ id: Date.now(), ...project });
            localStorage.setItem('eslam_projects', JSON.stringify(projectsData));
            renderAppContent();
            this.reset();
            alert('🛡️ Project added locally.');
            resetAndTriggerScrollReveal();
        });
    }
});
// 🟢 تهيئة مكتبة EmailJS برقم الـ Public Key الخاص بك
(function() { 
    if (typeof emailjs !== 'undefined') emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// 📱 كشف نوع الجهاز والتوافقية
// تم تعريف هذه الدوال سابقاً في بداية الملف لضمان عدم التكرار.

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
    } else {
        // If there's a page section without a tab, activate it directly
        const page = document.getElementById(pageId);
        if (page) {
            pages.forEach(p => p.classList.remove('active'));
            page.classList.add('active');
            updateIndexStyle(pageId);
            resetAndTriggerScrollReveal();
        }
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
        if (!Array.isArray(products) || products.length === 0) {
            storeGrid.innerHTML = '<div class="empty-state">No digital products available yet. Check back soon or update your product list.</div>';
        } else {
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
                                <button class="buy-btn" onclick="window.open('https://wa.me/201127134174?text=Hi Eslam, I want to purchase module: ${encodeURIComponent(prod.title)}')">Buy Now</button>
                            </div>
                        </div>
                    </div>`;
            });
        }
    }
    if(inventoryDisplay) {
        inventoryDisplay.innerHTML = '';
        products.forEach(prod => {
            inventoryDisplay.innerHTML += `<li><span>${prod.title} ($${prod.price})</span><button class="delete-btn" onclick="deleteProduct(${prod.id})"><i class="fas fa-trash"></i></button></li>`;
        });
    }

    const projectsGrid = document.getElementById('projects-grid-display');
    const projectsInventory = document.getElementById('projects-inventory-display');
    if(projectsGrid) {
        projectsGrid.innerHTML = '';
        if (!Array.isArray(projectsData) || projectsData.length === 0) {
            projectsGrid.innerHTML = '<div class="empty-state">No projects to display yet. Add new work or reset the project list.</div>';
        } else {
            projectsData.forEach(proj => {
                const galleryJson = JSON.stringify(proj.gallery || []);
                projectsGrid.innerHTML += `
                    <div class="project-card-premium scroll-reveal">
                        <button class="gallery-btn" onclick='event.stopPropagation(); openProjectGallery(${proj.id}, 0);'>Gallery</button>
                        <div class="proj-header">
                            <h3>${proj.title}</h3>
                            <i class="fas fa-arrow-up-right-from-square" title="Open live"></i>
                        </div>
                        <div class="project-img-wrapper" data-gallery='${galleryJson}' data-url='${proj.url}'>
                            <img src="${proj.img}" class="img-primary" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/400x200/1c1c1c/ffffff?text=Eslam+Deployment'">
                            <img src="${proj.imgHover || proj.img}" class="img-hover-alt" alt="${proj.title} Preview" onerror="this.style.display='none'">
                        </div>
                    </div>`;
            });
        }
    }
    if(projectsInventory) {
        projectsInventory.innerHTML = '';
        projectsData.forEach(proj => {
            projectsInventory.innerHTML += `<li><span>${proj.title}</span><button class="delete-btn" onclick="deleteProject(${proj.id})"><i class="fas fa-trash"></i></button></li>`;
        });
    }
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('eslam_products', JSON.stringify(products));
    renderAppContent();
}

function deleteProject(id) {
    projectsData = projectsData.filter(p => p.id !== id);
    localStorage.setItem('eslam_projects', JSON.stringify(projectsData));
    renderAppContent();
}

// مؤشر الماوس البرمجي المستطيل الأزرق
const cyberCursor = document.querySelector('.custom-cyber-cursor');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
let isTouchDevice = false;

// كشف دقيق للأجهزة اللمسية (استخدام الدالة الموحدة)
function detectTouchDevice() {
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    const hasTouchEvent = 'ontouchstart' in window;
    const hasCoarsePointer = window.matchMedia('(pointer:coarse)').matches;
    return hasTouchPoints || hasTouchEvent || hasCoarsePointer;
}

isTouchDevice = deviceType.isMobile();

// إظهار الماوس فقط على الأجهزة غير اللمسية
if (!isTouchDevice && deviceType.isDesktop()) {
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

// 📱 تحسينات Touch للهواتف الذكية
if (deviceType.isMobile()) {
    // إضافة Active State للعناصر عند اللمس
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

    // تحسين الـ intersection observer للهواتف الذكية
    const observerOptions = {
        root: document.querySelector('.code-editor-body'),
        threshold: deviceType.isMobile() ? 0.01 : 0.05,
        rootMargin: deviceType.isMobile() ? "30px 0px 30px 0px" : "50px 0px 50px 0px"
    };

    textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                entry.target.classList.add('revealed');
                // فصل المراقب بعد الكشف لتحسين الأداء
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
    setTimeout(initScrollReveal, deviceType.isMobile() ? 100 : 50);
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
                const notice = document.createElement('p');
                notice.textContent = 'Dashboard feature has been removed. Manage content via code or the admin scripts.';
                terminalOut.appendChild(notice);
            
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

    // فحص الاتصال بالإنترنت قبل الإرسال
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

document.addEventListener('DOMContentLoaded', () => { 
    renderAppContent(); 
    setTimeout(() => { initScrollReveal(); }, 100);
    // Initialize and apply site settings from dashboard
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
    // Theme
    if (settings.theme === 'light') document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');

    // Accent color
    document.documentElement.style.setProperty('--accent-blue', settings.accent);

    // Sidebars
    const left = document.querySelector('.left-sidebar');
    const right = document.querySelector('.right-navigation');
    if (left) left.style.display = settings.showSidebars ? '' : 'none';
    if (right) right.style.display = settings.showSidebars ? '' : 'none';

    // Custom cursor
    const cyberCursorEl = document.querySelector('.custom-cyber-cursor');
    if (cyberCursorEl) cyberCursorEl.style.display = settings.customCursor ? '' : 'none';

    // Base font size
    document.body.style.fontSize = settings.baseFontSize + 'px';

    // Persist
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

    // Elements
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

    // Apply immediately
    applySettings(settings);

    // Live preview on change
    if (accentEl) accentEl.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--accent-blue', e.target.value);
    });
    if (fontsizeEl) fontsizeEl.addEventListener('input', (e) => {
        fontsizeLabel.innerText = e.target.value;
        document.body.style.fontSize = e.target.value + 'px';
    });

    // Save/apply
    if (saveBtn) saveBtn.addEventListener('click', () => {
        const newSettings = {
            theme: themeEl?.value || defaultSettings.theme,
            accent: accentEl?.value || defaultSettings.accent,
            showSidebars: !!sidebarsEl?.checked,
            customCursor: !!cursorEl?.checked,
            baseFontSize: Number(fontsizeEl?.value) || defaultSettings.baseFontSize
        };
        applySettings(newSettings);
            // small visual feedback
            if (saveBtn) {
                saveBtn.classList.add('btn-saved');
                setTimeout(() => saveBtn.classList.remove('btn-saved'), 900);
            }
            showDashToast('Site settings applied');
    });

    // Reset
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

    // re-run scroll reveal for updated content
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
            showDashToast('Image removed');
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
            imageUrlInput.value = '';
            refreshPageImagesList();
            renderPageImages();
            showDashToast('Image URL added');
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

    // populate editor fields
    if (heroInput) heroInput.value = content.heroHTML.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '');
    if (heroHtmlInput) heroHtmlInput.value = content.heroHTML;
    if (heroDescInput) heroDescInput.value = content.heroDesc;
    if (heroImageInput) heroImageInput.value = content.heroImage;
    if (bioInput) bioInput.value = content.bioShort;
    if (watermarkInput) watermarkInput.value = content.watermark;

    // apply content to page
    applyPageContent(content);

    // live preview
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

    // Save
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

    // Reset
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

/* ======================== Profile & Meta Info Editor ======================== */
const PROFILE_KEY = 'eslam_profile_data';
const defaultProfile = {
    name: 'Eslam',
    title: 'Full-Stack & Automation Eng.',
    image: 'https://media.discordapp.net/attachments/1375604483546943549/1510833096793128960/profile.jpeg',
    email: 'esslam942@gmail.com',
    phone: '+20 112 7134 174',
    experience: 4,
    commits: 140,
    languages: 'English, Arabic'
};

function applyProfileData(profile) {
    const profileImg = document.querySelector('.avatar');
    const profileName = document.querySelector('.profile-info h2');
    const profileTitle = document.querySelector('.profile-info p');
    const bioShort = document.querySelector('.bio-short');
    const metaItems = document.querySelectorAll('.meta-item');

    if (profileImg) profileImg.src = profile.image;
    if (profileName) profileName.textContent = profile.name;
    if (profileTitle) profileTitle.textContent = profile.title;

    if (metaItems.length >= 5) {
        metaItems[0].innerHTML = `<i class="fas fa-briefcase"></i> ${profile.experience}+ years of experience`;
        metaItems[1].innerHTML = `<i class="fas fa-code-branch"></i> ${profile.commits}+ Git Commits`;
        metaItems[2].innerHTML = `<i class="fas fa-globe"></i> ${profile.languages}`;
        metaItems[3].innerHTML = `<i class="fas fa-envelope"></i> ${profile.email}`;
        metaItems[4].innerHTML = `<i class="fas fa-phone"></i> ${profile.phone}`;
    }

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function loadProfileData() {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? Object.assign({}, defaultProfile, JSON.parse(raw)) : defaultProfile;
}

document.addEventListener('DOMContentLoaded', () => {
    const profile = loadProfileData();
    applyProfileData(profile);

    // Profile form handlers
    const profileNameEl = document.getElementById('profile-name');
    const profileTitleEl = document.getElementById('profile-title');
    const profileImageEl = document.getElementById('profile-image');
    const profileEmailEl = document.getElementById('profile-email');
    const profilePhoneEl = document.getElementById('profile-phone');
    const metaExperienceEl = document.getElementById('meta-experience');
    const metaCommitsEl = document.getElementById('meta-commits');
    const metaLanguagesEl = document.getElementById('meta-languages');
    const profileSaveBtn = document.getElementById('profile-save');
    const profileResetBtn = document.getElementById('profile-reset');

    if (profileNameEl) profileNameEl.value = profile.name;
    if (profileTitleEl) profileTitleEl.value = profile.title;
    if (profileImageEl) profileImageEl.value = profile.image;
    if (profileEmailEl) profileEmailEl.value = profile.email;
    if (profilePhoneEl) profilePhoneEl.value = profile.phone;
    if (metaExperienceEl) metaExperienceEl.value = profile.experience;
    if (metaCommitsEl) metaCommitsEl.value = profile.commits;
    if (metaLanguagesEl) metaLanguagesEl.value = profile.languages;

    if (profileSaveBtn) profileSaveBtn.addEventListener('click', () => {
        const newProfile = {
            name: profileNameEl?.value || defaultProfile.name,
            title: profileTitleEl?.value || defaultProfile.title,
            image: profileImageEl?.value || defaultProfile.image,
            email: profileEmailEl?.value || defaultProfile.email,
            phone: profilePhoneEl?.value || defaultProfile.phone,
            experience: Number(metaExperienceEl?.value) || defaultProfile.experience,
            commits: Number(metaCommitsEl?.value) || defaultProfile.commits,
            languages: metaLanguagesEl?.value || defaultProfile.languages
        };
        applyProfileData(newProfile);
        alert('✅ Profile updated successfully.');
    });

    if (profileResetBtn) profileResetBtn.addEventListener('click', () => {
        localStorage.removeItem(PROFILE_KEY);
        applyProfileData(defaultProfile);
        if (profileNameEl) profileNameEl.value = defaultProfile.name;
        if (profileTitleEl) profileTitleEl.value = defaultProfile.title;
        if (profileImageEl) profileImageEl.value = defaultProfile.image;
        if (profileEmailEl) profileEmailEl.value = defaultProfile.email;
        if (profilePhoneEl) profilePhoneEl.value = defaultProfile.phone;
        if (metaExperienceEl) metaExperienceEl.value = defaultProfile.experience;
        if (metaCommitsEl) metaCommitsEl.value = defaultProfile.commits;
        if (metaLanguagesEl) metaLanguagesEl.value = defaultProfile.languages;
        alert('⚠️ Profile reset to defaults.');
    });
});

/* ======================== Social Links Editor ======================== */
const SOCIAL_KEY = 'eslam_social_links';
const defaultSocial = {
    whatsapp: 'https://wa.me/201127134174',
    instagram: 'https://www.instagram.com/ess942200',
    tiktok: 'https://www.tiktok.com/@ess.ved',
    github: 'https://github.com/eslam',
    linkedin: 'https://linkedin.com/in/eslam',
    cv: 'assets/cv.pdf'
};

function applySocialLinks(social) {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
    const tiktokLinks = document.querySelectorAll('a[href*="tiktok"]');
    
    whatsappLinks.forEach(link => link.href = social.whatsapp);
    instagramLinks.forEach(link => link.href = social.instagram);
    tiktokLinks.forEach(link => link.href = social.tiktok);
    
    const cvLink = document.querySelector('a[download]');
    if (cvLink) cvLink.href = social.cv;

    localStorage.setItem(SOCIAL_KEY, JSON.stringify(social));
}

function loadSocialLinks() {
    const raw = localStorage.getItem(SOCIAL_KEY);
    return raw ? Object.assign({}, defaultSocial, JSON.parse(raw)) : defaultSocial;
}

document.addEventListener('DOMContentLoaded', () => {
    const social = loadSocialLinks();
    applySocialLinks(social);

    const whatsappEl = document.getElementById('social-whatsapp');
    const instagramEl = document.getElementById('social-instagram');
    const tiktokEl = document.getElementById('social-tiktok');
    const githubEl = document.getElementById('social-github');
    const linkedinEl = document.getElementById('social-linkedin');
    const cvEl = document.getElementById('social-cv');
    const socialSaveBtn = document.getElementById('social-save');
    const socialResetBtn = document.getElementById('social-reset');

    if (whatsappEl) whatsappEl.value = social.whatsapp;
    if (instagramEl) instagramEl.value = social.instagram;
    if (tiktokEl) tiktokEl.value = social.tiktok;
    if (githubEl) githubEl.value = social.github;
    if (linkedinEl) linkedinEl.value = social.linkedin;
    if (cvEl) cvEl.value = social.cv;

    if (socialSaveBtn) socialSaveBtn.addEventListener('click', () => {
        const newSocial = {
            whatsapp: whatsappEl?.value || defaultSocial.whatsapp,
            instagram: instagramEl?.value || defaultSocial.instagram,
            tiktok: tiktokEl?.value || defaultSocial.tiktok,
            github: githubEl?.value || defaultSocial.github,
            linkedin: linkedinEl?.value || defaultSocial.linkedin,
            cv: cvEl?.value || defaultSocial.cv
        };
        applySocialLinks(newSocial);
        showDashToast?.('✅ Social links updated.');
    });

    if (socialResetBtn) socialResetBtn.addEventListener('click', () => {
        localStorage.removeItem(SOCIAL_KEY);
        applySocialLinks(defaultSocial);
        if (whatsappEl) whatsappEl.value = defaultSocial.whatsapp;
        if (instagramEl) instagramEl.value = defaultSocial.instagram;
        if (tiktokEl) tiktokEl.value = defaultSocial.tiktok;
        if (githubEl) githubEl.value = defaultSocial.github;
        if (linkedinEl) linkedinEl.value = defaultSocial.linkedin;
        if (cvEl) cvEl.value = defaultSocial.cv;
        showDashToast?.('⚠️ Social links reset to defaults.');
    });
});

/* ======================== Language Content Editor ======================== */
const LANG_CONTENT_KEY = 'eslam_lang_content';

function showDashToast(msg, timeout = 1400) {
    let toast = document.querySelector('.dash-toast');
    const dashboard = document.querySelector('#dashboard .dashboard-container');
    if (!dashboard) return;
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'dash-toast';
        dashboard.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), timeout);
}

document.addEventListener('DOMContentLoaded', () => {
    // Language content editors
    const enTitle = document.getElementById('lang-en-title');
    const enDesc = document.getElementById('lang-en-desc');
    const techEn = document.getElementById('lang-tech-en');
    const langSave = document.getElementById('lang-save');
    const langReset = document.getElementById('lang-reset');

    // load saved
    try {
        const raw = localStorage.getItem(LANG_CONTENT_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.en) {
                if (enTitle) enTitle.value = parsed.en.heroTitle || '';
                if (enDesc) enDesc.value = parsed.en.heroDesc || '';
                if (techEn) techEn.value = parsed.en.techText || '';
            }
            // Arabic content removed — ignore parsed.ar
        }
    } catch (err) { console.warn('Failed to load lang edits', err); }

    if (langSave) langSave.addEventListener('click', () => {
        const payload = {
            en: {
                heroTitle: enTitle?.value || '',
                heroDesc: enDesc?.value || '',
                techText: techEn?.value || ''
            }
        };
        localStorage.setItem(LANG_CONTENT_KEY, JSON.stringify(payload));
        // Apply immediately by reconstructing content and calling applyLanguage
        const selectedLang = localStorage.getItem('selectedLanguage') || 'en';
        // build content object similar to script-enhanced
        const content = {};
        try {
            const stored = JSON.parse(localStorage.getItem('eslam_lang_content') || '{}');
            // read default content via calling initLanguageSwitcher defaults not accessible here, so merge with existing
            content.en = stored.en || { heroTitle: enTitle?.value || '', heroDesc: enDesc?.value || '', bio: '', techTitle: '', techText: techEn?.value || '' };
        } catch (e) {
            content.en = { heroTitle: enTitle?.value || '', heroDesc: enDesc?.value || '', bio: '', techTitle: '', techText: techEn?.value || '' };
        }
        if (typeof applyLanguage === 'function') applyLanguage(selectedLang, content);
        showDashToast('Translations saved');
    });

    if (langReset) langReset.addEventListener('click', () => {
        localStorage.removeItem(LANG_CONTENT_KEY);
        showDashToast('Translations reset');
        // reload page language
        const selectedLang = localStorage.getItem('selectedLanguage') || 'en';
        if (typeof initLanguageSwitcher === 'function') initLanguageSwitcher();
        if (typeof applyLanguage === 'function') applyLanguage(selectedLang, JSON.parse(localStorage.getItem('eslam_lang_content') || '{}'));
    });

    // add collapse toggles to admin cards for better UX
    document.querySelectorAll('.admin-card').forEach(card => {
        if (card.querySelector('.card-controls')) return;
        const controls = document.createElement('div'); controls.className = 'card-controls';
        const btn = document.createElement('button'); btn.className = 'card-toggle'; btn.type = 'button'; btn.innerText = 'Toggle';
        btn.addEventListener('click', (e) => { e.stopPropagation(); card.classList.toggle('collapsed'); });
        controls.appendChild(btn);
        card.appendChild(controls);
    });
});
