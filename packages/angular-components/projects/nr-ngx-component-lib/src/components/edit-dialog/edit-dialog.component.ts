import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'nrcl-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: [
        './edit-dialog.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent implements OnChanges {
    @Input() title: string;
    @Input() saveLabel = 'Save'
    @Input() saveEnabled = false
    @Input() cancelLabel = 'Cancel'
    // @Input() errorState?: ErrorState[];
    @Input() isLoading = false
    @Input() showClose = false
    @Input() showWarning = true

    @Output() saveClick = new EventEmitter<void>()
    @Output() cancelClick = new EventEmitter<void>()

    ngOnChanges(changes: SimpleChanges) {
    }
}
