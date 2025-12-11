import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ElementRef, inject, Input } from '@angular/core';

@Component( {
    selector: 'nrcl-cell-content',
    templateUrl: './cell-content.component.html',
    styleUrl: './cell-content.component.scss',
} )
export class CellContentComponent implements AfterContentInit {
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
