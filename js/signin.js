var email = document.querySelector("#email");
var pass = document.querySelector("#pass");
var error = document.querySelector("#error");
var button = document.querySelector("#button");

function getUserData(e) {
  let data = localStorage.getItem("users");
  var obj = {};
  if (data == null) {
    return obj;
  } else {
    data = JSON.parse(data);
    data.users.forEach((element) => {
      console.log(e == element.email);
      if (e == element.email)
        obj = element;
    });
    return obj;
  }
}
function raiseError(text, e) {
  if (e) error.style.color = "red";
  else error.style.color = "green";
  error.textContent = text;
}
function checkError(e, p) {
  var result = false;
  // check if email are here before
  storage = localStorage.getItem("users");
  console.log(storage);
  if (storage == null) {
    raiseError(
      "ربما يكون البريد الالكتروني غير موجود او كلمة المرور غير صحيحة",
      !result
    );
    return result;
  } else {
    var obj = JSON.parse(storage);
    obj.users.forEach((element) => {
      if (e == element.email && p == element.pass) {
        result = true;
      }
    });
    if (!email.value.length || !pass.value.length) {
      result = false;
      raiseError("لا يمكن ان تترك حقل فارغ", !result);
    } else if (!result) {
      raiseError(
        "ربما يكون البريد الالكتروني غير موجود او كلمة المرور غير صحيحة",
        !result
      );
    }

    setTimeout(() => {
      error.textContent = "";
    }, 1500);
  }
  return result;
}
function signin() {
  if (checkError(email.value, pass.value)) {
    let storage = JSON.stringify(getUserData(email.value));
    localStorage.setItem("login",storage );
   setTimeout(() =>{ 
    window.location.replace('index.html');
   },250);
  }
}

button.addEventListener("click", (event) => {
  signin();
});
