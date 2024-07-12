import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"extension.replaceElInputTags",
		() => {
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				const document = editor.document;
				const selection = editor.selection;
				const text = document.getText(
					selection.isEmpty ? undefined : selection
				);

				const updatedText = text
					.replace(/<el-input/g, "<input")
					.replace(/<\/el-input>/g, "</input>");

				editor.edit((editBuilder) => {
					if (selection.isEmpty) {
						const range = new vscode.Range(
							document.positionAt(0),
							document.positionAt(text.length)
						);
						editBuilder.replace(range, updatedText);
					} else {
						editBuilder.replace(selection, updatedText);
					}
				});
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
