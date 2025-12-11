import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FilterSearchComponent } from './filter-search.component';

const meta: Meta<FilterSearchComponent> = {
    title: 'Filter Search',
    component: FilterSearchComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatButtonModule,
                // MatCheckboxModule,
                MatFormFieldModule,                
                MatIconModule,
                MatInputModule,
                // MatListModule,  
                // MatTooltipModule,
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
    parameters: {
        docs: {
            description: {
                component: `
A search input component built on Angular Material that provides filtering functionality with a clear button.

## Features

- **Search Icon**: Visual indicator that the field is for searching
- **Clear Button**: Quickly clear the search input with an 'X' button that appears when text is entered
- **Optional Label**: Customizable label text for the input field
- **Optional Hint**: Helper text displayed below the input
- **Value Binding**: Two-way data binding support via \`value\` input and \`valueChange\` output

## Usage

\`\`\`typescript
import { FilterSearchComponent } from '@nr-ngx-component-lib/filter-search';

@Component({
  template: \`
    <nrcl-filter-search 
      [label]="'Search items'"
      [value]="searchTerm"
      (valueChange)="onSearchChange($event)"
      [hint]="'Enter at least 3 characters'">
    </nrcl-filter-search>
  \`
})
export class MyComponent {
  searchTerm = '';
  
  onSearchChange(value: string) {
    console.log('Search term:', value);
    // Perform filtering logic
  }
}
\`\`\`

## Interactive Demo

Use the controls below to test the component. Adjust the width to see how it responds to different container sizes.                                
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<FilterSearchComponent & { width: number }> = {
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
        valueChange: { action: 'valueChange' }
    },
    args: {
        width: 308,
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-search ${ argsToTemplate(args) } 
                    [style.--nrcl-filter-search-width.px]="width"
                ></nrcl-filter-search> 
            `
        }
    }
}
