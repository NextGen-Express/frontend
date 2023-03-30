const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const firstName = document.querySelector('#first-name').value;
  const lastName = document.querySelector('#last-name').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  
 
  console.log(firstName, lastName, phoneNumber, username, password);
});
