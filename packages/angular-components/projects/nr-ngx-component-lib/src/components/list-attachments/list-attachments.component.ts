import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Observable } from "rxjs";
import { LoadRowListResult, RowListBase, RowListState } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";

export type AttachmentsTableRow = {
    attachmentTypeDescription: string
    fileName: string
    fileExtension: string
    uploadedBy: string
    uploadedTimestamp: string
    attachmentDescription: string
    attachmentId: string 
    fileId: string
    sourceObjectUniqueId: string
}

export type FetchAttachmentsParameters = { 
    pageNumber: number 
    pageRowCount: number 
    sortColumn: string 
    sortDirection: string
}

export interface AttachmentRowListProvider<R,L=any> {
    fetchAttachments( x: FetchAttachmentsParameters ): Observable<L>    
    displayRowListPage( res: L ): LoadRowListResult<R>
    downloadItem( item: R )
    deleteItem( item: R )
}

@Component({
    selector: "nrcl-list-attachments",
    templateUrl: "./list-attachments.component.html",
    styleUrl: "./list-attachments.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAttachmentsComponent extends RowListBase<{},AttachmentsTableRow> implements OnChanges {
    @Input() rowListProvider: AttachmentRowListProvider<AttachmentsTableRow>
    @Input() canDelete = true
    @Input() canDownload = true
    @Input() noRowsMessage = "No attachments have been added."
    
    DATE_FORMATS = DATE_FORMATS
    columns = [] 
    sortColumns = [
        { code: 'attachmentTypeCode',   description: 'Attachment Type' }, 
        { code: 'fileName',             description: 'File Name' }, 
        { code: 'sourceObjectNameCode', description: 'File Type' }, 
        { code: 'uploadedBy',           description: 'Uploaded By' }, 
        { code: 'uploadedTimestamp',    description: 'Uploaded Date' }, 
        { code: 'description',          description: 'Description' }  
    ]

    ngOnChanges(changes: SimpleChanges): void {
        if ( changes.canDownload || changes.canDelete ) {
            this.columns = [ 
                'attachmentTypeCode', 
                'fileName', 
                'sourceObjectNameCode', 
                'uploadedBy', 
                'uploadedTimestamp', 
                'description',
                ...( this.canDownload ? ['download'] : [] ),
                ...( this.canDelete ? ['delete'] : [] )
            ]
        }
    }

    get initialPageState(): RowListState<{}> {
        return {
            filter: {},
            pageSize: 10,
            pageNumber: 1,
            sortActive: 'uploadedTimestamp',
            sortDirection: 'desc',
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
    
    displayRowListPage( res: any ): LoadRowListResult<AttachmentsTableRow> {
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
