import { Notify } from 'notiflix';

const API_KEY =
  'live_oEvQ1sP1tGC3ckFuyx9hqr0pWeUXXp3OCENzWXqOKiZhL4nVFLGEN4a3JFZJxbmb';

export function fetchBreeds(errorMessage) {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: { 'x-api-key': API_KEY },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    { headers: { 'x-api-key': API_KEY } }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      return;
    });
}
// 'https://api.thecatapi.com/v1/breeds'
// 'https://api.thecatapi.com/v1/images/search'
// `https://api.thecatapi.com/v1/images/search?breed_ids=${'sphy'}`
