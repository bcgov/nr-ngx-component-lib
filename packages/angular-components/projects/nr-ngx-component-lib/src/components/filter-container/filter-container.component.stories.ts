import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService } from '../../public-api';
import { FilterContainerComponent } from './filter-container.component';

const meta: Meta<FilterContainerComponent> = {
    title: 'Filter Container',
    component: FilterContainerComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatCheckboxModule,
                MatRadioModule,
                MatFormFieldModule,                
            ],
            // declare components that are used in the template
            declarations: [
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService
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
A flexible container component for grouping filter controls with a consistent visual style.

## Features
- **Flexible sizing**: Control width and height via CSS custom properties
- **Label support**: Display a label above the filter group
- **Hint text**: Optional helper text below the container
- **Content projection**: Works with any filter controls (checkboxes, radio buttons, custom components)

## Usage

\`\`\`html
<nrcl-filter-container 
  label="Filter Label"
  hint="Optional hint text"
  style="--nrcl-filter-container-width: 300px;"
>
  <!-- Your filter controls here -->
  <mat-checkbox>Option 1</mat-checkbox>
  <mat-checkbox>Option 2</mat-checkbox>
</nrcl-filter-container>
\`\`\`

## CSS Custom Properties

- \`--nrcl-filter-container-width\`: Width of the container (default: auto)
- \`--nrcl-filter-container-height\`: Height of the container (default: auto)                
                `
            }
        }
    },  
}

export default meta;

export const Primary: StoryObj<FilterContainerComponent> = {
    argTypes: {
        wide: {
            control: { type: 'inline-radio' },
            options: [ 'none', '1', '2', '3', '4', '5', '6' ],
            mapping: { 'none': undefined }
        }
    },
    args: {
        label: 'Container',
        hint: '',
        wide: null
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-container ${ argsToTemplate(args) }>
                    Hello
                </nrcl-filter-container> 
            `
        }
    }
}

export const CustomSize: StoryObj<FilterContainerComponent & { width: number, height: number }> = {
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 40,
                max: 300
            }
        },
        height: {
            control: {
                type: 'range',
                min: 0,
                max: 300
            }
        },
    },
    args: {
        width: 308,
        height: 0,
        label: 'Container',
        hint: '',
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-container ${ argsToTemplate(args,{exclude:['width','height']}) } 
                    [style.--nrcl-filter-container-width]="width + 'px'"
                    [style.--nrcl-filter-container-height]="height ? height + 'px' : 'unset'"
                >
                    <div style="border: 1px dashed blue; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">Hello</div>
                </nrcl-filter-container> 
            `
        }
    }
}

export const Checkboxes: StoryObj<FilterContainerComponent> = {
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-container style="--nrcl-filter-container-width: max-content;"
                    label="Resource Fire Centre"
                >
                    <mat-checkbox 
                        [(ngModel)]="selectedFireCentreHome"
                        (change)="onChangeFilters()"
                    >
                        Home
                    </mat-checkbox>

                    <mat-checkbox 
                        [(ngModel)]="selectedFireCentreOther"
                        (change)="onChangeFilters()"
                    >
                        Outside
                    </mat-checkbox>
                </nrcl-filter-container>
            `
        }
    }
}

export const RadioButtons: StoryObj<FilterContainerComponent> = {
    render: ( args ) => {
        return {
            props: args,
            template: `
                <div style="display: flex">
                    <nrcl-filter-container style="width: unset; flex-grow: 1;"
                        label="Resource Category"
                    >
                        <mat-radio-group 
                            aria-label="Resource Category" 
                        >
                            <mat-radio-button aria-label="Home Org Unit" value="home">Home Org Unit</mat-radio-button>
                            <mat-radio-button aria-label="Currently Assigned/Active Org" value="assignedActive">Currently Assigned/Active Org</mat-radio-button>
                        </mat-radio-group>
                    </nrcl-filter-container>
                </div>
            `
        }
    }
}
