let loginUserData = {};
let storage = localStorage.getItem("login");
let logout = document.querySelector("#logout");
let login = document.querySelector("#signin");
let signup = document.querySelector("#signup");

let myrequest = document.querySelector("#myrequest");
let myfurssa = document.querySelector("#myfurssa");
let user = document.querySelector("#user");
let search = document.querySelector("#search");
let button = document.querySelector('#button-search');


// localStorage.clear();
if (storage != null) {
  let loginUserData = JSON.parse(storage);
  console.log(loginUserData);
  user.classList.remove("disactive");
  logout.classList.remove("disactive");

  console.log(loginUserData.person ,loginUserData.company);
  if (loginUserData.person) myrequest.classList.remove("disactive");
  else if (loginUserData.company) myfurssa.classList.remove("disactive");
  login.classList.add("disactive");
  signup.classList.add("disactive");
  user.firstElementChild.textContent = loginUserData.username;
}
function signout() { 
  localStorage.removeItem('login');
  setTimeout(()=>{ 
    // window.location.replace('index.html');
    window.location.reload();
  },250);
}
console.log(loginUserData);

function addFrussa(data, city = "", time = "" ,search="") {
  content = `  

<div class="box">
<img src="./img/undraw_Problem_solving_re_4gq3.png" alt="" />
<div class="content">
  <h3>${data.address}</h3>
  <p>ساعات العمل : ${data.time}</p>
  <p>المدينة :${data.city}</p>
</div>
<div class="info">
  <p value=${data.id} >قراءة المزيد</p>
  <i class="fas fa-long-arrow-alt-right"></i>
</div>
</div>

`;
  if(!search) {
  if (!city.length && !time.length) {
    fursa.innerHTML += content;
  } else if (city.length && time.length) {
    if (data.cityCode == city && data.time == time) {
      fursa.innerHTML += content;
    }
  } else if (city.length) {
    if (data.cityCode == city) {
      fursa.innerHTML += content;
    }
  } else if (time.length) {
    if (data.time == time) {
      fursa.innerHTML += content;
    }
  }
} else  { 
  fursa.innerHTML='';
  if (data.address.search(search) || data.details.search(search) ){
    fursa.innerHTML += content;

  }


}

}

let fursa = document.querySelector(".furssa .container");

let time = document.querySelector("#time");
let city = document.querySelector("#city");
let oldselectedTime;
let oldselectedCity;

setInterval(() => {
  if ((oldselectedTime != time.value || oldselectedCity != city.value) ) {
    
    if(!search.value) { 
      fursa.innerHTML = "";
      let furssas = localStorage.getItem('furssas');
  
      if(furssas!= null){ 
        furssas=JSON.parse(furssas);
      furssas['furssas'].forEach((element) => {
        addFrussa(element, city.value, time.value);
      });
  
      let info = document.querySelectorAll(".info p");
      window.info = info;
      info.forEach((element) => {
        element.addEventListener("click", () => {
          id = element.getAttribute("value");
          console.log(furssas['furssas'][id]);
          localStorage.setItem("offer", JSON.stringify(furssas['furssas'][id]));
          setTimeout(()=> { 
            open('moreDetails.html',"_blank");
          }, 200);
        });
      });
      }
    }
    
  }
  oldselectedTime = time.value;
  oldselectedCity = city.value;
}, 500);


button.addEventListener ('click' , (event ) => { 
  let furssas = localStorage.getItem('furssas');
  if(furssas!= null){ 
    furssas=JSON.parse(furssas);
    furssas['furssas'].forEach((element) => {
      addFrussa(element, city.value, time.value ,search.value);
    });
  }
  search.value='';

}) 