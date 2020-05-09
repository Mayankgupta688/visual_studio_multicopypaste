// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	var copiedValueString = new Array(10).fill('');

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
		if(copiedValueString[inputValue]) {
			var editor = vscode.window.activeTextEditor;
			if(!editor) {
				vscode.window.showInformationMessage('No File is open in Editor...');
				return;
			}
			editor.edit((editBuilder) => {
				editBuilder.delete(editor.selection)
			}).then(() => {
				editor.edit((editBuilder) => {
					vscode.window.showInformationMessage("Value at index " + inputValue + " pasted..." );
					editBuilder.insert(editor.selection.start, copiedValueString[inputValue]);
				})
			})
		} else {
			vscode.window.showInformationMessage('No value saved at Position: ' + inputValue );
		}
	}


	function copyActivation(inputValue) {
		var editor = vscode.window.activeTextEditor;
		
		if(!editor) {
			vscode.window.showInformationMessage('No File is open in Editor...');
			return;
		}
		var selectedValue = vscode.window.activeTextEditor.document.getText(editor.selection);
		if(selectedValue) {
			copiedValueString[inputValue] = selectedValue;

			vscode.window.showInformationMessage('Copied value at Index: ' + inputValue );

		} else {
			vscode.window.showInformationMessage('No Text Selected...');
		}
	}
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
