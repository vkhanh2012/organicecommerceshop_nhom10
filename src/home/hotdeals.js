import { renderProductCard } from "../components/productcard.js";
import { iconStar,  iconHeart, iconEye, iconBag } from "../components/icons.js";
import { sectionTitle } from "./sectiontitle.js";

export function renderHotDeals(products = []) {
  if (products.length < 13) return "";

  const mainProduct = products.find((product) => Number(product.id) === 3) || products[0];
  const currentPrice = mainProduct.price ?? 0;
  const oldPrice = mainProduct.oldPrice ?? null;
  const mainProductData = encodeURIComponent(
    JSON.stringify({
      ...mainProduct,
      price: currentPrice,
      oldPrice,
      image: mainProduct.image,
    }),
  );
  const smallProducts = products
    .filter((product) => String(product.id) !== String(mainProduct.id))
    .slice(0, 11);

  const starsHtml = Array.from({ length: 5 }, (_, index) => `
    <span class="${index < mainProduct.rating ? "text-warning" : "text-neutral-200"}">
      ${iconStar(index < mainProduct.rating)}
    </span>
  `).join("");

  const renderDealCard = (product, extraClass = "") => `
  <div class="min-w-0 h-full ${extraClass}">
      ${renderProductCard(product)}
    </div>
  `;

return `
<section
  class="bg-neutral-50
         pt-12 pb-16
         md:pt-[52px] md:pb-16"
>
  <div class="container-custom">

    ${sectionTitle("Hot Deals", "hot-deals")}

    <div
      class="grid grid-cols-2 gap-4
             sm:grid-cols-3
             lg:grid-cols-5
             lg:auto-rows-[327px]
             lg:gap-0"
    >

      <!-- BIG PRODUCT -->
      <article
  class="group relative col-span-2
         flex h-full flex-col
         border border-neutral-200
         bg-white text-center
         transition-all duration-200
         hover:z-10
         hover:border-primary
         hover:shadow-md
         sm:col-span-3
         lg:col-span-2
         lg:row-span-2
         lg:h-[654px]"
>

  <!-- IMAGE AREA -->
  <div
    class="relative w-full shrink-0 overflow-hidden
           lg:h-[366px]"
  >

    <!-- TAG -->
    <div
      class="absolute left-4 top-4 z-10
             flex items-center gap-2"
    >
      <span
        class="rounded bg-error
               px-2 py-1
               text-[12px] font-medium
               leading-[18px] text-white"
      >
        Sale 50%
      </span>

      <span
        class="rounded bg-best-sale
               px-2 py-1
               text-[12px] font-medium
               leading-[18px] text-white"
      >
        Best Sale
      </span>
    </div>

    <img
      src="${mainProduct.image}"
      alt="${mainProduct.name}"
      width="528"
      height="366"
      loading="lazy"
      decoding="async"
      class="h-full w-full object-contain"
    >
  </div>


  <!-- ACTION ROW -->
  <div
    class="flex h-[45px] shrink-0
           items-center gap-2
           px-6"
  >

    <!-- HEART -->
    <button
      type="button"
      aria-label="Wishlist"
      class="flex h-10 w-10 shrink-0
             items-center justify-center
             rounded-full
             border border-neutral-100
             bg-neutral-50
             text-neutral-700
             transition-colors duration-200
             group-hover:border-primary
             group-hover:bg-white
             group-hover:text-primary
             hover:bg-primary
             hover:text-white"
    >
      ${iconHeart}
    </button>


    <!-- ADD TO CART -->
    <button
      type="button"

      data-action="add-to-cart"
      data-id="${mainProduct.id}"
      data-product="${mainProductData}"

      class="flex h-[45px] flex-1
             cursor-pointer
             items-center justify-center
             gap-2
             rounded-[43px]

             bg-neutral-50
             text-[14px] font-semibold
             leading-[21px]
             text-neutral-700

             transition-colors duration-200

             group-hover:bg-primary
             group-hover:text-white

             hover:bg-primary-dark
             hover:text-white"
    >
      <span>Add to Cart</span>
      ${iconBag}
    </button>


    <!-- EYE -->
    <button
      type="button"
      aria-label="Quick view"
      class="flex h-10 w-10 shrink-0
             items-center justify-center
             rounded-full
             border border-neutral-100
             bg-neutral-50
             text-neutral-700
             transition-colors duration-200
             group-hover:border-primary
             group-hover:bg-white
             group-hover:text-primary
             hover:bg-primary
             hover:text-white"
    >
      ${iconEye}
    </button>

  </div>


  <!-- INFORMATION -->
  <div
    class="flex flex-1 flex-col
           items-center
           px-5 pt-[10px]"
  >

    <!-- NAME -->
    <h3
      class="text-[18px] font-normal
             leading-[75px]
             text-neutral-700
             transition-colors
             group-hover:text-primary"
    >
      ${mainProduct.name}
    </h3>


    <!-- PRICE -->
    <div
      class="mt-[3px]
             flex items-baseline
             justify-center"
    >
      <strong
        class="text-[24px] font-medium
               leading-[1px]
               text-neutral-900"
      >
        $${Number(currentPrice).toFixed(2)}
      </strong>

      ${
        oldPrice!== null
          ? `
            <span
              class="ml-1
                     text-[24px] font-normal
                     leading-[1px]
                     text-neutral-400
                     line-through"
            >
               $${Number(oldPrice).toFixed(2)}
            </span>
          `
          : ""
      }
    </div>


    <!-- RATING -->
    <div
      class="mt-[5px]
             flex h-[65px]
             items-center justify-center"
    >
      <div class="flex items-center gap-0">
        ${starsHtml}
      </div>

      <span
        class="ml-2
               text-[13px] font-normal
               leading-[18px]
               text-neutral-400"
      >
        (524 Feedback)
      </span>
    </div>


    <!-- OFFER -->
    <p
      class="mt-[-2px]
             text-[14px] font-normal
             leading-[14px]
             text-neutral-400"
    >
      Hurry up! Offer ends In:
    </p>


    <!-- COUNTDOWN -->
    <div
      class="mt-[14px]
             flex items-start
             justify-center"
    >
      ${[
        ["01", "Days"],
        ["23", "Hours"],
        ["34", "Mins"],
        ["57", "Secs"]
      ].map(([value, label], index) => `
        ${
          index
            ? `
              <span
                class="pt-[1px]
                       text-[14px]
                       leading-[24px]
                       text-neutral-300"
              >
                :
              </span>
            `
            : ""
        }

        <div class="w-[60px] text-center">

          <strong
            class="block
                   text-[18px] font-normal
                   leading-[30px]
                   text-neutral-900"
          >
            ${value}
          </strong>

          <span
            class="mt-[1px] block
                   text-[10px] font-normal
                   uppercase
                   leading-[15px]
                   text-neutral-400"
          >
            ${label}
          </span>

        </div>
      `).join("")}
    </div>

  </div>
</article>


      ${smallProducts
        .map(product =>
          renderDealCard(
            product,
            "lg:border-b lg:border-r lg:border-neutral-200"
          )
        )
        .join("")}

    </div>
  </div>
</section>
`;
}