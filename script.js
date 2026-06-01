// 🟢 تهيئة مكتبة EmailJS برقم الـ Public Key الخاص بك
(function() { 
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// إدارة وتخزين البيانات داخلياً
let defaultProducts = [
    { id: 1, title: "NextJS 14 SaaS Boilerplate", category: "Script", price: "49.00", desc: "Production-ready system with PostgreSQL & iron-clad Auth layer.", img: "images/prod1.jpg" },
    { id: 2, title: "Automated Lead Engine Bot", category: "Bot", price: "35.00", desc: "High-performance Go/Python automated pipeline for business scraping.", img: "images/prod2.jpg" }
];
if (!localStorage.getItem('eslam_products')) { localStorage.setItem('eslam_products', JSON.stringify(defaultProducts)); }
let products = JSON.parse(localStorage.getItem('eslam_products'));

let defaultProjects = [
    { id: 1, title: "Fintech Dashboard Suite", img: "images/proj1.jpg", imgHover: "images/proj1_hover.jpg", url: "https://github.com" },
    { id: 2, title: "AI Cloud Automation Bot", img: "images/proj2.jpg", imgHover: "images/proj2_hover.jpg", url: "https://github.com" }
];
if (!localStorage.getItem('eslam_projects')) { localStorage.setItem('eslam_projects', JSON.stringify(defaultProjects)); }
let projectsData = JSON.parse(localStorage.getItem('eslam_projects'));

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
            inventoryDisplay.innerHTML += `<li><span>${prod.title} ($${prod.price})</span><button class="delete-btn" onclick="deleteProduct(${prod.id})"><i class="fas fa-trash"></i></button></li>`;
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
            projectsInventory.innerHTML += `<li><span>${proj.title}</span><button class="delete-btn" onclick="deleteProject(${proj.id})"><i class="fas fa-trash"></i></button></li>`;
        });
    }
}

document.getElementById('add-product-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    products.push({
        id: Date.now(),
        title: document.getElementById('prod-title').value,
        category: document.getElementById('prod-category').value,
        price: document.getElementById('prod-price').value,
        img: document.getElementById('prod-img').value,
        desc: document.getElementById('prod-desc').value
    });
    localStorage.setItem('eslam_products', JSON.stringify(products));
    renderAppContent(); this.reset(); alert('🚀 Product pushed!'); resetAndTriggerScrollReveal();
});

document.getElementById('add-project-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    projectsData.push({
        id: Date.now(),
        title: document.getElementById('proj-title').value,
        img: document.getElementById('proj-img').value,
        imgHover: document.getElementById('proj-img-hover').value,
        url: document.getElementById('proj-url').value
    });
    localStorage.setItem('eslam_projects', JSON.stringify(projectsData));
    renderAppContent(); this.reset(); alert('🛡️ Project deployed successfully!'); resetAndTriggerScrollReveal();
});

function deleteProduct(id) { products = products.filter(p => p.id !== id); localStorage.setItem('eslam_products', JSON.stringify(products)); renderAppContent(); }
function deleteProject(id) { projectsData = projectsData.filter(p => p.id !== id); localStorage.setItem('eslam_projects', JSON.stringify(projectsData)); renderAppContent(); }

// مؤشر الماوس البرمجي المستطيل الأزرق
const cyberCursor = document.querySelector('.custom-cyber-cursor');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

// If device supports touch, hide the custom cursor and skip animation
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    if (cyberCursor) cyberCursor.style.display = 'none';
} else {
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animateCyberCursor() {
        curX += (mouseX - curX) * 0.2; curY += (mouseY - curY) * 0.2;
        if(cyberCursor) { cyberCursor.style.left = curX + 'px'; cyberCursor.style.top = curY + 'px'; }
        requestAnimationFrame(animateCyberCursor);
    }
    animateCyberCursor();
}

const interactives = 'a, button, .tab, .tech-card, .product-card, .project-card-premium, input, textarea, .delete-btn, .index-links li';
document.addEventListener('mouseover', (e) => { if (e.target.closest(interactives)) cyberCursor?.classList.add('hovered'); });
document.addEventListener('mouseout', (e) => { if (e.target.closest(interactives)) cyberCursor?.classList.remove('hovered'); });

// أنيميشن السكرول تدريجياً للأكواد
let textObserver;
function initScrollReveal() {
    const revealTargets = document.querySelectorAll('.scroll-reveal');
    if (textObserver) textObserver.disconnect();

    textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('revealed'); }
        });
    }, { root: document.querySelector('.code-editor-body'), threshold: 0.01, rootMargin: "50px 0px 50px 0px" });

    revealTargets.forEach(target => {
        textObserver.observe(target);
        if (target.getBoundingClientRect().top < window.innerHeight) { target.classList.add('revealed'); }
    });
}

function resetAndTriggerScrollReveal() {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.remove('revealed'));
    setTimeout(initScrollReveal, 50);
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
    submitBtn.innerText = "Sending Pipeline...";
    submitBtn.style.opacity = "0.6";

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            alert('📥 System: Your message has been routed to Eslam successfully!');
            this.reset();
            submitBtn.innerText = "Send Message"; submitBtn.style.opacity = "1";
        }, (error) => {
            alert('⚠️ System Error: Failed to transmit data.');
            submitBtn.innerText = "Send Message"; submitBtn.style.opacity = "1";
        });
});

// ⚡ إدارة وإخفاء شاشة الـ Loading: تظهر لمدة ثانية ثم تتلاشى وتحميل eslam.info
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                // إخفاء شاشة التحميل وإبقاء محتوى التطبيق كما هو (بدون فتح iframe خارجي)
                loader.style.display = 'none';
                // تأكد أن المحتوى مرئي وسمح بالتمرير إن كان مخفيًا
                document.body.style.overflow = '';
            }, 600); // إخفاء بعد انتهاء التلاشي
        }, 1000); // 1000ms تعني ثانية واحدة كاملة
    }
});

document.addEventListener('DOMContentLoaded', () => { 
    renderAppContent(); 
    setTimeout(() => { initScrollReveal(); }, 100);
    // Initialize and apply site settings from dashboard
    initSiteSettings();
    initPageEditor();
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
        alert('✅ Site settings applied.');
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
    bioShort: 'I engineer highly scalable web architectures, microservices, and self-made automation infrastructures that optimize modern business workflows.',
    watermark: 'CORE'
};

function applyPageContent(content) {
    const heroEl = document.querySelector('.hero-title');
    const heroDescEl = document.querySelector('.hero-desc');
    const bioEl = document.querySelector('.bio-short');
    const watermarkEl = document.querySelector('.watermark-bg');

    if (heroEl) {
        heroEl.innerHTML = content.heroHTML;
        heroEl.setAttribute('data-text', content.heroHTML.replace(/<[^>]*>/g, '').trim());
    }
    if (heroDescEl) heroDescEl.innerText = content.heroDesc;
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

function initPageEditor() {
    const heroInput = document.getElementById('page-hero-title');
    const heroHtmlInput = document.getElementById('page-hero-html');
    const heroDescInput = document.getElementById('page-hero-desc');
    const bioInput = document.getElementById('page-bio-short');
    const watermarkInput = document.getElementById('page-watermark');
    const saveBtn = document.getElementById('page-save');
    const resetBtn = document.getElementById('page-reset');

    const content = loadPageContent();

    // populate editor fields
    if (heroInput) heroInput.value = content.heroHTML.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '');
    if (heroHtmlInput) heroHtmlInput.value = content.heroHTML;
    if (heroDescInput) heroDescInput.value = content.heroDesc;
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
        if (bioInput) bioInput.value = defaultPageContent.bioShort;
        if (watermarkInput) watermarkInput.value = defaultPageContent.watermark;
        alert('⚠️ Page content reset to defaults.');
    });
}
