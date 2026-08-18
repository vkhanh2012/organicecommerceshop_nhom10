import wishlistData from "../data/wishlist.json";
import { renderWishlistSection } from "../wishlist/wishlist.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";

export function initWishlistPage() {
  const breadcrumbContainer = document.getElementById("breadcrumbs-container");
  const wishlistSection = document.getElementById("wishlist-section");

  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [{ label: "Wishlist", url: "./wishlist.html" }],
    });
  }

  if (!wishlistSection) return;

  // Wishlist chỉ hiển thị dữ liệu tĩnh từ file JSON.
  const items = wishlistData.wishlist.items.map((item) => ({
    ...item,
    image: item.image.src,
  }));

  wishlistSection.innerHTML = renderWishlistSection(items);
}
