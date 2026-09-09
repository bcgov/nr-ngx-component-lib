import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ElementRef,
    QueryList,
    ViewChildren,
    ViewChild
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";
import { ButtonComponent } from '../button/button.component';

export interface MenuItem {
    label: string;
    href?: string;
    target?: string;
    icon?: string;
    external?: boolean;
}

export interface MenuTrigger {
    label?: string;
    icon?: string;
}

@Component({
    selector: "nrcl-menu",
    templateUrl: "./menu.component.html",
    styleUrl: "./menu.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent extends NrclBase {
    @ViewChildren('menuItem')
    menuItems!: QueryList<ElementRef<HTMLAnchorElement>>;

    @ViewChild('menuTrigger')
    menuTriggerComponent!: ButtonComponent;

    @Input() items: MenuItem[] = [];

    @Input()
    trigger: MenuTrigger = {
        label: 'Menu',
        icon: 'menu'
    };

    isOpen = false;

    menuId = 'nrcl-menu';
    triggerId = 'nrcl-menu-trigger';

    toggleMenu(): void {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            setTimeout(() => {
                this.menuItems.first?.nativeElement.focus();
            });
        }
    }

    closeMenu(): void {
        this.isOpen = false;

        setTimeout(() => {
            this.menuTriggerComponent?.focus();
        });
    }

    onMenuKeyDown(event: KeyboardEvent): void {

        const items = this.menuItems.toArray();

        const current =
            items.findIndex(
                item => item.nativeElement === document.activeElement
            );

        if (event.key === 'ArrowDown') {

            event.preventDefault();

            const next = (current + 1) % items.length;

            items[next].nativeElement.focus();
        }

        if (event.key === 'ArrowUp') {

            event.preventDefault();

            const previous =
                current <= 0
                    ? items.length - 1
                    : current - 1;

            items[previous].nativeElement.focus();
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeMenu();
        }

        if (
            event.key === 'Tab' &&
            !event.shiftKey &&
            current === items.length - 1
        ) {
            this.isOpen = false;
        }

        if (
            event.key === 'Tab' &&
            event.shiftKey &&
            current === 0
        ) {
            this.isOpen = false;
        }
    }

}