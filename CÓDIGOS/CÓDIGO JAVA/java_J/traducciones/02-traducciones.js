// Control de videos
document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, {
        rootMargin: "200px 0px",
        threshold: 0.25
    });

    videos.forEach(video => observer.observe(video));
});

// MathJax
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
    },
    options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const eqContainer = document.getElementById("ecuacion-saponificacion");
    if (eqContainer) {
        eqContainer.innerHTML = "$$\\mathrm{C_3H_5(OOCR)_3 + 3NaOH \\longrightarrow C_3H_5(OH)_3 + 3RCOONa}$$";
        if (window.MathJax && window.MathJax.typeset) {
            window.MathJax.typeset();
        }
    }
});

// Traducción dinámica
/* CÓDIGO JAVA/java_J/TRADUCCIONES/02-traducciones.js */
(function () {
  const scriptEl = document.currentScript || (function () {
    const s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();
  const baseUrl = scriptEl && scriptEl.src ? scriptEl.src.substring(0, scriptEl.src.lastIndexOf('/')) : '.';

  // JSON posibles en la MISMA carpeta del JS del subhtml
  const tryFiles = ['traduccionesJ.json', 'traduccionJ.json', 'translationsJ.json'];

  let translations = null;

  async function fetchFirstAvailable() {
    for (const name of tryFiles) {
      try {
        const url = baseUrl + '/' + name;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.info(`Traducciones (experimento) cargadas desde: ${url}`);
        return json;
      } catch (_) {}
    }
    throw new Error('No se encontró ningún archivo de traducciones del subhtml.');
  }

  function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
      console.warn(`No hay traducciones para "${lang}" (experimento).`);
      return;
    }
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const text = translations[lang][key];
      if (text === undefined) return;

      const anchorsHtml = Array.from(el.querySelectorAll('a')).map(a => a.outerHTML).join(' ');
      el.innerHTML = text + (anchorsHtml ? ' ' + anchorsHtml : '');
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try { translations = await fetchFirstAvailable(); }
    catch (err) { console.error(err); return; }

    // Lee el idioma global guardado por el index
    const lang = localStorage.getItem('idioma') || 'es';
    applyTranslations(lang);

    // Si cambias el idioma en otra pestaña del navegador, esto actualiza la página abierta
    window.addEventListener('storage', (e) => {
      if (e.key === 'idioma' && e.newValue) {
        applyTranslations(e.newValue);
      }
    });
  });
})();