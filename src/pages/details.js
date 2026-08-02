import { renderBreadCrumb } from "../descriptions/breadcrumb.js";
import { renderDescription } from "../descriptions/descriptions.js";
import { defaultProductData } from "../descriptions/productdata.js";
// Biến lưu trạng thái Tab hiện tại
let currentTab = "descriptions";
function renderDescriptionSection(container) {
  container.innerHTML = renderDescription(defaultProductData, currentTab);
  // Sự kiện chuyển Tab khi bấm vào các nút Tab
  const tabLinks = container.querySelectorAll(".tab-link");
  tabLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedTab = link.getAttribute("data-tab");
      if (selectedTab && selectedTab !== currentTab) {
        currentTab = selectedTab;
        renderDescriptionSection(container);
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // 7. Breadcrumb
  const breadcrumbContainer = document.getElementById("breadcrumb-container");
  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = renderBreadCrumb();
  }
  // 8. Description
  const descriptionContainer = document.getElementById("description-container");
  if (descriptionContainer) {
    renderDescriptionSection(descriptionContainer);
  }
  });