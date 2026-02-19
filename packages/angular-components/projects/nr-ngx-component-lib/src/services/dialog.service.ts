import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBase, DialogBaseResult } from '../directives/dialog.base';
import { ConfigurationService } from './configuration.service';
import { DialogConfirmComponent, DialogConfirmConfig } from '../components/dialog-confirm/dialog-confirm.component';

const DEFAULT_CONFIG = {
    panelClass: 'nrcl-dialog',
    autoFocus: false,
    closeOnNavigation: false,
    disableClose: true,
    maxWidth: 800,
}

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    configurationService = inject( ConfigurationService )
    matDialog = inject( MatDialog )

    openDialog<D extends DialogBase<C, R>, C, R>( dialog: ComponentType<D>, data: C, additionalConfig?: MatDialogConfig) {
        let config: MatDialogConfig = {
            ...DEFAULT_CONFIG,
            data,
            ...additionalConfig
        }

        return this.matDialog.open<D,C,DialogBaseResult<R>>( dialog, config )
    }

    openConfirmDialog( config: DialogConfirmConfig, additionalConfig?: MatDialogConfig ) {
        return this.openDialog<DialogConfirmComponent,DialogConfirmConfig,DialogBaseResult<void>>( DialogConfirmComponent, config, additionalConfig )
    }
}
