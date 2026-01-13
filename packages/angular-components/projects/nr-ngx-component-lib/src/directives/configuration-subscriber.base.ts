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

@Directive()
export class ConfigurationSubscriberBase extends NrclBase implements OnInit, OnDestroy {    
    configurationSubscription
    configuration: Configuration

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
}
