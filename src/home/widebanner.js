export function renderWideBanner(banner) {
  if (!banner) return "";

  return `
    <section class="container-custom py-10 sm:py-12 lg:pt-[48px] lg:pb-[60px]">
      <article
        class="relative min-h-[320px] overflow-hidden rounded-[10px]
               bg-cover bg-center text-white lg:h-[358px]"
        style="background-image: url('${banner.image}')"
      >
        <div class="relative ml-auto flex min-h-[260px] max-w-[540px]
                    flex-col justify-center p-8 sm:p-12 lg:h-[360px]">

          <p class="text-[15px] font-medium uppercase">
            ${banner.subTitle}
          </p>

          <h2 class="mt-1 text-[55px]">
            <span class="text-warning">${banner.discount}</span>
            ${banner.title}
          </h2>

          <p class="mt-3 text-[16px] text-white/70">
            ${banner.description}
          </p>

          <a
            href="./shop.html"
            class="mt-[25px]
                   inline-flex
                   h-[51px]
                   w-[190px]
                   cursor-pointer
                   items-center
                   justify-center
                   gap-[18px]
                   rounded-full
                   bg-white
                   px-8
                   text-[14px]
                   font-semibold
                   leading-[21px]
                   text-primary
                   transition-colors
                   hover:bg-primary
                   hover:text-white"
          >
            ${banner.buttonText} →
          </a>
        </div>
      </article>
    </section>
  `;
}
