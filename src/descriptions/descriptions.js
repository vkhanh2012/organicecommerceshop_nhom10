import productData from "../data/products.json";
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
        class="tab-link shrink-0 pb-3 text-base font-medium transition-all duration-200 cursor-pointer ${
          isActive
            ? "border-b-2 border-primary font-semibold text-neutral-900"
            : "text-neutral-500 hover:text-neutral-900"
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
    <div class="container-custom font-['Poppins']">

      <!-- PRODUCT INFORMATION -->
      <div class="grid grid-cols-1 gap-8 pb-4 pt-8 lg:grid-cols-2 lg:gap-8 min-[1400px]:grid-cols-[648px_648px] min-[1400px]:gap-6">

        ${renderImage(product)}

        ${renderProductInfo(product)}

      </div>


      <!-- TABS -->
      <div
        class="mx-auto flex justify-center gap-10 border-b border-neutral-200"
      >
        ${tabsHtml}
      </div>


      <!-- TAB CONTENT -->
      <div
        id="tab-content-container"
        class="pb-12 pt-8"
      >
        ${tabContentHtml}
      </div>


      <!-- RELATED PRODUCTS -->
      <div class="mt-10">
        ${renderRelatedProducts(product, productList)}
      </div>

    </div>
  `;
}

