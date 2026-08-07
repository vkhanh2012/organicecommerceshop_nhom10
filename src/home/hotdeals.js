import { renderProductCard }
  from "../components/productcard.js";

import { sectionTitle }
  from "./sectiontitle.js";

export function renderHotDeals(products = []) {

  if (products.length < 13) {
    return "";
  }

  const mainProduct = products[0];

  const rightProducts = products.slice(2, 8);

  const bottomProducts = products.slice(8, 13);

  const renderDealCard = (
    product,
    extraClass = ""
  ) => `
    <div
      class="flex items-center gap-3 p-4 ${extraClass}"
    >

      <img
        src="${product.image}"
        alt="${product.name}"
        class="h-20 w-20 object-contain"
      />

      <div class="min-w-0">

        <p class="truncate text-sm text-neutral-900">
          ${product.name}
        </p>

        <p class="mt-1 text-sm font-semibold text-neutral-900">
          $${product.price.toFixed(2)}
        </p>

      </div>

    </div>
  `;

  return `
    <section class="container-custom py-10 md:py-14">

      ${sectionTitle("Hot Deals", "hot-deals")}

      <div class="grid gap-6 lg:grid-cols-[minmax(0,520px)_1fr]">

        <!-- Main product -->
        <article
          class="rounded-lg border border-neutral-200 p-6 text-center"
        >

          <p
            class="inline-flex rounded-full bg-red-100 px-3 py-1
                   text-sm font-semibold text-red-600"
          >
            Sale 50%
          </p>

          <img
            src="${mainProduct.image}"
            alt="${mainProduct.name}"
            class="mx-auto mt-6 h-64 w-64 object-contain"
          />

          <button
            class="mt-6 inline-flex cursor-pointer rounded-full
                   bg-primary px-6 py-3 text-sm font-semibold
                   text-white transition-colors
                   hover:bg-primary-dark"
          >
            Add to Cart
          </button>

          <h3
            class="mt-6 text-xl font-semibold text-neutral-900"
          >
            ${mainProduct.name}
          </h3>

          <p class="mt-2 text-lg">

            <strong class="text-neutral-900">
              $${mainProduct.price.toFixed(2)}
            </strong>

            ${
              mainProduct.oldPrice
                ? `
                  <span
                    class="ml-2 text-neutral-400 line-through"
                  >
                    $${mainProduct.oldPrice.toFixed(2)}
                  </span>
                `
                : ""
            }

          </p>

        </article>

        <!-- Side products -->
        <div
          class="grid border border-neutral-200
                 sm:grid-cols-2 lg:grid-cols-3"
        >

          ${rightProducts
            .map((product) =>
              renderDealCard(
                product,
                "border-b border-r border-neutral-200"
              )
            )
            .join("")}

          ${bottomProducts
            .map((product) =>
              renderDealCard(
                product,
                "border-b border-r border-neutral-200"
              )
            )
            .join("")}

        </div>

      </div>

    </section>
  `;
}