// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	//var copiedValueString = [];
	var functionCallCount = 0;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "multiplecopypaste" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	var commandArray = ["One", "Two"];

	for(let i = 0; i< commandArray.length; i++) {
		let disposable = vscode.commands.registerCommand('extension.multipleCopyPasteOne' + commandArray[i], () => bindingFunction(i));
		context.subscriptions.push(disposable);
	}
	function bindingFunction(count) {
		
		functionCallCount = functionCallCount + 1;

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
				editBuilder.insert(editor.selection.start, commandArray[count]);
			})
		})
	}
}
exports.activate = activate;



// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
