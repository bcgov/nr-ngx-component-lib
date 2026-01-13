import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component( {
    selector: "nrcl-filter-container",
    templateUrl: "./filter-container.component.html",
    styleUrl: "./filter-container.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class FilterContainerComponent extends NrclBase {
    @Input() label = '[label]'
    @Input() hint
}
