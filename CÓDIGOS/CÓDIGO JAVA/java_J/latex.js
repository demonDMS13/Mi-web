// Configuración de MathJax
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

// Cuando cargue el DOM, aplicamos traducciones y renderizamos MathJax
document.addEventListener("DOMContentLoaded", function() {
  // Si tienes una función de traducción por defecto, la llamas aquí:
  if (typeof applyTranslations === "function") {
    applyTranslations("es"); // o el idioma que quieras de inicio
  }

  // Reprocesar ecuaciones si hay
  if (window.MathJax) {
    if (MathJax.startup && MathJax.startup.promise) {
      MathJax.startup.promise.then(() => {
        if (typeof MathJax.typesetPromise === 'function') {
          MathJax.typesetPromise().catch(err => console.warn('MathJax typeset error:', err));
        }
      }).catch(err => console.warn('MathJax startup failed:', err));
    } else if (typeof MathJax.typesetPromise === 'function') {
      MathJax.typesetPromise().catch(err => console.warn('MathJax typeset error:', err));
    }
  }
});
