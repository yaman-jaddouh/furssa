var button = document.querySelector("#button");
var error = document.querySelector(".error");
var username = document.querySelector("#fullname");
var email = document.querySelector("#email");
var pass = document.querySelector("#pass");
var replypass = document.querySelector("#replypass");
var person = document.querySelector("#normal-person");
var company = document.querySelector("#company");
// localStorage.clear();
// var myobj = JSON.parse(localStorage.getItem('users'));
//     // var obj = JSON.parse(users);

//     myobj['users'].push({"score": 13,"Name": "Player1"});
//     myobj['users'].push({"score": 523,"Name": "Player2"});
//     myobj['users'].push({"score": 3,"Name": "Player3"});
//     myobj['users'].push({"score": 1235,"Name": "Player4"});

// localStorage.setItem('users', JSON.stringify(myobj));

function raiseError(text, e) {
  if (e) error.style.color = "red";
  else error.style.color = "green";
  error.textContent = text;
}
function checkError(e) {
  var result = true;
  // check if email are here before
  storage = localStorage.getItem("users");

  if (storage == null ){
    if ( !email.value.length || !pass.value.length || !replypass.value.length || !username.value.length) {
      result = false;
      raiseError("لا يمكنك ترك أي حقل فارغ", !result);
    }
  }
  else {
    var obj = JSON.parse(storage);
    obj.users.forEach((element) => {
      console.log(element.email);
      if (e == element.email && e) {
        result = false;
        raiseError("تم التسجيل في الموقع سابقاً بهذا الايميل", !result);
      }
    });
  }
  //check input
  if (result)
    if (
      !email.value.length ||
      !pass.value.length ||
      !replypass.value.length ||
      !username.value.length
    ) {
      result = false;
      raiseError("لا يمكنك ترك أي حقل فارغ", !result);
    } else if (!person.checked && !company.checked) {
      result = false;

      raiseError('يجب عليك اختيار نمط التسجيل "فعالية" أو "شخص" ', !result);
    } else if (pass.value.length < 8) {
      result = false;
      raiseError("يجب ان تكون كلمة السر لا تقل عن 8 احرف", !result);
    } else if (pass.value != replypass.value) {
      result = false;
      raiseError("لا يوجد تطابق في كلمة السر", !result);
    } else {
      raiseError("تم تسجيل حسابك في الموقع , شكراً لك", !result);
    }

  setTimeout(() => {
    error.textContent = "";
  }, 1500);

  return result;
}
function addNewUser(email, fullname, passowrd, replypassword, person, company) {
  storage = localStorage.getItem("users");
  if (checkError(this.email.value)) {
    if (storage == null) {
      var obj = { users: [] };
      obj["users"].push({
        email: email,
        username: fullname,
        pass: passowrd,
        person: person,
        company: company,
      });
      localStorage.setItem("users", JSON.stringify(obj));
      setTimeout(()=> { 
        location.replace('signin.html');
      },500);
    } else {
      var obj = JSON.parse(storage);
      obj["users"].push({
        email: email,
        username: fullname,
        pass: passowrd,
        person: person,
        company: company,
      });
      localStorage.setItem("users", JSON.stringify(obj));
      setTimeout(()=> { 
        location.replace('signin.html');
      },500);
    }
  }
}

button.addEventListener("click", (event) => {
  addNewUser(
    email.value,
    username.value,
    pass.value,
    replypass.value,
    person.checked,
    company.checked
  );
});
