
import defaultTabContent from "../data/products.json";

export function renderDescriptionTab(product = {}) {
  const fallbackProduct =
    defaultTabContent?.default ||
    (Array.isArray(defaultTabContent) ? defaultTabContent[0] : {}) ||
    {};

  const paragraphs =
    product?.descriptionParagraphs ??
    fallbackProduct?.descriptionParagraphs ??
    [];

  const paragraphsHtml = paragraphs
    .map(
      (pText) => `
        <p class="w-full text-neutral-500 text-sm font-normal leading-[21px]">
          ${pText}
        </p>
      `,
    )
    .join("");

  const featureList =
    product?.features ??
    fallbackProduct?.features ??
    [];

  const featuresHtml = featureList
    .map(
      (feat) => `
        <div class="flex items-center gap-2 py-0.5">
          
          <div class="w-5 h-5 bg-instock rounded-full flex items-center justify-center shrink-0">
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L3.5 6.5L1 4"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <span class="min-w-0 flex-1 text-neutral-500 text-sm font-normal leading-[21px]">
            ${feat}
          </span>

        </div>
      `,
    )
    .join("");

  const closingText =
    product?.closingText ??
    fallbackProduct?.closingText ??
    "";

  const sideImage =
    product?.videoImage ||
    product?.mainImage ||
    product?.image ||
    "/src/assets/images/video.svg";

  const discountTitle =
    product?.additionalInfo?.discount ||
    product?.discountLabel ||
    fallbackProduct?.discount?.title ||
    "";

  const discountSub =
    product?.additionalInfo?.discountSub ||
    fallbackProduct?.discount?.subTitle ||
    "";

  const organicTitle =
    product?.additionalInfo?.organic ||
    fallbackProduct?.organic?.title ||
    "";

  const organicSub =
    product?.additionalInfo?.organicSub ||
    fallbackProduct?.organic?.subTitle ||
    "";

  return /*html*/ `
    <div class="flex w-full flex-col items-start gap-8 lg:flex-row lg:justify-between">

      <!-- CỘT TRÁI -->
      <div class="w-full lg:w-[648px] flex flex-col gap-4 shrink-0">

        <div class="flex flex-col gap-3">
          ${paragraphsHtml}
        </div>

        <div class="flex flex-col gap-2.5 pt-1">
          ${featuresHtml}
        </div>

        <p class="w-full text-neutral-500 text-sm font-normal leading-[21px]">
          ${closingText}
        </p>

      </div>

      <!-- CỘT PHẢI -->
      <div class="w-full lg:w-[536px] flex flex-col gap-6 shrink-0">

        <!-- VIDEO -->
        <div
          class="relative w-full h-[220px] sm:h-[300px] rounded-lg overflow-hidden bg-neutral-100 group"
        >

          <img
            src="${sideImage}"
            alt="${product?.name || "Product Image"}"
            class="w-full h-full object-cover"
          />

          <button
            class="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-12
              h-12
              bg-instock
              hover:bg-primary-dark
              transition-colors
              rounded-full
              flex
              items-center
              justify-center
              shadow-md
              cursor-pointer
            "
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8L1 15V1L13 8Z"
                fill="white"
                stroke="white"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>

        </div>

        <!-- 2 BANNER -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <!-- DISCOUNT -->
          <div
            class="
              flex
              items-center
              gap-3
              p-4
              border
              border-neutral-200
              rounded-xl
              bg-white
              shadow-xs
            "
          >

            <div
              class="
                w-12
                h-12
                rounded-lg
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <span class="text-primary text-xl font-bold">
                %
              </span>
            </div>

            <div class="flex flex-col text-left">

              <span class="text-sm font-semibold text-neutral-900">
                ${discountTitle}
              </span>

              <span class="text-[11px] text-neutral-400 mt-0.5">
                ${discountSub}
              </span>

            </div>

          </div>

          <!-- ORGANIC -->
          <div
            class="
              flex
              items-center
              gap-3
              p-4
              border
              border-neutral-200
              rounded-xl
              bg-white
              shadow-xs
            "
          >

            <div
              class="
                w-12
                h-12
                rounded-lg
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <span class="text-primary text-xl">
                🌱
              </span>
            </div>

            <div class="flex flex-col text-left">

              <span class="text-sm font-semibold text-neutral-900">
                ${organicTitle}
              </span>

              <span class="text-[11px] text-neutral-400 mt-0.5">
                ${organicSub}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
