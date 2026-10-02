import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import moment from 'moment';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { of } from 'rxjs';
import { DATE_FORMATS } from '../../utils/date.util';
import { ListAttachmentsComponent } from './list-attachments.component';

const meta: Meta<ListAttachmentsComponent> = {
    title: 'List Attachments',
    component: ListAttachmentsComponent,
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
            ],
        } ),
        componentWrapperDecorator(
            ( story ) => {
                return `                    
                    <ng-container *rerender="{ width, displayMode, canDelete, canDownload, showOrgUnit }">
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
        canDownload: true,
        showOrgUnit: false,
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
                return res.collection.map( v => {
                    return {
                        attachmentTypeDescription: v.attachmentTypeCode,
                        fileName: v.fileName,
                        fileExtension: getFileExtension( v.fileName )!,
                        uploadedBy: v.uploadedBy,
                        uploadedTimestamp: moment( v.uploadedTimestamp ).format( DATE_FORMATS.fullPickerInput ),
                        attachmentDescription: v.attachmentDescription,
                        attachmentId: v.attachmentGuid,
                        fileId: v.fileIdentifier,
                        sourceObjectUniqueId: v.sourceObjectUniqueId,
                        orgUnit: v.orgUnit
                    }
                } )
            },
            downloadItem: (x) => { console.log(x) },
            deleteItem: (x) => { console.log(x) },
            getInitialPageState: () => {return {}}
        }
        return {
            props: args,
            template: `
                <nrcl-list-attachments
                    [rowListProvider]="rowListProvider"
                    [canDelete]="canDelete"
                    [canDownload]="canDownload"
                    [showOrgUnit]="showOrgUnit"
                ></nrcl-list-attachments>
            `
        }
    }
}

export const NoRows: StoryObj<ListAttachmentsComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        canDelete: true,
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
            fetchAttachments: () => { return of({}) },
            displayRowListPage: ( res: AttachmentCollection ) => {
                return []
            },
            downloadItem: () => {},
            deleteItem: () => {},
            getInitialPageState: () => {return {}}
        }
        return {
            props: args,
            template: `
                <nrcl-list-attachments
                    [rowListProvider]="rowListProvider"
                    [canDelete]="canDelete"
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
        orgUnit: string
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
                "fileIdentifier": "50281",
                "orgUnit": randomOrgUnit()
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
                "fileIdentifier": "50321",
                "orgUnit": randomOrgUnit()
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
                "fileIdentifier": "50291",
                "orgUnit": randomOrgUnit()
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
                "fileIdentifier": "50312",
                "orgUnit": randomOrgUnit()
            },
            {
                "attachmentGuid": "389D5320645DDAC0E063690A0A0AC48A",
                "sourceObjectUniqueId": "33F2E970411E23A3E063690A0A0A9B26",
                "sourceObjectNameCode": "EQUIP_ATTACH",
                "fileName": "avatar-collectible-collectible-collectible-collectible-collectible.png",
                "attachmentDescription": "sdfsdfsdfsdsdfsdf",
                "attachmentTypeCode": "PHOTO",
                "uploadedBy": "IDIR\\SFOORD",
                "uploadedTimestamp": "2025-06-27T23:58:40",
                "fileIdentifier": "50251",
                "orgUnit": randomOrgUnit()
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
                "fileIdentifier": "50301",
                "orgUnit": randomOrgUnit()
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
                "fileIdentifier": "50243",
                "orgUnit": randomOrgUnit()
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
                "fileIdentifier": "50231",
                "orgUnit": randomOrgUnit()
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
                "fileIdentifier": "50271",
                "orgUnit": randomOrgUnit()
            }
        ]
    }
}

function getFileExtension(fileName: string) {
    if(!fileName) { return; }

    return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toUpperCase();
}

function randomOrgUnit(): string {
    return orgUnits[ Math.floor( Math.random() * orgUnits.length ) ].description
}

let orgUnits = [
  {    "code": "60", "description": "BCWS HQ", },
  {    "code": "2", "description": "Cariboo Fire Centre", },
  {    "code": "50", "description": "Coastal Fire Centre", },
  {    "code": "25", "description": "Kamloops Fire Centre", },
  {    "code": "42", "description": "Northwest Fire Centre", },
  {    "code": "8", "description": "Prince George Fire Centre", },
  {    "code": "34", "description": "Southeast Fire Centre", },
  {    "code": "6", "description": "100 Mile House Zone", },
  {    "code": "38", "description": "Arrow Zone", },
  {    "code": "39", "description": "Boundary Zone", },
  {    "code": "45", "description": "Bulkley Zone", },
  {    "code": "46", "description": "Bulkley Zone (Kispiox)", },
  {    "code": "49", "description": "Cassiar Zone", },
  {    "code": "5", "description": "Central Cariboo Zone (Horsefly)", },
  {    "code": "4", "description": "Central Cariboo Zone (Williams Lake)", },
  {    "code": "7", "description": "Chilcotin Zone", },
  {    "code": "37", "description": "Columbia Zone", },
  {    "code": "35", "description": "Cranbrook Zone", },
  {    "code": "14", "description": "Dawson Creek Zone", },
  {    "code": "65", "description": "Equipment Depot - Prince George", },
  {    "code": "16", "description": "Fort Nelson Zone", },
  {    "code": "15", "description": "Fort St. John Zone", },
  {    "code": "51", "description": "Fraser Zone", },
  {    "code": "66", "description": "HQ Finance", },
  {    "code": "36", "description": "Invermere Zone", },
  {    "code": "27", "description": "Kamloops Zone (Kamloops)", },
  {    "code": "40", "description": "Kootenay Lake Zone", },
  {    "code": "32", "description": "Lillooet Zone", },
  {    "code": "13", "description": "Mackenzie Zone", },
  {    "code": "31", "description": "Merritt Zone", },
  {    "code": "55", "description": "Mid Island Zone", },
  {    "code": "43", "description": "Nadina Zone (Lakes)", },
  {    "code": "44", "description": "Nadina Zone (Morice)", },
  {    "code": "56", "description": "North Island Mid Coast Zone (Campbell River)", },
  {    "code": "58", "description": "North Island Mid Coast Zone (Mid Coast)", },
  {    "code": "57", "description": "North Island Mid Coast Zone (Port McNeill)", },
  {    "code": "52", "description": "Pemberton Zone", },
  {    "code": "30", "description": "Penticton Zone", },
  {    "code": "9", "description": "Prince George Zone", },
  {    "code": "62", "description": "Provincial Air Tanker Centre (PATC)", },
  {    "code": "63", "description": "Provincial Aviation", },
  {    "code": "64", "description": "Provincial Equipment Depot - Chilliwack", },
  {    "code": "61", "description": "Provincial Fire Operations", },
  {    "code": "3", "description": "Quesnel Zone", },
  {    "code": "10", "description": "Robson Valley Zone", },
  {    "code": "47", "description": "Skeena Zone (Kalum)", },
  {    "code": "48", "description": "Skeena Zone (North Coast)", },
  {    "code": "54", "description": "South Island Zone", },
  {    "code": "53", "description": "Sunshine Coast Zone", },
  {    "code": "12", "description": "VanJam Zone (Fort St. James)", },
  {    "code": "11", "description": "VanJam Zone (Vanderhoof)", },
  {    "code": "29", "description": "Vernon Zone (Vernon)",  }
]

