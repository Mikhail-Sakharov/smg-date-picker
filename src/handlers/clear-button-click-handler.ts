export const handleClearButtonClick = (
  anchorElement: HTMLElement,
  firstOutputElement: HTMLElement,
  secondOutputElement: HTMLElement
) => {
  if (firstOutputElement) {
    firstOutputElement.textContent = 'ДД.ММ.ГГГГ';
  }

  if (secondOutputElement) {
    secondOutputElement.textContent = 'ДД.ММ.ГГГГ';
  }

  if (anchorElement) {
    anchorElement.removeAttribute('data-date');
    anchorElement.removeAttribute('data-start-date');
    anchorElement.removeAttribute('data-finish-date');
  }

  document.querySelectorAll('.smg-date-picker__day').forEach((item) => {
    item.classList.remove('smg-date-picker__day--start');
    item.classList.remove('smg-date-picker__day--finish');
    item.classList.remove('smg-date-picker__day--within-the-range');
  });
};
