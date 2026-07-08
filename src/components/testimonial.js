import { renderTestimonialCardComponent } from './testimonialcard.js';
import { renderArrowButtonComponent } from './arrowbutton.js'; 



export function renderTestimonialComponent() {
return `
    <div class="testimonial-section-wrapper">
        <div class="testimonial-heading"> 
            <span class="testimonial-heading-large">Client Testimonials</span>
            <div class="arrow-button">
            ${renderArrowButtonComponent()}
            </div>
        </div> 

        <div class="testimonial-list">
            ${renderTestimonialCardComponent()}
            ${renderTestimonialCardComponent()}
            ${renderTestimonialCardComponent()}
        </div>
    </div>
`
}