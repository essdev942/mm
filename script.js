// =================================================================
// 1. كشف نوع الجهاز والتوافقية
// =================================================================
const deviceType = {
    isMobile: () => window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1200,
    isDesktop: () => window.innerWidth > 1200
};

// =================================================================
// 2. بيانات الموقع (قم بتعديل الروابط والأسماء هنا لتظهر دائماً على Vercel)
// =================================================================

// 🛒 بيانات المنتجات (المتجر)
const products = [
    { 
        id: 1, 
        title: "NextJS 14 SaaS Boilerplate", 
        category: "Script", 
        price: "49.00", 
        desc: "Production-ready SaaS starter with PostgreSQL & iron-clad Auth layer.", 
        img: "https://placehold.co/600x400/1c1c1c/white?text=SaaS+Boilerplate" 
    },
    { 
        id: 2, 
        title: "Automated Lead Engine Bot", 
        category: "Bot", 
        price: "35.00", 
        desc: "High-performance Go/Python automated pipeline for business scraping.", 
        img: "https://placehold.co/600x400/1c1c1c/white?text=Lead+Bot" 
    }
];

// 💼 بيانات المشاريع (الأعمال السابقة)
const projectsData = [
    { 
        id: 1, 
        title: "Fintech Dashboard Suite", 
        img: "https://placehold.co/900x380/1c1c1c/white?text=Fintech+Main", 
        imgHover: "https://placehold.co/900x380/007acc/white?text=Fintech+Hover", 
        url: "https://example.com", // ضع الرابط هنا أو اتركه فارغاً لإخفاء زر Open Live
        gallery: [
            "https://placehold.co/800x600/1c1c1c/white?text=Gallery+1", 
            "https://placehold.co/800x601/1c1c1c/white?text=Gallery+2"
        ] 
    },
    { 
        id: 2, 
        title: "AI Cloud Automation Bot", 
        img: "https://placehold.co/900x380/1c1c1c/white?text=AI+Bot", 
        imgHover: "https://placehold.co/900x380/007acc/white?text=AI+Bot+Hover", 
        url: "", // بدون رابط
        gallery: [
            "https://placehold.co/800x602/1c1c1c/white?text=Bot+Preview"
        ] 
    }
];

// =================================================================
// 3. عرض المشاريع والمنتجات في الصفحة
// =================================================================
function renderAppContent() {
    // ريندر المتجر
    const storeGrid = document.querySelector('.store-grid');
    if(storeGrid) {
        storeGrid.innerHTML = '';
        if (products.length === 0) {
            storeGrid.innerHTML = '<div class="empty-state">No products available yet.</div>';
        } else {
            products.forEach(prod => {
                storeGrid.innerHTML += `
                    <div class="product-card scroll-reveal">
                        <div class="product-tag">${prod.category}</div>
                        <img src="${prod.img}" alt="${prod.title}" class="product-img" onerror="this.src='https://via.placeholder.com/300x140/1c1c1c/ffffff?text=Image+Error'">
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

    // ريندر المشاريع
    const projectsGrid = document.getElementById('projects-grid-display');
    if(projectsGrid) {
        projectsGrid.innerHTML = '';
        if (projectsData.length === 0) {
            projectsGrid.innerHTML = '<div class="empty-state">No projects to display yet.</div>';
        } else {
            projectsData.forEach(proj => {
                projectsGrid.innerHTML += `
                    <div class="project-card-premium scroll-reveal">
                        <button class="gallery-btn" onclick='event.stopPropagation(); openProjectGallery(${proj.id}, 0);'>Gallery</button>
                        <div class="proj-header">
                            <h3>${proj.title}</h3>
                            ${(proj.url && proj.url.trim() !== '') ? `<a href="${proj.url}" target="_blank" style="color: inherit;"><i class="fas fa-arrow-up-right-from-square" title="Open live"></i></a>` : ''}
                        </div>
                        <div class="project-img-wrapper">
                            <img src="${proj.img}" class="img-primary" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/400x200/1c1c1c/ffffff?text=Image+Error'">
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
        lightboxImg: lightbox?.querySelector('.lightbox-img'),
        lightboxCaption: lightbox?.querySelector('.lightbox-caption'),
        lightboxLive: lightbox?.querySelector('.lightbox-live')
    };
};

let currentGallery = [];
let currentIndex = 0;

window.openProjectGallery = function(projectId, startIndex = 0) {
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
    
    if (lightboxLive) {
        if (proj.url && proj.url.trim() !== '') {
            lightboxLive.href = proj.url;
            lightboxLive.style.display = 'inline-block';
        } else {
            lightboxLive.style.display = 'none';
        }
    }
};

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
// 5. الماوس البرمجي والتأثيرات
// =================================================================
function initCyberCursor() {
    const cyberCursor = document.querySelector('.custom-cyber-cursor');
    if (!cyberCursor) return;

    if (deviceType.isMobile() || deviceType.isTablet()) {
        cyberCursor.style.display = 'none';
        return;
    }

    cyberCursor.style.display = 'block';
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let curX = mouseX, curY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
    });

    function animate() {
        curX += (mouseX - curX) * 0.2; 
        curY += (mouseY - curY) * 0.2;
        cyberCursor.style.left = curX + 'px';
        cyberCursor.style.top = curY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    const interactives = 'a, button, .tab, .project-card-premium, .product-card, input, textarea, .index-links li';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactives)) cyberCursor.classList.add('hovered');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactives)) cyberCursor.classList.remove('hovered');
    });
}

// =================================================================
// 6. التنقل بين الصفحات والفهرس
// =================================================================
function scrollToSection(pageId) {
    const targetTab = document.querySelector(`.tab[data-target="${pageId}"]`);
    if (targetTab) {
        targetTab.click();
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
        updateIndexStyle(target);
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
    }, { threshold: 0.05 });
    targets.forEach(t => {
        observer.observe(t);
        if (t.getBoundingClientRect().top < window.innerHeight) t.classList.add('revealed');
    });
}

function resetAndTriggerScrollReveal() {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.remove('revealed'));
    setTimeout(initScrollReveal, 50);
}

// =================================================================
// 7. التهيئة النهائية
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    // تنظيف أي بيانات قديمة عالقة في المتصفح كانت تسبب مشكلة ظهور المربعات الفارغة
    localStorage.removeItem('eslam_projects');
    localStorage.removeItem('eslam_products');

    renderAppContent();
    initCyberCursor();
    setTimeout(initScrollReveal, 100);

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
});
