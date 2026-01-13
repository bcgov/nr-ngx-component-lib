import {
    ChangeDetectionStrategy,
    Component
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component( {
    selector: "nrcl-page-container",
    templateUrl: "./page-container.component.html",
    styleUrl: "./page-container.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class PageContainerComponent extends NrclBase {}
