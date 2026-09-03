import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";

@Component({
    selector: "nrcl-header-desktop",
    templateUrl: "./header-desktop.component.html",
    styleUrl: "./header-desktop.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    @Input() siteTitle = "Wildfire DataMart";

    @Input() homeUrl = "/";

    @Input() skipLinksEnabled = false;

    @Input() skipLinkTarget = "main-content";

}