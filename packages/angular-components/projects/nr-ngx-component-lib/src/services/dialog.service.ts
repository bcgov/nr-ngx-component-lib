import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDialogBaseResult, EditDialogBase } from '../directives/edit-dialog.base';
import { ConfigurationService } from './configuration.service';

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

    openEditDialog<D extends EditDialogBase<C,R>, C, R>( dialog: ComponentType<D>, data: C, additionalConfig?: MatDialogConfig) {
        let config: MatDialogConfig = {
            ...DEFAULT_CONFIG,
            panelClass: [ DEFAULT_CONFIG.panelClass, 'nrcl-edit-dialog' ],
            data,
            ...additionalConfig
        }

        return this.matDialog.open<D,C,EditDialogBaseResult<R>>( dialog, config )
    }
}
