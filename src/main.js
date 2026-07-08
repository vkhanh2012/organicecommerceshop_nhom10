import './css/style.css'; 
import { renderQuantityComponent } from './components/quantity.js';
import { renderArrowButtonComponent } from './components/arrowbutton.js';
import { renderTestimonialCardComponent } from './components/testimonialcard.js';
import {renderTestimonialComponent} from './components/testimonial.js';
  

const arrowButtonBox = document.getElementById('arrow-button');

const quantityBox = document.getElementById('quantity');

const testimonialCardBox = document.getElementById('testimonial-card');

const testimonialWrapper = document.getElementById('testimonial-section-wrapper');

if (arrowButtonBox) {
  arrowButtonBox.innerHTML = renderArrowButtonComponent();
}

if (quantityBox) {
  quantityBox.innerHTML = renderQuantityComponent();
}

if(testimonialCardBox) {
  testimonialCardBox.innerHTML = renderTestimonialCardComponent();
}

if(testimonialWrapper) {
  testimonialWrapper.innerHTML = renderTestimonialComponent();
}
