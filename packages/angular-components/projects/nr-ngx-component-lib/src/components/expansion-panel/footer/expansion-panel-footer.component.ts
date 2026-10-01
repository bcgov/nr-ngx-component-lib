import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NrclBase } from "../../../directives/nrcl.base";
import { ButtonComponent } from "../../button/button.component";
import { IconComponent } from "../../icon/icon.component";

@Component({
    selector: "nrcl-expansion-panel-footer",
    templateUrl: './expansion-panel-footer.component.html',
    styleUrl: './expansion-panel-footer.component.scss',
    imports: [
        ButtonComponent,
        IconComponent
    ]
})
export class ExpansionPanelFooterComponent extends NrclBase {
    @Input() saveEnabled?: boolean 
    @Input() cancelEnabled?: boolean
    @Input() warningMessage = 'Unsaved Changes'
    @Input() showWarning = false

    @Output() saveClick = new EventEmitter<PointerEvent>()
    @Output() cancelClick = new EventEmitter<PointerEvent>()
}
