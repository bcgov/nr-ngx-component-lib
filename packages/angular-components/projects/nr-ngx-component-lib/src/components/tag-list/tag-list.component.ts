import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

export type TagItem = {
    id: string
    description: string
    tooltip: string
    icon: string
}

@Component({
    selector: "nrcl-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrl: "./tag-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent extends NrclBase {
    @Input() items: TagItem[]
    @Input() removable = true
    @Input() noItemsMessage = 'No items have been added.'
    @Input() tagTemplate: TemplateRef<any>

    @Output() itemRemoved = new EventEmitter<TagItem>()
    
    onRemoveItem( id ) {
        this.itemRemoved.emit( this.items.find( i => i.id == id ) )
    }
}
