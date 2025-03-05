const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow() {
	const win = new BrowserWindow({
		width: 1280,
		height: 720,
		resizable: false, // No resizing :3
		titleBarStyle: 'hidden', // No titlebar?

		webPreferences: {
			preload: path.join(__dirname, 'app/scripts/main.js'),
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
	})

	win.setMenuBarVisibility(false);
	win.loadFile('app/menus/boot.html')
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})