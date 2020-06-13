
import { app, BrowserWindow,nativeImage,autoUpdater, dialog } from 'electron';
import {keyForDevTool} from '../config/keyboad-shortcuts'
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
const  LogoImg = nativeImage.createFromPath(__dirname+'src/assets/images/logo.png') 
LogoImg.setTemplateImage(true);
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minHeight: 700,
    minWidth: 1000,
    // icon:LogoImg
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.removeMenu()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  keyForDevTool(mainWindow)

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',()=>{
  createWindow()
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 

// auto update

// const server = 'http://localhost'
// const url = `${server}/update/${process.platform}/${app.getVersion()}`

// autoUpdater.setFeedURL({ url })
// try {
//   setInterval(() => {
//   autoUpdater.checkForUpdates()
//   }, 10000)
  
  
// } catch (error) {
  
// }

// autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: 'info',
//     buttons: ['Restart', 'Later'],
//     title: 'Application Update',
//     message: process.platform === 'win32' ? releaseNotes : releaseName,
//     detail: 'A new version has been downloaded. Restart the application to apply the updates.'
//   }

//   dialog.showMessageBox(dialogOpts).then((returnValue) => {
//     if (returnValue.response === 0) autoUpdater.quitAndInstall()
//   })
// })

// autoUpdater.on('error', message => {
//   console.error('There was a problem updating the application')
//   console.error(message)
// })


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
