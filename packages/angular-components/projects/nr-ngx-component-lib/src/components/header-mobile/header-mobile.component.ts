import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";

@Component({
    selector: "nrcl-header-mobile",
    templateUrl: "./header-mobile.component.html",
    styleUrl: "./header-mobile.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMobileComponent {

    @Input() siteTitle = "Wildfire DataMart";

    @Input() homeUrl = "/";

    @Input() skipLinksEnabled = false;

    @Input() skipLinkTarget = "main-content";

    @Input() skipLinkLabel = "Skip to main content";
}