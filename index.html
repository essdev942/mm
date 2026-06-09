<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>دعوة خطوبة محمد ونورا</title>
    
    <!-- استدعاء خط Teatro 2 الفاخر (Cormorant Garamond) والخط العربي المتناسق معه -->
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg-color: #f4efe6; /* اللون الكريمي الدافئ لـ Pressed Love */
            --card-bg: #ffffff; 
            --primary-color: #231f1e; /* أسود مطفي فاخر للحروف */
            --accent-color: #5a4e3d; /* ذهبي هادئ للإطارات */
            --seal-color: #8a1c24; 
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-color);
            font-family: 'Cormorant Garamond', 'Aref Ruqaa', serif;
            color: var(--primary-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            padding-bottom: 60px;
        }

        /* زينة القلوب العائمة */
        .confetti {
            position: fixed;
            top: -20px;
            z-index: 99;
            font-size: 18px;
            user-select: none;
            pointer-events: none;
            animation: fall linear forwards;
        }
        @keyframes fall {
            to { transform: translateY(105vh) rotate(360deg); }
        }

        /* أنيميشن الظهور الذكي مع السكرول */
        .animate-fade-up {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        /* الكلاس الذي يتم إضافته برمجياً عند التمرير */
        .animate-fade-up.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }

        /* --- 1. شاشة الظرف الخارجي --- */
        #splash-screen {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: var(--bg-color);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 100;
            transition: opacity 1s ease 0.8s, transform 1s ease 0.8s;
            perspective: 1000px;
        }

        .envelope {
            position: relative;
            width: 300px; height: 200px;
            background-color: #dcbfa1;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .envelope:hover { transform: scale(1.02); }

        .envelope-flap {
            position: absolute;
            top: 0; left: 0; width: 0; height: 0;
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-top: 110px solid #c9a987;
            transform-origin: top;
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 4;
        }

        .envelope-front {
            position: absolute;
            bottom: 0; left: 0; width: 0; height: 0;
            border-left: 150px solid #e9cca8;
            border-right: 150px solid #e9cca8;
            border-bottom: 100px solid #edd3b2;
            z-index: 3;
            border-radius: 0 0 5px 5px;
        }

        .wax-seal {
            position: absolute;
            top: 90px; left: 50%;
            transform: translateX(-50%);
            width: 55px; height: 55px;
            background-color: var(--seal-color);
            border-radius: 50%;
            box-shadow: inset 0 0 8px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.15);
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.4s ease 0.2s;
        }
        .wax-seal::after { content: '❤'; color: #f5c2c6; font-size: 20px; }

        .open-envelope .envelope-flap { transform: rotateX(180deg); z-index: 1; }
        .open-envelope .wax-seal { opacity: 0; }

        .seal-instruction {
            margin-top: 30px;
            font-size: 1.1rem;
            color: var(--primary-color);
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 300;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.01); }
        }

        /* --- 2. محتوى الدعوة الرئيسي --- */
        #main-content {
            width: 100%;
            max-width: 450px;
            min-height: 100vh;
            background-color: var(--bg-color);
            display: none;
            opacity: 0;
            transition: opacity 1.5s ease;
            text-align: center;
            padding-bottom: 100px;
        }

        .audio-toggle {
            position: fixed;
            bottom: 30px; left: 20px; /* تم تعديل مكان الزرار ليناسب التصميم بعد حذف المنيو */
            background: white;
            border: 1px solid var(--accent-color);
            width: 40px; height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 90;
            font-size: 16px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }

        /* غلاف الفيديو الاحترافي الكامل في البداية (Hero Video Cover) */
        .hero-video-cover {
            width: 100%;
            height: 85vh; /* يغطي معظم الشاشة عند الفتح ككفر فخم */
            overflow: hidden;
            position: relative;
            margin-bottom: 40px;
            border-bottom: 1px solid #e1d9c4;
        }
        .hero-video-cover video { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
        }
        .video-overlay-text {
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0,0,0,0.4);
            z-index: 10;
        }
        .hero-overlay-gradient {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1) 60%, var(--bg-color) 98%);
        }

        /* طابع مونوغرام Teatro المميز بالحروف المتباعدة العريضة */
        .monogram {
            font-size: 3.2rem;
            color: var(--primary-color);
            font-weight: 300;
            margin-bottom: 5px;
            letter-spacing: 8px; 
            text-transform: uppercase;
        }

        .couple-names {
            font-size: 2.6rem;
            font-weight: 400;
            margin: 10px 0;
            color: var(--primary-color);
            letter-spacing: 2px;
        }

        /* --- 3. قسم العداد التنازلي الفاخر المنسوخ من Teatro 2 --- */
        .countdown-section {
            margin: 45px 20px;
            text-align: center;
        }

        .countdown-subtitle {
            font-size: 1.4rem;
            color: #615751;
            font-style: italic;
            margin-bottom: 25px;
            font-weight: 300;
        }

        .countdown-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            direction: ltr;
        }

        .time-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 55px;
        }

        .time-number {
            font-size: 2.5rem;
            font-weight: 300;
            color: var(--primary-color);
            line-height: 1;
        }

        .time-text {
            font-size: 0.7rem;
            color: var(--accent-color);
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-top: 8px;
            font-weight: 400;
        }

        .timer-dot {
            color: var(--accent-color);
            font-size: 0.7rem;
            margin-bottom: 18px;
        }

        .floating-heart-inline {
            display: inline-block;
            color: #fca5a5;
            font-size: 1.1rem;
            position: absolute;
            animation: floatUpDown 3.5s ease-in-out infinite;
        }
        @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        /* --- 4. تصميم قسم "صور وكلام كتير" (Editorial Story Blocks) --- */
        .story-section {
            padding: 20px;
            text-align: center;
        }
        
        .story-block {
            margin-bottom: 45px;
            background: var(--card-bg);
            border: 1px solid #e1d9c4;
            padding: 15px;
        }

        .story-image {
            width: 100%;
            height: 280px;
            object-fit: cover;
            margin-bottom: 20px;
            border: 1px solid var(--accent-color);
        }

        .story-title {
            font-size: 1.6rem;
            font-weight: 300;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 10px;
            color: var(--primary-color);
        }

        .story-text {
            font-size: 1.05rem;
            color: #5c524b;
            line-height: 1.7;
            font-weight: 300;
            padding: 0 10px;
            font-family: 'Cormorant Garamond', 'Aref Ruqaa', serif;
        }

        /* --- 5. العناوين والكروت المزدوجة النحيفة خطياً --- */
        .section-header {
            font-size: 1.5rem;
            letter-spacing: 6px;
            text-transform: uppercase;
            margin: 50px 0 10px 0;
            font-weight: 300;
        }

        .decorative-divider {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            margin-bottom: 35px;
        }
        .decorative-divider .line {
            width: 50px; height: 1px;
            background-color: var(--accent-color);
        }
        .decorative-divider .diamond {
            font-size: 0.5rem;
            color: var(--accent-color);
        }

        .luxury-card {
            background-color: transparent;
            border: 1px solid #e1d9c4; 
            padding: 6px;
            margin: 30px 20px;
            position: relative;
        }

        .luxury-card-inner {
            background-color: var(--card-bg);
            border: 1px solid var(--accent-color); 
            padding: 45px 20px;
            position: relative;
        }

        .card-title {
            font-size: 2.1rem;
            font-weight: 300;
            margin-bottom: 25px;
            color: var(--primary-color);
            letter-spacing: 1px;
        }

        .card-details {
            font-size: 1.1rem;
            color: #4a433e;
            margin-bottom: 6px;
            letter-spacing: 1px;
            font-weight: 300;
        }

        .directions-link {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            color: var(--accent-color);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-decoration: none;
            border-bottom: 1px solid var(--accent-color);
            margin-top: 30px;
            padding-bottom: 3px;
            font-weight: 600;
        }

        .calendar-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: 1px solid var(--accent-color);
            background: transparent;
            color: var(--primary-color);
            padding: 10px 30px;
            font-size: 0.8rem;
            letter-spacing: 3px;
            text-transform: uppercase;
            text-decoration: none;
            margin-top: 10px;
            font-weight: 400;
            transition: background 0.3s;
        }
        .calendar-btn:hover { background-color: #faf8f5; }

    </style>
</head>
<body>

    <!-- 1. شاشة الظرف الخارجي الشمعي البدئية -->
    <div id="splash-screen">
        <div class="envelope" id="mainEnvelope" onclick="openWeddingEnvelope()">
            <div class="envelope-flap"></div>
            <div class="wax-seal"></div>
            <div class="envelope-front"></div>
        </div>
        <div class="seal-instruction">اضغط على الختم لفتح الدعوة ✨</div>
    </div>

    <!-- زر التحكم بالصوت الذكي -->
    <div class="audio-toggle" id="audioBtn" onclick="toggleAudio()" style="display: none;">🔊</div>

    <!-- 2. محتوى الموقع بتنسيق خطوط وثغرات وفيديوهات Teatro 2 الحقيقي -->
    <div id="main-content">
        
        <!-- غلاف الفيديو المفتوح بالكامل في البداية كـ Cover -->
        <div class="hero-video-cover">
            <video autoplay muted loop playsinline id="heroVideo">
                <source src="https://cdn.discordapp.com/attachments/1375603486980444180/1514011555283337216/73B8D59D-35AF-43EE-A1B7-CE7D404EF007.mp4?ex=6a29d0a3&is=6a287f23&hm=e51b50d0cae43e4d23235d9f2023073b01202c411179b403b644efc96f784e1f&" type="video/mp4">
            </video>
            <div class="hero-overlay-gradient"></div>
            <div class="video-overlay-text">
                <p style="font-size: 0.9rem; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 5px;">Welcome to Our Love Story</p>
                <p style="font-family: 'Aref Ruqaa', serif; font-size: 1.8rem;">فصارت بالحبّ دنيانا جمِيلة</p>
            </div>
        </div>
        
        <div class="monogram animate-fade-up delay-1">M & N</div>
        <div class="couple-names animate-fade-up delay-1">محمد & نورا</div>
        
        <!-- 3. قسم العداد التنازلي الفاخر المنسوخ من Pressed Love -->
        <div class="countdown-section animate-fade-up delay-2">
            <div class="countdown-subtitle">counting the days to our forever</div>
            <div class="countdown-row" id="timer">
                <div class="time-block">
                    <span class="time-number" id="days">00</span>
                    <span class="time-text">Days</span>
                </div>
                <div class="timer-dot">♦</div>
                <div class="time-block">
                    <span class="time-number" id="hours">00</span>
                    <span class="time-text">Hours</span>
                </div>
                <div class="timer-dot">♦</div>
                <div class="time-block">
                    <span class="time-number" id="minutes">00</span>
                    <span class="time-text">Minutes</span>
                </div>
                <div class="timer-dot">♦</div>
                <div class="time-block">
                    <span class="time-number" id="seconds">00</span>
                    <span class="time-text">Seconds</span>
                </div>
            </div>
        </div>

        <div style="position: relative; height: 20px;">
            <span class="floating-heart-inline" style="left: 46%;">❤️</span>
        </div>

        <!-- --- 4. قسم "صور كتير كلام" المصمم بنظام المقالات والافتتاحيات الفخمة --- -->
        <h2 class="section-header animate-fade-up">Our Story</h2>
        <div class="decorative-divider animate-fade-up">
            <span class="diamond">♦</span>
            <div class="line"></div>
            <span class="diamond">♦</span>
        </div>

        <div class="story-section">
            <!-- البلوك الأول: صورة وكلام -->
            <div class="story-block animate-fade-up">
                <img src="https://cdn.discordapp.com/attachments/1375603486980444180/1514012126396809306/WhatsApp_Image_2026-06-09_at_12.53.03_PM.jpeg?ex=6a29d12b&is=6a287fab&hm=ae90186e613cac224bcfcfb0e9b9f6fe70283e85b160ed63fbc5e66f7110f21b&" class="story-image" alt="Our First Meet">
                <h3 class="story-title"></h3>
                <p class="story-text"></p>
            </div>

            <!-- البلوك الثاني: صورة ثانية وكلام مختلف -->
            <div class="story-block animate-fade-up">
                <img src="https://i.pinimg.com/736x/64/e4/15/64e415500ccc6cb50ce450fa23c29251.jpg" class="story-image" alt="Our Promise">
                <h3 class="story-title"></h3>
                <p class="story-text"></p>
            </div>
        </div>

        <!-- قسم مواعيد وتفاصيل الحفلات -->
        <h2 class="section-header animate-fade-up">When & Where</h2>
        <div class="decorative-divider animate-fade-up">
            <span class="diamond">♦</span>
            <div class="line"></div>
            <span class="diamond">♦</span>
        </div>

        <!-- كارت ليلة الحنة المزدوج الملكي (تم تعديل اللوكيشن هنا) -->
        <div class="luxury-card animate-fade-up">
            <span class="floating-heart-inline" style="top: -12px; right: 25px;">❤️</span>
            <div class="luxury-card-inner">
                <h3 class="card-title">City mark Resort</h3>
                <p class="card-details" style="font-weight: 600; color: var(--accent-color); margin-bottom: 15px;">June 28, 2026</p>
                <p class="card-details">6:00 PM</p>
                <p class="card-details">عنوان</p>
                <p class="card-details">طريق المنصوريه هرم بعد قاعات لامور جيزا</p>
                <!-- الرابط الجديد المباشر لجوجل ماب -->
                <a href="https://maps.app.goo.gl/swaxS71SgaQjLEBK9?g_st=ic" target="_blank" class="directions-link">اللوكيشن  ↗</a>
            </div>
            <span class="floating-heart-inline" style="bottom: -15px; left: 35px;">❤️</span>
        </div>

        <div class="footer-date animate-fade-up">Save The Date</div>
    </div>

    <!-- نظام الموسيقى والقفز للثانية 55 فورا عند الفتح -->
    <audio id="bgMusic" loop preload="auto">
        <source src="https://serv100.albumaty.com/2024/Albumaty.Com_hsyn_algsmy_fstank_alabyd.mp3" type="audio/mpeg">
    </audio>

    <script>
        const music = document.getElementById('bgMusic');
        const audioBtn = document.getElementById('audioBtn');
        const softHearts = ['❤️', '💖'];

        // نظام مراقبة التمرير (Scroll Observer) المطور لجعل العناصر تظهر أثناء النزول
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.animate-fade-up');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.12 // يبدأ الأنيميشن أول ما يظهر 12% من العنصر على الشاشة
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            animatedElements.forEach(el => observer.observe(el));
        }

        function startFloatingHearts() {
            setInterval(() => {
                const heart = document.createElement('div');
                heart.classList.add('confetti');
                heart.innerText = softHearts[Math.floor(Math.random() * softHearts.length)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 2 + 3 + 's'; 
                heart.style.opacity = Math.random() * 0.6 + 0.4;
                document.body.appendChild(heart);
                setTimeout(() => { heart.remove(); }, 5000);
            }, 500);
        }

        function openWeddingEnvelope() {
            const envelope = document.getElementById('mainEnvelope');
            const splash = document.getElementById('splash-screen');
            const main = document.getElementById('main-content');
            
            envelope.classList.add('open-envelope');
            
            setTimeout(() => {
                splash.style.opacity = '0';
                splash.style.transform = 'scale(0.96) translateY(-15px)';
                
                setTimeout(() => {
                    splash.style.display = 'none';
                    main.style.display = 'block';
                    audioBtn.style.display = 'flex';
                    
                    setTimeout(() => { 
                        main.style.opacity = '1'; 
                        // تفعيل أنيميشن التمرير فور فتح الظرف
                        initScrollAnimations();
                        startFloatingHearts(); 
                    }, 50);
                }, 1000);
            }, 800);

            // تشغيل الموسيقى والبدء فوراً من الثانية 55
            music.play().then(() => {
                music.currentTime = 55;
            }).catch(e => {
                console.log("تم تفعيل التشغيل الآمن بنجاح");
            });
        }

        function toggleAudio() {
            if (music.paused) {
                music.play();
                audioBtn.innerText = '🔊';
            } else {
                music.pause();
                audioBtn.innerText = '🔇';
            }
        }

        // حساب عداد الوقت التلقائي لليلة الفرح (30 يونيو 2026)
        const targetDate = new Date("June 30, 2026 18:00:00").getTime();

        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

            if (difference < 0) {
                clearInterval(timerInterval);
                document.getElementById("timer").innerHTML = "<span style='font-size:1.1rem; color:var(--accent-color); letter-spacing:3px;'>JUST MARRIED 🎉</span>";
            }
        }, 1000);
    </script>
</body>
</html>
