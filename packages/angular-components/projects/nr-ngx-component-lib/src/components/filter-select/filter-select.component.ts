import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    numberAttribute,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelectionListChange } from "@angular/material/list";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";
import { CodeDescription } from "../../utils/code-table.util";
import { NrclBase } from "../../directives/nrcl.base";


/**
 * A filter select component that allows users to select multiple options from a list.
 *
 * Features:
 * - Multi-select with optional maximum selection limit
 * - Search/filter functionality
 * - Tooltips for long descriptions
 * - Summary display of selected items
 */
@Component( {
    selector: "nrcl-filter-select",
    templateUrl: "./filter-select.component.html",
    styleUrl: "./filter-select.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.has-value]': "hasValue",
        '[class.is-open]': "isOpen",
        '[class.is-closed]': "!isOpen",
        '[class.use-filter]': "filter",
    }
} )
export class FilterSelectComponent extends NrclBase implements OnInit, OnChanges, OnDestroy {
    @Input() label
    @Input() placeholder = 'Filter...'
    @Input() hint
    @Input() options: CodeDescription[]
    @Input() value: string[]
    @Input( { transform: numberAttribute } ) selectMax = 0
    @Input( { transform: booleanAttribute } ) tooltips = true
    @Input( { transform: booleanAttribute } ) summary = true
    @Input( { transform: booleanAttribute } ) clear = true
    @Input( { transform: booleanAttribute } ) filter = true
    @Input( { transform: numberAttribute } ) filterCharsMin = 0
    @Input() optionFormatter: ( option: CodeDescription, plaintext: boolean ) => string = ( o, p ) => o.description

    @Output() valueChange = new EventEmitter<string[]>();

    floatLabel = 'auto'
    inputValue
    openingValue
    isFiltered = false
    isOpen = false
    hasValue = false
    overlayRef: OverlayRef
    selection = new FormControl()
    match: ( option: CodeDescription ) => boolean = ( o ) => true
    clickSubscription

    changeDetectorRef = inject( ChangeDetectorRef )
    overlay = inject( Overlay )
    viewContainerRef = inject( ViewContainerRef )

    @ViewChild( 'trigger', { read: ElementRef } ) trigger!: ElementRef
    @ViewChild( 'filterInput' ) filterInput!: ElementRef
    @ViewChild( 'overlayTemplate' ) overlayTemplate!: TemplateRef<any>

    ngOnInit(): void {
        super.ngOnInit()

        this.clickSubscription = fromEvent<MouseEvent>( document, 'click' )
            .pipe( filter( ( event: MouseEvent ) => {
                const clickTarget = event.target as HTMLElement
                const triggerEl = this.trigger.nativeElement
                const overlayEl = this.overlayRef?.overlayElement

                // console.log(triggerEl,overlayEl)
                // Only close if click is outside both trigger and overlay
                return !triggerEl?.contains(clickTarget)
                    && !overlayEl?.contains(clickTarget)
            } ) )
            .subscribe( () => {
                // console.log('outside click')
                this.close()
                this.setInputToSelection()
                this.floatLabel = 'auto'
                this.changeDetectorRef.detectChanges()
            } )
    }

    ngOnChanges( changes: SimpleChanges ): void {
        if ( this.isOpen ) return

        if ( changes.options ) {
            let pv = JSON.stringify( changes.options.previousValue )
            let cv = JSON.stringify( changes.options.currentValue )
            if ( pv != cv ) {
                this.selection.setValue( null )
                this.setInputToSelection()
                this.setFilter()
            }
        }

        if ( changes.value ) {
            let pv = JSON.stringify( changes.value.previousValue )
            let cv = JSON.stringify( changes.value.currentValue )
            if ( pv != cv ) {
                if ( this.value ) {
                    this.hasValue = this.value.length > 0
                    this.selection.setValue( this.value )
                    if ( this.selectMax > 1 && this.value.length >= this.selectMax ) {
                        this.selection.disable()
                    }
                    else {
                        this.selection.enable()
                    }
                }
                else {
                    this.hasValue = false
                    this.selection.setValue( null )
                    this.selection.enable()
                }

                this.setFilter()
                this.setInputToSelection()
                this.changeDetectorRef.detectChanges()
            }
        }
    }

    ngOnDestroy(): void {
        this.clickSubscription?.unsubscribe()
    }

    get single() {
        return this.selectMax == 1
    }

    emitValueChange() {
        this.hasValue = ( this.selection.value || [] ).length > 0
        this.valueChange.emit( this.selection.value || [] )
    }

    open() {
        // console.log('open',this.isOpen,this.filterCharsMin && !this.isFiltered)
        if ( this.isOpen ) return

        if ( this.filterCharsMin && !this.isFiltered ) return

        this.isOpen = true

        // Create overlay
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo( this.trigger )
            .withPositions( [
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: 0
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetY: 0
                }
            ] )
            .withPush( false )

        const scrollStrategy = this.overlay.scrollStrategies.reposition()

        this.overlayRef = this.overlay.create( {
            positionStrategy,
            scrollStrategy,
            hasBackdrop: false,
            maxWidth: this.trigger.nativeElement.offsetWidth * 2,
            minWidth: this.trigger.nativeElement.offsetWidth,
            maxHeight: 300,
        } )

        // Attach template
        const portal = new TemplatePortal( this.overlayTemplate, this.viewContainerRef )
        this.overlayRef.attach( portal )

        // Focus input after overlay is attached
        setTimeout( () => {
            this.filterInput?.nativeElement.focus();

            // prevent list from scrolling when selection changes            
            this.overlayRef?.overlayElement.children[0].scroll( 0, 1 )
        },100 )

        this.openingValue = JSON.stringify( this.selection.value )
    }

    close() {
        // console.log('close',this.isOpen)
        if ( !this.isOpen ) return

        this.isOpen = false

        if ( this.overlayRef ) {
            this.overlayRef.dispose()
            this.overlayRef = null
        }

        this.changeDetectorRef.detectChanges()

        let closingValue = JSON.stringify( this.selection.value )
        if ( this.openingValue != closingValue )
            this.emitValueChange()
    }

    setInputToSelection() {
        this.inputValue = this.selection?.value?.map( c => this.optionFormatter( this.optionForCode( c ), true ) ).join( ', ' ) || null
        this.isFiltered = false
    }

    onInput( ev?) {
        this.setFilter( ev?.target?.value )
    }

    setFilter( text?: string ) {
        let t = text?.trim().toLowerCase()

        if ( t?.length >= this.filterCharsMin ) {
            // console.log('filtering')
            this.isFiltered = true
            this.match = ( option ) => option.description.toLowerCase().includes( t )

            if ( this.filterCharsMin ) this.open()
        }
        else {
            // console.log('not filtering')
            this.isFiltered = false
            this.match = ( o ) => true

            if ( this.filterCharsMin ) this.close()
        }

        this.changeDetectorRef.detectChanges()
    }

    matchesFilter( option: CodeDescription ) {
        return this.match( option )
    }

    onSelectionChange( ev ) {
        if ( this.single ) {
            this.close()
            this.setInputToSelection()
            this.floatLabel = 'auto'
        }
        else {
            this.filterInput?.nativeElement.focus()
        }

        if ( this.selectMax > 1 ) {
            if ( this.selection.value.length >= this.selectMax ) {
                this.selection.disable()
            }
            else {
                this.selection.enable()
            }
        }

        this.changeDetectorRef.detectChanges()
    }

    onUpperSelectionChange( ev: MatSelectionListChange ) {
        setTimeout(() => {
            let codes = this.selection.value.filter( c => c != ev.options[ 0 ].value )
            this.selection.setValue( codes )

            this.onSelectionChange( ev )
        })
    }

    onCancelClick() {
        this.selection.setValue( null )
        this.selection.enable()
        this.setInputToSelection()
        this.emitValueChange()
    }

    onInputFocus() {
        // console.log('onInputFocus')
        this.floatLabel = 'always'

        if ( this.filter ) {
            this.inputValue = ''
            this.setFilter()
        }

        this.open()
    }

    onCloseClick() {
        this.close()
    }

    descriptionForCode( code: string ): string {
        return this.options.find( o => o.code == code )?.description
    }

    optionForCode( code: string ): CodeDescription {
        return this.options.find( o => o.code == code )
    }

    formatOption( option: CodeDescription ): string {
        return this.optionFormatter( option, false )
    }
}
