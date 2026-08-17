const WISHLIST_KEY = "shopery-wishlist";

export function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function addToWishlist(product) {
  const wishlist = getWishlist();
  const exists = wishlist.some((item) => String(item.id) === String(product.id));

  if (!exists) {
    wishlist.push(product);
    saveWishlist(wishlist);
  }

  return { wishlist, added: !exists };
}

export function removeFromWishlist(productId) {
  const wishlist = getWishlist().filter(
    (item) => String(item.id) !== String(productId)
  );

  saveWishlist(wishlist);
  return wishlist;
}
