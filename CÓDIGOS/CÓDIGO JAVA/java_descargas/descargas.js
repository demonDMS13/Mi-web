(function () {
  const scriptEl = document.currentScript || (function () {
    const s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();
  const baseUrl = scriptEl && scriptEl.src
    ? scriptEl.src.substring(0, scriptEl.src.lastIndexOf('/'))
    : '.';

  const tryFiles = ['traduccion.json'];
  let translations = null;

  async function fetchFirstAvailable() {
    for (const name of tryFiles) {
      try {
        const url = baseUrl + '/' + name;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.info(`Traducciones (descargas) cargadas desde: ${url}`);
        return json;
      } catch (_) {}
    }
    throw new Error('No se encontró ningún archivo de traducciones de descargas.');
  }

  function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
      console.warn(`No hay traducciones para "${lang}" (descargas).`);
      return;
    }
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const text = translations[lang][key];
      if (text !== undefined) el.textContent = text;
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      translations = await fetchFirstAvailable();
    } catch (err) {
      console.error(err);
      return;
    }

    const lang = localStorage.getItem('idioma') || 'es';
    applyTranslations(lang);

    // Escucha cambios desde index
    window.addEventListener('storage', (e) => {
      if (e.key === 'idioma' && e.newValue) {
        applyTranslations(e.newValue);
      }
    });
  });
})();