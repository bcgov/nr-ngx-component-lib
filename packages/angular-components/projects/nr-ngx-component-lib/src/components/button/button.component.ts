import { booleanAttribute, Component, ElementRef, EventEmitter, inject, Input, NgZone, Output } from '@angular/core';
import { ConfigurationSubscriberBase } from '../../directives/configuration-subscriber.base';

@Component( {
    selector: 'nrcl-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    host: {
        '[class.disabled]': 'disabled',
        '[class.primary]': 'isPrimary',
        '[class.secondary]': 'isSecondary',
        '[class.tertiary]': 'isTertiary',
        '[class.normal]': '!isCompact && !small',
        '[class.compact]': 'isCompact',
        '[class.small]': 'small && !isCompact',
        '[class.label]': 'hasLabel',
        '[class.icon-left]': 'hasIconLeft',
        '[class.icon-right]': 'hasIconRight',
        '[class.icon-compact]': 'hasIconCompact',
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
    @Input( { transform: booleanAttribute } ) secondary = false
    @Input( { transform: booleanAttribute } ) tertiary = false
    @Input( { transform: booleanAttribute } ) disabled = false
    @Input( { transform: booleanAttribute } ) small = false

    // the click event is already defined for the host element
    // this declaration makes storybook happy
    @Output() click = new EventEmitter<PointerEvent>()

    isCompact
    isPrimary
    isSecondary
    isTertiary
    hasIconLeft
    hasIconRight
    hasIconCompact
    hasLabel
    useContent

    zone = inject( NgZone )

    onConfigurationChange(): void {
        // apparently this is needed to ensure that the host binding updates properly
        this.zone.run( () => {
            this.updateState()
            this.changeDetectorRef.markForCheck()
        } )
    }

    updateState() {
        if ( this.compact == null || this.compact === false ) {
            this.isCompact = false
        }
        else if ( this.compact == '' || this.compact === true ) {
            this.isCompact = true
        }
        else {
            this.isCompact = this.compact == this.configuration.displayMode
        }

        this.isPrimary = this.primary
        this.isSecondary = ( this.secondary && !this.primary ) || ( !this.primary && !this.tertiary && !this.small && !this.isCompact )
        this.isTertiary = ( this.tertiary || this.small || this.isCompact ) && !this.primary && !this.secondary

        this.hasLabel = !!this.label
        this.hasIconLeft = !!this.icon && !this.isCompact
        this.hasIconRight = !!this.iconRight && this.hasLabel && !this.isCompact
        this.hasIconCompact = ( !!this.iconCompact || !!this.icon ) && this.isCompact

        this.useContent = !this.hasLabel && !this.hasIconLeft && !this.hasIconRight && !this.hasIconCompact
    }
}
