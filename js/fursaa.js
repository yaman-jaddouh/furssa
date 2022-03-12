let loginData = localStorage.getItem("login");
let errorMessage = document.querySelector(".error-message");
let error = document.querySelector("#error");
let openButton = document.querySelector("#open-button");
let closeButton = document.querySelector("#close-button-1");
let closeButton2 = document.querySelector('#close-button-2');
let form = document.querySelector(".form");
let address = document.querySelector("#address");
let textarea = document.querySelector("#textaera");
let city = document.querySelector("#city");
let time = document.querySelector("#time");
let buttonCreate = document.querySelector("#button");
let ul = document.querySelector(".myfurssa .container ul");
let dialog = document.querySelector('.dialog');
let offerslist = document.querySelector('.list-offers');
if (loginData != null) {
  loginData = JSON.parse(loginData);
  if (loginData.person) {
    openButton.classList.add("disactive");
    errorMessage.classList.remove("disactive");
    errorMessage.textContent = "يجب عليك تسجيل الدخول كفعالية";
    setTimeout(() => {
      location.replace("./index.html");
    }, 1000);
  }
} else {
  openButton.classList.add("disactive");
  errorMessage.classList.remove("disactive");
  errorMessage.textContent = " يجب عليك تسجيل الدخول  أولاً ";
  setTimeout(() => {
    location.replace("./signin.html");
  }, 1000);
}

function raiseError(text, e) {
  if (e) error.style.color = "red";
  else error.style.color = "green";
  error.textContent = text;
}

function checkError() {
  let result = true;

  if (address.value.length < 10) {
    result = false;
    raiseError("  يجب ان يكون طول العنوان لا يقل عن 10 حرف ", !result);
  } else if (textarea.value.length < 25) {
    result = false;
    raiseError("يجب ان لا يقل الوصف عن 25 حرف", !result);
  } else if (!time.value || !city.value) {
    result = false;
    raiseError("يجب عليك اختيار التوقيت و المدينة", !result);
  } else {
    raiseError("تم انشاء فرصة العمل ونشرها", !result);
  }
  setTimeout(() => {
    raiseError("", result);
  }, 1500);
  return result;
}
function myfurssa() {
    let storage = localStorage.getItem("furssas");
    if (storage != null) {
      let obj = JSON.parse(storage)["furssas"];
      console.log(obj);
      ul.innerHTML = "";
      obj.forEach((element) => {
        if (element.email == loginData.email) {
          ul.innerHTML += `<li value = ${element.id} >${element.address}</li>`;
        }
      });
      ul.childNodes.forEach((e) => {
        
        e.addEventListener("click", (event) => {
          let storage = localStorage.getItem("furssas");
          let obj = JSON.parse(storage);
          let id =  Number(e.getAttribute('value'));
         
          offerslist.innerHTML='';

          obj['furssas'][id].offers.forEach(e => { 
            let cont = ` <li jobid = ${id} , personid =${e.id}>
                    <p class="address">${e.username}</p>
                    <p class="status">`

                    if (e.accept ==null) 
                    cont+= 'قيد الانتظار';
                    else if (e.accept ==true)
                    cont+= 'مقبول';
                    else 
                    cont+= 'مرفوض';
                    cont+=`</p> </li>`

              offerslist.innerHTML +=cont;
          });
          cont="";
          
          for(let i=0 ;i < offerslist.childElementCount;i++){ 
            offerslist.children[i].addEventListener('click' ,(event)=>  { 
              console.log(offerslist.children[i].getAttribute('jobid') , offerslist.children[i].getAttribute('personid'));
              localStorage.setItem('choosePerson' ,JSON.stringify(obj['furssas'][offerslist.children[i].getAttribute('jobid')].offers[offerslist.children[i].getAttribute('personid')]))
              open('personDetails.html');
            
            });

          }
          
            
          

          dialog.classList.toggle('disactive');
        });
      });
    }
  }
  myfurssa();
function addFrussa() {
  let storage = localStorage.getItem("furssas");
  if (checkError()) {
    if (storage == null) {
      var obj = { furssas: [] };
      obj["furssas"].push({
        address: address.value,
        city: city.options[city.selectedIndex].text,
        cityCode: city.value,
        time: time.value,
        email: loginData.email,
        username: loginData.username,
        offers: [],
        details: textarea.value,
        id: obj["furssas"].length,
      });
      localStorage.setItem("furssas", JSON.stringify(obj));
    } else {
      var obj = localStorage.getItem("furssas");
      obj = JSON.parse(obj);
      obj["furssas"].push({
        address: address.value,
        city: city.options[city.selectedIndex].text,
        cityCode: city.value,
        time: time.value,
        email: loginData.email,
        username: loginData.username,
        offers: [],
        details: textarea.value,
        id: obj["furssas"].length,
      });
      localStorage.setItem("furssas", JSON.stringify(obj));
    }

    myfurssa();
  }
}


closeButton2.addEventListener("click", (event) => {
  dialog.classList.add('disactive');
  console.log("saadsd");
});
button.addEventListener("click", (event) => {
  addFrussa();
});
openButton.addEventListener("click", (event) => {
  console.log("sdsd");
  form.classList.toggle("disactive");
  openButton.classList.toggle("hide");
});
closeButton.addEventListener("click", (event) => {
  form.classList.toggle("disactive");
  openButton.classList.toggle("hide");
});
