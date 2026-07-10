import './css/style.css'; 
import { renderQuantityComponent } from './components/quantity.js';
import { renderArrowButtonComponent } from './components/arrowbutton.js';
import { renderTestimonialCardComponent } from './components/testimonialcard.js';
import {renderTestimonialComponent} from './components/testimonial.js';
import { renderLatestNews } from './components/latestnews.js';
  
import { renderBlogCardComponent } from './components/blogcard.js';

const arrowButtonBox = document.getElementById('arrow-button');

const quantityBox = document.getElementById('quantity');

const testimonialCardBox = document.getElementById('testimonial-card');

const testimonialWrapper = document.getElementById('testimonial-section-wrapper');

const blogCard = document.getElementById('renderBlogCardComponent');

const lastestNewWrapper = document.getElementById('renderLatestNews');

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

if(blogCard){
  blogCard.innerHTML  = renderBlogCardComponent();
}

if(lastestNewWrapper){
  lastestNewWrapper.innerHTML = renderLatestNews();
}
