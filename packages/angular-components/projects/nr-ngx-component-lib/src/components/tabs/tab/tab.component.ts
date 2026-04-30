import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ElementRef, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { NrclBase } from '../../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-tab',
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss',
} )
export class TabComponent extends NrclBase {
    // @Input() tooltip
    // @Input() content
    
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    // tooltipContent

    @ViewChild('label') label!: TemplateRef<any>;    
    @ViewChild('content') content!: TemplateRef<any>;    
}
