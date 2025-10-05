/* Input selectors*/
const cardHolderNameInput = document.querySelector('#cardholderName');
const cardNumberInput = document.querySelector('#cardNumber');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const cvcInput = document.querySelector('#cvc');

/* Card images selectors */
const cardImgName = document.querySelector('#cardImgName');
const cardImgNumber = document.querySelector('#cardImgNumber');
const cardimgdate = document.querySelector('#cardimgdate');
const cardimgcvc = document.querySelector('#cardimgcvc');

/* Error selectors */
const cardholderNameError = document.querySelector('#cardholderNameError');
const cardNumberError = document.querySelector('#cardNumberError');
const monthError = document.querySelector('#monthError');
const yearError = document.querySelector('#yearError');
const cvcError = document.querySelector('#cvcError');

/* Other variables */
const cardForm = document.querySelector('#card-form');
const completedState = document.querySelector('#completed-state');
let month = '';
let year = '';

/* Set placeholder values in cards */
cardImgName.innerHTML = "JANE APPLESEED";
cardImgNumber.innerHTML = "0000 0000 0000 0000";
cardimgdate.innerHTML = "00/00";
cardimgcvc.innerHTML = "000";

cardHolderNameInput.addEventListener('keyup', () => {
  cardImgName.innerHTML = cardHolderNameInput.value;
});

cardNumberInput.addEventListener('keyup', () => {
  cardImgNumber.innerHTML = formatCardNumber(cardNumberInput.value);
});

monthInput.addEventListener('keyup', () => {
  month = monthInput.value;
  updateMonthAndYear();
});

yearInput.addEventListener('keyup', () => {
  year = yearInput.value;
  updateMonthAndYear();
});

cvc.addEventListener('keyup', () => {
  cardimgcvc.innerHTML = cvc.value;
});

function formatCardNumber(cardNumber){
  const cardTotalNumbers = 16;
  let cardFormatedNumber = cardNumber.replace(/\s/g,'').padEnd(cardTotalNumbers, '0');

  return cardFormatedNumber = [
    cardFormatedNumber.substring(0, 4),
    cardFormatedNumber.substring(4, 8),
    cardFormatedNumber.substring(8, 12),
    cardFormatedNumber.substring(12, 16)
  ].join(' ');
}

function updateMonthAndYear(){
  cardimgdate.innerHTML = `${month}/${year}`
}

function submitForm(){
  const errorChecker = [];
  errorChecker.push(validateCardHolderName());
  errorChecker.push(validateCardNumber());
  errorChecker.push(validateMonth());
  errorChecker.push(validateYear());
  errorChecker.push(validateCvc());

  const isFormValid = errorChecker.every(error => error === false);
  if(isFormValid){
    completeForm();
  }
}

function validateCardHolderName(){
  const cardHolderInputHasNumber = /\d/.test(cardHolderNameInput.value);
  let error = false;

  if(cardHolderNameInput.value.length === 0 || cardHolderInputHasNumber){
    error = true;
  }

  handleErrorState(error, cardholderNameError, cardHolderNameInput);
  return error;
}

function validateCardNumber(){
  let error = false;

  if(monthInput.value.length === 0 || inputHasALetter(cardNumberInput)){
    error = true;
  }
  handleErrorState(error, cardNumberError, cardNumberInput);
  return error;
}

function validateMonth(){
  let error = false;

  if(monthInput.value.length === 0 || inputHasALetter(monthInput)) error = true;

  if(!isValidMonthDate(monthInput.value)) error = true;

  handleErrorState(error, monthError, monthInput);

  return error;
}

function validateYear(){
  let error = false;

  if(yearInput.value.length === 0 || inputHasALetter(yearInput)){
    error = true;
  }
  handleErrorState(error, yearError, yearInput);

  return error;
}

function validateCvc(){
  let error = false;
  if(cvcInput.value.length === 0 || inputHasALetter(cvcInput)){
    error = true;
  }
  handleErrorState(error, cvcError, cvcInput);

  return error;
}

function completeForm(isFormValid){
  cardForm.classList.add('hide-form');
  completedState.classList.remove('hide-completed-state');
  completedState.classList.add('display-completed-state');
}

function handleErrorState(error, htmlErrorElement, htmlInputElement){
  if(error){
    htmlErrorElement.classList.remove('hide-error');
    htmlErrorElement.classList.add('display-error');
    htmlInputElement.classList.add('invalid-field');
    return;
  }
  htmlErrorElement.classList.remove('display-error');
  htmlErrorElement.classList.add('hide-error');
  htmlInputElement.classList.remove('invalid-field');
}

function inputHasALetter(inputElement){
  return isNaN(inputElement.value.trim().replace(/\s/g,''));
}

function isValidMonthDate(month){
  return +month >= 1 && +month <= 12;
}
