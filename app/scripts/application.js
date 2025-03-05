var appsContainer;

function addDragFunctionality(titleBar)
{
    let isDragging = false;
    let offset = { x: 0, y: 0 };
    const container = titleBar.closest('.appContainer');

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = container.getBoundingClientRect();
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // Calculate the new position of the container
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        // Get the dimensions of the viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Ensure the new position is within the viewport boundaries
        const maxX = viewportWidth - container.offsetWidth;
        const maxY = viewportHeight - container.offsetHeight;

        // Set the container's position
        container.style.left = `${Math.min(Math.max(newX, 0), maxX)}px`;
        container.style.top = `${Math.min(Math.max(newY, 0), maxY)}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging)
            isDragging = false;
    });
}

function createWindow(srcFile, appID, title = "App Name", width = 400, height = 300, canMaximize = true)
{
	var appContainer = document.createElement("div");
	appContainer.classList.add("appContainer");
	appContainer.id = appID;
	appContainer.style.width = `${width}px`;
	appContainer.style.height = `${height}px`;
	var titleBar = document.createElement("div");
	titleBar.classList.add("titleBar");
	var titleBarText = document.createElement("div");
	titleBarText.id = "titleBarText";
	titleBarText.innerText = title;
	var iFrame = document.createElement("iframe");
	iFrame.src = srcFile;
	iFrame.width = "100%";
	iFrame.height = `${height - 29}px`;

	// Title Bar Buttons
	var closeBtn = document.createElement("button");
	closeBtn.classList.add("appButton");
	closeBtn.id = "closeBtn";
	closeBtn.innerText = "X";

	closeBtn.onclick = () => {
		appContainer.style.opacity = 0;
		appContainer.addEventListener("transitionend", () => {
			appContainer.remove();
		})
	}
	
	appsContainer.appendChild(appContainer);
	appContainer.appendChild(titleBar);
	titleBar.appendChild(titleBarText);
	titleBar.appendChild(closeBtn);
	appContainer.appendChild(iFrame);

	setTimeout(() => {
		appContainer.style.opacity = 1;
	}, 1);

	addDragFunctionality(appContainer);
}

// TODO: maximizeWindow function
// function maximizeWindow(appID)
// {

// }

function loadVariables()
{
	appsContainer = document.getElementById("apps");
}

exports.loadVariables = loadVariables;
exports.createWindow = createWindow;