import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FilterDateComponent } from './filter-date.component';

const meta: Meta<FilterDateComponent> = {
    title: 'Filter Date',
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
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
A date picker component built on OWL DateTime Picker for consistent date selection in filter interfaces.

## Features
- **Date/Time selection**: Pick dates and optionally times using an intuitive calendar interface
- **Customizable width**: Adjust component width to fit your layout
- **Hint text**: Optional helper text to guide users
- **Value binding**: Two-way data binding for easy form integration
- **Formatted display**: Consistent date formatting across the application

## Usage

\`\`\`html
<nrcl-filter-date
  label="Start Date"
  [(value)]="selectedDate"
  hint="Select a date"
  (valueChange)="onDateChange($event)"
></nrcl-filter-date>
\`\`\`

## Dependencies

Requires OWL DateTime Picker modules:
- \`OwlDateTimeModule\`
- \`OwlMomentDateTimeModule\`
- \`OWL_DATE_TIME_FORMATS\` provider with custom date formats

## Date Format

Date formatting is controlled by the \`DATE_FORMATS\` configuration provided to \`OWL_DATE_TIME_FORMATS\`.
                `
            }
        }
    }
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
        hint: '',
        wide: null
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
