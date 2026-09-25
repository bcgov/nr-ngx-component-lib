import { Component, ChangeDetectionStrategy } from "@angular/core"
import { ConfigurationSubscriberBase } from "../src/directives/configuration-subscriber.base";

@Component( {
    selector: 'registration-wrapper',
    styleUrl: './registration-wrapper.component.scss',
    templateUrl: './registration-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
} )
export class RegistrationWrapperComponent extends ConfigurationSubscriberBase {
}
