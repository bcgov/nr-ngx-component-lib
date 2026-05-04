import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, inject, Input, OnChanges, Output, QueryList, SimpleChanges } from '@angular/core';
import { NrclBase } from '../../../directives/nrcl.base';
import { TabComponent } from '../tab/tab.component';

@Component( {
    selector: 'nrcl-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrl: './tab-group.component.scss',
    host: {
        '[class.look-standard]': 'isStandard',
        '[class.look-classic]': 'isClassic',
    }
} )
export class TabGroupComponent extends NrclBase implements OnChanges {
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input( { transform: booleanAttribute } ) standard = false
    @Input( { transform: booleanAttribute } ) classic = false
    @Input() selectedTab = -1

    @Output() selectedTabChange = new EventEmitter<{ index: number, name?: string }>()

    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

    isStandard = false
    isClassic = false

    ngOnChanges( changes: SimpleChanges ): void {
        console.log(changes)
        this.updateState()
    }

    updateState() {
        this.isStandard = this.standard && !this.classic
        this.isClassic = this.classic && !this.standard
    }

    onSelectedIndexChange( index: number ) {
        let t = this.tabs.get( index )
        this.selectedTabChange.emit( { index, name: t?.name } )
    }
}
