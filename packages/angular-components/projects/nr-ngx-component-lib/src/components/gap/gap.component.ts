import { booleanAttribute, Component, Input } from '@angular/core';

@Component( {
    selector: 'nrcl-gap',
    template: '',
    styleUrl: './gap.component.scss',
} )
export class GapComponent {
    @Input( { transform: booleanAttribute } ) horizontal = false
    @Input( { transform: booleanAttribute } ) vertical = false
}
