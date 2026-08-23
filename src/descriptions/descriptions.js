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

export function renderDescription(product = productData, activeTabKey = "descriptions") {
  const tabsHtml = TAB_LINKS.map(tab => {
    const isActive = tab.key === activeTabKey;
    return `
      <a href="${tab.href}" data-tab="${tab.key}" class="tab-link pb-3 text-base font-medium transition-all duration-200 cursor-pointer ${isActive ? 'text-zinc-900 border-b-2 border-[#20B126] font-semibold' : 'text-zinc-500 hover:text-zinc-900'}">
        ${tab.label}
      </a>
    `;
  }).join("");

  let tabContentHtml = "";
  if (activeTabKey === "information") {
    tabContentHtml = renderAdditionalInfoTab(product);
  } else if (activeTabKey === "feedback") {
    tabContentHtml = renderCustomerFeedbackTab(product);
  } else {
    tabContentHtml = renderDescriptionTab(product);
  }

  return /*html*/ `
    <div class="container-custom mx-auto font-['Poppins']">
      
      <!-- THÔNG TIN SẢN PHẨM PHÍA TRÊN -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10">
        ${renderImage(product)}
        ${renderProductInfo(product)}
      </div>
      
      <!-- THANH TABS: Khoảng cách giữa các nút là gap-10 (40px), pb-3 cho viền xanh sát chữ -->
      <div class="border-b border-neutral-200 flex justify-center gap-10 mx-auto -mt-6 translate-x-[42px]">
        ${tabsHtml}
      </div>

      <!-- VÙNG ĐỔ NỘI DUNG: pt-8 (32px) chuẩn khoảng cách từ đường gạch tab xuống chữ -->
      <div id="tab-content-container" class="pt-8 pb-12">
        ${tabContentHtml}
      </div>

      <!-- SẢN PHẨM LIÊN QUAN -->
      <div>
        ${renderRelatedProducts(product, productList)}
      </div>

    </div>
  `;
}