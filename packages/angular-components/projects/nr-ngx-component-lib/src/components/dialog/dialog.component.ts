import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component({
    selector: 'nrcl-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent extends NrclBase {
    @Input() title: string;
    @Input() isLoading = false
    @Input() showClose = false
    @Input() saveLabel = 'Save'
    @Input() saveEnabled = false
    @Input() cancelLabel = 'Cancel'
    @Input() cancelEnabled = true
    @Input() showWarning = true
    @Input() showActions = true

    @Output() saveClick = new EventEmitter<void>()
    @Output() cancelClick = new EventEmitter<void>()
}
