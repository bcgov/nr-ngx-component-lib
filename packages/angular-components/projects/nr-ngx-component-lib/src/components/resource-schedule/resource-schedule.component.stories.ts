 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
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
import { ResourceScheduleComponent, ResourceScheduleRowHeadingDirective, ResourceScheduleRowItem } from './resource-schedule.component';
import { ScheduleComponent, ScheduleItemDirective, ScheduleRowHeadingDirective } from '../schedule/schedule.component';
import { MatRippleModule } from '@angular/material/core';

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
                MatRippleModule
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
            fetchResourceSchedule: ( x ) => { return of({
                totalRowCount: 10
            }) },
            displayResourceSchedule: ( res ) => {
                return Array.from( { length: 10 } ).map( ( x, i ) => {
                    return {
                        heading: { row: i },
                        items: scheduleItems( i * 7, 19, 23 )
                    }
                } )
            },
        }
        return {
            props: args,
            template: `
                <nrcl-resource-schedule
                    [startDate]="startDate"
                    [dayCount]="dayCount"
                    [weekStart]="weekStart"
                    [provider]="provider"
                >
                    <div>upper-left</div>

                    <ng-template nrclResourceScheduleRowHeading let-item>
                        <div>foo  {{item|json}}</div>
                    </ng-template>
                </nrcl-resource-schedule>
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
        // args.resourceScheduleProvider = {
        //     fetchEventHistory: () => { return of(eventHistoryCollection()) },
        //     displayRowListPage: ( res: EventHistoryCollection ) => {
        //         return []
        //     },
        // }
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
    { name: 'out-of-service', data: { allocationType: 'Leave', shiftType: 'Duty' } },
    { name: 'out-of-service', data: { allocationType: 'Leave', shiftType: 'Standby' } },
    { name: 'out-of-service', data: { allocationType: 'Leave', shiftType: 'Off' } },
    { name: 'out-of-service', data: { allocationType: 'Leave', shiftType: 'Regular' } },
    { name: 'out-of-service', data: { allocationType: 'Reset', shiftType: 'Duty' } },
    { name: 'out-of-service', data: { allocationType: 'Reset', shiftType: 'Standby' } },
    { name: 'out-of-service', data: { allocationType: 'Reset', shiftType: 'Off' } },
    { name: 'out-of-service', data: { allocationType: 'Reset', shiftType: 'Regular' } },
    { name: 'out-of-service', data: { allocationType: 'Training', shiftType: 'Duty' } },
    { name: 'out-of-service', data: { allocationType: 'Training', shiftType: 'Standby' } },
    { name: 'out-of-service', data: { allocationType: 'Training', shiftType: 'Off' } },
    { name: 'out-of-service', data: { allocationType: 'Training', shiftType: 'Regular' } },
    { name: 'out-of-service', data: { allocationType: 'Other', shiftType: 'Duty' } },
    { name: 'out-of-service', data: { allocationType: 'Other', shiftType: 'Standby' } },
    { name: 'out-of-service', data: { allocationType: 'Other', shiftType: 'Off' } },
    { name: 'out-of-service', data: { allocationType: 'Other', shiftType: 'Regular' } },
    { name: 'available-duty-day', data: { allocationType: 'Full' } },
    { name: 'available-duty-day', data: { allocationType: 'Local' } },
    { name: 'available-duty-day', data: { allocationType: 'Other' } },
    { name: 'available-standby-day', data: { allocationType: 'Full' } },
    { name: 'available-standby-day', data: { allocationType: 'Local' } },
    { name: 'available-standby-day', data: { allocationType: 'Other' } },
    { name: 'available-off-day', data: { allocationType: 'Full' } },
    { name: 'available-off-day', data: { allocationType: 'Local' } },
    { name: 'available-off-day', data: { allocationType: 'Other' } },
    { name: 'available-regular-day', data: { allocationType: 'Full' } },
    { name: 'available-regular-day', data: { allocationType: 'Local' } },
    { name: 'available-regular-day', data: { allocationType: 'Other' } },
    { name: 'assigned-duty-day', data: { assignmentName: 'CA1234' } },
    { name: 'assigned-standby-day', data: { assignmentName: 'PWCC' } },
    { name: 'assigned-off-day', data: { assignmentName: 'CA1234' } },
    { name: 'assigned-regular-day', data: {  assignmentName: 'Multiple Assignments' } },
]

function scheduleItems( start, length, skip ): Promise<ResourceScheduleRowItem[]> {
    let len = items.length 
    return delayed( Array.from( { length } ).map( ( x, i ) => {
        return items[ ( start + skip * i ) % len ] as ResourceScheduleRowItem
    } ) )
}

function delayed<T>( val: T ): Promise<T> {
    return new Promise( ( res, rej ) => {
        setTimeout(() => {
            res( val )
        }, Math.random() * 2000 )
    } )
}

