import { getImageUrl } from "../utils/assets.js";

const CART_KEY = "shopery-cart";

const defaultCart = [
  { id: 9, name: "Green Capsicum", image: getImageUrl("/images/product/green-capsicum.png.png"), price: 14, quantity: 5 },
  { id: 11, name: "Red Capsicum", image: getImageUrl("/images/product/red-capsicum.png.png"), price: 14, quantity: 1 },
];

export function getCart() {
  const savedCart = localStorage.getItem(CART_KEY);
  if (!savedCart) return structuredClone(defaultCart);

  try {
    return JSON.parse(savedCart).map((item) => ({
      ...item,
      image: item.image.startsWith("/images/") ? getImageUrl(item.image) : item.image,
    }));
  } catch {
    return structuredClone(defaultCart);
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCartSummary(cart) {
  return {
    count: cart.reduce((sum, item) => sum + item.quantity, 0),
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

export function changeQuantity(cart, productId, change) {
  const item = cart.find((product) => product.id === productId);
  if (item) item.quantity = Math.max(1, item.quantity + change);
  return cart;
}

export function removeProduct(cart, productId) {
  return cart.filter((product) => product.id !== productId);
}
export function addProductToCart(product, quantity = 1) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.mainImage || product.image,
      price: product.currentPrice || product.price,
      quantity: quantity,
    });
  }

  saveCart(cart);

  return cart;
}