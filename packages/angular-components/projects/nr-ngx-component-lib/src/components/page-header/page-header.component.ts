import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";

@Component({
    selector: "nrcl-page-header",
    templateUrl: "./page-header.component.html",
    styleUrl: "./page-header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.isLoading]': 'isLoading',
    }
})
export class PageHeaderComponent {
    @Input() isLoading = false
}
