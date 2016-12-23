'use strict';

import * as vscode from 'vscode';
import { KeyboardManager } from './keyboardManager';

export class KeyboardCounterModel {
    private count: number;
    private keyboardManager: KeyboardManager;
    private keyCountChangedEventEmitter = new vscode.EventEmitter<number>();
    private saveKeycountInterval: NodeJS.Timer;
    private needToSaveKeycount: boolean;


    public get onKeyCountChanged(): vscode.Event<number> {
        return this.keyCountChangedEventEmitter.event;
    }

    constructor(initCount: number) {
        this.count = initCount;
        this.keyboardManager = new KeyboardManager();
        this.keyboardManager.onKeyDown((key) => {
            this.increment();
            this.needToSaveKeycount = true;
            this.keyCountChangedEventEmitter.fire(this.count);
        });

        // 5秒に一回キーカウントを保存する
        this.saveKeycountInterval = setInterval(() => {
            if (this.needToSaveKeycount) {
                this.needToSaveKeycount = false;
                this.saveKeycount();
            }
        }, 5000);
    }

    increment() {
        this.count++;
    }

    dispose() {
        this.keyboardManager.dispose();
        clearInterval(this.saveKeycountInterval);
    }

    saveKeycount() {
        vscode.workspace.getConfiguration("keyboard-counter").update("keycount", this.count, true);
    }
}
