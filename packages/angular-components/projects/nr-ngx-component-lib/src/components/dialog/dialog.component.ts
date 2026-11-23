import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ConfigurationSubscriberBase } from "../../directives/configuration-subscriber.base";

@Component({
    selector: 'nrcl-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent extends ConfigurationSubscriberBase {
    @Input() title?: string;
    @Input() isLoading = false
    @Input() showClose = false
    @Input() saveLabel = 'Save'
    @Input() saveEnabled: boolean|null = false
    @Input() cancelLabel = 'Cancel'
    @Input() cancelEnabled: boolean|null = true
    @Input() showWarning = true
    @Input() showActions = true

    @Output() saveClick = new EventEmitter<void>()
    @Output() cancelClick = new EventEmitter<void>()
}
