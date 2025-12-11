import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export type DisplayMode = 'desktop' | 'mobile'

export type Configuration = {
    displayMode: DisplayMode 
}

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    private _defaultConfiguration: Configuration = {
        displayMode: 'desktop'
    }

    private configSubject = new BehaviorSubject<Configuration>(this._defaultConfiguration);
  
    // Observable that components can subscribe to
    public configurationObservable: Observable<Configuration> = this.configSubject.asObservable();

    constructor() {
        this.configurationObservable.subscribe( ( c ) => {
            let el = document.querySelector( 'body' ) as HTMLElement
            el.classList.toggle( 'nrcl-device-desktop', c.displayMode == 'desktop' )
            el.classList.toggle( 'nrcl-device-mobile', c.displayMode == 'mobile' )
        } )
    }

    // Get current config value synchronously
    get configuration(): Configuration {
        return this.configSubject.value;
    }

    // Update entire config
    update( configuration: Partial<Configuration> ): void {
        this.configSubject.next( {
            ...this.configSubject.value,
            ...configuration
        } )
    }
}
