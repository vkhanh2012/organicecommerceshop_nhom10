import productData from "../data/productdata.json";
import { renderImage } from "./Image.js";
import { renderProductInfo } from "./ProductInfo.js";
import { renderDescriptionTab } from "./descriptiontab.js";
import { renderAdditionalInfoTab } from "./additionalInfo.js";
import { renderCustomerFeedbackTab } from "./feedback.js";
import { renderRelatedProducts } from "./RelatedProductCard.js";
import productList from "../data/products.json";

export const TAB_LINKS = [
  { label: "Descriptions", key: "descriptions", href: "#descriptions" },
  { label: "Additional Information", key: "information", href: "#information" },
  { label: "Customer Feedback", key: "feedback", href: "#feedback" }
];

export function renderDescription(product = defaultProductData, activeTabKey = "descriptions") {
  // Map danh sách TAB_LINKS
  const tabsHtml = TAB_LINKS.map(tab => {
    const isActive = tab.key === activeTabKey;
    return `
      <a href="${tab.href}" data-tab="${tab.key}" class="tab-link px-2 py-4 text-base font-medium transition-all duration-200 cursor-pointer ${isActive ? 'text-neutral-900 border-b-2 border-primary font-semibold' : 'text-neutral-500 hover:text-neutral-900'}">
        ${tab.label}
      </a>
    `;
  }).join("");

  // Nội dung tab tương ứng
  let tabContentHtml = "";
  if (activeTabKey === "information") {
    tabContentHtml = renderAdditionalInfoTab(product);
  } else if (activeTabKey === "feedback") {
    tabContentHtml = renderCustomerFeedbackTab(product);
  } else {
    tabContentHtml = renderDescriptionTab(product);
  }

  return /*html*/ `
    <div class="container-custom mx-auto px-4 md:px-8 pt-12">
    
      <!-- THÔNG TIN SẢN PHẨM PHÍA TRÊN (Ảnh bên trái, Thông tin chữ bên phải) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
        <!-- CỘT TRÁI: KHU VỰC HÌNH ẢNH -->
        ${renderImage(product)}
        
        <!-- CỘT PHẢI: KHỐI THÔNG TIN -->
        ${renderProductInfo(product)}
      </div>
      
      <!-- THANH TABS CHUYỂN ĐỔI (Descriptions, Additional Information, Customer Feedback) -->
      <div class="border-b border-neutral-200 flex justify-center gap-10">
        ${tabsHtml}
      </div>

      <!-- VÙNG ĐỔ NỘI DUNG TƯƠNG ỨNG -->
      <div id="tab-content-container">
        ${tabContentHtml}
      </div>

      <!-- 📌 PHẦN RELATED PRODUCTS (4 CỘT SẢN PHẨM LIÊN QUAN CHUẨN THIẾT KẾ) -->
      ${renderRelatedProducts(product, productList)}

    </div>
  `;
}