//TODO => Formato del card number
//TODO => Personalizar el texto de error
//TODO => Refactorizar index
//TODO => Refactorizar styles
//Todo => Refactorizar main



/* Card holder name */
const cardHolderNameInput = document.querySelector('#cardholderName');
const cardImgName = document.querySelector('#cardImgName');
const cardholderNameError = document.querySelector('#cardholderNameError');

cardHolderNameInput.addEventListener('keyup', () => {
  cardImgName.innerHTML = cardHolderNameInput.value;
});

function validateCardHolderName(){
  const cardHolderInputHasNumber = /\d/.test(cardHolderNameInput.value);
  let error = false;

  if(cardHolderNameInput.value.length === 0 || cardHolderInputHasNumber){
    error = true;
  }

  handleErrorState(error, cardholderNameError, cardHolderNameInput);
  return error;
}

/* Card number*/
const cardNumberInput = document.querySelector('#cardNumber');
const cardImgNumber = document.querySelector('#cardImgNumber');
const cardNumberError = document.querySelector('#cardNumberError');

cardNumberInput.addEventListener('keyup', () => {
  cardImgNumber.innerHTML = cardNumberInput.value;
});

function validateCardNumber(){
  let error = false;

  if(monthInput.value.length === 0 || inputHasALetter(cardNumberInput)){
    error = true;
  }
  handleErrorState(error, cardNumberError, cardNumberInput);
  return error;
}


/* Year and date */
const cardimgdate = document.querySelector('#cardimgdate');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const monthError = document.querySelector('#monthError');
const yearError = document.querySelector('#yearError');

let month = '';
let year = '';

monthInput.addEventListener('keyup', () => {
  month = monthInput.value;
  updateMonthAndYear();
});

yearInput.addEventListener('keyup', () => {
  year = yearInput.value;
  updateMonthAndYear();
});

function updateMonthAndYear(){
  cardimgdate.innerHTML = `${month}/${year}`
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



/* cvc */
const cvcInput = document.querySelector('#cvc');
const cardimgcvc = document.querySelector('#cardimgcvc');
const cvcError = document.querySelector('#cvcError');

cvc.addEventListener('keyup', () => {
  cardimgcvc.innerHTML = cvc.value;
});

function validateCvc(){
  let error = false;
  if(cvcInput.value.length === 0 || inputHasALetter(cvcInput)){
    error = true;
  }
  handleErrorState(error, cvcError, cvcInput);

  return error;
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

const cardForm = document.querySelector('#card-form');
const completedState = document.querySelector('#completed-state');

function completeForm(isFormValid){
  cardForm.classList.add('hide-form');
  completedState.classList.remove('hide-completed-state');
  completedState.classList.add('display-completed-state');
}
