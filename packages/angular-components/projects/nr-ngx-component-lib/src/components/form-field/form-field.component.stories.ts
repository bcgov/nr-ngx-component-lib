import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { FormFieldComponent } from './form-field.component';

const meta: Meta<FormFieldComponent> = {
    title: 'Inputs and Controls/Form Field',
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
