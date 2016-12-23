'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export class KeyboardManager {
    private emitter = new vscode.EventEmitter<string>();
    private disposable: vscode.Disposable;

    public get onKeyDown(): vscode.Event<String> {
        return this.emitter.event;
    }

    

    constructor() {
        // タイプコマンドをオーバーライドすることで
        // 'A'や"Enter"のように実際に文字が入力されるような入力をキャッチできる
        // 'default:type'コマンドを実行すれば元のtypeの動きを作れる
        this.disposable = vscode.commands.registerCommand('type', (args) => {
            let key: string = args.text;
            this.emitter.fire(key);

            vscode.commands.executeCommand('default:type', {
                text: key
            });
        });
    }

    dispose(){
        this.disposable.dispose();
    }
}
