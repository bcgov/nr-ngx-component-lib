import { ChangeDetectorRef, Directive, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EditDialogComponent } from "../components/edit-dialog/edit-dialog.component";

export type EditDialogBaseResult<R> = R | 'cancel'

@Directive()
export class EditDialogBase<CONFIG, RESULT = any> {
    dialogRef = inject( MatDialogRef<EditDialogComponent,EditDialogBaseResult<RESULT>> )
    changeDetectorRef = inject( ChangeDetectorRef )

    title: string
    
    saveLabel = 'Save'

    private _saveEnabled = false
    get saveEnabled() { return this._saveEnabled }
    set saveEnabled( v: boolean ) { this._saveEnabled = v }

    cancelLabel = 'Cancel'

    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading( v: boolean ) { 
        if ( this._isLoading == v ) return
        this._isLoading = v
        this.changeDetectorRef.detectChanges()
    }

    result: RESULT

    data: CONFIG = inject( MAT_DIALOG_DATA )
    
    onSaveClick() {
        this.ok()
    }

    onCancelClick() {
        this.cancel()
    }
    
    ok(): void {
        this.dialogRef.close( this.result )
    }

    cancel(){
        this.dialogRef.close( 'cancel' )
    }
}
