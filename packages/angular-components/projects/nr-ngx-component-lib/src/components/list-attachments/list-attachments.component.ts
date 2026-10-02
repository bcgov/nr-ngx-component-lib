import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Observable } from "rxjs";
import { RowListBase } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { InitialState } from "../../directives/pagination.base";
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from "../device-view/device-view.component";
import { RowListDesktopComponent } from "../row-list-desktop/row-list-desktop.component";
import { RowListMobileComponent } from "../row-list-mobile/row-list-mobile.component";
import { RowListSortingComponent } from "../row-list-sorting/row-list-sorting.component";
import { RowListPaginationComponent } from "../row-list-pagination/row-list-pagination.component";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { ButtonComponent } from "../button/button.component";
import { GapComponent } from "../gap/gap.component";
import { CellContentComponent } from "../cell-content/cell-content.component";
import { NgxPaginationModule } from "ngx-pagination";
import { MatSortModule } from "@angular/material/sort";

export type AttachmentsTableRow = {
    attachmentTypeDescription: string
    orgUnit: string
    fileName: string
    fileExtension: string
    uploadedBy: string
    uploadedTimestamp: string
    attachmentDescription: string
    attachmentId: string 
    fileId: string
    sourceObjectUniqueId: string,
}

export type FetchAttachmentsParameters = { 
    pageNumber: number 
    pageRowCount: number 
    sortColumn: string 
    sortDirection: string
}

export type InitialAttachmentsState = Omit<InitialState<{}>,'filter'|'pageConfig'> & Partial<Pick<InitialState<{}>,'filter'|'pageConfig'>>

export interface AttachmentRowListProvider<R,L=any> {
    fetchAttachments( x: FetchAttachmentsParameters ): Observable<L>    
    displayRowListPage( res: L ): AttachmentsTableRow[]
    downloadItem( item: R ): any
    deleteItem( item: R ): any
    getInitialPageState(): InitialAttachmentsState
}

@Component({
    selector: "nrcl-list-attachments",
    templateUrl: "./list-attachments.component.html",
    styleUrl: "./list-attachments.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DeviceViewComponent,
        DesktopViewDirective,
        MobileViewDirective,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListSortingComponent,
        RowListPaginationComponent,
        MatTableModule,
        MatCardModule,
        ButtonComponent,
        GapComponent,
        CellContentComponent,
        NgxPaginationModule,
        MatSortModule
    ]
})
export class ListAttachmentsComponent extends RowListBase<{},AttachmentsTableRow> implements OnChanges {
    static _nextInstance = 0

    @Input() rowListProvider?: AttachmentRowListProvider<AttachmentsTableRow>
    @Input() canDelete = true
    @Input() canDownload = true
    @Input() showOrgUnit = false
    @Input() noRowsMessage = "No attachments have been added."

    DATE_FORMATS = DATE_FORMATS
    columns: string[] = [] 
    sortColumns: { code: string; description: string; }[] = []
    desktopPaginationId = "desktop"
    mobilePaginationId = "mobile"

    ngOnChanges(changes: SimpleChanges): void {
        if ( changes.canDownload || changes.canDelete || changes.showOrgUnit ) {
            this.columns = [ 
                'attachmentTypeCode',
                ...(this.showOrgUnit ? ['orgUnit'] : []),
                'fileName', 
                'fileExtension', 
                'uploadedBy', 
                'uploadedTimestamp', 
                'description',
                ...( this.canDownload ? ['download'] : [] ),
                ...( this.canDelete ? ['delete'] : [] )
            ]
        }
        
        if ( changes.showOrgUnit ) {
            this.sortColumns = [
                { code: 'attachmentTypeCode', description: 'Attachment Type' },
                { code: 'fileName', description: 'File Name' },
                { code: 'fileExtension', description: 'File Type' },
                { code: 'uploadedBy', description: 'Uploaded By' },
                { code: 'uploadedTimestamp', description: 'Uploaded Date' },
                ...(this.showOrgUnit ? [{ code: 'orgUnit', description: 'Org Unit' }] : []),
                { code: 'description', description: 'Description' }
            ];
        }
    }

    getInitialPageState(): InitialState<{}> {
        if ( !this.rowListProvider?.getInitialPageState ) throw Error( 'no provider for ListAttachmentsComponent.rowListProvider.getInitialPageState' )

        let state = this.rowListProvider.getInitialPageState()

        ListAttachmentsComponent._nextInstance += 1
        let inst = state.instance || ( 'list-attachments-' + ListAttachmentsComponent._nextInstance )
        this.desktopPaginationId = 'desktop-' + inst
        this.mobilePaginationId = 'mobile-' + inst
        
        return {            
            instance: inst,
            filter: {},
            pageConfig: {
                pageSize: 10,
                pageNumber: 1,
                sortActive: 'uploadedTimestamp',
                sortDirection: 'desc',
                ...state.pageConfig
            },
        }
    }

    fetchRowListPage(): Observable<any> {
        if ( !this.rowListProvider?.fetchAttachments ) throw Error( 'no provider for ListAttachmentsComponent.rowListProvider.fetchRowListPage' )

        return this.rowListProvider.fetchAttachments({
            pageNumber: this.pageNumber,
            pageRowCount: this.pageSize,
            sortColumn: this.sortActive,
            sortDirection: this.sortDirection,
        })
    }

    parseRows( res: any ): AttachmentsTableRow[] {
        if ( !this.rowListProvider?.displayRowListPage ) throw Error( 'no provider for ListAttachmentsComponent.rowListProvider.displayRowListPage' )

        return this.rowListProvider.displayRowListPage( res )
    }
    
    onDownloadClick( item: AttachmentsTableRow ) {
        if ( !this.rowListProvider?.downloadItem ) throw Error( 'no provider for ListAttachmentsComponent.rowListProvider.onDownloadClick' )

        return this.rowListProvider.downloadItem( item )
    }

    onDeleteClick( item: AttachmentsTableRow ) {
        if ( !this.rowListProvider?.deleteItem ) throw Error( 'no provider for ListAttachmentsComponent.rowListProvider.onDeleteClick.' )
        
        return this.rowListProvider.deleteItem( item )
    }
}
