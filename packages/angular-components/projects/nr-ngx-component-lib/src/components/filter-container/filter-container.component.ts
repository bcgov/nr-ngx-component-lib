import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";

@Component( {
    selector: "nrcl-filter-container",
    templateUrl: "./filter-container.component.html",
    styleUrl: "./filter-container.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class FilterContainerComponent {
    @Input() label = '[label]'
    @Input() hint
}
