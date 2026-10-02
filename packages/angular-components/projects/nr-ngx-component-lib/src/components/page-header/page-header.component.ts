import { NgTemplateOutlet } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ConfigurationSubscriberBase } from "../../directives/configuration-subscriber.base";

@Component({
    selector: "nrcl-page-header",
    templateUrl: "./page-header.component.html",
    styleUrl: "./page-header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.isLoading]': 'isLoading',
    },
    imports: [
        NgTemplateOutlet,
        MatProgressSpinnerModule
    ]
})
export class PageHeaderComponent extends ConfigurationSubscriberBase {
    @Input() isLoading = false
}
