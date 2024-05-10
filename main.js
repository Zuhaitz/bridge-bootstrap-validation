const userForm = document.querySelector("#add-user-form");
const userName = document.querySelector("#userName");
const userMail = document.querySelector("#userMail");
const userPassword = document.querySelector("#userPassword");
const userPasswordRe = document.querySelector("#userPasswordRe");
const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", addUserToLocal);

// Check User List exists
if (!localStorage.userList) {
  localStorage.setItem("userList", JSON.stringify([]));
}

function addUserToLocal(event) {
  event.preventDefault();

  userName.attributes["class"] = "is-invalid";
  if (!userForm.checkValidity) return;

  let usersList = JSON.parse(localStorage.userList);

  localStorage.setItem(
    "usersList",
    JSON.stringify(
      usersList.push({
        userName: userName.value,
        userMail: userMail.value,
        userPassword: userPassword.value,
      })
    )
  );

  userForm.reset();
}
