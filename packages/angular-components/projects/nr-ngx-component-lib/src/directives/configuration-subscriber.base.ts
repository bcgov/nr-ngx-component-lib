import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    inject,
    OnDestroy,
    OnInit
} from "@angular/core";
import { Configuration, ConfigurationService } from "../services/configuration.service";
import { NrclBase } from "./nrcl.base";
import { Subscription } from "rxjs";

@Directive()
export class ConfigurationSubscriberBase extends NrclBase implements OnInit, OnDestroy {    
    configurationSubscription?: Subscription
    configuration?: Configuration

    configurationService = inject( ConfigurationService )
    changeDetectorRef = inject( ChangeDetectorRef )

    ngOnInit(): void {
        super.ngOnInit()
        this.configurationSubscription = this.configurationService.configurationObservable.subscribe( ( c ) => {
            this.configuration = c
            this.onConfigurationChange()
            this.changeDetectorRef.detectChanges()
        } )
        this.configuration = this.configurationService.configuration
    }

    ngOnDestroy(): void {
        if ( this.configurationSubscription ) this.configurationSubscription.unsubscribe()
    }

    onConfigurationChange() {}

    get desktopVisible() { return this.configuration!.displayMode == 'desktop' }
    get mobileVisible() { return this.configuration!.displayMode == 'mobile' }

    get isStyle2025() { return this.configuration!.interfaceStyle == '2025' }
    get isStyle2026() { return this.configuration!.interfaceStyle == '2026' }
}
