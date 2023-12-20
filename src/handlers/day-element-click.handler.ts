export const handleDayElementClick = (
  anchorElement: HTMLElement,
  firstOutputElement: HTMLElement,
  dayElement: Element,
  collection: NodeListOf<Element>
) => {
  const selectedDate = dayElement.getAttribute('data-date');
  const isSelectedDateLessThanTodayDate = new Date(selectedDate!) < new Date();
  if (!isSelectedDateLessThanTodayDate) {
    collection.forEach((item) => {
      item.classList.remove('smg-date-picker__day--start');
    });
    dayElement.classList.add('smg-date-picker__day--start');
    firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
    anchorElement.setAttribute('data-date', selectedDate!);
  }
};
