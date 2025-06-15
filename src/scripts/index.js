if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      console.log('✅ Service Worker registered:', reg);
    } catch (err) {
      console.error('❌ SW registration failed:', err);
    }
  });
}


import { subscribeUser } from './utils/pushManager'
import '../../node_modules/leaflet/dist/leaflet.css'
import '../styles/styles.css'
import '../styles/pages/login-page.css'
import '../styles/pages/register-page.css'
import '../styles/pages/home-page.css'
import '../styles/pages/create-story-page.css'

import App from './pages/app'
import Camera from './utils/camera'

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
