const userForm = document.querySelector("#add-user-form");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const userPasswordRe = document.querySelector("#userPasswordRe");

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", addUserToLocal);

const alertsSection = document.querySelector("#alerts-section");

// Ref: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const regexEmail = /^\S+@\S+\.\S+$/;
// Ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Check User List exists
if (!localStorage.usersList) {
  localStorage.setItem("usersList", JSON.stringify([]));
}

function addUserToLocal(event) {
  event.preventDefault();

  if (!checkFormValidity()) return;

  let usersList = JSON.parse(localStorage.usersList);
  console.log(usersList);
  let user = {
    userName: userName.value,
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  };

  usersList.push(user);

  localStorage.setItem("usersList", JSON.stringify(usersList));

  addAlert("El usuario se ha añadido correctamente", "success");
  userForm.reset();

  setTimeout(() => {
    window.location.pathname = "/users/users-list.html";
  }, 3000);
}

function checkFormValidity() {
  let success = true;

  if (
    !userName.value ||
    !userEmail.value ||
    !userPassword.value ||
    !userPasswordRe.value
  ) {
    addAlert("Introduce todos los datos en el formulario", "danger");
    return false;
  }

  if (!regexEmail.test(userEmail.value)) {
    addAlert("El email introducido no es valido", "danger");
    success = false;
  }

  if (!regexPassword.test(userPassword.value)) {
    addAlert("La contraseña no cumple las condiciones", "danger");
    success = false;
  }

  if (userPassword.value !== userPasswordRe.value) {
    addAlert("Las contraseñas no coinciden", "danger");
    userPassword.value = "";
    userPasswordRe.value = "";
    success = false;
  }

  return success;
}

function addAlert(message, type) {
  let container = document.createElement("div");

  container.innerHTML = [
    `<div class="alert alert-${type}" role="alert">`,
    `   <div>${message}</div>`,
    "</div>",
  ].join("");

  alertsSection.append(container);

  setTimeout(() => {
    alertsSection.innerHTML = "";
  }, 3000);
}
