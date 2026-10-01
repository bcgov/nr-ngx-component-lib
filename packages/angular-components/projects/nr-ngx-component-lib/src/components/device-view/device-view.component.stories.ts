import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from './device-view.component';

@Component( {
    selector: 'sentinel',
    template: `
        <div>Sentinel {{ name }}</div>
        <ng-content></ng-content>
    `,
} )
class SentinelComponent implements OnInit, OnDestroy {
    @Input() name
    
    ngOnInit(): void {
        console.log('init sentinel', this.name)
    }

    ngOnDestroy(): void {
        console.log('destroy sentinel', this.name)
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
                SentinelComponent,
                DesktopViewDirective,
                MobileViewDirective
            ],
            // declare components that are used in the template
            declarations: [
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
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

export const Primary: StoryObj<DeviceViewComponent & DisplayModeWrapperComponent> = {
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
                        <sentinel name="desktop">
                            <div>Inside desktopView</div>
                        </sentinel>
                    </ng-template>

                    <ng-template mobile-view>
                        <sentinel name="mobile">
                            <div>Inside mobileView</div>
                        </sentinel>
                    </ng-template>
                </nrcl-device-view>
                <div>After device-view</div>
            `
        }
    }
}
