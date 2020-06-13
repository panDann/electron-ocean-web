import { globalShortcut,BrowserWindow } from 'electron';

export const keyForDevTool = (win:BrowserWindow)=>{
       globalShortcut.register('Alt+D', () => {
        // console.log('CommandOrControl+X is pressed')
        win.webContents.openDevTools()

      })
      globalShortcut.register('Alt+C', () => {
        // console.log('CommandOrControl+X is pressed')
        win.webContents.closeDevTools()

      })
      globalShortcut.register('Ctrl+R', () => {
        // console.log('CommandOrControl+X is pressed')
        win.reload()

      })
}
    