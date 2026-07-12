// src/components/footer.js

import { renderSocialIcon } from "./icons.js";

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

const footerLinkClass = "block font-poppins text-sm text-neutral-400 hover:text-white transition-colors mb-2";
const footerColTitleClass = "font-poppins font-semibold text-base mb-4";

function renderFooterColumn({ title, links }) {
  const linksHtml = links.map((l) => `<a href="#" class="${footerLinkClass}">${l}</a>`).join("");
  return `
    <div>
      <div class="${footerColTitleClass}">${title}</div>
      ${linksHtml}
    </div>
  `;
}

export function renderFooterComponent() {
  const columnsHtml = FOOTER_COLUMNS.map(renderFooterColumn).join("");

  return `
  <footer>
    <!-- Newsletter panel -->
    <div class="w-full bg-neutral-50">
      <div class="container-custom flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 py-8 md:py-10">
        <div>
          <div class="font-poppins font-semibold text-xl md:text-2xl text-neutral-900">Subscribe to our Newsletter</div>
          <p class="font-poppins text-sm text-neutral-500 max-w-md">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <input class="px-5 py-3 rounded-full border border-neutral-100 text-sm text-neutral-500 outline-none w-full sm:w-64 font-poppins" type="email" placeholder="Your email address" />
          <button type="button" class="btn btn-medium btn-fill">Subscribe</button>
          ${renderSocialIcon("facebook")}
          ${renderSocialIcon("twitter")}
          ${renderSocialIcon("pinterest")}
          ${renderSocialIcon("instagram")}
        </div>
      </div>
    </div>

    <!-- Footer chính -->
    <div class="w-full bg-neutral-900 text-white">
      <div class="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 py-10 md:py-14">
        <div>
          <div class="flex items-center gap-2">
            <img src="/imagines/plant.jpg" alt="Ecobazar Logo" class="w-8 h-8 object-contain"/>
            <div class="${footerColTitleClass} mb-0">Ecobazar</div>
          </div>
          <p class="font-poppins text-sm text-neutral-400 mb-4">
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
    <div class="w-full bg-neutral-900 border-t border-white/10">
      <div class="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 py-4 font-poppins text-sm text-neutral-500">
        <span>Ecobazar eCommerce © 2024. All Rights Reserved</span>
        <div class="flex items-center gap-3">
          <span>Apple Pay</span><span>VISA</span><span>Discover</span><span>Mastercard</span><span>🔒 Secure Payment</span>
        </div>
      </div>
    </div>
  </footer>
  `;
}