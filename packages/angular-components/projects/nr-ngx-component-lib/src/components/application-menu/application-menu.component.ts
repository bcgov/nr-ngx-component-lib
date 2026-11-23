import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { ConfigurationSubscriberBase } from "../../directives/configuration-subscriber.base";

export interface MenuItem {
    id: string
    label: string;
    icon?: string;
}

@Component({
    selector: "nrcl-application-menu",
    templateUrl: "./application-menu.component.html",
    styleUrl: "./application-menu.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationMenuComponent extends ConfigurationSubscriberBase {
    @Input() label?: string
    @Input() icon = 'menu'
    @Input() items: MenuItem[] = [];
    @Input() currentItemId?: string

    @Output() menuItemClick = new EventEmitter<string>()

    onMenuItemClick( item: MenuItem ) {
        this.menuItemClick.emit( item.id )
    }
}