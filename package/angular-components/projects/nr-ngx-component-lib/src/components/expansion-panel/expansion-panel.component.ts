import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatExpansionPanel } from "@angular/material/expansion";

@Component({
    selector: "nrcl-expansion-panel",
    templateUrl: "./expansion-panel.component.html",
    styleUrl: "./expansion-panel.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-loading]':   'isLoading',
        '[class.expanded]':     'matExpansionPanel?.expanded',
        '[class.disabled]':     'disabled',
    }
})
export class ExpansionPanelComponent {
    @Input() isLoading: boolean = false;
    @Input() disabled = false;
    @Input() expanded = false

    @Output() expandedChange = new EventEmitter<boolean>()

    @ViewChild( 'panel' ) matExpansionPanel: MatExpansionPanel
}

@Component({
    selector: "nrcl-expansion-panel-header",
    template: `
        <div class="left-side">
            <ng-content select="[left-side],h2,h3"></ng-content>
        </div>

        <div class="right-side">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            color: #212121;
            width: 100%;
        }

        .left-side {
            display: flex;
            flex-direction: column;
            padding: 10px 0;        
            align-self: flex-start;
        }

        .left-side ::ng-deep h2 {
            font-size: var( --nrcl-font-size-h2);
            font-weight: 200;
            padding: 0;
            margin: 0;
        }    

        .left-side ::ng-deep h3 {
            font-size: var( --nrcl-font-size-h3 );
            font-weight: 200;
            padding: 0;
            margin: 0;
        }    

        .right-side {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
            align-self: center;
        }
    `],
})
export class ExpansionPanelHeaderComponent {}

@Component({
    selector: "nrcl-expansion-panel-footer",
    template: `
        @if ( showWarning ) {
            <div class="warning">
                <mat-icon>warning</mat-icon>
                <span>{{ warningMessage }}</span>
            </div>
        }

        @if ( cancelEnabled != null ) {
            <nrcl-button
                label="Cancel"
                iconCompact="cancel"
                compact="mobile"
                [disabled]="!cancelEnabled"
                click="cancelClick.emit( $event )"
            ></nrcl-button>
        }

        @if ( saveEnabled != null ) {
            <nrcl-button primary
                label="Save"
                iconCompact="save"
                compact="mobile"
                [disabled]="!saveEnabled"
                click="saveClick.emit( $event )"
            ></nrcl-button>
        }

        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            border-top: 1px solid #c6c8cb;
            padding: var(--nrcl-gutter-space);
            background-color: #f2f2f2;
            display: flex;
            gap: 8px;
            justify-content: flex-end;
        }

        :host:empty {
            display: none;
        }

        .warning {
            display: flex;
            gap: 4px;
            align-items: center;
        }

        .warning .mat-icon {
            color: #FCBA19;        
        }
    `],
})
export class ExpansionPanelFooterComponent {
    @Input() saveEnabled 
    @Input() cancelEnabled 
    @Input() warningMessage = 'Unsaved Changes'
    @Input() showWarning = false

    @Output() saveClick = new EventEmitter<PointerEvent>()
    @Output() cancelClick = new EventEmitter<PointerEvent>()
}
