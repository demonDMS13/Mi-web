document.querySelectorAll(".accordion").forEach(button => {
    button.addEventListener("click", () => {
        const panel = button.nextElementSibling;

        // Cierra los otros
        document.querySelectorAll(".panel").forEach(p => {
            if (p !== panel) p.style.maxHeight = null;
        });

        // Alterna el actual
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});