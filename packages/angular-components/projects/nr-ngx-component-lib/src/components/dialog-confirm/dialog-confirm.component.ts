import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { DialogBase } from "../../directives/dialog.base";

export type DialogConfirmConfig = {
    title
    saveLabel?
    cancelLabel?
    template: TemplateRef<any>,
    context?: any
}

@Component({
    selector: 'nrcl-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrl: './dialog-confirm.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmComponent extends DialogBase<DialogConfirmConfig> {
    title = this.config.title
    saveLabel = this.config.saveLabel || 'Confirm'
    cancelLabel = this.config.cancelLabel || 'Cancel'
}
