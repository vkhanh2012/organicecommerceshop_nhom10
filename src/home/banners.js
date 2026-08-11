import bannerData from "../data/banners.json";
import { attachImageUrls, getImageUrl } from "../utils/assets.js";

export async function getBannerData() {
  return {
    hero: {
      ...bannerData.hero,
      main: { ...bannerData.hero.main, image: getImageUrl(bannerData.hero.main.image) },
      smallBanners: attachImageUrls(bannerData.hero.smallBanners),
    },
    promoBanners: attachImageUrls(bannerData.promoBanners),
    wideBanner: { ...bannerData.wideBanner, image: getImageUrl(bannerData.wideBanner.image) },
  };
}