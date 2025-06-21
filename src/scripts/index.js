import { subscribeUser } from './utils/pushManager'
import '../../node_modules/leaflet/dist/leaflet.css'
import '../styles/styles.css'
import '../styles/pages/login-page.css'
import '../styles/pages/register-page.css'
import '../styles/pages/home-page.css'
import '../styles/pages/create-story-page.css'

import App from './pages/app'
import Camera from './utils/camera'

import { registerSW } from 'virtual:pwa-register';
registerSW();

document.addEventListener('DOMContentLoaded', async () => { 
  let app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  })

  await app.renderPage()
  app.updateNavigationVisibility()

  window.addEventListener('hashchange', async () => { 
    await app.renderPage()
    Camera.stopAllStream()
    app.updateNavigationVisibility()
  })
})


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('subscribe-btn')?.addEventListener('click', () => {
    subscribeUser()
  })
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')  
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Registration failed', err));
  });
}




