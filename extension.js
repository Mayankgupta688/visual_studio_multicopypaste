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

	for(let i = 0; i< 10; i++) {
		const commandNamePaste = 'extension.multiplePaste' + i
		const commandNameCopy = 'extension.multipleCopy' + i
		const disposablePaste = vscode.commands.registerCommand(commandNamePaste, () => { 
			pasteActivation(i);
		});
		const disposableCopy = vscode.commands.registerCommand(commandNameCopy, () => { 
			copyActivation(i);
		});
		context.subscriptions.push(disposablePaste, disposableCopy);
	}
	

	function pasteActivation(inputValue) {
		if(copiedValueString[inputValue]) {
			var editor = vscode.window.activeTextEditor;
			if(!editor) {
				vscode.window.showErrorMessage('No File is open in Editor...');
				return;
			}

			editor.edit((editBuilder) => {
				editor.selections.forEach(selection => 
					editBuilder.replace(selection, copiedValueString[inputValue])
				)
			})
		} else {
			vscode.window.showErrorMessage('No value saved at Position: ' + inputValue );
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
			vscode.window.showErrorMessage('No Text Selected...');
		}
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
