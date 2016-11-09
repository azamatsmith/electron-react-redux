// menu.js
const {remote} = require('electron');
const {Menu,MenuItem,dialog} = remote;
const {showFile} = require('./renderer.js');
const fs = remote.require('fs');
const path = require('path');
const {dispatchDir} = require('./events/events.js'); 

const menu = new Menu();
menu.append(new MenuItem({ label: 'MenuItem1', click(){console.log('item 1 clicked')} }));
menu.append(new MenuItem({ type: 'separator' }) );
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true} ));


const template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Open File',
				click() {
					return openFile();
				}
			},	
			{
				label: 'Open Folder',
				click() {
					return openFolder();
				}
			},	
			{
				label: 'Save',
				click() {
					saveFile();
				}
			},	
			{
				label: 'Something',
			}	
		]	
	}
];

const menu2 = Menu.buildFromTemplate(template);
// menu2.append(new MenuItem({ label: 'Menu2Item1', click(){console.log('item 1 clicked from menu2')} }));
Menu.setApplicationMenu(menu2);

// define options for open and save menus
const openOptions = {
	title: 'Open Json File',	
	filters: [
		{ name: 'Json File', extensions: ['json'] }	
	]
};

const saveOptions = {
	title: 'Save Json File',	
	filters: [
		{ name: 'Json File', extensions: ['json'] }	
	]
};

const openFolderOptions = {
	title: 'Open Folder',
	properties: [ 'openDirectory']
};

function openFolder() {
	dialog.showOpenDialog(null,openFolderOptions,(dir) => {
		if (!dir) {return;}
		const thisPath = dir[0];
		getFilesFromDir(thisPath, function(data){
			dispatchDir(data);		
		});
	});
}

function getFilesFromDir(dirName,cb) {
	console.log('getting files');
	fs.readdir(dirName, (err,files) => {
		if (err) { 
			console.log('there was an error getting files from directory'); 
			return [];
		}
		var fileArr = [];
		for ( var i = 0; i < files.length; i++ ) {
			const thisFile  = path.join(dirName, files[i]);
			if ( fs.statSync(thisFile).isFile() ) {
				fileArr.push(thisFile);
			} 
		}
		cb(fileArr);
	});
}

function openFile() {
	dialog.showOpenDialog(null,openOptions,(file) => {
		if (!file) {return;}
		const thisFile = file[0];
		fs.openSync(thisFile, 'r+');
		fs.readFile( thisFile, 'utf8', (err,data) => {
			if (err) throw err;	
			dispatchLoad(data, thisFile);
		});
	});
}

function saveFile() {
	dialog.showSaveDialog(null, saveOptions, (path) => {
		if (!path) {return;}
		const fileName = path;
		fs.writeFile(fileName, JSON.stringify(GLOBAL_OBJ), (err,data) => {
			if (err) throw err;	
			dispatchSave();
		});	
	});
}

window.addEventListener('contextmenu', (e) => {
	e.preventDefault();
	menu.popup(remote.getCurrentWindow());
}, false);

