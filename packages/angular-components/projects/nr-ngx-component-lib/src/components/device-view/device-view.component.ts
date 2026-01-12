import { ChangeDetectorRef, Component, ContentChild, Directive, HostListener, inject, TemplateRef } from "@angular/core";
import { ConfigurationSubscriberBase } from "../../directives/configuration-subscriber.base";

@Directive({
    selector: "[desktop-view]"
})
export class DesktopViewDirective {
    constructor(
        public templateRef: TemplateRef<unknown>
    ) {}
}


@Directive({
    selector: "[mobile-view]"
})
export class MobileViewDirective {
    constructor(
        public templateRef: TemplateRef<unknown>
    ) {}
}


@Component({
    selector: "nrcl-device-view",
    template: `
        @if ( mobileVisible && mobileContent ) {
            <ng-container [ngTemplateOutlet]="mobileContent.templateRef"></ng-container>
        }

        @if ( desktopVisible && desktopContent ) {
            <ng-container [ngTemplateOutlet]="desktopContent.templateRef"></ng-container>
        }
    `,
    styles: [`
        :host:empty {
            display: none;
        }
    `]
})
export class DeviceViewComponent extends ConfigurationSubscriberBase {
    @ContentChild( DesktopViewDirective ) desktopContent!: DesktopViewDirective;
    @ContentChild( MobileViewDirective ) mobileContent!: MobileViewDirective;

    changeDetectorRef = inject( ChangeDetectorRef )

    get desktopVisible() { return this.configuration.displayMode == 'desktop' }
    get mobileVisible() { return this.configuration.displayMode == 'mobile' }
}

