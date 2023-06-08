const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_oEvQ1sP1tGC3ckFuyx9hqr0pWeUXXp3OCENzWXqOKiZhL4nVFLGEN4a3JFZJxbmb';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, {
    headers: { 'x-api-key': API_KEY },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers: { 'x-api-key': API_KEY },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
