// script.js
const speechEngine = window.speechSynthesis;
let audioEnabled = false;
let associateVoice = { pitch: 0.85, type: 'male' };
let systemVoices = [];

speechEngine.onvoiceschanged = () => { systemVoices = speechEngine.getVoices(); };

function playSpeech(text, profile = { pitch: 1.0, type: 'neutral' }) {
    if (!audioEnabled || !text) return;
    speechEngine.cancel();

    const cleanText = text.replace(/<[^>]*>?/gm, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = profile.pitch;
    utterance.rate = 1.05;

    if (systemVoices.length > 0) {
        let voice = null;
        if (profile.type === 'male') {
            voice = systemVoices.find(v => v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('alex') || v.name.toLowerCase().includes('daniel'));
            if (!voice) utterance.pitch = 0.85;
        } else if (profile.type === 'female') {
            voice = systemVoices.find(v => v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('karen'));
            if (!voice) utterance.pitch = 1.15;
        }
        if (voice) utterance.voice = voice;
    }
    speechEngine.speak(utterance);
}

document.getElementById('btn-audio-toggle').addEventListener('click', (e) => {
    audioEnabled = !audioEnabled;
    if (!audioEnabled) speechEngine.cancel();
    e.currentTarget.innerText = audioEnabled ? "Audio Narration: ON" : "Audio Narration: OFF";
    if (audioEnabled) {
        e.currentTarget.classList.remove('pulse-anim');
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.backgroundColor = "rgba(102, 252, 241, 0.15)";
        e.currentTarget.style.color = "var(--accent)";
        document.getElementById('btn-mini-audio').style.display = 'block';
        document.getElementById('btn-mini-audio').innerText = "🔊 Audio: ON";
        document.getElementById('btn-mini-audio').style.borderColor = "var(--accent)";
        document.getElementById('btn-mini-audio').style.color = "var(--accent)";
        playSpeech("Audio Assist activated. I will guide you through the module.");
    } else {
        e.currentTarget.classList.add('pulse-anim');
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "var(--accent)";
        document.getElementById('btn-mini-audio').innerText = "🔊 Audio: OFF";
        document.getElementById('btn-mini-audio').style.borderColor = "#ff3b30";
        document.getElementById('btn-mini-audio').style.color = "#ff3b30";
    }
});

document.getElementById('btn-mini-audio').addEventListener('click', (e) => {
    audioEnabled = !audioEnabled;
    if (!audioEnabled) speechEngine.cancel();
    e.currentTarget.innerText = audioEnabled ? "🔊 Audio: ON" : "🔊 Audio: OFF";
    e.currentTarget.style.borderColor = audioEnabled ? "var(--accent)" : "#ff3b30";
    e.currentTarget.style.color = audioEnabled ? "var(--accent)" : "#ff3b30";
    const mainToggle = document.getElementById('btn-audio-toggle');
    mainToggle.innerText = audioEnabled ? "Audio Narration: ON" : "Audio Narration: OFF";
    if (audioEnabled) {
        mainToggle.classList.remove('pulse-anim');
        mainToggle.style.backgroundColor = "rgba(102, 252, 241, 0.15)";
        playSpeech("Audio reactivated.");
    } else {
        mainToggle.classList.add('pulse-anim');
        mainToggle.style.backgroundColor = "transparent";
    }
});

document.getElementById('btn-voice-male').addEventListener('click', (e) => {
    audioEnabled = true;
    document.getElementById('btn-mini-audio').style.display = 'block';
    document.getElementById('btn-mini-audio').innerText = "🔊 Audio: ON";
    document.getElementById('btn-mini-audio').style.borderColor = "var(--accent)";
    document.getElementById('btn-mini-audio').style.color = "var(--accent)";
    document.getElementById('btn-audio-toggle').innerText = "Audio Narration: ON";
    document.getElementById('btn-audio-toggle').classList.remove('pulse-anim');
    document.getElementById('btn-audio-toggle').style.backgroundColor = "rgba(102, 252, 241, 0.15)";
    associateVoice = { pitch: 0.85, type: 'male' };
    e.currentTarget.classList.add('active');
    document.getElementById('btn-voice-female').classList.remove('active');
    playSpeech("You may like the sound of this voice.", associateVoice);
});

document.getElementById('btn-voice-female').addEventListener('click', (e) => {
    audioEnabled = true;
    document.getElementById('btn-mini-audio').style.display = 'block';
    document.getElementById('btn-mini-audio').innerText = "🔊 Audio: ON";
    document.getElementById('btn-mini-audio').style.borderColor = "var(--accent)";
    document.getElementById('btn-mini-audio').style.color = "var(--accent)";
    document.getElementById('btn-audio-toggle').innerText = "Audio Narration: ON";
    document.getElementById('btn-audio-toggle').classList.remove('pulse-anim');
    document.getElementById('btn-audio-toggle').style.backgroundColor = "rgba(102, 252, 241, 0.15)";
    associateVoice = { pitch: 1.15, type: 'female' };
    e.currentTarget.classList.add('active');
    document.getElementById('btn-voice-male').classList.remove('active');
    playSpeech("But this voice sounds just as great. Which one do you prefer?", associateVoice);
});

class UIChime {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = false;
    }
    init() {
        if (!this.initialized) {
            this.ctx.resume();
            this.initialized = true;
        }
    }
    playForward() { if (this.ctx.state === 'suspended') this.ctx.resume(); }
    playBackward() { if (this.ctx.state === 'suspended') this.ctx.resume(); }
    playStepForward() { if (this.ctx.state === 'suspended') this.ctx.resume(); }
    playStepBackward() { if (this.ctx.state === 'suspended') this.ctx.resume(); }
    playToggleState() { if (this.ctx.state === 'suspended') this.ctx.resume(); }
    playWarpSound() { if (this.ctx.state === 'suspended') this.ctx.resume(); }
    stopCompletionTheme() { }
    playCompletionTheme() { }
}

const uiSound = new UIChime();

document.addEventListener("DOMContentLoaded", () => {
    let currentGlobalSlide = 0;
    const totalSlides = 10;
    const sliderWrapper = document.getElementById('slider-wrapper');
    const navPrev = document.getElementById('nav-prev');
    const navNext = document.getElementById('nav-next');
    let slideCompletion = [true, false, false, false, false, false, true, false, true, true];
    window.slideControllers = {};

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        speechEngine.cancel();
        currentGlobalSlide = index;
        sliderWrapper.style.transform = `translateY(-${currentGlobalSlide * 100}vh)`;

        if (currentGlobalSlide === 0) { navPrev.classList.remove('visible'); navNext.innerText = "Start Module ❯"; navNext.style.display = 'block'; }
        else if (currentGlobalSlide === 6 || currentGlobalSlide === 7 || currentGlobalSlide === 9) { navPrev.classList.add('visible'); navNext.style.display = 'none'; }
        else { navPrev.classList.add('visible'); navNext.style.display = 'block'; navNext.innerText = "Continue ❯"; }

        document.querySelectorAll('.slide-container').forEach((el, i) => {
            const fades = el.querySelectorAll('.fade-element');
            if (i === currentGlobalSlide) fades.forEach(f => f.classList.add('visible'));
            else fades.forEach(f => f.classList.remove('visible'));
        });

        document.querySelectorAll('.toc-link').forEach(btn => btn.classList.remove('current'));
        const activeLink = document.querySelector(`.toc-link[data-target="${currentGlobalSlide}"]`);
        if (activeLink) activeLink.classList.add('current');
    }

    navPrev.addEventListener('click', () => goToSlide(currentGlobalSlide - 1));
    navNext.addEventListener('click', () => { if (currentGlobalSlide < totalSlides - 1) goToSlide(currentGlobalSlide + 1); });

    document.getElementById('btn-start-virtual-exp').addEventListener('click', () => {
        goToSlide(7);
    });

    document.querySelectorAll('.toc-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let targetIndex = parseInt(e.currentTarget.getAttribute('data-target'));
            goToSlide(targetIndex);
        });
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        goToSlide(0);
    });

    // --- SLIDE 6: ENVIRONMENT SYNTHESIS CONTROLLER ---
    const btnEnvTheater = document.getElementById('btn-env-theater');
    const btnEnvSunroom = document.getElementById('btn-env-sunroom');
    const btnEnvGarage = document.getElementById('btn-env-garage');
    const masterScene = document.getElementById('master-scene');
    let currentEnv = 'theater';

    const evalData = {
        oled: {
            theater: { title: "PERFECT FIT", text: "Infinite contrast allows for flawless shadow detail in pitch-black rooms. No blooming, pure immersion.", color: "var(--accent)" },
            sunroom: { title: "POOR FIT", text: "Glass reflects bright light like a mirror, crushing dark details. High burn-in risk if left on static graphics all day.", color: "#ff3b30" },
            garage: { title: "WASTED POTENTIAL", text: "Overkill for a casual, active environment. High risk of elemental damage and unnecessary cost.", color: "#FFD60A" }
        },
        miniled: {
            theater: { title: "EXCELLENT FIT", text: "High brightness pops beautifully, though slight blooming around bright objects may be visible in total darkness.", color: "var(--accent)" },
            sunroom: { title: "PERFECT FIT", text: "Extreme peak brightness easily punches through intense sun glare, maintaining color and contrast.", color: "var(--accent)" },
            garage: { title: "OVERKILL", text: "Great visibility, but too expensive for a casual, throwaway viewing space.", color: "#FFD60A" }
        },
        qled: {
            theater: { title: "MODERATE FIT", text: "Great color reproduction, but the lack of localized dimming means black bars will glow grey in the dark.", color: "#FFD60A" },
            sunroom: { title: "GOOD FIT", text: "Bright enough to handle standard daytime viewing, though direct sunlight will wash out the picture slightly.", color: "var(--accent)" },
            garage: { title: "EXCELLENT FIT", text: "A bright, vibrant option that is relatively cost-effective for a large space. Great for daytime football.", color: "var(--accent)" }
        },
        led: {
            theater: { title: "POOR FIT", text: "The broad backlight severely washes out the image in a dark room. No true black levels.", color: "#ff3b30" },
            sunroom: { title: "POOR FIT", text: "Lacks the brightness to compete with sunlight. The image will appear completely washed out.", color: "#ff3b30" },
            garage: { title: "PERFECT FIT", text: "Cheap, reliable, and versatile. Ideal for casual sports viewing where picture perfection isn't required.", color: "var(--accent)" }
        }
    };

    function updateEnvironment(envClass, envName) {
        currentEnv = envName;
        masterScene.className = `scene-container ${envClass}`;

        if (btnEnvTheater) btnEnvTheater.classList.remove('active');
        if (btnEnvSunroom) btnEnvSunroom.classList.remove('active');
        if (btnEnvGarage) btnEnvGarage.classList.remove('active');

        if (envName === 'theater' && btnEnvTheater) btnEnvTheater.classList.add('active');
        if (envName === 'sunroom' && btnEnvSunroom) btnEnvSunroom.classList.add('active');
        if (envName === 'garage' && btnEnvGarage) btnEnvGarage.classList.add('active');

        updatePanelEval('a');
        updatePanelEval('b');
    }

    if (btnEnvTheater) btnEnvTheater.addEventListener('click', () => updateEnvironment('env-theater', 'theater'));
    if (btnEnvSunroom) btnEnvSunroom.addEventListener('click', () => updateEnvironment('env-sunroom', 'sunroom'));
    if (btnEnvGarage) btnEnvGarage.addEventListener('click', () => updateEnvironment('env-garage', 'garage'));

    function bindEnvironmentPanel(selectId, panelId, panelLetter) {
        const selectEl = document.getElementById(selectId);
        const panelEl = document.getElementById(panelId);

        if (!selectEl || !panelEl) return;

        selectEl.addEventListener('change', (e) => {
            const tech = e.target.value;
            panelEl.className = `tv-frame panel-${tech}`;
            updatePanelEval(panelLetter);
        });
    }

    function updatePanelEval(panelLetter) {
        const selectEl = document.getElementById(`compare-select-${panelLetter}`);
        const evalTextEl = document.getElementById(`eval-text-${panelLetter}`);
        if (!selectEl || !evalTextEl) return;

        const evalTitleEl = evalTextEl.parentElement.querySelector('.eval-title');
        const tech = selectEl.value;
        const data = evalData[tech][currentEnv];

        evalTitleEl.innerText = data.title;
        evalTitleEl.style.color = data.color;
        evalTextEl.innerText = data.text;
    }

    bindEnvironmentPanel('compare-select-a', 'compare-panel-a', 'a');
    bindEnvironmentPanel('compare-select-b', 'compare-panel-b', 'b');

    goToSlide(0);
});