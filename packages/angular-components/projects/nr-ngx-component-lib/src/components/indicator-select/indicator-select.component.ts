import { Component, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-indicator-select',
    styleUrl: './indicator-select.component.scss',
    template: `
        @if ( selected ) {
            <nrcl-icon>indeterminate_check_box</nrcl-icon>
        }
        @else {
            <nrcl-icon>add_box</nrcl-icon>
        }
    `,
    host: {
        '[class.selected]': "selected"
    }
} )
export class IndicatorSelectComponent extends NrclBase {
    @Input() selected = false
}
