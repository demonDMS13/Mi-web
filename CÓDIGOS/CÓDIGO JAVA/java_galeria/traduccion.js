(function () {
  const scriptEl = document.currentScript || (function () {
    const s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();
  const baseUrl = scriptEl && scriptEl.src ? scriptEl.src.substring(0, scriptEl.src.lastIndexOf('/')) : '.';

  const tryFiles = ['traducciones.json'];
  let translations = null;

  async function fetchTranslations() {
    for (const name of tryFiles) {
      try {
        const url = baseUrl + '/' + name;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.info(`Traducciones cargadas desde: ${url}`);
        return json;
      } catch (_) {}
    }
    throw new Error('No se encontró ningún archivo de traducciones.');
  }

  function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
      console.warn(`No hay traducciones para "${lang}".`);
      return;
    }
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const text = translations[lang][key];
      if (text === undefined) return;

      // Respetar etiquetas internas (ej. <a>)
      const anchorsHtml = Array.from(el.querySelectorAll('a')).map(a => a.outerHTML).join(' ');
      el.innerHTML = text + (anchorsHtml ? ' ' + anchorsHtml : '');
    });

    // Reprocesar ecuaciones LaTeX si existen
    if (window.MathJax && window.MathJax.typeset) {
      MathJax.typeset();
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try { 
      translations = await fetchTranslations(); 
    }
    catch (err) { 
      console.error(err); 
      return; 
    }

    // Usar el idioma guardado o por defecto "es"
    const lang = localStorage.getItem('idioma') || 'es';
    applyTranslations(lang);

    // Escuchar cambios de idioma hechos en otro HTML
    window.addEventListener('storage', (e) => {
      if (e.key === 'idioma' && e.newValue) {
        applyTranslations(e.newValue);
      }
    });
  });
})();