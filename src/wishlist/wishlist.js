import { renderWistlistRow } from "../components/wishlistproduct.js"
import { SOCIAL_ICONS } from "../components/icons.js"

export function renderWishlistSection(items = []) {
    const socials = {};
    
  // Tiêu đề của bảng
  const tableHeaders = ["PRODUCT", "PRICE", "STOCK STATUS", ""];
  const tableHeadersHtml = tableHeaders
    .map(
      (header, index) => `
      <th scope="col" class="py-4 px-4 md:px-6 font-medium text-neutral-400 text-xs tracking-wider uppercase ${index === 3 ? "text-right" : ""}">
        ${header}
      </th>
    `,
    )
    .join("")

  const rowsHtml = items
    .map((item) => renderWistlistRow(item))
    .join("") || `<tr><td colspan="4" class="px-6 py-12 text-center text-neutral-500">Your wishlist is empty.</td></tr>`;

  return /*html*/ `
    <section class="w-full bg-white py-8 md:py-14">
        <div class="container-custom">
            <h1 class="text-center text-title-900 font-semibold text-2xl sm:text-[32px]">
                My Wishlist
            </h1>
            <!-- Khung của các sản phẩm -->
            <div class="w-full border border-neutral-200 bg-white shadow-sm rounded-xl overflow-hidden mt-6">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-120 md:min-w-0">
                        <thead>
                            <tr class="border-b border-neutral-200 bg-white">
                                ${tableHeadersHtml}
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-neutral-100">
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
                
                <!-- Share Footer -->
                <div class="flex border-t border-neutral-100 px-4 md:px-6 py-4 items-center gap-3 bg-white">
                    <span class="text-neutral-900 text-sm font-normal">
                        Share:
                    </span>
                    <div class="flex items-center gap-2">
                        <a href="${socials.facebook || "#"}"
                            class="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white transition-opacity hover:opacity-90">
                            ${SOCIAL_ICONS?.facebook || ""}
                        </a>
                        <a href="${socials.twitter || "#"}"
                            class="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:text-[#00B307] transition-colors">
                            ${SOCIAL_ICONS?.twitter || ""}
                        </a>
                        <a href="${socials.pinterest || "#"}"
                            class="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:text-[#00B307] transition-colors">
                            ${SOCIAL_ICONS?.pinterest || ""}
                        </a>
                        <a href="${socials.instagram || "#"}"
                            class="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:text-[#00B307] transition-colors">
                            ${SOCIAL_ICONS?.instagram || ""}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
}
