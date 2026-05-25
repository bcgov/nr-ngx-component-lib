import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ScheduleComponent, ScheduleItemDirective, ScheduleRowHeadingDirective } from './schedule.component';
import { DATE_FORMATS } from '../../utils/date.util';
import moment from 'moment';

const meta: Meta<ScheduleComponent & { width: number }> = {
    title: 'Schedule',
    component: ScheduleComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
            ],
            // declare components that are used in the template
            declarations: [
                ScheduleRowHeadingDirective,
                ScheduleItemDirective
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{width, startDate}">
                        <registration-wrapper style="--registration-display: inline-block;">
                            ${ story }
                        </registration-wrapper>
                    </ng-container>
                `
            }
        ),        
    ],
    tags: ['autodocs'],
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
    },
    args: {
        width: 158,
    },
}

export default meta;

export const Primary: StoryObj<ScheduleComponent & { width: number }> = {
    argTypes: {
        startDate: {
            type: 'date'
        },
        dayCount: {
            control: {
                type: 'range',
                min: 2,
                max: 20
            }
        },
        weekStart: {
            control: {
                type: 'range',
                min: 0,
                max: 6
            }
        },
    },
    args: {
        startDate: moment().format( DATE_FORMATS.datePickerInput ),
        dayCount: 8,
        weekStart: 0,
    },
    render: ( args ) => {
        return {
            props: { ...args, 
                schedule: [
                    {
                        heading: { foo: 1 },
                        items: delayed([
                            { name: 'available-regular-day' },
                            { name: 'available-regular-day' },
                            { name: 'available-regular-day' },
                            { name: 'available-regular-day' },
                            { name: 'available-day-off' },
                        ])
                    },
                    {
                        heading: { foo: 2 },
                        items: delayed([
                            { name: 'available-regular-day' },
                            { name: 'available-day-off', data: { foo: 3 } },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                        ])
                    },
                    {
                        heading: { foo: 2 },
                        items: delayed([
                            { name: 'available-regular-day' },
                            { name: 'available-day-off', data: { foo: 3 } },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                        ])
                    },
                    {
                        heading: { foo: 2 },
                        items: delayed([
                            { name: 'available-regular-day' },
                            { name: 'available-day-off', data: { foo: 3 } },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                            { name: 'available-day-off' },
                        ])
                    }
                ]
            },
            template: `
                <nrcl-schedule
                    [startDate]="startDate"
                    [dayCount]="dayCount"
                    [schedule]="schedule"
                    [weekStart]="weekStart"
                >
                    <ng-template nrclScheduleRowHeading let-item>
                        <div>foo {{ item.foo }}</div>
                    </ng-template>

                    <ng-template nrclScheduleItem="available-regular-day" let-data>
                        <div>available-regular-day</div>
                    </ng-template>

                    <ng-template nrclScheduleItem="available-day-off" let-data>
                        <div>available-day-off</div>
                        <div>{{ data | json }}</div>
                    </ng-template>
                </nrcl-schedule> 
            `
        }
    }
}

function delayed( val ) {
    return new Promise( ( res, rej ) => {
        setTimeout(() => {
            res( val )
        }, Math.random() * 2000 )
    } )
}