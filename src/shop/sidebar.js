
import { renderCategoryFilter } from "/src/shop/categoryfilter.js";
import { renderPriceFilter } from "/src/shop/priceFilter.js";
import { renderRatingFilter } from "/src/shop/ratingFilter.js";
import { renderPopularTags } from "/src/shop/popularTag.js";
import { renderDiscountBanner } from "/src/shop/discountBanner.js";


export function renderSidebarComponent(products, selectedCategory,
     selectedMinPrice, selectedMaxPrice,selectedRating, selectedTag = "all") {
  return /*html*/ `
        <aside class="lg:block space-y-6">
            ${renderCategoryFilter(products, selectedCategory)}
            ${renderPriceFilter(products, selectedMinPrice,selectedMaxPrice)}
            ${renderRatingFilter(selectedRating)}
            ${renderPopularTags(selectedTag)}
            ${renderDiscountBanner()}
            <div id="sale-products-wrapper"></div>
        </aside>
    `
}
