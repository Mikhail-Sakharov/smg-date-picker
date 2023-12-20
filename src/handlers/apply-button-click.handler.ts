export const handleApplyButtonClick = (
  anchorElement: HTMLElement,
  datePickerElement: HTMLElement,
  callback: (startDate: string, finishDate?: string) => void
) => {
  const singleDate = anchorElement.getAttribute('data-date');
  const startDate = anchorElement.getAttribute('data-start-date');
  const finishDate = anchorElement.getAttribute('data-finish-date');

  if (callback && startDate && finishDate) {
    callback(startDate, finishDate);
  }
  if (callback && singleDate) {
    callback(singleDate);
  }
  if (singleDate || startDate && finishDate) {
    datePickerElement.classList.toggle('opened');
  }
};
