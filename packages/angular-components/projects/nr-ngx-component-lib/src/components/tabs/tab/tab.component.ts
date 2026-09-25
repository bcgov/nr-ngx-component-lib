import { booleanAttribute, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, inject, Input, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NrclBase } from '../../../directives/nrcl.base';

@Directive( {
    selector: '[nrclTabLabel]',
    standalone: false
} )
export class TabLabelDirective {
    constructor(
        public template: TemplateRef<any>
    ){}
}

// ================================================================================

@Directive( {
    selector: '[nrclTabContent]',
    standalone: false
} )
export class TabContentDirective {
    constructor(
        public template: TemplateRef<any>
    ){}
}

// ================================================================================

@Component( {
    selector: 'nrcl-tab',
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
} )
export class TabComponent extends NrclBase {
    elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() name?: string
    @Input() label?: string
    @Input( { transform: booleanAttribute } ) disabled = false

    @ContentChild( TabLabelDirective ) labelTemplate?: TabLabelDirective
    @ContentChild( TabContentDirective ) contentTemplate?: TabContentDirective
    @ViewChild( 'content', { static: true } ) content!: TemplateRef<any>
}
