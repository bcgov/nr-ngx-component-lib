import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component( {
    selector: "nrcl-filter-search",
    templateUrl: "./filter-search.component.html",
    styleUrl: "./filter-search.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.has-value]': "hasValue",
        '[style.--nrcl-filter-search-width]': 'this.wide ? "var( --nrcl-filter-width-" + this.wide + " )" : null'
    }
} )
export class FilterSearchComponent extends NrclBase {
    @Input() label = 'Search'
    @Input() placeholder = 'Search...'
    @Input() hint
    @Input() value: string
    @Input() wide 

    @Output() valueChange = new EventEmitter<string>();

    @ViewChild( 'input' ) inputEl: ElementRef

    hasValue = false
    changeDetectorRef = inject( ChangeDetectorRef )

    emitValueChange( val? ) {
        this.hasValue = !!val
        this.valueChange.emit( val )
    }

    onInput( ev ) {
        this.value = ev?.target?.value
        this.emitValueChange( ev?.target?.value )
    }

    onCancelClick() {
        this.value = null
        this.emitValueChange()
    }

    focus() {
        this.inputEl.nativeElement.focus()
    }
}
