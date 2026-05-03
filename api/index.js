<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقع سكينة - طمأنينة لقلبك</title>
    <style>
        :root { --main: #1b4d3e; --accent: #c5a059; --bg: #f8f5f0; --white: #ffffff; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: var(--bg); margin: 0; text-align: center; color: #333; }
        
        /* الهيدر */
        .header { background: var(--main); color: white; padding: 20px; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        .back-btn { float: right; background: var(--accent); border: none; color: white; padding: 6px 15px; border-radius: 8px; cursor: pointer; font-weight: bold; display: none; }

        .container { padding: 20px; max-width: 600px; margin: auto; }
        
        /* القائمة الرئيسية */
        .card { background: var(--white); border-radius: 15px; padding: 20px; margin: 15px 0; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: 0.3s; border-right: 8px solid var(--accent); }
        .card:hover { transform: translateY(-3px); }
        .card h3 { margin: 0; color: var(--main); }

        /* واجهات المحتوى */
        .view-container { display: none; animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .content-box { background: var(--white); padding: 25px; border-radius: 20px; font-size: 24px; line-height: 1.8; margin: 15px 0; min-height: 300px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); position: relative; }
        
        select { width: 100%; padding: 12px; border-radius: 10px; border: 2px solid var(--main); font-size: 18px; margin-bottom: 15px; background: white; }
        
        .controls { display: flex; justify-content: center; gap: 10px; margin-top: 15px; }
        .btn { background: var(--main); color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; font-size: 16px; flex: 1; font-weight: bold; }
        .btn-count { background: var(--accent); font-size: 20px; }

        .counter-badge { background: var(--accent); color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-bottom: 10px; display: inline-block; }
    </style>
</head>
<body>

<div class="header">
    <button id="masterBack" class="back-btn" onclick="showMain()">🏠 الرئيسية</button>
    <h2 id="top-title">موقع سَكينة</h2>
</div>

<div class="container">
    <div id="main-menu">
        <div class="card" onclick="openQuran()">
            <h3>📖 المصحف الشريف</h3>
            <p>قراءة وتدبر آيات الله</p>
        </div>
        <div class="card" onclick="openAzkarMenu()">
            <h3>📿 حصن المسلم (الأذكار)</h3>
            <p>صباح، مساء، صلاة، ونوم</p>
        </div>
        <div class="card" onclick="window.open('https://surah.com', '_blank')">
            <h3>🎧 الاستماع للقرآن</h3>
            <p>بأصوات نخبة من القراء</p>
        </div>
    </div>

    <div id="azkar-menu" class="view-container">
        <div class="card" onclick="startAzkar('morning')"><h3>☀️ أذكار الصباح</h3></div>
        <div class="card" onclick="startAzkar('evening')"><h3>🌙 أذكار المساء</h3></div>
        <div class="card" onclick="startAzkar('prayer')"><h3>🕌 أذكار بعد الصلاة</h3></div>
        <div class="card" onclick="startAzkar('sleep')"><h3>💤 أذكار النوم</h3></div>
        <div class="card" onclick="startAzkar('wake')"><h3>🔔 أذكار الاستيقاظ</h3></div>
    </div>

    <div id="quran-view" class="view-container">
        <select id="surahSelect" onchange="fetchSurah(this.value)"></select>
        <div id="quran-text" class="content-box">جاري فتح المصحف...</div>
        <div class="controls">
            <button class="btn" onclick="moveSurah(1)">السورة التالية</button>
            <button class="btn" onclick="moveSurah(-1)">السورة السابقة</button>
        </div>
    </div>

    <div id="azkar-active" class="view-container">
        <div class="counter-badge" id="zikr-target"></div>
        <div id="azkar-text" class="content-box" onclick="countZikr()"></div>
        <div class="counter" style="font-size: 50px; color: var(--accent); font-weight: bold;" id="zikr-count">0</div>
        <p style="font-size: 14px; color: #888;">اضغط على النص للتسبيح</p>
        <div class="controls">
            <button class="btn" style="background:#2ecc71" onclick="nextZikr()">الذكر التالي</button>
        </div>
    </div>
</div>

<script>
    // بيانات الأذكار الشاملة
    const allAzkar = {
        morning: [
            {t: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", c: 1},
            {t: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...", c: 1},
            {t: "سورة الإخلاص والمعوذتين", c: 3},
            {t: "سبحان الله وبحمده", c: 100}
        ],
        evening: [
            {t: "أمسينا وأمسى الملك لله، والحمد لله", c: 1},
            {t: "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير", c: 1},
            {t: "سورة الإخلاص والمعوذتين", c: 3}
        ],
        prayer: [
            {t: "أستغفر الله", c: 3},
            {t: "سبحان الله", c: 33},
            {t: "الحمد لله", c: 33},
            {t: "الله أكبر", c: 33}
        ],
        sleep: [
            {t: "باسمك ربي وضعت جنبي، وبك أرفعه", c: 1},
            {t: "اللهم قني عذابك يوم تبعث عبادك", c: 3}
        ],
        wake: [
            {t: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور", c: 1}
        ]
    };

    let currentSurah = 1;
    let activeAzkarList = [];
    let zIndex = 0;
    let zCount = 0;

    // وظائف القرآن
    function openQuran() {
        showView('quran-view', 'المصحف الشريف');
        if(document.getElementById('surahSelect').options.length === 0) {
            fetch('https://api.alquran.cloud/v1/surah')
                .then(r => r.json())
                .then(data => {
                    const sel = document.getElementById('surahSelect');
                    data.data.forEach(s => sel.innerHTML += `<option value="${s.number}">${s.name}</option>`);
                    fetchSurah(1);
                });
        }
    }

    function fetchSurah(num) {
        currentSurah = parseInt(num);
        document.getElementById('quran-text').innerText = "جاري عرض السورة...";
        fetch(`https://api.alquran.cloud/v1/surah/${num}`)
            .then(r => r.json())
            .then(data => {
                let txt = data.data.ayahs.map(a => a.text + ` ﴿${a.numberInSurah}﴾ `).join(' ');
                document.getElementById('quran-text').innerText = txt;
                document.getElementById('surahSelect').value = num;
                document.getElementById('quran-view').scrollTop = 0;
            });
    }

    function moveSurah(step) {
        let n = currentSurah + step;
        if(n >= 1 && n <= 114) fetchSurah(n);
    }

    // وظائف الأذكار
    function openAzkarMenu() { showView('azkar-menu', 'اختر الأذكار'); }

    function startAzkar(type) {
        activeAzkarList = allAzkar[type];
        zIndex = 0;
        zCount = 0;
        showView('azkar-active', 'الأذكار');
        updateZikrDisplay();
    }

    function updateZikrDisplay() {
        const item = activeAzkarList[zIndex];
        document.getElementById('azkar-text').innerText = item.t;
        document.getElementById('zikr-target').innerText = `التكرار المطلوب: ${item.c}`;
        document.getElementById('zikr-count').innerText = zCount;
    }

    function countZikr() {
        if(zCount < activeAzkarList[zIndex].c) {
            zCount++;
            document.getElementById('zikr-count').innerText = zCount;
            if(zCount == activeAzkarList[zIndex].c) {
                if (window.navigator.vibrate) window.navigator.vibrate(100);
            }
        }
    }

    function nextZikr() {
        if(zIndex < activeAzkarList.length - 1) {
            zIndex++; zCount = 0; updateZikrDisplay();
        } else {
            alert("تقبل الله منك!"); showMain();
        }
    }

    // التنقل
    function showView(id, title) {
        document.getElementById('main-menu').style.display = 'none';
        document.querySelectorAll('.view-container').forEach(v => v.style.display = 'none');
        document.getElementById(id).style.display = 'block';
        document.getElementById('top-title').innerText = title;
        document.getElementById('masterBack').style.display = 'block';
    }

    function showMain() {
        document.getElementById('main-menu').style.display = 'block';
        document.querySelectorAll('.view-container').forEach(v => v.style.display = 'none');
        document.getElementById('top-title').innerText = "موقع سَكينة";
        document.getElementById('masterBack').style.display = 'none';
    }
</script>
</body>
</html>
