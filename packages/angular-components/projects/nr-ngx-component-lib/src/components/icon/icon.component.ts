import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ElementRef, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NrclBase } from '../../directives/nrcl.base';

@Component( {
    selector: 'nrcl-icon',
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss',
    host: {
        '[class.show-icon]': '!svg',
        '[class.show-svg]':  '!!svg',
        '[class.small]':  'small',
        '[class.normal]':  '( !small && !large ) || ( small && large )',
        '[class.large]':  'large',
    }
} )
export class IconComponent extends NrclBase implements AfterContentInit {   
    @Input( { transform: booleanAttribute } ) small = false
    @Input( { transform: booleanAttribute } ) large = false

    name: keyof( typeof ICON )
    svg: SafeHtml

    elementRef = inject( ElementRef )
    domSanitizer = inject( DomSanitizer )    

    ngAfterContentInit(): void {
        this.name = this.elementRef?.nativeElement?.textContent
        if ( ICON[ this.name ] ) this.svg = this.domSanitizer.bypassSecurityTrustHtml( ICON[ this.name ] )
    }
}

const ICON = {
    'clear-filters': `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 -7.934265 133.15887 133.15887" height="100%" width="100%">
            <g transform="translate(-34.473864,-66.676034)">
                <g>
                    <g>
                        <path d="M 94.473677,137.49393 34.473864,66.783005 34.564632,66.676034 H 154.38314 l 0.0907,0.106971 z" />
                        <rect y="129.02737" x="88.416046" height="45.357258" width="12.115609" />
                    </g>
                    <rect width="29.482143" height="76.351196" x="79.73278" y="107.61517" />
                </g>
                <g transform="translate(500.06128,136.57473)">
                    <rect width="14.363094" height="49.892857" x="-249.284" y="235.20406" transform="rotate(45)" />
                    <rect width="14.363095" height="49.892857" x="-267.59927" y="-266.99539" transform="rotate(-45)" />
                </g>
            </g>
        </svg>
    `
}