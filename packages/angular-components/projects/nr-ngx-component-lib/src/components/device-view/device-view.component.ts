import { Component } from "@angular/core";
import { ConfigurationSubscriberBase } from "../../directives/configuration-subscriber.base";

@Component( {
    selector: "nrcl-desktop-view",
    template: '@if ( visible ) { <ng-content></ng-content> }',
    host: {
        '[class.nrcl-device-desktop]': 'true'
    }
} )
export class DesktopViewComponent extends ConfigurationSubscriberBase {    
    get visible() { return this.configuration.displayMode == 'desktop' }
}

@Component( {
    selector: "nrcl-mobile-view",
    template: '@if ( visible ) { <ng-content></ng-content> }',
    host: {
        '[class.nrcl-device-mobile]': 'true'
    }
} )
export class MobileViewComponent extends ConfigurationSubscriberBase {    
    get visible() { return this.configuration.displayMode == 'mobile' }
}
