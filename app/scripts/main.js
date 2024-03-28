const fs = require("fs");
const { encrypt } = require("../scripts/encryption");

var taskbar = document.getElementById("taskbar");
var curUser = fs.readFileSync("app/storage/electric/users/curUser",'utf8');
var userSet = JSON.parse(fs.readFileSync(`app/storage/electric/users/${curUser}/settings.json`));

var tempBg = document.getElementById("tempBg");
var background = document.getElementById("background");
function changeBg(path, noTransition=false)
{
	if (noTransition)
		background.src = path;
	else
	{
		tempBg.src = path;
		background.style.opacity = 0;
		background.ontransitionend = function() {
			background.src = path;
			background.style.opacity = 1;
		}
	}
}

function createTaskbarIcon(iconPath)
{
	var spanElem = document.createElement("span");
	taskbar.appendChild(spanElem);

	var buttonElem = document.createElement("button");
	buttonElem.className = "taskbarIcon";
	spanElem.appendChild(buttonElem);

	var iconElem = document.createElement("img");
	iconElem.src = iconPath;
	iconElem.width = 32;
	iconElem.height = 32;
	buttonElem.appendChild(iconElem);
	console.log("Created Taskbar Icon");
}

var startMenuOpen = false;
var startmenu = document.getElementById("startmenu");
var taskbarBorder = document.getElementById("taskbarBorder");
function toggleStartMenu()
{
	if (startMenuOpen)
	{
		startmenu.style.maxHeight = "0px";
		taskbarBorder.style.left = "-5px";
		startmenu.style.opacity = 0;
	}
	else
	{
		startmenu.style.maxHeight = "350px";
		taskbarBorder.style.left = "197px";
		startmenu.style.opacity = 1;
	}

	startMenuOpen = !startMenuOpen;
	// console.log(startMenuOpen);
}

function loaded()
{
	var blurDiv = document.getElementById("bluredDiv")
	blurDiv.style.opacity = 0;
	blurDiv.addEventListener("transitionend", (event) => {
		taskbar.style.top = "650px";
		blurDiv.remove();
	});
	
	createTaskbarIcon("../storage/electric/apps/testApp.png");
	console.log(curUser);
	userText = document.getElementById("userText").innerText = `Welcome, ${userSet.displayName}.`;
	changeBg(userSet.background, true);
}

function createUser(username, password)
{
	var userData = JSON.parse(fs.readFileSync("app/storage/electric/users/users.json"));

	// Create a backup first
	fs.writeFileSync('app/storage/electric/users/users.json.BACKUP', JSON.stringify(userData, null, 2), { encoding: 'utf8' });
	
	userData.users.push({"username": username, "password": encrypt(password)});
	// Overwrite the file
	fs.writeFileSync('app/storage/electric/users/users.json', JSON.stringify(userData, null, 2), { encoding: 'utf8' });
}