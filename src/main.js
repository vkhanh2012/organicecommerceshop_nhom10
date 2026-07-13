import "./style.css";

import { renderNavigationComponent } from "./component/nav.js";
import { renderNewsletterComponent } from "./component/newsletter.js";
import { renderFooterComponent } from "./component/footer.js";

const navigationBox = document.getElementById("nav");
const newsletterBox = document.getElementById("newsletter");
const footerBox = document.getElementById("footer");

if (navigationBox) {
    navigationBox.innerHTML = renderNavigationComponent();
}

if (newsletterBox) {
    newsletterBox.innerHTML = renderNewsletterComponent();
}

if (footerBox) {
    footerBox.innerHTML = renderFooterComponent();
}