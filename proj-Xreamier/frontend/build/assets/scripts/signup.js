var signupLink = document.getElementById("signup");
var display = 0;
var signupIcon = document.createElement("span");

//Form elements
var title = document.getElementById("title");
var form = document.getElementById("form");
var userField = document.getElementById("user");
var passwordField = document.getElementById("password");

// When the user clicks the button, switch screens
signupLink.onclick = function() {
    //window.alert("Test Message");
    if (display == 0){
    	signupIcon.class = "glyphicon glyphicon-user";
    	signupLink.innerHTML = "Sign In";
    	title.innerHTML = "Register";
    	form.removeChild(userField);
    	form.removeChild(passwordField);

    	var firstNameField = document.createElement("input");
    	firstNameField.setAttribute("type", "text");
    	firstNameField.setAttribute("id", "firstName");
    	firstNameField.setAttribute("placeholder", "First Name");

    	var lastNameField = document.createElement("input");
    	lastNameField.setAttribute("type", "text");
    	lastNameField.setAttribute("id", "lastName");
    	lastNameField.setAttribute("placeholder", "Last Name");


    	var emailField = document.createElement("input");
    	emailField.setAttribute("type", "text");
    	emailField.setAttribute("id", "email");
    	emailField.setAttribute("placeholder", "Email");

    	form.appendChild(firstNameField);
    	form.appendChild(lastNameField);
    	form.appendChild(emailField);
    	form.appendChild(userField);
    	form.appendChild(passwordField);
    	firstNameField.setAttribute("autoFocus", "");

    	display = 1;
    }else{
    	signupLink.innerHTML = "Register";
    	title.innerHTML = "Sign In";
    	userField.setAttribute("autoFocus", "");

    	var firstNameField = document.getElementById("firstName");
    	var lastNameField = document.getElementById("lastName");
    	var emailField = document.getElementById("email");

    	form.removeChild(firstNameField);
    	form.removeChild(lastNameField);
    	form.removeChild(emailField);
    	display = 0;
    }
    
}