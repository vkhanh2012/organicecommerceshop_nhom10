import "./css/style.css";

import {
  renderNavigationComponent,
  bindNavigationEvents
} from "./components/navigation.js";

import { renderHomepageComponent } from "./components/homepage.js";
import { renderFooterComponent } from "./components/footer.js";
import { bindHeroEvents } from "./components/hero.js";

function initNavigation() {
  const navigation = document.getElementById("navigation-container");

  if (!navigation) return;

  navigation.innerHTML = renderNavigationComponent({
    cartCount: 0,
    cartTotal: "$0.00",
    activeHref: location.pathname
  });

  bindNavigationEvents(navigation);
}

async function initHomepage() {
  const homepage = document.getElementById("homepage-container");

  if (!homepage) return;

  homepage.innerHTML = await renderHomepageComponent();
  bindHeroEvents(homepage);
}

function initFooter() {
  const footer = document.getElementById("footer-container");

  if (!footer) return;

  footer.innerHTML = renderFooterComponent();
}

initNavigation();
initHomepage();
initFooter();