import { renderWishlistSection } from "../wishlist/wishlist.js";
import { getWishlist, removeFromWishlist } from "../wishlist/wishlistData.js";
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

  function renderWishlist() {
    const items = getWishlist().map((item) => ({
      ...item,
      originalPrice: item.originalPrice ?? item.oldPrice ?? null,
      inStock: item.inStock ?? true,
      stockStatusText: item.stockStatusText || "In Stock",
    }));

    wishlistSection.innerHTML = renderWishlistSection(items);
  }

  wishlistSection.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-wishlist]");
    if (!removeButton) return;

    removeFromWishlist(removeButton.dataset.removeWishlist);
    renderWishlist();
  });

  renderWishlist();
}
