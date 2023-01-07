const form = document.getElementById("form1");
const ul = document.getElementById("listofusers");

form.addEventListener("submit", saveUser);

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/")
    .then((res) => {
      console.log(res.data.users);
      for (let i = 0; i < res.data.users.length; i++) {
        console.log(res.data.users[i]);
        showUser(res.data.users[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function saveUser(event) {
  event.preventDefault();

  let userObj = {
    name: event.target.name.value,
    email: event.target.eid.value,
    phone: event.target.pno.value,
  };
  console.log(userObj);

  axios
    .post("http://localhost:4000/user/adduser", userObj)
    .then((res) => {
      console.log(res);
      showUser(userObj);
    })
    .catch((err) => console.log(err));

  document.getElementById("fname").value = "";
  document.getElementById("eid").value = "";
  document.getElementById("pno").value = "";
}

function showUser(user) {
  const list = document.createElement("li");
  //this will give classvalue=useremail
  list.setAttribute("data-email", user.email);
  //for deleteing we'll pass only email which will be used in where condition
  //for edit all 3 value will be pass
  list.innerHTML = `${user.name} ${user.email} <button onclick=deleteUser('${user.email}')>Delete</button>
    <button onclick=editUser('${user.name}','${user.email}','${user.phoneNo}')>Edit</button>`;
  ul.appendChild(list);
}

function deleteUser(email) {
  //it will return 1st listItem from li that matches the email
  const deleteUserItem = ul.querySelector('[data-email="' + email + '"]');
  axios
    .delete("http://localhost:4000/user/deleteuser/" + email)
    .then(deleteUserItem.remove())
    .catch((err) => {
      console.log(err);
    });
}

function editUser(name, email, phone) {
  document.getElementById("fname").value = name;
  document.getElementById("eid").value = email;
  document.getElementById("pno").value = phone;
  //remove existing data
  deleteUser(email);
}
