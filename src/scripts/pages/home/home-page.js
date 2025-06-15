import { subscribeUser, unsubscribeUser } from '../../utils/pushManager.js';
import { saveStory } from '../../utils/indexeddb-helper.js';
import HomePresenter from './home-presenter';
import * as UserStoriesAPI from '../../data/api';
import { generateStoriesCard } from '../../template';

export default class HomePage {
  #presenter;

  async displayContent() {
    return `
      <section class="home-container">
        <div class="home-page__map__container" aria-label="map showing user stories location">
          <div id="map" class="story__location__map"></div>
        </div>
        <h1 tabindex="-1" class="section-reportTitle">Stories around you</h1>
        <div id="story-list__container"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: UserStoriesAPI,
    });

    this.skipToContentListen();
    this.#presenter.handleGetAllStories();
    this.#presenter.handleLoadMap('map');

    if (!document.querySelector('#subBtn')) {
      const subBtn = document.createElement('button');
      subBtn.id = 'subBtn';
      subBtn.textContent = 'Subscribe';
      subBtn.style.cssText =
        'margin-left: 10px; background: gray; color: white; padding: 6px 12px; border: none; cursor: pointer';

      const navRight = document.querySelector('#nav-list');
      const createStoryBtn = Array.from(navRight.querySelectorAll('button')).find(
        (btn) => btn.textContent.trim() === 'Create Story'
      );

      if (createStoryBtn) {
        createStoryBtn.insertAdjacentElement('afterend', subBtn);
      } else {
        navRight.appendChild(subBtn);
      }

      let subscribed = false;
      subBtn.addEventListener('click', async () => {
        if (!subscribed) {
          await subscribeUser();
          subBtn.textContent = 'Unsubscribe';
          subBtn.style.background = 'red';
        } else {
          await unsubscribeUser();
          subBtn.textContent = 'Subscribe';
          subBtn.style.background = 'gray';
        }
        subscribed = !subscribed;
      });
    }
  }

  skipToContentListen() {
    document.querySelector('.skip-to-content')?.addEventListener('click', () => {
      let mainContent = document.querySelector('.section-reportTitle');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        mainContent.focus();
      }
    });
  }

  populateUserStories(stories) {
    let htmlContent = stories
      .map((story) =>
        generateStoriesCard({
          ...story,
          'data-id': story.id,
          'data-lat': story.lat,
          'data-lon': story.lon,
        })
      )
      .join('');
    document.querySelector('#story-list__container').innerHTML = htmlContent;

    document.querySelectorAll('.story-card').forEach((card) => {
      if (card.querySelector('.save-story-btn')) return;

      const btn = document.createElement('button');
      btn.textContent = 'Save Story';
      btn.classList.add('save-story-btn');
      btn.style.cssText =
        'margin-top:10px;background:green;color:white;padding:6px;border:none;cursor:pointer';

      btn.addEventListener('click', () => {
  const id = card.dataset.id || String(Date.now());
  const title = card.querySelector('h2.story-reportTitle')?.textContent || '-';
const description = card.querySelector('.story-card__description p')?.textContent || '-';
  const image = card.querySelector('img')?.src || '';
  const lat = parseFloat(card.dataset.lat) || 0;
  const lon = parseFloat(card.dataset.lon) || 0;
  const createdAtText = card.querySelector('.story-card__created-at p')?.textContent;
  const createdAt = createdAtText || new Date().toISOString();

  saveStory({ id, title, photo: image, description, lat, lon, createdAt });

  console.log('[SAVED]', { id, title, photo: image, description, lat, lon, createdAt });
  alert('Story saved offline!');
});


      card.appendChild(btn);
    });
  }
}
