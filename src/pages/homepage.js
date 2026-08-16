import { renderHeroComponent } from '../home/hero.js';
import { getProducts, renderProductGrid } from "../components/productcard.js";
import { getInstagramImages, renderInstagramComponent } from '../home/instagram.js';
import { renderLatestNewsWrapper } from '../home/latestnewswrapper.js';
import { renderTestimonialComponent } from '../home/testimonial.js';
import { getBannerData } from '../home/banners.js';
import { renderFeatures } from '../home/features.js';
import { getCategories, renderCategories } from '../home/categories.js';
import { renderPromoBanners } from '../home/promobanners.js';
import { renderHotDeals } from '../home/hotdeals.js';
import { renderWideBanner } from '../home/widebanner.js';
import { renderBrandStrip } from '../home/brandstrip.js';
import { sectionTitle } from '../home/sectiontitle.js';

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

  `;
}
