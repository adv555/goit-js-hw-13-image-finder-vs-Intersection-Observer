import refs from './refs';
// ========= spiner

export function enableSpinner() {
  refs.spinner.classList.remove('hidden');
}
export function disableSpinner() {
  refs.spinner.classList.add('hidden');
}
