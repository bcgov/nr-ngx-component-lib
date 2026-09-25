import {
    ChangeDetectionStrategy,
    Component
} from "@angular/core";
import { NrclBase } from '../../directives/nrcl.base';

@Component({
    selector: "nrcl-application",
    templateUrl: "./application.component.html",
    styleUrl: "./application.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ApplicationComponent extends NrclBase {
}
