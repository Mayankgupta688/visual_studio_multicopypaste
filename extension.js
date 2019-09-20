// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	var copiedValueString = new Array(10);
	copiedValueString[0] = "0";
	copiedValueString[1] = "1";
	copiedValueString[2] = "2";
	copiedValueString[3] = "3";
	copiedValueString[4] = "4";
	copiedValueString[5] = "5";
	copiedValueString[6] = "6";
	copiedValueString[7] = "7";
	copiedValueString[8] = "8";
	copiedValueString[9] = "9";


	var functionCallCount = 0;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "multiplecopypaste" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	var disposable = null;
	var commandName = "";

	for(let i = 0; i< 10; i++) {

		commandName = 'extension.multiplePaste' + i
		disposable = vscode.commands.registerCommand(commandName, () => { 
			pasteActivation(i);
		});

		context.subscriptions.push(disposable);
	}

	for(let i = 0; i< 10; i++) {

		commandName = 'extension.multipleCopy' + i
		disposable = vscode.commands.registerCommand(commandName, () => { 
			copyActivation(i);
		});

		context.subscriptions.push(disposable);
	}
	

	function pasteActivation(inputValue) {
		
		functionCallCount = inputValue;

		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Call Count: ' + functionCallCount );

		var editor = vscode.window.activeTextEditor;

		if(!editor) {
			vscode.window.showInformationMessage('No File is open in Editor...');
			return;
		}

		editor.edit((editBuilder) => {

			// editor.selection gives the current location of the cursor...
			editBuilder.delete(editor.selection)
		}).then(() => {
			editor.edit((editBuilder) => {
				editBuilder.insert(editor.selection.start, copiedValueString[inputValue]);
			})
		})
	}


	function copyActivation(inputValue) {
		
		functionCallCount = inputValue;

		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Call Count: ' + functionCallCount );


		vscode.window.activeTextEditor.selections.toString()
		var editor = vscode.window.activeTextEditor;

		var selectedValue = vscode.window.activeTextEditor.document.getText(editor.selection);

		if(!editor) {
			vscode.window.showInformationMessage('No File is open in Editor...');
			return;
		}

		copiedValueString[inputValue] = selectedValue;
	}
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
