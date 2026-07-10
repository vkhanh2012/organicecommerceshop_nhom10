/*
import './css/style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

setupCounter(document.querySelector('#counter'))

*/

// src/main.js
import './css/style.css';

import { renderNavigationComponent } from './components/navigation.js';
import { renderFooterComponent } from './components/footer.js';
import { renderButtonComponent } from './components/button.js';

// 1. Navigation
const navContainer = document.getElementById('navigation-container');
if (navContainer) {
  navContainer.innerHTML = renderNavigationComponent({
    cartCount: 2,
    cartTotal: '$57.00',
  });
}

// 2. Button — demo đủ 3 size x 3 type
const buttonContainer = document.getElementById('button-container');
if (buttonContainer) {
  const variants = [
    { size: 'small', type: 'fill', label: 'Small Fill' },
    { size: 'medium', type: 'fill', label: 'Medium Fill' },
    { size: 'large', type: 'fill', label: 'Large Fill' },
    { size: 'medium', type: 'border', label: 'Border' },
    { size: 'medium', type: 'ghost', label: 'Ghost' },
  ];
  buttonContainer.innerHTML = variants
    .map((v) => renderButtonComponent(v))
    .join('');
}

// 3. Footer
const footerContainer = document.getElementById('footer-container');
if (footerContainer) {
  footerContainer.innerHTML = renderFooterComponent();
}
