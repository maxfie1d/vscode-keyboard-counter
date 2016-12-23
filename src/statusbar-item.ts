'use strict';

import * as vscode from 'vscode';
import { KeyboardCounterModel } from './models/keyboard-counter-model';

/**
 * StatusBarItem
 * ステータスバーに表示されるUIの本体
 */
export class StatusBarItem {
    private statusBarItem: vscode.StatusBarItem;
    private model: KeyboardCounterModel;

    constructor() {
        // 右側に表示するステータスバーアイテムを作る
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -10);

        // ツールチップを指定する
        this.statusBarItem.tooltip = "Key Count";
        let keycount = vscode.workspace.getConfiguration("keyboard-counter").get<number>("keycount");
        this.statusBarItem.text = keycount.toLocaleString();

        // ステータスバーアイテムを表示する
        this.statusBarItem.show();

        this.model = new KeyboardCounterModel(keycount);
        this.model.onKeyCountChanged((count) => {
            this.statusBarItem.text = count.toLocaleString();
        });
    }

    dispose() {
        this.statusBarItem.dispose();
        this.model.dispose();
    }
}
