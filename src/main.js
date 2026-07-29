import './css/style.css';
import { renderNavigationComponent, bindNavigationEvents } from './components/navigation.js';
import { renderHomepageComponent } from './components/homepage.js';
import { renderFooterComponent } from './components/footer.js';
import { bindHeroEvents } from './components/hero.js';

function initNavigation() {
  const el = document.getElementById('navigation-container');
  if (!el) return;
  el.innerHTML = renderNavigationComponent({ cartCount: 0, cartTotal: '$0.00', activeHref: location.pathname });
  bindNavigationEvents(el);
}

async function initHomepage() {
  const element = document.getElementById("homepage-container");

  if (!element) return;

  element.innerHTML = await renderHomepageComponent();
  bindHeroEvents(element);
}

function initFooter() {
  const el = document.getElementById('footer-container');
  if (el) el.innerHTML = renderFooterComponent();
}

initNavigation();
initHomepage();
initFooter();
