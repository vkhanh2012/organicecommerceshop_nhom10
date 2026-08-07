import { renderWishlistSection } from "../wishlist/wishlist.js";

const wishlistSection = document.getElementById("wishlist-section");
if(wishlistSection) {
  wishlistSection.innerHTML = renderWishlistSection();
}