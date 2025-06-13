import CONFIG from '../config';
import { getAccessToken } from '../utils/auth';

const ENDPOINTS = {
  ENDPOINT: `${CONFIG.BASE_URL}/your/endpoint/here`,
  REGISTER_POST_ENDPOINT: `${CONFIG.BASE_URL}/register`,
  LOGIN_POST_ENDPOINT: `${CONFIG.BASE_URL}/login`,
  GET_ALL_STORIES_ENDPOINT: `${CONFIG.BASE_URL}/stories`,
  POST_NEW_STORY_ENDPOINT: `${CONFIG.BASE_URL}/stories`,
};

export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}


export async function postRegistration({ username, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER_POST_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
    }),
  });

  return await response.json();
}

export async function postLogin({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN_POST_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return await response.json();
}


export async function getAllStories() {
  const response = await fetch(ENDPOINTS.GET_ALL_STORIES_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return await response.json();
}

export async function postNewStory({ description, photo, lat, lon }) {
  const formData = new FormData();
  formData.set('description', description);
  formData.append('photo', photo);
  formData.set('lat', lat);
  formData.set('lon', lon);

  const response = await fetch(ENDPOINTS.POST_NEW_STORY_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: formData,
  });

  return await response.json();
}
