import { renderProductCard } from "../components/productcard.js";
import { sectionTitle } from "./sectiontitle.js";

export function renderHotDeals(products = []) {
  if (products.length < 13) return "";

  const mainProduct = products[0];
  const rightProducts = products.slice(2, 8);
  const bottomProducts = products.slice(8, 13);

  const renderDealCard = (product, extraClass = "") => `
  <div class="min-w-0 h-full ${extraClass}">
      ${renderProductCard(product)}
    </div>
  `;

  return `<section class="bg-neutral-50 py-12 md:py-16">
    <div class="container-custom">
      ${sectionTitle('Hot Deals', 'hot-deals')}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
        <article class="col-span-2 flex h-full flex-col border border-primary bg-white p-5 text-center sm:col-span-3 lg:col-span-2 lg:row-span-2 lg:p-6">
          <div class="relative mx-auto aspect-[1.18/1] w-full max-w-[500px] overflow-hidden rounded-md">
            <span class="absolute left-0 top-0 z-10 rounded bg-error px-2.5 py-1 text-xs font-medium text-white">Sale 50%</span>
            <img src="${mainProduct.image}" alt="${mainProduct.name}" class="h-full w-full object-contain"/>
          </div>
          <button class="mt-5 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">Add to Cart</button>
          <h3 class="mt-4 text-sm font-medium text-primary">${mainProduct.name}</h3>

          <p class="mt-1"><strong>$${mainProduct.price.toFixed(2)}</strong>${mainProduct.oldPrice ? `<span class="text-neutral-400 line-through">
           $${mainProduct.oldPrice.toFixed(2)}
         </span>`
      : ""
  }
</p>
          <p class="mt-4 text-xs text-neutral-400">Hurry up! Offer ends soon.</p>
        </article>

        ${rightProducts.map(product => renderDealCard(product, "border-b border-r border-neutral-200")).join("")}
        ${bottomProducts.map(product => renderDealCard(product, "border-b border-r border-neutral-200")).join("")}
      </div>
    </div>
  </section>`;
}