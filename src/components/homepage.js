import { renderHeroComponent } from './hero.js';
import { getProducts, renderProductCard, renderProductGrid } from "./productcard.js";
import { renderInstagramComponent } from './instagram.js';
import { renderLatestNewsWrapper } from './latestnewswrapper.js';
import { renderTestimonialComponent } from './testimonial.js';
import { renderNewsletterComponent } from './newsletter.js';

async function getBannerData() {
  try {
    const response = await fetch("/data/banners.json");

    if (!response.ok) {
      throw new Error("Không thể tải dữ liệu banner");
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      hero: null,
      promoBanners: [],
      wideBanner: null
    };
  }
}

function sectionTitle(title, id='') {
  return `<div class="mb-6 flex items-center justify-between gap-4 md:mb-8"><h2 ${id?`id="${id}"`:''} class="text-2xl font-semibold text-neutral-900 md:text-[32px]">${title}</h2><a href="#" class="text-sm font-medium text-primary">View All →</a></div>`;
}

function renderFeatures() {
  const items = [
    [
      "/images/itemsFeatures/Vector.png",
      "Free Shipping",
      "Free shipping on all your order"
    ],
    [
      "/images/itemsFeatures/headphones.png",
      "Customer Support 24/7",
      "Instant access to Support"
    ],
    [
      "/images/itemsFeatures/shopping-bag.png",
      "100% Secure Payment",
      "We ensure your money is safe"
    ],
    [
      "/images/itemsFeatures/package.png",
      "Money-Back Guarantee",
      "30 Days Money-Back Guarantee"
    ]
  ];

  return `
    <section class="container-custom relative z-10 mt-5 md:mt-6">
      <div class="grid grid-cols-1 overflow-hidden rounded-md bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:grid-cols-2 lg:grid-cols-4">


        ${items.map(([icon, title, description]) => `
          <div class="flex items-center gap-4 p-5 md:p-6">

            <img
              src="${icon}"
              alt="${title}"
              class="h-10 w-10 shrink-0 object-contain"
            >

            <div>
              <h3 class="text-sm font-semibold text-neutral-900">
                ${title}
              </h3>

              <p class="mt-1 text-xs text-neutral-400">
                ${description}
              </p>
            </div>
          </div>
        `).join("")}

      </div>
    </section>
  `;
}

async function getCategories() {
  try {
    const response = await fetch("/data/categories.json");

    if (!response.ok) {
      throw new Error("Không thể tải danh mục");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderCategories(categories = []) {
  return `
    <section class="container-custom py-12 md:py-16">
      ${sectionTitle("Popular Categories")}

      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        ${categories.map(category => `
          <a
            href="#"
            class="group overflow-hidden rounded-md border border-neutral-200 bg-white text-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_12px_rgba(0,178,7,.20)]"
          >
            <div class="aspect-[1.3/1] overflow-hidden p-3">
              <img
                src="${category.image}"
                alt="${category.name}"
                class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              >
            </div>

            <p class="px-2 py-3 text-sm font-medium group-hover:text-primary">
              ${category.name}
            </p>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPromoBanners(banners = []) {
  if (banners.length === 0) return "";

  return `
    <section class="container-custom pb-12 md:pb-16">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-3">

        ${banners.map(banner => `
          <article
            class="relative min-h-[420px] overflow-hidden rounded-lg
                   bg-cover bg-center p-8 text-center ${banner.textColor}"
            style="background-image: url('${banner.image}')"
          >
            <p class="relative text-xs uppercase">
              ${banner.subTitle}
            </p>

            <h3 class="relative mt-2 text-3xl font-semibold">
              ${banner.title}
            </h3>

            <a
              href="#"
              class="relative mt-6 inline-flex rounded-full bg-white
                     px-5 py-3 text-sm font-semibold text-primary"
            >
              ${banner.buttonText} →
            </a>
          </article>
        `).join("")}

      </div>
    </section>
  `;
}
function renderHotDeals(products = []) {
  if (products.length < 13) return "";

  const mainProduct = products[0];
  const rightProducts = products.slice(2, 8);
  const bottomProducts = products.slice(8, 13);

  const renderDealCard = (product, extraClass = "") => `
  <div class="min-w-0 h-full ${extraClass}">
      ${renderProductCard(product)}
    </div>
  `;

  return `<section class="bg-neutral-50 py-12 md:py-16">
    <div class="container-custom">
      ${sectionTitle('Hot Deals','hot-deals')}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
        <article class="col-span-2 flex h-full flex-col border border-primary bg-white p-5 text-center sm:col-span-3 lg:col-span-2 lg:row-span-2 lg:p-6">
          <div class="relative mx-auto aspect-[1.18/1] w-full max-w-[500px] overflow-hidden rounded-md">
            <span class="absolute left-0 top-0 z-10 rounded bg-error px-2.5 py-1 text-xs font-medium text-white">Sale 50%</span>
            <img src="${mainProduct.image}" alt="${mainProduct.name}" class="h-full w-full object-contain"/>
          </div>
          <button class="mt-5 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">Add to Cart</button>
          <h3 class="mt-4 text-sm font-medium text-primary">${mainProduct.name}</h3>

          <p class="mt-1"><strong>$${mainProduct.price.toFixed(2)}</strong>${mainProduct.oldPrice? `<span class="text-neutral-400 line-through">
           $${mainProduct.oldPrice.toFixed(2)}
         </span>`
      : ""
  }
</p>
          <p class="mt-4 text-xs text-neutral-400">Hurry up! Offer ends soon.</p>
        </article>

        ${rightProducts.map(product =>renderDealCard(product, "border-b border-r border-neutral-200")).join("")}
        ${bottomProducts.map(product =>renderDealCard( product, "border-b border-r border-neutral-200")).join("")}
      </div>
    </div>
  </section>`;
}

function renderWideBanner(banner) {
  if (!banner) return "";

  return `
    <section class="container-custom py-12 lg:py-[60px]">
      <article
        class="relative min-h-[260px] overflow-hidden rounded-[10px]
               bg-cover bg-center text-white lg:h-[358px]"
        style="background-image: url('${banner.image}')"
      >
        <div class="relative ml-auto flex min-h-[260px] max-w-[550px]
                    flex-col justify-center p-8 sm:p-12 lg:h-[358px]">

          <p class="text-sm font-medium uppercase">
            ${banner.subTitle}
          </p>

          <h2 class="mt-2 text-4xl font-semibold">
            <span class="text-warning">${banner.discount}</span>
            ${banner.title}
          </h2>

          <p class="mt-3 text-sm text-white/70">
            ${banner.description}
          </p>

          <a
            href="#"
            class="mt-5 inline-flex w-fit rounded-full bg-white
                   px-7 py-3 text-sm font-semibold text-primary"
          >
            ${banner.buttonText} →
          </a>
        </div>
      </article>
    </section>
  `;
}

function renderBrandStrip() {
  return `<section class="container-custom py-8"><div class="grid grid-cols-3 items-center gap-5 text-center text-lg font-semibold text-neutral-300 sm:grid-cols-6">${['steps','MANGO','food','FOOD','BOOK-OFF','G Series'].map(x=>`<span>${x}</span>`).join('')}</div></section>`;
}

async function getInstagramImages() {
  try {
    const response = await fetch("/data/instagram.json");

    if (!response.ok) {
      throw new Error("Không thể tải ảnh Instagram");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function renderHomepageComponent() {
  const products = await getProducts();
  const categories = await getCategories();
  const instagramImages = await getInstagramImages();
  const bannerData = await getBannerData();

  return `
    ${renderHeroComponent(bannerData.hero)}
    ${renderFeatures()}
    ${renderCategories(categories)}

    <section
      id="popular-products"
      class="container-custom pb-12 md:pb-16"
    >
      ${sectionTitle("Popular Products")}
      ${renderProductGrid(products.slice(0, 10))}
    </section>

    ${renderPromoBanners(bannerData.promoBanners)}
    ${renderHotDeals(products)}
    ${renderWideBanner(bannerData.wideBanner)}

    <section class="container-custom pb-12 md:pb-16">
      ${sectionTitle("Featured Products")}
      ${renderProductGrid(products.slice(0, 5))}
    </section>

    ${renderLatestNewsWrapper()}
    ${renderTestimonialComponent()}
    ${renderBrandStrip()}

    ${renderInstagramComponent({
      images: instagramImages,
      handle: ""
    })}

    ${renderNewsletterComponent()}
  `;
}
 
