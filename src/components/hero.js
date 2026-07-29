export function renderHeroComponent(hero) {
  if (!hero) return "";

  const mainBanner = hero.main;
  const smallBanners = hero.smallBanners;

  const hero2 = smallBanners[0];
  const hero3 = smallBanners[1];

  const smallBannersHtml = `
  <!-- HERO 2 -->
  <article
    class="relative min-h-[240px] overflow-hidden rounded-[10px]
           bg-neutral-100 lg:h-[288px]"
  >
    <img
      src="${hero2.image}"
      alt="${hero2.title}"
      class="absolute inset-0 h-full w-full object-cover"
    >

    <div class="relative z-10 flex h-full min-h-[240px]
                max-w-[230px] flex-col justify-start p-7 pt-8
                lg:min-h-[288px]">

      <p class="text-xs font-medium uppercase tracking-wide text-neutral-700">
        ${hero2.subTitle}
      </p>

      <h2 class="mt-2 text-3xl font-semibold text-neutral-900">
        ${hero2.title}
      </h2>

      <p class="mt-2 text-sm text-neutral-600">
        ${hero2.description}
      </p>

      <a
        href="#popular-products"
        class="mt-4 inline-flex w-fit items-center gap-2
               text-sm font-semibold text-primary
               transition-colors hover:text-primary-dark"
      >
        ${hero2.buttonText}
        <span>→</span>
      </a>
    </div>
  </article>

  <!-- HERO 3 -->
  <article
    class="relative min-h-[240px] overflow-hidden rounded-[10px]
           bg-[#002603] lg:h-[288px]"
  >
    <img
      src="${hero3.image}"
      alt="${hero3.title}"
      class="absolute inset-0 h-full w-full object-cover"
    >

    <div class="absolute inset-0 bg-[#002603]/55"></div>

    <div class="relative z-10 flex h-full min-h-[240px]
                flex-col items-center justify-center p-7
                text-center lg:min-h-[288px]">

      <p class="text-xs font-medium uppercase tracking-wide text-white">
        ${hero3.subTitle}
      </p>

      <h2 class="mt-3 text-3xl font-semibold leading-[1.25] text-white">
        ${hero3.title}<br>
        ${hero3.description}
      </h2>

      <a
        href="#popular-products"
        class="mt-6 inline-flex items-center gap-2
               text-sm font-semibold text-primary
               transition-colors hover:text-primary-light"
      >
        ${hero3.buttonText}
        <span>→</span>
      </a>
    </div>
  </article>
`;

  return `
  <section class="bg-white pt-4 md:pt-6" data-hero-root>
    <div class="container-custom">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,872px)_minmax(320px,423px)] lg:gap-6">
        <article class="relative min-h-[360px] overflow-hidden rounded-[10px] bg-[#087f3d] sm:min-h-[430px] lg:h-[600px]">
          <img src="${mainBanner.image}" alt="${mainBanner.title}" class="absolute inset-0 h-full w-full object-cover"/>
          
          <!-- Thay đổi: Tăng độ đậm và vùng phủ của gradient tối từ trái sang để chữ trắng nổi bật lên rõ ràng -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-black/5"></div>
          
          <div class="relative z-10 flex min-h-[360px] max-w-[660px] flex-col justify-center p-7 text-white sm:min-h-[430px] sm:p-12 lg:h-[600px] lg:p-[60px]">
            <h1 class="text-3xl font-semibold leading-[1.2] sm:text-5xl lg:text-[48px]">${mainBanner.title}</h1>
            <div class="mt-5 border-l-2 border-primary-light pl-4">
              <p class="text-base">${mainBanner.saleLabel} <span class="rounded bg-warning px-2 py-1 font-semibold">${mainBanner.saleValue}</span></p>
              <p class="mt-2 text-sm text-white/75">${mainBanner.description}</p>
            </div>
            <a href="#popular-products" class="mt-7 inline-flex h-[51px] w-fit items-center gap-3 rounded-[53px] bg-white px-10 text-base font-semibold text-primary transition-all duration-300 shadow-md hover:bg-primary hover:text-white">${mainBanner.buttonText} <span>→</span></a>
          </div>
        </article>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
          ${smallBannersHtml}
        </div>
      </div>
    </div>
  </section>`;
}

export function bindHeroEvents() {
}
