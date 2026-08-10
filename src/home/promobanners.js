export function renderPromoBanners(banners = []) {
  if (banners.length === 0) return "";

  return `
    <section class="container-custom pb-12 md:pb-16">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

        ${banners.map(banner => `
          <article
            class="relative min-h-[420px] overflow-hidden rounded-lg
                   bg-cover bg-center p-6 text-center sm:p-8 lg:h-[536px] ${banner.textColor}"
            style="background-image: url('${banner.image}')"
          >
            <p class="relative text-xs uppercase">
              ${banner.subTitle}
            </p>

            <h3 class="relative mt-2 text-3xl font-semibold">
              ${banner.title}
            </h3>

            <a
              href="#"
              class="relative mt-6 inline-flex cursor-pointer rounded-full bg-white
                     px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              ${banner.buttonText} →
            </a>
          </article>
        `).join("")}

      </div>
    </section>
  `;
}