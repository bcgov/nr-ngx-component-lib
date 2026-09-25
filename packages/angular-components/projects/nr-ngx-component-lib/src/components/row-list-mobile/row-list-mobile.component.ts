import {
    ChangeDetectionStrategy,
    Component
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component({
    selector: "nrcl-row-list-mobile",
    templateUrl: "./row-list-mobile.component.html",
    styleUrl: "./row-list-mobile.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RowListMobileComponent extends NrclBase {
}
