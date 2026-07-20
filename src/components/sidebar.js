import { rendercategoryFilter } from "./categoryfilter";
import { renderPriceFilter } from "./priceFilter";

export function renderSidebarComponent(){
    return /*html*/`
        <aside class="lg:block space-y-6">
            ${rendercategoryFilter()}
            ${renderPriceFilter()}
            <!-- \${renderTagFilter()} -->
        </aside>
    `
}