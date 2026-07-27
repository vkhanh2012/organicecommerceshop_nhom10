import { renderBreadCrumb } from "../descriptions/breadcrumb.js";
import { renderDescription } from "../descriptions/descriptions.js";
//7. Breadcumb
const breadcrumbContainer = document.getElementById("breadcrumb-container");
if (breadcrumbContainer) {
  breadcrumbContainer.innerHTML = renderBreadCrumb();
}

//8.Description
const descriptionContainer = document.getElementById("description-container");
if (descriptionContainer) {
  descriptionContainer.innerHTML = renderDescription();
}
