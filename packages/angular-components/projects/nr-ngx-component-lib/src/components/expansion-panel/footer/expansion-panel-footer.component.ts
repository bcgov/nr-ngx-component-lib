import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { NrclBase } from "../../../directives/nrcl.base";

@Component({
    selector: "nrcl-expansion-panel-footer",
    templateUrl: './expansion-panel-footer.component.html',
    styleUrl: './expansion-panel-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExpansionPanelFooterComponent extends NrclBase {
    @Input() saveEnabled 
    @Input() cancelEnabled 
    @Input() warningMessage = 'Unsaved Changes'
    @Input() showWarning = false

    @Output() saveClick = new EventEmitter<PointerEvent>()
    @Output() cancelClick = new EventEmitter<PointerEvent>()
}
