(function () {
  const scriptEl = document.currentScript || (function () {
    const s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();
  const baseUrl = scriptEl && scriptEl.src ? scriptEl.src.substring(0, scriptEl.src.lastIndexOf('/')) : '.';

  const tryFiles = ['traduccion.json', 'traducciones.json', 'translations.json'];
  let translations = null;

  async function fetchFirstAvailable() {
    for (const name of tryFiles) {
      try {
        const url = baseUrl + '/' + name;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.info(`Traducciones (index) cargadas desde: ${url}`);
        return json;
      } catch (_) {}
    }
    throw new Error('No se encontró ningún archivo de traducciones del index.');
  }

  function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
      console.warn(`No hay traducciones para "${lang}" (index).`);
      return;
    }
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const text = translations[lang][key];
      if (text === undefined) return;

      const anchorsHtml = Array.from(el.querySelectorAll('a')).map(a => a.outerHTML).join(' ');
      el.innerHTML = text + (anchorsHtml ? ' ' + anchorsHtml : '');
    });

    // Reprocesar ecuaciones LaTeX
    if (window.MathJax && window.MathJax.typeset) {
      MathJax.typeset();
    }

    // Guardar idioma para todas las páginas
    localStorage.setItem('idioma', lang);
  }

  async function changeLanguage(lang) {
    if (!translations) {
      try { translations = await fetchFirstAvailable(); }
      catch (err) { console.error(err); return; }
    }
    applyTranslations(lang);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try { translations = await fetchFirstAvailable(); }
    catch (err) { console.error(err); return; }

    const langGuardado = localStorage.getItem('idioma') || 'es';
    applyTranslations(langGuardado);

    const btnEn = document.getElementById('EN');
    const btnEs = document.getElementById('SP');
    if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
    if (btnEs) btnEs.addEventListener('click', () => changeLanguage('es'));
  });

  window.__traduccion = { changeLanguage };
})();

