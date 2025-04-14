// У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast,
// усі перевірки на довжину масиву в отриманій відповіді та логіку прокручування
// сторінки (scroll) робимо саме в цьому файлі. Імпортуй в нього функції із файлів
//  pixabay-api.js та render-functions.js та викликай їх у відповідний момент.
import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
const searchForm = document.querySelector('.form');
const container = document.querySelector('.gallery');
const loadMore = document.getElementById('load-more-btn');

hideLoadMoreButton();

let page = 1;
let query = ' ';

searchForm.addEventListener('submit', searchFoo);
async function searchFoo(event) {
  event.preventDefault();
  hideLoadMoreButton();
  query = searchForm.elements['search-text'].value.trim();
  if (!query) {
    iziToast.error({
      message: 'Поле пошуку не може бути порожнім. Введіть запит!',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();
  await getImagesByQuery(query, page)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      const totalPages = Math.ceil(data.totalHits / 15);
      createGallery(data.hits);
      if (page < totalPages) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'Не вдалося завантажити зображення. Спробуйте пізніше.',
        position: 'topRight',
      });

      console.log(error.message);
    })

    .finally(() => {
      hideLoader();
      event.target.reset();
    });
}
loadMore.addEventListener('click', onLoadMore);

async function onLoadMore(event) {
  page++;
  loadMore.disabled = true;
  loadMore.innerHTML = 'Loading...';

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    loadMore.disabled = false;
    loadMore.innerHTML = 'Load more';
    const totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    const card = document.querySelector('.gallery-item');
    console.log(card.getBoundingClientRect());
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
    iziToast.error({
      message: 'Не вдалося завантажити ще зображень.',
      position: 'topRight',
    });
  } finally {
    loadMore.disabled = false;
    loadMore.innerHTML = 'Load more';
  }
}
