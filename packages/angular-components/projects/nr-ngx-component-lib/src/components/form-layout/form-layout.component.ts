import {
    ChangeDetectionStrategy,
    Component
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component({
    selector: "nrcl-form-layout",
    template: "<ng-content></ng-content>",
    styleUrl: "./form-layout.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent extends NrclBase {
}
