(function () {
  if (window.__GLOBAL_LIGHTBOX__) return;
  window.__GLOBAL_LIGHTBOX__ = true;

  let lightbox;

  function createLightbox() {
    lightbox = document.createElement("div");
    lightbox.id = "global-lightbox";
    lightbox.innerHTML = `
    <div class="lb-backdrop"></div>

    <button class="lb-close" aria-label="Close image">
      &times;
    </button>

    <img class="lb-image" />
  `;

    document.body.appendChild(lightbox);

    // Click anywhere closes (existing behavior)
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });

    // Stop propagation so clicking image does not immediately bubble
    lightbox.querySelector(".lb-image").addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Close button
    lightbox.querySelector(".lb-close").addEventListener("click", (e) => {
      e.stopPropagation();
      lightbox.classList.remove("active");
    });
  }

  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-lightbox], [data-open]");
    if (!target) return;

    const src = target.getAttribute("data-open") || target.getAttribute("src");

    if (!src) return;

    if (!lightbox) createLightbox();

    const img = lightbox.querySelector(".lb-image");
    img.src = src;

    lightbox.classList.add("active");
  });
})();
