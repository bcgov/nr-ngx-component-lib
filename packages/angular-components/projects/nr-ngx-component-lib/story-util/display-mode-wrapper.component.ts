
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
        '[class.nrcl-device-desktop]': "displayMode == 'desktop'",
        '[class.nrcl-device-mobile]': "displayMode == 'mobile'"     
    }
} )
export class DisplayModeWrapperComponent extends ConfigurationSubscriberBase implements OnInit, OnChanges {
    @Input() displayMode: DisplayMode | 'auto' = 'auto'
    @Input() width
    @Input() useWidth = false
    
    ngOnInit() {
        // this.configurationService.update( { displayMode: this.displayMode } )
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
    }

    getWidth() {
        if ( !this.useWidth ) {
            return '100%'
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
        // auto: { name: 'automatically set display mode' },
    },
    args: {
        displayMode: 'auto',
        useWidth: false,
        width: 400,
        // auto: true,
    },
}

export const displayModeWrapperStoryArgs: Array<keyof DisplayModeWrapperComponent> = [ 'displayMode', 'useWidth', 'width' ]

