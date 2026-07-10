// src/components/footer.js

const FOOTER_COLUMNS = [
  {
    title: "My Account",
    links: ["My Account", "Order History", "Shoping Cart", "Wishlist"],
  },
  {
    title: "Helps",
    links: ["Contact", "Faqs", "Terms & Condition", "Privacy Policy"],
  },
  {
    title: "Proxy",
    links: ["About", "Shop", "Product", "Track Order"],
  },
  {
    title: "Categories",
    links: ["Fruit & Vegetables", "Meat & Fish", "Bread & Bakery", "Beauty & Health"],
  },
];

function renderFooterColumn({ title, links }) {
  const linksHtml = links.map((l) => `<a href="#" class="footer-link">${l}</a>`).join("");
  return `
    <div>
      <div class="footer-col-title">${title}</div>
      ${linksHtml}
    </div>
  `;
}

export function renderFooterComponent() {
  const columnsHtml = FOOTER_COLUMNS.map(renderFooterColumn).join("");

  return `
  <footer>
    <!-- Newsletter panel -->
    <div class="footer-newsletter-bar">
      <div class="footer-newsletter-inner">
        <div>
          <div class="footer-newsletter-title">Subcribe our Newsletter</div>
          <p class="footer-newsletter-desc">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.
          </p>
        </div>
        <div class="footer-newsletter-form">
          <input class="footer-newsletter-input" type="email" placeholder="Your email address" />
          <button type="button" class="btn btn-medium btn-fill">Subscribe</button>
          <a href="#" class="footer-social-icon" aria-label="Facebook">f</a>
          <a href="#" class="footer-social-icon" aria-label="Twitter">t</a>
          <a href="#" class="footer-social-icon" aria-label="Pinterest">p</a>
          <a href="#" class="footer-social-icon" aria-label="Instagram">i</a>
        </div>
      </div>
    </div>

    <!-- Footer chính -->
    <div class="footer-dark-bar">
      <div class="footer-dark-inner">
        <div>
          <div class="footer-col-title">🌱 Ecobazar</div>
          <p class="footer-desc-text">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.
          </p>
          <div class="text-sm text-white">
            (219) 555-0114 <span class="text-neutral-400">or</span>
            <a href="mailto:proxy@gmail.com" class="underline">Proxy@gmail.com</a>
          </div>
        </div>
        ${columnsHtml}
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-copyright-bar">
      <div class="footer-copyright-inner">
        <span>Ecobazar eCommerce © 2021. All Rights Reserved</span>
        <div class="flex items-center gap-3">
          <span>Apple Pay</span><span>VISA</span><span>Discover</span><span>Mastercard</span><span>🔒 Secure Payment</span>
        </div>
      </div>
    </div>
  </footer>
  `;
}
