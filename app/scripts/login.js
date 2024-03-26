function doError(prompt, time=2000)
{
	var errorDivContainer = document.getElementById("loginErrorBox"); 
	var errorDiv = document.getElementById("loginError");

	errorDiv.innerText = `An error has occured: ${prompt}`;
	errorDivContainer.style.opacity = 1;
	setTimeout(() => {
		errorDivContainer.style.opacity = 0;
	}, time)
}

function doLogin()
{
	var usernameBox = document.getElementById("usernameBox");
	var passwordBox = document.getElementById("passwordBox");

	if (usernameBox.value == "")
		doError("No username provided.")
	else
		window.location.replace("main.html");
}