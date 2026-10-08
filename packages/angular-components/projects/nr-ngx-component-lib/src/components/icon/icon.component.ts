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
    icon?: string

    ngAfterContentInit(): void {
        let text: string = this.elementRef?.nativeElement?.textContent?.trim();

        if ( !text.includes( ';' ) ) {
            this.showIcon( text )
            return
        }

        try {
            let nameConfig = text.split( ';' )

            let cfg = JSON.parse( nameConfig[ 1 ] )           
            if ( 'fill' in cfg ) this.fill = cfg.fill
            if ( 'large' in cfg ) this.large = cfg.large
            if ( 'small' in cfg ) this.small = cfg.small

            this.showIcon( nameConfig[ 0 ].trim() )
        }
        catch ( e ) {
            console.error( `Unable to parse icon config: '${ text }'`, e )
            this.showIcon( '__missing__' )
        }
    }

    showIcon( name: string ) {
        if ( this.iconService.isIcon( name ) ) {
            this.svg = this.iconService.getIcon( name )
            this.icon = undefined
        }
        else {
            this.icon = name
            this.svg = undefined
        }
    }
}
