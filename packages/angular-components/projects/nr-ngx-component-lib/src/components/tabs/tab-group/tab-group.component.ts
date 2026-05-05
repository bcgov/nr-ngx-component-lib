import { AfterViewInit, booleanAttribute, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, inject, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup, MatTabGroupBaseHeader } from '@angular/material/tabs';
import { NrclBase } from '../../../directives/nrcl.base';
import { TabComponent } from '../tab/tab.component';

export type ActivateTabEvent = {
    tab: number,
    name?: string,
    cancel: ( shouldCancel: Promise<boolean> ) => void
}

@Component( {
    selector: 'nrcl-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrl: './tab-group.component.scss',
    host: {
        '[class.look-standard]': 'isStandard',
        '[class.look-classic]': 'isClassic',
    }
} )
export class TabGroupComponent extends NrclBase implements OnChanges, AfterViewInit {
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input( { transform: booleanAttribute } ) standard = false
    @Input( { transform: booleanAttribute } ) classic = false
    @Input() selectedTab = -1

    @Output() selectedTabChange = new EventEmitter<{ index: number, name?: string }>()
    @Output() activateTab = new EventEmitter<ActivateTabEvent>()

    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

    isStandard = false
    isClassic = false

    ngOnChanges( changes: SimpleChanges ): void {
        console.log(changes)
        this.updateState()
    }

    ngAfterViewInit() {
        let self = this

        this.tabGroup._handleClick = ( function ( inner ) {
            return function ( tab: MatTab, tabHeader: MatTabGroupBaseHeader, index: number ) {
                console.log(index)
                //    return inner.call( this, tab, tabHeader, index )
                if ( index == self.tabGroup.selectedIndex ) return

                let shouldCancel = Promise.resolve( false )
                let activate: ActivateTabEvent = { 
                    tab: index, 
                    name: self.tabs.get( index )?.name,
                    cancel: ( should: Promise<boolean> ) => { shouldCancel = should }
                }

                self.activateTab.emit( activate )

                shouldCancel.then( cancel => {
                    if ( cancel ) return
                        
                    inner.call( this, tab, tabHeader, index )
                    // self.changeDetectorRef.detectChanges()
                } )
            }
        } )( this.tabGroup._handleClick )
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
