import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'nrcl-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrl: './edit-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent {
    @Input() title: string;
    @Input() saveLabel = 'Save'
    @Input() saveEnabled = false
    @Input() cancelLabel = 'Cancel'
    @Input() isLoading = false
    @Input() showClose = false
    @Input() showWarning = true

    @Output() saveClick = new EventEmitter<void>()
    @Output() cancelClick = new EventEmitter<void>()
}
