/* ============================================================
   3D Product Viewer – App Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('viewer');
    const ctaBtn = document.getElementById('cta-discover');

    /* ── CTA click handler ─────────────────────────────────── */
    ctaBtn.addEventListener('click', () => {
        // Placeholder: scroll to a section, open a modal, or navigate
        alert('Discover more clicked – wire this up to your action!');
    });

    /* ── Optional: pulse the CTA on idle ───────────────────── */
    let idleTimer;

    const startIdlePulse = () => {
        clearTimeout(idleTimer);
        ctaBtn.classList.remove('pulse');
        idleTimer = setTimeout(() => {
            ctaBtn.classList.add('pulse');
        }, 6000);
    };

    viewer.addEventListener('camera-change', startIdlePulse);
    startIdlePulse();
});
