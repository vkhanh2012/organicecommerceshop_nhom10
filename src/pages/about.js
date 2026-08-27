import {renderBreadcrumbsComponent} from "../components/breadcrumbs.js"
import {renderAboutUsSection} from "../about/aboutus.js"
import {renderAboutMeSection} from "../about/aboutme.js"
import {renderDeliveredFeature} from "../about/delivered.js"
import { renderTeamSection } from "../about/team.js"
import { renderTestimonialComponent } from "../home/testimonial.js";
import { renderBrandStrip } from "../home/brandstrip.js";


export function initAboutPage() {
const breadcrumbs = document.getElementById("breadcrumbs-container"); 
if(breadcrumbs) {
  breadcrumbs.innerHTML = renderBreadcrumbsComponent({
    breadcrumbs: [
      { label: "About", url: "./about.html" },
    ]
  });
}

const aboutUs = document.getElementById("aboutus-section")
if(aboutUs) {
  aboutUs.innerHTML = renderAboutUsSection();
}

const aboutMeSection = document.getElementById("aboutme-section");
if(aboutMeSection) {
  aboutMeSection.innerHTML = renderAboutMeSection();
}

const deliveredSection = document.getElementById("delivered-section");
if(deliveredSection){
  deliveredSection.innerHTML = renderDeliveredFeature()
}

const teamSection = document.getElementById("team-section");
if(teamSection) {
  teamSection.innerHTML = renderTeamSection();
}

const testimonialSection =
  document.getElementById("testiSection");

if (testimonialSection) {
  testimonialSection.innerHTML =
    renderTestimonialComponent("about");
}

const brandStripSection =
  document.getElementById("brand-strip-section");

if (brandStripSection) {
  brandStripSection.innerHTML =
    renderBrandStrip("about");
}
}
