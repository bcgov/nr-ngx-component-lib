import { booleanAttribute, Component, ElementRef, EventEmitter, inject, Input, NgZone, OnChanges, Output, SimpleChanges } from '@angular/core';
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
        '[class.anchor]': 'isAnchor',
        '[class.normal]': '!isCompact && !isSmall',
        '[class.compact]': 'isCompact',
        '[class.small]': 'isSmall && !isCompact',
        '[class.label]': 'hasLabel',
        '[class.icon-left]': 'hasIconLeft',
        '[class.icon-right]': 'hasIconRight',
        '[class.icon-compact]': 'hasIconCompact',
        '[class.icon-small]': 'isIconSmall',
    }
} )
export class ButtonComponent extends ConfigurationSubscriberBase implements OnChanges {
    @Input() label
    @Input() icon
    @Input() iconRight
    @Input() iconCompact
    @Input() tooltip
    @Input() compact
    @Input() small
    @Input( { transform: booleanAttribute } ) primary = false
    @Input( { transform: booleanAttribute } ) secondary = false
    @Input( { transform: booleanAttribute } ) tertiary = false
    @Input( { transform: booleanAttribute } ) disabled = false
    @Input() anchor

    // the click event is already defined for the host element
    // this declaration makes storybook happy
    @Output() click = new EventEmitter<PointerEvent>()

    isCompact
    isSmall
    isPrimary
    isSecondary
    isTertiary
    isAnchor
    hasIconLeft
    hasIconRight
    hasIconCompact
    isIconSmall
    hasLabel
    useContent
    href
    target 

    zone = inject( NgZone )

    ngOnChanges( changes: SimpleChanges ): void {
        this.updateState()
    }

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
            this.isCompact = this.compact == this.configuration?.displayMode
        }

        if ( this.small == null ) {
            this.isSmall = false
            this.isIconSmall = null
        }
        else if ( this.small === false ) {
            this.isSmall = false
            this.isIconSmall = false
        }
        else {
            this.isSmall = true
            this.isIconSmall = true
        }

        this.href = null
        this.target = null
        if ( this.anchor == null || this.anchor === false || this.primary || this.secondary || this.tertiary ) {
            this.isAnchor = false
        }
        else if ( this.anchor == '' || this.anchor === true ) {
            this.isAnchor = true
        }
        else {
            this.isAnchor = true
            if ( this.anchor.href ) {
                this.href = this.anchor.href
                this.target = ( 'target' in this.anchor ) ? this.anchor.target : '_blank'
            }
            else {
                this.href = this.anchor
                this.target = '_blank'
            }
        }

        this.isPrimary = this.primary
        this.isSecondary = ( this.secondary && !this.primary ) || ( !this.primary && !this.tertiary && !this.isSmall && !this.isCompact && !this.isAnchor )
        this.isTertiary = ( this.tertiary || this.isSmall || this.isCompact ) && !this.primary && !this.secondary 

        this.hasLabel = !!this.label
        this.hasIconLeft = !!this.icon && !this.isCompact
        this.hasIconRight = !!this.iconRight && this.hasLabel && !this.isCompact
        this.hasIconCompact = ( !!this.iconCompact || !!this.icon ) && this.isCompact
        if ( this.isIconSmall == null ) {
            this.isIconSmall = this.isAnchor
        }

        this.useContent = !this.hasLabel && !this.hasIconLeft && !this.hasIconRight && !this.hasIconCompact
    }
}
