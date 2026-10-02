import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fruitOptions } from 'projects/nr-ngx-component-lib/story-util';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { ListSelectComponent } from './list-select.component';

const meta: Meta<ListSelectComponent<any>> = {
    title: 'List Select',
    component: ListSelectComponent,
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
    tags: [ 'autodocs' ],
    parameters: {
        docs: {
            description: {
                component: `
                `
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<ListSelectComponent<any> & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        descriptionLabel: 'Fruit',
        single: false
    },
    parameters: {
        docs: {
            description: {
                story: `
                `
            }
        }
    },
    render: ( args ) => {
        args.options = fruitOptions()
        args.value=['apple','grape']
        return {
            props: args,
            template: `
                <nrcl-list-select
                    [options]="options"
                    [descriptionLabel]="descriptionLabel"
                    [single]="single"
                    [value]="value"
                ></nrcl-list-select>
            `
        }
    }
}

