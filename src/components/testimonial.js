import { renderTestimonialCardComponent } from './testimonialcard.js';
export function renderTestimonialComponent() {
return `
    <div class="testimonial-section-wrapper">
        <div class="testimonial-heading"> 
            <span class="testimonial-heading-small">CLIENT TESTIMONIALS</span>
            <span class="testimonial-heading-large">What Our Client Says</span>
        </div> 

        <div class="testimonial-list">
            ${renderTestimonialCardComponent()}
            ${renderTestimonialCardComponent()}
            ${renderTestimonialCardComponent()}
        </div>
    </div>



`

}