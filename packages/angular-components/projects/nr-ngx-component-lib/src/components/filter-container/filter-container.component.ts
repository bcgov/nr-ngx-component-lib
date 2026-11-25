import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component( {
    selector: "nrcl-filter-container",
    templateUrl: "./filter-container.component.html",
    styleUrl: "./filter-container.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.--nrcl-filter-container-width]': 'this.wide ? "var( --nrcl-filter-width-" + this.wide + " )" : null'
    },
    imports: [
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
    ]
} )
export class FilterContainerComponent extends NrclBase {
    @Input() label?: string 
    @Input() hint?: string
    @Input() wide?: string 
}
