import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory, displayModeWrapperStoryArgs } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RowListPaginationComponent } from './row-list-pagination.component';

type CollectionParametersDesktopComponentExtended = RowListPaginationComponent & { width?: number }

const meta: Meta<CollectionParametersDesktopComponentExtended> = {
    title: 'Content/Row List/Row List Pagination',
    component: RowListPaginationComponent,
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

export const Primary: StoryObj<RowListPaginationComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        pageSize: {
            control: {
                type: 'inline-radio'
            },
            options: [ 5, 10, 20, 50, 100 ]
        },
        pageNumber: {
            control: {
                type: 'range',
                min: 1,
                max: 200
            }
        },
        rowCount: {
            control: {
                type: 'range',
                min: 0,
                max: 2000
            }
        },
        pageSizeChange: { action: 'pageSizeChange' },
        pageNumberChange: { action: 'pageNumberChange' }
    },
    args: {
        ...displayModeWrapperStory.args,
        pageSize: 20,
        pageNumber: 1,
        rowCount: 100
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-row-list-pagination ${ argsToTemplate(args,{exclude:displayModeWrapperStoryArgs}) }></nrcl-row-list-pagination> 
            `
        }
    }
}
