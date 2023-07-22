function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    if (password !== confirmPassword) {
        // Show the error message
        document.getElementById('errorText').style.display = 'block';
        // Prevent form submission
        return false;
    } else {
        // Hide the error message if passwords match
        document.getElementById('errorText').style.display = 'none';
        passwordStrengthBar = document.getElementById('password-strength-label').innerText ;
        console.log("asghashjkg")
        console.log(passwordStrengthBar)
        const numericString = passwordStrengthBar.replace("%", "");
        const numericValue = parseFloat(numericString);
        const integerValue = Math.round(numericValue);
        console.log(integerValue)
        if(integerValue>49) {
          return true;
        }else{
          return false;
        }
    }    

}

function calculatePasswordStrength(password) {
  const minLength = 8;
  const maxLength = 16;
  const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const uppercaseCharacters = /[A-Z]/;
  const passwordLength = password.length;
  const hasSpecialCharacter = specialCharacters.test(password);
  const hasUppercaseCharacter = uppercaseCharacters.test(password);
  let strengthPercentage = (passwordLength - minLength) / (maxLength - minLength) * 100;
  if (strengthPercentage < 5){
    value = (100+strengthPercentage)
      strengthPercentage =  value / 8
  }   
  if (strengthPercentage > 11){
    if (hasSpecialCharacter && hasUppercaseCharacter ) strengthPercentage = 100;
    else if (hasSpecialCharacter || hasUppercaseCharacter) strengthPercentage = 80;
     else if(!hasSpecialCharacter || !hasUppercaseCharacter) strengthPercentage = 50;
  }   
  const strengthValue = Math.max(0, Math.min(100, strengthPercentage));
  return strengthValue
}

function needtext(strength){
  if (strength == 100){
    return("Password is perfect")
  }else if(strength > 79){
     return("Password need a special character or Upper Case")
  }
  else if(strength > 49){
     return("Password need a special character or Upper Case")
  }
   else if(strength > 0){
     return("Password need too be atleast 8 character")
  }
}





  function validatePassword(event) {
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value.trim(); 
    passwordStrengthBarContainer = document.getElementById("password-strength-bar-container");
    const passwordStrengthBar = document.getElementById("password-strength-bar");
    const passwordStrengthLabel = document.getElementById("password-strength-label");
    const passwordtextstrong = document.getElementById("password-text-strong");
    if (password === "") {
        passwordStrengthBarContainer.style.display = "none";
        passwordtextstrong.style.display = "none";
    } else {
      passwordtextstrong.style.display = "block";
      passwordStrengthBarContainer.style.display = "block";
      const strength = calculatePasswordStrength(password);
      const barColor = getBarColor(strength);
      const textwritter = needtext(strength);
      passwordtextstrong.innerText = textwritter
      passwordStrengthBar.style.width = `${strength}%`;
      passwordStrengthBar.style.backgroundColor = barColor;
      passwordStrengthLabel.innerText = `${strength.toFixed(2)}%`;
    }
  }


function getBarColor(strength) {

  if (strength >= 55) {
    return "green";
  } else if (strength >= 25) {
    return "orange";
  } else {
    return "red";
  }
}

window.onload = function() {
const passwordStrengthBarContainer = document.getElementById("password-strength-bar-container");
passwordStrengthBarContainer.style.display = "none";
};