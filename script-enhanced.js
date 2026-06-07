
// 🎯 Script Enhanced - تحسينات الماوس

// تهيئة الماوس بعد تحميل الـ DOM
document.addEventListener('DOMContentLoaded', () => {
    // ✅ تهيئة مؤشر الماوس
    setTimeout(() => initCyberCursor(), 100);
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


