
import { renderCategoryFilter } from "/src/shop/categoryfilter.js";
import { renderPriceFilter } from "/src/shop/priceFilter.js";
import { renderRatingFilter } from "/src/shop/ratingFilter.js";
import { renderPopularTags } from "/src/shop/popularTag.js";
import { renderDiscountBanner } from "/src/shop/discountBanner.js";
import { renderSaleProducts } from "/src/shop/saleProductCards.js";


export function renderSidebarComponent() {
  return /*html*/ `
        <aside class="lg:block space-y-6">
            ${renderCategoryFilter()}
            ${renderPriceFilter()}
            ${renderRatingFilter()}
            ${renderPopularTags()}
            ${renderDiscountBanner()}
            <!-- ${renderSaleProducts()} -->
            <div id="sale-products-wrapper"></div>
        </aside>
    `
}
