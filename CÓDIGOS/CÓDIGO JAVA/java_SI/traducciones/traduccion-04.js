(function () {
  const scriptEl = document.currentScript || (() => {
    const s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();

  const baseUrl = scriptEl && scriptEl.src
    ? scriptEl.src.substring(0, scriptEl.src.lastIndexOf('/'))
    : '.';
  
  let translations = null;

  // Cargar archivo JSON de traducciones
  async function fetchTranslations() {
    const url = baseUrl + '/traducciones_si.json';
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      console.info(`Traducciones (SI) cargadas desde: ${url}`);
      return json;
    } catch (err) {
      console.error('No se pudo cargar traducciones SI:', err);
      return null;
    }
  }

  // Aplicar traducciones a elementos con data-key
  function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
      console.warn(`No hay traducciones para "${lang}" (SI).`);
      return;
    }

    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const text = translations[lang][key];
      if (text === undefined) return;

      // Mantener enlaces dentro del elemento
      const anchorsHtml = Array.from(el.querySelectorAll('a')).map(a => a.outerHTML).join(' ');
      el.innerHTML = text + (anchorsHtml ? ' ' + anchorsHtml : '');
    });

    // Renderizar LaTeX después de actualizar el HTML
    if (window.MathJax && window.MathJax.typesetPromise) {
      // Un pequeño delay asegura que el DOM se haya actualizado
      setTimeout(() => {
        MathJax.typesetPromise()
          .then(() => console.log("MathJax renderizado correctamente"))
          .catch(err => console.error("Error en MathJax:", err));
      }, 50);
    }

    // Guardar idioma elegido en todas las páginas
    localStorage.setItem('idioma', lang);
  }

  async function changeLanguage(lang) {
    if (!translations) {
      translations = await fetchTranslations();
      if (!translations) return;
    }
    applyTranslations(lang);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    translations = await fetchTranslations();
    if (!translations) return;

    // Aplicar idioma guardado o español por defecto
    const langGuardado = localStorage.getItem('idioma') || 'es';
    applyTranslations(langGuardado);

    // Botones de cambio de idioma (ejemplo: id="EN" y id="SP")
    const btnEn = document.getElementById('EN');
    const btnEs = document.getElementById('SP');
    if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
    if (btnEs) btnEs.addEventListener('click', () => changeLanguage('es'));
  });

  // Exponer función globalmente por si otra página la llama
  window.__traduccionSI = { changeLanguage };
})();



