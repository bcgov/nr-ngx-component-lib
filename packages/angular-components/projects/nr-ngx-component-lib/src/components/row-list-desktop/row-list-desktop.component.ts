import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component({
    selector: "nrcl-row-list-desktop",
    templateUrl: "./row-list-desktop.component.html",
    styleUrl: "./row-list-desktop.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.show-row-hover]': 'showRowHover'
    }
})
export class RowListDesktopComponent extends NrclBase {
    @Input() showRowHover = true
}
