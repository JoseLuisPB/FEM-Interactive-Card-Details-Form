//TODO => Formato del card number
//TODO => Segunda pantalla
//TODO => Caso mobile
//TODO => Personalizar el texto de error
//TODO => Refactorizar index
//TODO => Refactorizar styles
//Todo => Refactorizar main
/* 
  Field cannot be left blank => todos
  Wrong format, text only  => cardholder
  Can't be blanck => month, year, cvc
  Wrong format, number only => card number, month, year, cvc
  Allowed 1 to 12  => month
*/


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

  handleErrorState(error, cardholderNameError);
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
  handleErrorState(error, cardNumberError);
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

  handleErrorState(error, monthError);

  return error;
}

function validateYear(){
  let error = false;

  if(yearInput.value.length === 0 || inputHasALetter(yearInput)){
    error = true;
  }
  handleErrorState(error, yearError);

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
  handleErrorState(error, cvcError);

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

function handleErrorState(error, htmlElement){
  if(error){
    htmlElement.classList.remove('hide-error');
    htmlElement.classList.add('display-error');
    return;
  }
  htmlElement.classList.remove('display-error');
  htmlElement.classList.add('hide-error');
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
