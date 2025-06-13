
import routes from '../routes/routes'
import { getActiveRoute } from '../routes/url-parser'

class App {
  #content = null
  #drawerButton = null
  #navigationDrawer = null

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content
    this.#drawerButton = drawerButton
    this.#navigationDrawer = navigationDrawer

    this.#setupDrawer()
  }

  #setupDrawer() {
    if (!this.#drawerButton || !this.#navigationDrawer) return;

    this.#drawerButton.addEventListener('click', () => { 
      this.#navigationDrawer.classList.toggle('open')
    })

    document.body.addEventListener('click', event => { 
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open')
      }

      this.#navigationDrawer.querySelectorAll('a').forEach(link => { 
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open')
        }
      })
    })
  }

  async renderPage() {
  if (!this.#content) return;

  let activeRoute = getActiveRoute();
  const routeHandler = routes[activeRoute];

  if (typeof routeHandler === 'function') {
    const page = await routeHandler(); 

    if (page?.displayContent) {
      this.#content.innerHTML = await page.displayContent(); 
      await page.afterRender?.(); 
    } else {
      this.#content.innerHTML = '<p>Page loaded, but no displayContent method found.</p>';
    }
  } else {
    this.#content.innerHTML = '<p>Page not found</p>';
  }
}



  updateNavigationVisibility() {
    if (!this.#navigationDrawer) return;
    const links = this.#navigationDrawer.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === window.location.hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

export default App;
