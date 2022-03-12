let fullName = document.querySelector('#full-name');
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let cv = document.querySelector('#cv');
let accept = document.querySelector('.accept');
let reject = document.querySelector('.reject');
let state = document.querySelector('#state');
let list = document.querySelector('.data');
 

let data = localStorage.getItem('choosePerson');
if (data ==null) { 
  accept.classList.add('disactive');  
  reject.classList.add('disactive');  
} else { 
    data = JSON.parse(data);
    phone.textContent+= data.phone;
    cv.textContent+=data.cv;
    fullName.textContent+=data.fullname;
    email.textContent += data.email;
    if(data.accept ==null) {
        state.textContent +='قيد الانتظار'; 
    } else if (data.accept == true) { 
        accept.classList.add('disactive');  
        reject.classList.add('disactive');  
        state.textContent +='مقبول'; 
    } else if (data.accept == false ) { 
        accept.classList.add('disactive');  
        reject.classList.add('disactive'); 
        state.textContent +='مرفوض'; 
    }
}
accept.addEventListener('click', (event) => { 
let furssas = localStorage.getItem('furssas');
furssas = JSON.parse(furssas);
furssas['furssas'][data.jobID].offers.forEach(e => {
    
    if (e.id== data.id) { 
        e.accept=true;
        
        console.log(furssas);
        localStorage.setItem('furssas',JSON.stringify(furssas));
        localStorage.setItem('choosePerson' , JSON.stringify(e))
        accept.classList.add('disactive');  
        reject.classList.add('disactive');     
    }
    });
})

reject.addEventListener('click', (event) => { 
    let furssas = localStorage.getItem('furssas');
    furssas = JSON.parse(furssas);
    furssas['furssas'][data.jobID].offers.forEach(e => {
        
        if (e.id== data.id) { 
            e.accept=false;
            console.log(furssas);
            localStorage.setItem('furssas',JSON.stringify(furssas));
            localStorage.setItem('choosePerson' , JSON.stringify(e))

            accept.classList.add('disactive');  
            reject.classList.add('disactive');     
        }
        });
    })