import './css/style.css'; 
import { renderQuantityComponent } from './components/quantity.js';
import { renderTestimonialCardComponent } from './components/testimonialcard.js';
import { renderTestimonialComponent } from './components/testimonial.js';
import { renderLatestNewsWrapper } from './components/latestnewswrapper.js';
import { renderBlogCardComponent } from './components/blogcard.js';


const quantityBox = document.getElementById('quantity');

const testimonialCardBox = document.getElementById('testimonial-card');

const testimonialWrapper = document.getElementById('testimonial-section-wrapper');

const blogCard = document.getElementById('renderBlogCardComponent');

const lastestNewsWrapper = document.getElementById('renderLatestNewsWrapper');

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

if(lastestNewsWrapper){
  lastestNewsWrapper.innerHTML = renderLatestNewsWrapper();
}
