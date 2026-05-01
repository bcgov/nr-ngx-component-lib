import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ContentChildren, ElementRef, inject, Input, OnChanges, QueryList, SimpleChanges } from '@angular/core';
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
export class TabGroupComponent extends NrclBase implements OnChanges,AfterContentInit {
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    // @Input() tooltip
    // @Input() content
    @Input( { transform: booleanAttribute } ) standard = false
    @Input( { transform: booleanAttribute } ) classic = false
    
    isStandard
    isClassic

    // tooltipContent

    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

    ngOnChanges( changes: SimpleChanges ): void {
        this.updateState()
    }

    ngAfterContentInit() {
        this.tabs.forEach( t => console.log(t.content))
        this.tabs.forEach( t => console.log(t.labelTemplate))
    }

    updateState() {
        this.isStandard = this.standard && !this.classic
        this.isClassic = this.classic && !this.standard
    }

}
