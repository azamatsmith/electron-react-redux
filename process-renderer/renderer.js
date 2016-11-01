// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron');
const {shell} = require('electron');

// leaving these here as examples
document.addEventListener('save', (e) => {
	// console.log(e.detail);
	ipcRenderer.send('save', e.detail);
}, false);


document.addEventListener('mounted', () => {
	ipcRenderer.send('mounted');
}, false);


ipcRenderer.on('userData', (event,arg) => {
	var event = new CustomEvent('loadedData', { 'detail': arg });	
	document.dispatchEvent(event);
});

document.addEventListener('openPage', (e) => {
	shell.openExternal(e.detail);
}, false);

