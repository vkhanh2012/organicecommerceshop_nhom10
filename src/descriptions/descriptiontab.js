// src/descriptions/Description.js

export function renderDescriptionTab(product = {}) {
  // 1. Lấy các đoạn văn mô tả riêng của từng sản phẩm (nếu không có thì dùng mô tả mặc định)
  const paragraphs = product.descriptionParagraphs || [
    product.description || "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    "Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui. Sed iaculis, metus faucibus elementum tincidunt, turpis mi viverra velit."
  ];

  const paragraphsHtml = paragraphs
    .map(pText => `<p class="text-sm text-gray-500 leading-relaxed">${pText}</p>`)
    .join("");

  // 2. Lấy danh sách các gạch đầu dòng tích xanh riêng của từng sản phẩm
  const featureList = product.features || [
    "100 g of fresh organic produce.",
    "Rich source of natural vitamins & minerals.",
    "Sourced directly from certified local eco farms.",
    "No chemical pesticides or artificial preservatives."
  ];

  const featuresHtml = featureList.map(feat => `
    <div class="flex items-start gap-3">
      <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="10" fill="#00B307"/>
          <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="text-sm text-gray-500 font-light">${feat}</span>
    </div>
  `).join("");

  // 3. Lấy ảnh minh họa bên phải của riêng từng sản phẩm
  const sideImage = product.videoImage || product.mainImage || product.image || "";

  return /*html*/ `
    <div class="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12">
      <!-- CỘT TRÁI: Nội dung chữ & gạch đầu dòng tính năng -->
      <div class="lg:col-span-7 space-y-6">
        
        ${paragraphsHtml}
        
        <!-- Các gạch đầu dòng tích xanh -->
        <div class="space-y-3.5 pt-2">
          ${featuresHtml}
        </div>
        
        <p class="text-sm text-gray-500 leading-relaxed pt-2">
          Cras et diam maximus, accumsan sapien et, sollicitudin velit. Nulla blandit eros non turpis lobortis iaculis at ut massa.
        </p>
      </div>
    
      <!-- CỘT PHẢI: Khung ảnh/video minh họa của sản phẩm -->
      <div class="lg:col-span-5 space-y-6">
        <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xs border border-gray-100 bg-white flex items-center justify-center p-4">
          <img src="${sideImage}" alt="${product.name}" class="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  `;
}