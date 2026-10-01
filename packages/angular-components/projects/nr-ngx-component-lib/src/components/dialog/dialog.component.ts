import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ButtonComponent } from "../button/button.component";
import { MatDialogModule } from "@angular/material/dialog";
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: 'nrcl-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatProgressSpinnerModule,
        ButtonComponent,
        MatDialogModule,
        IconComponent
    ]
})
export class DialogComponent extends NrclBase {
    @Input() title?: string;
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
