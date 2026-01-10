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
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { of } from 'rxjs';
import { ConfigurationService } from '../../services/configuration.service';
import { DATE_FORMATS } from '../../utils/date.util';
import { ButtonComponent } from '../button/button.component';
import { CellContentComponent } from '../cell-content/cell-content.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';
import { GapComponent } from '../gap/gap.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { RowListDesktopComponent } from '../row-list-desktop/row-list-desktop.component';
import { RowListMobileComponent } from '../row-list-mobile/row-list-mobile.component';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from '../row-list-sorting/row-list-sorting.component';
import { ListAttachmentsComponent } from './list-attachments.component';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from '../device-view/device-view.component';
import { IconComponent } from '../icon/icon.component';

const meta: Meta<ListAttachmentsComponent> = {
    title: 'List Attachments',
    component: ListAttachmentsComponent,
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
                DisplayModeWrapperComponent,
                FilterContainerComponent,
                FilterSelectComponent,
                FiltersPanelComponent,
                FilterSearchComponent,
                FilterDateComponent,
                GapComponent,
                PageHeaderComponent,
                RerenderDirective,
                RowListDesktopComponent,
                RowListMobileComponent,
                RowListPaginationComponent,
                RowListSortingComponent,
                ButtonComponent,
                DeviceViewComponent,
                DesktopViewDirective,
                MobileViewDirective,
                IconComponent
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
                    <ng-container *rerender="width + displayMode + canDelete">
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

export const Primary: StoryObj<ListAttachmentsComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        canDelete: true,
        showPagination: false
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
        args.rowListProvider = {
            fetchAttachments: () => { return of(attachmentCollection()) },
            displayRowListPage: ( res: AttachmentCollection ) => {
                return {
                    totalRowCount: res.totalRowCount,
                    rows: res.collection.map( v => {
                        return {
                            attachmentTypeDescription: v.attachmentTypeCode,
                            fileName: v.fileName,
                            fileExtension: getFileExtension( v.fileName ),
                            uploadedBy: v.uploadedBy,
                            uploadedTimestamp: moment( v.uploadedTimestamp ).format( DATE_FORMATS.fullPickerInput ),
                            attachmentDescription: v.attachmentDescription,
                            attachmentId: v.attachmentGuid,
                            fileId: v.fileIdentifier,
                            sourceObjectUniqueId: v.sourceObjectUniqueId
                        }
                    } )
                }
            },
            downloadItem: () => {},
            deleteItem: () => {},
        }
        return {
            props: args,
            template: `
                <nrcl-list-attachments
                    [rowListProvider]="rowListProvider"
                    [canDelete]="canDelete"
                    [showPagination]="showPagination"
                ></nrcl-list-attachments>
            `
        }
    }
}

type AttachmentCollection = {
    pageNumber: number
    pageRowCount: number
    totalRowCount: number
    totalPageCount: number
    collection: {
        attachmentGuid: string
        sourceObjectUniqueId: string
        sourceObjectNameCode: string
        fileName: string
        attachmentDescription: string
        attachmentTypeCode: string
        uploadedBy: string
        uploadedTimestamp: string
        fileIdentifier: string
    }[]
}

function attachmentCollection(): AttachmentCollection {
    return {
        "pageNumber": 0,
        "pageRowCount": 9,
        "totalRowCount": 9,
        "totalPageCount": 1,
        "collection": [
            {
                "attachmentGuid": "38CEE96B5CA90D20E063690A0A0A3236",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "ben-avatar-2.png",
                "attachmentDescription": "dfgdfgdfgdfg dfgdfgdfgdfg dfgdfgdfgdfg dfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfg",
                "attachmentTypeCode": "OTHER",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-30T11:08:15",
                "fileIdentifier": "50281"
            },
            {
                "attachmentGuid": "38CF76E3239E20B6E063690A0A0AA01E",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "prep-sheet-detail.png",
                "attachmentDescription": "asadasda efefsefse fseg dsfsfed weqweqeqweqw eqweqweqwe qweqwe",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-30T11:47:49",
                "fileIdentifier": "50321"
            },
            {
                "attachmentGuid": "38CEF34B55AD0DE8E063690A0A0A3EC4",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "yul-fr.svg",
                "attachmentDescription": "cvbcvb",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-30T11:11:01",
                "fileIdentifier": "50291"
            },
            {
                "attachmentGuid": "38CF08826EFA0FBBE063690A0A0A333F",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "WIN_20231221_10_28_31_Pro copy.jpeg",
                "attachmentDescription": "sdfsdfsdfsdfsdfsdfsfesfsefefsdfsdfsdfsdfsdfsdfsfesfsefefsdfsdfsdfsdfsdfsdfsfesfsefefsdfsdfsdfsdfsdfsdfsfesfsefefsdfsdfsdfsdfsdfsdfsfesfsefef",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-30T11:17:08",
                "fileIdentifier": "50312"
            },
            {
                "attachmentGuid": "389D5320645DDAC0E063690A0A0AC48A",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "avatar-collectible.png",
                "attachmentDescription": "sdfsdfsdfsdsdfsdf",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-27T23:58:40",
                "fileIdentifier": "50251"
            },
            {
                "attachmentGuid": "38CEFB6A4F3C0E84E063690A0A0A6415",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "yul.svg",
                "attachmentDescription": "dfgdrgsrdg",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-30T11:13:17",
                "fileIdentifier": "50301"
            },
            {
                "attachmentGuid": "387E09BBA94B9849E063690A0A0A8253",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "avatar-van-gogh.png",
                "attachmentDescription": "sdsdfsdsdfsdf",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-26T10:39:05",
                "fileIdentifier": "50243"
            },
            {
                "attachmentGuid": "387DB8146A4E8EE0E063690A0A0AFE5A",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "main.jpg",
                "attachmentDescription": "sfdfsdfg",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-26T10:16:15",
                "fileIdentifier": "50231"
            },
            {
                "attachmentGuid": "38CE8F9D6EF701D7E063690A0A0A7394",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "avatar-pixel.png",
                "attachmentDescription": "fdgsdgrssdrgsdrg",
                "attachmentTypeCode": "OTHER",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-30T10:43:09",
                "fileIdentifier": "50271"
            }
        ]
    }
}

function getFileExtension(fileName: string) {
    if(!fileName) { return; }

    return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toUpperCase();
}
