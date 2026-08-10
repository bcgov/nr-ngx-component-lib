import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService } from '../../services/configuration.service';
import { DateNavigatorComponent } from './date-navigator.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<DateNavigatorComponent> = {
    title: 'Date Navigator',
    component: DateNavigatorComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatDatepickerModule,
                MatTooltipModule,
                MatIconModule,
                MatRippleModule,
                MatInputModule,
                MatFormFieldModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            // declare components that are used in the template
            declarations: [
                ButtonComponent,
                IconComponent,
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService,
                provideMomentDateAdapter( {
                    parse: {
                        dateInput: 'YYYY-MM-DD'
                    },
                    display: {
                        // dateInput: 'YYYY-MM-DD', // Change how date appears in the input
                        dateInput: 'MMMM D, YYYY', // Change how date appears in the input
                        monthYearLabel: 'MMM YYYY',
                        dateA11yLabel: 'LL',
                        monthYearA11yLabel: 'MMMM YYYY',
                    }
                } )

            ],
        } ),
    ],
    tags: ['autodocs'],
}

export default meta;

export const Primary: StoryObj<DateNavigatorComponent> = {
    argTypes: {
        change: { action: 'change' }
    },
    args: {
    },
    // render: ( args ) => {
    //     console.log(args)
    //     return {
    //         props: args,
    //         styles: [`
    //         `],
    //         template: `
    //             <nrcl-date-navigator 
    //                 (change)="change($event)"
    //             ></nrcl-date-navigator>
    //         `
    //     }
    // }
}

                    // ${ argsToTemplate( args ) } 
