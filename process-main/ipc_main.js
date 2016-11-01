// ipc_main process

const { ipcMain } = require('electron');
// const fs = require('fs');

ipcMain.on('some-action', (event,arg) => {
	console.log('got a custom message!', arg);
	const data = JSON.parse(arg);
	if ( data ) {
		return console.log('got data', data);
	} 
	console.log('did not receive data');
});

