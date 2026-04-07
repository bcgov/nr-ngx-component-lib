import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { FilterDateComponent } from './filter-date.component';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatTooltipModule } from '@angular/material/tooltip';

const meta: Meta<FilterDateComponent> = {
    title: 'Filter Date',
    component: FilterDateComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatButtonModule,
                MatDatepickerModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                ReactiveFormsModule,                
                MatTooltipModule
            ],
            // declare components that are used in the template
            declarations: [
                IconComponent,
                ButtonComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                // provideNativeDateAdapter( {
                //     parse: {
                //         dateInput: 
                //     }
                // } )
                provideMomentDateAdapter( {
                    parse: { 
                        dateInput: 'YYYY-MM-DD' 
                    },
                    display: {
                        dateInput: 'YYYY-MM-DD', // Change how date appears in the input
                        monthYearLabel: 'MMM YYYY',
                        dateA11yLabel: 'LL',
                        monthYearA11yLabel: 'MMMM YYYY',
                    }
                } )
            ],
        } ),
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

export const Primary: StoryObj<FilterDateComponent & { width: number }> = {
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
        valueChange: { action: 'valueChange' },
        wide: {
            control: { type: 'inline-radio' },
            options: [ 'none', '1', '2', '3', '4', '5', '6' ],
            mapping: { 'none': undefined }
        }
    },
    args: {
        width: 158,
        label: 'Start Date',
        value: '',
        hint: '',
        wide: null,
        placeholder: ''
    },
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                :host {
                    display: flex;
                    gap: 20px;
                }
            `],
            template: `
                <nrcl-filter-date ${ argsToTemplate(args,{exclude:['width']}) } 
                    [style.--nrcl-filter-date-width.px]="width"
                ></nrcl-filter-date>

                <nrcl-filter-date ${ argsToTemplate(args,{exclude:['width']}) } 
                ></nrcl-filter-date>
            `
        }
    }
}
