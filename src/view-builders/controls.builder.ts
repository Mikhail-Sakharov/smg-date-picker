import {Lang} from '../constant/localization';
import {Localization} from '../enums/localization.enum';

const createButton = (title: string, className?: string) => {
  const buttonContainerElement = document.createElement('div');
  buttonContainerElement.classList.add('smg-date-picker__button-text');
  if (className) {
    buttonContainerElement.classList.add(className);
  }
  const buttonElement = document.createElement('button');
  buttonElement.textContent = title;
  buttonContainerElement.append(buttonElement);

  return buttonContainerElement;
};

export const buildControls = (localization: Localization) => {
  const calendarControlsElement = document.createElement('div');
  calendarControlsElement.classList.add('smg-date-picker__controls');

  const clearButtonTitle = Lang[localization].controls.Clear;
  const applyButtonTitle = Lang[localization].controls.Apply;

  const clearButton = createButton(clearButtonTitle, 'smg-date-picker__clear-button');
  const applyButton = createButton(applyButtonTitle, 'smg-date-picker__apply-button');

  calendarControlsElement.append(clearButton);
  calendarControlsElement.append(applyButton);

  return calendarControlsElement;
};
