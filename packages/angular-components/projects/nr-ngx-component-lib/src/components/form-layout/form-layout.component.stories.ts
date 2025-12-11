import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { FormLayoutComponent } from './form-layout.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

const meta: Meta<FormLayoutComponent> = {
    title: 'Form Layout',
    component: FormLayoutComponent,
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
                FormFieldComponent
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
The \`FormLayoutComponent\` is a structural container designed to align form controls. 
It handles spacing and column distribution across different screen sizes.

## Usage
- Use inside a form container.
- Place \`nrcl-form-field\` components as direct children.
- Control field width using the \`layoutwidth\` attribute on the children                
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<FormLayoutComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'desktop',
    },
    render: ( args ) => {
        return {
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            props: args,
            template: `
                <nrcl-form-layout>
                    <nrcl-form-field>
                        <mat-form-field floatLabel="always">
                            <mat-label>Observed Fire Behaviour</mat-label>

                            <textarea class="value" 
                                matNativeControl 
                                cdkTextareaAutosize                 
                            ></textarea>
                        </mat-form-field>
                    </nrcl-form-field>

                    <nrcl-form-field layoutwidth="2">
                        <mat-form-field floatLabel="always">
                            <mat-label>Observed Fire Behaviour</mat-label>

                            <textarea class="value" 
                                matNativeControl 
                                cdkTextareaAutosize                 
                            ></textarea>
                        </mat-form-field>
                    </nrcl-form-field>

                    <nrcl-form-field>
                        <mat-form-field floatLabel="always">
                            <mat-label>Observed Fire Behaviour</mat-label>

                            <textarea class="value" 
                                matNativeControl 
                                cdkTextareaAutosize                 
                            ></textarea>
                        </mat-form-field>
                    </nrcl-form-field>

                    <nrcl-form-field>
                        <mat-form-field floatLabel="always">
                            <mat-label>Observed Fire Behaviour</mat-label>

                            <textarea class="value" 
                                matNativeControl 
                                cdkTextareaAutosize                 
                            ></textarea>
                        </mat-form-field>
                    </nrcl-form-field>

                    <nrcl-form-field layoutwidth="full">
                        <mat-form-field floatLabel="always">
                            <mat-label>Observed Fire Behaviour</mat-label>

                            <textarea class="value" 
                                matNativeControl 
                                cdkTextareaAutosize                 
                            ></textarea>
                        </mat-form-field>
                    </nrcl-form-field>
                </nrcl-form-layout>
            `
        }
    }
}
