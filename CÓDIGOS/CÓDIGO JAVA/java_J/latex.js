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

// Cuando cargue el DOM, insertamos un ejemplo de ecuación
document.addEventListener("DOMContentLoaded", function() {
    const eqContainer = document.getElementById("ecuacion-saponificacion");
    if (eqContainer) {
        eqContainer.innerHTML = "$$\\mathrm{C_3H_5(OOCR)_3 + 3NaOH \\longrightarrow C_3H_5(OH)_3 + 3RCOONa}$$";
        if (window.MathJax && window.MathJax.typeset) {
            window.MathJax.typeset();
        }
    }
});