const nameinput=document.querySelector("#name");
const emailinput=document.querySelector("#email");
const passwordinput=document.querySelector("#password");
const repeatpassword=document.querySelector("#repeatpassword");
const phonenumber=document.querySelector("#phonenumber");
const submitbutton=document.querySelector("#submit");
const alertbox=document.querySelector(".alert");

var text = document.getElementById('password-strength-text');
const nameRegex=/^[a-zA-Z]+$/;
const emailRegex=/^[^@]+@[^@.]+\.[a-z]+$/i;
const indianphoneRegex=/^\d{3}\d{3}\d{4}$|^\d{3}[.]\d{3}[.]\d{4}$|^\d{3}[-]\d{3}[-]\d{4}$/;
const passwordRegex=/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
var strength = {
    0: "Poor",
    1: "good",
    2: "Strong"
   
  }
var color={
    0:"red",
    1:"orange",
    2:"green"
}
function Show(show,Element){
    if(show){
        Element.style.display="inherit";
    }
    else{
        Element.style.display="none";
    }
}

function Validation(text,regex){
  return regex.test(text);
}
function createListener(validator,regex){
    console.log(regex);
    return e=>{ 
        const text=e.target.value;
        const valid=validator(text,regex);
        const show= text!=="" && !valid;
        const showelement=e.target.nextElementSibling;
        hideFielEmptyMessage();
        Show(show,showelement);
        if(e.target==passwordinput){
            repeatpassword.addEventListener("input",createListener(passwordMatch,passwordinput.value));
            if(repeatpassword.value.length>0){
                repeatpassword.value="";
            }
        }
    }
}
function passwordMatch(text,regex){
    
 return text===regex;
 
}
function isEmpty(input){
    return !input.value.length;
}
function onEmpty(inputElement,text){
    Show(true,alertbox);
    alertbox.textContent=text;
    setTimeout(()=>{ Show(false,alertbox);inputElement.focus() } , 500);
     showFieldEmptyMessage();
}
function showFieldEmptyMessage(){
    var namefill=document.querySelector("#namefill");
    var emailfill=document.querySelector("#emailfill");
    var passwordfill=document.querySelector("#passwordfill");
    var phonenumberfill=document.querySelector("#phonenumberfill");
    var repeatpasswordfill=document.querySelector("#repeatpasswordfill");
    var emptyfields=[namefill,emailfill,passwordfill,phonenumberfill,repeatpasswordfill];
    Show(isEmpty(nameinput),namefill);
    Show(isEmpty(emailinput),emailfill);
    Show(isEmpty(passwordinput),passwordfill);
    Show(isEmpty(phonenumber),phonenumberfill);
    Show(isEmpty(repeatpassword),repeatpasswordfill);
}
function hideFielEmptyMessage(){
    var namefill=document.querySelector("#namefill");
    var emailfill=document.querySelector("#emailfill");
    var passwordfill=document.querySelector("#passwordfill");
    var phonenumberfill=document.querySelector("#phonenumberfill");
    var repeatpasswordfill=document.querySelector("#repeatpasswordfill");
    Show(false,namefill);
    Show(false,emailfill);
    Show(false,passwordfill);
    Show(false,phonenumberfill);
    Show(false,repeatpasswordfill);
}
function checkIfInputEmpty(event){
    event.preventDefault();
   
    switch(0) {
        case nameinput.value.length:onEmpty(nameinput,"Please Enter your name");
          break;
        case emailinput.value.length:onEmpty(emailinput,"Please Enter your Email Id");
          break;
        case phonenumber.value.length:onEmpty(phonenumber,"Please Enter your Phone number")
        case passwordinput.value.length:onEmpty(passwordinput,"Please Enter your Password ");
            break;
        case repeatpassword.value.length:onEmpty(repeatpassword,"Please  reenter your password");
            break;
        default:console.log("success");

      }
}
nameinput.addEventListener("input",createListener(Validation,nameRegex));
emailinput.addEventListener("input",createListener(Validation,emailRegex));

passwordinput.addEventListener("input",createListener(Validation,passwordRegex));
phonenumber.addEventListener("input",createListener(Validation,indianphoneRegex));
function getStrength(text){
    if(/[0-9a-zA-Z@?!&$%#*]+/.test(text)){
        return 2;
    }
    if(/[0-9a-zA-Z]+/.test(text)){
        return 1;
    }
   if( /[0-9]+/.test(text)){
       return 0;
   }
   
   
}
passwordinput.addEventListener('input', function() {
    var val = passwordinput.value;
    var result=getStrength(val);
    
    
    // Update the text indicator
    if (val !== "") {
      text.innerHTML = "Strength: " + strength[result]; 
      text.style.color=color[result]
    } else {
      text.innerHTML = "";
    }
    
  });
submitbutton.addEventListener("click",checkIfInputEmpty);



