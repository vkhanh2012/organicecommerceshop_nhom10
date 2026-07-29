import { renderHeroComponent } from './hero.js';
import { getProducts, renderProductCard, renderProductGrid } from "./productCard.js";
import { renderInstagramComponent } from './instagram.js';
import { renderLatestNewsWrapper } from './latestnewswrapper.js';
import { renderTestimonialComponent } from './testimonial.js';
import { renderNewsletterComponent } from './newsletter.js';

const categories = [
  ['Fresh Fruit','https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80'],
  ['Fresh Vegetables','https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80'],
  ['Meat & Fish','https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=500&q=80'],
  ['Snacks','https://images.unsplash.com/photo-1621939514649-280e2aa9454f?auto=format&fit=crop&w=500&q=80'],
  ['Beverages','https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80'],
  ['Beauty & Health','https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80'],
  ['Bread & Bakery','https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80'],
  ['Baking Needs','https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=500&q=80'],
  ['Cooking','https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=500&q=80'],
  ['Diabetic Food','https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=500&q=80'],
  ['Dish Detergents','https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&w=500&q=80'],
  ['Oil','https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80'],
];

function sectionTitle(title, id='') {
  return `<div class="mb-6 flex items-center justify-between gap-4 md:mb-8"><h2 ${id?`id="${id}"`:''} class="text-2xl font-semibold text-neutral-900 md:text-[32px]">${title}</h2><a href="#" class="text-sm font-medium text-primary">View All →</a></div>`;
}

function renderFeatures() {
  const items = [
    ['🚚','Free Shipping','Free shipping on all your order'],
    ['🎧','Customer Support 24/7','Instant access to Support'],
    ['▣','100% Secure Payment','We ensure your money is safe'],
    ['□','Money-Back Guarantee','30 Days Money-Back Guarantee'],
  ];
  return `<section class="container-custom relative z-10 mt-5 md:mt-6"><div class="grid grid-cols-1 overflow-hidden rounded-md border border-neutral-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] sm:grid-cols-2 lg:grid-cols-4">${items.map(([icon,title,text])=>`<div class="flex items-center gap-4 border-b border-neutral-100 p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 md:p-6"><span class="flex h-10 w-10 items-center justify-center text-2xl text-primary">${icon}</span><div><h3 class="text-sm font-semibold">${title}</h3><p class="mt-1 text-xs text-neutral-400">${text}</p></div></div>`).join('')}</div></section>`;
}

function renderCategories() {
  return `<section class="container-custom py-12 md:py-16">${sectionTitle('Popular Categories')}<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">${categories.map(([name,image])=>`<a href="#" class="group overflow-hidden rounded-md border border-neutral-200 bg-white text-center shadow-[0_1px_5px_rgba(0,0,0,.08)] transition-all duration-300 hover:border-primary hover:shadow-[0_0_12px_rgba(0,178,7,.20)]"><div class="aspect-[1.3/1] overflow-hidden p-3"><img src="${image}" alt="${name}" class="h-full w-full rounded-md object-cover transition duration-300 group-hover:scale-105"></div><p class="border-t border-neutral-50 px-2 py-3 text-sm font-medium group-hover:text-primary">${name}</p></a>`).join('')}</div></section>`;
}

function renderPromoBanners() {
  const banners = [
    ['Best Deals','Sale of the Month','https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80','text-white'],
    ['85% Fat Free','Low-Fat Meat','https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80','text-white'],
    ['Summer Sale','100% Fresh Fruit','https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80','text-neutral-900'],
  ];
  return `<section class="container-custom pb-12 md:pb-16"><div class="grid grid-cols-1 gap-5 md:grid-cols-3">${banners.map(([eyebrow,title,image,color])=>`<article class="relative min-h-[420px] overflow-hidden rounded-lg bg-cover bg-center p-8 text-center ${color}" style="background-image:linear-gradient(rgba(0,0,0,.18),rgba(0,0,0,.18)),url('${image}')"><p class="relative text-xs uppercase">${eyebrow}</p><h3 class="relative mt-2 text-3xl font-semibold">${title}</h3><a href="#" class="relative mt-6 inline-flex rounded-full border border-primary bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">Shop Now →</a></article>`).join('')}</div></section>`;
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

function renderWideBanner() {
  return `<section class="container-custom py-12 lg:py-[60px]">
    <article class="relative min-h-[260px] overflow-hidden rounded-[10px] bg-[#1b2520] text-white lg:h-[358px]"><img 
    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=85" alt="Summer sale" class="absolute inset-0 h-full w-full object-cover opacity-45">
      <div class="relative ml-auto flex min-h-[260px] max-w-[550px] flex-col justify-center p-8 sm:p-12 lg:h-[358px]">
        <p class="text-sm font-medium uppercase">Summer Sale</p>
          <h2 class="mt-2 text-4xl font-semibold">
            <span class="text-warning">37%
            </span> OFF
          </h2>
        <p class="mt-3 text-sm text-white/70">Free on all your online order.</p>
        <a href="#" class="mt-5 inline-flex w-fit rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">Shop Now →</a>
      </div>
    </article>
  </section>`;
}

function renderBrandStrip() {
  return `<section class="container-custom py-8"><div class="grid grid-cols-3 items-center gap-5 text-center text-lg font-semibold text-neutral-300 sm:grid-cols-6">${['steps','MANGO','food','FOOD','BOOK-OFF','G Series'].map(x=>`<span>${x}</span>`).join('')}</div></section>`;
}

export async function renderHomepageComponent() {
  const products = await getProducts();

  const instagram = [
    'https://images.unsplash.com/photo-1561136594-7f68413baa99',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
    'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
    'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea',
    'https://images.unsplash.com/photo-1547592180-85f173990554',
  ];

  return `
    ${renderHeroComponent()}
    ${renderFeatures()}
    ${renderCategories()}

    <section
      id="popular-products"
      class="container-custom pb-12 md:pb-16"
    >
      ${sectionTitle("Popular Products")}
      ${renderProductGrid(products.slice(0, 10))}
    </section>

    ${renderPromoBanners()}
    ${renderHotDeals(products)}
    ${renderWideBanner()}

    <section class="container-custom pb-12 md:pb-16">
      ${sectionTitle("Featured Products")}
      ${renderProductGrid(products.slice(0, 5))}
    </section>

    ${renderLatestNewsWrapper()}
    ${renderTestimonialComponent()}
    ${renderBrandStrip()}

    ${renderInstagramComponent({
      images: instagram,
      handle: "",
    })}

    ${renderNewsletterComponent()}
  `;
}
 
