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

@Directive()
export class ConfigurationSubscriberBase implements OnInit, OnDestroy {    
    configurationSubscription
    configuration: Configuration

    configurationService = inject( ConfigurationService )
    changeDetectorRef = inject( ChangeDetectorRef )

    ngOnInit(): void {
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
