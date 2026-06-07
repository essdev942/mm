// =================================================================
// 1. كشف نوع الجهاز والتوافقية
// =================================================================
const deviceType = {
    isMobile: () => window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1200,
    isDesktop: () => window.innerWidth > 1200
};

// =================================================================
// 2. إدارة وتخزين البيانات (مشاريع ومنتجات) بدون قواعد بيانات
// =================================================================
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

let defaultProducts = [
    { id: 1, title: "NextJS 14 SaaS Boilerplate", category: "Script", price: "49.00", desc: "Production-ready SaaS starter with PostgreSQL.", img: "https://placehold.co/600x400/1c1c1c/white?text=SaaS+Boilerplate" },
    { id: 2, title: "Automated Lead Engine Bot", category: "Bot", price: "35.00", desc: "Automated pipeline for lead scraping.", img: "https://placehold.co/600x400/1c1c1c/white?text=Lead+Bot" }
];
let products = safeLoadArray('eslam_products', defaultProducts);

let defaultProjects = [
    { id: 1, title: "Eslam.dev Portfolio", img: "https://placehold.co/900x380/1c1c1c/white?text=Project+Alpha", imgHover: "https://placehold.co/900x380/007acc/white?text=Preview+Alpha", url: "https://wap-tau.vercel.app/#home", gallery: ["https://placehold.co/800x600"] },
    { id: 2, title: "Napoli Egy Network", img: "https://placehold.co/900x380/1c1c1c/white?text=Napoli+Project", imgHover: "https://placehold.co/900x380/007acc/white?text=Napoli+Hover", url: "https://napoliegy.net", gallery: ["https://placehold.co/800x602"] }
];
let projectsData = safeLoadArray('eslam_projects', defaultProjects);

// =================================================================
// 3. عرض المشاريع والمنتجات (الربط المباشر مع واتساب)
// =================================================================
function renderAppContent() {
    const storeGrid = document.querySelector('.store-grid');
    if(storeGrid) {
        storeGrid.innerHTML = '';
        if (!Array.isArray(products) || products.length === 0) {
            storeGrid.innerHTML = '<div class="empty-state">No products available yet.</div>';
        } else {
            products.forEach(prod => {
                storeGrid.innerHTML += `
                    <div class="product-card scroll-reveal">
                        <div class="product-tag">${prod.category}</div>
                        <img src="${prod.img}" alt="${prod.title}" class="product-img" onerror="this.src='https://via.placeholder.com/300x140/1c1c1c/ffffff?text=Product'">
                        <div class="product-info">
                            <h3>${prod.title}</h3>
                            <p>${prod.desc}</p>
                            <div class="product-footer">
                                <span class="price">$${prod.price}</span>
                                <button class="buy-btn" onclick="window.open('https://wa.me/201127134174?text=Hi Eslam, I want to purchase: ${encodeURIComponent(prod.title)}')">Buy Now</button>
                            </div>
                        </div>
                    </div>`;
            });
        }
    }

    const projectsGrid = document.getElementById('projects-grid-display');
    if(projectsGrid) {
        projectsGrid.innerHTML = '';
        if (!Array.isArray(projectsData) || projectsData.length === 0) {
            projectsGrid.innerHTML = '<div class="empty-state">No projects to display yet.</div>';
        } else {
            projectsData.forEach(proj => {
                const galleryJson = JSON.stringify(proj.gallery || []).replace(/'/g, "&apos;");
                projectsGrid.innerHTML += `
                    <div class="project-card-premium scroll-reveal">
                        <button class="gallery-btn" onclick='event.stopPropagation(); openProjectGallery(${proj.id}, 0);'>Gallery</button>
                        <div class="proj-header">
                            <h3>${proj.title}</h3>
                            ${(proj.url && proj.url !== '#') ? '<i class="fas fa-arrow-up-right-from-square" title="Open live"></i>' : ''}
                        </div>
                        <div class="project-img-wrapper">
                            <img src="${proj.img}" class="img-primary" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/400x200/1c1c1c/ffffff?text=Project'">
                            <img src="${proj.imgHover || proj.img}" class="img-hover-alt" alt="${proj.title} Preview" onerror="this.style.display='none'">
                        </div>
                    </div>`;
            });
        }
    }
}

// =================================================================
// 4. معرض الصور (Lightbox)
// =================================================================
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
    if (lightbox) { 
        lightbox.setAttribute('aria-hidden', 'false'); 
        document.body.style.overflow = 'hidden'; 
    }
    
    // إخفاء أو إظهار زر Open Live بناءً على وجود رابط حقيقي
    if (lightboxLive) {
        if (proj.url && proj.url !== '#' && proj.url.trim() !== '') {
            lightboxLive.href = proj.url;
            lightboxLive.style.display = 'inline-block';
        } else {
            lightboxLive.style.display = 'none';
        }
    }
}

function showLightboxImage(index) {
    if (!currentGallery || currentGallery.length === 0) return;
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    const { lightboxImg, lightboxCaption } = getLightboxElements();
    if (lightboxImg) lightboxImg.src = currentGallery[currentIndex];
    if (lightboxCaption) lightboxCaption.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
}

function closeLightbox() {
    const { lightbox } = getLightboxElements();
    if (lightbox) { 
        lightbox.setAttribute('aria-hidden', 'true'); 
        document.body.style.overflow = ''; 
    }
}

function nextLightbox() { showLightboxImage(currentIndex + 1); }
function prevLightbox() { showLightboxImage(currentIndex - 1); }

// =================================================================
// 5. تحسين الأداء: الماوس البرمجي (موحد ونظيف)
// =================================================================
function initCyberCursor() {
    const cyberCursor = document.querySelector('.custom-cyber-cursor');
    if (!cyberCursor) return;

    if (deviceType.isMobile() || deviceType.isTablet()) {
        cyberCursor.style.display = 'none';
        return;
    }

    cyberCursor.style.display = 'block';
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        curX += (mouseX - curX) * 0.2; // سرعة استجابة الماوس
        curY += (mouseY - curY) * 0.2;
        cyberCursor.style.left = curX + 'px';
        cyberCursor.style.top = curY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    const interactives = 'a, button, .tab, .project-card-premium, .product-card, input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactives)) cyberCursor.classList.add('hovered');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactives)) cyberCursor.classList.remove('hovered');
    });
}

// =================================================================
// 6. التبويبات (Tabs) وتأثيرات الظهور
// =================================================================
document.addEventListener('click', function(e) {
    if(e.target && e.target.closest('.tab')) {
        const tabEl = e.target.closest('.tab');
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tabEl.classList.add('active');

        const target = tabEl.getAttribute('data-target');
        document.querySelectorAll('.page-section').forEach(page => {
            page.classList.remove('active');
            if (page.id === target) page.classList.add('active');
        });
        resetAndTriggerScrollReveal();
    }
});

function initScrollReveal() {
    const targets = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    targets.forEach(t => observer.observe(t));
}

function resetAndTriggerScrollReveal() {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.remove('revealed'));
    setTimeout(initScrollReveal, 50);
}

// =================================================================
// 7. تهيئة الصفحة عند التحميل (DOMContentLoaded)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderAppContent();
    initCyberCursor();
    initScrollReveal();

    // أزرار معرض الصور
    const lb = document.getElementById('project-lightbox');
    if (lb) {
        lb.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
        lb.querySelector('.lightbox-next')?.addEventListener('click', nextLightbox);
        lb.querySelector('.lightbox-prev')?.addEventListener('click', prevLightbox);
        lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
        
        document.addEventListener('keydown', (e) => {
            if (lb.getAttribute('aria-hidden') === 'false') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextLightbox();
                if (e.key === 'ArrowLeft') prevLightbox();
            }
        });
    }

    // إعداد EmailJS إذا كنت تستخدمه
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }
});
