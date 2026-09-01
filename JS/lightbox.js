// Ronit Visual Art — Gallery Lightbox
// Click any gallery image to open it full-size; close with the X, the
// background, or the Escape key.

document.addEventListener('DOMContentLoaded', function () {

    var galleryImgs = document.querySelectorAll('.gallery img');
    if (!galleryImgs.length) return;

    // Build the overlay once
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
        '<button class="lightbox-close" aria-label="Close image">&times;</button>' +
        '<img src="" alt="">';
    document.body.appendChild(overlay);

    var overlayImg = overlay.querySelector('img');
    var closeBtn = overlay.querySelector('.lightbox-close');
    var lastFocused = null;

    function openLightbox(src, alt) {
        overlayImg.src = src;
        overlayImg.alt = alt || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        lastFocused = document.activeElement;
        closeBtn.focus();
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        overlayImg.src = '';
        if (lastFocused) lastFocused.focus();
    }

    galleryImgs.forEach(function (img) {
        img.addEventListener('click', function () {
            // use the currently-loaded (webp/jpg) source, full quality
            openLightbox(img.currentSrc || img.src, img.alt);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    // click outside the image (on the dark background) also closes it
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });

});
