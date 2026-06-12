import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
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
import { DomSanitizer } from "@angular/platform-browser";
import { fromEvent, Observable, Subscription } from "rxjs";
import { NrclBase } from "../../directives/nrcl.base";
import { CodeDescription } from "../../utils/code-table.util";

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
        '[style.--nrcl-filter-select-width]': 'this.wide ? "var( --nrcl-filter-width-" + this.wide + " )" : null'
    }
} )
export class FilterSelectComponent extends NrclBase implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    changeDetectorRef = inject( ChangeDetectorRef )
    overlay = inject( Overlay )
    viewContainerRef = inject( ViewContainerRef )
    domSanitizer = inject( DomSanitizer )

    @ViewChild( 'trigger', { read: ElementRef } ) trigger!: ElementRef
    @ViewChild( 'filterInput' ) filterInput!: ElementRef
    @ViewChild( 'overlayTemplate' ) overlayTemplate!: TemplateRef<any>
    @ViewChild( 'defaultOptionTemplateRef' ) defaultOptionTemplateRef!: TemplateRef<any>

    @ContentChild( TemplateRef ) optionTemplateRef: TemplateRef<any>;

    @Input() label?: string
    @Input() placeholder = 'Filter...'
    @Input() hint?: string
    @Input() options: CodeDescription[] = []
    @Input() value: string[] = []
    @Input( { transform: numberAttribute } ) selectMax = 0
    @Input( { transform: booleanAttribute } ) tooltips = true
    @Input( { transform: booleanAttribute } ) summary = true
    @Input( { transform: booleanAttribute } ) clear = true
    @Input( { transform: booleanAttribute } ) filter = true
    @Input( { transform: numberAttribute } ) filterCharsMin = 0
    @Input() optionFormatter: ( option: CodeDescription, plaintext: boolean ) => string = ( o, p ) => o.description    
    @Input() optionTemplate?: TemplateRef<any> 
    @Input() overlayClass?: string
    @Input() wide?: string 
    @Input() filterCharsMinMessage = 'Too many options'

    @Output() valueChange = new EventEmitter<string[]>();

    floatLabel = 'auto'
    inputValue?: string
    openingValue?: string
    isFiltered = false
    isOpen = false
    hasValue = false
    overlayRef?: OverlayRef
    selection = new FormControl()
    match: ( option: CodeDescription ) => boolean = ( o ) => true
    clickSubscription?: Subscription

    ngOnInit(): void {
        super.ngOnInit()

        this.clickSubscription = fromEvent<MouseEvent>( document, 'click' )
            .subscribe( ( event: MouseEvent ) => {
                const clickTarget = event.target as HTMLElement
                const triggerEl = this.trigger.nativeElement
                const overlayEl = this.overlayRef?.overlayElement

                // console.log(this.label,'target',clickTarget)
                // console.log(this.label,'triggerEl',triggerEl?.contains(clickTarget),triggerEl)
                // console.log(this.label,'overlayEl',overlayEl?.contains(clickTarget),overlayEl)

                // Only close if click is outside both trigger and overlay
                if ( triggerEl?.contains(clickTarget) ) return 
                if ( !overlayEl ) return 
                if ( overlayEl?.contains(clickTarget) ) return 

                // console.log(this.label,'outside click')
                this.close()
                this.setInputToSelection()
                this.floatLabel = 'auto'
                this.changeDetectorRef.markForCheck()
            } )
    }

    ngOnChanges( changes: SimpleChanges ): void {
        if ( this.isOpen ) return

        if ( changes.options ) {
            let pv = JSON.stringify( changes.options.previousValue )
            let cv = JSON.stringify( changes.options.currentValue )
            // console.log(this.label,'options',cv,'change?',pv != cv)
            if ( pv != cv ) {
                // this.value = []
                let vals = this.selection.value 
                if ( vals ) {
                    // console.log(vals,this.options)
                    this.setValue( vals )
                    // this.selection.setValue( vals.filter( v => this.options.some( o => o.code == v ) ) )
                    // this.emitValueChange()
                    // console.log(this.selection.value )
                }
                this.setInputToSelection()
                this.setFilter()
            }
        }

        if ( changes.value ) {
            let pv = JSON.stringify( changes.value.previousValue )
            let cv = JSON.stringify( changes.value.currentValue )
            // console.log(this.label,'value',cv)
            // if ( pv != cv ) {
                if ( this.value ) {
                    // this.hasValue = this.value.length > 0
                    this.setValue( this.value )

                    // this.selection.setValue( this.value.filter( v => this.options.some( o => o.code == v ) ) )
                    // this.emitValueChange()
                    // this.selection.setValue( this.value )                    
                    // if ( this.selectMax > 1 && this.value.length >= this.selectMax ) {
                    //     this.selection.disable()
                    // }
                    // else {
                    //     this.selection.enable()
                    // }
                }
                else {
                    this.setValue( [] )
                    // this.hasValue = false
                    // this.selection.setValue( [] ) //null )
                    // this.emitValueChange()
                    // this.selection.enable()
                }

                this.setFilter()
                this.setInputToSelection()
                this.changeDetectorRef.detectChanges()
            // }
        }
    }

    ngAfterViewInit(): void {
        if ( !this.optionTemplate ) {
            if ( this.optionTemplateRef ) {
                this.optionTemplate = this.optionTemplateRef
            }
            else {
                this.optionTemplate = this.defaultOptionTemplateRef
            }
        }
    }

    ngOnDestroy(): void {
        // console.log('destroy',this.inst)
        this.clickSubscription?.unsubscribe()
    }

    get single() {
        return this.selectMax == 1
    }

    setValue( value: string[] ) {
        // console.warn(this.label,value)
        let old = JSON.stringify( this.selection.value )
        this.selection.setValue( value.filter( v => this.options.some( o => o.code == v ) ) )
        let mod = JSON.stringify( this.selection.value )
        // console.log(this.label,old,mod,this.options.map(o=>o.code))

        if ( old == mod ) return

        let count = this.selection.value.length
        this.hasValue = count > 0
        if ( this.selectMax > 1 && count >= this.selectMax ) {
            this.selection.disable()
        }
        else {
            this.selection.enable()
        }

        // console.log(this.label,'emitValueChange',mod)
        this.valueChange.emit( this.selection.value )
    }

    emitValueChange() {
        this.hasValue = ( this.selection.value || [] ).length > 0
        // console.log('emitValueChange',JSON.stringify(this.selection.value || []))
        this.valueChange.emit( this.selection.value || [] )
    }

    open() {
        // console.warn('open',this.isOpen)
        if ( this.isOpen ) return

        this.isOpen = true
        this.changeDetectorRef.markForCheck()

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
        // console.warn('close',this.isOpen)
        if ( !this.isOpen ) return

        this.isOpen = false

        if ( this.overlayRef ) {
            this.overlayRef.dispose()
            this.overlayRef = null
        }

        this.changeDetectorRef.detectChanges()

        let closingValue = JSON.stringify( this.selection.value )
        // console.log(this.openingValue,closingValue)
        if ( this.openingValue != closingValue )
            this.emitValueChange()
    }

    setInputToSelection() {
        // console.warn('setInputToSelection')
        this.inputValue = this.selection?.value?.map( c => this.optionFormatter( this.optionForCode( c ), true ) ).join( ', ' ) || ''
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
        }
        else {
            // console.log('not filtering')
            this.isFiltered = false
            this.match = ( o ) => true
        }

        this.changeDetectorRef.detectChanges()
    }

    matchesFilter( option: CodeDescription ) {
        return this.match( option )
    }

    onSelectionChange( ev ) {
        // console.log('onSelectionChange',this.single)
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
        // console.log('onCancelClick')
        // this.selection.setValue( [] )//null )
        this.setValue( [] )
        // this.selection.enable()
        this.setInputToSelection()
        // this.emitValueChange()
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
        // console.log('onCloseClick')
        this.close()
        this.setInputToSelection()
        this.floatLabel = 'auto'
        this.changeDetectorRef.detectChanges()
    }

    descriptionForCode( code: string ): string {
        return this.options.find( o => o.code == code )?.description
    }

    optionForCode( code: string ): CodeDescription {
        return this.options.find( o => o.code == code )
    }

    get isClosedNoSelection() {
        return !this.isOpen && !( this.selection?.value?.length > 0 && this.clear )
    }

    get isClosedSelection() {
        return !this.isOpen && this.selection?.value?.length > 0 && this.clear
    }
}
