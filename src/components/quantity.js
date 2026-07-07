 export function renderQuantityComponent() {
  return `
  <div class="quantity-stepper">
    <button class="quantity-stepper-btn" data-action="decrement">-</button>
    <input class="quantity-stepper-input" type="number" min="1" value="1">
    <button class="quantity-stepper-btn" data-action="increment">+</button>
  </div>
  `;
}