import { Component, OnInit, OnChanges, Input, inject, ChangeDetectorRef } from "@angular/core"
import { ConfigurationService, DisplayMode } from "../src/services/configuration.service"
import { StoryObj } from "@storybook/angular"

@Component( {
    selector: 'display-mode-wrapper',
    styles: `
        ::ng-deep html { 
            height: 100%; 
            --wf1-gutter-space: 16px;

            body { 
                height: 100%;
            }

            #storybook-root { 
                height: 100%;

                storybook-root { 
                    height: 100%; 
                    display: block; 
                }
            }
        }
            
        :host {
            display: block;
    
            height: 100%;
        }
    `,
    template: `
        <div class="component-container-block">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        '[style.width]': 'getWidth()',
        '[class.nrcl-device-desktop]': "displayMode == 'desktop'",
        '[class.nrcl-device-mobile]': "displayMode == 'mobile'"     
    }
} )
export class DisplayModeWrapperComponent implements OnInit, OnChanges {
    @Input() displayMode: DisplayMode = 'desktop'
    @Input() width
    @Input() useWidth = false

    configurationService = inject( ConfigurationService )
    
    ngOnInit() {
        this.configurationService.update( { displayMode: this.displayMode } )
    }

    ngOnChanges( changes ) {
        if ( changes.displayMode ) {
            this.configurationService.update( { displayMode: this.displayMode } )
        }
    }

    getWidth() {
        if ( !this.useWidth ) {
            if ( this.displayMode == 'desktop' ) return '100%'
            if ( this.displayMode == 'mobile' ) return '400px'
        }
        return this.width + 'px'
    }
}

export const displayModeWrapperStory: StoryObj<DisplayModeWrapperComponent> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
        useWidth: { name: 'set width manually' },
        width: {
            if: { arg: 'useWidth', truthy: true },
            control: {
                type: 'range',
                min: 350,
                max: 1000
            }
        }
    },
    args: {
        displayMode: 'desktop',
        useWidth: false,
        width: 400,
    },
}

export const displayModeWrapperStoryArgs: Array<keyof DisplayModeWrapperComponent> = [ 'displayMode', 'useWidth', 'width' ]

