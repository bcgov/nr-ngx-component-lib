
import { Component, HostListener, Input, OnChanges, OnInit } from "@angular/core"
import { StoryObj } from "@storybook/angular"
import { ConfigurationSubscriberBase } from "../src/directives/configuration-subscriber.base"
import { DisplayMode } from "../src/services/configuration.service"

@Component( {
    selector: 'display-mode-wrapper',
    styleUrl: './display-mode-wrapper.component.scss',
    templateUrl: './display-mode-wrapper.component.html',
    host: {
        '[style.width]': 'getWidth()',
    },
    standalone: false
} )
export class DisplayModeWrapperComponent extends ConfigurationSubscriberBase implements OnInit, OnChanges {
    @Input() displayMode: DisplayMode | 'auto' = 'auto'
    @Input() width
    @Input() useWidth = false
    @Input() bodyPadding = 16
    
    ngOnInit() {
        this.updateBodyPadding()
        this.onResize()
        super.ngOnInit()
    }

    ngOnChanges( changes ) {
        if ( changes.displayMode ) {
            if ( this.displayMode == 'auto' ) {
                this.onResize()
            }
            else {
                this.configurationService.update( { displayMode: this.displayMode } )
            }
        }

        if ( changes.bodyPadding ) {
            this.updateBodyPadding()
        }
    }

    getWidth() {
        if ( !this.useWidth ) {
            if ( this.displayMode == 'auto' ) return '100%'
            if ( this.displayMode == 'desktop' ) return '100%'
            if ( this.displayMode == 'mobile' ) return '400px'
        }
        return this.width + 'px'
    }

    @HostListener("window:resize", ["$event"])
    onResize() {
        if ( this.displayMode != 'auto' ) return

        if ( window.innerWidth < 768 || ( window.innerWidth < 900 && window.innerHeight < 450 ) ) {
            this.configurationService.update( { displayMode: 'mobile' } )
        } 
        else {
            this.configurationService.update( { displayMode: 'desktop' } )
        }
    }

    onConfigurationChange() {
        console.log( 'onConfigurationChange', this.configuration )
    }

    updateBodyPadding() {
        document.documentElement.style.setProperty( '--display-mode-wrapper-body-padding', this.bodyPadding + 'px' )
    }
}

export const displayModeWrapperStory: StoryObj<DisplayModeWrapperComponent> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['auto', 'desktop', 'mobile'],
            description: 'Display mode for the component'
        },
        useWidth: { name: 'set width manually' },
        width: {
            if: { arg: 'useWidth', truthy: true },
            control: {
                type: 'range',
                min: 350,
                max: 2000
            }
        },
    },
    args: {
        displayMode: 'auto',
        useWidth: false,
        width: 400,
    },
}

export const displayModeWrapperStoryArgs: Array<keyof DisplayModeWrapperComponent> = [ 'displayMode', 'useWidth', 'width' ]

