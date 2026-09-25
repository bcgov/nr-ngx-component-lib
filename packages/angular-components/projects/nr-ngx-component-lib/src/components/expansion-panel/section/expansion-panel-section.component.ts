import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { NrclBase } from "../../../directives/nrcl.base";

@Component({
    selector: "nrcl-expansion-panel-section",
    templateUrl: './expansion-panel-section.component.html',
    styleUrl: './expansion-panel-section.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExpansionPanelSectionComponent extends NrclBase {
}
