// Requirements:
// 1. Email Validation
// 2. Phone number Validation
// 2.1.Accept numbers only
// 2.2.Should contain 10 numbers only
// 2.3.Should accept additional 3 formats: XXX - XXX - XXXX, XXX.XXX.XXXX, XXX XXX XXXX
// 3. Password Validation:
// 3.1.Minimum 8 characters, at least one uppercase and one lower case, must contain at least one number
// 3.2.Indicate the strength(strong, medium, poor) of the password using different colors(green, orange, red)



const nameinput = document.querySelector("#name");
const emailinput = document.querySelector("#email");
const passwordinput = document.querySelector("#password");
const repeatpassword = document.querySelector("#repeatpassword");
const phonenumber = document.querySelector("#phonenumber");
const submitbutton = document.querySelector("#submit");
const alertbox = document.querySelector(".alert");
var namefill = document.querySelector("#namefill");
var emailfill = document.querySelector("#emailfill");
var passwordfill = document.querySelector("#passwordfill");
var phonenumberfill = document.querySelector("#phonenumberfill");
var repeatpasswordfill = document.querySelector("#repeatpasswordfill");
var text = document.getElementById('password-strength-text');
const nameRegex = /^[a-zA-z]*]$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const indianphoneRegex = /^\d{3}\d{3}\d{4}$|^\d{3}[.]\d{3}[.]\d{4}$|^\d{3}[-]\d{3}[-]\d{4}$|^\d{3}[ ]\d{3}[ ]\d{4}/;
const passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
var isValid=false;
var strength = {
    0: "Poor",
    1: "good",
    2: "Strong"
}
var color = {
    0: "red",
    1: "orange",
    2: "green"
}
function Show(show, Element) {
    if (show) {
        Element.style.display = "inherit";
    }
    else {
        Element.style.display = "none";
    }
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
        hideFieldEmptyMessage();
        Show(show, showelement);
        if (e.target == passwordinput) {
            repeatpassword.addEventListener("input", createListener(passwordMatch, passwordinput.value));
            if (repeatpassword.value.length > 0) {
                repeatpassword.value = "";
            }
        }
       
    }
}
function passwordMatch(text, regex) {

    return text === regex;

}
function isEmpty(input) {
    return !input.value.length;
}
function onEmpty(inputElement, text) {
    Show(true, alertbox);
    alertbox.textContent = text;
    setTimeout(() => { Show(false, alertbox); inputElement.focus() }, 1300);
    showFieldEmptyMessage();
}
function showFieldEmptyMessage() {
    Show(isEmpty(nameinput), namefill);
    Show(isEmpty(emailinput), emailfill);
    Show(isEmpty(passwordinput), passwordfill);
    Show(isEmpty(phonenumber), phonenumberfill);
    Show(isEmpty(repeatpassword), repeatpasswordfill);
}
function hideFieldEmptyMessage() {
    Show(false, namefill);
    Show(false, emailfill);
    Show(false, passwordfill);
    Show(false, phonenumberfill);
    Show(false, repeatpasswordfill);
}
function checkIfInputEmptyandValid(event) {
    var password_Match =passwordMatch(passwordinput.value,repeatpassword.value) ? 1 :0;
    var validEmail=Validation(emailinput.value,emailRegex)?1:0;
    var validPhone=Validation(phonenumber.value,indianphoneRegex)?1:0;
    var validpassword=Validation(passwordinput.value,passwordRegex)?1:0;
    
    switch (0) {
        
        case nameinput.value.length: onEmpty(nameinput, "Please Enter your name");
            break;
        case emailinput.value.length: onEmpty(emailinput, "Please Enter your Email Id");
            break;
        case phonenumber.value.length: onEmpty(phonenumber, "Please Enter your Phone number");
            break;
        case passwordinput.value.length: onEmpty(passwordinput, "Please Enter your Password ");
            break;
        case repeatpassword.value.length: onEmpty(repeatpassword, "Please  reenter your password");
            break;
        case password_Match:onEmpty(repeatpassword,"Both Passwords must match");console.log("here");
             break;
        case validEmail:isValid=false;
        break;
        case validPhone:isValid=false;
        break;
        case validpassword:isValid=false;
        break;
        default: isValid=true;

    }  
    
}


function getStrength(text) {
    if (strongRegex.test(text)) {
        return 2;
    }
    else if (mediumRegex.test(text)) {
        return 1;
    }
    else {
        return 0;
    }


}


emailinput.addEventListener("input", createListener(Validation, emailRegex));

passwordinput.addEventListener("input", createListener(Validation, passwordRegex));
phonenumber.addEventListener("input", createListener(Validation, indianphoneRegex));
passwordinput.addEventListener('input', function () {
    var val = passwordinput.value;
    var result = getStrength(val);
    // Update the text indicator
    if (val !== "") {
        text.innerHTML = "Strength: " + strength[result];
        text.style.color = color[result]
    } else {
        text.innerHTML = "";
    }

});

submitbutton.addEventListener("click", checkIfInputEmptyandValid);

function validate(){
  return isValid;
}

