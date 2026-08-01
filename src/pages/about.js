import {renderBreadcrumbsComponent} from "../components/breadcrumbs.js"
import {renderAboutUsSection} from "../components/aboutus.js"

const breadcrumnbs = document.getElementById("breadcrumbs-container"); 
if(breadcrumnbs) {
  breadcrumnbs.innerHTML = renderBreadcrumbsComponent({
    breadcrumbs: [
      { label: "About", url: "./about.html" },
    ]
  });
}

const aboutUsSection = document.getElementById("aboutus-section");
if(aboutUsSection) {
  aboutUsSection.innerHTML = renderAboutUsSection();
}