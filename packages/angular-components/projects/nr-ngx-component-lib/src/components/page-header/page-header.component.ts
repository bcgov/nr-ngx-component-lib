import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";
import { ConfigurationSubscriberBase } from "../../directives/configuration-subscriber.base";

@Component({
    selector: "nrcl-page-header",
    templateUrl: "./page-header.component.html",
    styleUrl: "./page-header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.isLoading]': 'isLoading',
    }
})
export class PageHeaderComponent extends ConfigurationSubscriberBase {
    @Input() isLoading = false
}
