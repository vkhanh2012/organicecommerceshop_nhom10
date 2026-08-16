export function renderBreadcrumbsComponent(breadcrumbsData) {
    const items = breadcrumbsData?. breadcrumbs || [];

    const breadcrumbsHtml = items.map((item, index) => {
        const isLast = index === items.length - 1;
        //Dấu mũi tên giữa các breadcrumb
        const separator = /*html*/`
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0.500005L4.58333 4.58334L0.5 8.66667" stroke="#999999" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
        `;

        //Nếu là trang hiện tại (cuối cùng)
        if(isLast) {
            return /*html*/`
                <span class="text-primary font-medium cursor-default" aria-current="page">
                ${item.label}
                </span>
            `;
        }

        //Nếu là các trang trước đó
        return /*html*/ `
            <a href="${item.url}" class="text-neutral-400 hover:text-white transition-colors font-medium">
                ${item.label}
            </a>
            ${separator}
        `;
    }).join("");


   return /*html*/ `
   <section class="relative w-full overflow-hidden py-8 md:py-12 lg:py-16 bg-neutral-900">
    <a href="./index.html" class="text-gray-500 hover:text-white transition-colors flex items-center" aria-label="Home">
        <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 10L12 3L20 10V20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2044 9 16V20H4V10Z"
                    stroke="currentColor" 
                    stroke-width="1.5" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                />
            </svg>
        </span>
    </a>

    <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

    <!-- Nội dung chữ của breadcrumbs -->
    <div class="relative z-10 container-custom px-4 md:px-6 lg:px-8">
        <nav aria-label ="Breadcrumb" class ="flex flex-wrap items-center gap 1.5 md:gap-2 text-xs md:text-sm">
      
        <!-- Home -->
        <a href="./index.html" class="text-gray-500 hover:text-white items-center gap-3">
          <span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 10L12 3L20 10V20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2044 9 16V20H4V10Z"
                stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </a>
        ${items.length > 0 ? `
            <span>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 0.500005L4.58333 4.58334L0.5 8.66667" stroke="#999999" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
          </span>
        ` : ''}
        <!-- Render danh sách động -->
        ${breadcrumbsHtml}
        </nav>
    </div>
  </section>
   
   `
}