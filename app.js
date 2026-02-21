document.addEventListener('DOMContentLoaded', () => {
    console.log('3D Viewer Initialization...');
    const params = new URLSearchParams(window.location.search);
    const viewer = document.getElementById('viewer');
    const logoImg = document.getElementById('logo');
    const ctaBtn = document.getElementById('cta-btn');
    const ctaText = document.getElementById('cta-text');
    const qrModal = document.getElementById('qr-modal');
    const qrImg = document.getElementById('qr-img');
    const qrLogo = document.getElementById('qr-logo');
    const qrClose = document.getElementById('qr-close');

    /* ── Apply Parameters ─────────────────────────────────── */

    // 1. Model
    const model = params.get('model');
    if (model) {
        console.log('Loading model URL:', model);
        viewer.setAttribute('src', model);
    } else {
        console.log('No custom model URL provided, using default Astronaut.');
    }

    viewer.addEventListener('error', (e) => {
        console.error('Model-viewer loading error:', e.detail);
    });

    // 2. Logo
    const logo = params.get('logo');
    if (logo) {
        if (logo.startsWith('blob:')) {
            console.warn('Warning: Logo is a local blob URL. Local files cannot be shared via public links.');
        } else {
            console.log('Applying logo URL:', logo);
            logoImg.src = logo;
            logoImg.style.display = 'block';
            qrLogo.src = logo;
            qrLogo.style.display = 'block';
        }
    }

    // 3. Background
    const bg = params.get('bg');
    if (bg) {
        console.log('Applying background:', bg);
        const bgVal = bg.includes(',') ? `linear-gradient(135deg, ${bg})` : bg;
        document.body.style.background = bgVal;
        document.documentElement.style.background = bgVal;
    }

    // 4. CTA
    const showCta = params.get('cta') !== 'false';
    const ctaTx = params.get('ctaTx');
    const ctaLk = params.get('ctaLk');
    const ctaRadius = params.get('radius');
    const ctaBg = params.get('ctaBg');
    const ctaTc = params.get('tc');
    const ctaFf = params.get('font');
    const ctaFs = params.get('fstyle');

    if (showCta) {
        if (ctaTx || ctaLk) {
            console.log('Enabling CTA:', ctaTx || 'Discover more');
            ctaBtn.style.display = 'inline-flex';
            if (ctaTx) ctaText.textContent = ctaTx;
            if (ctaLk) ctaBtn.href = ctaLk;
            if (ctaRadius) ctaBtn.style.borderRadius = ctaRadius + 'px';
            if (ctaBg) ctaBtn.style.background = ctaBg.includes(',') ? `linear-gradient(90deg, ${ctaBg})` : ctaBg;
            if (ctaTc) ctaBtn.style.color = ctaTc;
            if (ctaFf) ctaBtn.style.fontFamily = ctaFf;
            if (ctaFs) {
                ctaBtn.style.fontWeight = ctaFs === 'bold' ? '700' : '400';
                ctaBtn.style.fontStyle = ctaFs === 'italic' ? 'italic' : 'normal';
            }
        } else {
            console.log('CTA logic: showCta is true but no text/link provided.');
        }
    }

    // 5. Shadow
    const shadow = params.get('shd');
    if (shadow === '0') viewer.setAttribute('shadow-intensity', '0');

    /* ── AR Flow ─────────────────────────────────────────── */
    const arBtn = document.getElementById('ar-btn');
    if (params.get('ar') === 'false') {
        arBtn.style.display = 'none';
    }

    arBtn.addEventListener('click', (e) => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isMobile) {
            // Internal handled
        } else {
            console.log('Desktop detected, showing AR QR Modal');
            e.preventDefault();
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.href)}`;
            qrImg.src = qrUrl;
            qrModal.classList.add('open');
        }
    });

    qrClose.addEventListener('click', () => qrModal.classList.remove('open'));
    console.log('Initialization complete.');
});
