import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Input,
    Output
} from "@angular/core";

export type RowListPaginationWidth = 'sufficient'|'tight'|'restrictive'

@Component({
    selector: "nrcl-row-list-pagination",
    templateUrl: "./row-list-pagination.component.html",
    styleUrl: "./row-list-pagination.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.width-sufficient]': "componentWidth == 'sufficient'",
        '[class.width-tight]': "componentWidth == 'tight'",
        '[class.width-restrictive]': "componentWidth == 'restrictive'",
    }
})
export class RowListPaginationComponent implements AfterViewInit {
    @Input() paginationId = '1'
    @Input() pageSizeOptions = [ 
        { code: 5,   description: '5 Rows' },
        { code: 10,  description: '10 Rows' },
        { code: 20,  description: '20 Rows' },
        { code: 50,  description: '50 Rows' },
        { code: 100, description: '100 Rows' },
    ]
    @Input() pageSize = 20
    @Input() pageNumber
    @Input() rowCount
    @Input() showPageSize = true 

    @Output() pageSizeChange = new EventEmitter<number>();
    @Output() pageNumberChange = new EventEmitter<number>();

    componentWidth: RowListPaginationWidth = 'sufficient'
    paginationMaxSize = 5

    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )
    
    ngAfterViewInit(): void {
        this.checkWidth()
    }
    
    onPageSizeChange( ev ) {        
        this.pageSizeChange.emit( Number( ev ) )
    }

    onPageNumberChange( ev ) {
        this.pageNumberChange.emit( Number( ev ) )
    }

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        this.checkWidth()
    }

    checkWidth() {
        setTimeout( () => {
            let w = this.elementRef?.nativeElement.offsetWidth            
            if ( !w ) return

            switch ( true ) {
                case w > 600: 
                    this.componentWidth = 'sufficient'
                    this.paginationMaxSize = 5
                    break

                case w > 500: 
                    this.componentWidth = 'tight'; 
                    this.paginationMaxSize = 3
                    break

                default: 
                    this.componentWidth = 'restrictive'
                    this.paginationMaxSize = 4
            }

            this.changeDetectorRef.detectChanges()
        } )
    }

    get pageCount() {
        if ( !this.hasRows ) return 0
        return Math.ceil( this.rowCount / this.pageSize )
    }

    get firstRow() {
        if ( !this.hasRows ) return 0
        return ( Math.min( this.pageCount, this.pageNumber ) - 1 ) * this.pageSize + 1
    }

    get lastRow() {
        if ( !this.hasRows ) return 0
        return Math.min( this.firstRow + this.pageSize - 1, this.rowCount )
    }

    get hasRows() {
        return this.rowCount && this.pageSize
    }
}
