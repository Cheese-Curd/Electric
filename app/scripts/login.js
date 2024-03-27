const fs = require("fs");
const { decrypt } = require("../scripts/encryption");

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


var loginBox = document.getElementById("loginBox");
var userData = JSON.parse(fs.readFileSync("app/storage/electric/users/users.json"));

function doLogin()
{
	var usernameBox = document.getElementById("usernameBox");
	var passwordBox = document.getElementById("passwordBox");

	if (usernameBox.value == "")
		doError("No username provided.");
	if (passwordBox.value == "")
		doError("No password provided.");
	else
	{
		var success = false;
		for (var i = 0; i < userData.users.length; i++)
		{
			if (passwordBox.value == decrypt(userData.users[i].password) && usernameBox.value == userData.users[i].username)
			{
				loginBox.style.opacity = 0;
				loginBox.addEventListener("transitionend", (event) => {
					window.location.replace("main.html");
				});
				fs.writeFileSync("app/storage/electric/users/curUser", userData.users[i].username, { encoding: 'utf8' });
				success = true;
				break;
			}
		}
		if (success == false)
			doError("Unknown username or password.");
	}
}

function loaded()
{
	document.body.setAttribute('fadeout', '');
	setTimeout(() => {
		loginBox.style.opacity = 1;
	}, 400);
}