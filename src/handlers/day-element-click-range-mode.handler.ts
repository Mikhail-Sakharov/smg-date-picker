export const handleRangeModeDayElementClick = (
  anchorElement: HTMLElement,
  firstOutputElement: HTMLElement,
  secondOutputElement: HTMLElement,
  dayElement: Element,
  collection: NodeListOf<Element>
) => {
  const selectedDate = dayElement.getAttribute('data-date'); // ISOString
  const isSelectedDateLessThanTodayDate = new Date(selectedDate!) < new Date(); // block selecting from the past

  if (!isSelectedDateLessThanTodayDate) {
    const startDate = anchorElement.getAttribute('data-start-date');
    const finishDate = anchorElement.getAttribute('data-finish-date');
    const isNothingSelected = !startDate && !finishDate;
    const isOnlyStartDateSelected = startDate && !finishDate;
    const isBothDatesSelected = startDate && finishDate;

    if (isNothingSelected) {
      dayElement.classList.add('smg-date-picker__day--start');
      firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
      anchorElement.setAttribute('data-start-date', selectedDate!);
    }

    if (isOnlyStartDateSelected) {
      const isNewStartDateLessThanSelectedStart = new Date(selectedDate!) < new Date(startDate);

      if (isNewStartDateLessThanSelectedStart) {
        collection.forEach((item) => {
          item.classList.remove('smg-date-picker__day--start');
        });

        dayElement.classList.add('smg-date-picker__day--start');
        firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
        anchorElement.setAttribute('data-start-date', selectedDate!);
      } else {
        const startDateIndex = Array.from(collection).findIndex((item) => item.classList.contains('smg-date-picker__day--start'));
        const finishDateIndex = Array.from(collection).findIndex((item) => item === dayElement);

        collection.forEach((item, index) => {
          const isDayElementWithinTheRange = index > startDateIndex && index < finishDateIndex;
          if (isDayElementWithinTheRange) {
            item.classList.add('smg-date-picker__day--within-the-range');
          }
        });

        dayElement.classList.add('smg-date-picker__day--finish');

        if (secondOutputElement) {
          firstOutputElement.textContent = (new Date(startDate!)).toLocaleDateString();
          secondOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
        } else {
          firstOutputElement.textContent = `${(new Date(startDate!)).toLocaleDateString()} - ${(new Date(selectedDate!)).toLocaleDateString()}`;
        }

        anchorElement.setAttribute('data-finish-date', selectedDate!);
      }
    }

    if (isBothDatesSelected) {
      collection.forEach((item) => {
        item.classList.remove('smg-date-picker__day--start');
        item.classList.remove('smg-date-picker__day--finish');
        item.classList.remove('smg-date-picker__day--within-the-range');
      });

      dayElement.classList.add('smg-date-picker__day--start');
      firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
      anchorElement.setAttribute('data-start-date', selectedDate!);
      anchorElement.removeAttribute('data-finish-date');
    }
  }
};
