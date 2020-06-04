/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import React from 'react'
import {render} from 'react-dom'
import Container from './views/container'
import Store from './views/container-store'
import {Provider } from 'mobx-react';
import '@src/styles/common.styl';

//  (<any>window).$notify = '1111'
// window.Notify = '1111'



// let app = new Container(null)

// app.render()
render(<Provider store={Store}>
    <Container />
</Provider> ,document.querySelector('#app'))
// console.log('👋 This message is being logged by "renderer.js", included via webpack..  ');
 