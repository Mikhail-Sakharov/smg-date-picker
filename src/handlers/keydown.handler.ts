export const handleDocumentKeydown = (
  evt: KeyboardEvent,
  datePickerElement: HTMLElement
) => {
  if (evt.key === 'Escape') {
    datePickerElement.classList.remove('opened');
  }
};
