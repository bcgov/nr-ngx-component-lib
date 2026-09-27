import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-cell-content',
    templateUrl: './cell-content.component.html',
    styleUrl: './cell-content.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
} )
export class CellContentComponent extends NrclBase implements AfterContentInit {
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() tooltip
    @Input() content    

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
