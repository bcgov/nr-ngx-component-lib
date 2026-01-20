import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatExpansionPanel } from "@angular/material/expansion";
import { NrclBase } from "../../directives/nrcl.base";

@Component({
    selector: "nrcl-expansion-panel",
    templateUrl: "./expansion-panel.component.html",
    styleUrl: "./expansion-panel.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-loading]':   'isLoading',
        '[class.expanded]':     'matExpansionPanel?.expanded',
        '[class.disabled]':     'disabled',
    }
})
export class ExpansionPanelComponent extends NrclBase {
    @Input() isLoading: boolean = false;
    @Input() disabled = false;
    @Input() expanded = false

    @Output() expandedChange = new EventEmitter<boolean>()

    @ViewChild( 'panel' ) matExpansionPanel: MatExpansionPanel
}
