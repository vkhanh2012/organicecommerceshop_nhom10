// src/descriptions/cartData.js

import productsData from "../data/products.json";
import { getImageUrl } from "../utils/assets.js";

const CART_KEY = "shopery-cart";
const catalog = productsData.map((product) => ({ ...product, image: getImageUrl(product.image) }));

function normalizeName(name = "") {
  return String(name).trim().toLowerCase();
}

function findCatalogProduct(item) {
  // Tìm theo tên trước để chuẩn hóa dữ liệu cũ dùng sai ID.
  return catalog.find((product) => normalizeName(product.name) === normalizeName(item.name))
    || catalog.find((product) => String(product.id) === String(item.id));
}

export function normalizeCart(cart = []) {
  const safeInput = Array.isArray(cart) ? cart : [];
  const mergedCart = [];

  safeInput.forEach((rawItem) => {
    if (!rawItem) return;
    const catalogProduct = findCatalogProduct(rawItem);
    const item = {
      id: catalogProduct?.id ?? rawItem.id ?? Date.now(),
      name: catalogProduct?.name ?? rawItem.name ?? "Product",
      image: catalogProduct?.image
        ?? (rawItem.image?.startsWith("/images/") ? getImageUrl(rawItem.image) : rawItem.image)
        ?? "/src/assets/images/cabbage1.svg",
      price: Number(catalogProduct?.price ?? rawItem.currentPrice ?? rawItem.price) || 0,
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
  if (!savedCart) return [];

  try {
    const oldCart = JSON.parse(savedCart);
    const normalizedCart = normalizeCart(Array.isArray(oldCart) ? oldCart : []);
    if (JSON.stringify(oldCart) !== JSON.stringify(normalizedCart)) {
      localStorage.setItem(CART_KEY, JSON.stringify(normalizedCart));
    }
    return normalizedCart;
  } catch {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    return [];
  }
}

export function saveCart(cart) {
  const normalized = normalizeCart(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(normalized));

  // TỰ ĐỘNG BẮN SỰ KIỆN CẬP NHẬT HEADER & POPUP THỜI GIAN THỰC
  if (typeof window.updateNavigationCart === "function") {
    window.updateNavigationCart();
  }
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: normalized }));
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: normalized }));
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

export function addProductToCart(product, quantity = 1) {
  const updatedCart = addProduct(getCart(), {
    ...product,
    quantity,
  });

  saveCart(updatedCart);
  const savedCart = getCart();

  document.dispatchEvent(
    new CustomEvent("cart:updated", {
      detail: { cart: savedCart },
    }),
  );

  return savedCart;
}

export function getCartSummary(cart = getCart()) {
  const safeCart = Array.isArray(cart) ? cart : [];

  return {
    count: safeCart.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0,
    ),
    total: safeCart.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0,
    ),
  };
}

export function changeQuantity(cart, productId, change) {
  const updatedCart = normalizeCart(cart);
  const item = updatedCart.find(
    (product) => String(product.id) === String(productId),
  );

  if (item) {
    item.quantity = Math.max(1, item.quantity + (Number(change) || 0));
  }

  return updatedCart;
}

export function removeProduct(cart, productId) {
  return normalizeCart(cart).filter(
    (product) => String(product.id) !== String(productId),
  );
}
