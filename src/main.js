import './css/style.css'; 
import { renderQuantityComponent } from './components/quantity.js';

// Tìm cái hộp trống <div id="quantity"></div> bên file HTML
const quantityBox = document.getElementById('quantity');

if (quantityBox) {
  // Đổ thẳng đoạn code HTML từ hàm render vào trong hộp
  quantityBox.innerHTML = renderQuantityComponent();
}