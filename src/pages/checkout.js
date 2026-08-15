
import { renderCheckout } from "../checkout/checkout.js"

const checkoutContainer = document.getElementById("checkout-container")
if (checkoutContainer) {
  checkoutContainer.innerHTML = renderCheckout()
}