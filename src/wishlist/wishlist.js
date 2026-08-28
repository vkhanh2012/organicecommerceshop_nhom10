import { renderWistlistRow } from "../components/wishlistproduct.js"
import { SOCIAL_ICONS } from "../components/icons.js"

export function renderWishlistSection(items = []) {
    const socials = {};
    
  // Tiêu đề của bảng
  const tableHeaders = ["PRODUCT", "PRICE", "STOCK STATUS", ""];
  const tableHeadersHtml = tableHeaders
    .map(
      (header, index) => `
      <th scope="col" class="h-12 px-5 md:px-6 font-medium text-neutral-400 text-xs tracking-wide uppercase ${index === 3 ? "text-right" : ""}">
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
                    <table class="w-full min-w-[1227px] table-fixed border-collapse text-left">
                        <colgroup>
                            <col class="w-[40%]">
                            <col class="w-[25%]">
                            <col class="w-[18%]">
                            <col class="w-[17%]">
                        </colgroup>
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
                <div class="flex min-h-[100px] border-t border-neutral-100 px-5 md:px-6 py-4 items-center gap-3 bg-white">
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
