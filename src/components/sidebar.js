import { renderCategoryFilter } from "./categoryFilter";
import { renderPriceFilter } from "./priceFilter";
import { renderRatingFilter } from "./ratingFilter";
import { renderPopularTags } from "./popularTag";

export function renderSidebarComponent() {
  return /*html*/ `
        <aside class="lg:block space-y-6">
            ${renderCategoryFilter()}
            ${renderPriceFilter()}
            ${renderRatingFilter()}
            ${renderPopularTags()}
        </aside>
    `;
}
