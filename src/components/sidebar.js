import { renderCategoryFilter } from "./categoryFilter";
import { renderPriceFilter } from "./priceFilter";
import { renderRatingFilter } from "./ratingFilter";
import { renderPopularTags } from "./popularTag";
import { renderDiscountBanner } from "./discountBanner";

export function renderSidebarComponent() {
  return /*html*/ `
        <aside class="lg:block space-y-6">
            ${renderCategoryFilter()}
            ${renderPriceFilter()}
            ${renderRatingFilter()}
            ${renderPopularTags()}
            ${renderDiscountBanner()}
        </aside>
    `;
}
