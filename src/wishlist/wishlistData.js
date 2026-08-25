const WISHLIST_KEY = "shopery-wishlist";

export function getWishlist() {
  try {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY));
    return Array.isArray(wishlist) ? wishlist : [];
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

export function isInWishlist(productId) {
  return getWishlist().some(
    (item) => String(item.id) === String(productId)
  );
}

export function toggleWishlist(product) {
  if (isInWishlist(product.id)) {
    return {
      wishlist: removeFromWishlist(product.id),
      added: false,
    };
  }

  return addToWishlist(product);
}
