/* 
  Decap CMS — Live Preview Logic
  Author: Oren Shamir (via Gemini Agent)
*/

// Ensure React/h is available
const h = window.h || window.React.createElement;

// ─── UTILS ───
function getData(entry, path) {
    try {
        const val = entry.getIn(['data', ...path]);
        if (val && typeof val.toJS === 'function') return val.toJS();
        return val;
    } catch (e) {
        return null;
    }
}

// Icon Map (SVGs)
const ICONS = {
    Smartphone: h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('rect', { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }), h('line', { x1: "12", y1: "18", x2: "12.01", y2: "18" })),
    Zap: h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('polygon', { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })),
    Layout: h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('rect', { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }), h('line', { x1: "3", y1: "9", x2: "21", y2: "9" }), h('line', { x1: "9", y1: "21", x2: "9", y2: "9" })),
    MessageCircle: h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" })),
    Code2: h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "m18 16 4-4-4-4" }), h('path', { d: "m6 8-4 4 4 4" }), h('path', { d: "m14.5 4-5 16" })),
    Rocket: h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" }), h('path', { d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" }), h('path', { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }), h('path', { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }))
};

// ─── STYLES INJECTION ───
const PREVIEW_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@100;300;400;500;700;900&family=Rubik:wght@400;500;600;700;800;900&display=swap');
  
  * { box-sizing: border-box; }
  body {
    font-family: 'Heebo', sans-serif;
    background: #050505;
    color: #fff;
    margin: 0;
    direction: rtl;
    text-align: right;
  }
  
  /* Helpers */
  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  .gradient-text {
    background: linear-gradient(135deg, #3b82f6, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .btn-primary {
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    color: #fff;
    padding: 12px 32px;
    border-radius: 99px;
    font-weight: 700;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
  }
  
  /* Sections */
  section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  h2 { font-family: 'Rubik', sans-serif; font-size: 2.5rem; margin-bottom: 2rem; font-weight: 800; }
  
  /* Navbar */
  .navbar { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .navbar .container { display: flex; justify-content: space-between; align-items: center; }
  .logo { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
  .nav-links { display: flex; gap: 20px; }
  .nav-links a { color: #ccc; text-decoration: none; font-size: 0.9rem; }
  
  /* Hero */
  .hero { 
    min-height: 70vh; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    text-align: center;
    background: radial-gradient(circle at center, #1e1b4b 0%, #050505 70%);
  }
  .hero h1 { font-family: 'Rubik', sans-serif; font-size: 4rem; line-height: 1.1; margin-bottom: 1.5rem; font-weight: 900; }
  .badge { background: rgba(255,255,255,0.1); padding: 4px 16px; border-radius: 99px; font-size: 0.85rem; display: inline-block; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); }
  
  /* Grids & Cards */
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
  
  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 2rem;
    border-radius: 1rem;
  }
  .icon-box { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin-bottom: 1rem; background: rgba(255,255,255,0.05); }

  /* WhatsApp Float */
  .wa-float {
    position: fixed; bottom: 20px; left: 20px;
    background: #25D366; color: white;
    width: 60px; height: 60px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    z-index: 100;
  }
  
  @media (max-width: 768px) {
    .grid-3, .grid-2 { grid-template-columns: 1fr; }
    .hero h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
  }
`;

CMS.registerPreviewStyle(PREVIEW_STYLES, { raw: true });


// ─── COMPONENT: SitePreview ───
const SitePreview = createClass({
    render: function () {
        const entry = this.props.entry;

        // Fetch Data safely
        const hero = getData(entry, ['hero']) || {};
        const navbar = getData(entry, ['navbar']) || {};
        const about = getData(entry, ['about']) || {};
        const process = getData(entry, ['process']) || {};
        const faq = getData(entry, ['faq']) || {};
        const contact = getData(entry, ['contact']) || {};
        const whatsapp = getData(entry, ['whatsapp']) || {};

        // ─── Render Functions ───
        const renderNavbar = () => {
            return h('div', { className: 'navbar' },
                h('div', { className: 'container' },
                    h('div', { className: 'logo' }, navbar.logoText || 'LOGO'),
                    h('div', { className: 'nav-links' },
                        (navbar.links || []).map((link, i) => h('a', { key: i, href: '#' }, link.name))
                    ),
                    navbar.ctaText && h('a', { href: '#', className: 'btn-primary', style: { padding: '8px 20px', fontSize: '0.9rem' } }, navbar.ctaText)
                )
            );
        };

        const renderHero = () => h('section', { className: 'hero' },
            h('div', { className: 'container' },
                hero.badgeText && h('div', { className: 'badge' }, hero.badgeText),
                h('h1', {},
                    hero.headlineLine1 && h('div', {}, hero.headlineLine1),
                    hero.headlineLine2 && h('span', { className: 'gradient-text' }, hero.headlineLine2)
                ),
                h('p', { style: { fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem' } },
                    hero.subtitle, ' ',
                    hero.highlightWord && h('span', { style: { color: '#22c55e', fontWeight: 'bold' } }, hero.highlightWord)
                ),
                hero.ctaText && h('a', { href: '#', className: 'btn-primary' }, hero.ctaText)
            )
        );

        const renderAbout = () => {
            const features = about.features || [];
            return h('section', { className: 'about' },
                h('div', { className: 'container' },
                    h('div', { className: 'grid-2' },
                        h('div', {},
                            h('h2', {}, about.headingLine1, ' ', h('span', { className: 'gradient-text' }, about.headingName)),
                            (about.paragraphs || []).map((p, i) => h('p', { key: i, style: { lineHeight: '1.7', color: '#cbd5e1' } }, p.text)),
                            h('div', { className: 'grid-3', style: { marginTop: '2rem' } },
                                features.map((f, i) => h('div', { key: i },
                                    h('div', { className: 'icon-box', style: { color: f.colorClass === 'purple' ? '#a855f7' : '#3b82f6' } }, ICONS[f.iconName] || ICONS.Zap),
                                    h('h4', { style: { margin: '0 0 0.5rem', fontWeight: 'bold' } }, f.title),
                                    h('p', { style: { fontSize: '0.9rem', color: '#94a3b8', margin: 0 } }, f.description)
                                ))
                            )
                        ),
                        h('div', {},
                            h('div', { className: 'card', style: { textAlign: 'center', padding: '3rem' } },
                                h('div', { style: { fontSize: '4rem', marginBottom: '1rem' } }, '👨‍💻'),
                                h('h3', {}, about.imageCaption),
                                h('p', { style: { color: '#94a3b8' } }, about.imageSubCaption)
                            )
                        )
                    )
                )
            );
        };

        const renderProcess = () => {
            const steps = process.steps || [];
            return h('section', { className: 'process' },
                h('div', { className: 'container', style: { textAlign: 'center' } },
                    h('h2', {}, process.titleBase, ' ', h('span', { className: 'gradient-text' }, process.titleHighlight)),
                    h('div', { className: 'grid-3' },
                        steps.map((step, i) => h('div', { key: i, className: 'card' },
                            h('div', { className: 'icon-box', style: { margin: '0 auto 1rem', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' } }, ICONS[step.iconName] || ICONS.Rocket),
                            h('h3', { style: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' } }, step.title),
                            h('p', { style: { color: '#94a3b8', fontSize: '0.95rem' } }, step.description)
                        ))
                    )
                )
            );
        };

        const renderFAQ = () => {
            const items = faq.items || [];
            return h('section', { className: 'faq' },
                h('div', { className: 'container', style: { maxWidth: '800px' } },
                    h('h2', { style: { textAlign: 'center' } }, faq.titleBase, ' ', h('span', { className: 'gradient-text' }, faq.titleHighlight)),
                    items.map((item, i) => h('div', { key: i, className: 'card', style: { marginBottom: '1rem', padding: '1.5rem' } },
                        h('h3', { style: { fontSize: '1.1rem', margin: '0 0 0.5rem' } }, '❓ ' + item.question),
                        h('p', { style: { color: '#cbd5e1', margin: 0 } }, item.answer)
                    ))
                )
            );
        };

        const renderContact = () => h('section', { className: 'contact' },
            h('div', { className: 'container', style: { textAlign: 'center' } },
                h('h2', {}, contact.headingLine1, ' ', h('span', { className: 'gradient-text' }, contact.headingHighlight)),
                h('p', { style: { fontSize: '1.2rem', marginBottom: '3rem', color: '#94a3b8' } }, contact.subtitle),
                h('div', { className: 'grid-2', style: { maxWidth: '800px', margin: '0 auto' } },
                    h('div', { className: 'card' }, h('h3', {}, '📞 Phone'), h('p', { style: { fontSize: '1.2rem', color: '#fff' } }, contact.phoneDisplay)),
                    h('div', { className: 'card' }, h('h3', {}, '📧 Email'), h('p', { style: { fontSize: '1.2rem', color: '#fff' } }, contact.email))
                )
            )
        );

        const renderWhatsApp = () => {
            if (!whatsapp.phoneNumber) return null;
            return h('div', { className: 'wa-float' }, '💬');
        };

        return h('div', { className: 'preview-wrapper' },
            renderNavbar(),
            renderHero(),
            renderAbout(),
            renderProcess(),
            renderFAQ(),
            renderContact(),
            renderWhatsApp()
        );
    }
});

// Register
CMS.registerPreviewTemplate('site-data', SitePreview);
