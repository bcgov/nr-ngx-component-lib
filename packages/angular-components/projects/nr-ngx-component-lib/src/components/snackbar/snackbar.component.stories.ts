import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SnackbarUtilService } from '../../services/snackbar-util.service';
import { SnackbarComponent, SnackbarType } from './snackbar.component';
import { DisplayMode } from '../../services/configuration.service';
import { ButtonComponent } from '../button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';

@Component( {
    selector: 'storybook-dummy-component',
    template: `
        <nrcl-button
            label="Show SnackBar"
            (click)="onOpenSnackBar()"
        ></nrcl-button>
    `, 
} )
class DummyComponent {
    @Input() message = 'Test Label'
    @Input() type: SnackbarType = 'success'

    constructor( 
        public snackbarUtilService: SnackbarUtilService
    ) { }
    
    onOpenSnackBar(): void {        
        switch ( this.type ) {
            case 'error':
                this.snackbarUtilService.error( this.message, null )
                break

            case 'info':
                this.snackbarUtilService.information( this.message, null )
                break

            case 'success':
                this.snackbarUtilService.successful( this.message, null )
                break

            case 'update':
                this.snackbarUtilService.updated( this.message, null )
                break
        }
    }
}

type DummyComponentEx = DummyComponent & { displayMode: DisplayMode }

const meta: Meta<DummyComponentEx> = {
    title: 'Snack Bar',
    parameters: {
        docs: {
            description: {
                component: `
A custom Angular Material snackbar component that displays toast notifications with different types and icons.

## Usage

The snackbar is triggered through the \`SnackbarUtilService\`, which provides convenience methods for different notification types:

\`\`\`typescript
constructor(private snackbarUtilService: SnackbarUtilService) {}

// Show success notification
this.snackbarUtilService.successful('Operation completed', null);

// Show error notification
this.snackbarUtilService.error('Something went wrong', null);

// Show info notification
this.snackbarUtilService.information('Here is some information', null);

// Show update notification
this.snackbarUtilService.updated('Data has been updated', null);
\`\`\`

## Types

The component supports four notification types, each with its own icon and styling:
- **success**: Green checkmark icon for successful operations
- **error**: Red error icon for failures
- **info**: Blue information icon for general messages
- **update**: Purple update icon for data changes

## Interactive Demo

Use the controls below to test different snackbar types and messages. Click the "Show SnackBar" button to display the notification.                             
                `
            }
        }
    },
    component: DummyComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatIconModule,
                MatSnackBarModule,
                MatButtonModule,
                MatTooltipModule,
                MatIconModule,
                MatRippleModule
            ],
            // declare components that are used in the template
            declarations: [
                SnackbarComponent,
                ButtonComponent,
                RerenderDirective,
                DisplayModeWrapperComponent
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
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
        type: {
            control: {
                type: 'inline-radio'
            },
            options: ['success','error','info','update']
        },
    },
    args: {
        displayMode: 'desktop',
        message: 'Test Message',
        type: "success"
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <storybook-dummy-component ${ argsToTemplate(args,{exclude:['displayMode']}) }></storybook-dummy-component>
            `,
        }
    }
}

export default meta;
type Story = StoryObj<DummyComponentEx>;

export const Success: Story = {
    args: {
        type: "success"
    }
}

export const Error: Story = {
    args: {
        type: "error"
    }
}

export const Info: Story = {
    args: {
        type: "info"
    }
}

export const Update: Story = {
    args: {
        type: "update"
    }
}
