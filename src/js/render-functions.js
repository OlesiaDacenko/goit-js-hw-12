// У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції
// для відображення елементів інтерфейсу:

// createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати
// її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
         <div class="info-block">
          <p class="label" >Likes: </p>
          <p class="value" >${likes}</p> </div>
           <div class="info-block">
          <p class="label">Views:</p>
          <p class="value" >${views}</p> </div>
           <div class="info-block">
          <p class="label">Comments:</p>
          <p class="value" >${comments}</p> </div>
           <div class="info-block">
          <p class="label">Downloads:</p>
          <p class="value" >${downloads}</p></div>
        </div>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
  //    метод бібліотеки, який обов'язково потрібно викликати щоразу після додавання нових елементів до галереї.
}

export function clearGallery() {
  gallery.innerHTML = ' ';
}

export function showLoader() {
  document.getElementById('loader').classList.remove('is-hidden');
}

export function hideLoader() {
  document.getElementById('loader').classList.add('is-hidden');
}
// showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more.
// Нічого не повертає.
// hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more.
// Нічого не повертає.
const loadMoreBtn = document.getElementById('load-more-btn');

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
