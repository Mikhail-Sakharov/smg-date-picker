export const handleOutsideDatePickerClick = (
  evt: Event,
  anchorElement: HTMLElement,
  datePickerElement: HTMLElement
) => {
  const isInsideDatePicker = evt.composedPath().includes(datePickerElement);
  const isAnchorElementClicked = evt.composedPath().includes(anchorElement);
  if (!isInsideDatePicker && !isAnchorElementClicked) {
    datePickerElement.classList.remove('opened');
  }
};
