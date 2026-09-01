// Ronit Visual Art — Gallery Lightbox
// Click any gallery image to open it full-size. Navigate between images
// with the arrow buttons, left/right arrow keys, or a swipe gesture on
// touch devices — all without closing the viewer. Close with the X, the
// background, or the Escape key.

document.addEventListener('DOMContentLoaded', function () {

    var galleryImgs = document.querySelectorAll('.gallery img');
    if (!galleryImgs.length) return;

    // Collect every image on this page's gallery so we can step through them
    var images = Array.prototype.map.call(galleryImgs, function (img) {
        return { src: img.currentSrc || img.src, alt: img.alt || '' };
    });

    var currentIndex = 0;

    // Build the overlay once
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
        '<button class="lightbox-close" aria-label="Close image">&times;</button>' +
        '<button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#10094;</button>' +
        '<img src="" alt="">' +
        '<button class="lightbox-nav lightbox-next" aria-label="Next image">&#10095;</button>';
    document.body.appendChild(overlay);

    var overlayImg = overlay.querySelector('img');
    var closeBtn = overlay.querySelector('.lightbox-close');
    var prevBtn = overlay.querySelector('.lightbox-prev');
    var nextBtn = overlay.querySelector('.lightbox-next');
    var lastFocused = null;

    // hide arrows entirely if there's only one image
    if (images.length < 2) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    function showImage(index) {
        currentIndex = (index + images.length) % images.length; // wrap around both ends
        overlayImg.src = images[currentIndex].src;
        overlayImg.alt = images[currentIndex].alt;
    }

    function openLightbox(index) {
        showImage(index);
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

    function showPrev() { showImage(currentIndex - 1); }
    function showNext() { showImage(currentIndex + 1); }

    galleryImgs.forEach(function (img, i) {
        img.addEventListener('click', function () {
            openLightbox(i);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // click outside the image (on the dark background) also closes it
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // swipe support for touch devices
    var touchStartX = 0;
    var touchEndX = 0;
    var SWIPE_THRESHOLD = 40; // minimum px to count as a swipe

    overlay.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    overlay.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchEndX - touchStartX;
        if (Math.abs(diff) < SWIPE_THRESHOLD) return;
        if (diff < 0) { showNext(); } else { showPrev(); }
    }, { passive: true });

});
