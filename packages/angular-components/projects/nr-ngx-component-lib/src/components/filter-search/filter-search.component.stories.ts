import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FilterSearchComponent } from './filter-search.component';

const meta: Meta<FilterSearchComponent> = {
    title: 'Inputs and Controls/Filters/Filter Search',
    component: FilterSearchComponent,
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
                            style="--registration-content-overflow: visible"
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

export const Primary: StoryObj<FilterSearchComponent> = {
    argTypes: {
        label: { type: 'string' },
        value: { type: 'string' },
        hint: { type: 'string' },
        placeholder: { type: 'string' },
        valueChange: { action: 'valueChange' },
        wide: {
            control: { type: 'inline-radio' },
            options: [ 'none', '1', '2', '3', '4', '5', '6' ],
            mapping: { 'none': undefined }
        }
    },
    args: {
        wide: null,
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-search ${ argsToTemplate(args) } 
                ></nrcl-filter-search> 
            `
        }
    }
}

export const CustomSize: StoryObj<FilterSearchComponent & { width: number }> = {
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
        label: { type: 'string' },
        value: { type: 'string' },
        hint: { type: 'string' },
        placeholder: { type: 'string' },
        valueChange: { action: 'valueChange' },
    },
    args: {
        width: 308,
        wide: null,
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-search ${ argsToTemplate(args, {exclude:['width']} ) } 
                    [style.--nrcl-filter-search-width.px]="width"
                ></nrcl-filter-search> 
            `
        }
    }
}
