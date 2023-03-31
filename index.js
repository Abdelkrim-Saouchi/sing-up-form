const email = document.querySelector('#email');
const country = document.querySelector('#country');
const zipCode = document.querySelector('#zip-code');
const password = document.querySelector('#password');
const passwordLengthMsg = document.querySelector('.sing-up-form__password-msg');
const pswConfirmation = document.querySelector('#psw-confirmation');
const pswConfirmationMsg = document.querySelector(
  '.sing-up-form__confirmation-msg'
);

function checkEmailValidity() {
  if (email.validity.valueMissing) {
    email.setCustomValidity('Please Enter your Email !');
  } else if (email.validity.typeMismatch) {
    email.setCustomValidity(
      'Invalid email format! correct format: 123a@example.com'
    );
  } else {
    email.setCustomValidity('');
  }
}

function checkZipCode() {
  const constraints = {
    ch: [
      '^(CH-)?\\d{4}$',
      'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012',
    ],
    de: [
      '^(D-)?\\d{5}$',
      'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345',
    ],
    nl: [
      '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
      'Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
    ],
    dz: ['^[0-9]{5}$', 'Algeria ZIPs must have exactly 5 digits: e.g. 34000'],
  };

  const countryValue = country.value;
  const constraint = new RegExp(constraints[countryValue][0], '');

  if (zipCode.validity.valueMissing) {
    zipCode.setCustomValidity('Please Enter Zip Code !');
  } else if (constraint.test(zipCode.value)) {
    zipCode.setCustomValidity('');
  } else {
    zipCode.setCustomValidity(constraints[countryValue][1]);
  }
}

function changeErrorMsg(element, msg, msgColor) {
  // eslint-disable-next-line no-param-reassign
  element.textContent = msg;
  // eslint-disable-next-line no-param-reassign
  element.style.color = msgColor;
}

function checkPasswordValidity() {
  if (password.validity.valueMissing) {
    changeErrorMsg(passwordLengthMsg, '', 'red');
    password.setCustomValidity('Please Enter your Password !');
  } else if (password.validity.tooShort) {
    changeErrorMsg(passwordLengthMsg, 'Weak', 'red');
    password.setCustomValidity('Password must be longer than 8 characters');
  } else {
    changeErrorMsg(passwordLengthMsg, 'OK', 'green');
    password.setCustomValidity('');
  }
}

function checkPasswordMatch() {
  if (password.value === pswConfirmation.value) {
    changeErrorMsg(pswConfirmationMsg, '', 'green');
    pswConfirmation.setCustomValidity('');
  } else {
    changeErrorMsg(pswConfirmationMsg, 'Mismatch!', 'red');
    pswConfirmation.setCustomValidity('Password fields do not match!');
  }
}

email.addEventListener('input', checkEmailValidity);
zipCode.addEventListener('input', checkZipCode);
country.addEventListener('change', checkZipCode);
password.addEventListener('input', () => {
  checkPasswordValidity();
  checkPasswordMatch();
});
pswConfirmation.addEventListener('input', checkPasswordMatch);
