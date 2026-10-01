import { Component } from "@angular/core";
import { NrclBase } from "../../../directives/nrcl.base";
import { GapComponent } from "../../gap/gap.component";

@Component({
    selector: "nrcl-expansion-panel-section",
    templateUrl: './expansion-panel-section.component.html',
    styleUrl: './expansion-panel-section.component.scss',
    imports: [
        GapComponent
    ]
})
export class ExpansionPanelSectionComponent extends NrclBase {
}
