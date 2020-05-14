let email=document.getElementById('login-email');
let password=document.getElementById('login-password');
let loginbtn=document.getElementById('btn-login');
let emailtooltip=document.querySelector('.emailtooltip');
let passwordtooltip=document.querySelector('.passwordtooltip');
const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
let isValid=true;
function Show(show, Element) {
    if (show) {
        Element.style.display = "inherit";
    }
    else {
        Element.style.display = "none";
    }
}
function isEmpty(input) {
    return !input.value.length;
}
function Validation(text, regex) {
    return regex.test(text);
}
function createListener(validator, regex) {
    console.log(regex);
    return e => {
        const text = e.target.value;
        const valid = validator(text, regex);
        const show = text !== "" && !valid;
        const showelement = e.target.nextElementSibling;
        Show(show, showelement);
       
    }
}

email.addEventListener("input", createListener(Validation, emailRegex));
password.addEventListener("input",()=>{
    Show(false,passwordtooltip);
})
loginbtn.addEventListener("click",()=>{
    if(isEmpty(email)){
        Show(true,emailtooltip);
       
    }
    if(isEmpty(password)){
        Show(true,passwordtooltip)
       
    }
    if(isEmpty(password)||isEmpty(email)){
        isValid=false;
    }
    else{
        isValid=true;
    }
});

function validate(){
    return isValid;
    console.log(isValid);
  }