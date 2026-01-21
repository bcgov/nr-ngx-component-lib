import { booleanAttribute, Component, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-gap',
    templateUrl: './gap.component.html',
    styleUrl: './gap.component.scss',
    host: {
        '[class.horizontal]': 'horizontal', 
        '[class.vertical]': 'vertical', 
        '[class.divider]': 'divider', 
    }
} )
export class GapComponent extends NrclBase {
    @Input( { transform: booleanAttribute } ) horizontal = false
    @Input( { transform: booleanAttribute } ) vertical = false
    @Input( { transform: booleanAttribute } ) divider = false
}
