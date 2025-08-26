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
  if (window.MathJax && window.MathJax.typesetPromise) {
    MathJax.typesetClear();
    MathJax.typesetPromise();
  }
});
