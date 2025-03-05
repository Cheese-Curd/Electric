const fs = require("fs");
const { encrypt } = require("../scripts/encryption");
const app = require("../scripts/application");

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
	userSet.background = path;
	fs.writeFileSync(`app/storage/electric/users/${curUser}/settings.json`, JSON.stringify(userSet, null, 2), { encoding: 'utf8' })
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

function createUserFolders(username)
{
	// Normal folders
	fs.mkdirSync(`app/storage/electric/users/${username}/Desktop`);
	fs.mkdirSync(`app/storage/electric/users/${username}/Documents`);
	fs.mkdirSync(`app/storage/electric/users/${username}/LocalData`);
	// LocalData sub-folders
	fs.mkdirSync(`app/storage/electric/users/${username}/LocalData/apps`);
	fs.mkdirSync(`app/storage/electric/users/${username}/LocalData/appSettings`);
}

function createUser(username, password, displayName)
{
	var userData = JSON.parse(fs.readFileSync("app/storage/electric/users/users.json"));

	for (var i = 0; i < userData.users.length; i++)
		if (userData.users[i].username == username)
			return "Failed to create user: User already exists.";

	// Create a backup first
	fs.writeFileSync('app/storage/electric/users/users.json.BACKUP', JSON.stringify(userData, null, 2), { encoding: 'utf8' });
	
	userData.users.push({"username": username, "password": encrypt(password)});
	// Overwrite the file
	fs.writeFileSync('app/storage/electric/users/users.json', JSON.stringify(userData, null, 2), { encoding: 'utf8' });
	
	var setting = {"background": "../storage/electric/background/welcome.png", "displayName": displayName}
	if (!fs.existsSync(`app/storage/electric/users/${username}`))
		fs.mkdirSync(`app/storage/electric/users/${username}`)
	fs.writeFileSync(`app/storage/electric/users/${username}/settings.json`, JSON.stringify(setting, null, 2), { encoding: 'utf8' })
	
	createUserFolders(username);
	return `Successfully created user with the username ${username}`;
}

var startmenuContent = document.getElementById("startContent")

function createAppLink(name, appid)
{
	// startContentLink
	var button = document.createElement("button");
	button.classList.add("startContentLink");
	button.innerText = name;
	button.setAttribute("data-appid", appid);

	startmenuContent.appendChild(button)
	console.log("Created App Link")

	button.addEventListener("click", () => {
		var path = `storage/electric/apps/${button.getAttribute("data-appid")}`;
		var appSettings = JSON.parse(fs.readFileSync(`app/${path}/settings.json`));

		app.createWindow(`../${path}/${appSettings.mainFile}`, button.getAttribute("data-appid"), appSettings.title, appSettings.width, appSettings.height, appSettings.canMaximize);
	})
}

function loaded()
{
	var blurDiv = document.getElementById("bluredDiv")
	blurDiv.style.opacity = 0;
	blurDiv.addEventListener("transitionend", (event) => {
		taskbar.style.marginBottom = "0";
		blurDiv.remove();
	});
	
	createTaskbarIcon("../storage/electric/apps/testApp.png"); 
	app.loadVariables();
	createAppLink("Settings", "settings");

	console.log(curUser);
	document.getElementById("userText").innerText = `Welcome, ${userSet.displayName}.`;
	changeBg(userSet.background);
}