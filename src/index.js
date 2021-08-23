import './sass/main.scss';
import refs from './js/refs';
import ImageServiceApi from './js/ImageServiceApi-class';
import renderSearchContent from './js/render-search-content';
import zoomImage from './js/image-lightbox';
import { enableSpinner, disableSpinner } from './js/spinner';
import createNotice from './js/notices';
import backToTopBtn from './js/back-to-top-btn';
// import { from } from 'form-data';

// =========== new class instance
const imageServiceApi = new ImageServiceApi();

// =========== listeners

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', zoomImage);

// =========== search data

function onSearch(e) {
  e.preventDefault();

  imageServiceApi.query = e.currentTarget.elements.query.value.trim();

  if (imageServiceApi.query == '' || imageServiceApi.query == null) {
    return createNotice();
  }

  enableSpinner();
  imageServiceApi.resetPage();

  imageServiceApi
    .fetchImages()
    .then(data => {
      refs.gallery.innerHTML = '';
      renderSearchContent(data);
      disableSpinner();
      checkData(data);
      registerIntersectionObserver();
    })
    .catch(err => console.log(err));
}
// =========== observer

function registerIntersectionObserver() {
  const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && imageServiceApi.query !== '') {
        imageServiceApi
          .fetchImages()
          .then(data => {
            renderSearchContent(data);
          })
          .catch(err => console.log(err));
      }
    });
  };
  const options = {
    rootMargin: '200px',
    // treshhold: 0.5,
  };
  const observer = new IntersectionObserver(onEntry, options);

  observer.observe(refs.sentinel);
}

// =========== check data
function checkData(data) {
  if (data.hits.length < 12) {
    disableSpinner();

    return createNotice();
  }
  disableSpinner();
}
// =========== back-to-top-button
backToTopBtn();
