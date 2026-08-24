import productData from "../data/productdata.json";
import { renderImage } from "./Image.js";
import { renderProductInfo } from "./ProductInfo.js";
import { renderDescriptionTab } from "./descriptiontab.js";
import { renderAdditionalInfoTab } from "./additionalInfo.js";
import { renderCustomerFeedbackTab } from "./feedback.js";
import { renderRelatedProducts } from "./RelatedProductCard.js";
import productList from "../data/products.json";


// =====================================================
// TAB LINKS
// =====================================================

const TAB_LINKS = [
  {
    key: "descriptions",
    label: "Descriptions",
    href: "#"
  },
  {
    key: "information",
    label: "Additional Information",
    href: "#"
  },
  {
    key: "feedback",
    label: "Customer Feedback",
    href: "#"
  }
];


// =====================================================
// RENDER DESCRIPTION
// =====================================================

export function renderDescription(
  product = productData,
  activeTabKey = "descriptions"
) {

  const tabsHtml = TAB_LINKS.map(tab => {

    const isActive =
      tab.key === activeTabKey;

    return `
      <a
        href="${tab.href}"
        data-tab="${tab.key}"
        class="tab-link pb-3 text-base font-medium transition-all duration-200 cursor-pointer ${
          isActive
            ? "text-zinc-900 border-b-2 border-[#20B126] font-semibold"
            : "text-zinc-500 hover:text-zinc-900"
        }"
      >
        ${tab.label}
      </a>
    `;

  }).join("");


  let tabContentHtml = "";

  if (activeTabKey === "information") {

    tabContentHtml =
      renderAdditionalInfoTab(product);

  } else if (activeTabKey === "feedback") {

    tabContentHtml =
      renderCustomerFeedbackTab(product);

  } else {

    tabContentHtml =
      renderDescriptionTab(product);

  }


  return /*html*/ `
    <div class="container-custom mx-auto font-['Poppins']">

      <!-- PRODUCT INFORMATION -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 pt-8">

        ${renderImage(product)}

        ${renderProductInfo(product)}

      </div>


      <!-- TABS -->
      <div
        class="border-b border-neutral-200 flex justify-center gap-10 mx-auto -mt-6 translate-x-[42px]"
      >
        ${tabsHtml}
      </div>


      <!-- TAB CONTENT -->
      <div
        id="tab-content-container"
        class="pt-8 pb-12"
      >
        ${tabContentHtml}
      </div>


      <!-- RELATED PRODUCTS -->
      <div class="mt-16">
        ${renderRelatedProducts(product, productList)}
      </div>

    </div>
  `;
}