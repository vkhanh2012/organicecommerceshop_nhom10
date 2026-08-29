import breadcrumbsImage from "../assets/images/breadcrumbs-optimized.jpg";

const homeIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="h-[20px] w-[20px] md:h-[22px] md:w-[22px] lg:h-[24px] lg:w-[24px]" >
    <path d="M4 10L12 3L20 10V20H15V16C15 14.34 13.66 13 12 13C10.34 13 9 14.34 9 16V20H4V10Z"
      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const separator = `
  <span class="inline-flex shrink-0 items-center text-neutral-500" aria-hidden="true" >
    <svg viewBox="0 0 8 14" fill="none" class="h-[14px] w-2 md:h-[15px] lg:h-4 lg:w-[9px]" >
      <path d="M1 1L7 7L1 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </span>`;

export function renderBreadcrumbsComponent(input = {}) {
  // Tương thích cả code cũ truyền trực tiếp array và code mới truyền { breadcrumbs: [] }.
  const breadcrumbs = Array.isArray(input)
    ? input
    : Array.isArray(input?.breadcrumbs)
      ? input.breadcrumbs
      : [];

  const itemsHtml = breadcrumbs
    .map((item, index) => {
      const isLast = index === breadcrumbs.length - 1;

      if (isLast) {
        return `
          <span class="font-medium text-primary" aria-current="page">
            ${item.label}
          </span>`;
      }

      return `
        <a
          href="${item.url || item.link || "#"}"
          class="text-neutral-400 transition-colors hover:text-white"
        >
          ${item.label}
        </a>
        ${separator}`;
    })
    .join("");

  return `
  <div
    class="relative flex h-24
           items-center overflow-hidden
           bg-neutral-900
           sm:h-[120px]"
  >
    <img
      src="${breadcrumbsImage}"
      alt=""
      width="1920"
      height="120"
      decoding="async"
      fetchpriority="high"
      class="absolute inset-0
             h-full w-full
             object-cover"
    >

    <!-- Tối đúng nửa trái -->
    <div
      class="absolute inset-y-0 left-0
             w-1/2
             bg-black/35"
    ></div>

    <!-- Chỉ làm mềm mép chuyển tiếp -->
    <div
      class="absolute inset-y-0 left-1/2
             w-[35%]
             bg-gradient-to-r
             from-black/35
             to-transparent"
    ></div>

    <div class="container-custom relative z-10">
      <nav
        class="flex flex-wrap items-center gap-2 text-[14px] leading-[21px] md:text-[15px] md:leading-[22px] lg:gap-[10px] lg:text-[16px] lg:leading-[24px]"
        aria-label="Breadcrumb"
      >
        <a
          href="./index.html"
          class="text-neutral-400
                 transition-colors
                 hover:text-white"
          aria-label="Home"
        >
          ${homeIcon}
        </a>

        ${breadcrumbs.length ? separator : ""}
        ${itemsHtml}
      </nav>
    </div>
  </div>
  `
};

// Backward-compatible name used by the checkout module.
export function renderBreadCrumb(breadcrumbs = []) {
  return renderBreadcrumbsComponent(breadcrumbs);
}
