import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { ButtonComponent } from '../button/button.component';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from '../device-view/device-view.component';
import { IndicatorComponent } from '../indicator/indicator.component';
import { PageContainerComponent } from '../page-container/page-container.component';
import { PageHeaderComponent } from './page-header.component';

const meta: Meta<PageHeaderComponent> = {
    title: 'Navigation and Structure/Page Header',
    component: PageHeaderComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                ButtonComponent,
                PageContainerComponent,
                IndicatorComponent,
                DesktopViewDirective,
                MobileViewDirective,
                DeviceViewComponent
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
}

export default meta;

export const Primary: StoryObj<PageHeaderComponent & DisplayModeWrapperComponent & { 
    isLoading: boolean, 
    indicator: boolean, 
    header1: string, 
    header2: string 
    leftSide: string 
    rightSide: string,
    actions: boolean,
    addClick: ( ev: Event ) => void,
}> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        addClick: { action: 'addClick' },
    },
    args: {
        ...displayModeWrapperStory.args,
        header1: 'Prep Sheets',
        header2: 'Header 2',
        isLoading: false,
        indicator: true,
        leftSide: 'Left side content',
        rightSide: 'Right side content',
        actions: true,
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-page-container>
                    <nrcl-page-header [isLoading]="isLoading">
                        <h1>
                            {{ header1 }} 
                        </h1>
                        @if ( header2 ) { <h2>{{ header2 }}</h2> }

                        @if ( indicator ) {
                            <nrcl-indicator large>Active</nrcl-indicator>
                        }       

                        <div left-side>{{ leftSide }}</div>

                        @if ( actions ) {
                            <nrcl-button primary action>
                                Create Prep Sheet
                            </nrcl-button>                        
                        }

                        @if ( actions ) {
                            <nrcl-button primary action
                                (click)="addClick( $event )"
                            >Do Something</nrcl-button>
                        }

                        @if ( actions ) {
                            <nrcl-button primary action
                                (click)="addClick( $event )"
                            >Do Other thing</nrcl-button>
                        }

                        <div right-side>{{ rightSide }}</div>
                    </nrcl-page-header>

                </nrcl-page-container>
            `
        }
    }
}
