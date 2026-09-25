import { Component, ChangeDetectionStrategy } from "@angular/core";
import { NrclBase } from "../../../directives/nrcl.base";

@Component({
    selector: "nrcl-expansion-panel-header",
    templateUrl: './expansion-panel-header.component.html',
    styleUrl: './expansion-panel-header.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExpansionPanelHeaderComponent extends NrclBase {}

