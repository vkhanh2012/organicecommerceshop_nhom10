import breadcrumbsImage from "../assets/images/breadcrumbs.svg";

const homeIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 10L12 3L20 10V20H15V16C15 14.34 13.66 13 12 13C10.34 13 9 14.34 9 16V20H4V10Z"
      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const separator = `<span class="text-neutral-500">›</span>`;

export function renderBreadcrumbsComponent({ breadcrumbs = [] } = {}) {
  const itemsHtml = breadcrumbs.map((item, index) => {
    const isLast = index === breadcrumbs.length - 1;

    if (isLast) {
      return `<span class="font-medium text-primary" aria-current="page">${item.label}</span>`;
    }

    return `
    <a href="${item.url || "#"}" class="footer-link">${item.label}</a>
    ${separator}`;
    }).join("");
    return `
        <div class="relative flex h-24 items-center overflow-hidden bg-neutral-900 sm:h-[120px]">
            <img src="${breadcrumbsImage}" alt="" class="absolute inset-0 h-full w-full object-cover opacity-60">
            <div class="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/85 to-transparent"></div>
            <div class="container-custom relative z-10">
                <nav class="flex flex-wrap items-center gap-2 text-sm" aria-label="Breadcrumb">
                    <a href="./index.html" class="footer-link" aria-label="Home">${homeIcon}</a>
                    ${breadcrumbs.length ? separator : ""}
                    ${itemsHtml}
                </nav>
            </div>
        </div>
    `;
}