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
        id="description-tab-${tab.key}"
        data-tab="${tab.key}"
        role="tab"
        aria-controls="tab-content-container"
        aria-selected="${isActive}"
        class="tab-link shrink-0 whitespace-nowrap pb-3 text-sm font-medium transition-all duration-200 cursor-pointer sm:text-base ${
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
      <div class="grid grid-cols-1 gap-6 pb-4 pt-6 sm:pt-8 lg:grid-cols-2 lg:gap-8 min-[1400px]:grid-cols-[648px_648px] min-[1400px]:gap-6">

        ${renderImage(product)}

        ${renderProductInfo(product)}

      </div>


      <!-- TABS -->
      <div
        class="flex w-full justify-start gap-6 overflow-x-auto border-b border-neutral-200 sm:justify-center sm:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Product information"
      >
        ${tabsHtml}
      </div>


      <!-- TAB CONTENT -->
      <div
        id="tab-content-container"
        class="pb-10 pt-6 sm:pb-12 sm:pt-8"
        role="tabpanel"
        aria-labelledby="description-tab-${activeTabKey}"
        tabindex="0"
      >
        ${tabContentHtml}
      </div>


      <!-- RELATED PRODUCTS -->
      <div class="mt-6 sm:mt-10">
        ${renderRelatedProducts(product, productList)}
      </div>

    </div>
  `;
}

