import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import moment from 'moment';
import { ConfigurationService } from '../../services/configuration.service';
import { DATE_FORMATS } from '../../utils/date.util';
import { DateNavigatorComponent } from './date-navigator.component';

const meta: Meta<DateNavigatorComponent> = {
    title: 'Date Navigator',
    component: DateNavigatorComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
            ],
            // declare components that are used in the template
            declarations: [
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
        valueChange: { action: 'valueChange' },
        smallChange: { control: { type: 'range', min: 0, max: 20 } },
        largeChange: { control: { type: 'range', min: 0, max: 20 } },
    },
    args: {
        value: moment().format( DATE_FORMATS.datePickerInput )
    },
}
