import {
    ChangeDetectionStrategy,
    Component
} from "@angular/core";

@Component({
    selector: "nrcl-form-layout",
    template: "<ng-content></ng-content>",
    styleUrl: "./form-layout.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent {
}
