// ===== نص الكتابة المتحركة =====
const words = ['القوة', 'السرعة', 'التحمّل', 'البطولة'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const current = words[wordIndex];
    const el = document.getElementById('typed');

    if (!el) return;

    if (!isDeleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
    } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 1500);
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 110);
}

typeEffect();

// ===== حركة الشخصية مع الفأرة =====
document.addEventListener('mousemove', function(e) {
    const ath = document.getElementById('ath');
    if (!ath) return;
    const rotY = (e.clientX / window.innerWidth - 0.5) * 18;
    const rotX = (e.clientY / window.innerHeight - 0.5) * 10;
    ath.style.transform = 
      `rotateY(${rotY}deg) rotateX(${-rotX}deg)`;
});
// ===== CURSOR =====
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

// متغيرات لموقع الفأرة
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// تحريك النقطة مع الفأرة مباشرة
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
});

// تحريك الدائرة بشكل ناعم
function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// ===== SPLASH عند الضغط =====
document.addEventListener('click', function(e) {

    // 1) الدائرة المتمددة
    const circle = document.createElement('div');
    circle.className = 'splash-circle';
    circle.style.left = e.clientX + 'px';
    circle.style.top  = e.clientY + 'px';
    document.body.appendChild(circle);
    setTimeout(() => circle.remove(), 700);

    // 2) الجسيمات المتطايرة
    const colors = ['#7fff00', '#b060ff', '#ff9500', '#ffffff'];

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'splash-particle';

        // حجم عشوائي
        const size = 2 + Math.random() * 5;

        // اتجاه عشوائي
        const angle    = Math.random() * 360;
        const distance = 30 + Math.random() * 70;
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;

        // لون عشوائي
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            left:       ${e.clientX}px;
            top:        ${e.clientY}px;
            width:      ${size}px;
            height:     ${size}px;
            background: ${color};
            --tx:       ${tx}px;
            --ty:       ${ty}px;
        `;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }

    // 3) تأثير تصغير النقطة عند الضغط
    cursorDot.style.transform = 'translate(-50%, -50%) scale(.5)';
    setTimeout(() => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 200);
});

// ===== تكبير الدائرة عند hover على الأزرار =====
document.querySelectorAll('button, a, .plan, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width  = '52px';
        cursorRing.style.height = '52px';
        cursorRing.style.borderColor = '#7fff00';
        cursorRing.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width  = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.opacity = '.6';
    });
});
function submitReg() {
    const fn = document.getElementById('fn').value;
    const ln = document.getElementById('ln').value;
    const ph = document.getElementById('ph').value;

    if (!fn || !ln || !ph) {
        alert('يرجى ملء جميع الحقول!');
        return;
    }

    const ok = document.getElementById('regOk');
    ok.innerHTML = '✅ لقد تم التسجيل بنجاح!';
    ok.style.display = 'block';

    document.getElementById('fn').value = '';
    document.getElementById('ln').value = '';
    document.getElementById('ph').value = '';
};