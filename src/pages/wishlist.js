import { renderWishlistSection } from "../wishlist/wishlist.js";
import { getWishlist, removeFromWishlist } from "../wishlist/wishlistData.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";
import { addProductToCart } from "../shopping_cart/cartData.js";

function showCartNotification(message) {
  let toast = document.getElementById("toast-notification");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "fixed bottom-5 right-5 z-50 translate-y-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300 pointer-events-none";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
  }, 2500);
}

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
    const addCartButton = event.target.closest("[data-add-cart]");
    if (addCartButton && !addCartButton.disabled) {
      event.preventDefault();

      const product = getWishlist().find(
        (item) => String(item.id) === String(addCartButton.dataset.cartId),
      );

      if (product) {
        addProductToCart(product, 1);
        showCartNotification(`${product.name} added to cart.`);
      }

      return;
    }

    const removeButton = event.target.closest("[data-remove-wishlist]");
    if (!removeButton) return;

    removeFromWishlist(removeButton.dataset.removeWishlist);
    renderWishlist();
  });

  renderWishlist();
}
