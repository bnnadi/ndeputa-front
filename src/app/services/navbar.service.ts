import { Injectable } from '@angular/core';
@Injectable()
export class NavBarService {
    visible: boolean;

    constructor() {
        this.hide();
    }

    hide() { this.visible = false }

    show() { this.visible = true }

    toggle() { this.visible = !this.visible }
}