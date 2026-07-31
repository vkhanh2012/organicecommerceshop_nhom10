const CART_KEY = "shopery-cart";

const defaultCart = [
  {
    id: 9,
    name: "Green Capsicum",
    image: "/images/product/green-capsicum.png.png",
    price: 14,
    quantity: 5,
  },
  {
    id: 11,
    name: "Red Capsicum",
    image: "/images/product/red-capsicum.png.png",
    price: 14,
    quantity: 1,
  },
];

export function getCart() {
  const savedCart = localStorage.getItem(CART_KEY);
  if (!savedCart) return defaultCart;

  try {
    return JSON.parse(savedCart);
  } catch {
    return defaultCart;
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCartSummary(cart) {
  return {
    count: cart.reduce((total, item) => total + item.quantity, 0),
    total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
  };
}
