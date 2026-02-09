import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from './device-view.component';

@Component( {
    selector: 'sentinal',
    template: `
        <div>Sentinal {{ name }}</div>
        <ng-content></ng-content>
    `, 
} )
class SentinalComponent implements OnInit, OnDestroy {
    @Input() name
    
    ngOnInit(): void {
        console.log('init sentinal', this.name)
    }

    ngOnDestroy(): void {
        console.log('destroy sentinal', this.name)
    }
}

const meta: Meta<DeviceViewComponent> = {
    title: 'Device View',
    component: DeviceViewComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
            ],
            // declare components that are used in the template
            declarations: [
                SentinalComponent,
                DesktopViewDirective,
                MobileViewDirective
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="displayMode">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                    `
            }
        ),        
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<DeviceViewComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <div>Before device-view</div>
                <nrcl-device-view>
                    <ng-template desktop-view>
                        <sentinal name="desktop">
                            <div>Inside desktopView</div>
                        </sentinal>
                    </ng-template>

                    <ng-template mobile-view>
                        <sentinal name="mobile">
                            <div>Inside mobileView</div>
                        </sentinal>
                    </ng-template>
                </nrcl-device-view>
                <div>After device-view</div>
            `
        }
    }
}
