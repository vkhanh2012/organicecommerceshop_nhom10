import { bindLocationEvents } from "../checkout/Location.js";
import { renderCheckout } from "../checkout/checkout.js";

const checkoutContainer = document.getElementById("checkout-container");

if (checkoutContainer) {
  checkoutContainer.innerHTML = renderCheckout();
  bindLocationEvents(checkoutContainer);
}