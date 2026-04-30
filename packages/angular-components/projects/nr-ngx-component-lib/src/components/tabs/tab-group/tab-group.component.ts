import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ElementRef, inject, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrl: './tab-group.component.scss',
} )
export class TabGroupComponent extends NrclBase implements AfterContentInit {
    @Input() tooltip
    @Input() content
    
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    tooltipContent

    ngAfterContentInit(): void {
        setTimeout( () => {
            if ( this.tooltip == null || this.tooltip === false ) {
                // no tooltip                
            }
            else if ( this.tooltip == '' || this.tooltip === true ) {
                this.tooltipContent = this.content || this.elementRef?.nativeElement?.textContent
            }
            else {
                this.tooltipContent = this.tooltip
            }
            
            this.changeDetectorRef.detectChanges()
        } )
    }
}
