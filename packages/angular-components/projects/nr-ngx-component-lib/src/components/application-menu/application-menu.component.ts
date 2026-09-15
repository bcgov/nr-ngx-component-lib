import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ElementRef,
    QueryList,
    ViewChildren,
    ViewChild,
    inject,
    ChangeDetectorRef,
    AfterViewInit,
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";
import { ButtonComponent } from '../button/button.component';
import { MatMenu } from "@angular/material/menu";
import { ChangeDetectionService } from "storybook/internal/core-server";

@Component({
  selector: '[nrcl-menu-item]', // Notice the square brackets for attribute selection
//   standalone: true,
//   imports: [MatMenuModule, MatIconModule],
  template: `
    <nrcl-button tertiary style="--nrcl-button-width: 100%" class="item"
        [label]="label"
        [icon]="icon || 'empty'"
    ></nrcl-button>
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .menu-shortcut {
      opacity: 0.5;
      margin-left: auto;
      padding-left: 16px;
    }
  `]
})
export class ApplicationMenuItemComponent {
  @Input() label: string = 'foo';
  @Input() icon: string = 'menu';
}


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
    selector: "nrcl-application-menu",
    templateUrl: "./application-menu.component.html",
    styleUrl: "./application-menu.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationMenuComponent extends NrclBase implements AfterViewInit {
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() label?: string
    @Input() icon = 'menu'
    @Input() items: MenuItem[] = [];

    @ViewChildren('.item') menuItems!: QueryList<ElementRef>;
    @ViewChild('menuTrigger') menuTriggerComponent!: ButtonComponent;
    @ViewChild(MatMenu) menu!: MatMenu
0
    isOpen = false;
    menuId = 'nrcl-menu';
    triggerId = 'nrcl-menu-trigger';

    ngOnInit(): void {
        super.ngOnInit()

    }

    ngAfterViewInit(): void {
        // this.menuItems.changes.subscribe( query => {            
        //     console.log(query.toArray())
        // } )
    }

    toggleMenu(): void {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            setTimeout(() => {
                this.menuItems.first?.nativeElement.focus();
            });
        }
    }

    onMenuItemClick(): void {
        this.isOpen = false;
    }

    closeMenu(): void {
        this.isOpen = false;

        setTimeout(() => {
            this.menuTriggerComponent?.focus();
        });
    }

    onMenuOpened() {
        console.log('onMenuOpened')
        setTimeout(() => {
            // this.changeDetectorRef.detectChanges()
            // this.menuItems.notifyOnChanges()
            // this.menuItems.get( 0 )?.nativeElement.focus()
            // this.menu.focusFirstItem()

            let nodes = document.querySelectorAll('.mat-mdc-menu-content .item')
            // console.log(nodes)
            // let el = nodes[0]
            // let c = window['ng'].getComponent( el )
            // console.log(c)
            // c.focus()            
            // let b = nodes[0].children[0] as any
            // b.focus()
        }) 
    }

    onMenuKeyDown(event: KeyboardEvent): void {
        console.log(event.key)
        const items = this.menuItems.toArray();

        const current =
            items.findIndex(
                item => item.nativeElement === document.activeElement
            );

        switch ( event.key ) {
            case 'ArrowDown':
                event.preventDefault()
                const next = (current + 1) % items.length
                items[ next ].nativeElement.focus()
                break

            case 'ArrowUp':
                event.preventDefault()
                const prev = (current + items.length - 1) % items.length
                items[ prev ].nativeElement.focus()
                break
                
            case 'Escape':
                event.preventDefault()
                this.closeMenu()
                break
                
            case 'Tab':
                if ( event.shiftKey ) {
                    if ( current == 0 ) this.isOpen = false
                }
                else {
                    if ( current == items.length - 1 ) this.isOpen = false                    
                }
                break                
        }
        // if (event.key === 'ArrowDown') {

        //     event.preventDefault();

        //     const next = (current + 1) % items.length;

        //     items[next].nativeElement.focus();
        // }

        // if (event.key === 'ArrowUp') {

        //     event.preventDefault();

        //     const previous =
        //         current <= 0
        //             ? items.length - 1
        //             : current - 1;

        //     items[previous].nativeElement.focus();
        // }

        // if (event.key === 'Escape') {
        //     event.preventDefault();
        //     this.closeMenu();
        // }

        // if (
        //     event.key === 'Tab' &&
        //     !event.shiftKey &&
        //     current === items.length - 1
        // ) {
        //     this.isOpen = false;
        // }

        // if (
        //     event.key === 'Tab' &&
        //     event.shiftKey &&
        //     current === 0
        // ) {
        //     this.isOpen = false;
        // }
    }

}