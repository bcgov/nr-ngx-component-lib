 import { MatMenuModule } from '@angular/material/menu';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import moment from 'moment';
import { seedRandom } from 'projects/nr-ngx-component-lib/story-util';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { of } from 'rxjs';
import { DATE_FORMATS } from '../../utils/date.util';
import { ScheduleProvider } from '../schedule/schedule.component';
import { ResourceScheduleComponent, ResourceScheduleRowHeadingDirective, ResourceScheduleRowItem } from './resource-schedule.component';

const meta: Meta<ResourceScheduleComponent> = {
    title: 'Composite/Resource Schedule',
    component: ResourceScheduleComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                ResourceScheduleRowHeadingDirective,
                MatMenuModule
            ],
            // declare components that are used in the template
            declarations: [
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{width, displayMode, leaveEmpty,showHover}">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
                            [useWidth]="useWidth"
                            [width]="width"                        
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                    `
            }
        ),        
    ],
    tags: [ 'autodocs' ],
    parameters: {
        docs: {
            description: {
                component: `
                `
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<ResourceScheduleComponent & DisplayModeWrapperComponent & { showMenu: boolean, leaveEmpty: number, showHover: boolean, showHeading: boolean, makeProvider: ( x ) => ScheduleProvider }> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        startDate: {
            type: 'string',
            control: { type: 'text' }
        },
        highlightDate: {
            type: 'string',
            control: { type: 'text' }
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
        leaveEmpty: {
            control: {
                type: 'range',
                min: 0,
                max: 100
            }
        },
    },
    args: {
        ...displayModeWrapperStory.args,
        startDate: moment().format( DATE_FORMATS.datePickerInput ),
        highlightDate: moment().add( 2, 'day' ).format( DATE_FORMATS.datePickerInput ),
        dayCount: 8,
        weekStart: 0,
        showMenu: true,
        showHover: true,
        showHeading: true,
        leaveEmpty: 0,
    },
    render: ( args ) => {
        args.makeProvider = ( tr ) => { return {
            fetchSchedule: () => { return of(
                new Promise( ( res, rej ) => {
                    setTimeout( () => {
                        res( {
                            totalRowCount: 10
                        } )
                    }, 1000 )
                } )
            ) },
            parseSchedule: ( res ) => {
                return Array.from( { length: 30 } ).map( ( x, i ) => {
                    return {
                        heading: { row: i, bar: { foo: () => {return 123} } },
                        items: scheduleItems( i * 7, 19, 23, args.leaveEmpty, tr )
                    }
                } )
            },
            getInitialPageState: () => {
                return {
                    filter: {},
                    pageConfig: {
                        pageSize: 20,
                        pageNumber: 1,
                        sortActive: 'dateTime',
                        sortDirection: 'desc',
                    }
                }
            },
            // startloadSchedule: ( inner ) => { return inner() },
            // completedLoadSchedule: ( inner ) => { return inner() },
        } }

        return {
            props: args,
            template: `
                <nrcl-resource-schedule #res
                    [startDate]="startDate"
                    [highlightDate]="highlightDate"
                    [dayCount]="dayCount"
                    [weekStart]="weekStart"
                    [provider]="makeProvider(tooltip)"
                    [menu]="showMenu ? menu : null"
                    [hover]="showHover"
                    [heading]="showHeading"
                >
                    <div>upper-left</div>

                    <ng-template nrclResourceScheduleRowHeading let-item>
                        <div>foo  {{item|json}}</div>
                    </ng-template>
                </nrcl-resource-schedule>

                <mat-menu #menu="matMenu" class="availability-menu">
                    <ng-template matMenuContent let-data>
                        {{ data | json }}
                    </ng-template>
                    <button mat-menu-item>Manage Availability</button>
                </mat-menu>

                <ng-template #tooltip let-row>
                    <div>top</div>
                    <!-- {{ row | json }} -->
                    <div>bottom</div>
                </ng-template>                
            `
        }
    }
}

export const NoRows: StoryObj<ResourceScheduleComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        startDate: moment().format( DATE_FORMATS.datePickerInput ),
        dayCount: 8,
        weekStart: 0,
    },
    render: ( args ) => {
        args.provider = {
            fetchSchedule: () => { return of({
                totalRowCount: 0
            }) },
            parseSchedule: ( res ) => {
                return []
            },
            getInitialPageState: () => {
                return {
                    filter: {},
                    pageConfig: {
                        pageSize: 20,
                        pageNumber: 1,
                        sortActive: 'dateTime',
                        sortDirection: 'desc',
                    }
                }
            },
            // startloadSchedule: ( inner ) => { return inner() },
            // completedLoadSchedule: ( inner ) => { return inner() },
        }
        return {
            props: args,
            template: `
                <nrcl-resource-schedule
                    [startDate]="startDate"
                    [dayCount]="10"
                    [weekStart]="0"
                    [provider]="provider"
                    [menu]="menu"
                >
                    <div>upper-left</div>

                    <ng-template nrclResourceScheduleRowHeading let-item>
                        <div>foo  {{item|json}} {{item.bar.foo()|json}}</div>
                    </ng-template>
                </nrcl-resource-schedule>

                <mat-menu #menu="matMenu" class="availability-menu">
                    <ng-template matMenuContent let-data>
                        {{ data | json }}
                    </ng-template>
                    <button mat-menu-item>Manage Availability</button>
                </mat-menu>
            `
        }
    }
}

let rand = seedRandom( 1 )

let items = [
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'Duty Day', travel: true, tooltip: true },
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'STBY', tooltip: true },
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'Day Off', tooltip: true },
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'Reg Day', travel: true, tooltip: true },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'Duty Day', tooltip: true },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'STBY', tooltip: true },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'Day Off', travel: true, tooltip: true },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'Reg Day', tooltip: true },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'Duty Day', tooltip: true },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'STBY', tooltip: true },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'Day Off', tooltip: true },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'Reg Day', travel: true, tooltip: true },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'Duty Day', tooltip: true },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'STBY', travel: true, tooltip: true },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'Day Off', tooltip: true },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'Reg Day', tooltip: true },
    { name: 'out-of-service', tooltip: true  },
    { name: 'available-duty-day', allocationType: 'Full', travel: true, shiftType: 'Duty Day', tooltip: true  },
    { name: 'available-duty-day', allocationType: 'Local Only', shiftType: 'Duty Day', tooltip: true  },
    { name: 'available-duty-day', allocationType: 'Other', shiftType: 'Duty Day', tooltip: true  },
    { name: 'available-standby-day', allocationType: 'Full', shiftType: 'STBY', tooltip: true  },
    { name: 'available-standby-day', allocationType: 'Local Only', travel: true, shiftType: 'STBY', tooltip: true  },
    { name: 'available-standby-day', allocationType: 'Other', shiftType: 'STBY', tooltip: true  },
    { name: 'available-off-day', allocationType: 'Full', shiftType: 'Day Off', tooltip: true  },
    { name: 'available-off-day', allocationType: 'Local Only', shiftType: 'Day Off', tooltip: true },
    { name: 'available-off-day', allocationType: 'Other', travel: true, shiftType: 'Day Off', tooltip: true  },
    { name: 'available-regular-day', allocationType: 'Full', shiftType: 'Reg Day', tooltip: true  },
    { name: 'available-regular-day', allocationType: 'Local Only', icons: () => [ 'user-clock', 'roster' ], tooltip: ()=>'CaFC\nCentral Cariboo Zone (Williams Lake)\nSTBY', shiftType: 'Reg Day' },
    { name: 'available-regular-day', allocationType: 'Other', shiftType: 'Reg Day', tooltip: true  },
    { name: 'available-regular-day', tooltip: true  },
    { name: 'available-hired', tooltip: true  },
    { name: 'empty' },
    { name: 'assigned-duty-day', assignmentName: 'CA1234 iufdhgi iuh fdigh sirguh iduhg qwu aoiui sudhuwhfi', shiftType: 'Duty Day', tooltip: true  },
    { name: 'assigned-standby-day', assignmentName: 'PWCC', shiftType: 'STBY', tooltip: true  },
    { name: 'assigned-off-day', assignmentName: 'CA1234', shiftType: 'Day Off', tooltip: true  },
    { name: 'assigned-regular-day',  assignmentName: 'Multiple', shiftType: 'Reg Day', tooltip: true  },
    { name: 'rostered', allocationType: 'Other', shiftType: 'Reg Day', icons: () => [ 'roster' ], tooltip: true  },
]

function scheduleItems( start, length, skip, empty, tmpl ): Promise<ResourceScheduleRowItem[]> {
    let len = items.length 
    return delayed( 
        Array.from( { length } )
            .map( ( x, i ) => {
                return { id: String(i), ...items[ ( start + skip * i ) % len ] } as ResourceScheduleRowItem
            } )
            .map( i => {
                if ( rand( 100 ) < empty ) {
                    i.name = 'empty'
                }
                return i
            } )
            .map( i => {
                if ( (i.tooltip as any) === true ) {
                    i.tooltip = () => tmpl
                }
                return i
            } )
    )
}

function delayed<T>( val: T ): Promise<T> {
    return new Promise( ( res, rej ) => {
        setTimeout(() => {
            res( val )
        }, Math.random() * 2000 )
    } )
}

