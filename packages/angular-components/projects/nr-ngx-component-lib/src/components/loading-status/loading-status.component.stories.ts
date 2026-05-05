import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';
import { LoadingStatusComponent } from './loading-status.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const meta: Meta<LoadingStatusComponent> = {
    title: 'Loading Status',
    component: LoadingStatusComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatIconModule,
                MatButtonModule,
                MatProgressSpinnerModule
            ],
            // declare components that are used in the template
            declarations: [
                ButtonComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
    ],
    tags: ['autodocs'],
}

export default meta;

export const Primary: StoryObj<LoadingStatusComponent> = {
    argTypes: {
    },
    args: {
        loading: false
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-loading-status [loading]="loading">
                    <nrcl-button primary
                        label="Add Resource"                    
                    ></nrcl-button>
                </nrcl-loading-status>
            `
        }
    }
}
