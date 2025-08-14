document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, {
        rootMargin: "200px 0px", // empieza a cargar antes de aparecer
        threshold: 0.25          // al menos 25% visible
    });

    videos.forEach(video => observer.observe(video));
});