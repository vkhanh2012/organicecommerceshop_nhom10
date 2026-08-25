export const DEMO_PAGINATION_DATA = {
  currentPage: 1,
  totalPages: 21,
  totalResults: 52,
}

export function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, 4, 5, "...", total]
  }

  if (current >= total - 2) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, "...", current - 1, current, current + 1, "...", total]
}

/**
 * Hàm render thanh phân trang
 * @param {Object} paginationData - Nhận vào object chứa currentPage và totalPages
 */

export function renderPagination(paginationData = DEMO_PAGINATION_DATA) {
  const { currentPage = 1, totalPages = 21 } = paginationData

  // Nếu chỉ có 1 trang hoặc không có dữ liệu thì không hiện thanh phân trang
  if (totalPages <= 1) return ""

  const pages = getPageNumbers(currentPage, totalPages)

  const pagesHtml = pages
    .map((page) => {
      if (page === "...") {
        return /*html*/ `<span class="px-1 md:px-2 text-neutral-400 text-xs md:text-sm select-none">...</span>`
      }

      const isActive = page === currentPage

      return /*html*/ `
        <button 
          data-page="${page}"
          class="js-page-btn w-8 h-8 md:w-9 md:h-9 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
            isActive
              ? "bg-primary text-white shadow-sm scale-105"
              : "text-neutral-700 bg-white hover:bg-neutral-100 hover:text-primary"
          }"
        >
          ${page}
        </button>
      `
    })
    .join("")

  return /*html*/ `
    <div class="flex items-center justify-center gap-1 sm:gap-2 mt-8 md:mt-10 font-poppins w-full select-none">
      <!-- Nút Prev (<) -->
      <button 
        data-page="${currentPage - 1}"
        class="js-page-btn w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:border-neutral-200"
        ${currentPage === 1 ? "disabled" : ""}
        aria-label="Previous Page"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6.5 11L1.5 6L6.5 1"/>
        </svg>
      </button>

      <!-- Các con số trang -->
      <div class="flex items-center gap-1 sm:gap-1.5">
        ${pagesHtml}
      </div>

      <!-- Nút Next (>) -->
      <button 
        data-page="${currentPage + 1}"
        class="js-page-btn w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:border-neutral-200"
        ${currentPage === totalPages ? "disabled" : ""}
        aria-label="Next Page"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1.5 1L6.5 6L1.5 11"/>
        </svg>
      </button>
    </div>
  `
}
