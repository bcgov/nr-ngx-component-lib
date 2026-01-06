import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { LoadRowListResult, RowListBase, RowListState } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";

export type TableRow = {
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

export interface AttachmentRowListProvider<R,L=any> {
    fetchRowListPage(): Observable<L>    
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
export class ListAttachmentsComponent extends RowListBase<{},TableRow> {
    @Input() rowListProvider: AttachmentRowListProvider<TableRow>
    @Input() canDelete = true
    @Input() showPagination = false

    DATE_FORMATS = DATE_FORMATS
    columns = [ 'attachmentTypeCode', 'fileName', 'sourceObjectNameCode', 'uploadedBy', 'uploadedTimestamp', 'description', 'download' ]

    initializeRowList(): void {
        super.initializeRowList()
    }

    get initialPageState(): RowListState<{}> {
        return {
            filter: {},
            pageSize: 5,
            pageNumber: 1,
            sortActive: null,
            sortDirection: 'desc',
        }
    }

    ngAfterViewInit() {
        if ( this.canDelete )
            this.columns.push( 'delete' )
        
        super.ngAfterViewInit()
    }

    fetchRowListPage(): Observable<any> {
        if ( !this.rowListProvider?.fetchRowListPage ) throw Error( 'no provider' )

        return this.rowListProvider.fetchRowListPage()
    }
    
    displayRowListPage( res: any ): LoadRowListResult<TableRow> {
        if ( !this.rowListProvider?.displayRowListPage ) throw Error( 'no provider' )

        return this.rowListProvider.displayRowListPage( res )
    }

    onDownloadClick( item: TableRow ) {
        if ( !this.rowListProvider?.downloadItem ) throw Error( 'no provider' )

        return this.rowListProvider.downloadItem( item )
    }

    onDeleteClick( item: TableRow ) {
        if ( !this.rowListProvider?.deleteItem ) throw Error( 'no provider' )
        
        return this.rowListProvider.deleteItem( item )
    }
}
