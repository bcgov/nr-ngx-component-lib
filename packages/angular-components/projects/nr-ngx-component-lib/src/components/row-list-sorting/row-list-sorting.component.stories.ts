import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory, displayModeWrapperStoryArgs } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RowListSortingComponent } from './row-list-sorting.component';

const meta: Meta<RowListSortingComponent> = {
    title: 'Content/Row List/Row List Sorting',
    component: RowListSortingComponent,
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
                    <ng-container *rerender="{width, displayMode}">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
                            [useWidth]="useWidth"
                            [width]="width"                        
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

export const Primary: StoryObj<RowListSortingComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        sortColumnOptions: [
            { description: 'Make',                    code: 'make' },
            { description: 'Model',                   code: 'model' },
            { description: 'Aircraft Classification', code: 'classification' },
        ],
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-row-list-sorting ${ argsToTemplate(args,{exclude:displayModeWrapperStoryArgs}) }></nrcl-row-list-sorting> 
            `
        }
    }
}
