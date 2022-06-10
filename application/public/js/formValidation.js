function formValidation() {

  // USERNAME VALIDATION
  var usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,20}/;
  if(!document.regForm.username.value.match(usernameRegex)) {
    alert('Please enter a valid username')
    return false;
  }
  // EMAIL VALIDATION
  var emailX = document.regForm.email.value;
  var atpos = emailX.indexOf("@");
  var dotpos = emailX.lastIndexOf(".");
       
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailX.length) {
    alert("Please enter a valid email address");
    return false;
  }

  // PASSWORD VALIDATION
  var passwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if(!document.regForm.password.value.match(passwdRegex)) {
    alert('Please enter a valid password')
    return false;
  }
  // CHECK IF PASSWORDS MATCH
  if(document.regForm.cpassword.value != document.regForm.password.value) {
    alert('Your passwords do not match')
    return false;
  }
}