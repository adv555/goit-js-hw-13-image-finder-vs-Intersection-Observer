import refs from '../refs';

export function registerIntersectionObserver() {
  const query = e.currentTarget.elements.query.value.trim();
  const onEntry = entries => {
    entries.forEach(entry => {
      console.log(entry.isIntersecting);
      console.log(entry);
      if (entry.isIntersecting && query !== '') {
        console.log('в зоне видимости', entry);
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
  };
  const observer = new IntersectionObserver(onEntry, options);
  observer.observe(refs.sentinel);
}

export function unregisterIntersectionObserver() {
  const observer = new IntersectionObserver(onEntry, options);

  observer.unobserve(refs.sentinel);
}

// =========== observer

// const onEntry = entries => {
//   entries.forEach(entry => {
//     console.log(entry.isIntersecting);
//     if (entry.isIntersecting && imageServiceApi.query !== '') {
//       console.log('в зоне видимости', entry);
//       imageServiceApi
//         .fetchImages()
//         .then(data => {
//           renderSearchContent(data);
//           checkData(data);
//           scrollContent();
//         })
//         .catch(err => console.log(err));
//     }
//   });
// };
// const options = {
//   rootMargin: '200px',
//   // treshhold: 0.5,
// };
// const observer = new IntersectionObserver(onEntry, options);

// observer.observe(refs.sentinel);
