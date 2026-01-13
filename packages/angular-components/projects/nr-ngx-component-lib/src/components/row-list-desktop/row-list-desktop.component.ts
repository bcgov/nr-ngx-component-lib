import {
    ChangeDetectionStrategy,
    Component
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component({
    selector: "nrcl-row-list-desktop",
    templateUrl: "./row-list-desktop.component.html",
    styleUrl: "./row-list-desktop.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowListDesktopComponent extends NrclBase {
}
