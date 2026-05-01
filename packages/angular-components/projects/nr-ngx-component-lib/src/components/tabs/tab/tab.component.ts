import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { NrclBase } from '../../../directives/nrcl.base';

@Directive( {
    selector: '[nrclTabLabel]'
} )
export class TabLabelDirective {
    constructor(
        public template: TemplateRef<any>
    ){}
}


@Component( {
    selector: 'nrcl-tab',
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss',
} )
export class TabComponent extends NrclBase {
    // @Input() tooltip
    @Input() label
    
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    // tooltipContent

    // @ViewChild('label') labelTemplate!: TemplateRef<any>;    
    @ViewChild('content',{static:true}) content!: TemplateRef<any>;    
    @ContentChild( TabLabelDirective ) labelTemplate?: TabLabelDirective
}
