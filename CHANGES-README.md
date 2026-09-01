# Ronit Visual Art — Performance, Responsive & SEO Fixes

This folder is your full site with fixes applied. Copy its contents over your
repo (keeping the same folder structure) and push to GitHub.

## 1. Why it was slow (root cause)
Your `images/` folder was **855 MB** — individual photos were 8–34 MB each,
straight from the camera, with no resizing or compression, and every gallery
page loaded 5–16 of them at full size with no lazy loading. That alone
explains most of the slow loading, especially on mobile networks.

**Fix:** every image was resized and re-compressed (see `images/` — now
**48 MB total, a 94% reduction**), and converted to WebP with a JPEG fallback
via `<picture>`. Below-the-fold images now use `loading="lazy"`, and the
first/hero image on each page uses `loading="eager" fetchpriority="high"` so
it appears immediately.

| | Before | After |
|---|---|---|
| Total images | 855 MB | 48 MB |
| Largest single file | 34 MB | ~350 KB |

If you add new car shoots later, resize/export them the same way — see
`optimize.sh` in this package, or just export at ~1800px on the long edge,
quality ~75–80, from Lightroom/Photoshop before uploading.

## 2. Broken links fixed
- **`index.html` was loading `../CSS/global.css`** instead of `CSS/global.css`.
  Since `index.html` sits at the repo root, that path pointed *above* your
  site and the homepage was likely loading with no styling at all when
  visited directly. Fixed.
- The logo link on the homepage pointed to `../index.html` (one level too
  high) instead of `index.html`. Fixed.

## 3. Wasted requests removed
- The **Montserrat Google Font** was linked on every single page but never
  actually used anywhere in your CSS (only your custom Coolvetica fonts and
  Arial are used). Removed site-wide — saves 2 blocking requests per page.
- The full **Font Awesome library** (icons + CSS) was loaded on every page,
  but icons are only used on the Contact page. It's now loaded only on
  `contact/contact.html`.
- Your two custom fonts are now **preloaded** so the logo text doesn't
  flash unstyled.

## 4. Images done right
- Every `<img>` is now inside a `<picture>` tag serving **WebP first**, with
  your original JPEG as a fallback for older browsers.
- Every image has explicit `width`/`height` attributes so the browser
  reserves space before the image loads (no layout jump).
- `loading="lazy"` on everything below the fold; the first visible image on
  each page loads eagerly with high priority for a fast first paint.

## 5. Fully responsive, phone to 4K
- Header, logo, nav, and all headings now use `clamp()` for fluid sizing —
  no more oversized logo/text on small phones (tested down to ~320px).
- Header now wraps instead of overflowing on very narrow screens.
- Project grid: 1 column (phones) → 2 → 3 → 4 → 5 → **6 columns on very
  large/ultra-wide monitors (≥1900px)**, with a max-width so cards don't
  stretch awkwardly on huge screens.
- Gallery image height steps down at 900px → 600px → 380px breakpoints so
  photos stay readable on small phones.
- `overflow-x:hidden` added to prevent accidental horizontal scrollbars.
- Respects `prefers-reduced-motion` for users sensitive to animation.

## 6. SEO
- Every page now has a **unique** `<title>` and meta description (previously
  all 14 pages shared the exact same generic title/description, which hurts
  search rankings and click-through rate).
- Added Open Graph + Twitter Card tags so links posted on Instagram/LinkedIn/
  WhatsApp show a proper preview image and title.
- Added `<link rel="canonical">` on every page.
- Added `robots.txt` and `sitemap.xml` at the root — submit the sitemap URL
  in Google Search Console once your final domain is live.
- Added a hidden (`sr-only`) descriptive `<h2>` on the homepage, since the
  only heading there was the "RVA" logo — search engines had nothing
  descriptive to read.

  **Note:** `robots.txt`, `sitemap.xml`, and the canonical/OG URLs currently
  assume `https://ronitvparmar.github.io/RonitVisualArt/`. If your real live
  URL is different (e.g. a custom domain), find-and-replace that base URL
  across these files.

## 7. Security / small fixes
- Added `rel="noopener noreferrer"` to your social links that use
  `target="_blank"` (prevents the linked page from getting a reference back
  to your tab — standard best practice for external links).
- Added a favicon (`favicon.ico` / `favicon.png`) — the browser tab was
  previously blank.
- Added `theme-color` meta for mobile browser chrome.

## What I'd still recommend
- Once this is live, run it through **PageSpeed Insights**
  (pagespeed.web.dev) for a real-world Lighthouse score.
- Consider a CDN or GitHub Pages (fast static hosting) if you aren't on one
  already — this static site with 48 MB of assets will now load in a couple
  of seconds even on the images-heavy pages.
- A simple hamburger menu isn't strictly needed now (nav fits on one line
  down to small phones), but if you add more nav items later, revisit this.
