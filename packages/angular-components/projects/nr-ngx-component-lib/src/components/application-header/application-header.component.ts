import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { NrclBase } from '../../directives/nrcl.base';

@Component({
    selector: "nrcl-application-header",
    templateUrl: "./application-header.component.html",
    styleUrl: "./application-header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationHeaderComponent extends NrclBase{

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