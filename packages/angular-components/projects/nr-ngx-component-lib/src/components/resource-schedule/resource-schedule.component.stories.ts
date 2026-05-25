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
import { ResourceScheduleComponent, ResourceScheduleRowHeadingDirective } from './resource-schedule.component';
import { ScheduleComponent, ScheduleItemDirective, ScheduleRowHeadingDirective } from '../schedule/schedule.component';

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
            fetchResourceSchedule: ( x ) => { return of([]) },
            displayResourceSchedule: ( res ) => {
                return [
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
                        heading: { foo: 222 },
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

// type EventHistoryCollection = { 
//     pageNumber: number 
//     pageRowCount: number 
//     totalRowCount: number 
//     totalPageCount: number 
//     collection: { 
//         eventHistoryGuid: string 
//         sourceObjectNameCode: string 
//         sourceObjectUniqueId: string 
//         eventTimestamp: string 
//         eventHistoryTypeCode: string 
//         comment: string 
//         createdByUserType: string 
//         createdByUserId: string 
//         createdByUserGuid: string 
//     }[] 
// }

// function eventHistoryCollection(): EventHistoryCollection {
//     return {
//         "pageNumber": 1,
//         "pageRowCount": 20,
//         "totalRowCount": 21,
//         "totalPageCount": 2,
//         "collection": [
//             {
//                 "eventHistoryGuid": "3CBE7E2E7C76D2C9E063690A0A0A1F5C",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-08-19T13:13:43.906606",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment blackAndWhitePDFPrintPreview.pdf has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "3CBDB972248ACAA4E063690A0A0AC523",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-08-19T12:18:43.058034",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment Coastal-Fire-Centre_Prep-Sheet_2025-08-14_to_2025-08-20-4.pdf has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "3CBCD76F9D60AFD7E063690A0A0A8962",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-08-19T11:15:31.300823",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment Coastal-Fire-Centre_Prep-Sheet_2025-08-14_to_2025-08-20 (4) (1).pdf has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "3CBCCAEEC18EAE76E063690A0A0A0BDA",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-08-19T11:12:01.513877",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment Coastal-Fire-Centre_Prep-Sheet_2025-08-14_to_2025-08-20 (4).pdf has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "3BDECE98CF881380E063690A0A0A20F8",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-08-08T10:22:01.223762",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment Prep-Sheet-for-Coastal-Fire-Centre-from-2025-07-24-to-2025-07-30 (1).pdf has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "3BDEB57F27F80F73E063690A0A0A6163",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-08-08T10:14:39.097257",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment c2.PNG has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "3BCEBF8A919956DBE063690A0A0A86F6",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-08-07T15:12:08.139662",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment aa2.PNG has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "38CF76E3239F20B6E063690A0A0AA01E",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-30T11:47:49.288632",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment prep-sheet-detail.png has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "38CF08826EFB0FBBE063690A0A0A333F",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-30T11:17:08.962199",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment WIN_20231221_10_28_31_Pro copy.jpeg has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "38CEFB6A4F3D0E84E063690A0A0A6415",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-30T11:13:17.768572",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment yul.svg has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "38CEF34B55AE0DE8E063690A0A0A3EC4",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-30T11:11:01.521335",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment yul-fr.svg has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "38CEE96B5CAA0D20E063690A0A0A3236",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-30T11:08:15.848039",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment ben-avatar-2.png has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "38CE8F9D6EF801D7E063690A0A0A7394",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-30T10:43:09.181984",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment avatar-pixel.png has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "389D5320645EDAC0E063690A0A0AC48A",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-27T23:58:40.962563",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment avatar-collectible.png has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "387E09BBA94C9849E063690A0A0A8253",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-26T10:39:05.63315",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment avatar-van-gogh.png has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "387DB8146A4F8EE0E063690A0A0AFE5A",
//                 "sourceObjectNameCode": "EQUIP_ATTACH",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-06-26T10:16:15.726541",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Attachment main.jpg has been added.",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "34A50FB9E235B9F1E063690A0A0AA673",
//                 "sourceObjectNameCode": "EQUIP_PROFILE",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-05-08T11:31:43.841397",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Equipment Model Configuration changed from asn_make m3b ATV SxS Crew to asn_make m3br ATV 4 Wheel",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "34A15CF6DEAC5E51E063690A0A0A6D32",
//                 "sourceObjectNameCode": "EQUIP_PROFILE",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-05-08T07:06:59.57938",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Equipment Model Configuration changed from asn_make m3b Backhoe 1 to asn_make m3b ATV SxS Crew",
//                 "createdByUserType": "GOV",
//                 "createdByUserId": "IDIR\\SFOORD",
//                 "createdByUserGuid": "B01FDA3D305C424EB6BDF4D4092E5E8B"
//             },
//             {
//                 "eventHistoryGuid": "33F2E970412723A3E063690A0A0A9B26",
//                 "sourceObjectNameCode": "RSRC_SCHEDULE",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-04-29T14:59:44.4748",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Schedule has been updated.",
//                 "createdByUserType": "SCL",
//                 "createdByUserId": "SCL\\TEST_SERVICE_CLIENT",
//                 "createdByUserGuid": "9374JD83HD94JSLE893H3N58DJE74999"
//             },
//             {
//                 "eventHistoryGuid": "33F2E970412523A3E063690A0A0A9B26",
//                 "sourceObjectNameCode": "ASSIGNMENT",
//                 "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
//                 "eventTimestamp": "2025-04-29T14:59:42.436986",
//                 "eventHistoryTypeCode": "EVENT",
//                 "comment": "Resource Assignment for TEST EQUIPMENT ASSIGNMENT has been created for Backhoe 1, 01c915f84c5e48f3b898, asn_make m3b, 2000.",
//                 "createdByUserType": "SCL",
//                 "createdByUserId": "SCL\\TEST_SERVICE_CLIENT",
//                 "createdByUserGuid": "9374JD83HD94JSLE893H3N58DJE74999"
//             }
//         ]
//     }
// }
