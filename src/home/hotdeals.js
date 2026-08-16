import { renderProductCard } from "../components/productcard.js";
import { iconStar } from "../components/icons.js";
import { sectionTitle } from "./sectiontitle.js";

export function renderHotDeals(products = []) {
  if (products.length < 13) return "";

  const mainProduct = products.find((product) => Number(product.id) === 3) || products[0];
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

  return `<section class="bg-neutral-50 py-12 md:py-16">
    <div class="container-custom">
      ${sectionTitle('Hot Deals', 'hot-deals')}
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
        <article class="group col-span-2 flex h-full flex-col border border-neutral-200 bg-white p-5 text-center transition-all hover:border-primary hover:shadow-[0_0_12px_rgba(32,181,38,0.32)] sm:col-span-3 lg:col-span-2 lg:row-span-2 lg:p-6">
          <div class="relative mx-auto aspect-[1.18/1] w-full max-w-[500px] overflow-hidden rounded-md">
            <div class="absolute left-0 top-0 z-10 flex gap-1.5">
              <span class="rounded bg-error px-2.5 py-1 text-xs font-medium text-white">Sale 50%</span>
              <span class="rounded bg-blue-500 px-2.5 py-1 text-xs font-medium text-white">Best Sale</span>
            </div>
            <img src="${mainProduct.image}" alt="${mainProduct.name}" class="h-full w-full object-contain"/>
          </div>
          <button
            type="button"
            class="mt-5 cursor-pointer rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            data-add-cart
            data-cart-id="${mainProduct.id}"
            data-cart-name="${mainProduct.name}"
            data-cart-image="${mainProduct.image}"
            data-cart-price="${mainProduct.price}"
          >Add to Cart</button>
          <h3 class="mt-4 text-sm font-medium text-primary">${mainProduct.name}</h3>

          <p class="mt-1"><strong>$${mainProduct.price.toFixed(2)}</strong>${mainProduct.oldPrice ? `<span class="text-neutral-400 line-through">
           $${mainProduct.oldPrice.toFixed(2)}
         </span>`
      : ""
  }
</p>
          <div class="mt-2 flex items-center justify-center">
            <div class="flex">${starsHtml}</div>
            <span class="ml-1 text-xs text-neutral-400">(524 Feedback)</span>
          </div>
          <p class="mt-4 text-xs text-neutral-400">Hurry up! Offer ends In:</p>
          <div class="mt-2 flex items-start justify-center pb-3">
            ${[
              ["01", "Days"],
              ["23", "Hours"],
              ["34", "Mins"],
              ["57", "Secs"],
            ].map(([value, label], index) => `
              ${index ? '<span class="text-neutral-400">:</span>' : ""}
              <div class="w-14 text-center">
                <strong class="block text-lg font-medium">${value}</strong>
                <span class="text-[10px] uppercase tracking-wide text-neutral-400">${label}</span>
              </div>
            `).join("")}
          </div>
        </article>

        ${smallProducts.map(product => renderDealCard(product, "lg:border-b lg:border-r lg:border-neutral-200")).join("")}
      </div>
    </div>
  </section>`;
}
