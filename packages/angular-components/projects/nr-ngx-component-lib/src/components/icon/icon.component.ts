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
    `,
    'user-clock': `
        <!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M496 224c-79.6 0-144 64.4-144 144s64.4 144 144 144 144-64.4 144-144-64.4-144-144-144zm64 150.3c0 5.3-4.4 9.7-9.7 9.7h-60.6c-5.3 0-9.7-4.4-9.7-9.7v-76.6c0-5.3 4.4-9.7 9.7-9.7h12.6c5.3 0 9.7 4.4 9.7 9.7V352h38.3c5.3 0 9.7 4.4 9.7 9.7v12.6zM320 368c0-27.8 6.7-54.1 18.2-77.5-8-1.5-16.2-2.5-24.6-2.5h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h347.1c-45.3-31.9-75.1-84.5-75.1-144zm-96-112c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128z" />
        </svg>
    `,
    'roster': `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M120-180v-600q0-24.75 17.625-42.375T180-840h600q24.75 0 42.375 17.625T840-780v600q0 24.75-17.625 42.375T780-120H180q-24.75 0-42.375-17.625T120-180Zm60-440h600v-160H180v160Zm220 220h160v-160H400v160Zm0 220h160v-160H400v160ZM180-400h160v-160H180v160Zm440 0h160v-160H620v160ZM180-180h160v-160H180v160Zm440 0h160v-160H620v160Z" />
        </svg>
    `
}