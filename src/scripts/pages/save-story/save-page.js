import { getAllStories, deleteStory } from '../../utils/indexeddb-helper.js';

export default class SavePage {
  async displayContent() {
    return `
      <section class="saved-story">
        <h2>Saved Stories</h2>
        <div id="saved-stories" class="story-list"
             style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;"></div>
      </section>
    `;
  }

  async afterRender() {
    let savedStories = await getAllStories();
    if (!Array.isArray(savedStories)) savedStories = [];

    console.log('[LOAD from IDB]', savedStories);

    const container = document.querySelector('#saved-stories');
    savedStories.forEach((story) => {
      const div = document.createElement('div');
      div.classList.add('story-card');
      div.style.margin = '20px';
      div.style.padding = '8px';
      div.style.border = '1px solid #ccc';
      div.style.maxWidth = '250px';
      div.style.flex = '1 1 250px';
      div.style.background = '#2d2f36';
      div.style.borderRadius = '8px';
      div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      div.style.color = '#fff';

      const imageHTML = story.photo
        ? `<img src="${story.photo}" alt="Story Image"
             style="width: 100%; height: auto; max-height: 180px;
             object-fit: cover; border-radius: 6px;" />`
        : '';

      div.innerHTML = `
  <img class="story-card__image" src="${story.photo}" alt="${story.title}" style="width: 100%; border-radius: 6px;">
  <div class="story-card__body" style="padding: 16px;">
    <div class="story-card__main">
      <h2 class="story-reportTitle" style="margin: 0 0 8px;">${story.title}</h2>
      <div class="story-card__more-info">
        <div class="story-card__created-at" style="font-size: 0.85em; color: #bbb;">
          <i class="fas fa-calendar-alt"></i>
          <p style="display: inline; margin-left: 6px;">${new Date(story.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
    <div class="story-card__description" style="margin-top: 10px;">
      <p>${story.description}</p>
    </div>
  </div>
  <button style="background:#00b8c4;color:white;border:none;
                 padding:10px;cursor:pointer;width:100%;border-radius:6px;margin-top:10px;">
    Unsave
  </button>
`;


      const btn = div.querySelector('button');
      btn.addEventListener('click', async () => {
        await deleteStory(story.id);
        div.remove();
        alert('Story removed from offline!');
      });

      container.appendChild(div);
    });
  }
}
