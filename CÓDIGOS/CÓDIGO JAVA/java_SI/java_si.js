// si.js — animaciones de entrada/salida y render MathJax seguro
(function () {
  // fade-in al cargar
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');

    // Esperar a que MathJax esté listo y typeset
    runMathJaxTypeset();
  });

  // interceptar links para animación de salida (igual que tienes)
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;
      e.preventDefault();
      document.body.classList.remove('fade-in');
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });

  // re-typesetear si hay cambios de idioma desde otra pestaña
  window.addEventListener('storage', (e) => {
    if (e.key === 'idioma') {
      runMathJaxTypeset();
    }
  });

  // helper: intenta typeset cuando MathJax esté listo
  function runMathJaxTypeset() {
    if (window.MathJax && typeof MathJax.typesetPromise === 'function') {
      MathJax.typesetClear && MathJax.typesetClear();
      MathJax.typesetPromise().catch(err => console.warn('MathJax typeset error:', err));
    } else {
      // MathJax aún no cargó, reintentar pronto
      setTimeout(runMathJaxTypeset, 80);
    }
  }
})();