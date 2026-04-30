import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ContentChildren, ElementRef, inject, Input, QueryList } from '@angular/core';
import { NrclBase } from '../../../directives/nrcl.base';
import { TabComponent } from '../tab/tab.component';

@Component( {
    selector: 'nrcl-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrl: './tab-group.component.scss',
} )
export class TabGroupComponent extends NrclBase {
    // @Input() tooltip
    // @Input() content
    
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    // tooltipContent

    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

}
