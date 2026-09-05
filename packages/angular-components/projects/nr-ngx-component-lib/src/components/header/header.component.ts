import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { NrclBase } from "dist/nr-ngx-component-lib";

@Component({
    selector: "nrcl-application-header",
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends NrclBase{

    @Input() skipLinksEnabled = false;

    @Input() showMenu = false;

    @Input() homeUrl = "/";

    @Input() skipLinkTarget = "";

    @Input() skipLinkLabel = "";

    @Input() title = "";

    @Input() logoSrc = "";

    @Input() logoAlt = "";

    @Input() logoLinkAriaLabel = "";

    @Input() menuTitle = "";

    
}