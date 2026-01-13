import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { NrclBase } from "../../directives/nrcl.base";

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
    }
})
export class SnackbarComponent extends NrclBase {
    constructor(
        public snackBarRef: MatSnackBarRef<SnackbarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public config: SnackbarConfig
    ) { 
        super()
    }

    get className() {
        return 'snackbar-type-' + this.config.type
    }
}
