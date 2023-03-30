const email = document.querySelector('#email');
const submitBtn = document.querySelector('.submit-btn');

email.addEventListener('input', () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity(
      'Invalid email format! correct format: 123a@example.com'
    );
  } else {
    email.setCustomValidity('');
  }
});

submitBtn.addEventListener('submit', () => {});
