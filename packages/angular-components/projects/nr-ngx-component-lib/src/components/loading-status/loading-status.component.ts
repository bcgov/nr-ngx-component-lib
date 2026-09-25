import { booleanAttribute, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-loading-status',
    styleUrl: './loading-status.component.scss',
    templateUrl: './loading-status.component.html',
    host: {
        '[class.is-loading]': "loading",
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
} )
export class LoadingStatusComponent extends NrclBase {
    @Input( { transform: booleanAttribute } ) loading = false
}