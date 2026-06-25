 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlMomentDateTimeModule } from '@busacca/ng-pick-datetime';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import moment from 'moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { of } from 'rxjs';
import { ConfigurationService } from '../../services/configuration.service';
import { DATE_FORMATS } from '../../utils/date.util';
import { ButtonComponent } from '../button/button.component';
import { CellContentComponent } from '../cell-content/cell-content.component';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from '../device-view/device-view.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';
import { GapComponent } from '../gap/gap.component';
import { IconComponent } from '../icon/icon.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { RowListDesktopComponent } from '../row-list-desktop/row-list-desktop.component';
import { RowListMobileComponent } from '../row-list-mobile/row-list-mobile.component';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from '../row-list-sorting/row-list-sorting.component';
import { ScheduleComponent, ScheduleItemDirective, ScheduleRowHeadingDirective } from '../schedule/schedule.component';
import { ResourceScheduleComponent, ResourceScheduleRowHeadingDirective, ResourceScheduleRowItem } from './resource-schedule.component';

const meta: Meta<ResourceScheduleComponent> = {
    title: 'Composite/Resource Schedule',
    component: ResourceScheduleComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatRadioModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatTooltipModule,
                ReactiveFormsModule,
                MatListModule,
                OwlDateTimeModule,
                OwlMomentDateTimeModule,
                MatProgressSpinner,
                NgxPaginationModule,
                MatTableModule,
                MatSortModule,
                MatCardModule,
                MatRippleModule,
                MatMenuModule,
                NgxPaginationModule,
            ],
            // declare components that are used in the template
            declarations: [
                CellContentComponent,
                FilterContainerComponent,
                FilterSelectComponent,
                FiltersPanelComponent,
                FilterSearchComponent,
                FilterDateComponent,
                GapComponent,
                PageHeaderComponent,
                RowListDesktopComponent,
                RowListMobileComponent,
                RowListPaginationComponent,
                RowListSortingComponent,
                ButtonComponent,          
                DeviceViewComponent,
                DesktopViewDirective,
                MobileViewDirective,
                IconComponent,
                ScheduleComponent,
                ScheduleItemDirective,
                ScheduleRowHeadingDirective,
                ResourceScheduleRowHeadingDirective,
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService,
                { provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS },
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{width, displayMode}">
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

export const Primary: StoryObj<ResourceScheduleComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
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
        ...displayModeWrapperStory.args,
        startDate: moment().format( DATE_FORMATS.datePickerInput ),
        dayCount: 8,
        weekStart: 0,
    },
    render: ( args ) => {
        args.provider = {
            fetchSchedule: ( x ) => { return of({
                totalRowCount: 10
            }) },
            parseSchedule: ( res ) => {
                return Array.from( { length: 30 } ).map( ( x, i ) => {
                    return {
                        heading: { row: i, bar: { foo: () => {return 123} } },
                        items: scheduleItems( i * 7, 19, 23 )
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
            }
        }
        return {
            props: args,
            template: `
                <nrcl-resource-schedule
                    [startDate]="startDate"
                    [dayCount]="dayCount"
                    [weekStart]="weekStart"
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

export const NoRows: StoryObj<ResourceScheduleComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
    },
    parameters: {
        docs: {
            description: {
                story: `
                `
            }
        }
    },    
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-resource-schedule
                    [resourceScheduleProvider]="resourceScheduleProvider"
                ></nrcl-resource-schedule>
            `
        }
    }
}

let items = [
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'Duty Day', travel: true },
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'Standby Day' },
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'Day Off' },
    { name: 'out-of-service', allocationType: 'Leave', shiftType: 'Regular Day', travel: true },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'Duty Day' },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'Standby Day' },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'Day Off', travel: true },
    { name: 'out-of-service', allocationType: 'Reset', shiftType: 'Regular Day' },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'Duty Day' },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'Standby Day' },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'Day Off' },
    { name: 'out-of-service', allocationType: 'Training', shiftType: 'Regular Day', travel: true },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'Duty Day' },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'Standby Day', travel: true },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'Day Off' },
    { name: 'out-of-service', allocationType: 'Other', shiftType: 'Regular Day' },
    { name: 'available-duty-day', allocationType: 'Full', travel: true },
    { name: 'available-duty-day', allocationType: 'Local' },
    { name: 'available-duty-day', allocationType: 'Other' },
    { name: 'available-standby-day', allocationType: 'Full' },
    { name: 'available-standby-day', allocationType: 'Local', travel: true },
    { name: 'available-standby-day', allocationType: 'Other' },
    { name: 'available-off-day', allocationType: 'Full' },
    { name: 'available-off-day', allocationType: 'Local' },
    { name: 'available-off-day', allocationType: 'Other', travel: true },
    { name: 'available-regular-day', allocationType: 'Full' },
    { name: 'available-regular-day', allocationType: 'Local', icons: () => [ 'user-clock', 'roster' ], tooltip: ()=>'CaFC\nCentral Cariboo Zone (Williams Lake)\nSTBY' },
    { name: 'available-regular-day', allocationType: 'Other' },
    { name: 'assigned-duty-day', assignmentName: 'CA1234 iufdhgi iuh fdigh sirguh iduhg' },
    { name: 'assigned-standby-day', assignmentName: 'PWCC' },
    { name: 'assigned-off-day', assignmentName: 'CA1234' },
    { name: 'assigned-regular-day',  assignmentName: 'Multiple Assignments' },
]

function scheduleItems( start, length, skip ): Promise<ResourceScheduleRowItem[]> {
    let len = items.length 
    return delayed( Array.from( { length } ).map( ( x, i ) => {
        return { id: String(i), ...items[ ( start + skip * i ) % len ] } as ResourceScheduleRowItem
    } ) )
}

function delayed<T>( val: T ): Promise<T> {
    return new Promise( ( res, rej ) => {
        setTimeout(() => {
            res( val )
        }, Math.random() * 2000 )
    } )
}

