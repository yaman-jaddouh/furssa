let job= localStorage.getItem('offer');
let offerDetails = document.querySelector('.offer-details');
let offer = document.querySelector('.offer');
let login = localStorage.getItem('login');
let fullname = document.querySelector('#fullname');
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let button = document.querySelector('#button');
let error = document.querySelector('#error');
let file = document.querySelector('#file');

if (login ==null ) { 
    offer.classList.add('disactive');
    // offerDetails.classList.add('disactive');
} else { 
     login = JSON.parse(login);
     if(login.company) { 
        offer.classList.add('disactive');
     }
}


let content 
if (job == null)  {
     offerDetails.innerHTML= 'حدث خطأ';
} else { 

job=JSON.parse(job);
let content = `<div class="container">
<div class="basic-content">
    <div class="image">
        <img src="img/undraw_Problem_solving_re_4gq3.png" alt="">
    </div>
    <div class="details">
        <h2>${job.address}</h2>
        <p>صاحب الطلب: ${job.username} </p>
        <p>ساعات العمل : ${job.time} </p>
        <p>المدينة : ${job.city}</p>
    </div>
</div>
<h3>الوصف</h3>
<div class="content">
    <p>${job.details}</p>
</div>
</div>`

offerDetails.innerHTML = content
}



function raiseError(text, e) {
    if (e) error.style.color = "red";
    else error.style.color = "green";
    error.textContent = text;
  }
  
  function checkError() {
    let result = true;
  
    if (fullname.value.length < 5) {
      result = false;
      raiseError("  يجب ان يكون طول العنوان لا يقل عن 5 حرف ", !result);
    } else if (phone.value.length != 10 ) {
      result = false;
      raiseError("يجب ان يكون رقم الهاتف 10 ارقام", !result);
    } else if (!file.value  ) {
      result = false;
      raiseError("الرجاء تحميل ملف السيرة الذاتية", !result);
    } else {
      raiseError("تم تقديم الطلب بنجاح", !result);
    }
    setTimeout(() => {
      raiseError("", result);
    }, 1500);
    return result;
  }

  function addoffer() { 
    let jobs = localStorage.getItem('furssas');
    jobs = JSON.parse(jobs);

    if(!jobs.furssas[job.id].offers) { 
      jobs['furssas'][job.id].offers.push ({
      fullname:fullname.value,
      email:email.value,
      phone:phone.value,
      cv:file.value,
      accept:null,
      accoutemail:login.email,
      username:login.username,
      jobID:job.id,
      id:jobs['furssas'][job.id].offers.length
    });

    localStorage.setItem('furssas' , JSON.stringify(jobs))
    }else { 

      let result =true;
      jobs['furssas'][job.id].offers.forEach(element => {
        
        if(element.accoutemail == login.email){
          result=false; 
          
        }
        console.log(result);
      });

      if(result){
      jobs['furssas'][job.id].offers.push ({
      fullname:fullname.value,
      email:email.value,
      phone:phone.value,
      cv:file.value,
      accept:null,
      accoutemail:login.email,
      username:login.username,
      jobID:job.id,
      id:jobs['furssas'][job.id].offers.length
    });
    localStorage.setItem('furssas' , JSON.stringify(jobs))


      } else { 
        raiseError('لقد قمت بالتقدم على هذه الوظيفة من قبل' , !result);
        setTimeout(()=> { 
          raiseError('',result);
         }, 1500)
      }

    }

    console.log(jobs['furssas']);

  }

  button.addEventListener('click' ,(event) => { 
    if(checkError()) { 
      addoffer();

    }
  });