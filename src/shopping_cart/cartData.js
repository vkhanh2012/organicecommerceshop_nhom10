import productsData from "../data/products.json";
import { getImageUrl } from "../utils/assets.js";

const CART_KEY = "shopery-cart";
const catalog = productsData.map((product) => ({ ...product, image: getImageUrl(product.image) }));
const defaultCart = [
  { ...catalog.find((product) => product.id === 9), quantity: 1 },
  { ...catalog.find((product) => product.id === 11), quantity: 1 },
];

function normalizeName(name = "") {
  return name.trim().toLowerCase();
}

function findCatalogProduct(item) {
  // Tìm theo tên trước để sửa dữ liệu cũ từng dùng sai ID.
  return catalog.find((product) => normalizeName(product.name) === normalizeName(item.name))
    || catalog.find((product) => String(product.id) === String(item.id));
}

export function normalizeCart(cart = []) {
  const mergedCart = [];

  cart.forEach((rawItem) => {
    const catalogProduct = findCatalogProduct(rawItem);
    const item = {
      id: catalogProduct?.id ?? rawItem.id,
      name: catalogProduct?.name ?? rawItem.name,
      image: catalogProduct?.image
        ?? (rawItem.image?.startsWith("/images/") ? getImageUrl(rawItem.image) : rawItem.image),
      price: Number(catalogProduct?.price ?? rawItem.price) || 0,
      quantity: Math.max(1, Number(rawItem.quantity) || 1),
    };

    const existingItem = mergedCart.find((product) => (
      String(product.id) === String(item.id)
      || normalizeName(product.name) === normalizeName(item.name)
    ));

    if (existingItem) existingItem.quantity += item.quantity;
    else mergedCart.push(item);
  });

  return mergedCart;
}

export function getCart() {
  const savedCart = localStorage.getItem(CART_KEY);
  if (!savedCart) return defaultCart.map((item) => ({ ...item }));

  try {
    const oldCart = JSON.parse(savedCart);
    const normalizedCart = normalizeCart(Array.isArray(oldCart) ? oldCart : []);
    if (JSON.stringify(oldCart) !== JSON.stringify(normalizedCart)) {
      localStorage.setItem(CART_KEY, JSON.stringify(normalizedCart));
    }
    return normalizedCart;
  } catch {
    const fallbackCart = defaultCart.map((item) => ({ ...item }));
    localStorage.setItem(CART_KEY, JSON.stringify(fallbackCart));
    return fallbackCart;
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(normalizeCart(cart)));
}

export function addProduct(cart, product) {
  const updatedCart = normalizeCart(cart);
  const newProduct = normalizeCart([{ ...product }])[0];
  if (!newProduct) return updatedCart;

  const existingItem = updatedCart.find((item) => (
    String(item.id) === String(newProduct.id)
    || normalizeName(item.name) === normalizeName(newProduct.name)
  ));

  if (existingItem) existingItem.quantity += newProduct.quantity;
  else updatedCart.push(newProduct);
  return updatedCart;
}

export function getCartSummary(cart) {
  return {
    count: cart.reduce((sum, item) => sum + item.quantity, 0),
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

export function changeQuantity(cart, productId, change) {
  const updatedCart = normalizeCart(cart);
  const item = updatedCart.find((product) => String(product.id) === String(productId));
  if (item) item.quantity = Math.max(1, item.quantity + change);
  return updatedCart;
}

export function removeProduct(cart, productId) {
  return normalizeCart(cart).filter((product) => String(product.id) !== String(productId));
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