import { AfterContentChecked, Component, ElementRef, inject, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-indicator',
    styleUrl: './indicator.component.scss',
    template: '<ng-content></ng-content><div class="none"></div>',
    host: {
        '[class]': "'status-' + status"
    }
} )
export class IndicatorComponent extends NrclBase implements AfterContentChecked {
    private _content = 'none'
    private _status: string 
    
    @Input() 
    set status( v: string ) {
        this._status = v
    }
    get status(): string {
        if ( this._status ) return this._status

        return this._content
    }

    elementRef = inject( ElementRef )

    ngAfterContentChecked(): void {        
        let t = this.elementRef?.nativeElement?.textContent
        this._content = t?.toLowerCase().trim().replace( /[^-a-z0-9]+/g, '-' ) || 'none'
    }

}
