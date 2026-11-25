import { Component, Input } from '@angular/core';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayMode } from '../../services/configuration.service';
import { SnackbarUtilService } from '../../services/snackbar-util.service';
import { SnackbarType } from './snackbar.component';

@Component( {
    selector: 'storybook-dummy-component',
    template: `
        <nrcl-button
            label="Show SnackBar"
            (click)="onOpenSnackBar()"
        ></nrcl-button>
    ` 
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
    title: 'Notification and Feedback/Snack Bar',
    component: DummyComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
            ],
            // declare components that are used in the template
            declarations: [
                DummyComponent,
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
