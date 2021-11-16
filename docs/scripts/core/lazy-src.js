document.addEventListener(render.ready, () => {
    document.querySelectorAll('[lazy-src]').forEach(img => {
        img.src = img.getAttribute('lazy-src');
        img.removeAttribute('lazy-src');
    });
});
