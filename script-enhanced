// 🎯 Script Enhanced - تحسينات الماوس واللغات

// تهيئة الماوس بعد تحميل الـ DOM
document.addEventListener('DOMContentLoaded', () => {
    // ✅ تهيئة مؤشر الماوس
    setTimeout(() => initCyberCursor(), 100);
    // ✅ تهيئة معالج اللغات
    setTimeout(() => initLanguageSwitcher(), 100);
});

// 🖱️ دالة تهيئة الماوس البرمجي
function initCyberCursor() {
    const cyberCursor = document.querySelector('.custom-cyber-cursor');
    
    // التحقق من أن الجهاز ليس لمسياً
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    };
    
    // إخفاء الماوس على الأجهزة اللمسية
    if (isTouchDevice()) {
        if (cyberCursor) cyberCursor.style.display = 'none';
        return;
    }
    
    // عرض الماوس على الأجهزة العادية
    if (cyberCursor) {
        cyberCursor.style.display = 'block';
        
        let mouseX = 0;
        let mouseY = 0;
        let curX = 0;
        let curY = 0;
        let isAnimating = false;
        
        // تحديث موضع الماوس
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(() => {
                    curX += (mouseX - curX) * 0.25;
                    curY += (mouseY - curY) * 0.25;
                    
                    cyberCursor.style.left = curX + 'px';
                    cyberCursor.style.top = curY + 'px';
                    
                    isAnimating = false;
                });
            }
        });
        
        // إضافة hover effect
        const interactives = 'a, button, .tab, .tech-card, .product-card, .project-card-premium, input, textarea, .delete-btn, .index-links li, select';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactives)) {
                cyberCursor.classList.add('hovered');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactives)) {
                cyberCursor.classList.remove('hovered');
            }
        });
    }
}

// 🌐 دالة تهيئة معالج اللغات
function initLanguageSwitcher() {
    const languageSelector = document.getElementById('language-selector');
    
    if (!languageSelector) return;
    
    // محتوى متعدد اللغات (يمكن تجاوزه بواسطة محتوى مخزن محلياً)
    const defaultContent = {
        en: {
            heroTitle: 'Architecting Digital <br><span>Efficiency.</span>',
            heroDesc: 'I specialize in bridging advanced Frontend frameworks with solid Backend logic, building secure API networks, and automating web scrapers or cloud systems.',
            bio: 'I engineer highly scalable web architectures, microservices, and self-made automation infrastructures that optimize modern business workflows.',
            techTitle: 'Technical Deep Dive',
            techText: 'My mission is to eliminate repetitive tasks through intelligent scripts. Whether constructing custom CRM solutions, high-traffic endpoints, or complex database queries, I code with scalability and performance as a strict standard.',
            roiTitle: 'Engineering High-ROI Solutions',
            roiText: 'Every line of code is written to solve business roadblocks. By leveraging event-driven architecture and intelligent background workers, I build web ecosystems that cut server response times by half and completely automate operations that previously required hours of human labor.'
        },
        ar: {
            heroTitle: 'هندسة الكفاءة<br><span>الرقمية.</span>',
            heroDesc: 'أتخصص في ربط أطر عمل Frontend متقدمة مع منطق Backend قوي، وبناء شبكات API آمنة، وأتمتة مكاشط الويب أو الأنظمة السحابية.',
            bio: 'أهندس معماريات ويب قابلة للتوسع، خدمات صغيرة، وبنى أتمتة ذاتية الصنع تحسّن سير العمل التجاري الحديث.',
            techTitle: 'الغوص التقني العميق',
            techText: 'مهمتي هي القضاء على المهام المتكررة من خلال البرامج النصية الذكية. سواء كان بناء حلول CRM مخصصة أو نقاط نهاية عالية الحركة أو استعلامات قاعدة بيانات معقدة، فإنني أكتب الكود مع القابلية للتوسع والأداء كمعيار صارم.',
            roiTitle: 'هندسة الحلول عالية العائد',
            roiText: 'كل سطر من الكود مكتوب لحل عقبات العمل. من خلال الاستفادة من العمارة الموجهة للأحداث والعمال الذكيين في الخلفية، أبني نظم الويب التي تقلل أوقات استجابة الخادم إلى النصف وتؤتمت تماماً العمليات التي كانت تتطلب ساعات من العمل البشري.'
        }
    };
    // دمج المحتوى المخزن بالـ localStorage إن وجد
    let content = Object.assign({}, defaultContent);
    try {
        const stored = localStorage.getItem('eslam_lang_content');
        if (stored) {
            const parsed = JSON.parse(stored);
            // shallow merge for en/ar
            if (parsed.en) content.en = Object.assign({}, content.en, parsed.en);
            if (parsed.ar) content.ar = Object.assign({}, content.ar, parsed.ar);
        }
    } catch (err) { console.warn('Failed to parse saved language content', err); }
    
    // تطبيق اللغة المحفوظة عند التحميل
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelector.value = savedLanguage;
    applyLanguage(savedLanguage, content);
    
    // منع التفاعل مع معالج التبويبات عند النقر على اختيار اللغة
    languageSelector.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // معالج تغيير اللغة
    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('selectedLanguage', selectedLang);
        applyLanguage(selectedLang, content);
    });
}

// 🔄 دالة تطبيق اللغة على المحتوى
function applyLanguage(lang, content) {
    const langData = content[lang] || content['en'];
    
    // تحديث اتجاه الصفحة
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        document.body.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        document.body.dir = 'ltr';
    }
    
    // تحديث العنوان الرئيسي
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = langData.heroTitle;
    }
    
    // تحديث الوصف
    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) {
        heroDesc.textContent = langData.heroDesc;
    }
    
    // تحديث الـ Bio
    const bio = document.querySelector('.bio-short');
    if (bio) {
        bio.textContent = langData.bio;
    }
    
    // تحديث عناوين الأقسام والنصوص في صفحة Home
    const homeSection = document.getElementById('home');
    
    if (homeSection) {
        // العثور على جميع عناوين الأقسام
        const allHeadings = homeSection.querySelectorAll('h2.section-title');
        if (allHeadings.length >= 1) {
            allHeadings[0].textContent = langData.techTitle;
        }
        if (allHeadings.length >= 2) {
            allHeadings[1].textContent = langData.roiTitle;
        }
        
        // العثور على جميع نصوص الأقسام
        const allTexts = homeSection.querySelectorAll('.about-text p');
        if (allTexts.length >= 1) {
            allTexts[0].textContent = langData.techText;
        }
        if (allTexts.length >= 2) {
            allTexts[1].textContent = langData.roiText;
        }
    }
}

