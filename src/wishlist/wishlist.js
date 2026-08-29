import { renderWistlistRow } from "../components/wishlistproduct.js"
import { SOCIAL_ICONS } from "../components/icons.js"

export function renderWishlistSection(items = []) {
    const socials = {};
    
  // Tiêu đề của bảng
  const tableHeaders = ["PRODUCT", "PRICE", "STOCK STATUS", ""];
  const tableHeadersHtml = tableHeaders
    .map(
      (header, index) => `
      <th scope="col" class="h-[46px] px-6 text-sm font-medium uppercase leading-4 tracking-wide text-neutral-500 ${index === 3 ? "text-right" : ""}">
        ${header}
      </th>
    `,
    )
    .join("")

  const rowsHtml = items
    .map((item) => renderWistlistRow(item))
    .join("") || `<tr><td colspan="4" class="px-6 py-12 text-center text-neutral-500">Your wishlist is empty.</td></tr>`;

  return /*html*/ `
    <section class="w-full bg-white pt-10 pb-16 lg:pb-20" aria-labelledby="wishlist-title">
        <div class="container-custom">
            <h1 id="wishlist-title" class="text-center text-neutral-900 font-semibold text-2xl sm:text-[32px] leading-tight">
                My Wishlist
            </h1>
            <!-- Khung của các sản phẩm -->
            <div class="mt-6 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white">
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[1318px] table-fixed border-collapse text-left">
                        <colgroup>
                            <col class="w-[40.53%]">
                            <col class="w-[25.45%]">
                            <col class="w-[15.68%]">
                            <col class="w-[18.34%]">
                        </colgroup>
                        <thead>
                            <tr class="border-b border-neutral-200 bg-white">
                                ${tableHeadersHtml}
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-neutral-200">
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
                
                <!-- Share Footer -->
                <div class="flex min-h-[87px] items-center gap-2.5 border-t border-neutral-200 bg-white px-6 py-3">
                    <span class="text-neutral-900 text-sm font-normal">
                        Share:
                    </span>
                    <div class="flex items-center gap-2">
                        <a href="${socials.facebook || "#"}"
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-all duration-200 hover:bg-primary-dark">
                            ${SOCIAL_ICONS?.facebook || ""}
                        </a>
                        <a href="${socials.twitter || "#"}"
                            class="icon-social"> 
                            ${SOCIAL_ICONS?.twitter || ""}
                        </a>
                        <a href="${socials.pinterest || "#"}"
                            class="icon-social">
                            ${SOCIAL_ICONS?.pinterest || ""}
                        </a>
                        <a href="${socials.instagram || "#"}"
                            class="icon-social">
                            ${SOCIAL_ICONS?.instagram || ""}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
}
