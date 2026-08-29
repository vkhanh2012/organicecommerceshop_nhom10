function renderPromoDetail(banner) {
  if (banner.detailType === "countdown") {
    const items = banner.countdown || [];

    return `
      <div
        class="relative z-10 mt-[13px]
             flex items-start justify-center
             gap-[20px] text-white"
      >
        ${items.map((item, index) => `
          ${index
            ? '<span class="pt-0 text-[14px] leading-[24px] text-white/70">:</span>'
            : ""
          }

          <div class="w-[38px] text-center">
            <strong
              class="block text-[22px]
                     font-normal leading-[30px]"
            >
              ${item.value}
            </strong>

            <span
              class="mt-[1px] block
                     text-[12px] font-normal uppercase
                     leading-[19px] text-white/70"
            >
              ${item.label}
            </span>
          </div>
        `).join("")}
      </div>
    `;
  }
  if (banner.detailType === "price") {
    return `
      <p
        class="relative z-10 mt-[12px]
               text-[18px] font-normal
               leading-[35px] text-white"
      >
        ${banner.detailLabel}
        <strong class="ml-[2px] font-semibold text-warning">
          ${banner.detailValue}
        </strong>
      </p>
    `;
  }

  if (banner.detailType === "discount") {
    return `
      <p
        class="relative z-10 mt-[11px]
               flex items-center justify-center
               gap-[8px]
               text-[18px] font-normal
               leading-[27px] text-neutral-900"
      >
        <span>${banner.detailLabel}</span>

        <strong
          class="rounded-[5px] bg-neutral-900
                 px-3 py-[5px]
                 text-[18x] font-semibold
                 leading-[30px] text-promo-yellow"
        >
          ${banner.detailValue}
        </strong>
      </p>
    `;
  }

  return "";
}


export function renderPromoBanners(banners = []) {
  if (banners.length === 0) return "";

  return `
    <section class="section-container">
      <div
        class="grid grid-cols-1 gap-5
               sm:grid-cols-2
               lg:grid-cols-3 lg:gap-6"
      >
        ${banners.map((banner) => `
          <article
            class="relative min-h-[420px]
                   overflow-hidden rounded-[8px]
                   text-center
                   sm:min-h-[500px]
                   lg:h-[536px]
                   ${banner.textColor}"
          >
            <img
              src="${banner.image}"
              alt=""
              width="424"
              height="536"
              loading="lazy"
              decoding="async"
              class="absolute inset-0
                     h-full w-full object-cover"
            >

            <div
              class="relative z-10
                     px-5 pt-8
                     sm:px-6
                     lg:px-8 lg:pt-[30px]"
            >
              <p
                class="text-[14px]
                       font-medium uppercase
                       leading-[14px]
                       tracking-[0.025em]"
              >
                ${banner.subTitle}
              </p>

              <h3
                class="mt-[15px]
                       text-[32px] font-semibold
                       leading-[38px]
                       sm:text-[36px]
                       lg:text-[40px]
                       lg:leading-[48px]"
              >
                ${banner.title}
              </h3>

              ${renderPromoDetail(banner)}

              <a
                href="./shop.html"
                class="relative z-10
                       mt-[23px]
                       inline-flex h-[45px]
                       cursor-pointer
                       items-center justify-center
                       gap-[8px]
                       rounded-[43px]
                       bg-white px-8
                       text-[14px] font-semibold
                       leading-[21px]
                       text-primary
                       transition-colors
                       hover:bg-primary
                       hover:text-white"
              >
                ${banner.buttonText}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}
