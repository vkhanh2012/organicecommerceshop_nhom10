import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";
import { renderDescription } from "../descriptions/descriptions.js";
import { defaultProductData } from "../descriptions/productdata.js";
import { getProducts } from "../components/productcard.js";
// Biến lưu trạng thái Tab hiện tại
let currentTab = "descriptions";
function renderDescriptionSection(container, product) {
  container.innerHTML = renderDescription(product, currentTab);
  // Sự kiện chuyển Tab khi bấm vào các nút Tab
  const tabLinks = container.querySelectorAll(".tab-link");
  tabLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedTab = link.getAttribute("data-tab");
      if (selectedTab && selectedTab !== currentTab) {
        currentTab = selectedTab;
        renderDescriptionSection(container, product);
      }
    });
  });
}

export async function initDetailsPage() {
  const productId = new URLSearchParams(location.search).get("id");
  const products = await getProducts();
  const selectedProduct = products.find((item) => String(item.id) === String(productId));
  const product = selectedProduct
    ? {
        ...defaultProductData,
        id: selectedProduct.id,
        name: selectedProduct.name,
        currentPrice: selectedProduct.price,
        originalPrice: selectedProduct.oldPrice || selectedProduct.price,
        mainImage: selectedProduct.image,
        thumbnails: [selectedProduct.image],
      }
    : defaultProductData;

  // 7. Breadcrumb
  const breadcrumbContainer = document.getElementById("breadcrumb-container");
  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [
        { label: "Shop", url: "./shop.html" },
        { label: product.name, url: `./descriptions.html?id=${productId || ""}` },
      ],
    });
  }
  // 8. Description
  const descriptionContainer = document.getElementById("description-container");
  if (descriptionContainer) {
    renderDescriptionSection(descriptionContainer, product);

    descriptionContainer.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      const input = descriptionContainer.querySelector(".quantity-stepper-input");
      if (!button || !input) return;

      if (button.dataset.action === "increment") input.value = Number(input.value) + 1;
      if (button.dataset.action === "decrement") input.value = Math.max(1, Number(input.value) - 1);
    });
  }
}
