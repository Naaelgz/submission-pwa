import { showFormattedDate } from './utils';

export const generateStoriesCard = ({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  lat,
  lon,
}) => {
  return `
    <div tabindex="0" class="story-card" 
         data-id="${id}" 
         data-lat="${lat}" 
         data-lon="${lon}">
      <img class="story-card__image" src="${photoUrl}" alt="${name}">
      <div class="story-card__body">
        <div class="story-card__main">
          <h2 class="story-reportTitle">${name}</h2>
          <div class="story-card__more-info">
            <div class="story-card__created-at">
              <i class="fas fa-calendar-alt"></i> 
              <p>${showFormattedDate(createdAt)}</p>
            </div>
          </div>
        </div>
        <div class="story-card__description">
          <p>${description}</p>
        </div>
      </div>
    </div>
  `;
};
