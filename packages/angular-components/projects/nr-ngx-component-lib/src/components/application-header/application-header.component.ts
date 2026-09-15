import {
    ChangeDetectionStrategy,
    Component,
    Input
} from "@angular/core";
import { NrclBase } from '../../directives/nrcl.base';

import { MenuItem, MenuTrigger } from '../menu/menu.component';

@Component({
    selector: "nrcl-application-header",
    templateUrl: "./application-header.component.html",
    styleUrl: "./application-header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationHeaderComponent extends NrclBase{
    @Input() title = "";
    @Input() logoAriaLabel = "";
    @Input() skipLabel = "";

    // @Input() skipLinksEnabled = false;

    // @Input() showMenu = false;

    // @Input() homeUrl = "/";

    // @Input() skipLinkTarget = "";



    // @Input() logoSrc = "";

    // @Input() logoAlt = "";


    // @Input() menuItems: MenuItem[] = [];

    // @Input()
    // menuTrigger: MenuTrigger = {
    //     label: 'Menu',
    //     icon: 'menu'
    // };
    
}