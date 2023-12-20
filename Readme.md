# Installation

```command
npm i smg-date-picker
```

# Usage

```js
createSMGDatePicker({
  anchorElement: Element;
  firstOutputElement: Element;
  secondOutputElement?: Element;
  mode?: CalendarMode;
  localization?: Localization;
  callback?: (startDate: string, finishDate?: string) => void;
});
```

## Available options

- ### anchorElement

This is the element which is used the smg-date-picker to be linked to.
For example it might be a button element or a custom dropdown element.

- ### firstOutputElement

This element is used to display selected date. In the single mode it displays the only selected date whereas in the range mode it displays selected start date.

- ### secondOutputElement (optional)

This element is used to display the finish date of the selected range.
This element is used only in the range mode and it is optional.
In the case where the secondOutputElement is not passed to the options object, the output will be displayed on the firstOutputElement in the format "dd.mm.yyyy - dd.mm.yyyy".

- ### mode (optional, default: CalendarMode.Single)

There are two modes available:

- CalendarMode.Single
- CalendarMode.Range

- ### localization (optional, default: Localization.Eng)

There are two available options:

- Localization.Eng for English
- Localization.Ru for Russian

- ### callback (optional)

Callback is used to handle any operations. It is invoked with the apply button.
In the single mode it receives only parameter which is referred to the selected single date.
In the range mode it receives two parameters which are referred to the start and finish dates in the selected range respectively.
For example it could be used in the request to a backend API.

## Single mode example

```js
import {createSMGDatePicker, CalendarMode, Localization} from 'smg-date-picker';
import 'smg-date-picker/dist/style.css';

const anchorElement = document.querySelector('.anchor');
const firstOutputElement = document.querySelector('.output');

createSMGDatePicker({
  anchorElement,
  firstOutputElement
});
```

## Range mode example

```js
import {createSMGDatePicker, CalendarMode, Localization} from 'smg-date-picker';
import 'smg-date-picker/dist/style.css';

const anchorElement = document.querySelector('.anchor');
const firstOutputElement = document.querySelector('.first-output');
const secondOutputElement = document.querySelector('.second-output');

const showDates = (startDate, finishDate) => {
  console.log(startDate, finishDate);
};

createSMGDatePicker({
  anchorElement,
  firstOutputElement,
  secondOutputElement,
  mode: CalendarMode.Range;
  localization: Localization.Ru;
  callback: showDates
});
```