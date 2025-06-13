import { getAllStories, deleteStory } from '../../utils/indexeddb-helper.js';

export default class SavePage {
  async displayContent() {
    return `
      <section class="saved-story">
        <h2>Saved Stories</h2>
        <div id="saved-stories" class="story-list"></div>
      </section>
    `;
  }

  async afterRender() {
    let savedStories = await getAllStories();
    if (!Array.isArray(savedStories)) savedStories = [];

    const container = document.querySelector('#saved-stories');
    savedStories.forEach((story) => {
      const div = document.createElement('div');
      div.classList.add('story-card');
      div.style.margin = '10px';
      div.style.padding = '10px';
      div.style.border = '1px solid #ccc';

      const imageHTML = story.photo
        ? `<img src="${story.photo}" alt="Story Image" style="max-width: 100%; height: auto;" />`
        : '';

      div.innerHTML = `
        ${imageHTML}
        <p><strong>Description:</strong> ${story.description}</p>
        <p><strong>Location:</strong> (${story.lat}, ${story.lon})</p>
        <p><strong>Saved at:</strong> ${new Date(story.createdAt).toLocaleString()}</p>
        <button style="background:red;color:white;border:none;padding:6px;cursor:pointer">Unsave</button>
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