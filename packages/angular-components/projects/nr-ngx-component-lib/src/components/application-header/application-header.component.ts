import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { NrclBase } from '../../directives/nrcl.base';

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

    @Output() clickLogo = new EventEmitter()
    @Output() clickSkip = new EventEmitter()

    onClickLogo() {
        this.clickLogo.emit()
    }

    onKeyDownLogo( ev ) {
        switch ( ev.key ) {
            case 'Enter': 
                this.clickLogo.emit()
                break
        }
    }

    onClickSkip() {
        this.clickSkip.emit()
    }   

    onKeyDownSkip( ev ) {
        switch ( ev.key ) {
            case 'Enter': 
                this.clickSkip.emit()
                break
        }
    }
}
