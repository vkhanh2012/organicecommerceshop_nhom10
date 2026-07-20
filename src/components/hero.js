// Hero Homepage_01 — dùng lại component Hero, chỉnh bố cục giống Figma:
// banner lớn bên trái, hai banner nhỏ bên phải; mobile-first xếp dọc.

const HERO_IMAGES = {
  main: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85',
  summer: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=85',
  deal: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85',
};

export function renderHeroComponent() {
  return `
  <section class="bg-white pt-4 md:pt-6" data-hero-root>
    <div class="container-custom">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,872px)_minmax(320px,423px)] lg:gap-6">
        <article class="relative min-h-[360px] overflow-hidden rounded-[10px] bg-[#087f3d] sm:min-h-[430px] lg:h-[600px]">
          <img src="${HERO_IMAGES.main}" alt="Fresh organic vegetables" class="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div class="absolute inset-0 bg-gradient-to-r from-[#056d34]/95 via-[#087f3d]/75 to-transparent"></div>
          <div class="relative z-10 flex min-h-[360px] max-w-[660px] flex-col justify-center p-7 text-white sm:min-h-[430px] sm:p-12 lg:h-[600px] lg:p-[60px]">
            <h1 class="text-3xl font-semibold leading-[1.2] sm:text-5xl lg:text-[48px]">Fresh &amp; Healthy<br>Organic Food</h1>
            <div class="mt-5 border-l-2 border-primary-light pl-4">
              <p class="text-base">Sale up to <span class="rounded bg-warning px-2 py-1 font-semibold">30% OFF</span></p>
              <p class="mt-2 text-sm text-white/75">Free shipping on all your order.</p>
            </div>
            <a href="#popular-products" class="mt-7 inline-flex h-[51px] w-fit items-center gap-3 rounded-[53px] bg-white px-10 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white">Shop now <span>→</span></a>
          </div>
        </article>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
          <article class="relative min-h-[240px] overflow-hidden rounded-[10px] bg-neutral-100 lg:h-[288px]">
            <img src="${HERO_IMAGES.summer}" alt="Summer fruit sale" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/5"></div>
            <div class="relative z-10 flex min-h-[205px] max-w-[245px] flex-col justify-center p-7">
              <p class="text-xs font-medium uppercase tracking-wide text-neutral-700">Summer Sale</p>
              <h2 class="mt-2 text-3xl font-semibold text-neutral-900">75% OFF</h2>
              <p class="mt-2 text-sm text-neutral-600">Only Fruit &amp; Vegetable</p>
              <a href="#popular-products" class="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">Shop Now →</a>
            </div>
          </article>

          <article class="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-[10px] bg-[#173b22] p-7 text-center text-white lg:h-[288px]">
            <img src="${HERO_IMAGES.deal}" alt="Special products" class="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div class="relative z-10">
              <p class="text-xs font-medium uppercase tracking-wide text-white/80">Best Deal</p>
              <h2 class="mt-2 text-2xl font-semibold leading-tight">Special Products<br>Deal of the Month</h2>
              <a href="#hot-deals" class="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">Shop Now →</a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>`;
}

export function bindHeroEvents() {
  // Hero mới không cần slider; giữ hàm để main.js tiếp tục tái sử dụng API cũ.
}
