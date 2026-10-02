import { Component, inject, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from "@angular/material/snack-bar";
import { NrclBase } from "../../directives/nrcl.base";
import { MatButtonModule } from "@angular/material/button";
import { IconComponent } from "../icon/icon.component";

export type SnackbarType = 'success'|'error'|'info'|'update'

export type SnackbarConfig = {
    message: string
    type: SnackbarType
}

@Component({
    selector: 'nrcl-snackbar',
    templateUrl: "./snackbar.component.html",
    styleUrl: "./snackbar.component.scss",
    host: {
        '[class]': 'className'
    },
    imports: [
        MatButtonModule,
        IconComponent,
        MatSnackBarModule
    ]
})
export class SnackbarComponent extends NrclBase {
    snackBarRef = inject( MatSnackBarRef<SnackbarComponent> )
    config: SnackbarConfig = inject( MAT_SNACK_BAR_DATA ) 

    get className() {
        return 'snackbar-type-' + this.config.type
    }
}
