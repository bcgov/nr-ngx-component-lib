import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { ExpansionPanelComponent } from './expansion-panel.component';
import { ExpansionPanelFooterComponent } from './footer/expansion-panel-footer.component';

const meta: Meta<ExpansionPanelComponent> = {
    title: 'Navigation and Structure/Expansion Panel',
    component: ExpansionPanelComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
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
                            style="--registration-content-overflow: visible"
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                `
            }
        ),
    ],
    parameters: {
        docs: {
            source: {
                excludeDecorators: true
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<ExpansionPanelComponent & DisplayModeWrapperComponent & { subtitle: boolean, customFooter: boolean } & ExpansionPanelFooterComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        // cancelClick: { action: 'cancelClick' },
        cancelEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'false', 'true' ],
            mapping: {
                'null': undefined,
                'true': true,
                'false': false,
            }
        },
        // saveClick: { action: 'saveClick' },
        saveEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'false', 'true' ],
            mapping: {
                'null': undefined,
                'true': true,
                'false': false,
            }
        },
        expandedChange: { action: 'expandedChange' },
    },
    args: {
        ...displayModeWrapperStory.args,
        isLoading: false,
        disabled: false,
        expanded: false,
        subtitle: false,
        showWarning: false,
        customFooter: false
    },
    render: ( args ) => {
        const argsExpansionPanelComponent: (keyof ExpansionPanelComponent)[] = ['disabled','isLoading','expanded','expandedChange']
        const argsExpansionPanelFooterComponent: (keyof ExpansionPanelFooterComponent)[] = ['cancelClick','cancelEnabled','saveClick','saveEnabled','showWarning','warningMessage']

        return {
            props: {
                ...args,
                addClick: ( ev ) => { ev.stopPropagation(); console.log('addClick') }
            },
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            template: `
                <nrcl-expansion-panel ${ argsToTemplate( args, { include: argsExpansionPanelComponent } ) }>
                    <nrcl-expansion-panel-header>
                        <h2 panel>Assignments</h2>
                        @if ( subtitle ) { <h3 panel>Subtitle for Assignments</h3> }

                        <nrcl-button primary
                            (click)="addClick( $event )"
                        >Add Assignment</nrcl-button>
                    </nrcl-expansion-panel-header>

                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

                    <nrcl-expansion-panel-footer ${ argsToTemplate( args, { include: argsExpansionPanelFooterComponent } ) }>
                        @if ( customFooter ) {
                            <nrcl-button
                                label="Forget it"
                            ></nrcl-button>

                            <nrcl-button primary
                                label="Do it!"
                            ></nrcl-button>
                        }
                    </nrcl-expansion-panel-footer>
                </nrcl-expansion-panel>
            `
        }
    }
}

export const Sections: StoryObj<ExpansionPanelComponent & DisplayModeWrapperComponent & { subtitle: boolean, customFooter: boolean } & ExpansionPanelFooterComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        // cancelClick: { action: 'cancelClick' },
        cancelEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'false', 'true' ],
            mapping: {
                'null': undefined,
                'true': true,
                'false': false,
            }
        },
        // saveClick: { action: 'saveClick' },
        saveEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'false', 'true' ],
            mapping: {
                'null': undefined,
                'true': true,
                'false': false,
            }
        },
        expandedChange: { action: 'expandedChange' },
    },
    args: {
        ...displayModeWrapperStory.args,
        isLoading: false,
        disabled: false,
        expanded: false,
        subtitle: false,
        showWarning: false,
        customFooter: false
    },
    render: ( args ) => {
        const argsExpansionPanelComponent: (keyof ExpansionPanelComponent)[] = ['disabled','isLoading','expanded','expandedChange']
        const argsExpansionPanelFooterComponent: (keyof ExpansionPanelFooterComponent)[] = ['cancelClick','cancelEnabled','saveClick','saveEnabled','showWarning','warningMessage']

        return {
            props: {
                ...args,
                addClick: ( ev ) => { ev.stopPropagation(); console.log('addClick') }
            },
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            template: `
                <nrcl-expansion-panel ${ argsToTemplate( args, { include: argsExpansionPanelComponent } ) }>
                    <nrcl-expansion-panel-header>
                        <h2 panel>Assignments</h2>

                        <nrcl-button primary
                            (click)="addClick( $event )"
                        >Add Assignment</nrcl-button>
                    </nrcl-expansion-panel-header>

                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

                    <nrcl-expansion-panel-section>
                        <h3>Assignments</h3>

                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </nrcl-expansion-panel-section>

                    <nrcl-expansion-panel-section>
                        <h3>
                            Locations

                            <nrcl-button class="add"
                                label="Add Location"
                            ></nrcl-button>
                        </h3>

                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </nrcl-expansion-panel-section>

                    <nrcl-gap vertical/>

                    <nrcl-expansion-panel-footer [saveEnabled]="true" [cancelEnabled]="true">
                    </nrcl-expansion-panel-footer>
                </nrcl-expansion-panel>
            `
        }
    }
}
