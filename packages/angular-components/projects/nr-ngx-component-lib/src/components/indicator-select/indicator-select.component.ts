import { Component, Input } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';
import { IconComponent } from '../icon/icon.component';

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
    },
    imports: [
        IconComponent
    ]
} )
export class IndicatorSelectComponent extends NrclBase {
    @Input() selected = false
}
