import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { refs } from './js/refs.js';
import { infoMessage } from './js/infoMessage';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const hideCatInfo = () => {
  refs.elementCard.classList.add('hidden');
};

const showCatInfo = () => {
  refs.elementCard.classList.remove('hidden');
};

const loadBreeds = () => {
  return fetchBreeds(errorMessage)
    .then(data => {
      const beers = data.map(el => el);
      for (let i = 0; i < beers.length; i++) {
        const option = document.createElement('option');
        option.textContent = beers[i].name;
        option.value = beers[i].id;
        refs.breedSelect.append(option);
      }
      new SlimSelect({
        select: '.breed-select',
      });
      refs.breedSelect.classList.remove('hidden');
      loadMessage.hideMessage();
    })
    .catch(error => {
      Notify.failure(`${errorMessage.message}`);
    });
};

const showBreed = breedId => {
  return new Promise(resolve => {
    loadMessage.showMessage();
    hideCatInfo();
    fetchCatByBreed(breedId)
      .then(data => {
        const imageUrl = data[0].url;
        const { name, description, temperament } = data[0].breeds[0];
        makeBreedMarkUp({ imageUrl, name, description, temperament });
        showCatInfo();
        resolve();
      })
      .catch(error => {
        loadMessage.hideMessage();
        Notify.failure(`${errorMessage.message}`);
      });
  });
};

const makeBreedMarkUp = (data = {}) => {
  const { imageUrl, name, description, temperament } = data;
  refs.elementCard.innerHTML = `
  <img src="${imageUrl}" alt="${name}" class="cat-img" />
  <div class="cat-descr">
    <h2 class="cat-title">${name}</h2>
    <p class="cat-text">${description}</p>
    <p class="cat-temperament"><b>Temperament: </b>${temperament}</p>
  </div>
  `;
};

const loadMessage = new infoMessage('', refs.loadLabel);
const errorMessage = new infoMessage(
  'Oops! Something went wrong! Try reloading the page!',
  refs.errorLabel
);

loadBreeds();
refs.breedSelect.addEventListener('change', e => {
  const breedId = e.target.value;
  showBreed(breedId).then(() => loadMessage.hideMessage());
});
