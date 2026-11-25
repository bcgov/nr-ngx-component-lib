import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FilterDateComponent } from './filter-date.component';

const meta: Meta<FilterDateComponent> = {
    title: 'Inputs and Controls/Filters/Filter Date',
    component: FilterDateComponent,
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

export const Primary: StoryObj<FilterDateComponent> = {
    argTypes: {
        valueChange: { action: 'valueChange' },
        wide: {
            control: { type: 'inline-radio' },
            options: [ 'none', '1', '2', '3', '4', '5', '6' ],
            mapping: { 'none': undefined }
        }
    },
    args: {
        label: 'Start Date',
        value: '',
        displayFormat: 'MMMM D, YYYY',
        hint: '',
        wide: null,
        clear: true,
        min: '',
        max: '',
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-date ${ argsToTemplate(args) } 
                ></nrcl-filter-date>
            `
        }
    }
}

export const CustomWidth: StoryObj<FilterDateComponent & { width: number }> = {
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
        valueChange: { action: 'valueChange' },
    },
    args: {
        width: 158,
        label: 'Start Date',
        value: '',
        hint: '',
        clear: true
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-date ${ argsToTemplate(args,{exclude:['width']}) } 
                    [style.--nrcl-filter-date-width.px]="width"
                ></nrcl-filter-date>
            `
        }
    }
}
