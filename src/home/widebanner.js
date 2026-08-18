export function renderWideBanner(banner) {
  if (!banner) return "";

  return `
    <section class="container-custom py-10 sm:py-12 lg:py-[60px]">
      <article
        class="relative min-h-[320px] overflow-hidden rounded-[10px]
               bg-cover bg-center text-white lg:h-[358px]"
        style="background-image: url('${banner.image}')"
      >
        <div class="relative ml-auto flex min-h-[260px] max-w-[550px]
                    flex-col justify-center p-8 sm:p-12 lg:h-[358px]">

          <p class="text-sm font-medium uppercase">
            ${banner.subTitle}
          </p>

          <h2 class="mt-2 text-4xl font-semibold">
            <span class="text-warning">${banner.discount}</span>
            ${banner.title}
          </h2>

          <p class="mt-3 text-sm text-white/70">
            ${banner.description}
          </p>

          <a
            href="./shop.html"
            class="mt-5 inline-flex w-fit cursor-pointer rounded-full bg-white
                   px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            ${banner.buttonText} →
          </a>
        </div>
      </article>
    </section>
  `;
}
