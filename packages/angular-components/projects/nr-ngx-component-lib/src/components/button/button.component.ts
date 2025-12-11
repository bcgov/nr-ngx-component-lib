import { booleanAttribute, Component, EventEmitter, inject, Input, NgZone, Output } from '@angular/core';
import { ConfigurationSubscriberBase } from '../../directives/configuration-subscriber.base';

@Component( {
    selector: 'nrcl-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    host: {
        '[class.primary]': 'primary',
        '[class.disabled]': 'disabled',
        '[class.compact]': 'isCompact',
        '[class.icon-left]': '!isCompact && icon',
        '[class.icon-right]': '!isCompact && iconRight && label',
        '[class.label]': 'label'
    }
} )
export class ButtonComponent extends ConfigurationSubscriberBase {    
    @Input() label
    @Input() icon
    @Input() iconRight
    @Input() iconCompact
    @Input() tooltip
    @Input() compact
    @Input( { transform: booleanAttribute } ) primary = false
    @Input( { transform: booleanAttribute } ) disabled = false

    @Output() click = new EventEmitter<PointerEvent>()

    isCompact

    zone = inject( NgZone )

    onClick( ev: PointerEvent ) {
        if ( this.disabled ) return

        this.click.emit( ev )
    }

    onConfigurationChange(): void {
        // apparently this is needed to ensure that the host binding updates properly
        this.zone.run( () => {
            if ( this.compact == null || this.compact === false ) {
                this.isCompact = false
            }
            else if ( this.compact == '' || this.compact === true ) {
                this.isCompact = true
            }
            else {
                this.isCompact = this.compact == this.configuration.displayMode
            }

            this.changeDetectorRef.markForCheck()
        } )
    }
}
