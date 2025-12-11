import {
    ChangeDetectionStrategy,
    Component
} from "@angular/core";

@Component( {
    selector: "nrcl-page-container",
    templateUrl: "./page-container.component.html",
    styleUrl: "./page-container.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class PageContainerComponent {}
