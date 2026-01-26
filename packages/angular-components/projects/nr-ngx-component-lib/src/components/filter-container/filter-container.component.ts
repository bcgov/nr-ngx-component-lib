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
    host: {
        '[style.--nrcl-filter-container-width]': 'this.wide ? "var( --nrcl-filter-width-" + this.wide + " )" : null'
    }
} )
export class FilterContainerComponent extends NrclBase {
    @Input() label 
    @Input() hint
    @Input() wide 

}
