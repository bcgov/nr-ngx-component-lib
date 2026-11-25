import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { GapComponent } from './gap.component';

const meta: Meta<GapComponent> = {
    title: 'Utility/Gap',
    component: GapComponent,
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
                ConfigurationService
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{displayMode, vertical, horizontal, divider}">
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
    argTypes: {
        vertical: {
            control: { type: 'inline-radio' },
            options: [ 'missing', '""', '1', '2', '3' ],
            mapping: { 'missing': undefined, '""': '' }
        },
        horizontal: {
            control: { type: 'inline-radio' },
            options: [ 'missing', '""', '1', '2', '3' ],
            mapping: { 'missing': undefined, '""': '' }
        },
        divider: {
            control: { type: 'inline-radio' },
            options: [ 'missing', 'before', 'middle', 'after', 'none' ],
            mapping: { 'missing': undefined }
        }
    }
}

export default meta;

export const Vertical: StoryObj<GapComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'desktop',
        vertical: '',        
    },
    render: ( args ) => {
        let tmpl = argsToTemplate(args,{exclude:['displayMode']})
        return {
            props: args,
            template: `
                <div>Before gap</div>
                <nrcl-gap ${ tmpl }/>
                <div>After gap</div>
            `
        }
    }
}

export const Horizontal: StoryObj<GapComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'desktop',
        horizontal: ''
    },
    render: ( args ) => {
        let tmpl = argsToTemplate(args,{exclude:['displayMode']})
        return {
            props: args,
            styles: [`
                div.container {
                    display: flex;
                    align-items: stretch;
                }
                span {
                    display: inline-flex;
                    height: 50px;
                    border: 1px solid gray;
                    align-items: center;
                }
            `],
            template: `
                <div class="container">
                    <span>Before gap</span>
                    <nrcl-gap ${ tmpl }/>
                    <span>After gap</span>
                </div>
            `
        }
    }
}
