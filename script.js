/**
 * ════════════════════════════════════════════════════════════
 *  VAIBHAV KUMAR YADAV — FUTURISTIC PORTFOLIO ENGINE
 *  Features: Preloader, Cursor, Particles, Typing, Chatbot,
 *  Terminal, Fraud Demo, Resume Switch, GSAP Scroll Animations
 * ════════════════════════════════════════════════════════════
 */
document.addEventListener('DOMContentLoaded', () => {

// ═══════════ PRELOADER ═══════════
const preloader = document.getElementById('preloader');
const plFill = document.getElementById('preloader-fill');
const plPercent = document.getElementById('preloader-percent');
const plStatus = document.getElementById('preloader-status');
let progress = 0;
const statusMsgs = ['Loading assets...','Initializing AI...','Rendering UI...','Almost ready...'];
const plInterval = setInterval(() => {
    const inc = progress < 30 ? 3 : progress < 70 ? 2 : progress < 90 ? 1 : 4;
    progress = Math.min(progress + inc, 100);
    plFill.style.width = progress + '%';
    plPercent.textContent = progress + '%';
    if (progress < 100) plStatus.textContent = statusMsgs[Math.floor(progress / 28)] || statusMsgs[3];
    if (progress >= 100) {
        clearInterval(plInterval);
        plStatus.textContent = 'Welcome.';
        setTimeout(() => { preloader.classList.add('loaded'); initHero(); }, 400);
    }
}, 30);

// ═══════════ CUSTOM CURSOR ═══════════
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const isTouch = window.matchMedia('(pointer:coarse)').matches;
if (!isTouch && dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
    (function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(animRing); })();
    document.addEventListener('mousedown', () => { dot.style.transform = 'translate(-50%,-50%) scale(0.6)'; ring.style.transform = 'translate(-50%,-50%) scale(0.85)'; });
    document.addEventListener('mouseup', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.transform = 'translate(-50%,-50%) scale(1)'; });
    document.querySelectorAll('a,button,[data-tilt],input,textarea,select,.pill,.competency-tag,.social-link,.proj-link,.feature-chip,.suggestion-btn,.switch-btn,.case-study-toggle').forEach(el => {
        el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
        el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
    });
    // Magnetic effect
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.15}px,${(e.clientY-r.top-r.height/2)*0.15}px)`; });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
}

// ═══════════ PARTICLE CANVAS ═══════════
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
class P { constructor() { this.x = Math.random()*W; this.y = Math.random()*H; this.vx = (Math.random()-.5)*.4; this.vy = (Math.random()-.5)*.4; this.s = Math.random()*1.5+.5; this.c = ['#4f8fff','#a855f7','#22d3ee'][Math.floor(Math.random()*3)]; this.a = .2+Math.random()*.35; }
    update() { this.x += this.vx; this.y += this.vy; if(this.x<0||this.x>W) this.vx*=-1; if(this.y<0||this.y>H) this.vy*=-1; }
    draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); ctx.fillStyle=this.c; ctx.globalAlpha=this.a; ctx.fill(); ctx.globalAlpha=1; }
}
function initP() { particles = []; const n = W > 768 ? 90 : 45; for(let i=0;i<n;i++) particles.push(new P()); }
function drawLines() { for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) { const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy); if(d<120){ctx.beginPath();ctx.strokeStyle='#a855f7';ctx.globalAlpha=(1-d/120)*.12;ctx.lineWidth=.5;ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();ctx.globalAlpha=1;}}}
function animCanvas() { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); drawLines(); requestAnimationFrame(animCanvas); }
resize(); initP(); animCanvas();
window.addEventListener('resize', () => { resize(); initP(); });

// ═══════════ HERO GSAP ANIMATIONS ═══════════
function initHero() {
    if (typeof gsap === 'undefined') { document.querySelectorAll('[data-reveal]').forEach(el=>{el.style.opacity='1';el.style.transform='translateY(0)';}); startTyping(); return; }
    const tl = gsap.timeline({defaults:{ease:'power3.out'}});
    tl.to('.hero-badge',{opacity:1,y:0,duration:.7})
      .to('.hero-line',{opacity:1,y:0,duration:.6,stagger:.15},'-=.3')
      .to('.hero-description',{opacity:1,y:0,duration:.6},'-=.2')
      .to('.hero-cta',{opacity:1,y:0,duration:.5},'-=.2')
      .to('.hero-socials',{opacity:1,y:0,duration:.5},'-=.2');
    setTimeout(startTyping, 1000);
}

// ═══════════ TYPING EFFECT ═══════════
const typedEl = document.getElementById('typed-text');
const roles = ['Software Developer','AI & ML Enthusiast','Cybersecurity Explorer','Full-Stack Engineer'];
let ri = 0, ci = 0;
function startTyping() { typeC(); }
function typeC() { if(!typedEl) return; if(ci<roles[ri].length){typedEl.textContent+=roles[ri].charAt(ci);ci++;setTimeout(typeC,80);}else{setTimeout(eraseC,2200);}}
function eraseC() { if(ci>0){typedEl.textContent=roles[ri].substring(0,ci-1);ci--;setTimeout(eraseC,45);}else{ri=(ri+1)%roles.length;setTimeout(typeC,500);}}

// ═══════════ NAVBAR ═══════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', scrollY > 60); updateActiveNav(); }, {passive:true});
function updateActiveNav() { let cur = ''; document.querySelectorAll('section[id]').forEach(s => { if(scrollY >= s.offsetTop - 150) cur = s.id; }); document.querySelectorAll('.nav-link').forEach(l => { l.classList.toggle('active', l.dataset.section === cur); }); }
const navToggle = document.getElementById('nav-toggle'), navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navMenu.classList.toggle('active'); });
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { navToggle.classList.remove('active'); navMenu.classList.remove('active'); }));
updateActiveNav();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const hash = a.getAttribute('href');
        if (!hash || hash === '#') {
            return;
        }
        const t = document.querySelector(hash);
        if (!t) {
            return;
        }
        e.preventDefault();
        window.scrollTo({top:t.getBoundingClientRect().top+scrollY-80,behavior:'smooth'});
    });
});

// ═══════════ 3D TILT ═══════════
if (!isTouch) {
    document.querySelectorAll('[data-tilt]').forEach(el => {
        el.addEventListener('mousemove', e => {
            const r = el.getBoundingClientRect(), x = e.clientX-r.left, y = e.clientY-r.top;
            el.style.transform = `perspective(1000px) rotateX(${((y-r.height/2)/r.height*2)*-6}deg) rotateY(${((x-r.width/2)/r.width*2)*6}deg) scale3d(1.02,1.02,1.02)`;
            el.style.transition = 'transform .08s ease-out';
            const g = el.querySelector('.card-glow');
            if(g) g.style.background = `radial-gradient(circle at ${x/r.width*100}% ${y/r.height*100}%, rgba(168,85,247,.06), transparent 60%)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = ''; el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
            const g = el.querySelector('.card-glow'); if(g) g.style.background = 'transparent';
        });
    });
}

// ═══════════ SCROLL ANIMATIONS ═══════════
const sObs = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) {
        const s = entry.target;
        if(typeof gsap !== 'undefined') {
            const ch = s.querySelectorAll('.about-card,.skill-card,.project-card,.achievement-card,.about-text-block,.contact-info-card,.contact-form,.hire-card,.stat-card,.demo-card,.demo-result');
            gsap.fromTo(ch, {opacity:0,y:40}, {opacity:1,y:0,duration:.7,stagger:.1,ease:'power3.out'});
            const h = s.querySelector('.section-header'); if(h) gsap.fromTo(h,{opacity:0,y:30},{opacity:1,y:0,duration:.6,ease:'power3.out'});
        }
        // Skill bars
        s.querySelectorAll('.skill-bar-fill').forEach((b,i) => { setTimeout(()=>{b.style.width=b.dataset.width+'%';}, i*150); });
        sObs.unobserve(s);
    }});
}, {threshold:.08, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.section,.stats-section').forEach(s => sObs.observe(s));

// ═══════════ STAT COUNTERS ═══════════
const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(el => {
            const target = +el.dataset.count; let current = 0;
            const step = Math.max(1, Math.floor(target / 60));
            const timer = setInterval(() => { current += step; if(current >= target){current=target;clearInterval(timer);} el.textContent = current; }, 25);
        });
        statObs.unobserve(entry.target);
    }});
}, {threshold:.3});
const statsEl = document.querySelector('.stats-grid'); if(statsEl) statObs.observe(statsEl);

// GSAP ScrollTrigger extras
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.section-title').forEach(t => { gsap.fromTo(t,{opacity:0,y:40,scale:.95},{opacity:1,y:0,scale:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:t,start:'top 85%',toggleActions:'play none none none'}}); });
    gsap.utils.toArray('.section-line').forEach(l => { gsap.fromTo(l,{width:0},{width:60,duration:.8,ease:'power2.out',scrollTrigger:{trigger:l,start:'top 85%',toggleActions:'play none none none'}}); });
}

// Parallax orbs
window.addEventListener('scroll', () => { document.querySelectorAll('.floating-orb').forEach((o,i) => { o.style.transform = `translateY(${scrollY*(i+1)*.04}px)`; }); }, {passive:true});

// ═══════════ RESUME MODE SWITCH ═══════════
function applyModeFilter(mode) {
    const filterTargets = document.querySelectorAll('.projects-grid [data-mode-card], .skills-grid [data-mode-card]');
    filterTargets.forEach(el => {
        const tag = el.dataset.modeCard;
        const shouldShow = mode === 'all' || tag === mode || tag === 'all';
        el.classList.toggle('mode-hidden', !shouldShow);
    });
}

document.querySelectorAll('.switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.switch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyModeFilter(btn.dataset.mode);
    });
});

const activeModeBtn = document.querySelector('.switch-btn.active');
if (activeModeBtn) {
    applyModeFilter(activeModeBtn.dataset.mode);
}

// ═══════════ CONTACT FORM ═══════════
const cf = document.getElementById('contact-form'), sb = document.getElementById('btn-submit');
cf.addEventListener('submit', e => {
    e.preventDefault();
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();
    if (!name || !email || !message) {
        showToast('Please fill all contact fields.', 'error');
        return;
    }

    const orig = sb.innerHTML;
    sb.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'; sb.style.opacity = '.8'; sb.style.pointerEvents = 'none';
    setTimeout(() => {
        const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:yadavvaibhav688@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${mailBody}`;
        sb.innerHTML = '<span>Sent!</span><i class="fas fa-check"></i>'; sb.style.background = 'linear-gradient(135deg,#22d3ee,#4f8fff)'; sb.style.opacity = '1'; cf.reset();
        showToast('Message draft opened in your mail app.', 'success');
        setTimeout(() => { sb.innerHTML = orig; sb.style.background = ''; sb.style.pointerEvents = ''; }, 3000);
    }, 1500);
});

// ═══════════ CHATBOT ═══════════
const chatToggle = document.getElementById('chat-toggle'), chatWin = document.getElementById('chat-window'), chatClose = document.getElementById('chat-close'), chatBody = document.getElementById('chat-body'), chatInput = document.getElementById('chat-input');
chatToggle.addEventListener('click', () => chatWin.classList.toggle('open'));
chatClose.addEventListener('click', () => chatWin.classList.remove('open'));
chatInput.addEventListener('keydown', e => { if(e.key === 'Enter') sendChatMessage(); });

function formatChatResponse(directAnswer, points) {
    const bullets = (points || []).slice(0, 4).map(point => `- ${point}`);
    return [directAnswer, ...bullets].join('<br>');
}

function isRecruiterIntent(text) {
    return /(recruiter|recruit|hire|hiring|interview|candidate|job|role|position|company|collaborate|collaboration|opening)/.test(text);
}

function isVagueQuery(text) {
    const trimmed = text.trim();
    const tokenCount = trimmed.split(/\s+/).filter(Boolean).length;
    const vaguePhrases = ['tell me more', 'more info', 'details', 'help me', 'about him', 'about vaibhav', 'projects?'];
    return tokenCount <= 2 || vaguePhrases.some(phrase => trimmed.includes(phrase));
}

function getChatResponse(message) {
    const lower = message.toLowerCase().trim();
    const recruiterMode = isRecruiterIntent(lower);

    if (/(hello|hi|hey)\b/.test(lower)) {
        return formatChatResponse('Vaibhav is a high-impact software builder with real project delivery.', [
            'Strong in full-stack development, Flutter, Firebase, React, and AI/ML.',
            'Built multiple real-world applications, including Civil DPR.',
            'Ask me about skills, projects, or why he is a strong hire.'
        ]);
    }

    if (/(why\s+(should|must|would).*(hire|select)|why\s+hire|hire\s+him|best\s+fit)/.test(lower)) {
        return formatChatResponse('Vaibhav is a builder, not just a learner.', [
            'Delivered 8+ real-world software projects across web, mobile, and AI.',
            'Combines full-stack execution with practical AI integration.',
            'Built Civil DPR for real operational reporting use-cases.',
            'Learns fast and ships production-focused solutions.'
        ]);
    }

    if (lower.includes('civil dpr') || lower.includes('construction')) {
        return formatChatResponse('Civil DPR is a real-time construction project management app.', [
            'Tracks attendance, DPR updates, and project-level reporting workflows.',
            'Uses role-based flows for Site Engineers and Supervisors.',
            'Improves reporting accuracy and day-to-day decision visibility.',
            'Designed for practical industry use, not just a classroom demo.'
        ]);
    }

    if (lower.includes('kuch nhi')) {
        return formatChatResponse('Kuch Nhi is an AI-powered communication product.', [
            'Supports real-time chat plus voice/video calling.',
            'Adds emotion-aware responses and mood-based UI behavior.',
            'Built with a full-stack architecture for production-style usage.'
        ]);
    }

    if (lower.includes('safepay') || lower.includes('fintech')) {
        return formatChatResponse('SafePay is a secure digital payment application.', [
            'Handles peer-to-peer transfers with real-time sync.',
            'Built using Flutter and Firebase ecosystem components.',
            'Focused on reliability, speed, and fraud-aware workflows.'
        ]);
    }

    if (/(skill|stack|technology|technologies|strength|expertise|what can he do)/.test(lower)) {
        const core = recruiterMode
            ? 'Vaibhav has a recruiter-ready stack for modern product teams.'
            : 'Vaibhav has strong implementation-level technical skills.';
        return formatChatResponse(core, [
            'Frontend: React, JavaScript, HTML/CSS.',
            'Mobile and backend: Dart, Flutter, Firebase, Flask.',
            'AI/ML: Pandas, NumPy, Scikit-learn, TensorFlow.',
            'Also strong in problem solving and system-driven execution.'
        ]);
    }

    if (/(project|portfolio|apps|work|demo)/.test(lower)) {
        return formatChatResponse('Vaibhav has built multiple real-world projects with clear utility.', [
            'Flagship: Civil DPR for construction workflow and reporting.',
            'Other highlights: SafePay, Kuch Nhi, AI Security Scanner.',
            'Projects show end-to-end ownership from UX to deployment.',
            'Tell me one project name and I will break down its impact.'
        ]);
    }

    if (/(experience|level|fresher|junior|senior|background)/.test(lower)) {
        return formatChatResponse('Vaibhav is an early-career engineer with strong real project depth.', [
            'Built and shipped 8+ practical applications.',
            'Participated in Adobe, IIT Delhi, and India Innovates 2026 hackathons.',
            'Holds ML and cybersecurity certifications plus consistent build momentum.'
        ]);
    }

    if (/(problem solving|dsa|debug|challenge|complex problem|optimize)/.test(lower)) {
        return formatChatResponse('He solves problems by shipping working systems quickly and cleanly.', [
            'Strong DSA foundation with 500+ solved problems.',
            'Breaks large problems into testable, production-ready modules.',
            'Applies performance, reliability, and UX thinking together.'
        ]);
    }

    if (/(learn|learning|adapt|growth|mindset|upskill)/.test(lower)) {
        return formatChatResponse('Vaibhav has a fast learning mindset with execution discipline.', [
            'Adopts new tools by building usable products, not theory-only demos.',
            'Works across frontend, backend, mobile, and AI domains.',
            'Keeps improving through hackathons and continuous project delivery.'
        ]);
    }

    if (/(contact|reach|email|phone|linkedin|github|connect|collaborate)/.test(lower)) {
        return formatChatResponse('You can connect with Vaibhav directly for roles or collaborations.', [
            'Email: yadavvaibhav688@gmail.com',
            'Phone: +91 6387951651',
            'GitHub: github.com/Vaibhav-1430 | LinkedIn: linkedin.com/in/vaibhav1104'
        ]);
    }

    if (recruiterMode) {
        return formatChatResponse('Vaibhav is a high-potential software engineering candidate for impact teams.', [
            'Strong full-stack plus mobile plus AI delivery capability.',
            'Built practical products like Civil DPR and SafePay.',
            'Hackathon participation and proven ownership mindset.'
        ]);
    }

    if (isVagueQuery(lower)) {
        return formatChatResponse('I can help quickly. What should I focus on?', [
            'Do you want skills, projects, or hiring fit?',
            'Should I explain Civil DPR impact in 4 lines?'
        ]);
    }

    return formatChatResponse("I'm not fully sure, but here's what I know...", [
        'Vaibhav is a B.Tech CSE (AI & ML) student focused on real product delivery.',
        'He is strong in full-stack development, Flutter, Firebase, React, and AI/ML.',
        'Ask me about Civil DPR, key skills, or why he is a strong hire.'
    ]);
}

window.sendChatMessage = function() {
    const msg = chatInput.value.trim(); if(!msg) return;
    addChat('user', msg); chatInput.value = '';
    const sugg = document.getElementById('chat-suggestions'); if(sugg) sugg.remove();
    // Typing indicator
    const typing = document.createElement('div'); typing.className = 'chat-msg bot'; typing.id = 'typing-ind';
    typing.innerHTML = '<div class="chat-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
    chatBody.appendChild(typing); chatBody.scrollTop = chatBody.scrollHeight;
    setTimeout(() => {
        const t = document.getElementById('typing-ind'); if(t) t.remove();
        const response = getChatResponse(msg);
        addChat('bot', response);
    }, 1200 + Math.random() * 800);
};

window.sendSuggestion = function(btn) {
    chatInput.value = btn.textContent; sendChatMessage();
};

function addChat(type, msg) {
    const d = document.createElement('div'); d.className = 'chat-msg ' + type;
    d.innerHTML = `<div class="chat-bubble">${msg}</div>`;
    chatBody.appendChild(d); chatBody.scrollTop = chatBody.scrollHeight;
}

// ═══════════ FRAUD DEMO ═══════════
window.analyzeFraud = function() {
    const amount = +document.getElementById('txn-amount').value || 0;
    const location = document.getElementById('txn-location').value;
    const time = document.getElementById('txn-time').value;
    const freq = +document.getElementById('txn-frequency').value || 0;
    const result = document.getElementById('demo-result');
    // Show loading
    result.innerHTML = '<div class="demo-loading"><div class="spinner"></div><p>Analyzing transaction patterns...</p></div>';
    setTimeout(() => {
        // Scoring logic
        let score = 0;
        if(amount > 10000) score += 35; else if(amount > 5000) score += 20; else if(amount > 2000) score += 10;
        if(location === 'vpn') score += 30; else if(location === 'international') score += 15;
        if(time === 'night') score += 20; else if(time === 'evening') score += 5;
        if(freq > 10) score += 25; else if(freq > 5) score += 15; else if(freq > 3) score += 5;
        score = Math.min(score, 100);
        let verdict, vClass, barColor, icon;
        if(score < 30) { verdict='SAFE'; vClass='verdict-safe'; barColor='#22c55e'; icon='fa-check-circle'; }
        else if(score < 60) { verdict='SUSPICIOUS'; vClass='verdict-warning'; barColor='#f59e0b'; icon='fa-exclamation-triangle'; }
        else { verdict='HIGH RISK'; vClass='verdict-danger'; barColor='#ef4444'; icon='fa-times-circle'; }

        result.innerHTML = `<div class="result-content">
            <div class="result-verdict ${vClass}"><i class="fas ${icon}"></i><h4>${verdict}</h4><p>Risk Score: ${score}/100</p></div>
            <div class="risk-bar-container"><div class="risk-bar-label"><span>Risk Level</span><span>${score}%</span></div><div class="risk-bar-outer"><div class="risk-bar-inner" style="width:0%;background:${barColor}"></div></div></div>
            <div class="risk-metrics">
                <div class="risk-metric"><div class="metric-val" style="color:${barColor}">$${amount.toLocaleString()}</div><div class="metric-label">Amount</div></div>
                <div class="risk-metric"><div class="metric-val" style="color:${barColor}">${location.toUpperCase()}</div><div class="metric-label">Location</div></div>
                <div class="risk-metric"><div class="metric-val" style="color:${barColor}">${time.toUpperCase()}</div><div class="metric-label">Time</div></div>
                <div class="risk-metric"><div class="metric-val" style="color:${barColor}">${freq}</div><div class="metric-label">24hr Txns</div></div>
            </div></div>`;
        // Animate bar
        setTimeout(() => { const bar = result.querySelector('.risk-bar-inner'); if(bar) bar.style.width = score + '%'; }, 100);
    }, 1800);
};

// ═══════════ CASE STUDY TOGGLE ═══════════
window.toggleCaseStudy = function(btn) {
    btn.classList.toggle('open');
    const panel = btn.nextElementSibling;
    if(panel.classList.contains('open')) { panel.style.maxHeight = '0'; panel.classList.remove('open'); }
    else { panel.style.maxHeight = panel.scrollHeight + 'px'; panel.classList.add('open'); }
};

// ═══════════ TERMINAL MODE ═══════════
const termOverlay = document.getElementById('terminal-overlay'), termBody = document.getElementById('terminal-body'), termInput = document.getElementById('terminal-input');
document.addEventListener('keydown', e => { if(e.key === '`' && !e.ctrlKey && !e.altKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { e.preventDefault(); openTerminal(); }});
function openTerminal() { termOverlay.classList.add('open'); setTimeout(()=>termInput.focus(), 300); }
window.closeTerminal = function() { termOverlay.classList.remove('open'); };
termInput.addEventListener('keydown', e => { if(e.key === 'Enter') { const cmd = termInput.value.trim(); termInput.value = ''; if(cmd) processCmd(cmd); }});
termOverlay.addEventListener('click', e => { if(e.target === termOverlay) closeTerminal(); });

const termCmds = {
    help: `Available commands:\n  <span class="t-cmd">about</span>      - About Vaibhav\n  <span class="t-cmd">skills</span>     - Technical skills\n  <span class="t-cmd">projects</span>   - List projects\n  <span class="t-cmd">contact</span>    - Contact info\n  <span class="t-cmd">experience</span> - Achievements\n  <span class="t-cmd">clear</span>      - Clear terminal\n  <span class="t-cmd">exit</span>       - Close terminal`,
    about: `<span class="t-accent">Vaibhav Kumar Yadav</span>\n<span class="t-success">B.Tech CSE (AI & ML)</span>\nFull-Stack Developer | AI Engineer | Cybersecurity\n\nPassionate about building intelligent, secure applications.\n500+ DSA problems solved. Hackathon participant at Adobe & IIT Delhi.`,
    skills: `<span class="t-accent">Languages:</span> Python, Java, Dart, C, SQL, JavaScript\n<span class="t-accent">Web & App:</span> HTML/CSS/JS, React, Tailwind, Flutter, Flask\n<span class="t-accent">AI/ML:</span> Pandas, NumPy, Scikit-learn, TensorFlow\n<span class="t-accent">Security:</span> Kali Linux, Nmap, Wireshark, Burp Suite\n<span class="t-accent">Tools:</span> Git, Docker, Firebase, Netlify`,
    projects: `<span class="t-success">1.</span> Kuch Nhi — AI Emotional Chat App (Featured)\n<span class="t-success">2.</span> 24/7 College Café — Food Ordering System\n<span class="t-success">3.</span> GaramDoodh — Daily Essentials Platform\n<span class="t-success">4.</span> AI Intrusion Detection System\n<span class="t-success">5.</span> Web Security Scanner + AI Chatbot\n<span class="t-success">6.</span> Construction Management App\n<span class="t-success">7.</span> E-Learning Platform with AI Tutor`,
    contact: `<span class="t-accent">Email:</span> yadavvaibhav688@gmail.com\n<span class="t-accent">Phone:</span> +91 6387951651\n<span class="t-accent">GitHub:</span> github.com/Vaibhav-1430\n<span class="t-accent">LinkedIn:</span> linkedin.com/in/vaibhav1104`,
    experience: `<span class="t-accent">Hackathons:</span>\n  <span class="t-warn">★</span> Adobe India Hackathon\n  <span class="t-warn">★</span> IIT Delhi UX Hackathon\n  <span class="t-warn">★</span> India Innovates 2026 Hackathon\n\n<span class="t-accent">Certifications:</span>\n  • Machine Learning — InternForte\n  • Ethical Hacking — Udemy\n  • Participation Certificate — India Innovates 2026`,
    clear: '__CLEAR__',
    exit: '__EXIT__'
};

function processCmd(cmd) {
    addTermLine(`<span class="t-cmd">vaibhav@portfolio:~$</span> ${cmd}`);
    const lower = cmd.toLowerCase().trim();
    if(termCmds[lower]) {
        if(lower === 'clear') { termBody.innerHTML = ''; return; }
        if(lower === 'exit') { closeTerminal(); return; }
        addTermLine(termCmds[lower]);
    } else {
        addTermLine(`<span class="t-warn">Command not found:</span> ${cmd}\nType <span class="t-cmd">help</span> for available commands.`);
    }
    addTermLine('');
}

function addTermLine(html) {
    const d = document.createElement('div'); d.className = 'terminal-line'; d.innerHTML = html;
    termBody.appendChild(d); termBody.scrollTop = termBody.scrollHeight;
}

function showToast(message, type) {
    const t = document.createElement('div');
    t.className = `site-toast ${type || 'success'}`;
    t.textContent = message;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 250);
    }, 2600);
}

}); // End DOMContentLoaded