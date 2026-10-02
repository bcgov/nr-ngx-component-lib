import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ElementRef, inject, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component( {
    selector: 'nrcl-cell-content',
    templateUrl: './cell-content.component.html',
    styleUrl: './cell-content.component.scss',
    imports: [
        MatTooltipModule
    ]
} )
export class CellContentComponent extends NrclBase implements AfterContentInit {
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() tooltip?: string|boolean
    @Input() content?: string|false
    
    tooltipContent?: string

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
