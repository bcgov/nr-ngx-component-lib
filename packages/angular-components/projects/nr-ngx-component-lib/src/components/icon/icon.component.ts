import { AfterContentInit, booleanAttribute, Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SafeHtml } from '@angular/platform-browser';
import { NrclBase } from '../../directives/nrcl.base';
import { IconService } from '../../services/icon.service';

@Component( {
    selector: 'nrcl-icon',
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss',
    host: {
        '[class.show-icon]': '!svg',
        '[class.show-svg]': '!!svg',
        '[class.small]': 'small',
        '[class.normal]': '( !small && !large ) || ( small && large )',
        '[class.large]': 'large',
        '[class.filled]': 'fill',
        '[class.unfilled]': '!fill',
    },
    imports: [
        MatIconModule
    ]
} )
export class IconComponent extends NrclBase implements AfterContentInit {   
    iconService = inject( IconService )

    @Input( { transform: booleanAttribute } ) small = false
    @Input( { transform: booleanAttribute } ) large = false
    @Input( { transform: booleanAttribute } ) fill = true

    svg?: SafeHtml

    ngAfterContentInit(): void {
        let name: string = this.elementRef?.nativeElement?.textContent?.trim();
        if ( this.iconService.isIcon( name ) ) this.svg = this.iconService.getIcon( name )
    }
}
