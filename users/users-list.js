const userCards = document.querySelector(".user-cards");

// Check User List exists
if (!localStorage.usersList) {
  localStorage.setItem("usersList", JSON.stringify([]));
}

let usersList = JSON.parse(localStorage.usersList);
usersList.forEach((user) => {
  addUserCard(user);
});

function addUserCard(userData) {
  let container = document.createElement("div");

  container.innerHTML = [
    '<div class="card">',
    '   <div class="card-body">',
    `     <h5 class="card-title">${userData.userName}</h5>`,
    `     <p class="card-text">${userData.userEmail}</p>`,
    "   </div>",
    "</div>",
  ].join("");

  userCards.append(container);
}
