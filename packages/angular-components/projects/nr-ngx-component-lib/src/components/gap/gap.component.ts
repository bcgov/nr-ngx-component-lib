import { booleanAttribute, Component, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-gap',
    template: '',
    styleUrl: './gap.component.scss',
} )
export class GapComponent extends NrclBase {
    @Input( { transform: booleanAttribute } ) horizontal = false
    @Input( { transform: booleanAttribute } ) vertical = false
}
