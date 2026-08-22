import { Directive, Input, TemplateRef, ViewContainerRef, HostListener, ElementRef, inject, Component, numberAttribute } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

@Component( {
    selector: 'nrcl-default-tooltip',
    template: `
        {{ text }}
    `,
    styles: [ `
        :host {
            white-space: pre-line;
            text-align: left;
        }
    `]
} )
export class TooltipComponent {
    @Input() text: string = '';
}

//############################################################################################

@Directive( {
    selector: '[nrclTooltip]',
} )
export class TooltipDirective {
    private overlay = inject( Overlay )
    private elementRef = inject( ElementRef )
    private viewContainerRef = inject( ViewContainerRef )

    @Input( 'nrclTooltip' ) tooltipTemplate!: TemplateRef<any> | string
    @Input( 'nrclTooltipContext' ) tooltipContext: any
    @Input( 'nrclTooltipClass' ) tooltipClass?: string
    @Input( { alias: 'nrclTooltipDelay', transform: numberAttribute } ) tooltipDelay = 300

    private overlayRef: OverlayRef | null = null

    @HostListener( 'mouseenter' )
    show() {
        if ( this.overlayRef || !this.tooltipTemplate ) return

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo( this.elementRef )
            .withPositions( [
                { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 }, // Bottom
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 } // Top fallback
            ] )

        this.overlayRef = this.overlay.create( {
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            panelClass: [ 'nrcl-tooltip-panel', ...( this.tooltipClass ? [ this.tooltipClass ]: [] ) ],
        } )

        if ( this.tooltipTemplate instanceof TemplateRef ) {
            const portal = new TemplatePortal( this.tooltipTemplate, this.viewContainerRef, this.tooltipContext )
            setTimeout(() => {
                this.overlayRef?.attach( portal )            
            }, this.tooltipDelay )
        }
        else {
            const componentPortal = new ComponentPortal( TooltipComponent, this.viewContainerRef )
            setTimeout(() => {
                const componentRef = this.overlayRef?.attach( componentPortal )

                if ( componentRef ) 
                    componentRef.instance.text = this.tooltipTemplate as string
            }, this.tooltipDelay )
        }
    }

    @HostListener( 'mouseleave' )
    hide() {
        this.closeTooltip()
    }

    ngOnDestroy() {
        this.closeTooltip()
    }

    private closeTooltip() {
        if ( this.overlayRef ) {
            this.overlayRef.detach()
            this.overlayRef.dispose()
            this.overlayRef = null
        }
    }
}
