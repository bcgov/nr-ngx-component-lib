import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { FormFieldComponent } from './form-field.component';

const meta: Meta<FormFieldComponent> = {
    title: 'Form Field',
    component: FormFieldComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatTooltipModule,
                ReactiveFormsModule,
                TextFieldModule,
                MatSelectModule                
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent,
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
                            [displayMode]="displayMode"
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
A wrapper component for Angular Material form fields that provides consistent styling, behavior, and visual indicators for required and readonly states across your application.

## Features
- **Required indicator**: Visual asterisk (*) for required fields
- **Readonly styling**: Distinct appearance for readonly fields with locked icon
- **Material Design integration**: Seamlessly wraps Material form fields
- **Consistent styling**: Unified look and feel across all form inputs
- **Display mode awareness**: Adapts to desktop/mobile configurations
- **Multiple input types**: Works with text inputs, textareas, selects, and other Material form controls
- **Accessibility**: Proper ARIA attributes for required and readonly states

## Supported Input Types
- Text inputs (\`<input matInput>\`)
- Textareas (\`<textarea matNativeControl>\`)
- Select dropdowns (\`<select matNativeControl>\`)
- Any other Material form field control

## Basic Usage

\`\`\`html
<nrcl-form-field [required]="true">
  <mat-form-field floatLabel="always">
    <mat-label>Name</mat-label>
    <input matInput type="text" [(ngModel)]="name">
  </mat-form-field>
</nrcl-form-field>
\`\`\`

## Usage with Different Input Types

### Text Input
\`\`\`html
<nrcl-form-field [required]="true">
  <mat-form-field floatLabel="always">
    <mat-label>Email Address</mat-label>
    <input matInput type="email" [(ngModel)]="email">
  </mat-form-field>
</nrcl-form-field>
\`\`\`

### Textarea with Auto-resize
\`\`\`html
<nrcl-form-field [required]="false">
  <mat-form-field floatLabel="always">
    <mat-label>Description</mat-label>
    <textarea 
      matNativeControl 
      cdkTextareaAutosize
      [(ngModel)]="description"
    ></textarea>
  </mat-form-field>
</nrcl-form-field>
\`\`\`

### Select Dropdown
\`\`\`html
<nrcl-form-field [required]="true">
  <mat-form-field floatLabel="always">
    <mat-label>Status</mat-label>
    <select matNativeControl [(ngModel)]="status">
      <option value="">Select...</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </mat-form-field>
</nrcl-form-field>
\`\`\`

### Readonly Field
\`\`\`html
<nrcl-form-field [readonly]="true">
  <mat-form-field floatLabel="always">
    <mat-label>Created Date</mat-label>
    <input matInput type="text" [value]="createdDate" readonly>
  </mat-form-field>
</nrcl-form-field>
\`\`\`

## Visual Indicators

### Required Fields
When \`[required]="true"\`:
- Red asterisk (*) appears next to the label
- Clearly indicates field must be filled

### Readonly Fields
When \`[readonly]="true"\`:
- Lock icon appears next to the label
- Field styling changes to indicate non-editable state
- User cannot modify the value

## Styling

The component provides:
- Consistent padding and spacing
- Proper alignment of labels and indicators
- Responsive behavior based on display mode
- Material Design theming integration

## Best Practices

1. **Always use floatLabel="always"**: Ensures labels are always visible, improving usability
2. **Mark required fields**: Set \`[required]="true"\` for fields that must be completed
3. **Use readonly for display-only data**: Better than disabled for showing non-editable information
4. **Combine with form validation**: Use Angular's validators with reactive forms
5. **Group related fields**: Organize forms logically with clear sections
6. **Provide helpful labels**: Make field purpose clear without interaction
7. **Test in both modes**: Verify appearance in desktop and mobile display modes
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<FormFieldComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'desktop',
        readonly: false,
        required: false,
    },
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                    
                }
            `],
            template: `
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <nrcl-form-field [required]="required" [readonly]="readonly">
                        <mat-form-field floatLabel="always">
                            <mat-label>Textarea</mat-label>

                            <textarea 
                                matNativeControl 
                                cdkTextareaAutosize                 
                            ></textarea>
                        </mat-form-field>
                    </nrcl-form-field>

                    <nrcl-form-field [required]="required" [readonly]="readonly">
                        <mat-form-field floatLabel="always">
                            <mat-label>Input</mat-label>

                            <input matInput type="text">
                        </mat-form-field>
                    </nrcl-form-field>

                    <nrcl-form-field [required]="required" [readonly]="readonly">
                        <mat-form-field floatLabel="always">
                            <mat-label>Select</mat-label>

                            <select matNativeControl>
                                <option value="N">No</option>
                                <option value="Y">Yes</option>
                            </select>
                        </mat-form-field>
                    </nrcl-form-field>
                </div>
            `
        }
    }
}
