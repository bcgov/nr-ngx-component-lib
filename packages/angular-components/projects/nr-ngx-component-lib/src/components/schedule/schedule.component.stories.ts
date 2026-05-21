import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ScheduleComponent, ScheduleItemComponent, ScheduleRowHeadingComponent } from './schedule.component';

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
                ScheduleRowHeadingComponent,
                ScheduleItemComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{width, tooltip}">
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
    },
    args: {
    },
    render: ( args ) => {
        return {
            props: { ...args, 
                schedule: [
                    {
                        heading: { foo: 1 },
                        items: [
                            'available-regular-day',
                            'available-regular-day',
                            'available-regular-day',
                            'available-regular-day',
                            'available-day-off',
                        ]
                    },
                    {
                        heading: { foo: 2 },
                        items: [
                            'available-regular-day',
                            { name: 'available-day-off', data: { foo: 3 } },
                            'available-day-off',
                            'available-day-off',
                            'available-day-off',
                            'available-day-off',
                        ]
                    }
                ]
            },
            template: `
                <nrcl-schedule
                    startDate="may 21"
                    dayCount="8"
                    [schedule]="schedule"
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
