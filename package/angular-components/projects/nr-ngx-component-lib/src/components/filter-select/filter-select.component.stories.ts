import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FilterSelectComponent } from './filter-select.component';
import { fruitOptions } from 'projects/nr-ngx-component-lib/story-util';

const meta: Meta<FilterSelectComponent & { width: number }> = {
    title: 'Filter Select',
    component: FilterSelectComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatListModule,
                MatTooltipModule,
                ReactiveFormsModule,
            ],
            // declare components that are used in the template
            declarations: [
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
    ],
    tags: ['autodocs'],
    excludeStories: [ 'fruitOptions' ],
    parameters: {
        docs: {
            description: {
                component: `
A powerful multi-select component with filtering capabilities.

## Features
- **Multi-select**: Choose multiple options from a list
- **Search**: Filter options by typing
- **Selection limits**: Optionally restrict maximum selections
- **Tooltips**: Show full descriptions on hover
- **Summary view**: Display selected items in a compact format

## Usage Example

\`\`\`typescript
<nrcl-filter-select
  label="Fruit"
  [value]="selectedFruits"
  [options]="fruitOptions"
  [selectMax]="5"
  (valueChange)="onFruitChange($event)"
></nrcl-filter-select>
\`\`\`
                `
            }
        }
    },
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
        selectMax: {
            control: {
                type: 'range',
                min: 0,
                max: 20
            }
        },
        valueChange: { action: 'valueChange' },
        options: {

        }
    },
    args: {
        width: 150,
        label: 'Fruit',
        value: [ ],
        selectMax: 0,
        hint: '',
        tooltips: true,
        summary: true,
        clear: false,
    },
}

export default meta;

export const Primary: StoryObj<FilterSelectComponent & { width: number }> = {
    parameters: {
        docs: {
            description: {
                story: 'The default configuration with all features enabled. Try selecting multiple fruits!'
            }
        }
    },
    render: ( args ) => {
        return {
            props: {
                ...args,
                options: fruitOptions()
            },
            template: `
                <nrcl-filter-select ${ argsToTemplate(args,{exclude:['width']}) }
                    [options]="options"
                    [style.--nrcl-filter-select-width.px]="width"
                ></nrcl-filter-select>
            `
        }
    }
}

export const Multiple: StoryObj<FilterSelectComponent & { width: number }> = {
    render: ( args ) => {
        return {
            props: {
                ...args,
                options: fruitOptions()
            },
            template: `
                <div style="display: flex; gap: 8px;">
                    <nrcl-filter-select label="Classification"
                        [options]="options"
                        [style.--nrcl-filter-select-width.px]="width"
                    ></nrcl-filter-select>

                    <nrcl-filter-select label="Category"
                        [options]="options"
                        [style.--nrcl-filter-select-width.px]="width"
                    ></nrcl-filter-select>
                </div>
            `
        }
    }
}

export const Single: StoryObj<FilterSelectComponent & { width: number }> = {
    args: {
        selectMax: 1,
    },
    render: ( args ) => {
        return {
            props: {
                ...args,
                options: fruitOptions()
            },
            template: `
                <nrcl-filter-select ${ argsToTemplate(args,{exclude:['width']}) }
                    [options]="options"
                    [style.--nrcl-filter-select-width.px]="width"
                ></nrcl-filter-select>
            `
        }
    }
}

export const NoClear: StoryObj<FilterSelectComponent & { width: number }> = {
    args: {
        selectMax: 1,
        clear: false,
        value: ['apple']
    },
    render: ( args ) => {
        return {
            props: {
                ...args,
                options: fruitOptions()
            },
            template: `
                <nrcl-filter-select ${ argsToTemplate(args,{exclude:['width']}) }
                    [options]="options"
                    [style.--nrcl-filter-select-width.px]="width"
                ></nrcl-filter-select>
            `
        }
    }
}
