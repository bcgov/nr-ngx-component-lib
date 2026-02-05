import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

const POSITIONS = [ 'before', 'middle', 'after', 'none' ] as const
type Position = (typeof POSITIONS)[number] 

@Component( {
    selector: 'nrcl-gap',
    templateUrl: './gap.component.html',
    styleUrl: './gap.component.scss',
} )
export class GapComponent extends NrclBase implements OnChanges {
    @Input() horizontal
    @Input() vertical
    @Input() divider

    @HostBinding( 'class' )
    componentClass

    @HostBinding( 'style.--nrcl-gap-multiple' )
    multiple = 1

    ngOnChanges(changes: SimpleChanges): void {
        let defaultMultiple = 1
        let direction: 'vertical' | 'horizontal' = 'vertical'
        let dividerPosition: Position = 'none'

        if ( this.divider != null && this.divider !== false ) {
            if ( this.divider == '' || POSITIONS.includes( this.divider ) ) {
                dividerPosition = this.divider || 'middle'
                if ( dividerPosition == 'middle' ) defaultMultiple = 2
            }
        }

        this.multiple = defaultMultiple
        if ( this.vertical != null && this.vertical !== false ) {
            direction = 'vertical'
            this.multiple = parseMultiple( this.vertical, defaultMultiple )
        }
        else if ( this.horizontal != null && this.horizontal !== false ) {
            direction = 'horizontal'
            this.multiple = parseMultiple( this.horizontal, defaultMultiple )
        }

        this.componentClass = `direction-${ direction } divider-position-${ dividerPosition }`
    }
}

function parseMultiple( v, def ) {
    let n = Number.parseInt( v )
    if ( Number.isNaN( n ) ) return def
    return n
}
