export function renderHeroComponent(hero) {

  if (!hero) {
    return "";
  }

  const mainBanner = hero.main;

  const smallBanners = hero.smallBanners;

  const hero2 = smallBanners[0];

  const hero3 = smallBanners[1];

  const smallBannersHtml = `
    <article
      class="relative overflow-hidden rounded-lg bg-[#F2F2F2]
             bg-cover bg-center"
      style="background-image: url('${hero2.image}')"
    >

      <div
        class="relative z-10 flex h-full min-h-[240px]
               max-w-[230px] flex-col justify-start
               p-7 pt-8 lg:min-h-[288px]"
      >

        <p
          class="text-xs font-medium uppercase tracking-wide
                 text-neutral-700"
        >
          ${hero2.subTitle}
        </p>

        <h2
          class="mt-2 text-3xl font-semibold text-neutral-900"
        >
          ${hero2.title}
        </h2>

        <p class="mt-2 text-sm text-neutral-600">
          ${hero2.description}
        </p>

        <a
          href="#popular-products"
          class="mt-4 inline-flex w-fit cursor-pointer items-center
                 gap-2 text-sm font-semibold text-primary
                 transition-colors hover:text-primary-dark"
        >
          ${hero2.buttonText}
          <span>➜</span>
        </a>

      </div>

    </article>

    <article
      class="relative overflow-hidden rounded-lg bg-cover bg-center"
      style="background-image: url('${hero3.image}')"
    >

      <div class="absolute inset-0 bg-[#002603]/80"></div>

      <div
        class="relative z-10 flex h-full min-h-[240px]
               flex-col items-center justify-center p-7 text-center
               lg:min-h-[288px]"
      >

        <p
          class="text-xs font-medium uppercase tracking-wide
                 text-white"
        >
          ${hero3.subTitle}
        </p>

        <h2
          class="mt-3 text-3xl font-semibold leading-[1.25]
                 text-white"
        >
          ${hero3.title}<br />
          ${hero3.description}
        </h2>

        <a
          href="#popular-products"
          class="mt-6 inline-flex cursor-pointer items-center gap-2
                 text-sm font-semibold text-primary transition-colors
                 hover:text-primary-light"
        >
          ${hero3.buttonText}
          <span>➜</span>
        </a>

      </div>

    </article>
  `;

  return `
    <section class="container-custom py-6 md:py-10">

      <div class="grid gap-4 lg:grid-cols-[2fr_1fr] lg:gap-6">

        <article
          class="relative overflow-hidden rounded-lg bg-cover bg-center"
          style="background-image: url('${mainBanner.image}')"
        >

          <!--
            Thay đổi: Tăng độ đậm và vùng phủ của gradient tối
            từ trái sang để chữ trắng nổi bật hơn.
          -->
          <div
            class="absolute inset-0 bg-gradient-to-r
                   from-black/60 via-black/15 to-black/5"
          ></div>

          <div
            class="relative z-10 flex min-h-[440px]
                   max-w-[660px] flex-col justify-center
                   p-6 text-white
                   sm:min-h-[520px] sm:p-10
                   lg:h-[600px] lg:p-[60px]"
          >

            <h1
              class="text-3xl font-semibold leading-[1.2]
                     sm:text-5xl lg:text-[48px]"
            >
              ${mainBanner.title}
            </h1>

            <div class="mt-5 border-l-2 border-primary-light pl-4">

              <p class="text-base">
                ${mainBanner.saleLabel}

                <span
                  class="rounded bg-warning px-2 py-1 font-semibold"
                >
                  ${mainBanner.saleValue}
                </span>
              </p>

              <p class="mt-2 text-sm text-white/75">
                ${mainBanner.description}
              </p>

            </div>

            <a
              href="#popular-products"
              class="mt-7 inline-flex h-[51px] w-fit cursor-pointer
                     items-center gap-3 rounded-[53px]
                     bg-neutral-50 px-10 text-base font-semibold
                     text-primary transition-colors
                     hover:bg-primary hover:text-white"
            >
              ${mainBanner.buttonText}
              <span>➜</span>
            </a>

          </div>

        </article>

        <div
          class="grid grid-cols-1 gap-4
                 sm:grid-cols-2
                 lg:grid-cols-1 lg:gap-6"
        >

          ${smallBannersHtml}

        </div>

      </div>

    </section>
  `;
}

export function bindHeroEvents() {
  // Hero hiện chưa có sự kiện tương tác
}