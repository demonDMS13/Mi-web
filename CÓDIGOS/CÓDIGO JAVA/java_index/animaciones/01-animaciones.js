// Animación al entrar
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

// Animación al salir
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("#") && !href.startsWith("mailto:")) {
            e.preventDefault();
            document.body.classList.remove("fade-in");
            setTimeout(() => {
                window.location.href = href;
            }, 500); // tiempo igual al del transition
        }
    });
});
