import { booleanAttribute, Component, ElementRef, EventEmitter, inject, Input, NgZone, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConfigurationSubscriberBase } from '../../directives/configuration-subscriber.base';

@Component( {
    selector: 'nrcl-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    host: {
        '[class.disabled]':     'disabled',
        '[class.primary]':      'isPrimary',
        '[class.secondary]':    'isSecondary',
        '[class.tertiary]':     'isTertiary',
        '[class.anchor]':       'isAnchor',
        '[class.normal]':       '!isCompact && !isSmall',
        '[class.compact]':      'isCompact',
        '[class.small]':        'isSmall && !isCompact',
        '[class.label]':        'hasLabel',
        '[class.icon-left]':    'hasIconLeft',
        '[class.icon-right]':   'hasIconRight',
        '[class.icon-compact]': 'hasIconCompact',
        '[class.icon-small]':   'isIconSmall',
    }
} )
export class ButtonComponent extends ConfigurationSubscriberBase implements OnChanges {
    zone = inject( NgZone )

    @Input() label?: string
    @Input() icon?: string
    @Input() iconRight?: string
    @Input() iconCompact?: string
    @Input() tooltip?: string | boolean
    @Input() compact?: string | boolean
    @Input() small?: string | boolean
    @Input( { transform: booleanAttribute } ) primary = false
    @Input( { transform: booleanAttribute } ) secondary = false
    @Input( { transform: booleanAttribute } ) tertiary = false
    @Input( { transform: booleanAttribute } ) disabled = false
    @Input() anchor?: string | boolean | { href: string, target: string }

    // the click event is already defined for the host element
    // this declaration makes storybook happy
    @Output() click = new EventEmitter<PointerEvent>()

    protected isCompact = false
    protected isSmall = false
    protected isPrimary = false
    protected isSecondary = false
    protected isTertiary = false
    protected isAnchor = false
    protected hasIconLeft = false
    protected hasIconRight = false
    protected hasIconCompact = false
    protected isIconSmall?: boolean
    protected hasLabel = false
    protected useContent = false
    protected href?: string
    protected target?: string
    protected tooltipVal?: string

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
        if ( this.tooltip == null || this.tooltip === false ) {
            this.tooltipVal = undefined
        }
        else if ( this.tooltip == '' || this.tooltip === true ) {
            this.tooltipVal = this.label
        }
        else {
            this.tooltipVal = this.tooltip
        }

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
            this.isIconSmall = undefined
        }
        else if ( this.small === false ) {
            this.isSmall = false
            this.isIconSmall = false
        }
        else {
            this.isSmall = true
            this.isIconSmall = true
        }

        this.href = undefined
        this.target = undefined
        if ( this.anchor == null || this.anchor === false || this.primary || this.secondary || this.tertiary ) {
            this.isAnchor = false
        }
        else if ( this.anchor == '' || this.anchor === true ) {
            this.isAnchor = true
        }
        else {
            this.isAnchor = true
            if ( typeof this.anchor == 'string' ) {
                this.href = this.anchor
                this.target = '_blank'
            }
            else if ( typeof this.anchor == 'boolean' ) {
            }
            else {
                this.href = this.anchor.href
                this.target = ( 'target' in this.anchor ) ? this.anchor.target : '_blank'
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
