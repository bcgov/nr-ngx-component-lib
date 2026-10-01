import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { DialogBase } from "../../directives/dialog.base";
import { NgTemplateOutlet } from "@angular/common";
import { DialogComponent } from "../dialog/dialog.component";

export type DialogConfirmConfig = {
    title: string
    saveLabel?: string 
    cancelLabel?: string
    template: TemplateRef<any>,
    context?: any
    showActions?: boolean
}

@Component({
    selector: 'nrcl-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrl: './dialog-confirm.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgTemplateOutlet,
        DialogComponent
    ]
})
export class DialogConfirmComponent extends DialogBase<DialogConfirmConfig> {
    title = this.config.title
    saveLabel = this.config.saveLabel || 'Confirm'
    cancelLabel = this.config.cancelLabel || 'Cancel'
    showActions = this.config.showActions ?? true
}
