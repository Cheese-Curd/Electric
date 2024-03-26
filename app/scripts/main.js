var taskbar = document.getElementById("taskbar");

function changeBg(path)
{
	var tempBg = document.getElementById("tempBg");
	var background = document.getElementById("background");
	tempBg.src = path;
	background.style.opacity = 0;
	background.ontransitionend = function() {
		background.src = path;
		background.style.opacity = 1;
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

// TODO: fix it running twice when I try to fix the error output?

// var didLoad = false
// document.addEventListener("DOMContentLoaded", () => {
// 	if (didLoad)
// 		return;
// 	taskbar = document.getElementById("taskbar");
// 	didLoad = true;
// }, { once: true });
createTaskbarIcon("../storage/electric/apps/testApp.png");