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
import { fruitOptions, fruitSubOptions } from 'projects/nr-ngx-component-lib/story-util';
import { IconComponent } from '../icon/icon.component';
import { useArgs } from 'storybook/internal/preview-api';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<FilterSelectComponent> = {
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
                IconComponent,
                ButtonComponent
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
        selectMax: {
            control: {
                type: 'range',
                min: 0,
                max: 20
            }
        },
        filterCharsMin: {
            control: {
                type: 'range',
                min: 0,
                max: 10
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
        wide: null,
        label: 'Fruit',
        value: [ ],
        selectMax: 0,
        hint: '',
        tooltips: true,
        summary: true,
        clear: true,
        filter: true,
        placeholder: 'Filter...',
        filterCharsMin: 0,
        filterCharsMinMessage: 'Too many results'
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
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
    },
    args: {
        width: 150
    },
    render: ( args ) => {
        return {
            styles: [`
                :host {
                    display: flex;
                    gap: 20px;
                }
            `],
            props: {
                ...args,
                options: fruitOptions()
            },
            template: `
                <nrcl-filter-select ${ argsToTemplate(args,{exclude:['width']}) }
                    [options]="options"
                    [style.--nrcl-filter-select-width.px]="width"
                ></nrcl-filter-select>

                <nrcl-filter-select ${ argsToTemplate(args,{exclude:['width']}) }
                    [options]="options"
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

export const Single: StoryObj<FilterSelectComponent> = {
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
                <nrcl-filter-select ${ argsToTemplate(args) }
                    [options]="options"
                ></nrcl-filter-select>
            `
        }
    }
}

export const NoClear: StoryObj<FilterSelectComponent> = {
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
                <nrcl-filter-select ${ argsToTemplate(args) }
                    [options]="options"
                ></nrcl-filter-select>
            `
        }
    }
}

export const Linked: StoryObj<FilterSelectComponent & { suboptions, subvalue }> = {
    args: {
        options: fruitOptions(),
        suboptions: fruitSubOptions(),
        value: [],
        subvalue: [],
    },
    render: ( args ) => {
        const [, setArgs] = useArgs();
        return {
            props: {
                ...args,
                onValueChange: ( ev ) => { 
                    let sub = fruitSubOptions().filter( ( v ) => {
                            return !ev[ 0 ] || v.parent == ev[ 0 ]
                        } )
                    // console.log( ev, sub ) 
                    setArgs( {
                        suboptions: sub,
                        value: ev,
                        subvalue: []
                    } )
                },
                onSubValueChange: ( ev ) => { 
                    // console.log( ev ) 
                    setArgs( {
                        subvalue: ev
                    } )
                },
            },
            template: `
                <div>value:{{value|json}}</div>
                <div>subvalue:{{subvalue|json}}</div>
                <div style="display: flex; gap: 8px;">
                    <nrcl-filter-select 
                        [value]="value"
                        (valueChange)="onValueChange( $event )"
                        [options]="options"
                        [selectMax]="1"
                    ></nrcl-filter-select>

                    <nrcl-filter-select 
                        [value]="subvalue"
                        (valueChange)="onSubValueChange( $event )"
                        [options]="suboptions"
                    ></nrcl-filter-select>
                </div>
            `
        }
    }
}

export const FormatOption: StoryObj<FilterSelectComponent> = {
    args: {
    },
    render: ( args ) => {
        return {
            props: {
                ...args,
                options: fruitOptions(),
                optionFormatter: ( o, p ) => {
                    if ( p ) {
                        return `${ o.description } - ${ o['extra'] }`
                    }
                    else {
                        return `<div>${ o.description } - ${ o['extra'] }</div>`
                    }
                }
            },
            template: `
                <nrcl-filter-select ${ argsToTemplate(args) }
                    [optionFormatter]="optionFormatter"
                    [options]="options"
                    overlayClass="foo"
                ></nrcl-filter-select>
            `
        }
    }
}

export const FilterCharsMin: StoryObj<FilterSelectComponent> = {
    args: {
        filterCharsMin: 1,
        placeholder: 'Type to start filtering',
        selectMax: 1
    },
    render: ( args ) => {
        return {
            props: {
                ...args,
                options: fruitOptions(),
            },
            template: `
                <nrcl-filter-select ${ argsToTemplate(args) }
                    [options]="options"
                ></nrcl-filter-select>
            `
        }
    }
}
