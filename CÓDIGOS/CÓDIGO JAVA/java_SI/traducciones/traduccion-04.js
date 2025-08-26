(async function () {
  const scriptEl = document.currentScript || (() => {
    const s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();

  const baseUrl = scriptEl && scriptEl.src ? scriptEl.src.substring(0, scriptEl.src.lastIndexOf('/')) : '.';
  let translations = null;

  async function fetchTranslations() {
    const url = baseUrl + '/traducciones_si.json';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }

  function applyTranslations(lang) {
    if (!translations || !translations[lang]) return;

    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const text = translations[lang][key];
      if (text === undefined) return;

      // Mantener enlaces hijos
      const anchorsHtml = Array.from(el.querySelectorAll('a')).map(a => a.outerHTML).join(' ');
      el.innerHTML = text + (anchorsHtml ? ' ' + anchorsHtml : '');
    });

    // Reprocesar ecuaciones LaTeX
    if (window.MathJax && window.MathJax.typeset) MathJax.typeset();

    // Guardar idioma para recordar
    localStorage.setItem('idioma', lang);
  }

  async function changeLanguage(lang) {
    if (!translations) translations = await fetchTranslations();
    applyTranslations(lang);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    translations = await fetchTranslations(); 
    const langGuardado = localStorage.getItem('idioma') || 'es';
    applyTranslations(langGuardado);

    const btnEn = document.getElementById('EN');
    const btnEs = document.getElementById('SP');
    if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
    if (btnEs) btnEs.addEventListener('click', () => changeLanguage('es'));
  });

  window.__traduccionSI = { changeLanguage };
})();
